import React, { useState } from 'react';
import { Supplier } from '../types';
import { Users, UserPlus, Trash2, CheckCircle2, ShieldCheck, Search, Phone, MapPin, Building, ArrowLeft, AlertCircle } from 'lucide-react';

interface PhaseSuppliersProps {
  suppliers: Supplier[];
  onAddSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  onDeleteSupplier: (id: string) => void;
  onNext: () => void;
}

export const PhaseSuppliers: React.FC<PhaseSuppliersProps> = ({
  suppliers,
  onAddSupplier,
  onDeleteSupplier,
  onNext,
}) => {
  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [vat, setVat] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('الكل');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('يرجى كتابة اسم المورد الموثوق - حماية للسمعة');
      return;
    }
    if (!phone.trim()) {
      alert('يرجى إدخال جوال المورد للتواصل والمطابقة النظامية');
      return;
    }

    onAddSupplier({
      name: name.trim(),
      cat: cat.trim() || 'توريدات عامة',
      phone: phone.trim(),
      address: address.trim() || 'المملكة العربية السعودية',
      vat: vat.trim() || '-',
      verified: true,
      paymentTerms: paymentTerms.trim(),
    });

    setName('');
    setCat('');
    setPhone('');
    setAddress('');
    setVat('');
  };

  const categories = ['الكل', ...Array.from(new Set(suppliers.map((s) => s.cat).filter(Boolean)))];

  const filteredSuppliers = suppliers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);
    const matchCat = filterCat === 'الكل' || s.cat === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="glass-panel rounded-[28px] p-6 md:p-8 mt-5 border border-white/10 transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl md:text-2xl font-black gold-gradient-text flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#D4AF37]" />
            <span>المرحلة 2: قاعدة الموردين الموثوقين - AI يعتمد عليها 100%</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            أضف موردينك المعتمدين مرة واحدة — الذكاء الاصطناعي سيجلب اسمهم وجوالهم وعنوانهم تلقائياً في تقرير الأقل سعر
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FFF3B0] px-4 py-2 rounded-full text-xs font-bold self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>{suppliers.length} مورد معتمد وموثق</span>
        </div>
      </div>

      {/* Add New Supplier Form */}
      <form onSubmit={handleAdd} className="mt-6 glass-card rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] mb-3">
          <UserPlus className="w-4 h-4" />
          <span>إضافة مورد موثوق جديد إلى سجل المنشأة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم المورد الكامل *"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="text"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="التخصص (كاميرات / كيابل) *"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="جوال المورد (05xxxxxxxx) *"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="المدينة - الحي - الشارع"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <input
              type="text"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
              placeholder="الرقم الضريبي للمورد"
              className="w-full bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="شروط السداد (مثال: آجل 30 يوماً)"
              className="w-full sm:w-64 bg-black/40 border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-900/30 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ إضافة مورد موثوق</span>
          </button>
        </div>
      </form>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث عن مورد أو مدينة أو تخصص..."
            className="w-full bg-black/30 border border-white/10 focus:border-[#D4AF37] rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCat === c
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'glass-card text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="overflow-x-auto mt-4 rounded-2xl border border-white/10">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-black/50 text-[#D4AF37] border-b border-white/10">
              <th className="p-3.5 text-center w-10">م</th>
              <th className="p-3.5">المورد الموثوق</th>
              <th className="p-3.5">التخصص</th>
              <th className="p-3.5">جوال المورد المعتمد</th>
              <th className="p-3.5">العنوان الدقيق</th>
              <th className="p-3.5">الرقم الضريبي</th>
              <th className="p-3.5">شروط السداد</th>
              <th className="p-3.5 text-center w-14">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  لا توجد سجلات موردين مطابقة لبحثك. أضف مورداً جديداً أعلاه.
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((s, idx) => (
                <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-3.5 text-center text-gray-500 font-mono">{idx + 1}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="glass-card px-2.5 py-1 rounded-md text-[11px] text-gray-300 border border-white/10">
                      {s.cat}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400 font-semibold" dir="ltr">
                    <a
                      href={`tel:${s.phone}`}
                      className="hover:underline flex items-center justify-end gap-1"
                    >
                      <span>{s.phone}</span>
                      <Phone className="w-3 h-3 opacity-70" />
                    </a>
                  </td>
                  <td className="p-3.5 text-gray-300 max-w-xs truncate" title={s.address}>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                      <span>{s.address}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-gray-400">{s.vat || '-'}</td>
                  <td className="p-3.5 text-gray-400 text-[11px]">{s.paymentTerms || '-'}</td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => onDeleteSupplier(s.id)}
                      title="حذف المورد"
                      className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>الموردون المضافون سيظهرون كخيارات فورية في تسعير جداول الكميات</span>
        </div>

        <button
          onClick={onNext}
          className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-full text-xs md:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
        >
          <span>الانتقال للتسعير الدقيق وجدول الكميات →</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
