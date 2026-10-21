import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, FileSpreadsheet, Building2 } from 'lucide-react';

interface HeaderProps {
  reputationScore: number;
  fullyQuotedCount: number;
  totalItems: number;
  onResetBlank: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  reputationScore,
  fullyQuotedCount,
  totalItems,
  onResetBlank,
}) => {
  const isOptimal = reputationScore >= 80;
  const isModerate = reputationScore >= 50 && reputationScore < 80;

  return (
    <header className="glass-panel gold-border rounded-[26px] p-5 md:p-7 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Brand and Slogan */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] flex items-center justify-center text-black font-black text-xl shadow-lg shadow-[#D4AF37]/20">
              ح
            </div>
            <h1 className="text-2xl md:text-3xl font-black gold-gradient-text tracking-tight">
              حصن برو | HOSN PRO
            </h1>
            <span className="glass-card text-[#D4AF37] border border-[#D4AF37]/40 text-[11px] px-3 py-1 rounded-full font-bold">
              النسخة الذهبية V12 - الموردين بالذكاء الاصطناعي
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed">
            اكتب بيانات شركتك يدوياً مرة واحدة • الذكاء الاصطناعي يجلب الموردين المعتمدين ويفرز الأسعار
          </p>
        </div>

        {/* Reputation Badge & Quick Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Saudi & AI System Badge */}
          <div className="glass-card rounded-full px-3.5 py-1.5 text-xs text-gray-300 flex items-center gap-2 border border-white/10">
            <span className="text-sm">🇸🇦</span>
            <span className="font-semibold">اعتماد | المشتريات الحكومية</span>
          </div>

          {/* Dynamic Reputation Status Gauge */}
          <div
            className={`rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-2 border transition-all ${
              isOptimal
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10'
                : isModerate
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-red-500/15 border-red-500/30 text-red-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 animate-pulse" />
            <span>
              مؤشر السمعة: {reputationScore}% ({fullyQuotedCount}/{Math.max(totalItems, 1)} بنود مكتملة)
            </span>
          </div>

          {/* Clean Reset Button */}
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-2">
            <button
              onClick={onResetBlank}
              title="تفريغ كافة الحقول 100% للبدء بكتابة بيانات المنافسة الحقيقية"
              className="glass-card hover:bg-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إفراغ الحقول 100%</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
