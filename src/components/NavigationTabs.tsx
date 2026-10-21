import React from 'react';
import { Building2, Calculator, BrainCircuit, FileCheck2, Sparkles } from 'lucide-react';

export type TabKey = 'company' | 'pricing' | 'ai' | 'export';

interface NavigationTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  itemsCount: number;
  totalBidAmount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  itemsCount,
  totalBidAmount,
}) => {
  const tabs: {
    key: TabKey;
    label: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: 'company',
      label: '① بيانات شركتي (يدوي - مرة واحدة)',
      icon: Building2,
    },
    {
      key: 'pricing',
      label: '② جدول البنود (الموردين بالـ AI)',
      badge: itemsCount > 0 ? `${itemsCount} بند` : undefined,
      icon: Calculator,
    },
    {
      key: 'ai',
      label: '③ تقرير AI - تفاصيل الموردين والوفر',
      badge: '30 مورد مصنف',
      icon: BrainCircuit,
    },
    {
      key: 'export',
      label: '④ التصدير المختوم النهائي',
      badge: totalBidAmount > 0 ? `${Math.round(totalBidAmount).toLocaleString()} ر.س` : undefined,
      icon: FileCheck2,
    },
  ];

  return (
    <nav className="flex items-center gap-2 mt-5 overflow-x-auto pb-2 scrollbar-none no-print">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all select-none cursor-pointer ${
              isActive
                ? 'gold-btn shadow-lg shadow-[#D4AF37]/20 border border-[#FFF3B0]/40 text-black font-black'
                : 'glass-card text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#D4AF37]'}`} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold mr-1 ${
                  isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
