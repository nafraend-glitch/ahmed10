import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  TrendingUp,
  MapPin,
  ClipboardCheck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileUp,
  FlaskConical,
} from 'lucide-react';

interface SmartEngineerHeroProps {
  onTriggerPdfUpload: () => void;
  onTriggerDemoYanbu: () => void;
}

export const SmartEngineerHero: React.FC<SmartEngineerHeroProps> = ({
  onTriggerPdfUpload,
  onTriggerDemoYanbu,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="no-print mt-4 rounded-[28px] overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#141208] via-[#0b0a0e] to-[#070709] transition-all">
      {/* Top Bar Indicator */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-black/40 border-b border-white/5 text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-gray-300 font-semibold">محرك المهندس الذكي نشط • الدقة بالذكاء الاصطناعي 98%</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-500">الإعدادات • المشاريع • لوحة التحكم</span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-[#D4AF37] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{collapsed ? 'عرض مقدمة المهندس الذكي' : 'طي المقدمة'}</span>
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-6 md:p-10 text-center animate-fadeIn">
          {/* Main Hero Header */}
          <div className="max-w-[850px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5E6A3] text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>الجيل الجديد V12 — تسعير وفرز ذكي معتمد لدى منصة اعتماد</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black gold-gradient-text tracking-tight mb-3">
              حصن برو - المهندس الذكي
            </h2>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-[720px] mx-auto font-medium">
              منصة ذكية مدعومة بالذكاء الاصطناعي لتحليل المناقصات، تدقيق الكميات، ومقارنة الموردين بسرعة ودقة عالية — مصممة للمهندسين والمقاولين في المملكة العربية السعودية
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={onTriggerPdfUpload}
                className="gold-btn px-7 py-3.5 rounded-2xl text-xs md:text-sm font-black flex items-center gap-2.5 cursor-pointer shadow-xl shadow-[#D4AF37]/25 hover:scale-[1.02] transition-transform"
              >
                <FileUp className="w-4 h-4 text-black" />
                <span>🚀 ارفع كراسة اعتماد ودع المهندس الذكي يعمل</span>
              </button>

              <button
                onClick={onTriggerDemoYanbu}
                className="glass-card hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFF3B0] hover:text-white px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <FlaskConical className="w-4 h-4 text-[#D4AF37]" />
                <span>🧪 تجربة سريعة: مواد كيميائية ينبع (منافسة 60021079)</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mt-3 font-medium">
              يُعالج الملف خلال دقائق • دقة تحليل تصل إلى 98% • آمن ومشفّر 🇸🇦
            </p>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-8 max-w-[1260px] mx-auto text-right">
            {/* Card 1 */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-xs font-black text-[#D4AF37] mb-1">قارئ الكراسات العملاق</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                استخراج تلقائي للشروط والمتطلبات من الكراسة PDF/Doc في ثوانٍ معدودة.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                📈
              </div>
              <h3 className="text-xs font-black text-[#D4AF37] mb-1">متنبئ الأسعار</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                توقعات أسعار معتمدين قرب موقع المشروع مع تقييم وبيانات تواصل حقيقية.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-xs font-black text-[#D4AF37] mb-1">جالب الموردين الجغرافي</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                توصية بموردين معتمدين قرب موقع المنافسة حسب مدينة شركتك بدقة.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                📋
              </div>
              <h3 className="text-xs font-black text-[#D4AF37] mb-1">مدقق الكميات الذكي</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                مقارنة الكميات مع المواصفات وكشف الفروقات والتكرارات فوراً.
              </p>
            </div>

            {/* Card 5 */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-xs font-black text-[#D4AF37] mb-1">حامي السمعة</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                تحليل سمعة الموردين وتقييم المخاطر والعقود السابقة مطابق للمادة 11.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
