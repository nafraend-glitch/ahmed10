export interface CompanyInfo {
  companyName: string;
  crNo: string;
  vatNo: string;
  ownerName: string;
  delegateName: string;
  engineerName: string;
  engineerPhone: string;
  companyPhone?: string;
  companyEmail: string;
  city: string;
  iban: string;
  bankName: string;
  classification: string;
}

export interface TenderInfo {
  tenderNo: string;
  tenderTitle: string;
  agency: string;
  location: string;
  region: string;
  deadline: string;
  guarantee: string;
  durationMonths: string;
  etimadRef: string;
  projectCity?: string;
}

export interface Supplier {
  id: string;
  name: string;
  cat: string;
  phone: string;
  address: string;
  vat: string;
  crNo?: string;
  rating?: number;
  verified?: boolean;
  paymentTerms?: string;
}

export interface BoQItem {
  id: number;
  desc: string;
  unit: string;
  qty: string | number;
  s1Name: string;
  s1: string | number;
  s2Name: string;
  s2: string | number;
  s3Name: string;
  s3: string | number;
  specNotes?: string;
  category?: string;
  accuracy?: 'high' | 'medium' | 'manual' | 'low';
  accuracyText?: string;
  extractedFrom?: 'pdf' | 'excel' | 'manual' | 'api';
}

export interface CostSettings {
  operationalRate: number; // مصاريف موقع وإدارة
  profitRate: number;      // هامش الربح
  zakatRate: number;       // الزكاة الشرعية (2.5%)
  vatRate: number;         // ضريبة القيمة المضافة (15%)
  contingencyRate: number; // احتياطي المخاطر
}

export interface SupplierQuoteItem {
  name: string;
  price: number;
  phone: string;
  address: string;
  vat: string;
  isLowest?: boolean;
}

export interface AiAnalysisItem {
  id: number;
  desc: string;
  unit: string;
  qty: number;
  cheapest: SupplierQuoteItem;
  runnerUps: SupplierQuoteItem[];
  allQuotes: SupplierQuoteItem[];
  unitSaving: number;
  totalSaving: number;
  totalCost: number;
  status: 'compliant' | 'warning' | 'critical';
  warningMessage?: string;
}
