import { BoQItem, Supplier, CostSettings, AiAnalysisItem, SupplierQuoteItem } from '../types';
import { VERIFIED_SUPPLIERS_CATALOG } from '../data/suppliersDatabase';

export function getSupplierDetails(name: string, suppliers: Supplier[] = []): { phone: string; address: string; vat: string; verified: boolean } {
  // First check custom suppliers
  const found = (suppliers || []).find((s) => s.name.trim() === name.trim());
  if (found) {
    return {
      phone: found.phone || 'غير مسجل',
      address: found.address || 'غير محدد',
      vat: found.vat || '-',
      verified: !!found.verified,
    };
  }

  // Second check the 30-supplier verified internal catalog
  const catalogFound = VERIFIED_SUPPLIERS_CATALOG.find((s) => s.name.trim() === name.trim());
  if (catalogFound) {
    return {
      phone: catalogFound.phone,
      address: catalogFound.address,
      vat: catalogFound.vat,
      verified: true,
    };
  }

  return {
    phone: '⚠️ غير مسجل بالقاعدة - خطر على السمعة',
    address: 'غير مسجل',
    vat: '-',
    verified: false,
  };
}

export function analyzeBoQItems(items: BoQItem[], suppliers: Supplier[]): {
  analysisItems: AiAnalysisItem[];
  totalMarketCost: number;
  totalMarketSaving: number;
  fullyQuotedCount: number;
  missingQuotesCount: number;
  reputationScore: number;
  unverifiedSupplierAlerts: number;
} {
  let totalMarketCost = 0;
  let totalMarketSaving = 0;
  let fullyQuotedCount = 0;
  let missingQuotesCount = 0;
  let unverifiedSupplierAlerts = 0;

  const analysisItems: AiAnalysisItem[] = [];

  items.forEach((item) => {
    const q1Val = parseFloat(String(item.s1)) || 0;
    const q2Val = parseFloat(String(item.s2)) || 0;
    const q3Val = parseFloat(String(item.s3)) || 0;
    const qty = parseFloat(String(item.qty)) || 0;

    const validQuotes: SupplierQuoteItem[] = [];

    if (item.s1Name && q1Val > 0) {
      const sup = getSupplierDetails(item.s1Name, suppliers);
      validQuotes.push({
        name: item.s1Name,
        price: q1Val,
        phone: sup.phone,
        address: sup.address,
        vat: sup.vat,
      });
    }

    if (item.s2Name && q2Val > 0) {
      const sup = getSupplierDetails(item.s2Name, suppliers);
      validQuotes.push({
        name: item.s2Name,
        price: q2Val,
        phone: sup.phone,
        address: sup.address,
        vat: sup.vat,
      });
    }

    if (item.s3Name && q3Val > 0) {
      const sup = getSupplierDetails(item.s3Name, suppliers);
      validQuotes.push({
        name: item.s3Name,
        price: q3Val,
        phone: sup.phone,
        address: sup.address,
        vat: sup.vat,
      });
    }

    if (validQuotes.length === 3) {
      fullyQuotedCount++;
    } else {
      missingQuotesCount++;
    }

    if (validQuotes.length > 0) {
      // Sort ascending to get lowest
      validQuotes.sort((a, b) => a.price - b.price);
      const cheapest = { ...validQuotes[0], isLowest: true };
      const highest = validQuotes[validQuotes.length - 1];
      const runnerUps = validQuotes.slice(1);

      const unitSaving = highest.price - cheapest.price;
      const itemTotalSaving = unitSaving * qty;
      const itemTotalCost = cheapest.price * qty;

      totalMarketCost += itemTotalCost;
      totalMarketSaving += itemTotalSaving;

      let status: 'compliant' | 'warning' | 'critical' = 'compliant';
      let warningMessage = '';

      if (cheapest.phone.includes('خطر') || cheapest.phone.includes('غير مسجل')) {
        unverifiedSupplierAlerts++;
        status = 'critical';
        warningMessage = 'المورد الأقل سعراً غير مقيد بقاعدة الموردين المعتمدين - يعرض العرض للاستبعاد';
      } else if (validQuotes.length < 3) {
        status = 'warning';
        warningMessage = `يوجد فقط ${validQuotes.length} من 3 عروض أسعار ملزمة نظامياً`;
      } else if (highest.price > cheapest.price * 1.8) {
        status = 'warning';
        warningMessage = 'تفاوت سعري شاذ يتجاوز 80% بين أعلى وأقل عرض';
      }

      analysisItems.push({
        id: item.id,
        desc: item.desc || `بند رقم ${item.id}`,
        unit: item.unit || 'عدد',
        qty,
        cheapest,
        runnerUps,
        allQuotes: validQuotes,
        unitSaving,
        totalSaving: itemTotalSaving,
        totalCost: itemTotalCost,
        status,
        warningMessage,
      });
    } else {
      // No quotes yet
      analysisItems.push({
        id: item.id,
        desc: item.desc || `بند رقم ${item.id}`,
        unit: item.unit || 'عدد',
        qty,
        cheapest: {
          name: 'لم يُسعر بعد',
          price: 0,
          phone: '-',
          address: '-',
          vat: '-',
        },
        runnerUps: [],
        allQuotes: [],
        unitSaving: 0,
        totalSaving: 0,
        totalCost: 0,
        status: 'critical',
        warningMessage: 'بند فارغ لم يتم تسجيل أي تسعير له',
      });
    }
  });

  // Calculate Reputation Score (out of 100)
  const totalItemsCount = Math.max(items.length, 1);
  const quoteRatio = fullyQuotedCount / totalItemsCount; // weight 45%
  const verifiedPenalty = unverifiedSupplierAlerts * 15; // penalty
  const rawScore = quoteRatio * 85 + (totalItemsCount > 0 && totalMarketCost > 0 ? 15 : 0) - verifiedPenalty;
  const reputationScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  return {
    analysisItems,
    totalMarketCost,
    totalMarketSaving,
    fullyQuotedCount,
    missingQuotesCount,
    reputationScore,
    unverifiedSupplierAlerts,
  };
}

export function computeFinancialBreakdown(totalMarketCost: number, settings: CostSettings) {
  const operationalAmount = (totalMarketCost * (settings.operationalRate || 0)) / 100;
  const baseCost = totalMarketCost + operationalAmount;
  const contingencyAmount = (baseCost * (settings.contingencyRate || 0)) / 100;
  const profitAmount = ((baseCost + contingencyAmount) * (settings.profitRate || 0)) / 100;

  const totalBeforeTaxes = baseCost + contingencyAmount + profitAmount;
  const zakatAmount = (totalBeforeTaxes * (settings.zakatRate || 2.5)) / 100;
  const vatAmount = (totalBeforeTaxes * (settings.vatRate || 15)) / 100;
  const finalBidAmount = totalBeforeTaxes + vatAmount;

  return {
    marketDirectCost: totalMarketCost,
    operationalAmount,
    contingencyAmount,
    profitAmount,
    totalBeforeTaxes,
    zakatAmount,
    vatAmount,
    finalBidAmount,
  };
}
