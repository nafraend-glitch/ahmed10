/**
 * Arabic number-to-words converter for Saudi Riyals (Tafqeet)
 * Essential for official Saudi Tender and Procurement Bid Letters
 */

const ones = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
const tens = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const teens = [
  'عشرة',
  'أحد عشر',
  'اثنا عشر',
  'ثلاثة عشر',
  'أربعة عشر',
  'خمسة عشر',
  'ستة عشر',
  'سبعة عشر',
  'ثمانية عشر',
  'تسعة عشر',
];
const hundreds = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];

function convertThreeDigits(num: number): string {
  let result = '';
  const h = Math.floor(num / 100);
  const rem = num % 100;
  const t = Math.floor(rem / 10);
  const o = rem % 10;

  if (h > 0) {
    result += hundreds[h];
  }

  if (rem > 0) {
    if (result.length > 0) result += ' و';
    if (rem < 10) {
      result += ones[rem];
    } else if (rem >= 10 && rem < 20) {
      result += teens[rem - 10];
    } else {
      if (o > 0) {
        result += ones[o] + ' و' + tens[t];
      } else {
        result += tens[t];
      }
    }
  }

  return result;
}

export function tafqeetRiyal(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded <= 0 || isNaN(rounded)) return 'صفر ريال سعودي';

  const billions = Math.floor(rounded / 1000000000);
  const millions = Math.floor((rounded % 1000000000) / 1000000);
  const thousands = Math.floor((rounded % 1000000) / 1000);
  const remainder = rounded % 1000;

  const parts: string[] = [];

  if (billions > 0) {
    if (billions === 1) parts.push('مليار');
    else if (billions === 2) parts.push('ملياران');
    else parts.push(`${convertThreeDigits(billions)} مليار`);
  }

  if (millions > 0) {
    if (millions === 1) parts.push('مليون');
    else if (millions === 2) parts.push('مليونان');
    else if (millions >= 3 && millions <= 10) parts.push(`${convertThreeDigits(millions)} ملايين`);
    else parts.push(`${convertThreeDigits(millions)} مليون`);
  }

  if (thousands > 0) {
    if (thousands === 1) parts.push('ألف');
    else if (thousands === 2) parts.push('ألفان');
    else if (thousands >= 3 && thousands <= 10) parts.push(`${convertThreeDigits(thousands)} آلاف`);
    else parts.push(`${convertThreeDigits(thousands)} ألف`);
  }

  if (remainder > 0) {
    parts.push(convertThreeDigits(remainder));
  }

  const words = parts.join(' و');
  return `فقط ${words} ريالاً سعودياً لا غير`;
}
