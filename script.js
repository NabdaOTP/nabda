/**
 * Nabda OTP - Language Switching & Interactive Features
 * =====================================================
 * Handles dynamic translation, RTL support, and UI interactions
 */

function isArabicPath(pathname) {
  return (
    pathname === "/ar" || pathname === "/ar/" || pathname.startsWith("/ar/")
  );
}

function isTurkishPath(pathname) {
  return (
    pathname === "/tr" || pathname === "/tr/" || pathname.startsWith("/tr/")
  );
}

function toEnglishPath(pathname) {
  if (pathname === "/ar" || pathname === "/ar/") return "/";
  if (pathname.startsWith("/ar/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  if (pathname === "/tr" || pathname === "/tr/") return "/";
  if (pathname.startsWith("/tr/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

function pathForLanguage(enPath, lang) {
  const p = enPath === "/index.html" ? "/" : enPath;
  if (lang === "en") return p;
  const prefix = lang === "ar" ? "/ar" : "/tr";
  if (p === "/") return prefix;
  return prefix + (p.startsWith("/") ? p : `/${p}`);
}

function getLanguageFromPath() {
  const pathname = window.location.pathname;
  if (isArabicPath(pathname)) return "ar";
  if (isTurkishPath(pathname)) return "tr";
  return "en";
}

const LANG_DISPLAY_NAME = {
  en: "English",
  ar: "العربية",
  tr: "Türkçe",
};

function stripLegacyQueryFromUrl() {
  try {
    const url = new URL(window.location.href);
    const langParam = url.searchParams.get("lang");
    if (langParam === "ar" || langParam === "en" || langParam === "tr") {
      localStorage.setItem("nabza-lang", langParam);
    }
    if (langParam === "ar" && !isArabicPath(url.pathname)) {
      url.searchParams.delete("lang");
      url.searchParams.delete("q");
      const query = url.searchParams.toString();
      let bare = toEnglishPath(url.pathname);
      if (bare === "/index.html") bare = "/";
      const arTarget = pathForLanguage(bare, "ar");
      window.location.replace(arTarget + (query ? `?${query}` : "") + url.hash);
      return;
    }
    if (langParam === "tr" && !isTurkishPath(url.pathname)) {
      url.searchParams.delete("lang");
      url.searchParams.delete("q");
      const query = url.searchParams.toString();
      let bare = toEnglishPath(url.pathname);
      if (bare === "/index.html") bare = "/";
      const trTarget = pathForLanguage(bare, "tr");
      window.location.replace(trTarget + (query ? `?${query}` : "") + url.hash);
      return;
    }
    if (!url.searchParams.has("lang") && !url.searchParams.has("q")) return;
    url.searchParams.delete("lang");
    url.searchParams.delete("q");
    const query = url.searchParams.toString();
    const next = url.pathname + (query ? `?${query}` : "") + url.hash;
    window.history.replaceState({}, "", next);
  } catch {
    /* ignore */
  }
}

/**
 * Keeps in-language navigation: /... vs /ar/...
 */
function localizeInternalLinks() {
  const lang = getLanguageFromPath();

  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("//")) return;

    let u;
    try {
      u = new URL(href, window.location.origin);
    } catch {
      return;
    }

    if (u.origin !== window.location.origin) return;

    let enPath = toEnglishPath(u.pathname);
    if (enPath === "/index.html") enPath = "/";

    const newPath = pathForLanguage(enPath, lang);
    a.setAttribute("href", newPath + u.search + u.hash);
  });
}

// ============================================
// Translation Data
// ============================================
const translations = {
  en: {
    // Meta
    "meta.title":
      "Nabda OTP – The Cheapest WhatsApp API & Best OTP Service in Iraq",
    "meta.description":
      "Nabda OTP — Standard $10/mo Gateway: unlimited messages, no per-message fee, trial, REST API, webhooks, media & documents, priority support, cancel anytime, no credit card 2-min setup. Enterprise: Contact Us, Official API, pay-per-conversation, SLA. MENA. nabdaotp.com — api.nabdaotp.com/docs — We Pioners Ltd.",

    // Navigation
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.solutions": "Solutions",
    "nav.comparing": "Comparing",
    "nav.blogs": "Blogs",
    "nav.docs": "Docs",
    "nav.login": "Login",

    // Hero Section
    "hero.badge": "🚀 The most reliable WhatsApp verification platform",
    "hero.title":
      "The Cheapest & First WhatsApp Gateway in Iraq, Syria & MENA Region.",
    "heroEg.title":
      "The Cheapest & First WhatsApp Gateway in Egypt & MENA Region.",
    "hero.subtitle":
      "Send unlimited OTPs through our WhatsApp Gateway — Standard or Official API. The cheapest, most reliable API solution for developers. Direct integration with the most affordable pricing.",
    "hero.cta.primary": "Start Free Trial",
    "hero.cta.secondary": "View Documentation",
    "hero.price":
      "Starting at just <strong>$10/month</strong> — No per-message fees",

    // Code Terminal
    "code.comment1": "// Sending OTP via Nabda Gateway",
    "code.message": '"Your code is: 847291"',
    "code.comment2": "// ✓ Delivered instantly",

    // Stats
    "stats.businesses": "Businesses Trust Us",
    "stats.messages": "Messages Sent",
    "stats.uptime": "Uptime Guaranteed",
    "stats.reliable": "Most Reliable in MENA",

    // Features
    "features.title": "Why choose Nabda OTP ?",
    "featuresEg.title": "Why teams in Egypt choose Nabda OTP?",
    "features.subtitle":
      "The most affordable WhatsApp API with the best reliability. Built by developers, for developers🤍.",
    "featuresEg.subtitle":
      "Nabda OTP helps businesses in Egypt ship WhatsApp OTP and transactional messaging quickly with clean API workflows and regional support.🤍.",

    "features.cheapest.title": "Cheapest in Market",
    "features.cheapest.desc":
      "While others charge per message, we offer a flat monthly fee. Send unlimited WhatsApp messages for just $10/month — the most affordable API solution available.",
    "features.cheapest.highlight": "Save up to 90% compared to competitors",

    "features.local.title": "Local & Proud",
    "features.local.desc":
      "A local platform built specifically for Arab developers. We understand the local market and provide Arabic support with direct integration capabilities.",

    "features.developer.title": "Developer First",
    "features.developer.desc":
      "Clean RESTful API, comprehensive documentation, and SDKs for all major languages. Integrate our cloud gateway in minutes, not days.",

    "features.secure.title": "Enterprise Security",
    "features.secure.desc":
      "End-to-end encryption, secure authentication, and full compliance. Your data stays protected with our enterprise-grade infrastructure.",

    "features.fast.title": "Lightning Fast",
    "features.fast.desc":
      "Messages delivered in milliseconds. Our optimized cloud gateway ensures your OTPs reach users instantly, every single time.",

    "features.analytics.title": "Real-time Analytics",
    "features.analytics.desc":
      "Track delivery rates, monitor usage, and get insights with our comprehensive dashboard. Full visibility into your messaging operations.",

    // Pricing
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle":
      "No hidden fees. No per-message charges. The best value WhatsApp API.",
    "pricing.period": "/month",
    "pricing.feature1": "Unlimited WhatsApp Messages",
    "pricing.feature2": "No Per-Message Fee",
    "pricing.feature3": "5-Day Free Trial",
    "pricing.feature4": "RESTful API Access",
    "pricing.feature5": "Priority Support",
    "pricing.feature6": "Cancel Anytime",
    "pricing.feature7": "Receive messages via Webhook",
    "pricing.feature8": "Send media & documents",
    "pricing.feature9": "Webhook support",
    "pricing.cta": "Start Your Free Trial",
    "pricing.note": "No credit card required • Setup in 2 minutes",
    "pricing.standard.badge": "Standard",
    "pricing.enterprise.badge": "Enterprise",
    "pricing.standard.typeLine": "Type: WhatsApp Gateway",
    "pricing.standard.bestForLine": "Best for: Developers & SMBs",
    "pricing.standard.messagesLine": "Messages: Unlimited",
    "pricing.official.typeLine": "Type: WhatsApp Official API",
    "pricing.official.bestForLine": "Best for: Enterprise & Compliance",
    "pricing.official.messagesLine": "Messages: Pay-per-conversation",
    "pricing.official.feature1": "Official Meta-Verified API",
    "pricing.official.feature2": "Higher Message Limits",
    "pricing.official.feature3": "Business Verification Support",
    "pricing.official.feature4": "Dedicated Onboarding",
    "pricing.official.feature5": "Priority Support",
    "pricing.official.feature6": "SLA Guarantee",
    "pricing.contact.price": "Contact Us",
    "pricing.contact.cta": "Contact Us",
    "pricing.contact.note": "We'll set everything up for you",
    "pricing.yearly.badge": "1 MONTH FREE",
    "pricing.yearly.title": "Unlimited WhatsApp (Annual)",
    "pricing.yearly.subtitle": "12 months for the price of 11",
    "pricing.yearly.bestForLine": "Best for: Long-term savings & big teams",
    "pricing.yearly.cta": "Choose Yearly Plan",
    "pricing.yearly.note": "Save 8.33% • Billed annually",

    // Frequently asked questions
    "asked.questions": "Frequently asked questions",

    // CTA
    "cta.title": "Ready to send your first message?",
    "cta.subtitle":
      "Join 65+ Arab businesses using the cheapest WhatsApp API. Start your 5-day free trial today.",
    "cta.button": "Get Started Free",

    // Payment Methods
    "payment.title": "Accepted Payment Methods",

    // WhatsApp
    "whatsapp.help": "Hello, how can we help you?",

    // Footer
    "footer.desc":
      "The first and best WhatsApp API solution for Iraq and the MENA region. Cloud gateway with direct integration for developers.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.docs": "Documentation",
    "footer.company": "Company",
    "footer.regions": "WhatsApp API by country",
    "footer.legal": "Legal",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.refund": "Refund Policy",
    "footer.copyright":
      "© 2026 Nabda OTP. All rights reserved. Nabda OTP is a product owned and operated by We Pioners Ltd",
    "footer.seo":
      "Unlimited WhatsApp Messages • No Per-Message Fee • 5-Day Free Trial • RESTful API • Webhook Receive • Media & Documents • Priority Support • $10/mo • Twilio UltraMsg SendGrid Alternative • MENA Iraq Syria • أرخص واتساب API • بديل تويليو",
  },

  ar: {
    // Meta
    "meta.title": "نبضة OTP – أرخص خدمة واتساب API وأفضل بوابة OTP في العراق",
    "meta.description":
      "نبضة OTP — قياسي: 10$/شهرياً بوابة واتساب، رسائل غير محدودة، تجربة 5 أيام، REST وويب هوك ووسائط، دعم أولوية، إلغاء في أي وقت، لا بطاقة • دقيقتان. مؤسسات: تواصل معنا، واجهة رسمية، حسب المحادثة، SLA. nabdaotp.com — api.nabdaotp.com/docs — We Pioners Ltd.",

    // Navigation
    "nav.features": "المميزات",
    "nav.pricing": "الأسعار",
    "nav.solutions": "الحلول",
    "nav.comparing": "المقارنة",
    "nav.blogs": "المدونة",
    "nav.docs": "التوثيق",
    "nav.login": "تسجيل الدخول",

    // Hero Section
    "hero.badge": "🚀 المنصة الأكثر موثوقية للتحقق عبر واتساب",
    "hero.title":
      "أرخص وأول بوابة واتساب في العراق وسوريا ومنطقة الشرق الأوسط.",
    "heroEg.title": "أرخص وأول بوابة واتساب في مصر والشرق الأوسط",
    "hero.subtitle":
      "أرسل رسائل OTP غير محدودة عبر بوابة واتساب — قياسي أو واجهة رسمية. الحل الأرخص والأكثر موثوقية للمطورين. تكامل مباشر بأفضل الأسعار.",
    "hero.cta.primary": "ابدأ التجربة المجانية",
    "hero.cta.secondary": "عرض التوثيق",
    "hero.price":
      "ابتداءً من <strong>10$/شهرياً</strong> فقط — بدون رسوم لكل رسالة",

    // Code Terminal
    "code.comment1": "// جاري إرسال الرمز عبر بوابة نبضة",
    "code.message": '"رمزك: 847291"',
    "code.comment2": "// ✓ تم التوصيل فوراً",

    // Stats
    "stats.businesses": "شركات تثق بنا",
    "stats.messages": "الرسائل المرسلة",
    "stats.uptime": "وقت تشغيل مضمون",
    "stats.reliable": "الأكثر موثوقية في الشرق الأوسط",

    // Features
    "features.title": "لماذا تختار نبضة OTP ؟",
    "featuresEg.title": "لماذا تختار الفرق في مصر Nabda OTP؟",
    "features.subtitle":
      "أرخص خدمة واتساب API مع أفضل موثوقية. صُممت بواسطة مطورين، للمطورين🤍.",
    "featuresEg.subtitle":
      "يساعد Nabda OTP الشركات في مصر على إرسال رموز التحقق عبر واتساب والرسائل التفاعلية بسرعة من خلال واجهات برمجية سهلة ودعم محلي.🤍",

    "features.cheapest.title": "الأرخص في السوق",
    "features.cheapest.desc":
      "بينما يفرض الآخرون رسوماً لكل رسالة، نحن نقدم رسوماً شهرية ثابتة. أرسل رسائل واتساب غير محدودة مقابل 10 دولار/شهرياً فقط — أرخص حل API متاح.",
    "features.cheapest.highlight": "وفّر حتى 90% مقارنة بالمنافسين",

    "features.local.title": "محلي وبفخر",
    "features.local.desc":
      "منصة محلية صُممت خصيصاً للمطورين العرب. نفهم السوق المحلي ونقدم دعماً بالعربية مع إمكانيات تكامل مباشر.",

    "features.developer.title": "المطور أولاً",
    "features.developer.desc":
      "واجهة RESTful API نظيفة، توثيق شامل، وحزم تطوير لجميع اللغات الرئيسية. ادمج بوابتنا السحابية في دقائق، وليس أيام.",

    "features.secure.title": "أمان المؤسسات",
    "features.secure.desc":
      "تشفير من طرف إلى طرف، مصادقة آمنة، والتزام كامل. بياناتك محمية ببنيتنا التحتية المتطورة.",

    "features.fast.title": "سرعة البرق",
    "features.fast.desc":
      "الرسائل تُوصّل بالميلي ثانية. بوابتنا السحابية المُحسّنة تضمن وصول رموز OTP للمستخدمين فوراً، في كل مرة.",

    "features.analytics.title": "تحليلات فورية",
    "features.analytics.desc":
      "تتبع معدلات التوصيل، راقب الاستخدام، واحصل على رؤى عبر لوحة التحكم الشاملة. رؤية كاملة لعمليات الرسائل.",

    // Pricing
    "pricing.title": "تسعير بسيط وشفاف",
    "pricing.subtitle":
      "بدون رسوم خفية. بدون رسوم لكل رسالة. أفضل قيمة لـ WhatsApp API.",
    "pricing.period": "/شهرياً",
    "pricing.period.yearly": "/سنوياً",
    "pricing.feature1": "رسائل واتساب غير محدودة",
    "pricing.feature2": "بدون رسوم لكل رسالة",
    "pricing.feature3": "تجربة مجانية 5 أيام",
    "pricing.feature4": "الوصول لـ RESTful API",
    "pricing.feature5": "دعم أولوية",
    "pricing.feature6": "إلغاء في أي وقت",
    "pricing.feature7": "استقبال الرسائل عبر الويب هوك",
    "pricing.feature8": "إرسال الوسائط والمستندات",
    "pricing.feature9": "دعم الويب هوك",
    "pricing.cta": "ابدأ تجربتك المجانية",
    "pricing.note": "لا حاجة لبطاقة ائتمان • الإعداد في دقيقتين",
    "pricing.standard.badge": "قياسي",
    "pricing.enterprise.badge": "المؤسسات",
    "pricing.standard.typeLine": "النوع: بوابة واتساب",
    "pricing.standard.bestForLine": "الأنسب لـ: المطورين والشركات الصغيرة",
    "pricing.standard.messagesLine": "الرسائل: غير محدودة",
    "pricing.official.typeLine": "النوع: واجهة واتساب الرسمية",
    "pricing.official.bestForLine": "الأنسب لـ: المؤسسات والامتثال",
    "pricing.official.messagesLine": "الرسائل: حسب المحادثة",
    "pricing.official.feature1": "واجهة معتمدة من ميتا رسمياً",
    "pricing.official.feature2": "حدود رسائل أعلى",
    "pricing.official.feature3": "دعم توثيق الأعمال",
    "pricing.official.feature4": "إعداد مخصص",
    "pricing.official.feature5": "دعم أولوية",
    "pricing.official.feature6": "ضمان SLA",
    "pricing.contact.price": "تواصل معنا",
    "pricing.contact.cta": "تواصل معنا",
    "pricing.contact.note": "سنقوم بإعداد كل شيء من أجلك",
    "pricing.yearly.badge": "شهر مجاني",
    "pricing.yearly.title": "واتساب غير محدود (سنوي)",
    "pricing.yearly.subtitle": "12 شهر بسعر 11 شهر",
    "pricing.yearly.bestForLine":
      "الأنسب لـ: التوفير طويل الأمد والفرق الكبيرة",
    "pricing.yearly.cta": "اختر الخطة السنوية",
    "pricing.yearly.note": "وفّر 8.33% • يتم الدفع سنوياً",
    // CTA
    "cta.title": "مستعد لإرسال رسالتك الأولى؟",
    "cta.subtitle":
      "انضم إلى أكثر من 65 شركة عربية تستخدم أرخص WhatsApp API. ابدأ تجربتك المجانية لمدة 5 أيام اليوم.",
    "cta.button": "ابدأ مجاناً",

    // Frequently asked questions
    "asked.questions": "الأسئلة الشائعة",

    // Payment Methods
    "payment.title": "طرق الدفع المقبولة",

    // WhatsApp
    "whatsapp.help": "مرحباً، كيف يمكننا مساعدتك؟",

    // Footer
    "footer.desc":
      "أول وأفضل حل WhatsApp API للعراق ومنطقة الشرق الأوسط. بوابة سحابية مع تكامل مباشر للمطورين.",
    "footer.product": "المنتج",
    "footer.features": "المميزات",
    "footer.pricing": "الأسعار",
    "footer.docs": "التوثيق",
    "footer.company": "الشركة",
    "footer.regions": "واتساب API حسب الدولة",
    "footer.legal": "قانوني",
    "footer.about": "من نحن",
    "footer.contact": "اتصل بنا",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.refund": "سياسة الاسترداد",
    "footer.copyright":
      "© 2026 نبضة OTP. جميع الحقوق محفوظة. نبضة OTP منتج مملوك ومُدار من قبل We Pioners Ltd",
    "footer.seo":
      "رسائل واتساب غير محدودة • بدون رسوم لكل رسالة • تجربة 5 أيام • RESTful API • ويب هوك استقبال • وسائط ومستندات • دعم أولوية • 10$/شهرياً • بديل تويليو الترامسج سيندغريد • العراق سوريا الشرق الأوسط",
  },

  tr: {
    "meta.title":
      "Nabda OTP – Irak'ın En Ucuz WhatsApp API'si ve En İyi OTP Hizmeti",
    "meta.description":
      "Nabda OTP — Standart: 10$/ay Ağ Geçidi, sınırsız mesaj, deneme, REST, webhook, medya, öncelikli destek, istediğiniz zaman iptal, kredi kartı yok 2 dk kurulum. Kurumsal: Bize Ulaşın, Resmi API, konuşma başına, SLA. nabdaotp.com — api.nabdaotp.com/docs — We Pioners Ltd.",

    "nav.features": "Özellikler",
    "nav.pricing": "Fiyatlandırma",
    "nav.docs": "Dokümantasyon",
    "nav.login": "Giriş",

    "hero.badge": "🚀 En güvenilir WhatsApp doğrulama platformu",
    "hero.title":
      "Irak, Suriye ve MENA Bölgesi'nin En Ucuz ve İlk WhatsApp Ağ Geçidi.",
    "hero.subtitle":
      "Standart veya Resmi API ile WhatsApp Ağ Geçidimiz üzerinden sınırsız OTP gönderin. Geliştiriciler için en uygun fiyatlı ve en güvenilir API çözümü. Doğrudan entegrasyon ve en uygun fiyatlandırma.",
    "hero.cta.primary": "Ücretsiz Denemeyi Başlat",
    "hero.cta.secondary": "Dokümantasyonu Görüntüle",
    "hero.price":
      "Sadece <strong>aylık 10$</strong> ile başlayın — Mesaj başına ücret yok",

    "code.comment1": "// Nabda Ağ Geçidi ile OTP gönderimi",
    "code.message": '"Kodunuz: 847291"',
    "code.comment2": "// ✓ Anında teslim edildi",

    "stats.businesses": "Bize Güvenen İşletmeler",
    "stats.messages": "Gönderilen Mesajlar",
    "stats.uptime": "Garantili Çalışma Süresi",
    "stats.reliable": "MENA'da En Güvenilir",

    "features.title": "Neden Nabda OTP?",
    "features.subtitle":
      "En iyi güvenilirlikle en uygun fiyatlı WhatsApp API. Geliştiriciler tarafından, geliştiriciler için🤍.",

    "features.cheapest.title": "Piyasadaki En Ucuz",
    "features.cheapest.desc":
      "Diğerleri mesaj başına ücret alırken biz sabit aylık ücret sunuyoruz. Sadece aylık 10$ karşılığında sınırsız WhatsApp mesajı gönderin — mevcut en uygun fiyatlı API çözümü.",
    "features.cheapest.highlight": "Rakiplere kıyasla %90'a varan tasarruf",

    "features.local.title": "Yerel ve Gururlu",
    "features.local.desc":
      "Arap geliştiriciler için özel olarak geliştirilmiş yerel bir platform. Yerel piyasayı anlıyoruz ve doğrudan entegrasyon ile Arapça destek sunuyoruz.",

    "features.developer.title": "Önce Geliştirici",
    "features.developer.desc":
      "Temiz RESTful API, kapsamlı dokümantasyon ve tüm büyük diller için SDK'lar. Bulut ağ geçidimizi günler değil dakikalar içinde entegre edin.",

    "features.secure.title": "Kurumsal Güvenlik",
    "features.secure.desc":
      "Uçtan uca şifreleme, güvenli kimlik doğrulama ve tam uyumluluk. Verileriniz kurumsal altyapımızla korunur.",

    "features.fast.title": "Şimşek Hızında",
    "features.fast.desc":
      "Mesajlar milisaniyeler içinde iletilir. Optimize edilmiş bulut ağ geçidimiz OTP'lerinizin her seferinde anında kullanıcılara ulaşmasını sağlar.",

    "features.analytics.title": "Gerçek Zamanlı Analitik",
    "features.analytics.desc":
      "Teslim oranlarını takip edin, kullanımı izleyin ve kapsamlı panomuzla içgörüler edinin. Mesajlaşma operasyonlarınıza tam görünürlük.",

    "pricing.title": "Basit, Şeffaf Fiyatlandırma",
    "pricing.subtitle":
      "Gizli ücret yok. Mesaj başına ücret yok. En iyi değer WhatsApp API.",
    "pricing.period": "/ay",
    "pricing.feature1": "Sınırsız WhatsApp Mesajı",
    "pricing.feature2": "Mesaj Başına Ücret Yok",
    "pricing.feature3": "5 Günlük Ücretsiz Deneme",
    "pricing.feature4": "RESTful API Erişimi",
    "pricing.feature5": "Öncelikli Destek",
    "pricing.feature6": "İstediğiniz Zaman İptal",
    "pricing.feature7": "Webhook ile mesaj alma",
    "pricing.feature8": "Medya ve belge gönderme",
    "pricing.feature9": "Webhook desteği",
    "pricing.cta": "Ücretsiz Denemenizi Başlatın",
    "pricing.note": "Kredi kartı gerekmez • 2 dakikada kurulum",
    "pricing.standard.badge": "Standart",
    "pricing.enterprise.badge": "Kurumsal",
    "pricing.standard.typeLine": "Tür: WhatsApp Ağ Geçidi",
    "pricing.standard.bestForLine": "En uygun: Geliştiriciler ve KOBİ'ler",
    "pricing.standard.messagesLine": "Mesajlar: Sınırsız",
    "pricing.official.typeLine": "Tür: WhatsApp Resmi API",
    "pricing.official.bestForLine": "En uygun: Kurumsal ve Uyumluluk",
    "pricing.official.messagesLine": "Mesajlar: Konuşma başına ücret",
    "pricing.official.feature1": "Resmi Meta Onaylı API",
    "pricing.official.feature2": "Daha Yüksek Mesaj Limitleri",
    "pricing.official.feature3": "İşletme Doğrulama Desteği",
    "pricing.official.feature4": "Özel Onboarding",
    "pricing.official.feature5": "Öncelikli Destek",
    "pricing.official.feature6": "SLA Garantisi",
    "pricing.contact.price": "Bize Ulaşın",
    "pricing.contact.cta": "Bize Ulaşın",
    "pricing.contact.note": "Her şeyi sizin için kuruyoruz",

    "cta.title": "İlk mesajınızı göndermeye hazır mısınız?",
    "cta.subtitle":
      "En ucuz WhatsApp API'yi kullanan 65'ten fazla Arap işletmesine katılın. Bugün 5 günlük ücretsiz denemenizi başlatın.",
    "cta.button": "Ücretsiz Başlayın",

    "payment.title": "Kabul Edilen Ödeme Yöntemleri",

    "whatsapp.help": "Merhaba, size nasıl yardımcı olabiliriz?",

    "footer.desc":
      "Irak ve MENA bölgesi için ilk ve en iyi WhatsApp API çözümü. Geliştiriciler için doğrudan entegrasyonlu bulut ağ geçidi.",
    "footer.product": "Ürün",
    "footer.features": "Özellikler",
    "footer.pricing": "Fiyatlandırma",
    "footer.docs": "Dokümantasyon",
    "footer.company": "Şirket",
    "footer.regions": "Ülkelere göre WhatsApp API",
    "footer.legal": "Yasal",
    "footer.about": "Hakkımızda",
    "footer.contact": "İletişim",
    "footer.privacy": "Gizlilik Politikası",
    "footer.terms": "Hizmet Şartları",
    "footer.refund": "İade Politikası",
    "footer.copyright":
      "© 2026 Nabda OTP. Tüm hakları saklıdır. Nabda OTP, We Pioners Ltd'ye ait ve tarafından işletilen bir üründür",
    "footer.seo":
      "Sınırsız WhatsApp Mesajı • Mesaj Başına Ücret Yok • 5 Günlük Deneme • RESTful API • Webhook ile Alma • Medya ve Belgeler • Öncelikli Destek • 10$/ay • Twilio UltraMsg SendGrid Alternatifi • MENA Irak Suriye • أرخص واتساب API",
  },
};

// ============================================
// State Management
// ============================================
let currentLang = "en";

// ============================================
// Language Switching
// ============================================
function setLanguage(lang) {
  currentLang = lang;
  const bundle = translations[lang];
  if (!bundle) return;

  const html = document.documentElement;

  // Update dir and lang attributes
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  const labelEl = document.getElementById("langToggleLabel");
  if (labelEl) labelEl.textContent = LANG_DISPLAY_NAME[lang] || lang;

  const langMenu = document.getElementById("langMenu");
  if (langMenu) {
    langMenu.querySelectorAll("[data-lang]").forEach((btn) => {
      const l = btn.getAttribute("data-lang");
      if (l === lang) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
  }

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = bundle[key];

    if (translation) {
      // Check if translation contains HTML (like <strong>)
      if (translation.includes("<")) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  // Update meta tags
  updateMetaTags(lang);

  // Save preference
  localStorage.setItem("nabza-lang", lang);

  // Trigger custom event for other scripts
  window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));

  localizeInternalLinks();
}

function updateMetaTags(lang) {
  // Country pages have their own localized meta (static generator).
  // Avoid overwriting with homepage translations.
  const body = document.body;
  if (body && body.getAttribute("data-disable-meta-i18n") === "true") return;

  const t = translations[lang];
  if (!t) return;

  // Update title
  document.title = t["meta.title"];

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t["meta.description"]);

  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDesc = document.querySelector(
    'meta[name="twitter:description"]',
  );

  if (ogTitle) ogTitle.setAttribute("content", t["meta.title"]);
  if (ogDesc) ogDesc.setAttribute("content", t["meta.description"]);
  if (twitterTitle) twitterTitle.setAttribute("content", t["meta.title"]);
  if (twitterDesc) twitterDesc.setAttribute("content", t["meta.description"]);

  // Update OG locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    const locale = lang === "ar" ? "ar_IQ" : lang === "tr" ? "tr_TR" : "en_US";
    ogLocale.setAttribute("content", locale);
  }

  const pageUrl =
    window.location.origin + window.location.pathname + window.location.search;
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", pageUrl);
  const twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) twitterUrl.setAttribute("content", pageUrl);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", pageUrl);
}

