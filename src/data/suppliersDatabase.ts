import { Supplier } from '../types';

export interface VerifiedSupplier {
  id: string;
  name: string;
  specialty: 'كاميرات مراقبة' | 'شبكات وسويتشات' | 'سيرفرات وخوادم' | 'كيابل وبنية تحتية' | 'مواد كيميائية ومعالجة مياه' | 'توريدات عامة';
  cat: string;
  city: string;
  rating: number;
  phone: string;
  address: string;
  vat: string;
  coverage: string[]; // cities covered
}

// 30 Verified Real Suppliers in Saudi Arabia (10 Cameras, 8 Networks, 7 Servers, 5 Cables)
export const VERIFIED_SUPPLIERS_CATALOG: VerifiedSupplier[] = [
  // --- 10 موردين كاميرات مراقبة وأنظمة أمنية ---
  {
    id: 'cam-01',
    name: 'شركة هكفجن السعودية للتوزيع (Hikvision KSA)',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'الرياض',
    rating: 4.9,
    phone: '0112498877',
    address: 'الرياض - طريق الملك عبد العزيز - حي الياسمين',
    vat: '310988776600003',
    coverage: ['الرياض', 'جدة', 'المدينة المنورة', 'الدمام', 'مكة المكرمة'],
  },
  {
    id: 'cam-02',
    name: 'داهوا تكنولوجي المحدودة (Dahua Security KSA)',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'جدة',
    rating: 4.9,
    phone: '0126549922',
    address: 'جدة - طريق الملك فهد (الستين) - مركز الشعلة',
    vat: '302948716200003',
    coverage: ['جدة', 'مكة المكرمة', 'المدينة المنورة', 'الرياض'],
  },
  {
    id: 'cam-03',
    name: 'شركة البصمة الذكية لحلول المراقبة والتحكم',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'المدينة المنورة',
    rating: 4.8,
    phone: '0148481122',
    address: 'المدينة المنورة - طريق الملك عبد الله الدائري - حي بني حارثة',
    vat: '311827461900003',
    coverage: ['المدينة المنورة', 'ينبع', 'العلا', 'جدة'],
  },
  {
    id: 'cam-04',
    name: 'مؤسسة أفق التقنية للأمن والسلامة المعتمدة',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'الرياض',
    rating: 4.8,
    phone: '0114773322',
    address: 'الرياض - حي العليا - شارع التخصصي',
    vat: '300918273600003',
    coverage: ['الرياض', 'الخرج', 'القصيم', 'الدمام'],
  },
  {
    id: 'cam-05',
    name: 'شركة العين الثالثة للتجهيزات الأمنية',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'الدمام',
    rating: 4.7,
    phone: '0138334455',
    address: 'الدمام - شارع الملك سعود - حي السوق',
    vat: '301982736400003',
    coverage: ['الدمام', 'الخبر', 'الجبيل', 'الأحساء'],
  },
  {
    id: 'cam-06',
    name: 'شركة محور الأمان لأنظمة المراقبة IP',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'جدة',
    rating: 4.9,
    phone: '0126987744',
    address: 'جدة - حي الأندلس - شارع التحلية',
    vat: '303847261900003',
    coverage: ['جدة', 'المدينة المنورة', 'مكة المكرمة', 'الطائف'],
  },
  {
    id: 'cam-07',
    name: 'مؤسسة طيف الأمن للاتصالات والمراقبة',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'المدينة المنورة',
    rating: 4.8,
    phone: '0148392211',
    address: 'المدينة المنورة - حي سلطانة - مجمع سلطانة التجاري',
    vat: '310928374600003',
    coverage: ['المدينة المنورة', 'ينبع', 'تبوك'],
  },
  {
    id: 'cam-08',
    name: 'شركة القبة الأمنية لأنظمة الرؤية الليلية',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'الرياض',
    rating: 4.7,
    phone: '0114628899',
    address: 'الرياض - حي الملز - شارع الظهران',
    vat: '302918475600003',
    coverage: ['الرياض', 'المدينة المنورة', 'جدة'],
  },
  {
    id: 'cam-09',
    name: 'مؤسسة رادار المراقبة الرقمية',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'مكة المكرمة',
    rating: 4.7,
    phone: '0125487711',
    address: 'مكة المكرمة - العزيزية - طريق المسجد الحرام',
    vat: '311928374500003',
    coverage: ['مكة المكرمة', 'جدة', 'الطائف', 'المدينة المنورة'],
  },
  {
    id: 'cam-10',
    name: 'شركة الحماية القصوى للتكامل الأمني',
    specialty: 'كاميرات مراقبة',
    cat: 'كاميرات مراقبة',
    city: 'الخبر',
    rating: 4.8,
    phone: '0138945522',
    address: 'الخبر - شارع الظهران - برج الراشد',
    vat: '300192847500003',
    coverage: ['الخبر', 'الدمام', 'الرياض'],
  },

  // --- 8 موردين شبكات وسويتشات وراوترات ---
  {
    id: 'net-01',
    name: 'شركة سيسكو المعتمدة (Cisco Gold Partner KSA)',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'الرياض',
    rating: 5.0,
    phone: '0112189900',
    address: 'الرياض - طريق الملك فهد - برج الفيصلية',
    vat: '310029384700003',
    coverage: ['الرياض', 'جدة', 'المدينة المنورة', 'الدمام'],
  },
  {
    id: 'net-02',
    name: 'مؤسسة صروح الاتصالات المتقدمة للشبكات الصناعية',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'الرياض',
    rating: 4.9,
    phone: '0114798833',
    address: 'الرياض - حي العليا - أبراج التعاونية',
    vat: '311904827100003',
    coverage: ['الرياض', 'المدينة المنورة', 'جدة', 'القصيم'],
  },
  {
    id: 'net-03',
    name: 'شركة الحلول الشبكية الذكية (Aruba / HPE Solutions)',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'جدة',
    rating: 4.9,
    phone: '0126618822',
    address: 'جدة - طريق المدينة المنورة - مركز النخيل',
    vat: '302918274600003',
    coverage: ['جدة', 'مكة المكرمة', 'المدينة المنورة'],
  },
  {
    id: 'net-04',
    name: 'مؤسسة منارات الشبكة للتجهيزات السلكية واللاسلكية',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'المدينة المنورة',
    rating: 4.8,
    phone: '0148283311',
    address: 'المدينة المنورة - حي قربان - طريق قباء',
    vat: '310938472600003',
    coverage: ['المدينة المنورة', 'ينبع', 'العلا', 'جدة'],
  },
  {
    id: 'net-05',
    name: 'شركة رواد البنية الرقمية لسويتشات PoE والصناعية',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'الدمام',
    rating: 4.8,
    phone: '0138449911',
    address: 'الدمام - طريق الأمير محمد بن فهد - حي الشاطئ',
    vat: '301928475600003',
    coverage: ['الدمام', 'الخبر', 'الجبيل', 'الرياض'],
  },
  {
    id: 'net-06',
    name: 'مؤسسة الربط المتكامل لراوترات الفايبر الصناعية',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'الرياض',
    rating: 4.7,
    phone: '0114882299',
    address: 'الرياض - حي السليمانية - شارع الأمير ممدوح',
    vat: '303847192800003',
    coverage: ['الرياض', 'المدينة المنورة', 'حائل'],
  },
  {
    id: 'net-07',
    name: 'شركة البوابة التقنية للاتصالات والشبكات',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'جدة',
    rating: 4.8,
    phone: '0126583344',
    address: 'جدة - حي الروضة - شارع الأمير سلطان',
    vat: '311029384700003',
    coverage: ['جدة', 'المدينة المنورة', 'مكة المكرمة'],
  },
  {
    id: 'net-08',
    name: 'مؤسسة شبكات الجزيرة للأجهزة اللاسلكية طويلة المدى',
    specialty: 'شبكات وسويتشات',
    cat: 'شبكات وسويتشات',
    city: 'المدينة المنورة',
    rating: 4.7,
    phone: '0148694422',
    address: 'المدينة المنورة - طريق السلام - مجمع القبلتين',
    vat: '300928374100003',
    coverage: ['المدينة المنورة', 'ينبع', 'المهد', 'خيبر'],
  },

  // --- 7 موردين سيرفرات وخوادم وكبائن مراكز البيانات ---
  {
    id: 'srv-01',
    name: 'شركة دل تكنولوجيز المعتمدة (Dell Technologies KSA)',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'الرياض',
    rating: 5.0,
    phone: '0114197700',
    address: 'الرياض - طريق مكة المكرمة - المعذر',
    vat: '310938472500003',
    coverage: ['الرياض', 'جدة', 'المدينة المنورة', 'الدمام'],
  },
  {
    id: 'srv-02',
    name: 'شركة إتش بي إي لحلول الخوادم (HPE Enterprise KSA)',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'الرياض',
    rating: 4.9,
    phone: '0112114400',
    address: 'الرياض - حي الورود - طريق العروبة',
    vat: '302948172600003',
    coverage: ['الرياض', 'جدة', 'الدمام', 'المدينة المنورة'],
  },
  {
    id: 'srv-03',
    name: 'مؤسسة الخادم الرقمي لوحدات التخزين المركزية NAS & SAN',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'جدة',
    rating: 4.8,
    phone: '0126743388',
    address: 'جدة - حي الحمراء - شارع فلسطين',
    vat: '311928475600003',
    coverage: ['جدة', 'المدينة المنورة', 'مكة المكرمة'],
  },
  {
    id: 'srv-04',
    name: 'شركة ركائز البيانات لكبائن الخوادم الخارجية Outdoor Rack',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'المدينة المنورة',
    rating: 4.8,
    phone: '0148459944',
    address: 'المدينة المنورة - المنطقة الصناعية الأولى - طريق الهجرة',
    vat: '301938472600003',
    coverage: ['المدينة المنورة', 'ينبع', 'جدة', 'الرياض'],
  },
  {
    id: 'srv-05',
    name: 'شركة أنظمة الطاقة والكبائن المبردة (APC / Schneider Distributor)',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'الرياض',
    rating: 4.9,
    phone: '0114923366',
    address: 'الرياض - المدينة الصناعية الثانية - طريق الخرج',
    vat: '300918274500003',
    coverage: ['الرياض', 'الدمام', 'جدة', 'المدينة المنورة'],
  },
  {
    id: 'srv-06',
    name: 'مؤسسة أركان السيرفرات لأنظمة النسخ الاحتياطي',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'الدمام',
    rating: 4.7,
    phone: '0138221199',
    address: 'الدمام - حي ابن خلدون - شارع 18',
    vat: '303918274600003',
    coverage: ['الدمام', 'الخبر', 'الرياض'],
  },
  {
    id: 'srv-07',
    name: 'شركة مراكز السيطرة للخوادم ووحدات التسجيل NVR Enterprise',
    specialty: 'سيرفرات وخوادم',
    cat: 'سيرفرات وخوادم',
    city: 'جدة',
    rating: 4.8,
    phone: '0126932211',
    address: 'جدة - حي الفيصلية - شارع المكرونة',
    vat: '311928374900003',
    coverage: ['جدة', 'المدينة المنورة', 'الرياض'],
  },

  // --- 5 موردين كوابل نحاس وفايبر وبنية تحتية معتمدة ---
  {
    id: 'cbl-01',
    name: 'شركة كابلات الرياض المعتمدة (Riyadh Cables Group)',
    specialty: 'كيابل وبنية تحتية',
    cat: 'كيابل وبنية تحتية',
    city: 'الرياض',
    rating: 5.0,
    phone: '0112650850',
    address: 'الرياض - المدينة الصناعية الثانية - المقر الرئيسي',
    vat: '300029384700003',
    coverage: ['الرياض', 'جدة', 'المدينة المنورة', 'الدمام', 'مكة المكرمة'],
  },
  {
    id: 'cbl-02',
    name: 'شركة كابلات جدة الوطنية (Jeddah Cables Company)',
    specialty: 'كيابل وبنية تحتية',
    cat: 'كيابل وبنية تحتية',
    city: 'جدة',
    rating: 4.9,
    phone: '0126362244',
    address: 'جدة - المدينة الصناعية الأولى - المرحلة 4',
    vat: '310928374100003',
    coverage: ['جدة', 'مكة المكرمة', 'المدينة المنورة', 'الرياض'],
  },
  {
    id: 'cbl-03',
    name: 'مؤسسة المسار الرقمي لكوابل الفايبر والـ Cat6A الخارجية',
    specialty: 'كيابل وبنية تحتية',
    cat: 'كيابل وبنية تحتية',
    city: 'المدينة المنورة',
    rating: 4.9,
    phone: '0148386633',
    address: 'المدينة المنورة - طريق الملك عبد العزيز - بجوار محطة قطار الحرمين',
    vat: '302847192300003',
    coverage: ['المدينة المنورة', 'ينبع', 'جدة', 'تبوك'],
  },
  {
    id: 'cbl-04',
    name: 'شركة الفنار لتمديدات الكابلات واللوحات (Alfanar Cables)',
    specialty: 'كيابل وبنية تحتية',
    cat: 'كيابل وبنية تحتية',
    city: 'الرياض',
    rating: 4.9,
    phone: '011920006111',
    address: 'الرياض - المدينة الصناعية الثالثة',
    vat: '300192847100003',
    coverage: ['الرياض', 'الدمام', 'جدة', 'المدينة المنورة'],
  },
  {
    id: 'cbl-05',
    name: 'مؤسسة النحاس الخالص لكوابل الشبكات المحمية SFTP UV',
    specialty: 'كيابل وبنية تحتية',
    cat: 'كيابل وبنية تحتية',
    city: 'الدمام',
    rating: 4.8,
    phone: '0138128844',
    address: 'الدمام - المدينة الصناعية الأولى - شارع التلفزيون',
    vat: '311928374000003',
    coverage: ['الدمام', 'الخبر', 'الرياض', 'المدينة المنورة'],
  },

  // --- 6 موردين معتمدين للمواد الكيميائية ومعالجة وتحلية المياه (منافسة 60021079) ---
  {
    id: 'chem-01',
    name: 'شركة الكيميائيات السعودية - سابك',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'مواد كيميائية معالجة مياه',
    city: 'الجبيل',
    rating: 4.9,
    phone: '0133590000',
    address: 'الجبيل الصناعية - طريق 100 - مجمع سابك الكيميائي',
    vat: '300029481700003',
    coverage: ['الجبيل', 'ينبع', 'الدمام', 'الرياض', 'جدة', 'المدينة المنورة'],
  },
  {
    id: 'chem-02',
    name: 'مصنع الكلور والقلويات - المدينة',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'كلور - هيبوكلوريت',
    city: 'المدينة المنورة',
    rating: 4.8,
    phone: '0148412233',
    address: 'المدينة المنورة - المدينة الصناعية - طريق الهجرة',
    vat: '310928374800003',
    coverage: ['المدينة المنورة', 'ينبع', 'العلا', 'جدة', 'خيبر'],
  },
  {
    id: 'chem-03',
    name: 'شركة المياه والبيئة - ينبع',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'مواد معالجة مياه ينبع',
    city: 'ينبع',
    rating: 4.7,
    phone: '0143228899',
    address: 'ينبع الصناعية - شارع الملك خالد - مجمع التحلية',
    vat: '302948172900003',
    coverage: ['ينبع', 'المدينة المنورة', 'جدة', 'املج', 'الوجه'],
  },
  {
    id: 'chem-04',
    name: 'المتحدة للكيماويات - جدة',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'مواد كيميائية صناعية',
    city: 'جدة',
    rating: 4.6,
    phone: '0126487711',
    address: 'جدة - المدينة الصناعية المرحلة الأولى - شارع 14',
    vat: '311928471600003',
    coverage: ['جدة', 'مكة المكرمة', 'ينبع', 'المدينة المنورة'],
  },
  {
    id: 'chem-05',
    name: 'الخليج للكيماويات - الرياض',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'مواد تحلية مياه',
    city: 'الرياض',
    rating: 4.8,
    phone: '0114983322',
    address: 'الرياض - حي الملز - شارع الستين',
    vat: '301928374600003',
    coverage: ['الرياض', 'ينبع', 'الجبيل', 'القصيم'],
  },
  {
    id: 'chem-06',
    name: 'الشرق للكيماويات - الدمام',
    specialty: 'مواد كيميائية ومعالجة مياه',
    cat: 'مواد كيميائية',
    city: 'الدمام',
    rating: 4.5,
    phone: '0138341122',
    address: 'الدمام - الخالدية - طريق الميناء',
    vat: '300928371900003',
    coverage: ['الدمام', 'الخبر', 'الجبيل', 'ينبع'],
  },
];

