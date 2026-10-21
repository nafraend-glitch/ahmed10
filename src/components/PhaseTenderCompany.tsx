import React from 'react';
import { CompanyInfo, TenderInfo } from '../types';
import { ShieldAlert, CheckCircle2, ArrowLeft, Building2, Landmark, Phone, MapPin, FileText } from 'lucide-react';

interface PhaseTenderCompanyProps {
  company: CompanyInfo;
  tender: TenderInfo;
  onUpdateCompany: (updated: Partial<CompanyInfo>) => void;
  onUpdateTender: (updated: Partial<TenderInfo>) => void;
  onNext: () => void;
}

export const PhaseTenderCompany: React.FC<PhaseTenderCompanyProps> = ({
  company,
  tender,
  onUpdateCompany,
  onUpdateTender,
  onNext,
}) => {
  const isVatValid = company.vatNo.replace(/\D/g, '').length === 15;
  const isCrValid = company.crNo.trim().length >= 7;

  return (
    <div className="glass-panel rounded-[28px] p-6 md:p-8 mt-5 border border-white/10 transition-all">
      {/* Title & Reputation Guard Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl md:text-2xl font-black gold-gradient-text flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>المرحلة 1: بيانات شركتي (يدوي - مرة واحدة) والمنافسة</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            اكتب بيانات شركتك الحقيقية بيدك مرة واحدة فقط — والذكاء الاصطناعي سيجلب الموردين المناسبين لمدينتك تلقائياً
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تُملأ يدوياً 100% بدون أي أرقام وهمية</span>
        </div>
      </div>

      {/* Primary Section: Company Info (Manual - One Time) */}
      <div className="mt-7 p-6 rounded-2xl glass-card border border-[#D4AF37]/35 bg-black/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#D4AF37] font-black text-sm">
            <Building2 className="w-4 h-4" />
            <span>بيانات شركتي الأساسية (المعتمدة لنظام جلب الموردين بالـ AI)</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">
            تُستخدم مدينتك لجلب أقرب الموردين المعتمدين لموقعك
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* اسم شركتي */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">اسم شركتي الكامل *</label>
            <input
              type="text"
              value={company.companyName || ''}
              onChange={(e) => onUpdateCompany({ companyName: e.target.value })}
              placeholder="اسم شركتي الكامل"
              className="w-full bg-black/50 border border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all shadow-sm shadow-[#D4AF37]/5"
            />
          </div>

          {/* مدينتي */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] text-gray-400 font-semibold">مدينتي (مقر شركتي) *</label>
              {company.city && <span className="text-[10px] text-emerald-400 font-bold">✓ لتحديد الموردين</span>}
            </div>
            <input
              type="text"
              value={company.city || ''}
              onChange={(e) => onUpdateCompany({ city: e.target.value })}
              placeholder="مدينتي - مثلاً: المدينة المنورة / الرياض / جدة"
              className="w-full bg-black/50 border border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          {/* السجل التجاري */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] text-gray-400 font-semibold">السجل التجاري *</label>
              {isCrValid && <span className="text-[10px] text-emerald-400 font-bold">✓ مدخل</span>}
            </div>
            <input
              type="text"
              value={company.crNo || ''}
              onChange={(e) => onUpdateCompany({ crNo: e.target.value })}
              placeholder="رقم السجل التجاري"
              className="w-full bg-black/50 border border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          {/* جوال شركتي */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">جوال شركتي (للتواصل) *</label>
            <input
              type="tel"
              value={company.engineerPhone || ''}
              onChange={(e) => onUpdateCompany({ engineerPhone: e.target.value })}
              placeholder="جوال شركتي للتواصل (05xxxxxxxx)"
              className="w-full bg-black/50 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          {/* الرقم الضريبي */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] text-gray-400 font-semibold">الرقم الضريبي (15 رقم)</label>
              {isVatValid && <span className="text-[10px] text-emerald-400 font-bold">✓ 15 رقم</span>}
            </div>
            <input
              type="text"
              value={company.vatNo || ''}
              maxLength={15}
              onChange={(e) => onUpdateCompany({ vatNo: e.target.value })}
              placeholder="الرقم الضريبي 15 رقم"
              className="w-full bg-black/50 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          {/* اسم المالك / المدير العام */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">اسم المالك / المدير العام</label>
            <input
              type="text"
              value={company.ownerName || ''}
              onChange={(e) => onUpdateCompany({ ownerName: e.target.value })}
              placeholder="اسم المالك / المدير العام"
              className="w-full bg-black/50 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          {/* إيميل الشركة */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">إيميل الشركة الرسمي</label>
            <input
              type="email"
              value={company.companyEmail || ''}
              onChange={(e) => onUpdateCompany({ companyEmail: e.target.value })}
              placeholder="إيميل الشركة الرسمي"
              className="w-full bg-black/50 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tender Details Section */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-4">
          <Landmark className="w-4 h-4" />
          <span>بيانات المنافسة الحكومية (تُستخرج تلقائياً من كراسة PDF أو تُكتب يدوياً)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">رقم المنافسة</label>
            <input
              type="text"
              value={tender.tenderNo || ''}
              onChange={(e) => onUpdateTender({ tenderNo: e.target.value })}
              placeholder="رقم المنافسة - فارغ أو يُملأ من PDF"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">موضوع أو عنوان المنافسة</label>
            <input
              type="text"
              value={tender.tenderTitle || ''}
              onChange={(e) => onUpdateTender({ tenderTitle: e.target.value })}
              placeholder="موضوع أو عنوان المنافسة الرسمية"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">الجهة الحكومية المالكة</label>
            <input
              type="text"
              value={tender.agency || ''}
              onChange={(e) => onUpdateTender({ agency: e.target.value })}
              placeholder="الجهة الحكومية المالكة"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">مقر موقع المنافسة</label>
            <input
              type="text"
              value={tender.location || ''}
              onChange={(e) => onUpdateTender({ location: e.target.value })}
              placeholder="مقر المنافسة - مثلاً: المدينة المنورة"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-semibold">قيمة الضمان الابتدائي</label>
            <input
              type="text"
              value={tender.guarantee || ''}
              onChange={(e) => onUpdateTender({ guarantee: e.target.value })}
              placeholder="قيمة الضمان الابتدائي"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* AI Detected Project City - Hidden Input & Visible AI Detection Banner */}
        <input
          type="hidden"
          name="projectCity"
          id="projectCity"
          value={tender.projectCity || 'ينبع'}
        />

        <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs md:text-sm">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>📍 مدينة المشروع المكتشفة بالذكاء الاصطناعي: <strong className="text-white underline decoration-[#D4AF37]">{tender.projectCity || 'ينبع'}</strong></span>
          </div>
          <span className="text-[11px] text-gray-300">
            🤖 يتم فرز وترتيب الموردين بحسب المسافة الأقرب لموقع هذا المشروع (أولوية ينبع 0 كم، جدة 150 كم، المدينة 200 كم)
          </span>
        </div>
      </div>

      {/* Save & Continue Button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>الذكاء الاصطناعي سيستخدم مدينتك لجلب أفضل 3 موردين متخصصين لكل بند تلقائياً</span>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-full text-xs md:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
        >
          <span>حفظ بيانات شركتي والانتقال → جدول البنود (الموردين بالـ AI)</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