function navigateToLanguage(targetLang) {
  if (!["en", "ar", "tr"].includes(targetLang)) return;
  if (targetLang === getLanguageFromPath()) {
    closeLangMenu();
    return;
  }
  const pathname = window.location.pathname;
  const { search, hash } = window.location;
  let enPath = toEnglishPath(pathname);
  if (enPath === "/index.html") enPath = "/";
  const target = pathForLanguage(enPath, targetLang);
  window.location.assign(target + search + hash);
}

function closeLangMenu() {
  const menu = document.getElementById("langMenu");
  const btn = document.getElementById("langToggle");
  if (menu) {
    if (menu._suppressPtrTid) {
      clearTimeout(menu._suppressPtrTid);
      menu._suppressPtrTid = undefined;
    }
    menu.classList.remove("lang-menu--suppress-pointer");
    menu.hidden = true;
    menu.classList.remove("is-open");
  }
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function initLangDropdown() {
  const langToggle = document.getElementById("langToggle");
  const langMenu = document.getElementById("langMenu");
  const langDropdown = document.getElementById("langDropdown");
  if (!langToggle || !langMenu || !langDropdown) return;

  const coarsePointer = window.matchMedia("(pointer: coarse)");
  let langToggleTouchLock = false;

  function openLangMenu() {
    langMenu.hidden = false;
    langMenu.classList.add("is-open");
    langToggle.setAttribute("aria-expanded", "true");
    if (coarsePointer.matches) {
      langMenu.classList.add("lang-menu--suppress-pointer");
      if (langMenu._suppressPtrTid) clearTimeout(langMenu._suppressPtrTid);
      langMenu._suppressPtrTid = window.setTimeout(() => {
        langMenu.classList.remove("lang-menu--suppress-pointer");
        langMenu._suppressPtrTid = undefined;
      }, 450);
    }
  }

  function toggleLangMenu() {
    if (!langMenu.hidden) {
      closeLangMenu();
      return;
    }
    openLangMenu();
  }

  langToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (langToggleTouchLock) return;
    toggleLangMenu();
  });

  langToggle.addEventListener(
    "touchend",
    (e) => {
      if (!coarsePointer.matches) return;
      e.preventDefault();
      e.stopPropagation();
      langToggleTouchLock = true;
      toggleLangMenu();
      window.setTimeout(() => {
        langToggleTouchLock = false;
      }, 500);
    },
    { passive: false },
  );

  langMenu.querySelectorAll("[data-lang]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateToLanguage(item.getAttribute("data-lang"));
    });
  });

  function onDocumentPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    if (langDropdown.contains(e.target)) return;
    closeLangMenu();
  }
  document.addEventListener("pointerdown", onDocumentPointerDown, true);
}

