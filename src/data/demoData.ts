import { CompanyInfo, TenderInfo, Supplier, BoQItem, CostSettings } from '../types';

export const INITIAL_COMPANY: CompanyInfo = {
  companyName: '',
  crNo: '',
  vatNo: '',
  ownerName: '',
  delegateName: '',
  engineerName: '',
  engineerPhone: '',
  companyEmail: '',
  city: '',
  iban: '',
  bankName: '',
  classification: '',
};

export const INITIAL_TENDER: TenderInfo = {
  tenderNo: '',
  tenderTitle: '',
  agency: '',
  location: '',
  region: '',
  deadline: '',
  guarantee: '',
  durationMonths: '',
  etimadRef: '',
  projectCity: 'ينبع',
};

export const SAMPLE_TENDER_60021079: TenderInfo = {
  tenderNo: '60021079',
  tenderTitle: 'توريد مواد كيميائية لمنظومة انتاج مياه ينبع',
  agency: 'الهيئة السعودية للمياه',
  location: 'داخل المملكة - ينبع',
  region: 'ينبع',
  projectCity: 'ينبع',
  deadline: '2026-11-04',
  guarantee: 'ساري المفعول وفق كراسة الشروط',
  durationMonths: '12 شهراً',
  etimadRef: 'ETMD-SWA-60021079',
};

export const CHEMICAL_TENDER_ITEMS = [
  { desc: 'هيبوكلوريت الصوديوم 12% - معالجة مياه', qty: '5000', unit: 'لتر' },
  { desc: 'حمض الكبريتيك 98%', qty: '2000', unit: 'كجم' },
  { desc: 'مادة مانع ترسب Antiscalant SW', qty: '1000', unit: 'كجم' },
  { desc: 'كلوريد الحديديك FeCl3', qty: '3000', unit: 'كجم' },
  { desc: 'هيدروكسيد الصوديوم 50%', qty: '1500', unit: 'كجم' },
];

export const INITIAL_SETTINGS: CostSettings = {
  operationalRate: 0,
  profitRate: 0,
  zakatRate: 2.5,
  vatRate: 15,
  contingencyRate: 0,
};

export const INITIAL_SUPPLIERS: Supplier[] = [];

export const INITIAL_ITEMS: BoQItem[] = [];