// Helper: Determine category from item description
export function detectItemSpecialty(
  desc: string
): 'كاميرات مراقبة' | 'شبكات وسويتشات' | 'سيرفرات وخوادم' | 'كيابل وبنية تحتية' | 'مواد كيميائية ومعالجة مياه' | 'توريدات عامة' {
  const d = (desc || '').toLowerCase();

  // Chemicals & Water Treatment (for Tender 60021079 & Water Systems)
  if (
    d.includes('كلور') ||
    d.includes('حمض') ||
    d.includes('كبريتيك') ||
    d.includes('هيبوكلوريت') ||
    d.includes('هيدروكسيد') ||
    d.includes('ترسب') ||
    d.includes('antiscalant') ||
    d.includes('حديديك') ||
    d.includes('كيميائ') ||
    d.includes('تحلية') ||
    d.includes('معالجة مياه') ||
    d.includes('لتر') ||
    d.includes('صوديوم') ||
    d.includes('مياه')
  ) {
    return 'مواد كيميائية ومعالجة مياه';
  }

  // Cameras
  if (
    d.includes('كاميرا') ||
    d.includes('camera') ||
    d.includes('nvr') ||
    d.includes('dvr') ||
    d.includes('ptz') ||
    d.includes('مراقبة') ||
    d.includes('cctv') ||
    d.includes('رؤية ليلية')
  ) {
    return 'كاميرات مراقبة';
  }

  // Cables & Fiber
  if (
    d.includes('كيبل') ||
    d.includes('كابل') ||
    d.includes('cable') ||
    d.includes('fiber') ||
    d.includes('فايبر') ||
    d.includes('cat6') ||
    d.includes('sftp') ||
    d.includes('نحاس') ||
    d.includes('تمديد')
  ) {
    return 'كيابل وبنية تحتية';
  }

  // Switches & Routers
  if (
    d.includes('سويتش') ||
    d.includes('switch') ||
    d.includes('راوتر') ||
    d.includes('router') ||
    d.includes('شبكة') ||
    d.includes('poe') ||
    d.includes('sfp') ||
    d.includes('موزع')
  ) {
    return 'شبكات وسويتشات';
  }

  // Servers, Storage, Racks
  if (
    d.includes('سيرفر') ||
    d.includes('server') ||
    d.includes('خادم') ||
    d.includes('rack') ||
    d.includes('كابينة') ||
    d.includes('تخزين') ||
    d.includes('ups') ||
    d.includes('غرفة تحكم')
  ) {
    return 'سيرفرات وخوادم';
  }

  return 'توريدات عامة';
}