/** Cycles en → ar → tr for legacy callers */
function toggleLanguage() {
  const order = ["en", "ar", "tr"];
  const i = order.indexOf(getLanguageFromPath());
  const next = order[(i + 1) % order.length];
  navigateToLanguage(next);
}

// ============================================
// Mobile Navigation
// ============================================
function initMobileNav() {
  const mobileToggle = document.getElementById("mobileToggle");
  const nav = document.querySelector(".nav");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        mobileToggle.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("active")) {
        if (
          !mobileMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)
        ) {
          nav.classList.remove("active");
          mobileToggle.classList.remove("active");
        }
      }
    });

    // Prevent menu clicks from closing
    if (mobileMenu) {
      mobileMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ============================================
// Stats Counter Animation
// ============================================
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute("data-count"));
          animateNumber(element, target);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((stat) => observer.observe(stat));
}

function animateNumber(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    // Format number
    if (target >= 1000000) {
      element.textContent =
        (current / 1000000).toFixed(current < target ? 1 : 0) + "M+";
    } else if (target >= 1000) {
      element.textContent = Math.floor(current / 1000) + "K+";
    } else {
      element.textContent = current + "+";
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .stat-item, .pricing-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = "var(--shadow-md)";
    } else {
      header.style.boxShadow = "none";
    }

    lastScroll = currentScroll;
  });
}

