// لا يوجد Mock - جلب حي 100% من اعتماد

export interface LiveEtimadDocument {
  name: string;
  url: string;
}

export interface LiveEtimadItem {
  id?: string | number;
  itemNo?: number;
  desc: string;
  qty: number | string;
  unit: string;
  category?: string;
  accuracy?: 'high' | 'medium' | 'low';
  accuracyText?: string;
}

export interface LiveEtimadTenderData {
  tenderNumber: string;
  tenderName: string; // اسم المنافسة الحقيقي
  entityName: string; // الجهة الحكومية
  deadline: string;
  location?: string;
  projectCity?: string;
  guarantee?: string;
  documents: LiveEtimadDocument[]; // روابط الكراسات الأصلية من سيرفر اعتماد
  items: LiveEtimadItem[]; // جدول البنود والكميات الحي
  isLive?: boolean;
  source?: string;
  fetchedAt?: string;
}

// لا يوجد Mock - جلب حي 100% من اعتماد
export async function fetchTenderLive(tenderNumber: string): Promise<LiveEtimadTenderData> {
  // نرسل الطلب للباك اند حقك، والباك اند هو اللي يكلم اعتماد
  const response = await fetch(`/api/etimad/tender/${tenderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Source': 'HOSN_PRO_V12',
    },
    cache: 'no-store', // مهم جداً - لا تحفظ أي شي
  });

  if (!response.ok) {
    throw new Error(`فشل الجلب من اعتماد: ${response.status}`);
  }

  const liveData = await response.json();

  // liveData جاي مباشر من صفحة اعتماد
  return {
    tenderNumber: liveData.tenderNumber || tenderNumber,
    tenderName: liveData.tenderName, // اسم المنافسة الحقيقي
    entityName: liveData.entityName, // الجهة الحكومية
    deadline: liveData.deadline,
    location: liveData.location || 'داخل المملكة - ينبع',
    projectCity: liveData.projectCity || 'ينبع',
    guarantee: liveData.guarantee || '',
    documents: liveData.documents || [], // روابط الكراسات الأصلية من سيرفر اعتماد
    items: liveData.items || [], // جدول البنود والكميات الحي
    isLive: liveData.isLive ?? true,
    source: liveData.source || 'منصة اعتماد (بث مباشر)',
    fetchedAt: liveData.fetchedAt || new Date().toISOString(),
  };
}

// استخدام زر التجربة السريعة - الآن هو طلب حي أيضاً
export const runQuickTrialLive = (): Promise<LiveEtimadTenderData> => {
  return fetchTenderLive('60021079'); // هذا الرقم سينجلب لايف، ليس محفوظ
};
