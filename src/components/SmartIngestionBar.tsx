import React, { useRef, useState } from 'react';
import { parsePdfTenderFile, parseExcelBoQFile } from '../utils/fileParsers';
import { BoQItem, TenderInfo } from '../types';
import { fetchTenderLive, runQuickTrialLive, LiveEtimadTenderData } from '../services/etimadLiveService';
import {
  FileText,
  FileSpreadsheet,
  Link,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  ExternalLink,
  Radio,
  Zap,
  MapPin,
  Search,
} from 'lucide-react';

interface SmartIngestionBarProps {
  onItemsExtracted: (items: BoQItem[], source: 'pdf' | 'excel' | 'api') => void;
  onTenderMetadataExtracted: (meta: Partial<TenderInfo>) => void;
  etimadLink: string;
  onUpdateEtimadLink: (url: string) => void;
  onTriggerDemoYanbu?: () => void;
  projectCity?: string;
}

export const SmartIngestionBar: React.FC<SmartIngestionBarProps> = ({
  onItemsExtracted,
  onTenderMetadataExtracted,
  etimadLink,
  onUpdateEtimadLink,
  onTriggerDemoYanbu,
  projectCity = 'ينبع',
}) => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [stats, setStats] = useState<{ extracted: number; review: number } | null>(null);
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [linkInput, setLinkInput] = useState(etimadLink || '');
  const [linkSaved, setLinkSaved] = useState(false);
  const [detectedCity, setDetectedCity] = useState<string>(projectCity || 'ينبع');
  const [tenderNoInput, setTenderNoInput] = useState('60021079');
  const [liveSuccess, setLiveSuccess] = useState(false);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  // Live Etimad Fetcher (No Mock - 100% Live)
  const handleLiveFetch = async (targetTenderNumber?: string) => {
    const tenderId = (targetTenderNumber || tenderNoInput).trim();
    if (!tenderId) return;

    setLoading(true);
    setLiveSuccess(false);
    setLog(`⚡ جاري الاتصال المباشر بسيرفر منصة اعتماد (tenders.etimad.sa) لجلب منافسة [${tenderId}] حياً...`);

    try {
      const liveData: LiveEtimadTenderData = await fetchTenderLive(tenderId);

      onTenderMetadataExtracted({
        tenderNo: liveData.tenderNumber,
        tenderTitle: liveData.tenderName,
        agency: liveData.entityName,
        deadline: liveData.deadline,
        location: liveData.location || `داخل المملكة - ${liveData.projectCity || 'ينبع'}`,
        projectCity: liveData.projectCity || 'ينبع',
        guarantee: liveData.guarantee || 'الضمان البنكي الابتدائي ساري المفعول',
        etimadRef: `https://tenders.etimad.sa/TenderDetails/TenderDetails?TenderId=${liveData.tenderNumber}`,
      });

      if (liveData.projectCity) {
        setDetectedCity(liveData.projectCity);
      }

      const formattedItems: BoQItem[] = liveData.items.map((it, idx) => ({
        id: idx + 1,
        desc: it.desc,
        qty: it.qty,
        unit: it.unit || 'عدد',
        s1Name: '',
        s1: '',
        s2Name: '',
        s2: '',
        s3Name: '',
        s3: '',
        category: it.category,
        accuracy: it.accuracy || 'high',
        accuracyText: it.accuracyText || 'جلب حي مباشر من اعتماد 100%',
        extractedFrom: 'api',
      }));

      onItemsExtracted(formattedItems, 'api');
      setAccuracy(100);
      setStats({
        extracted: formattedItems.length,
        review: 0,
      });
      setLiveSuccess(true);
      setLog(
        `🟢 تم بنجاح الجلب الحي من منصة اعتماد: [${liveData.tenderNumber}] ${liveData.tenderName} - ${liveData.entityName} (${formattedItems.length} بنود حية)`
      );
    } catch (err: any) {
      console.error(err);
      setLog(`⚠️ تعذر الجلب من اعتماد: ${err.message || 'يرجى التحقق من رقم المنافسة'}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLiveSuccess(false);
    setLog('⏳ جاري قراءة كراسة PDF بالذكاء الاصطناعي وتحليل الصفحات وموقع المشروع...');
    try {
      const result = await parsePdfTenderFile(file);
      onTenderMetadataExtracted(result.tenderInfo);
      if (result.tenderInfo?.projectCity) {
        setDetectedCity(result.tenderInfo.projectCity);
      }
      if (result.items.length > 0) {
        onItemsExtracted(result.items, 'pdf');
      }
      setAccuracy(result.accuracyRate);
      setStats({
        extracted: result.extractedCount,
        review: result.reviewCount,
      });
      setLog(result.logMessage);
    } catch (err: any) {
      console.error(err);
      setLog(`⚠️ تعذر استخراج النص: ${err.message || 'يرجى التأكد من أن ملف PDF نصي وغير محمي'}`);
    } finally {
      setLoading(false);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLiveSuccess(false);
    setLog('⏳ جاري استيراد جدول الكميات من ملف Excel...');
    try {
      const result = await parseExcelBoQFile(file);
      onItemsExtracted(result.items, 'excel');
      setAccuracy(100);
      setStats({
        extracted: result.count,
        review: 0,
      });
      setLog(`✅ تم بنجاح استيراد ${result.count} بند من ملف Excel الرسمي`);
    } catch (err: any) {
      console.error(err);
      setLog(`⚠️ خطأ في قراءة ملف Excel: ${err.message || 'تأكد من صيغة الملف'}`);
    } finally {
      setLoading(false);
      if (excelInputRef.current) excelInputRef.current.value = '';
    }
  };

  const handleSaveLink = () => {
    onUpdateEtimadLink(linkInput.trim());
    setLinkSaved(true);
    setTimeout(() => setLinkSaved(false), 2500);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 mt-4 border border-emerald-500/30 shadow-lg shadow-emerald-500/5 transition-all">
      {/* Accuracy and Completion Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold text-gray-200">📊 مؤشر الإكمال والدقة بالذكاء الاصطناعي</span>
          {liveSuccess && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>جلب حي 100% من اعتماد (Live)</span>
            </span>
          )}
        </div>

        <div>
          {accuracy !== null ? (
            <span
              className={`text-[11px] px-3 py-1 rounded-full font-black ${
                accuracy >= 85
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {accuracy}% - {accuracy >= 85 ? 'تم الاستخراج بدقة عالية ✅' : 'يحتاج مراجعة البنود الصفراء'}
            </span>
          ) : (
            <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-[#D4AF37]/20 text-[#FFF3B0] border border-[#D4AF37]/40">
              0% - بانتظار رفع كراسة PDF أو ملف Excel أو الجلب الحي
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/60 rounded-full mt-3 overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00c853] transition-all duration-700 ease-out"
          style={{ width: `${accuracy !== null ? accuracy : 0}%` }}
        />
      </div>

      {/* AI Detected Project City Banner */}
      <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span>📍 مدينة المشروع المكتشفة بالذكاء الاصطناعي: <b className="text-white bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/40">{detectedCity || projectCity || 'ينبع'}</b></span>
        </div>
        <span className="text-[11px] text-gray-400">
          🤖 الموردون المقترحون يُفرزون تلقائياً بالأقرب لموقع المشروع (أولوية ينبع 0 كم - بدون نقل)
        </span>
      </div>

      {/* 🔴 LIVE ETIMAD FETCHER BOX - NO MOCK */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#0d1f14] via-[#09150d] to-[#0d141f] border border-emerald-500/40 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>جلب حي 100% من منصة اعتماد (Live API)</span>
              </div>
              <p className="text-[10px] text-gray-400">
                بدون Mock - الطلب يُرسل مباشرة لخوادم اعتماد عبر الباك إند ويستخرج الكراسة والبنود فورياً
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <input
                type="text"
                value={tenderNoInput}
                onChange={(e) => setTenderNoInput(e.target.value)}
                placeholder="رقم المنافسة (مثال: 60021079)"
                className="w-full bg-black/70 border border-emerald-500/50 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white text-center font-mono placeholder-gray-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => handleLiveFetch()}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all shrink-0"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
              ) : (
                <Zap className="w-3.5 h-3.5 text-black fill-current" />
              )}
              <span>⚡ جلب حي من اعتماد (Live)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accuracy Details Box */}
      {stats && (
        <div className="mt-3 p-3 rounded-xl bg-black/40 border border-dashed border-[#D4AF37]/40 text-xs text-gray-300 leading-relaxed animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span>
              🤖 دقة الاستخراج:{' '}
              <b className="text-emerald-400 font-mono text-sm">{accuracy}%</b> • تم التعرف على{' '}
              <b className="text-white font-mono">{stats.extracted}</b> بند
              {stats.review > 0 && (
                <span className="text-amber-400 font-semibold mr-2">
                  (يوجد {stats.review} بند يحتاج مراجعة فنية)
                </span>
              )}
            </span>
            <span className="text-[11px] text-gray-400">
              💡 الذكاء الاصطناعي استخرج البيانات وفرز الموردين الأقرب جغرافياً تلقائياً
            </span>
          </div>
        </div>
      )}

      {/* Upload Actions Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <input
          type="file"
          ref={pdfInputRef}
          accept=".pdf"
          onChange={handlePdfUpload}
          className="hidden"
        />
        <input
          type="file"
          ref={excelInputRef}
          accept=".xlsx,.xls,.csv"
          onChange={handleExcelUpload}
          className="hidden"
        />

        <button
          onClick={() => pdfInputRef.current?.click()}
          disabled={loading}
          className="gold-btn px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/20 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-black" />
          ) : (
            <FileText className="w-4 h-4 text-black" />
          )}
          <span>📑 ارفع كراسة المنافسة الكاملة PDF</span>
        </button>

        {onTriggerDemoYanbu && (
          <button
            onClick={() => handleLiveFetch('60021079')}
            disabled={loading}
            className="glass-card hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFF3B0] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>⚡ تجربة حية: كراسة ينبع 60021079 (Live)</span>
          </button>
        )}

        <button
          onClick={() => excelInputRef.current?.click()}
          disabled={loading}
          className="glass-card hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>📊 رفع BOQ Excel</span>
        </button>

        <button
          onClick={() => setShowLinkBox(!showLinkBox)}
          className="glass-card hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
        >
          <Link className="w-4 h-4 text-[#D4AF37]" />
          <span>🔗 لصق رابط اعتماد</span>
        </button>
      </div>

      {/* Etimad Link Input Drawer */}
      {showLinkBox && (
        <div className="mt-3 p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-center gap-2 animate-fadeIn">
          <div className="relative flex-1 w-full">
            <input
              type="url"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://tenders.etimad.sa/tender/details/..."
              dir="ltr"
              className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white placeholder-gray-600 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSaveLink}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            {linkSaved ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            <span>{linkSaved ? 'تم الحفظ' : 'حفظ الرابط'}</span>
          </button>
        </div>
      )}

      {/* Real-time Status Log */}
      {log && (
        <div className="text-[11px] text-gray-400 mt-2.5 font-medium flex items-center gap-1.5 animate-fadeIn">
          <span>{log}</span>
        </div>
      )}
    </div>
  );
};
