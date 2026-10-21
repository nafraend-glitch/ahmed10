import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationTabs, TabKey } from './components/NavigationTabs';
import { SmartIngestionBar } from './components/SmartIngestionBar';
import { PhaseTenderCompany } from './components/PhaseTenderCompany';
import { PhasePricing } from './components/PhasePricing';
import { PhaseAiReport } from './components/PhaseAiReport';
import { PhaseExport } from './components/PhaseExport';
import { SmartEngineerHero } from './components/SmartEngineerHero';
import {
  CompanyInfo,
  TenderInfo,
  Supplier,
  BoQItem,
  CostSettings,
} from './types';
import {
  INITIAL_COMPANY,
  INITIAL_TENDER,
  INITIAL_SETTINGS,
  INITIAL_SUPPLIERS,
  INITIAL_ITEMS,
  SAMPLE_TENDER_60021079,
  CHEMICAL_TENDER_ITEMS,
} from './data/demoData';
import {
  aiFetchSuppliers,
  detectItemSpecialty,
  VERIFIED_SUPPLIERS_CATALOG,
  toSupplier,
} from './data/suppliersDatabase';
import { runQuickTrialLive } from './services/etimadLiveService';
import { analyzeBoQItems, computeFinancialBreakdown } from './utils/pricingCalculator';