// ============================================
// Keyboard Navigation
// ============================================
function initKeyboardNav() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLangMenu();
      const nav = document.querySelector(".nav");
      const mobileToggle = document.getElementById("mobileToggle");
      if (nav && mobileToggle) {
        nav.classList.remove("active");
        mobileToggle.classList.remove("active");
      }
    }
  });
}

// ============================================
// Geo Country Suggestion (Homepage / General Pages)
// ============================================
const GEO_COUNTRY_MAP = {
  EG: "eg",
  IQ: "iq",
  SA: "sa",
  QA: "qa",
  JO: "jo",
  AE: "ae",
  SY: "sy",
  US: "us",
  KW: "kw",
  BH: "bh",
  DE: "de",
  DZ: "dz",
  LB: "lb",
  LY: "ly",
  MA: "ma",
  OM: "om",
  PS: "ps",
  QA: "qa",
  SD: "sd",
  TN: "tn",
  YE: "ye",
  TR: "tr",
};

const GEO_COUNTRY_NAMES = {
  en: {
    EG: "Egypt",
    IQ: "Iraq",
    SA: "Saudi Arabia",
    QA: "Qatar",
    JO: "Jordan",
    AE: "United Arab Emirates",
    SY: "Syria",
    US: "United States",
    KW: "Kuwait",
    BH: "Bahrain",
    DE: "Germany",
    DZ: "Algeria",
    LB: "Lebanon",
    LY: "Libya",
    MA: "Morocco",
    OM: "Oman",
    PS: "Palestine",
    QA: "Qatar",
    SD: "Sudan",
    TN: "Tunisia",
    YE: "Yemen",
    TR: "Turkey",
  },
  ar: {
    EG: "مصر",
    IQ: "العراق",
    SA: "السعودية",
    QA: "قطر",
    JO: "الأردن",
    AE: "الإمارات",
    SY: "سوريا",
    US: "الولايات المتحدة الأمريكية",
    KW: "الكويت",
    BH: "البحرين",
    DE: "ألمانيا",
    DZ: "الجزائر",
    LB: "لبنان",
    LY: "ليبيا",
    MA: "المغرب",
    OM: "عمان",
    PS: "فلسطين",
    QA: "قطر",
    SD: "السودان",
    TN: "تونس",
    TE: "اليمن",
    TR: "تركيا",
  },
};

