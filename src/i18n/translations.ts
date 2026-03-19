export const LANGUAGE_MENU = [
  { code: 'en', label: 'English (EN)', native: 'English' },
  { code: 'ar', label: 'العربية (AR)', native: 'العربية' },
  { code: 'es', label: 'Español (ES)', native: 'Español' },
  { code: 'pt', label: 'Português (PT)', native: 'Português' },
  { code: 'fr', label: 'Français (FR)', native: 'Français' },
  { code: 'de', label: 'Deutsch (DE)', native: 'Deutsch' },
  { code: 'tr', label: 'Türkçe (TR)', native: 'Türkçe' },
  { code: 'it', label: 'Italiano (IT)', native: 'Italiano' },
  { code: 'id', label: 'Bahasa Indonesia (ID)', native: 'Bahasa Indonesia' },
  { code: 'tl', label: 'Filipino (TL)', native: 'Filipino' },
  { code: 'sw', label: 'Kiswahili (SW)', native: 'Kiswahili' },
] as const;

export type LocaleCode = (typeof LANGUAGE_MENU)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';
export const RTL_LOCALES: LocaleCode[] = ['ar'];
export const ALL_LOCALES = LANGUAGE_MENU.map((lang) => lang.code) as LocaleCode[];

export function isLocaleCode(value: string): value is LocaleCode {
  return ALL_LOCALES.includes(value as LocaleCode);
}

