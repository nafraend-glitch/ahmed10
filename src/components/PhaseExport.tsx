import React, { useState } from 'react';
import { BoQItem, Supplier, CompanyInfo, TenderInfo, CostSettings } from '../types';
import { analyzeBoQItems, computeFinancialBreakdown } from '../utils/pricingCalculator';
import { tafqeetRiyal } from '../utils/numberToWordsArabic';
import { exportBoQToCsv, exportAiReportToCsv } from '../utils/exportUtils';
import {
  FileSpreadsheet,
  Printer,
  Copy,
  Check,
  Award,
  ShieldCheck,
  Building,
  UserCheck,
  Stamp,
  Calendar,
  FileCheck2,
} from 'lucide-react';

interface PhaseExportProps {
  items: BoQItem[];
  suppliers: Supplier[];
  company: CompanyInfo;
  tender: TenderInfo;
  settings: CostSettings;
}

export const PhaseExport: React.FC<PhaseExportProps> = ({
  items,
  suppliers,
  company,
  tender,
  settings,
}) => {
  const [copied, setCopied] = useState(false);

  const {
    analysisItems,
    totalMarketCost,
    totalMarketSaving,
    fullyQuotedCount,
    reputationScore,
  } = analyzeBoQItems(items, suppliers);

  const financial = computeFinancialBreakdown(totalMarketCost, settings);
  const spelledOutAmount = tafqeetRiyal(financial.finalBidAmount);

  const handleCopySummary = () => {
    const text = `
ملخص عطاء منافسة - حصن برو (حماية السمعة):
المنشأة: ${company.companyName || '-'} | س.ت: ${company.crNo || '-'} | ضريبي: ${company.vatNo || '-'}
المنافسة: ${tender.tenderNo || '-'} (${tender.tenderTitle || '-'})
الجهة المالكة: ${tender.agency || '-'} | المقر: ${tender.location || '-'}
إجمالي تكلفة الموردين الأقل: ${Math.round(financial.marketDirectCost).toLocaleString()} ر.س
ضريبة القيمة المضافة (15%): ${Math.round(financial.vatAmount).toLocaleString()} ر.س
السعر النهائي للعطاء: ${Math.round(financial.finalBidAmount).toLocaleString()} ر.س
التفقيط: ${spelledOutAmount}
المهندس المسؤول: ${company.engineerName || '-'} (${company.engineerPhone || '-'})
تم التحقق والمطابقة وفق المادة 11 من نظام المنافسات والمشتريات الحكومية.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const todayDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="glass-panel rounded-[28px] p-6 md:p-8 mt-5 border border-white/10 transition-all">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-white/10 no-print">
        <div>
          <h2 className="text-xl md:text-2xl font-black gold-gradient-text flex items-center gap-2.5">
            <FileCheck2 className="w-6 h-6 text-[#D4AF37]" />
            <span>المرحلة 4: التصدير المختوم النهائي — ملف يحمي سمعتك أمام لجنة فحص العروض</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            خطاب مالي وفني رسمي مختوم ومطابق لاشتراطات منصة اعتماد ونظام المنافسات والمشتريات الحكومية
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>جاهز للاعتماد والتقديم 🇸🇦</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-3 mt-6 no-print">
        <button
          onClick={() => exportBoQToCsv(items, suppliers, company, tender)}
          className="glass-card hover:bg-white/10 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
          <span>📊 تصدير Excel فاخر كامل (3 موردين + جهات الاتصال)</span>
        </button>

        <button
          onClick={() =>
            exportAiReportToCsv(
              analysisItems,
              company,
              tender,
              Math.round(totalMarketSaving),
              Math.round(totalMarketCost)
            )
          }
          className="gold-btn px-5 py-3 rounded-full text-xs font-black flex items-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/20"
        >
          <Award className="w-4 h-4" />
          <span>🏆 تصدير تقرير AI المختوم (المورد الأقل + جوال + عنوان)</span>
        </button>

        <button
          onClick={() => window.print()}
          className="glass-card hover:bg-white/10 text-white px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-white/10"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>🖨️ طباعة الخطاب المالي المختوم</span>
        </button>

        <button
          onClick={handleCopySummary}
          className="glass-card hover:bg-white/10 text-gray-300 hover:text-white px-4 py-3 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-white/10"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم النسخ بنجاح' : 'نسخ ملخص العطاء'}</span>
        </button>
      </div>

      {/* Executive Quick Details Banner */}
      <div className="mt-6 glass-card rounded-2xl p-5 border border-white/10 text-xs text-gray-300 leading-7 no-print">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-500 block text-[11px]">المنشأة المسعرة:</span>
            <span className="font-bold text-white">{company.companyName || 'لم يُحدد'}</span>
            <div className="text-[11px] text-gray-400">س.ت: {company.crNo || '-'} | ضريبي: {company.vatNo || '-'}</div>
          </div>

          <div>
            <span className="text-gray-500 block text-[11px]">المنافسة والجهة:</span>
            <span className="font-bold text-white">{tender.tenderNo || '-'}</span>
            <div className="text-[11px] text-gray-400">{tender.agency || '-'} ({tender.location || '-'})</div>
          </div>

          <div>
            <span className="text-gray-500 block text-[11px]">المهندس والمفوض:</span>
            <span className="font-bold text-white">{company.engineerName || '-'}</span>
            <div className="text-[11px] text-gray-400">جوال: {company.engineerPhone || '-'}</div>
          </div>

          <div>
            <span className="text-gray-500 block text-[11px]">السعر الإجمالي للعطاء:</span>
            <span className="font-black text-emerald-400 text-sm font-mono">
              {Math.round(financial.finalBidAmount).toLocaleString()} ر.س
            </span>
            <div className="text-[11px] text-[#D4AF37]">3 عروض موثقة لكل بند لحماية السمعة</div>
          </div>
        </div>
      </div>

      {/* Official Sealed Document (Printable) */}
      <div className="mt-8 printable-document bg-white text-gray-950 rounded-2xl p-8 md:p-12 border-2 border-gray-300 shadow-2xl">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-6">
          <div className="text-right space-y-1">
            <h3 className="font-black text-lg text-gray-900">{company.companyName || 'شركة المقاولات المعتمدة'}</h3>
            <div className="text-xs text-gray-700">سجل تجاري: <span className="font-mono font-bold">{company.crNo || '..........'}</span></div>
            <div className="text-xs text-gray-700">الرقم الضريبي ZATCA: <span className="font-mono font-bold">{company.vatNo || '..........'}</span></div>
            <div className="text-xs text-gray-700">المقر: {company.city || 'المملكة العربية السعودية'}</div>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-gray-600">المملكة العربية السعودية</div>
            <div className="text-sm font-black text-gray-900">بسم الله الرحمن الرحيم</div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-300">
              عطاء رسمي مطابق لنظام المنافسات والمشتريات الحكومية
            </div>
          </div>

          <div className="text-left space-y-1" dir="ltr">
            <div className="text-xs text-gray-700">التاريخ: <span className="font-bold">{todayDate}</span></div>
            <div className="text-xs text-gray-700">رقم المنافسة: <span className="font-mono font-bold">{tender.tenderNo || '-'}</span></div>
            <div className="text-xs text-gray-700">منصة اعتماد: <span className="font-mono font-bold">{tender.etimadRef || 'ETMD-2026'}</span></div>
          </div>
        </div>

        {/* Salutation */}
        <div className="my-6 text-sm text-gray-800 leading-relaxed">
          <div className="font-black text-base text-gray-900 mb-2">
            سعادة رئيس وأعضاء لجنة فحص العروض المحترمين
          </div>
          <div className="text-gray-700 font-bold mb-4">
            الجهة الحكومية: {tender.agency || 'الجهة الحكومية المعلنة للمنافسة'} — مقر المشروع: {tender.location || 'المملكة'}
          </div>
          <p className="text-justify text-xs md:text-sm">
            السلام عليكم ورحمة الله وبركاته، وبعد؛<br />
            إشارةً إلى المنافسة رقم <span className="font-mono font-bold">({tender.tenderNo || '..........'})</span> الخاصة بـ
            <span className="font-bold"> ({tender.tenderTitle || 'المشروع المعلن عنه'})</span>، يسرنا في{' '}
            <span className="font-bold">({company.companyName || 'منشأتنا'})</span> أن نتقدم لكم بعطائنا المالي والفني المستوفي لكافة الشروط والمواصفات الفنية المعتمدة بكراسة الشروط والمواصفات، والمستند إلى دراسة تسعيرية سوقية موثقة ومعتمدة من الموردين المعتمدين بالمملكة العربية السعودية، ونلخص جدول الكميات والأسعار كالتالي:
          </p>
        </div>

        {/* Official BoQ Table */}
        <div className="overflow-x-auto my-6 border border-gray-400 rounded-lg">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-400 text-gray-900 font-bold">
                <th className="p-2.5 text-center w-10">البند</th>
                <th className="p-2.5">الوصف الفني التفصيلي للبند</th>
                <th className="p-2.5 text-center w-16">الوحدة</th>
                <th className="p-2.5 text-center w-16">الكمية</th>
                <th className="p-2.5 text-center w-28">سعر الوحدة (ر.س)</th>
                <th className="p-2.5 text-center w-32">إجمالي السعر (ر.س)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {analysisItems.map((item, idx) => (
                <tr key={item.id} className="text-gray-800">
                  <td className="p-2 text-center font-mono font-bold">{idx + 1}</td>
                  <td className="p-2">{item.desc}</td>
                  <td className="p-2 text-center">{item.unit}</td>
                  <td className="p-2 text-center font-mono">{item.qty}</td>
                  <td className="p-2 text-center font-mono font-bold">
                    {item.cheapest.price > 0 ? item.cheapest.price.toLocaleString() : '-'}
                  </td>
                  <td className="p-2 text-center font-mono font-bold">
                    {item.totalCost > 0 ? Math.round(item.totalCost).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Totals Block */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs space-y-2">
            <div className="font-bold text-gray-900 border-b border-gray-300 pb-2">
              التفقيط المالي الرسمي (الملزم للعطاء):
            </div>
            <div className="text-gray-900 font-bold text-sm leading-relaxed text-[#854d0e]">
              {spelledOutAmount}
            </div>
            <div className="text-[11px] text-gray-600 mt-2">
              * في حال وجود أي تعارض حسابي أو تضارب في الكسور، يعتمد المبلغ المكتوب بالحروف والأرقام المفصلة.
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex justify-between items-center text-gray-700">
              <span>إجمالي قيمة الأعمال المباشرة:</span>
              <span className="font-mono font-bold">{Math.round(financial.marketDirectCost).toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>المصاريف التشغيلية وهامش الأمان:</span>
              <span className="font-mono font-bold">
                {Math.round(financial.operationalAmount + financial.contingencyAmount + financial.profitAmount).toLocaleString()} ر.س
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>ضريبة القيمة المضافة ZATCA (15%):</span>
              <span className="font-mono font-bold">{Math.round(financial.vatAmount).toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between items-center text-gray-900 font-black text-sm pt-2 border-t-2 border-gray-400">
              <span>الإجمالي العام والنهائي للعطاء:</span>
              <span className="font-mono text-emerald-800 text-base">
                {Math.round(financial.finalBidAmount).toLocaleString()} ر.س
              </span>
            </div>
          </div>
        </div>

        {/* Legal Declaration */}
        <div className="my-6 border border-gray-300 rounded-xl p-4 text-[11px] text-gray-700 bg-amber-50/50 leading-relaxed">
          <div className="font-bold text-gray-900 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>إقرار حماية السمعة والالتزام بالنظام (المادة 11 من اللائحة التنفيذية):</span>
          </div>
          نقر نحن <span className="font-bold">{company.companyName || 'الشركة'}</span> بصفتنا المقاول المتقدم بالعطاء، بأن جميع الأسعار الواردة أعلاه حقيقية ومدروسة وفق الأسعار السائدة بالسوق السعودي، ومستندة إلى عروض أسعار موثقة لثلاثة موردين معتمدين لكل بند تجنباً لأي سعر شاذ أو غير متوازن. كما نقر بالتزامنا بتسليم كافة الأعمال في مدة التنفيذ المحددة وبأعلى معايير الجودة والإتقان، والامتثال لكافة نصوص نظام المنافسات والمشتريات الحكومية ولائحته التنفيذية.
        </div>

        {/* Signatures & Seal Section */}
        <div className="mt-10 pt-6 border-t-2 border-gray-900 grid grid-cols-3 gap-6 text-center text-xs">
          {/* Pricing Engineer */}
          <div className="space-y-2">
            <div className="font-bold text-gray-900">المهندس المسؤول عن التسعير</div>
            <div className="text-gray-700 font-semibold">{company.engineerName || 'م. ........................'}</div>
            <div className="text-[11px] text-gray-500 font-mono" dir="ltr">{company.engineerPhone || '05xxxxxxxx'}</div>
            <div className="h-14 flex items-end justify-center">
              <span className="text-gray-400 text-[10px]">التوقيع: .....................</span>
            </div>
          </div>

          {/* Official Seal / Stamp */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full border-2 border-red-800 p-1 flex items-center justify-center text-center text-red-800 seal-stamp">
              <div className="w-full h-full rounded-full border border-dashed border-red-800 flex flex-col items-center justify-center p-1">
                <div className="text-[9px] font-black leading-tight">{company.companyName ? company.companyName.slice(0, 24) : 'ختم الاعتماد الرسمي'}</div>
                <div className="text-[8px] font-mono font-bold my-0.5">س.ت: {company.crNo || '4030000000'}</div>
                <div className="text-[8px] font-bold text-red-900">معتمد للعطاءات</div>
                <div className="text-[7px] font-mono">{todayDate}</div>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 mt-1">الختم الرسمي للمنشأة</span>
          </div>

          {/* General Manager */}
          <div className="space-y-2">
            <div className="font-bold text-gray-900">المدير العام / المفوض بالتوقيع</div>
            <div className="text-gray-700 font-semibold">{company.delegateName || company.ownerName || '............................'}</div>
            <div className="text-[11px] text-gray-500">الاعتماد الرسمي للعقد</div>
            <div className="h-14 flex items-end justify-center">
              <span className="text-gray-400 text-[10px]">التوقيع: .....................</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