const GEO_CACHE_KEY = "nabda-geo-country-cache-v1";
const GEO_DISMISS_KEY = "nabda-geo-banner-dismissed-v1";
const GEO_ACCEPT_KEY = "nabda-geo-banner-accepted-v1";
const GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function getCurrentUiLang() {
  return getLanguageFromPath() === "ar" ? "ar" : "en";
}

function isCountryLandingPath(pathname) {
  const stripped = toEnglishPath(pathname).replace(/\/+$/, "") || "/";
  const parts = stripped.split("/").filter(Boolean);
  if (parts.length === 0) return false;
  const first = parts[0].toLowerCase();
  return Object.values(GEO_COUNTRY_MAP).includes(first);
}

async function fetchWithTimeout(url, timeoutMs = 3500) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function detectCountryCodeByIp() {
  // Service order: first fast, second fallback.
  const providers = [
    async () => {
      const data = await fetchWithTimeout("https://ipwho.is/");
      if (!data || data.success === false) return null;
      return (data.country_code || "").toUpperCase();
    },
    async () => {
      const data = await fetchWithTimeout("https://ipapi.co/json/");
      return (data && data.country_code ? data.country_code : "").toUpperCase();
    },
  ];

  for (const provider of providers) {
    try {
      const code = await provider();
      if (code && GEO_COUNTRY_MAP[code]) return code;
    } catch {
      // Try next provider.
    }
  }
  return null;
}