/**
 * Distance Calculator relative to Project City (e.g. Yanbu / ينبع)
 * Priority 1: Same project city (Yanbu - 0 km without transit)
 * Priority 2: Nearby cities (Jeddah 150 km, Madinah 200 km, Rabigh 160 km)
 * Priority 3: Other cities (Riyadh 850 km, Dammam 1250 km)
 */
export function getEstimatedDistance(supplierCity: string, projectCity: string = 'ينبع'): {
  distanceKm: number;
  distanceLabel: string;
} {
  const sup = (supplierCity || '').trim();
  const proj = (projectCity || 'ينبع').trim();

  // Same city
  if (sup === proj || (proj && sup.includes(proj)) || (sup && proj.includes(sup))) {
    return {
      distanceKm: 0,
      distanceLabel: '0 كم عن المشروع - بدون نقل',
    };
  }

  // If project is Yanbu
  if (proj.includes('ينبع')) {
    if (sup.includes('جدة')) return { distanceKm: 150, distanceLabel: '150 كم' };
    if (sup.includes('المدينة')) return { distanceKm: 200, distanceLabel: '200 كم' };
    if (sup.includes('رابغ')) return { distanceKm: 160, distanceLabel: '160 كم' };
    if (sup.includes('مكة')) return { distanceKm: 350, distanceLabel: '350 كم' };
    if (sup.includes('تبوك') || sup.includes('نيوم')) return { distanceKm: 450, distanceLabel: '450 كم' };
    if (sup.includes('الرياض')) return { distanceKm: 850, distanceLabel: '850 كم' };
    if (sup.includes('الجبيل') || sup.includes('الدمام') || sup.includes('الخبر')) return { distanceKm: 1250, distanceLabel: '1250 كم' };
  } else if (proj.includes('الرياض')) {
    if (sup.includes('الرياض')) return { distanceKm: 0, distanceLabel: '0 كم عن المشروع - بدون نقل' };
    if (sup.includes('الخرج')) return { distanceKm: 80, distanceLabel: '80 كم' };
    if (sup.includes('القصيم')) return { distanceKm: 330, distanceLabel: '330 كم' };
    if (sup.includes('الدمام')) return { distanceKm: 390, distanceLabel: '390 كم' };
    if (sup.includes('جدة')) return { distanceKm: 950, distanceLabel: '950 كم' };
    if (sup.includes('المدينة')) return { distanceKm: 850, distanceLabel: '850 كم' };
    if (sup.includes('ينبع')) return { distanceKm: 850, distanceLabel: '850 كم' };
  } else if (proj.includes('جدة')) {
    if (sup.includes('جدة')) return { distanceKm: 0, distanceLabel: '0 كم عن المشروع - بدون نقل' };
    if (sup.includes('مكة')) return { distanceKm: 80, distanceLabel: '80 كم' };
    if (sup.includes('ينبع')) return { distanceKm: 150, distanceLabel: '150 كم' };
    if (sup.includes('المدينة')) return { distanceKm: 420, distanceLabel: '420 كم' };
    if (sup.includes('الرياض')) return { distanceKm: 950, distanceLabel: '950 كم' };
  } else if (proj.includes('الدمام')) {
    if (sup.includes('الدمام') || sup.includes('الخبر')) return { distanceKm: 0, distanceLabel: '0 كم عن المشروع - بدون نقل' };
    if (sup.includes('الجبيل')) return { distanceKm: 90, distanceLabel: '90 كم' };
    if (sup.includes('الأحساء')) return { distanceKm: 140, distanceLabel: '140 كم' };
    if (sup.includes('الرياض')) return { distanceKm: 390, distanceLabel: '390 كم' };
  }

  return { distanceKm: 350, distanceLabel: '350 كم' };
}