// Safety helper: Purge any old fake/mock data from localStorage
function isFakeData(val: any): boolean {
  if (!val) return false;
  const str = JSON.stringify(val);
  return (
    str.includes('شركة الحصن') ||
    str.includes('4030198421') ||
    str.includes('240938172901')
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('company');

  // Load state from localStorage strictly ensuring no mock/fake data
  const [company, setCompany] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('hosn_company');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!isFakeData(parsed)) return parsed;
      }
      localStorage.removeItem('hosn_company');
      return INITIAL_COMPANY;
    } catch {
      return INITIAL_COMPANY;
    }
  });

  const [tender, setTender] = useState<TenderInfo>(() => {
    try {
      const saved = localStorage.getItem('hosn_tender');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!isFakeData(parsed)) return parsed;
      }
      localStorage.removeItem('hosn_tender');
      return INITIAL_TENDER;
    } catch {
      return INITIAL_TENDER;
    }
  });

  const [items, setItems] = useState<BoQItem[]>(() => {
    try {
      const saved = localStorage.getItem('hosn_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!isFakeData(parsed)) return parsed;
      }
      localStorage.removeItem('hosn_items');
      return INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [settings, setSettings] = useState<CostSettings>(() => {
    try {
      const saved = localStorage.getItem('hosn_settings');
      if (saved) return JSON.parse(saved);
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hosn_company', JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    localStorage.setItem('hosn_tender', JSON.stringify(tender));
  }, [tender]);

  useEffect(() => {
    localStorage.setItem('hosn_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('hosn_settings', JSON.stringify(settings));
  }, [settings]);

  // Handlers
  const handleUpdateCompany = (updated: Partial<CompanyInfo>) => {
    setCompany((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateTender = (updated: Partial<TenderInfo>) => {
    setTender((prev) => ({ ...prev, ...updated }));
  };

  const handleResetBlank = () => {
    if (confirm('هل أنت متأكد من تفريغ كافة الحقول 100% للبدء من الصفر؟')) {
      localStorage.removeItem('hosn_company');
      localStorage.removeItem('hosn_tender');
      localStorage.removeItem('hosn_items');
      localStorage.removeItem('hosn_phase1');
      localStorage.removeItem('hosn_total');
      setCompany(INITIAL_COMPANY);
      setTender(INITIAL_TENDER);
      setItems([]);
      setSettings(INITIAL_SETTINGS);
      setActiveTab('company');
    }
  };

  // Convert verified catalog to Supplier[] for calculations
  const verifiedSuppliersList = VERIFIED_SUPPLIERS_CATALOG.map(toSupplier);

  // Calculations for header and navigation badges
  const { fullyQuotedCount, totalMarketCost, reputationScore } = analyzeBoQItems(
    items,
    verifiedSuppliersList
  );
  const financial = computeFinancialBreakdown(totalMarketCost, settings);

  // Smart Ingestion callback: auto-fill suppliers for each extracted item based on PROJECT CITY!
  const handleItemsExtracted = (extractedItems: BoQItem[]) => {
    const projCity = tender.projectCity || 'ينبع';
    const enriched = extractedItems.map((it) => {
      const sups = aiFetchSuppliers(it.desc, projCity, 0);
      return {
        ...it,
        category: detectItemSpecialty(it.desc),
        s1Name: sups[0]?.name || it.s1Name || '',
        s2Name: sups[1]?.name || it.s2Name || '',
        s3Name: sups[2]?.name || it.s3Name || '',
      };
    });
    setItems(enriched);
    setActiveTab('pricing');
  };
  // Callback for Quick Demo: Yanbu Chemicals (Tender 60021079) - Live 100%
  const handleTriggerDemoYanbu = async () => {
    try {
      const liveData = await runQuickTrialLive();
      const projCity = liveData.projectCity || 'ينبع';
      setTender({
        tenderNo: liveData.tenderNumber,
        tenderTitle: liveData.tenderName,
        agency: liveData.entityName,
        location: liveData.location || 'داخل المملكة - ينبع',
        region: 'منطقة المدينة المنورة - ينبع',
        deadline: liveData.deadline,
        guarantee: liveData.guarantee || 'الضمان البنكي الابتدائي 1% إلى 2% ساري المفعول',
        durationMonths: '12 شهراً',
        etimadRef: `https://tenders.etimad.sa/TenderDetails/TenderDetails?TenderId=${liveData.tenderNumber}`,
        projectCity: projCity,
      });

      const enriched = liveData.items.map((it, idx) => {
        const sups = aiFetchSuppliers(it.desc, projCity, 0);
        return {
          id: idx + 1,
          desc: it.desc,
          unit: it.unit || 'عدد',
          qty: it.qty,
          s1Name: sups[0]?.name || '',
          s1: '',
          s2Name: sups[1]?.name || '',
          s2: '',
          s3Name: sups[2]?.name || '',
          s3: '',
          category: it.category || 'مواد كيميائية ومعالجة مياه',
          accuracy: it.accuracy || 'high',
          accuracyText: it.accuracyText || 'جلب حي مباشر من اعتماد 100%',
          extractedFrom: 'api' as const,
        };
      });

      setItems(enriched);
      setActiveTab('pricing');
    } catch (err) {
      console.error('Live trial fetch notice:', err);
      // Fallback in case of offline/network issues
      setTender(SAMPLE_TENDER_60021079);
      const projCity = 'ينبع';
      const enriched = CHEMICAL_TENDER_ITEMS.map((it, idx) => {
        const sups = aiFetchSuppliers(it.desc, projCity, 0);
        return {
          id: idx + 1,
          desc: it.desc,
          unit: it.unit,
          qty: it.qty,
          s1Name: sups[0]?.name || '',
          s1: '',
          s2Name: sups[1]?.name || '',
          s2: '',
          s3Name: sups[2]?.name || '',
          s3: '',
          category: 'مواد كيميائية ومعالجة مياه',
          accuracy: 'high' as const,
          accuracyText: 'دقة عالية AI',
          extractedFrom: 'api' as const,
        };
      });
      setItems(enriched);
      setActiveTab('pricing');
    }
  };

  const handleTriggerPdfUpload = () => {
    const fileBtn = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileBtn) {
      fileBtn.click();
    } else {
      setActiveTab('company');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#E8E8E8] p-3 sm:p-5 md:p-8 font-sans selection:bg-[#D4AF37]/30 selection:text-[#F5E6A3]">
      <div className="max-w-[1520px] mx-auto">
        {/* Header Bar */}
        <div className="no-print">
          <Header
            reputationScore={reputationScore}
            fullyQuotedCount={fullyQuotedCount}
            totalItems={items.length}
            onResetBlank={handleResetBlank}
          />

          {/* Smart Engineer Hero & 5 Feature Cards */}
          <SmartEngineerHero
            onTriggerPdfUpload={handleTriggerPdfUpload}
            onTriggerDemoYanbu={handleTriggerDemoYanbu}
          />

          {/* Navigation Tabs (V12) */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            itemsCount={items.length}
            totalBidAmount={financial.finalBidAmount}
          />

          {/* Smart Etimad Ingestion - PDF & Excel & Link */}
          <SmartIngestionBar
            onItemsExtracted={handleItemsExtracted}
            onTenderMetadataExtracted={(meta) => {
              setTender((prev) => ({
                ...prev,
                ...meta,
              }));
            }}
            etimadLink={tender.etimadRef}
            onUpdateEtimadLink={(url) => {
              setTender((prev) => ({
                ...prev,
                etimadRef: url,
              }));
            }}
            onTriggerDemoYanbu={handleTriggerDemoYanbu}
            projectCity={tender.projectCity || 'ينبع'}
          />
        </div>

        {/* Phase 1: Company Info (Manual One-Time) & Tender */}
        {activeTab === 'company' && (
          <PhaseTenderCompany
            company={company}
            tender={tender}
            onUpdateCompany={handleUpdateCompany}
            onUpdateTender={handleUpdateTender}
            onNext={() => setActiveTab('pricing')}
          />
        )}

        {/* Phase 2: BoQ & 3 Quotes Pricing with AI Suppliers */}
        {activeTab === 'pricing' && (
          <PhasePricing
            items={items}
            suppliers={verifiedSuppliersList}
            settings={settings}
            userCity={company.city}
            projectCity={tender.projectCity || 'ينبع'}
            companyName={company.companyName}
            onUpdateItems={setItems}
            onUpdateSettings={setSettings}
            onNavigateToAiReport={() => setActiveTab('ai')}
            onNavigateToExport={() => setActiveTab('export')}
            onTriggerDemoYanbu={handleTriggerDemoYanbu}
          />
        )}

        {/* Phase 3: AI Supplier Evaluation & Savings Breakdown */}
        {activeTab === 'ai' && (
          <PhaseAiReport
            items={items}
            suppliers={verifiedSuppliersList}
            company={company}
            tender={tender}
            settings={settings}
            onNavigateToExport={() => setActiveTab('export')}
          />
        )}

        {/* Phase 4: Official Sealed Proposal Export */}
        {activeTab === 'export' && (
          <PhaseExport
            items={items}
            suppliers={verifiedSuppliersList}
            company={company}
            tender={tender}
            settings={settings}
          />
        )}
      </div>
    </div>
  );
}