function getCachedCountryCode() {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.countryCode || !parsed.timestamp) return null;
    if (Date.now() - parsed.timestamp > GEO_CACHE_TTL_MS) return null;
    return parsed.countryCode;
  } catch {
    return null;
  }
}

function setCachedCountryCode(countryCode) {
  try {
    localStorage.setItem(
      GEO_CACHE_KEY,
      JSON.stringify({
        countryCode,
        timestamp: Date.now(),
      }),
    );
  } catch {
    // Ignore storage failures.
  }
}

function shouldSkipGeoBanner(countryCode) {
  // Respect user choice globally (for supported country pages).
  if (localStorage.getItem(GEO_ACCEPT_KEY) === "1") return true;
  if (localStorage.getItem(GEO_DISMISS_KEY) === "1") return true;

  const pathname = window.location.pathname;
  if (isCountryLandingPath(pathname)) return true;

  const currentLang = getCurrentUiLang();
  const targetSlug = GEO_COUNTRY_MAP[countryCode];
  const targetPath =
    currentLang === "ar" ? `/ar/${targetSlug}/` : `/${targetSlug}/`;
  if (pathname === targetPath || pathname === targetPath.slice(0, -1))
    return true;

  return false;
}

function buildGeoBannerMarkup(countryCode, lang) {
  const countryName =
    GEO_COUNTRY_NAMES[lang][countryCode] || GEO_COUNTRY_NAMES.en[countryCode];
  const targetSlug = GEO_COUNTRY_MAP[countryCode];
  const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const targetHref =
    lang === "ar"
      ? `/ar/${targetSlug}/`
      : isLocalHost
        ? `/countries/${targetSlug}/`
        : `/${targetSlug}/`;

  if (lang === "ar") {
    return {
      targetHref,
      title: `مرحباً! يبدو أنك في ${countryName}`,
      subtitle: `هل تريد زيارة صفحة WhatsApp API المخصصة لـ ${countryName}؟`,
      ctaText: "نعم، اذهب للصفحة المحلية",
      closeText: "إغلاق",
      laterText: "لاحقاً",
    };
  }

  return {
    targetHref,
    title: `You seem to be in ${countryName}`,
    subtitle: `Would you like to view our dedicated WhatsApp API page for ${countryName}?`,
    ctaText: "Yes, take me there",
    closeText: "Close",
    laterText: "Maybe later",
  };
}

