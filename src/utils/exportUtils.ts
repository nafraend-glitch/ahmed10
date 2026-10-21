import { BoQItem, Supplier, CompanyInfo, TenderInfo, AiAnalysisItem } from '../types';
import { getSupplierDetails } from './pricingCalculator';

export function exportBoQToCsv(
  items: BoQItem[],
  suppliers: Supplier[],
  company: CompanyInfo,
  tender: TenderInfo
) {
  // UTF-8 BOM for Arabic text in Excel
  const BOM = '\uFEFF';
  let csv = BOM;

  csv += `منظومة حصن برو - جدول الكميات والتسعير المقارن لثلاثة موردين\n`;
  csv += `اسم المنشأة,${escapeCsv(company.companyName)},السجل التجاري,${escapeCsv(company.crNo)},الرقم الضريبي,${escapeCsv(company.vatNo)}\n`;
  csv += `رقم المنافسة,${escapeCsv(tender.tenderNo)},موضوع المنافسة,${escapeCsv(tender.tenderTitle)},الجهة الحكومية,${escapeCsv(tender.agency)}\n`;
  csv += `مقر المنافسة,${escapeCsv(tender.location)},تاريخ تقديم العطاء,${escapeCsv(tender.deadline)},المهندس المسؤول,${escapeCsv(company.engineerName)}\n\n`;

  csv += `م,الوصف الدقيق للبند,الوحدة,الكمية,مورد 1,سعر 1,جوال مورد 1,عنوان مورد 1,مورد 2,سعر 2,جوال مورد 2,عنوان مورد 2,مورد 3,سعر 3,جوال مورد 3,عنوان مورد 3,الأقل سعراً,إجمالي البند بالأقل سعراً\n`;

  items.forEach((it, idx) => {
    const s1Det = getSupplierDetails(it.s1Name, suppliers);
    const s2Det = getSupplierDetails(it.s2Name, suppliers);
    const s3Det = getSupplierDetails(it.s3Name, suppliers);

    const v1 = parseFloat(String(it.s1)) || 0;
    const v2 = parseFloat(String(it.s2)) || 0;
    const v3 = parseFloat(String(it.s3)) || 0;
    const qty = parseFloat(String(it.qty)) || 0;

    const validVals = [v1, v2, v3].filter((v) => v > 0);
    const minVal = validVals.length > 0 ? Math.min(...validVals) : 0;
    const totalItem = minVal * qty;

    csv += `${idx + 1},${escapeCsv(it.desc)},${escapeCsv(it.unit)},${qty},${escapeCsv(it.s1Name)},${v1},${escapeCsv(s1Det.phone)},${escapeCsv(s1Det.address)},${escapeCsv(it.s2Name)},${v2},${escapeCsv(s2Det.phone)},${escapeCsv(s2Det.address)},${escapeCsv(it.s3Name)},${v3},${escapeCsv(s3Det.phone)},${escapeCsv(s3Det.address)},${minVal},${totalItem}\n`;
  });

  downloadCsv(csv, `جدول_الكميات_المقارن_${tender.tenderNo || 'منافسة'}.csv`);
}

export function exportAiReportToCsv(
  analysis: AiAnalysisItem[],
  company: CompanyInfo,
  tender: TenderInfo,
  totalSaving: number,
  totalCost: number
) {
  const BOM = '\uFEFF';
  let csv = BOM;

  csv += `تقرير الذكاء الاصطناعي لفرز الموردين وحماية السمعة - حصن برو\n`;
  csv += `مطابق للمادة 11 من اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية\n`;
  csv += `الشركة,${escapeCsv(company.companyName)},السجل,${escapeCsv(company.crNo)},الضريبي,${escapeCsv(company.vatNo)}\n`;
  csv += `المنافسة,${escapeCsv(tender.tenderNo)},الجهة,${escapeCsv(tender.agency)},المقر,${escapeCsv(tender.location)}\n`;
  csv += `إجمالي تكلفة الموردين المعتمدين,${totalCost} ر.س,إجمالي الوفر المحقق باختيار الأقل سعراً,${totalSaving} ر.س\n\n`;

  csv += `البند,الوصف الدقيق للبند,الوحدة,الكمية,المورد الأقل سعراً (الفائز),سعر الوحدة,إجمالي البند,رقم جوال المورد,عنوان المورد بالتفصيل,الرقم الضريبي للمورد,الموردين الآخرين (فرز الأسعار),الوفر بالوحدة,إجمالي الوفر للبند,حالة الامتثال\n`;

  analysis.forEach((a) => {
    const runnerStr = a.runnerUps.map((r) => `${r.name}: ${r.price} ر.س`).join(' | ');
    const statusArabic = a.status === 'compliant' ? 'مطابق نظامياً' : a.status === 'warning' ? 'تنبيه' : 'حرج';

    csv += `${a.id},${escapeCsv(a.desc)},${escapeCsv(a.unit)},${a.qty},${escapeCsv(a.cheapest.name)},${a.cheapest.price},${a.totalCost},${escapeCsv(a.cheapest.phone)},${escapeCsv(a.cheapest.address)},${escapeCsv(a.cheapest.vat)},${escapeCsv(runnerStr)},${a.unitSaving},${a.totalSaving},${statusArabic}\n`;
  });

  downloadCsv(csv, `تقرير_AI_فرز_الموردين_${tender.tenderNo || 'حماية_السمعة'}.csv`);
}

function escapeCsv(text: string | undefined): string {
  if (!text) return '""';
  const clean = String(text).replace(/"/g, '""');
  return `"${clean}"`;
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
