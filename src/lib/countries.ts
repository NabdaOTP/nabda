export const countries = [
  { slug: 'eg', nameEn: 'Egypt',        nameAr: 'مصر',         dialCode: '+20' },
  { slug: 'iq', nameEn: 'Iraq',         nameAr: 'العراق',      dialCode: '+964' },
  { slug: 'sa', nameEn: 'Saudi Arabia', nameAr: 'السعودية',    dialCode: '+966' },
  { slug: 'ae', nameEn: 'UAE',          nameAr: 'الإمارات',    dialCode: '+971' },
  { slug: 'qa', nameEn: 'Qatar',        nameAr: 'قطر',         dialCode: '+974' },
  { slug: 'jo', nameEn: 'Jordan',       nameAr: 'الأردن',      dialCode: '+962' },
  { slug: 'sy', nameEn: 'Syria',        nameAr: 'سوريا',       dialCode: '+963' },
  { slug: 'kw', nameEn: 'Kuwait',       nameAr: 'الكويت',      dialCode: '+965' },
  { slug: 'bh', nameEn: 'Bahrain',      nameAr: 'البحرين',     dialCode: '+973' },
  { slug: 'om', nameEn: 'Oman',         nameAr: 'عُمان',       dialCode: '+968' },
  { slug: 'lb', nameEn: 'Lebanon',      nameAr: 'لبنان',       dialCode: '+961' },
  { slug: 'ps', nameEn: 'Palestine',    nameAr: 'فلسطين',      dialCode: '+970' },
  { slug: 'ye', nameEn: 'Yemen',        nameAr: 'اليمن',       dialCode: '+967' },
  { slug: 'dz', nameEn: 'Algeria',      nameAr: 'الجزائر',     dialCode: '+213' },
  { slug: 'ma', nameEn: 'Morocco',      nameAr: 'المغرب',      dialCode: '+212' },
  { slug: 'tn', nameEn: 'Tunisia',      nameAr: 'تونس',        dialCode: '+216' },
  { slug: 'ly', nameEn: 'Libya',        nameAr: 'ليبيا',       dialCode: '+218' },
  { slug: 'sd', nameEn: 'Sudan',        nameAr: 'السودان',     dialCode: '+249' },
  { slug: 'de', nameEn: 'Germany',      nameAr: 'ألمانيا',     dialCode: '+49'  },
  { slug: 'us', nameEn: 'USA',          nameAr: 'أمريكا',      dialCode: '+1'   },
  { slug: 'fr', nameEn: 'France',       nameAr: 'فرنسا',       dialCode: '+33'  },
  { slug: 'nl', nameEn: 'Netherlands',  nameAr: 'هولندا',      dialCode: '+31'  },
  { slug: 'es', nameEn: 'Spain',        nameAr: 'إسبانيا',     dialCode: '+34'  },
  { slug: 'it', nameEn: 'Italy',        nameAr: 'إيطاليا',     dialCode: '+39'  },
  { slug: 'pl', nameEn: 'Poland',       nameAr: 'بولندا',      dialCode: '+48'  },
  { slug: 'se', nameEn: 'Sweden',       nameAr: 'السويد',      dialCode: '+46'  },
  { slug: 'be', nameEn: 'Belgium',      nameAr: 'بلجيكا',      dialCode: '+32'  },
  { slug: 'gb', nameEn: 'UK',           nameAr: 'بريطانيا',    dialCode: '+44'  },
  { slug: 'ca', nameEn: 'Canada',       nameAr: 'كندا',        dialCode: '+1'   },
  { slug: 'in', nameEn: 'India',        nameAr: 'الهند',       dialCode: '+91'  },
  { slug: 'pk', nameEn: 'Pakistan',     nameAr: 'باكستان',     dialCode: '+92'  },
  { slug: 'id', nameEn: 'Indonesia',    nameAr: 'إندونيسيا',   dialCode: '+62'  },
  { slug: 'my', nameEn: 'Malaysia',     nameAr: 'ماليزيا',     dialCode: '+60'  },
  { slug: 'bd', nameEn: 'Bangladesh',   nameAr: 'بنغلاديش',    dialCode: '+880' },
] as const;

export type CountrySlug = typeof countries[number]['slug'];

export function getCountry(slug: string) {
  return countries.find(c => c.slug === slug);
}