function renderGeoBanner(countryCode) {
  const lang = getCurrentUiLang();
  const copy = buildGeoBannerMarkup(countryCode, lang);

  const banner = document.createElement("aside");
  banner.className = "geo-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", "Country page suggestion");
  banner.innerHTML = `
    <div class="geo-banner-content">
      <button type="button" class="geo-banner-close" aria-label="${copy.closeText}">×</button>
      <p class="geo-banner-title">${copy.title}</p>
      <p class="geo-banner-subtitle">${copy.subtitle}</p>
      <div class="geo-banner-actions">
        <a class="btn btn-primary geo-banner-cta" href="${copy.targetHref}">${copy.ctaText}</a>
        <button type="button" class="btn btn-ghost geo-banner-later">${copy.laterText}</button>
      </div>
    </div>
  `;

  const closeBtn = banner.querySelector(".geo-banner-close");
  const laterBtn = banner.querySelector(".geo-banner-later");
  const ctaBtn = banner.querySelector(".geo-banner-cta");

  const dismiss = () => {
    localStorage.setItem(GEO_DISMISS_KEY, "1");
    banner.remove();
  };

  closeBtn?.addEventListener("click", dismiss);
  laterBtn?.addEventListener("click", dismiss);
  ctaBtn?.addEventListener("click", () => {
    localStorage.setItem(GEO_ACCEPT_KEY, "1");
  });

  document.body.appendChild(banner);
}

