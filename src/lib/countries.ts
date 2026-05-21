export const countries = [
  { slug: 'egypt',        nameEn: 'Egypt',        nameAr: 'مصر',         dialCode: '+20'  },
  { slug: 'iraq',         nameEn: 'Iraq',         nameAr: 'العراق',      dialCode: '+964' },
  { slug: 'saudi-arabia', nameEn: 'Saudi Arabia', nameAr: 'السعودية',    dialCode: '+966' },
  { slug: 'united-arab-emirates',          nameEn: 'UAE',          nameAr: 'الإمارات',    dialCode: '+971' },
  { slug: 'qatar',        nameEn: 'Qatar',        nameAr: 'قطر',         dialCode: '+974' },
  { slug: 'jordan',       nameEn: 'Jordan',       nameAr: 'الأردن',      dialCode: '+962' },
  { slug: 'syria',        nameEn: 'Syria',        nameAr: 'سوريا',       dialCode: '+963' },
  { slug: 'kuwait',       nameEn: 'Kuwait',       nameAr: 'الكويت',      dialCode: '+965' },
  { slug: 'bahrain',      nameEn: 'Bahrain',      nameAr: 'البحرين',     dialCode: '+973' },
  { slug: 'oman',         nameEn: 'Oman',         nameAr: 'عُمان',       dialCode: '+968' },
  { slug: 'lebanon',      nameEn: 'Lebanon',      nameAr: 'لبنان',       dialCode: '+961' },
  { slug: 'palestine',    nameEn: 'Palestine',    nameAr: 'فلسطين',      dialCode: '+970' },
  { slug: 'yemen',        nameEn: 'Yemen',        nameAr: 'اليمن',       dialCode: '+967' },
  { slug: 'algeria',      nameEn: 'Algeria',      nameAr: 'الجزائر',     dialCode: '+213' },
  { slug: 'morocco',      nameEn: 'Morocco',      nameAr: 'المغرب',      dialCode: '+212' },
  { slug: 'tunisia',      nameEn: 'Tunisia',      nameAr: 'تونس',        dialCode: '+216' },
  { slug: 'libya',        nameEn: 'Libya',        nameAr: 'ليبيا',       dialCode: '+218' },
  { slug: 'sudan',        nameEn: 'Sudan',        nameAr: 'السودان',     dialCode: '+249' },
  { slug: 'germany',      nameEn: 'Germany',      nameAr: 'ألمانيا',     dialCode: '+49'  },
  { slug: 'usa',          nameEn: 'USA',          nameAr: 'أمريكا',      dialCode: '+1'   },
  { slug: 'france',       nameEn: 'France',       nameAr: 'فرنسا',       dialCode: '+33'  },
  { slug: 'netherlands',  nameEn: 'Netherlands',  nameAr: 'هولندا',      dialCode: '+31'  },
  { slug: 'spain',        nameEn: 'Spain',        nameAr: 'إسبانيا',     dialCode: '+34'  },
  { slug: 'italy',        nameEn: 'Italy',        nameAr: 'إيطاليا',     dialCode: '+39'  },
  { slug: 'poland',       nameEn: 'Poland',       nameAr: 'بولندا',      dialCode: '+48'  },
  { slug: 'sweden',       nameEn: 'Sweden',       nameAr: 'السويد',      dialCode: '+46'  },
  { slug: 'belgium',      nameEn: 'Belgium',      nameAr: 'بلجيكا',      dialCode: '+32'  },
  { slug: 'united-kingdom',           nameEn: 'UK',           nameAr: 'بريطانيا',    dialCode: '+44'  },
  { slug: 'canada',       nameEn: 'Canada',       nameAr: 'كندا',        dialCode: '+1'   },
  { slug: 'india',        nameEn: 'India',        nameAr: 'الهند',       dialCode: '+91'  },
  { slug: 'pakistan',     nameEn: 'Pakistan',     nameAr: 'باكستان',     dialCode: '+92'  },
  { slug: 'indonesia',    nameEn: 'Indonesia',    nameAr: 'إندونيسيا',   dialCode: '+62'  },
  { slug: 'malaysia',     nameEn: 'Malaysia',     nameAr: 'ماليزيا',     dialCode: '+60'  },
  { slug: 'bangladesh',   nameEn: 'Bangladesh',   nameAr: 'بنغلاديش',    dialCode: '+880' },
  { slug: 'turkey',       nameEn: 'Turkey',       nameAr: 'تركيا',       dialCode: '+90'  },
] as const;

export type CountrySlug = typeof countries[number]['slug'];

export function getCountry(slug: string) {
  return countries.find(c => c.slug === slug);
}
