import type { LocaleCode } from './translations';

export const regionLabels: Record<LocaleCode, Record<string, string>> = {
  en: { arab: 'Arab Countries & MENA', asia: 'Asia', latam: 'Latin America', africa: 'Africa', europe: 'Europe' },
  ar: { arab: 'الدول العربية والشرق الأوسط', asia: 'آسيا', latam: 'أمريكا اللاتينية', africa: 'أفريقيا', europe: 'أوروبا' },
  es: { arab: 'Paises arabes y MENA', asia: 'Asia', latam: 'Latinoamerica', africa: 'Africa', europe: 'Europa' },
  pt: { arab: 'Paises arabes e MENA', asia: 'Asia', latam: 'America Latina', africa: 'Africa', europe: 'Europa' },
  fr: { arab: 'Pays arabes et MENA', asia: 'Asie', latam: 'Amerique latine', africa: 'Afrique', europe: 'Europe' },
  de: { arab: 'Arabische Lander und MENA', asia: 'Asien', latam: 'Lateinamerika', africa: 'Afrika', europe: 'Europa' },
  tr: { arab: 'Arap ulkeleri ve MENA', asia: 'Asya', latam: 'Latin Amerika', africa: 'Afrika', europe: 'Avrupa' },
  it: { arab: 'Paesi arabi e MENA', asia: 'Asia', latam: 'America Latina', africa: 'Africa', europe: 'Europa' },
  id: { arab: 'Negara Arab dan MENA', asia: 'Asia', latam: 'Amerika Latin', africa: 'Afrika', europe: 'Eropa' },
  tl: { arab: 'Mga bansang Arab at MENA', asia: 'Asya', latam: 'Latin America', africa: 'Africa', europe: 'Europa' },
  sw: { arab: 'Nchi za Kiarabu na MENA', asia: 'Asia', latam: 'Amerika ya Kusini', africa: 'Afrika', europe: 'Ulaya' },
};

export const legalContent = {
  title: {
    privacy: {
      en: 'Privacy Policy',
      ar: 'سياسة الخصوصية',
      es: 'Politica de Privacidad',
      pt: 'Politica de Privacidade',
      fr: 'Politique de Confidentialite',
      de: 'Datenschutzrichtlinie',
      tr: 'Gizlilik Politikasi',
      it: 'Informativa sulla Privacy',
      id: 'Kebijakan Privasi',
      tl: 'Patakaran sa Privacy',
      sw: 'Sera ya Faragha',
    },
    terms: {
      en: 'Terms of Service',
      ar: 'شروط الخدمة',
      es: 'Terminos de Servicio',
      pt: 'Termos de Servico',
      fr: "Conditions d'Utilisation",
      de: 'Nutzungsbedingungen',
      tr: 'Hizmet Sartlari',
      it: 'Termini di Servizio',
      id: 'Ketentuan Layanan',
      tl: 'Mga Tuntunin ng Serbisyo',
      sw: 'Masharti ya Huduma',
    },
    refund: {
      en: 'Refund Policy',
      ar: 'سياسة الاسترداد',
      es: 'Politica de Reembolso',
      pt: 'Politica de Reembolso',
      fr: 'Politique de Remboursement',
      de: 'Ruckerstattungsrichtlinie',
      tr: 'Iade Politikasi',
      it: 'Politica di Rimborso',
      id: 'Kebijakan Pengembalian Dana',
      tl: 'Patakaran sa Refund',
      sw: 'Sera ya Marejesho',
    },
  },
};

export function localizedCountryName(locale: LocaleCode, country: { name: string; nameAr?: string }): string {
  if (locale === 'ar') return country.nameAr ?? country.name;
  return country.name;
}