async function initGeoCountryBanner() {
  try {
    let countryCode = getCachedCountryCode();
    if (!countryCode) {
      countryCode = await detectCountryCodeByIp();
      if (countryCode) setCachedCountryCode(countryCode);
    }
    if (!countryCode || !GEO_COUNTRY_MAP[countryCode]) return;
    if (shouldSkipGeoBanner(countryCode)) return;
    renderGeoBanner(countryCode);
  } catch {
    // Fail silently: geo suggestion is non-critical UX enhancement.
  }
}

// ============================================
// Active Navigation
// ============================================
// Active Navbar Link
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href === currentPath ||
      (currentPath.startsWith("/solutions") && href === "/solutions") ||
      (currentPath.startsWith("/blogs") && href === "/blogs") ||
      (currentPath.startsWith("/comparing") && href === "/comparing")
    ) {
      link.classList.add("active");
    }
  });
});

// ============================================
// Terminal Typing Effect (Optional Enhancement)
// ============================================
function initTerminalEffect() {
  const terminal = document.querySelector(".terminal-body");
  if (terminal) {
    terminal.addEventListener("mouseenter", () => {
      terminal.style.transform = "scale(1.02)";
    });
    terminal.addEventListener("mouseleave", () => {
      terminal.style.transform = "scale(1)";
    });
  }
}

// ============================================
// Initialization
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  stripLegacyQueryFromUrl();

  setLanguage(getLanguageFromPath());

  initLangDropdown();

  // Initialize all features
  initMobileNav();
  initSmoothScroll();
  animateStats();
  initScrollAnimations();
  initHeaderScroll();
  initKeyboardNav();
  initTerminalEffect();
  initGeoCountryBanner();

  // Add loading complete class
  document.body.classList.add("loaded");
});

// ============================================
// Export for potential external use
// ============================================
window.NabzaOTP = {
  setLanguage,
  navigateToLanguage,
  toggleLanguage,
  getCurrentLang: () => currentLang,
  getLanguageFromPath,
};

document.addEventListener("DOMContentLoaded", function () {
  // Force page title to prevent overrides
  if (window.location.pathname.includes("/solutions")) {
    document.title = "Solutions - Nabda OTP";
  } else if (window.location.pathname.includes("/blogs")) {
    document.title = "Blog - Nabda OTP | WhatsApp API Insights";
  } else if (window.location.pathname.includes("/comparing")) {
    document.title = "Nabda OTP vs Competitors - Best WhatsApp API Comparison";
  }
});

// FAQ Accordion
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all others
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
}

// Call it after page load
document.addEventListener("DOMContentLoaded", initFaqAccordion);

// ====================== Dynamic Pricing Calculator - Fixed & Robust ======================
function initDynamicPricing() {
  const slider = document.getElementById("messageSlider");
  if (!slider) {
    return;
  }

  const messageCount = document.getElementById("messageCount");
  const nabdaCost = document.getElementById("nabdaCost");
  const ultraCost = document.getElementById("ultraCost");
  const nabdaPerMsg = document.getElementById("nabdaPerMsg");
  const ultraPerMsg = document.getElementById("ultraPerMsg");

  function updatePricing() {
    const messages = Math.max(1, parseInt(slider.value, 10) || 1);
    const pricingModel = slider.getAttribute("data-pricing-model") || "per-number";
    const competitorFixed = parseFloat(slider.getAttribute("data-competitor-fixed")) || 0;
    const competitorPerMessage =
      parseFloat(slider.getAttribute("data-competitor-per-message")) || 0;
    const competitorPlanPerNumber =
      parseFloat(slider.getAttribute("data-ultra-plan")) || 39;
    const competitorCapacityPerNumber =
      parseInt(slider.getAttribute("data-ultra-capacity"), 10) || 30000;
    const nabdaTotal = 10;
    let competitorTotal = 0;

    if (pricingModel === "per-message") {
      competitorTotal = competitorFixed + messages * competitorPerMessage;
    } else {
      const competitorNumbersNeeded = Math.max(
        1,
        Math.ceil(messages / competitorCapacityPerNumber),
      );
      competitorTotal = competitorNumbersNeeded * competitorPlanPerNumber;
    }
    competitorTotal = +competitorTotal.toFixed(2);
    const competitorCostPerMessage = (competitorTotal / messages).toFixed(4);

    // Update message count
    if (messageCount) messageCount.textContent = messages.toLocaleString();

    // Nabda OTP - fixed plan
    if (nabdaCost) nabdaCost.textContent = `$${nabdaTotal.toFixed(2)}`;
    if (nabdaPerMsg) nabdaPerMsg.textContent = "$0.000";

    // Competitor total and effective per-message
    if (ultraCost) ultraCost.textContent = `$${competitorTotal.toFixed(2)}`;
    if (ultraPerMsg) ultraPerMsg.textContent = `$${competitorCostPerMessage}`;
  }

  slider.addEventListener("input", updatePricing);
  updatePricing(); // Initial run
}

// Initialize
document.addEventListener("DOMContentLoaded", initDynamicPricing);
