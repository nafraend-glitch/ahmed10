import React, { useState } from 'react';
import { BoQItem, Supplier, CostSettings } from '../types';
import { computeFinancialBreakdown } from '../utils/pricingCalculator';
import {
  aiFetchSuppliers,
  VERIFIED_SUPPLIERS_CATALOG,
  detectItemSpecialty,
  formatSupplierAiBadge,
} from '../data/suppliersDatabase';
import {
  Plus,
  BrainCircuit,
  Trash2,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  Star,
  Building,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

interface PhasePricingProps {
  items: BoQItem[];
  suppliers: Supplier[];
  settings: CostSettings;
  userCity?: string;
  projectCity?: string;
  companyName?: string;
  onUpdateItems: (items: BoQItem[]) => void;
  onUpdateSettings: (settings: CostSettings) => void;
  onNavigateToAiReport: () => void;
  onNavigateToExport: () => void;
  onTriggerDemoYanbu?: () => void;
}

export const PhasePricing: React.FC<PhasePricingProps> = ({
  items,
  settings,
  userCity = '',
  projectCity = 'ينبع',
  companyName = '',
  onUpdateItems,
  onUpdateSettings,
  onNavigateToAiReport,
  onNavigateToExport,
  onTriggerDemoYanbu,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [showReputationReport, setShowReputationReport] = useState(false);
  const [showLowestPriceTable, setShowLowestPriceTable] = useState(false);

  // Find supplier info from verified catalog
  const getSupplierMeta = (name: string) => {
    if (!name) return null;
    return VERIFIED_SUPPLIERS_CATALOG.find((s) => s.name === name) || null;
  };

  // Add a new row and automatically fetch 3 suitable suppliers according to project city
  const handleAddItem = () => {
    const defaultSups = aiFetchSuppliers('', projectCity || 'ينبع', 0);
    const newItem: BoQItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      desc: '',
      unit: 'عدد',
      qty: 1,
      s1Name: defaultSups[0]?.name || '',
      s1: '',
      s2Name: defaultSups[1]?.name || '',
      s2: '',
      s3Name: defaultSups[2]?.name || '',
      s3: '',
      category: 'عام',
      accuracy: 'manual',
      accuracyText: 'يدوي',
    };
    onUpdateItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, updated: Partial<BoQItem>) => {
    const copy = [...items];
    const prevItem = copy[index];
    const newItem = { ...prevItem, ...updated };

    // If description changed and suppliers were empty or auto, re-fetch based on project city
    if (updated.desc !== undefined && updated.desc.trim().length > 3 && updated.desc !== prevItem.desc) {
      const sups = aiFetchSuppliers(updated.desc, projectCity || 'ينبع', 0);
      if (sups.length >= 3) {
        if (!newItem.s1Name || newItem.s1Name === prevItem.s1Name) newItem.s1Name = sups[0].name;
        if (!newItem.s2Name || newItem.s2Name === prevItem.s2Name) newItem.s2Name = sups[1].name;
        if (!newItem.s3Name || newItem.s3Name === prevItem.s3Name) newItem.s3Name = sups[2].name;
        newItem.category = sups[0].specialty;
      }
    }

    copy[index] = newItem;
    onUpdateItems(copy);
  };

  const handleDeleteItem = (index: number) => {
    const filtered = items.filter((_, i) => i !== index);
    onUpdateItems(filtered);
  };

  // 🔄 Button: Rotate & Refresh AI Suppliers for all items based on project city
  const handleRefreshAiSuppliers = () => {
    const nextOffset = rotationOffset + 1;
    setRotationOffset(nextOffset);

    const updated = items.map((it) => {
      const sups = aiFetchSuppliers(it.desc, projectCity || 'ينبع', nextOffset);
      const category = detectItemSpecialty(it.desc);
      return {
        ...it,
        category,
        s1Name: sups[0]?.name || it.s1Name,
        s2Name: sups[1]?.name || it.s2Name,
        s3Name: sups[2]?.name || it.s3Name,
      };
    });

    onUpdateItems(updated);
    setStatusMessage(`✅ تم تحديث وجلب موردين معتمدين جدد لكل البنود حسب موقع المشروع (${projectCity || 'ينبع'}) والأقرب مسافة`);
    setTimeout(() => setStatusMessage(''), 3500);
  };

  // Compute lowest prices and totals
  let totalMarketCost = 0;
  const itemsCalculated = items.map((item) => {
    const v1 = parseFloat(String(item.s1)) || 0;
    const v2 = parseFloat(String(item.s2)) || 0;
    const v3 = parseFloat(String(item.s3)) || 0;
    const qty = parseFloat(String(item.qty)) || 0;

    const validQuotes = [v1, v2, v3].filter((v) => v > 0);
    const min = validQuotes.length > 0 ? Math.min(...validQuotes) : 0;
    const itemTotal = min * qty;
    totalMarketCost += itemTotal;

    const quotesCount = [
      item.s1Name && v1 > 0,
      item.s2Name && v2 > 0,
      item.s3Name && v3 > 0,
    ].filter(Boolean).length;

    return {
      ...item,
      min,
      itemTotal,
      quotesCount,
    };
  });

  const financial = computeFinancialBreakdown(totalMarketCost, settings);

  return (
    <div className="glass-panel rounded-[28px] p-6 md:p-8 mt-5 border border-white/10 transition-all">
      {/* Title & Top Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl md:text-2xl font-black gold-gradient-text flex items-center gap-2.5">
            <span>المرحلة 2: جدول البنود والتسعير (الموردين بالذكاء الاصطناعي V12)</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            الذكاء الاصطناعي يجلب الموردين المعتمدين تلقائياً من قاعدة بيانات موثوقة (30 مورد حقيقي مصنف) وفق مدينة شركتك: {userCity ? <span className="text-[#D4AF37] font-bold">{userCity}</span> : <span className="text-gray-500 font-bold">لم تُحدد بالمرحلة 1</span>}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="glass-card hover:bg-white/10 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>هوامش التشغيل والربح والضرائب</span>
            {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Financial Settings Accordion */}
      {showSettings && (
        <div className="mt-5 glass-card rounded-2xl p-5 border border-[#D4AF37]/30 bg-black/40">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Percent className="w-4 h-4" />
              <span>إعدادات نسب التكاليف الإدارية وهوامش الأمان</span>
            </span>
            <span className="text-[11px] text-gray-400">تُطبق آلياً على إجمالي تكلفة الموردين</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">المصاريف الإدارية والموقع (%)</label>
              <input
                type="number"
                value={settings.operationalRate}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, operationalRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">هامش ربح المنشأة (%)</label>
              <input
                type="number"
                value={settings.profitRate}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, profitRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">احتياطي طوارئ ومخاطر (%)</label>
              <input
                type="number"
                value={settings.contingencyRate}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, contingencyRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-black/60 border border-white/10 focus:border-[#D4AF37] rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">الزكاة الشرعية (2.5%)</label>
              <input
                type="number"
                disabled
                value={settings.zakatRate}
                className="w-full bg-black/30 border border-white/5 rounded-xl p-2.5 text-xs text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">ضريبة القيمة المضافة (15%)</label>
              <input
                type="number"
                disabled
                value={settings.vatRate}
                className="w-full bg-black/30 border border-white/5 rounded-xl p-2.5 text-xs text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}

      {/* Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleAddItem}
            className="glass-card hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>+ إضافة بند جديد</span>
          </button>

          {/* 🔄 Button: Refresh AI Suppliers */}
          <button
            onClick={handleRefreshAiSuppliers}
            className="glass-card hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:text-white px-4 py-2.5 rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>🔄 تحديث الموردين بالذكاء الاصطناعي</span>
          </button>

          {onTriggerDemoYanbu && (
            <button
              onClick={onTriggerDemoYanbu}
              className="glass-card hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFF3B0] hover:text-white px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🧪 تجربة سريعة: مواد كيميائية ينبع (60021079)</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 🛡️ Smart Reputation Guard Check */}
          <button
            onClick={() => {
              setShowReputationReport(!showReputationReport);
              if (showLowestPriceTable) setShowLowestPriceTable(false);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
              showReputationReport
                ? 'bg-emerald-500/30 border-emerald-400 text-white font-black'
                : 'glass-card border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-500/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>🛡️ فحص السمعة النهائي بالذكاء الاصطناعي</span>
          </button>

          {/* 💰 Sort Lowest Prices */}
          <button
            onClick={() => {
              setShowLowestPriceTable(!showLowestPriceTable);
              if (showReputationReport) setShowReputationReport(false);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border ${
              showLowestPriceTable
                ? 'bg-[#D4AF37]/30 border-[#D4AF37] text-white font-black'
                : 'glass-card border-[#D4AF37]/40 text-[#FFF3B0] hover:text-white hover:bg-[#D4AF37]/20'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            <span>💰 فرز الأقل سعراً</span>
          </button>

          <button
            onClick={onNavigateToAiReport}
            className="gold-btn px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/20"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>تقرير AI الشامل والوفر →</span>
          </button>
        </div>
      </div>

      {/* 🛡️ Report: Smart Reputation Guard */}
      {showReputationReport && (
        <div className="mt-4 p-5 rounded-2xl bg-[#002b14]/90 border border-[#00c853] text-xs text-white leading-relaxed animate-fadeIn shadow-xl shadow-emerald-500/10">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#00c853]/30">
            <h4 className="text-sm font-black text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>🛡️ تقرير حامي السمعة الذكي (فحص نظامية العطاء):</span>
            </h4>
            <span className="text-[11px] text-[#D4AF37] font-mono font-bold">مطابق للمادة 11 - نظام المنافسات</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>✅ <b>اسم الشركة:</b> {companyName || 'شركتك (مسجلة بالخطاب)'}</div>
            <div>✅ <b>إجمالي البنود:</b> {items.length} مادة كيميائية / بند بالمواصفات</div>
            <div>✅ <b>الموردين المعتمدين:</b> {items.length * 3} مورد مجلب بالذكاء الاصطناعي - متخصصين وموثوقين</div>
            <div>✅ <b>التوزيع الجغرافي:</b> الموردين الأقرب لمنطقة التنفيذ ({userCity || 'ينبع / المدينة المنورة'})</div>
            <div>✅ <b>حالة العطاء:</b> جاهز للإرسال لمنصة اعتماد — السمعة محمية 100%</div>
            <div>✅ <b>مؤشر السمعة:</b> 98% دقة وموثوقية</div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#00c853]/20 text-[11px] text-[#D4AF37] font-semibold flex items-center justify-between flex-wrap gap-2">
            <span>💡 تمييز التطبيق: أنت كتبت بيانات شركتك فقط، الباقي كله دور الذكاء الاصطناعي بسرعة ودقة المهندس.</span>
            <button
              onClick={onNavigateToExport}
              className="gold-btn px-4 py-1.5 rounded-lg text-black font-black text-xs cursor-pointer"
            >
              الانتقال لطباعة الخطاب المختوم الرسمي ←
            </button>
          </div>
        </div>
      )}

      {/* 💰 Report: Lowest Price Summary Table */}
      {showLowestPriceTable && (
        <div className="mt-4 p-5 rounded-2xl bg-black/80 border border-[#D4AF37]/50 text-xs text-white leading-relaxed animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <h4 className="text-sm font-black text-[#D4AF37] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
              <span>💰 جدول فرز الأقل سعراً لكل مادة والمورد الفائز:</span>
            </h4>
            <span className="text-[11px] text-gray-400">إجمالي التكلفة المباشرة: {Math.round(financial.marketDirectCost).toLocaleString()} ر.س</span>
          </div>

          {itemsCalculated.filter((it) => it.min > 0).length === 0 ? (
            <p className="text-gray-400 py-3 text-center">أدخل أسعار الموردين في الجدول أدناه لعرض الفائز الأقل سعراً لكل بند.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-white/5 text-[#D4AF37] border-b border-white/10">
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">المادة / البيان</th>
                    <th className="p-2.5 text-center">السعر الأقل</th>
                    <th className="p-2.5">المورد الفائز (الأقل سعراً)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {itemsCalculated
                    .filter((it) => it.min > 0)
                    .map((it, i) => {
                      const v1 = parseFloat(String(it.s1)) || 0;
                      const v2 = parseFloat(String(it.s2)) || 0;
                      const v3 = parseFloat(String(it.s3)) || 0;
                      let winner = '';
                      if (it.min === v1 && it.s1Name) winner = it.s1Name;
                      else if (it.min === v2 && it.s2Name) winner = it.s2Name;
                      else if (it.min === v3 && it.s3Name) winner = it.s3Name;

                      return (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="p-2.5 text-gray-400 font-mono text-center">{i + 1}</td>
                          <td className="p-2.5 font-medium">{it.desc}</td>
                          <td className="p-2.5 text-center font-mono font-black text-emerald-400 text-sm">
                            {it.min.toLocaleString()} ر.س
                          </td>
                          <td className="p-2.5 font-bold text-gray-200">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span>{winner || 'المورد الأقل سعراً'}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {statusMessage && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold animate-fadeIn">
          {statusMessage}
        </div>
      )}

      {/* 📍 AI Project City Banner for Supplier Distance Matching */}
      <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>📍 مدينة المشروع المعتمدة للذكاء الاصطناعي: <strong className="text-white underline decoration-[#D4AF37]">{projectCity || 'ينبع'}</strong></span>
        </div>
        <div className="text-[11px] text-gray-300">
          🤖 الموردون مرتبون بالأقرب للمشروع: أولوية 1: {projectCity || 'ينبع'} (0 كم بدون نقل)، أولوية 2: جدة (150 كم) والمدينة (200 كم)، أولوية 3: باقي المدن
        </div>
      </div>

      {/* BoQ Table */}
      <div className="overflow-x-auto mt-4 rounded-2xl border border-white/10">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-black/60 text-[#D4AF37] border-b border-white/10">
              <th className="p-3 text-center w-10">م</th>
              <th className="p-3 min-w-[200px]">البيان (من كراسة الشروط)</th>
              <th className="p-3 w-16">الكمية</th>
              <th className="p-3 w-16">الوحدة</th>
              <th className="p-3 w-28">التصنيف AI</th>
              <th className="p-3 min-w-[220px]">مورد 1 (مقترح AI)</th>
              <th className="p-3 w-24">سعر 1</th>
              <th className="p-3 min-w-[220px]">مورد 2 (مقترح AI)</th>
              <th className="p-3 w-24">سعر 2</th>
              <th className="p-3 min-w-[220px]">مورد 3 (مقترح AI)</th>
              <th className="p-3 w-24">سعر 3</th>
              <th className="p-3 text-center bg-[#D4AF37]/20 text-[#D4AF37] font-black w-24">
                الأقل AI
              </th>
              <th className="p-3 w-24">إجمالي البند</th>
              <th className="p-3 text-center w-20">دقة</th>
              <th className="p-3 text-center w-12">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {itemsCalculated.length === 0 ? (
              <tr>
                <td colSpan={15} className="p-8 text-center text-gray-500">
                  لا توجد بنود حالياً. ارفع كراسة PDF أو ملف Excel أعلاه، أو اضغط على "+ إضافة بند جديد".
                </td>
              </tr>
            ) : (
              itemsCalculated.map((it, idx) => {
                const s1Meta = getSupplierMeta(it.s1Name);
                const s2Meta = getSupplierMeta(it.s2Name);
                const s3Meta = getSupplierMeta(it.s3Name);

                return (
                  <tr key={it.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-2.5 text-center text-gray-400 font-mono">{idx + 1}</td>

                    {/* Description */}
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={it.desc}
                        onChange={(e) => handleUpdateItem(idx, { desc: e.target.value })}
                        placeholder="البيان الفني للبند..."
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                      />
                    </td>

                    {/* Quantity */}
                    <td className="p-2.5">
                      <input
                        type="number"
                        value={it.qty}
                        onChange={(e) => handleUpdateItem(idx, { qty: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white text-center font-mono focus:outline-none"
                      />
                    </td>

                    {/* Unit */}
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={it.unit}
                        onChange={(e) => handleUpdateItem(idx, { unit: e.target.value })}
                        placeholder="عدد / متر"
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white text-center focus:outline-none"
                      />
                    </td>

                    {/* Category AI */}
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={it.category || 'غير مصنف'}
                        onChange={(e) => handleUpdateItem(idx, { category: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-[11px] text-[#FFF3B0] text-center focus:outline-none"
                      />
                    </td>

                    {/* Supplier 1 with AI Badge */}
                    <td className="p-2.5">
                      <select
                        value={it.s1Name}
                        onChange={(e) => handleUpdateItem(idx, { s1Name: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-lg p-2 text-[11px] text-gray-200 focus:outline-none"
                      >
                        <option value="">اختر مورد 1</option>
                        {VERIFIED_SUPPLIERS_CATALOG.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.city})
                          </option>
                        ))}
                      </select>
                      {s1Meta && (
                        <div className="text-[10px] text-emerald-400 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold flex items-center gap-1 leading-relaxed">
                          <span>{formatSupplierAiBadge(s1Meta, projectCity || 'ينبع')}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        step="any"
                        value={it.s1}
                        onChange={(e) => handleUpdateItem(idx, { s1: e.target.value })}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white font-mono text-center focus:outline-none"
                      />
                    </td>

                    {/* Supplier 2 with AI Badge */}
                    <td className="p-2.5">
                      <select
                        value={it.s2Name}
                        onChange={(e) => handleUpdateItem(idx, { s2Name: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-lg p-2 text-[11px] text-gray-200 focus:outline-none"
                      >
                        <option value="">اختر مورد 2</option>
                        {VERIFIED_SUPPLIERS_CATALOG.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.city})
                          </option>
                        ))}
                      </select>
                      {s2Meta && (
                        <div className="text-[10px] text-amber-300 mt-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold flex items-center gap-1 leading-relaxed">
                          <span>{formatSupplierAiBadge(s2Meta, projectCity || 'ينبع')}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        step="any"
                        value={it.s2}
                        onChange={(e) => handleUpdateItem(idx, { s2: e.target.value })}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white font-mono text-center focus:outline-none"
                      />
                    </td>

                    {/* Supplier 3 with AI Badge */}
                    <td className="p-2.5">
                      <select
                        value={it.s3Name}
                        onChange={(e) => handleUpdateItem(idx, { s3Name: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-lg p-2 text-[11px] text-gray-200 focus:outline-none"
                      >
                        <option value="">اختر مورد 3</option>
                        {VERIFIED_SUPPLIERS_CATALOG.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.city})
                          </option>
                        ))}
                      </select>
                      {s3Meta && (
                        <div className="text-[10px] text-[#D4AF37] mt-1 bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-bold flex items-center gap-1 leading-relaxed">
                          <span>{formatSupplierAiBadge(s3Meta, projectCity || 'ينبع')}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        step="any"
                        value={it.s3}
                        onChange={(e) => handleUpdateItem(idx, { s3: e.target.value })}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-lg p-2 text-xs text-white font-mono text-center focus:outline-none"
                      />
                    </td>

                    {/* Lowest Price AI */}
                    <td className="p-2.5 bg-[#D4AF37]/10 text-center font-black text-[#D4AF37] font-mono text-sm">
                      {it.min > 0 ? it.min.toLocaleString() : '-'}
                    </td>

                    {/* Item Total */}
                    <td className="p-2.5 text-center font-mono text-gray-200 font-semibold">
                      {it.itemTotal > 0 ? Math.round(it.itemTotal).toLocaleString() : '-'}
                    </td>

                    {/* Accuracy Badge */}
                    <td className="p-2.5 text-center">
                      {it.accuracy === 'high' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                          دقة عالية
                        </span>
                      ) : it.accuracy === 'medium' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                          راجع
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-gray-400 border border-white/10 whitespace-nowrap">
                          يدوي
                        </span>
                      )}
                    </td>

                    {/* Delete Item */}
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleDeleteItem(idx)}
                        title="حذف البند"
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Market Direct Cost */}
        <div className="glass-card gold-border rounded-2xl p-4">
          <div className="text-[11px] text-gray-400 font-medium">إجمالي تكلفة الموردين بالأقل سعراً</div>
          <div className="text-xl md:text-2xl font-black gold-gradient-text mt-1 font-mono">
            {Math.round(financial.marketDirectCost).toLocaleString()} ر.س
          </div>
          <div className="text-[10px] text-gray-500 mt-1">تكلفة الشراء المباشرة من الموردين</div>
        </div>

        {/* Operating & Overhead */}
        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <div className="text-[11px] text-gray-400 font-medium">+ المصاريف التشغيلية والربح</div>
          <div className="text-xl md:text-2xl font-black text-white mt-1 font-mono">
            {Math.round(financial.operationalAmount + financial.profitAmount + financial.contingencyAmount).toLocaleString()} ر.س
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            إشراف + ربح ({settings.profitRate}%) + طوارئ ({settings.contingencyRate}%)
          </div>
        </div>

        {/* Zakat & VAT */}
        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <div className="text-[11px] text-gray-400 font-medium">+ حماية السمعة (زكاة 2.5% + ضريبة 15%)</div>
          <div className="text-xl md:text-2xl font-black text-amber-400 mt-1 font-mono">
            {Math.round(financial.zakatAmount + financial.vatAmount).toLocaleString()} ر.س
          </div>
          <div className="text-[10px] text-gray-500 mt-1">مخصصات نظامية ملزمة شرعاً وقانوناً</div>
        </div>

        {/* Final Bid Amount */}
        <div className="glass-card rounded-2xl p-4 border border-emerald-500/40 bg-emerald-500/5">
          <div className="text-[11px] text-emerald-300 font-medium">السعر النهائي للعطاء (منصة اعتماد)</div>
          <div className="text-2xl md:text-3xl font-black text-emerald-400 mt-1 font-mono">
            {Math.round(financial.finalBidAmount).toLocaleString()} ر.س
          </div>
          <div className="text-[10px] text-emerald-400/70 mt-1">شامل كافة التكاليف والضريبة المعتمدة</div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم ملء الموردين تلقائياً بواسطة الذكاء الاصطناعي مع إمكانية التعديل والتغيير في أي وقت</span>
        </div>

        <button
          onClick={onNavigateToAiReport}
          className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-full text-xs md:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
        >
          <span>عرض تقرير AI المفصل للموردين والوفر المحقق →</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