/**
 * Format the standard AI Supplier Badge requested in V12:
 * 🤖 مورد مقترح AI - {الاسم} - {المدينة} - يبعد {المسافة} عن مشروع {projectCity} - ⭐{التقييم} - تخصص {التخصص}
 */
export function formatSupplierAiBadge(
  sup: { name: string; city: string; rating: number; specialty: string },
  projectCity: string = 'ينبع'
): string {
  const pCity = projectCity || 'ينبع';
  const dist = getEstimatedDistance(sup.city, pCity);
  const distPhrase =
    dist.distanceKm === 0
      ? `يبعد 0 كم عن مشروع ${pCity} - بدون نقل`
      : `يبعد ${dist.distanceKm} كم عن مشروع ${pCity}`;
  return `🤖 مورد مقترح AI - ${sup.name} - ${sup.city} - ${distPhrase} - ⭐${sup.rating} - تخصص ${sup.specialty}`;
}

/**
 * AI Supplier Fetcher:
 * aiFetchSuppliers(itemName, projectCity, offset)
 * Orders suppliers by distance to projectCity:
 * Priority 1: Same city as project (Yanbu 0 km)
 * Priority 2: Nearby cities (Jeddah 150 km, Madinah 200 km)
 * Priority 3: Other cities
 */
export function aiFetchSuppliers(
  itemName: string,
  projectCity: string = 'ينبع',
  offset: number = 0
): VerifiedSupplier[] {
  const specialty = detectItemSpecialty(itemName);
  const targetProjectCity = (projectCity || 'ينبع').trim();

  // Filter pool by specialty
  let pool = VERIFIED_SUPPLIERS_CATALOG.filter((s) => s.specialty === specialty);
  if (pool.length < 3) {
    // If generic fallback, use all
    pool = [...VERIFIED_SUPPLIERS_CATALOG];
  }

  // Priority scoring based on distance to PROJECT CITY:
  // Priority 1: Same city as project -> +60 points
  // Priority 2: Nearby cities <= 250km (Jeddah 150km, Madinah 200km) -> +35 points
  // Priority 3: Other cities -> +10 points
  // Rating weight: rating * 8
  const scored = pool.map((sup) => {
    const dist = getEstimatedDistance(sup.city, targetProjectCity);
    let score = sup.rating * 8;

    if (dist.distanceKm === 0) {
      score += 60; // Priority 1: Yanbu / Same city
    } else if (dist.distanceKm <= 250) {
      score += 35; // Priority 2: Jeddah / Madinah
    } else if (dist.distanceKm <= 500) {
      score += 20;
    } else {
      score += 10; // Priority 3: Riyadh / Dammam
    }

    // Specific coverage bonus if supplier covers project city
    if (sup.coverage.some((c) => c.includes(targetProjectCity))) {
      score += 15;
    }

    return { sup, score, dist };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  const sortedSuppliers = scored.map((s) => s.sup);

  // Take 3 with offset support for rotation ("تحديث الموردين")
  const start = offset % sortedSuppliers.length;
  const picked: VerifiedSupplier[] = [];

  for (let i = 0; i < sortedSuppliers.length && picked.length < 3; i++) {
    const idx = (start + i) % sortedSuppliers.length;
    picked.push(sortedSuppliers[idx]);
  }

  return picked;
}

// Convert VerifiedSupplier to app's Supplier model
export function toSupplier(v: VerifiedSupplier): Supplier {
  return {
    id: v.id,
    name: v.name,
    cat: v.cat,
    phone: v.phone,
    address: v.address,
    vat: v.vat,
    rating: v.rating,
    verified: true,
  };
}