export function isRtlLocale(locale: LocaleCode): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getLocaleFromPath(pathname: string): LocaleCode {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return DEFAULT_LOCALE;
  return isLocaleCode(segment) ? segment : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return '/';
  if (isLocaleCode(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function withLocalePath(locale: LocaleCode, pathname: string): string {
  const base = stripLocalePrefix(pathname);
  if (locale === DEFAULT_LOCALE) return base;
  return base === '/' ? `/${locale}/` : `/${locale}${base}`;
}

interface UiDictionary {
  nav: {
    home: string;
    features: string;
    pricing: string;
    solutions: string;
    compare: string;
    blog: string;
    docs: string;
    login: string;
    language: string;
    menu: string;
  };
  footer: {
    product: string;
    compareAndCountries: string;
    privacy: string;
    terms: string;
    refund: string;
    contact: string;
    support: string;
    apiDocs: string;
    dashboard: string;
    about: string;
    copyright: string;
    blurb: string;
  };
  cta: {
    title: string;
    subtitle: string;
    action: string;
  };
  common: {
    viewAllCountries: string;
    viewAllArticles: string;
    learnMore: string;
    readMore: string;
    faqTitle: string;
    faqSubtitle: string;
    countries: string;
    compare: string;
    solutions: string;
    relatedPages: string;
    relatedSolutions: string;
    relatedArticles: string;
    backHome: string;
  };
  legal: {
    lastUpdated: string;
  };
}

const dictionary: Record<LocaleCode, UiDictionary> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      solutions: 'Solutions',
      compare: 'Compare',
      blog: 'Blog',
      docs: 'Docs',
      login: 'Login',
      language: 'Language',
      menu: 'Toggle Menu',
    },
    footer: {
      product: 'Product',
      compareAndCountries: 'Compare & Countries',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      refund: 'Refund Policy',
      contact: 'Contact',
      support: 'WhatsApp Support',
      apiDocs: 'API Documentation',
      dashboard: 'Dashboard Login',
      about: 'About',
      copyright: 'All rights reserved.',
      blurb: 'The cheapest WhatsApp API gateway. $10/month unlimited messages.',
    },
    cta: {
      title: 'Ready to send your first message?',
      subtitle: 'Join businesses using Nabda OTP to deliver OTP and WhatsApp API messages reliably.',
      action: 'Get Started Free',
    },
    common: {
      viewAllCountries: 'View All Countries',
      viewAllArticles: 'View All Articles',
      learnMore: 'Learn more',
      readMore: 'Read',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about Nabda OTP',
      countries: 'Countries',
      compare: 'Compare',
      solutions: 'Solutions',
      relatedPages: 'Related Pages',
      relatedSolutions: 'Related Solutions',
      relatedArticles: 'Related Articles',
      backHome: 'Go to Homepage',
    },
    legal: { lastUpdated: 'Last updated' },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      features: 'المميزات',
      pricing: 'الأسعار',
      solutions: 'الحلول',
      compare: 'المقارنة',
      blog: 'المدونة',
      docs: 'التوثيق',
      login: 'تسجيل الدخول',
      language: 'اللغة',
      menu: 'فتح القائمة',
    },
    footer: {
      product: 'المنتج',
      compareAndCountries: 'المقارنة والدول',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      refund: 'سياسة الاسترداد',
      contact: 'تواصل معنا',
      support: 'دعم واتساب',
      apiDocs: 'توثيق API',
      dashboard: 'تسجيل الدخول',
      about: 'من نحن',
      copyright: 'جميع الحقوق محفوظة.',
      blurb: 'أرخص بوابة واتساب API. 10 دولار شهرياً لرسائل غير محدودة.',
    },
    cta: {
      title: 'هل أنت مستعد لإرسال أول رسالة؟',
      subtitle: 'انضم إلى الشركات التي تستخدم نبضة OTP لإرسال رسائل التحقق بشكل موثوق.',
      action: 'ابدأ مجاناً',
    },
    common: {
      viewAllCountries: 'عرض جميع الدول',
      viewAllArticles: 'عرض جميع المقالات',
      learnMore: 'اعرف المزيد',
      readMore: 'اقرأ',
      faqTitle: 'الأسئلة الشائعة',
      faqSubtitle: 'كل ما تحتاج معرفته عن نبضة OTP',
      countries: 'الدول',
      compare: 'المقارنة',
      solutions: 'الحلول',
      relatedPages: 'صفحات ذات صلة',
      relatedSolutions: 'حلول ذات صلة',
      relatedArticles: 'مقالات ذات صلة',
      backHome: 'العودة إلى الرئيسية',
    },
    legal: { lastUpdated: 'آخر تحديث' },
  },
  es: {
    nav: { home: 'Inicio', features: 'Funciones', pricing: 'Precios', solutions: 'Soluciones', compare: 'Comparar', blog: 'Blog', docs: 'Docs', login: 'Iniciar sesión', language: 'Idioma', menu: 'Abrir menú' },
    footer: { product: 'Producto', compareAndCountries: 'Comparar y países', privacy: 'Política de privacidad', terms: 'Términos de servicio', refund: 'Política de reembolso', contact: 'Contacto', support: 'Soporte WhatsApp', apiDocs: 'Documentación API', dashboard: 'Acceso al panel', about: 'Acerca de', copyright: 'Todos los derechos reservados.', blurb: 'La API de WhatsApp más económica. 10 USD/mes ilimitado.' },
    cta: { title: '¿Listo para enviar tu primer mensaje?', subtitle: 'Únete a empresas que usan Nabda OTP para mensajes de verificación.', action: 'Comenzar gratis' },
    common: { viewAllCountries: 'Ver todos los países', viewAllArticles: 'Ver todos los artículos', learnMore: 'Más información', readMore: 'Leer', faqTitle: 'Preguntas frecuentes', faqSubtitle: 'Todo lo que necesitas saber sobre Nabda OTP', countries: 'Países', compare: 'Comparar', solutions: 'Soluciones', relatedPages: 'Páginas relacionadas', relatedSolutions: 'Soluciones relacionadas', relatedArticles: 'Artículos relacionados', backHome: 'Ir al inicio' },
    legal: { lastUpdated: 'Última actualización' },
  },
  pt: {
    nav: { home: 'Início', features: 'Recursos', pricing: 'Preços', solutions: 'Soluções', compare: 'Comparar', blog: 'Blog', docs: 'Docs', login: 'Entrar', language: 'Idioma', menu: 'Abrir menu' },
    footer: { product: 'Produto', compareAndCountries: 'Comparar e países', privacy: 'Política de privacidade', terms: 'Termos de serviço', refund: 'Política de reembolso', contact: 'Contato', support: 'Suporte WhatsApp', apiDocs: 'Documentação da API', dashboard: 'Entrar no painel', about: 'Sobre', copyright: 'Todos os direitos reservados.', blurb: 'A API de WhatsApp mais barata. US$10/mês ilimitado.' },
    cta: { title: 'Pronto para enviar sua primeira mensagem?', subtitle: 'Junte-se a empresas que usam Nabda OTP para verificações.', action: 'Começar grátis' },
    common: { viewAllCountries: 'Ver todos os países', viewAllArticles: 'Ver todos os artigos', learnMore: 'Saiba mais', readMore: 'Ler', faqTitle: 'Perguntas frequentes', faqSubtitle: 'Tudo o que você precisa saber sobre Nabda OTP', countries: 'Países', compare: 'Comparar', solutions: 'Soluções', relatedPages: 'Páginas relacionadas', relatedSolutions: 'Soluções relacionadas', relatedArticles: 'Artigos relacionados', backHome: 'Ir para a página inicial' },
    legal: { lastUpdated: 'Última atualização' },
  },
  fr: {
    nav: { home: 'Accueil', features: 'Fonctionnalités', pricing: 'Tarifs', solutions: 'Solutions', compare: 'Comparer', blog: 'Blog', docs: 'Docs', login: 'Connexion', language: 'Langue', menu: 'Ouvrir le menu' },
    footer: { product: 'Produit', compareAndCountries: 'Comparatifs et pays', privacy: 'Politique de confidentialité', terms: "Conditions d'utilisation", refund: 'Politique de remboursement', contact: 'Contact', support: 'Support WhatsApp', apiDocs: 'Documentation API', dashboard: 'Connexion tableau de bord', about: 'À propos', copyright: 'Tous droits réservés.', blurb: "L'API WhatsApp la moins chère. 10 $/mois illimité." },
    cta: { title: 'Prêt à envoyer votre premier message ?', subtitle: 'Rejoignez les entreprises qui utilisent Nabda OTP.', action: 'Commencer gratuitement' },
    common: { viewAllCountries: 'Voir tous les pays', viewAllArticles: 'Voir tous les articles', learnMore: 'En savoir plus', readMore: 'Lire', faqTitle: 'Questions fréquentes', faqSubtitle: 'Tout savoir sur Nabda OTP', countries: 'Pays', compare: 'Comparer', solutions: 'Solutions', relatedPages: 'Pages associées', relatedSolutions: 'Solutions associées', relatedArticles: 'Articles associés', backHome: "Aller à l'accueil" },
    legal: { lastUpdated: 'Dernière mise à jour' },
  },
  de: {
    nav: { home: 'Startseite', features: 'Funktionen', pricing: 'Preise', solutions: 'Lösungen', compare: 'Vergleich', blog: 'Blog', docs: 'Docs', login: 'Anmelden', language: 'Sprache', menu: 'Menü öffnen' },
    footer: { product: 'Produkt', compareAndCountries: 'Vergleich & Länder', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', refund: 'Rückerstattungsrichtlinie', contact: 'Kontakt', support: 'WhatsApp Support', apiDocs: 'API-Dokumentation', dashboard: 'Dashboard Login', about: 'Über uns', copyright: 'Alle Rechte vorbehalten.', blurb: 'Die günstigste WhatsApp API. 10 USD/Monat unbegrenzt.' },
    cta: { title: 'Bereit für deine erste Nachricht?', subtitle: 'Unternehmen vertrauen Nabda OTP für Verifizierungen.', action: 'Kostenlos starten' },
    common: { viewAllCountries: 'Alle Länder anzeigen', viewAllArticles: 'Alle Artikel anzeigen', learnMore: 'Mehr erfahren', readMore: 'Lesen', faqTitle: 'Häufige Fragen', faqSubtitle: 'Alles über Nabda OTP', countries: 'Länder', compare: 'Vergleich', solutions: 'Lösungen', relatedPages: 'Ähnliche Seiten', relatedSolutions: 'Ähnliche Lösungen', relatedArticles: 'Ähnliche Artikel', backHome: 'Zur Startseite' },
    legal: { lastUpdated: 'Zuletzt aktualisiert' },
  },
  tr: {
    nav: { home: 'Ana Sayfa', features: 'Ozellikler', pricing: 'Fiyatlandirma', solutions: 'Cozumler', compare: 'Karsilastir', blog: 'Blog', docs: 'Dokuman', login: 'Giris', language: 'Dil', menu: 'Menüyü aç' },
    footer: { product: 'Urun', compareAndCountries: 'Karsilastirma ve Ulkeler', privacy: 'Gizlilik Politikasi', terms: 'Hizmet Sartlari', refund: 'Iade Politikasi', contact: 'Iletisim', support: 'WhatsApp Destek', apiDocs: 'API Dokumani', dashboard: 'Panel Girisi', about: 'Hakkimizda', copyright: 'Tum haklari saklidir.', blurb: 'En uygun fiyatli WhatsApp API. Aylik 10 USD sinirsiz.' },
    cta: { title: 'Ilk mesajinizi gondermeye hazir misiniz?', subtitle: 'Nabda OTP kullanan sirketlere katilin.', action: 'Ucretsiz basla' },
    common: { viewAllCountries: 'Tum ulkeleri gor', viewAllArticles: 'Tum yazilari gor', learnMore: 'Daha fazla', readMore: 'Oku', faqTitle: 'Sik sorulan sorular', faqSubtitle: 'Nabda OTP hakkinda bilmeniz gerekenler', countries: 'Ulkeler', compare: 'Karsilastir', solutions: 'Cozumler', relatedPages: 'Ilgili sayfalar', relatedSolutions: 'Ilgili cozumler', relatedArticles: 'Ilgili yazilar', backHome: 'Ana sayfaya git' },
    legal: { lastUpdated: 'Son guncelleme' },
  },
  it: {
    nav: { home: 'Home', features: 'Funzionalita', pricing: 'Prezzi', solutions: 'Soluzioni', compare: 'Confronta', blog: 'Blog', docs: 'Documentazione', login: 'Accedi', language: 'Lingua', menu: 'Apri menu' },
    footer: { product: 'Prodotto', compareAndCountries: 'Confronti e paesi', privacy: 'Privacy policy', terms: 'Termini di servizio', refund: 'Politica di rimborso', contact: 'Contatto', support: 'Supporto WhatsApp', apiDocs: 'Documentazione API', dashboard: 'Accesso dashboard', about: 'Chi siamo', copyright: 'Tutti i diritti riservati.', blurb: "La WhatsApp API piu economica. 10 USD/mese illimitato." },
    cta: { title: 'Pronto a inviare il tuo primo messaggio?', subtitle: 'Unisciti alle aziende che usano Nabda OTP.', action: 'Inizia gratis' },
    common: { viewAllCountries: 'Vedi tutti i paesi', viewAllArticles: 'Vedi tutti gli articoli', learnMore: 'Scopri di piu', readMore: 'Leggi', faqTitle: 'Domande frequenti', faqSubtitle: 'Tutto quello che devi sapere su Nabda OTP', countries: 'Paesi', compare: 'Confronta', solutions: 'Soluzioni', relatedPages: 'Pagine correlate', relatedSolutions: 'Soluzioni correlate', relatedArticles: 'Articoli correlati', backHome: 'Vai alla home' },
    legal: { lastUpdated: 'Ultimo aggiornamento' },
  },
  id: {
    nav: { home: 'Beranda', features: 'Fitur', pricing: 'Harga', solutions: 'Solusi', compare: 'Perbandingan', blog: 'Blog', docs: 'Dokumen', login: 'Masuk', language: 'Bahasa', menu: 'Buka menu' },
    footer: { product: 'Produk', compareAndCountries: 'Perbandingan & negara', privacy: 'Kebijakan privasi', terms: 'Ketentuan layanan', refund: 'Kebijakan pengembalian dana', contact: 'Kontak', support: 'Dukungan WhatsApp', apiDocs: 'Dokumentasi API', dashboard: 'Masuk dashboard', about: 'Tentang', copyright: 'Semua hak dilindungi.', blurb: 'API WhatsApp termurah. USD 10/bulan tanpa batas.' },
    cta: { title: 'Siap mengirim pesan pertama Anda?', subtitle: 'Bergabunglah dengan bisnis yang memakai Nabda OTP.', action: 'Mulai gratis' },
    common: { viewAllCountries: 'Lihat semua negara', viewAllArticles: 'Lihat semua artikel', learnMore: 'Pelajari lebih lanjut', readMore: 'Baca', faqTitle: 'Pertanyaan umum', faqSubtitle: 'Semua yang perlu Anda tahu tentang Nabda OTP', countries: 'Negara', compare: 'Perbandingan', solutions: 'Solusi', relatedPages: 'Halaman terkait', relatedSolutions: 'Solusi terkait', relatedArticles: 'Artikel terkait', backHome: 'Ke beranda' },
    legal: { lastUpdated: 'Terakhir diperbarui' },
  },
  tl: {
    nav: { home: 'Home', features: 'Mga Feature', pricing: 'Presyo', solutions: 'Mga Solusyon', compare: 'Paghahambing', blog: 'Blog', docs: 'Docs', login: 'Mag-login', language: 'Wika', menu: 'Buksan ang menu' },
    footer: { product: 'Produkto', compareAndCountries: 'Paghahambing at mga bansa', privacy: 'Patakaran sa privacy', terms: 'Mga tuntunin ng serbisyo', refund: 'Patakaran sa refund', contact: 'Kontak', support: 'WhatsApp Support', apiDocs: 'API Documentation', dashboard: 'Dashboard Login', about: 'Tungkol sa amin', copyright: 'Lahat ng karapatan ay nakalaan.', blurb: 'Pinakamurang WhatsApp API. $10/buwan unlimited.' },
    cta: { title: 'Handa ka na bang magpadala ng unang mensahe?', subtitle: 'Sumali sa mga negosyong gumagamit ng Nabda OTP.', action: 'Magsimula nang libre' },
    common: { viewAllCountries: 'Tingnan lahat ng bansa', viewAllArticles: 'Tingnan lahat ng artikulo', learnMore: 'Alamin pa', readMore: 'Basahin', faqTitle: 'Mga madalas itanong', faqSubtitle: 'Lahat ng kailangan mong malaman tungkol sa Nabda OTP', countries: 'Mga bansa', compare: 'Paghahambing', solutions: 'Mga solusyon', relatedPages: 'Kaugnay na pahina', relatedSolutions: 'Kaugnay na solusyon', relatedArticles: 'Kaugnay na artikulo', backHome: 'Pumunta sa home' },
    legal: { lastUpdated: 'Huling na-update' },
  },
  sw: {
    nav: { home: 'Nyumbani', features: 'Vipengele', pricing: 'Bei', solutions: 'Suluhisho', compare: 'Linganisha', blog: 'Blogu', docs: 'Nyaraka', login: 'Ingia', language: 'Lugha', menu: 'Fungua menyu' },
    footer: { product: 'Bidhaa', compareAndCountries: 'Linganisha na nchi', privacy: 'Sera ya faragha', terms: 'Masharti ya huduma', refund: 'Sera ya kurejesha pesa', contact: 'Mawasiliano', support: 'Msaada wa WhatsApp', apiDocs: 'Nyaraka za API', dashboard: 'Ingia dashboard', about: 'Kuhusu', copyright: 'Haki zote zimehifadhiwa.', blurb: 'WhatsApp API ya gharama nafuu zaidi. $10/mwezi bila kikomo.' },
    cta: { title: 'Uko tayari kutuma ujumbe wako wa kwanza?', subtitle: 'Jiunge na biashara zinazotumia Nabda OTP.', action: 'Anza bure' },
    common: { viewAllCountries: 'Tazama nchi zote', viewAllArticles: 'Tazama makala zote', learnMore: 'Jifunze zaidi', readMore: 'Soma', faqTitle: 'Maswali yanayoulizwa mara kwa mara', faqSubtitle: 'Kila unachohitaji kujua kuhusu Nabda OTP', countries: 'Nchi', compare: 'Linganisha', solutions: 'Suluhisho', relatedPages: 'Kurasa zinazohusiana', relatedSolutions: 'Suluhisho zinazohusiana', relatedArticles: 'Makala zinazohusiana', backHome: 'Rudi nyumbani' },
    legal: { lastUpdated: 'Imesasishwa mara ya mwisho' },
  },
};

export function getTranslations(locale: LocaleCode): UiDictionary {
  return dictionary[locale];
}
