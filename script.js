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
    // Partner / Referral Section
    "partner.title": "Earn Money by Referring Friends",
    "partner.subtitle":
      "Share your referral code with developers and businesses. When they subscribe, you earn points that can be redeemed for free months, credits, or exclusive rewards.",
    "partner.cta": "Get Your Referral Code",
    "partner.note": "Start earning today • No limit on referrals",

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
    "pricing.monthly": "Monthly",
    "pricing.annual": "Annual",
    "pricing.period": "/month",
    "pricing.periodYear": "/year",

    "pricing.standard.badge": "Standard",
    "pricing.standard.typeLine": "Type: WhatsApp Gateway",
    "pricing.standard.bestForLine": "Best for: Developers & SMBs",
    "pricing.standard.messagesLine": "Messages: Unlimited",

    "pricing.features.unlimited": "Unlimited WhatsApp Messages",
    "pricing.features.noFee": "No Per-Message Fee",
    "pricing.features.trial": "5-Day Free Trial",
    "pricing.features.api": "RESTful API Access",
    "pricing.features.webhookReceive": "Receive messages via Webhook",
    "pricing.features.media": "Send media & documents",
    "pricing.features.webhook": "Webhook support",
    "pricing.features.support": "Priority Support",
    "pricing.features.cancel": "Cancel Anytime",

    "pricing.cta.trial": "Start Your Free Trial",
    "pricing.note.trial": "No credit card required • Setup in 2 minutes",

    "pricing.annual.save": "12 months for the price of 11",
    "pricing.annual.bestFor": "Best for: Long-term savings",
    "pricing.annual.messages": "Messages: Unlimited WhatsApp (Annual)",
    "pricing.cta.yearly": "Choose Yearly Plan",
    "pricing.note.yearly": "Save 8.33% • Billed annually",

    "pricing.enterprise.contact": "Contact Us",
    "pricing.enterprise.enter": "Enterprise",
    "pricing.enterprise.type": "Type: WhatsApp Official API",
    "pricing.enterprise.bestFor": "Best for: Enterprise & Compliance",
    "pricing.enterprise.messages": "Messages: Pay-per-conversation",
    "pricing.enterprise.meta": "Official Meta-Verified API",
    "pricing.enterprise.limits": "Higher Message Limits",
    "pricing.enterprise.verification": "Business Verification Support",
    "pricing.enterprise.onboarding": "Dedicated Onboarding",
    "pricing.enterprise.sla": "SLA Guarantee",

    "pricing.cta.contact": "Contact Us",
    "pricing.note.enterprise": "We'll set everything up for you",

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
    "footer.comparisons.title": "Comparisons",
    "footer.comparisons.nabda_vs_ultramsg": "Nabda vs UltraMsg",
    "footer.comparisons.nabda_vs_twilio": "Nabda vs Twilio",
    "footer.comparisons.nabda_vs_bulksms": "Nabda vs BulkSMS",
    "footer.comparisons.nabda_vs_official": "Nabda vs Official API",
    "footer.comparisons.nabda_vs_otpiq": "Nabda vs OTPIQ",
    "footer.comparisons.nabda_alternatives": "Nabda alternatives→",
    // ====================== BLOGS PAGE ======================
    "blogs.title": "Our Blog",
    "blogs.subtitle":
      "Insights, guides, and latest updates about WhatsApp API and OTP solutions",

    "blogs.post1.title":
      "How to Send OTP via WhatsApp API – Complete Guide 2026",
    "blogs.post1.desc":
      "Complete step-by-step guide to integrate Nabda OTP for secure user verification.",

    "blogs.post2.title":
      "Why WhatsApp OTP is Replacing SMS in the Middle East – 2026 Trends & Realities",
    "blogs.post2.desc":
      "Trends, statistics, and opportunities for businesses in Egypt, Saudi Arabia & beyond.",
    "blogs.comingSoon.title": "More Valuable Guides & Articles Are Coming",
    "blogs.comingSoon.desc":
      "We're working on new in-depth articles about WhatsApp API best practices, advanced integrations, and success stories from MENA businesses.",
    "blogs.comingSoon.stayTuned": "Stay Tuned ..",
    "blogs.readMore": "Read More →",
    // Comparison Page
    "comparison.title": "Nabda OTP vs Competitors",
    "comparison.subtitle": "See why smart businesses in MENA choose Nabda OTP",
    "comparison.card1.title": "Nabda OTP VS UltraMsg",
    "comparison.card1.description":
      "Best value and reliability for MENA businesses",
    "comparison.card2.title": "Nabda OTP VS Twilio",
    "comparison.card2.description": "Cost and delivery performance comparison",
    "comparison.card3.title": "Nabda OTP VS Official WhatsApp API",
    "comparison.card3.description": "Price vs features vs complexity",
    "comparison.card4.title": "Nabda OTP VS BulkSMS",
    "comparison.card4.description":
      "WhatsApp API vs Traditional SMS Gateway – Cost, delivery & reliability in MENA",
    "comparison.card5.title": "Nabda OTP VS OTPIQ",
    "comparison.card5.description":
      "Local OTP provider comparison – Pricing, delivery speed and features",
    "comparison.card6.title": "Best Nabda OTP Alternatives",
    "comparison.card6.description":
      "Complete guide to all major WhatsApp API providers in 2026",
    "comparison.detailed_comparison": "Detailed Comparison →",
    "comparison.view_all": "View All Alternatives →",
    // Solutions Page
    "solutions.title": "Solutions",
    "solutions.subtitle":
      "Powerful WhatsApp solutions tailored for your business needs in Iraq, Syria & MENA",
    "solutions.card1.title": "OTP & User Verification",
    "solutions.card1.description":
      "Send secure and instant one-time passwords via WhatsApp for registration, login, and two-factor authentication.",
    "solutions.card2.title": "Order Confirmations & Delivery",
    "solutions.card2.description":
      "Real-time order status updates, delivery notifications, and payment confirmations for e-commerce businesses.",
    "solutions.coming_soon.title": "More Solutions Coming Soon",
    "solutions.coming_soon.description":
      "We're working on additional powerful WhatsApp solutions tailored for businesses in Iraq, Syria, and the MENA region.",
    "solutions.coming_soon.text": "Stay Tuned ...",
    "solutions.learn_more": "Learn More →",
    // Blog Post - How to Send OTP via WhatsApp API
    "blogPost.title": "How to Send OTP via WhatsApp API Complete Guide 2026",
    "blogPost.excerpt":
      "A practical, production-ready guide for developers using <strong>Nabda OTP</strong> – the fastest WhatsApp OTP solution in Iraq (+964) and Syria (+963) and other countries.",

    "blogPost.section1.title":
      "Why Nabda OTP is the best choice for Iraq & Syria",
    "blogPost.section1.desc":
      "Nabda OTP gives you direct access to WhatsApp without dealing with official Business API templates or Meta approval delays. Just create an instance and start sending OTPs instantly.",

    "blogPost.section2.title": "What you need to get started",
    "blogPost.section2.item1": "A Nabda OTP account",
    "blogPost.section2.item2":
      "One or more active instances (each instance = dedicated WhatsApp number)",
    "blogPost.section2.item3": "Instance-scoped token (Bearer token)",
    "blogPost.section2.item4": "Server-side OTP generation logic",

    "blogPost.section3.title": "Step-by-step: Send OTP using Nabda OTP API",
    "blogPost.section3.step1": "1. Create and Select an Instance",
    "blogPost.section3.step1.desc":
      "After creating an instance from the dashboard, you must select it to get the instance token:",
    "blogPost.section3.step2": "2. Generate OTP on your backend",
    "blogPost.section3.step3": "3. Send OTP via WhatsApp (Correct Endpoint)",
    "blogPost.section3.step4": "4. Verify the OTP on your server",
    "blogPost.section3.step4.desc":
      "Always verify the OTP on the backend (never trust the client).",

    "blogPost.section4.title":
      "Optional: Configure Webhook for Delivery Status",

    "blogPost.section5.title": "Best Practices for Iraq & Syria",
    "blogPost.section5.item1":
      "Use E.164 format: +96477xxxxxxxx or +9639xxxxxxxx",
    "blogPost.section5.item2": "Keep OTP expiry between 3–8 minutes",
    "blogPost.section5.item3":
      "Send bilingual messages when possible (Arabic + English)",
    "blogPost.section5.item4": "Always include your brand name in the message",
    "blogPost.section5.item5":
      "Monitor webhook events for sent, delivered, and failures",

    "blogPost.section6.title": "Troubleshooting",
    "blogPost.section6.item1":
      "<strong>401 Unauthorized</strong> → Make sure you selected the instance and using the instance token",
    "blogPost.section6.item2":
      "<strong>Invalid phone</strong> → Must start with +964 or +963 or any other supported country code.",
    "blogPost.section6.item3":
      "<strong>Message not received</strong> → Check that the instance is connected (QR code scanned)",

    "blogPost.section7.title": "Ready to start?",
    "blogPost.section7.desc":
      "Create your first instance in seconds and start sending OTPs via WhatsApp today.",

    "blogPost.cta.title": "Get Started with Nabda OTP",
    "blogPost.cta.button": "Create Free Instance Now",
    "blogPost.back": "← Back to All Articles",
    // Blog Post 2 - Why WhatsApp OTP is Replacing SMS
    "blogPost2.title":
      "Why WhatsApp OTP is Replacing SMS in the Middle East – Trends & Realities 2026",
    "blogPost2.excerpt":
      "Why product teams in Iraq, Syria, Egypt, Saudi Arabia and beyond are moving from SMS to WhatsApp OTP — and how Nabda OTP makes this transition simple and reliable.",

    "blogPost2.section1.title":
      "The shift is happening faster than most expect",
    "blogPost2.section1.desc1":
      "In 2026, WhatsApp has become the primary messaging app across the Middle East. Users check WhatsApp dozens of times a day, while SMS open rates continue to decline due to carrier filtering and spam perception.",
    "blogPost2.section1.desc2":
      "For authentication use cases like login, password reset, and transaction verification, WhatsApp OTP offers significantly better delivery rates and user experience.",

    "blogPost2.section2.title":
      "Key Advantages of WhatsApp OTP over Traditional SMS",
    "blogPost2.section2.item1":
      "<strong>Higher Delivery Rate</strong> – Often exceeds 95% in Iraq, Syria, and Egypt",
    "blogPost2.section2.item2":
      "<strong>Lower Cost</strong> – Especially at scale compared to international SMS routes",
    "blogPost2.section2.item3":
      "<strong>Better User Experience</strong> – Messages appear in a familiar chat interface",
    "blogPost2.section2.item4":
      "<strong>Rich Status Tracking</strong> – Know when the message was sent, delivered, or read",
    "blogPost2.section2.item5":
      "<strong>Brand Trust</strong> – Messages come from a verified business number",

    "blogPost2.section3.title": "Real-World Performance in MENA Markets",
    "blogPost2.section3.intro": "Companies using Nabda OTP report:",
    "blogPost2.section3.item1":
      "Up to 40% reduction in authentication-related support tickets",
    "blogPost2.section3.item2":
      "Significant drop in SMS costs after migrating high-volume flows",
    "blogPost2.section3.item3":
      "Faster verification times (users receive OTP in under 5 seconds on average)",

    "blogPost2.section4.title": "How Nabda OTP Makes WhatsApp OTP Simple",
    "blogPost2.section4.desc":
      "Unlike the official WhatsApp Business API which requires template approval and complex setup, Nabda OTP follows a straightforward UltraMsg-style approach:",
    "blogPost2.section4.item1":
      "Create an instance → Get a dedicated WhatsApp number",
    "blogPost2.section4.item2": "Select the instance to get your scoped token",
    "blogPost2.section4.item3":
      "Send plain text OTPs directly via <code>/api/v1/messages/send</code>",
    "blogPost2.section4.item4": "Optional webhook for delivery status",

    "blogPost2.section5.title": "Who is making the switch in 2026?",
    "blogPost2.section5.desc":
      "Fintech startups, e-commerce platforms, delivery apps, and enterprise SaaS products across Iraq, Syria, Egypt, Jordan, and Saudi Arabia are increasingly making WhatsApp their primary OTP channel, with SMS kept only as a fallback.",

    "blogPost2.section6.title": "Bottom Line",
    "blogPost2.section6.desc":
      "WhatsApp OTP is not just a trend — it is becoming the new standard for authentication in the Middle East. Teams that move early with a reliable provider like Nabda OTP gain a clear advantage in cost, user experience, and delivery reliability.",

    "blogPost2.cta.title": "Ready to replace SMS with WhatsApp OTP?",
    "blogPost2.cta.button": "Start Free with Nabda OTP",
    "blogPost.back": "← Back to All Articles",
    // Comparison Modern Page - Nabda OTP vs Top Alternatives
    "comparisonModern.badge": "Complete Market Overview",
    "comparisonModern.title": "Nabda OTP vs Top Alternatives",
    "comparisonModern.subtitle":
      "High-level comparison of pricing models, onboarding speed, and feature fit for OTP products in Iraq, Syria, and MENA.",

    "comparisonModern.table.provider": "Provider",
    "comparisonModern.table.pricingModel": "Pricing Model",
    "comparisonModern.table.entryPrice": "Entry Price (Typical)",
    "comparisonModern.table.costPredictability": "Cost Predictability",
    "comparisonModern.table.menaFocus": "MENA Focus",
    "comparisonModern.table.bestFor": "Best For",

    "comparisonModern.table.nabda.pricing": "Fixed Monthly + Yearly",
    "comparisonModern.table.nabda.price":
      "<strong>$10/mo</strong> or <strong>$110/yr</strong>",
    "comparisonModern.table.nabda.cost": "High",
    "comparisonModern.table.nabda.mena": "Strong",
    "comparisonModern.table.nabda.bestFor": "MENA OTP products",

    "comparisonModern.table.ultramsg.pricing": "Per number/month",
    "comparisonModern.table.ultramsg.price": "~$39/month per number",
    "comparisonModern.table.ultramsg.cost": "Medium",
    "comparisonModern.table.ultramsg.mena": "General global",
    "comparisonModern.table.ultramsg.bestFor":
      "Teams managing multiple numbers",

    "comparisonModern.table.twilio.pricing": "Per message + platform markup",
    "comparisonModern.table.twilio.price": "~$0.005 + Meta rate/message",
    "comparisonModern.table.twilio.cost": "Low-Medium at high volume",
    "comparisonModern.table.twilio.mena": "Global-first",
    "comparisonModern.table.twilio.bestFor": "Enterprise multi-channel stacks",

    "comparisonModern.table.bulksms.pricing": "Per SMS message",
    "comparisonModern.table.bulksms.price": "~$0.0321/message benchmark",
    "comparisonModern.table.bulksms.cost": "Low-Medium",
    "comparisonModern.table.bulksms.mena": "General global",
    "comparisonModern.table.bulksms.bestFor": "SMS-first delivery",

    "comparisonModern.table.official.pricing": "Per template message",
    "comparisonModern.table.official.price": "Country/category-based",
    "comparisonModern.table.official.cost": "Medium",
    "comparisonModern.table.official.mena": "Global model",
    "comparisonModern.table.official.bestFor": "Large compliance-heavy orgs",

    "comparisonModern.table.otpiq.pricing": "Per message routing",
    "comparisonModern.table.otpiq.price": "Public SMS benchmark ~80 IQD/msg",
    "comparisonModern.table.otpiq.cost": "Medium",
    "comparisonModern.table.otpiq.mena": "Local Iraq focus",
    "comparisonModern.table.otpiq.bestFor": "Local multi-channel routing",

    "comparisonModern.note":
      "Data shown uses public benchmark pricing models and may vary by country, route, category, and contract terms.",

    "comparisonModern.why.title": "Why Businesses in MENA Choose Nabda OTP",
    "comparisonModern.why.card1.title": "Best Cost Predictability",
    "comparisonModern.why.card1.desc":
      "Fixed monthly and yearly plans make long-term planning simple.",
    "comparisonModern.why.card2.title": "Regional Product Fit",
    "comparisonModern.why.card2.desc":
      "Built for Iraq, Syria, and MENA business realities.",
    "comparisonModern.why.card3.title": "Faster Launch",
    "comparisonModern.why.card3.desc":
      "Clean API, practical docs, and quick onboarding.",

    "comparisonModern.cta.title": "Choose the most predictable OTP partner",
    "comparisonModern.cta.button": "Create Free Nabda Account",
    // Comparison Official WhatsApp API
    "comparisonOfficial.badge": "Official API Alternative",
    "comparisonOfficial.title": "Nabda OTP vs Official WhatsApp API",
    "comparisonOfficial.subtitle":
      "Official API pricing is typically per-message and country-dependent. Nabda keeps OTP economics simple with fixed monthly and yearly plans.",

    "comparisonOfficial.hero.cta1": "Start 5-Day Free Trial",
    "comparisonOfficial.hero.cta2": "View API Docs",

    "comparisonOfficial.table.feature": "Feature",
    "comparisonOfficial.table.nabda": "Nabda OTP",
    "comparisonOfficial.table.official": "Official API",
    "comparisonOfficial.table.winner": "Winner",

    "comparisonOfficial.table.row1.feature": "Pricing Options",
    "comparisonOfficial.table.row1.nabda":
      "<strong>Monthly: $10 (Unlimited)</strong><br /><strong>Yearly: $110/year (12 for 11)</strong>",
    "comparisonOfficial.table.row1.official": "Per-message pricing model",
    "comparisonOfficial.table.row1.winner": "Nabda OTP",

    "comparisonOfficial.table.row2.feature": "Billing Predictability",
    "comparisonOfficial.table.row2.nabda": "High and fixed",
    "comparisonOfficial.table.row2.official": "Variable by volume and country",
    "comparisonOfficial.table.row2.winner": "Nabda OTP",

    "comparisonOfficial.table.row3.feature": "Compliance",
    "comparisonOfficial.table.row3.nabda": "Strong for SMB/scaleups",
    "comparisonOfficial.table.row3.official": "Highest official track",
    "comparisonOfficial.table.row3.winner": "Official API",

    "comparisonOfficial.table.row4.feature": "MENA Focus",
    "comparisonOfficial.table.row4.nabda": "Strong regional focus",
    "comparisonOfficial.table.row4.official": "Global model",
    "comparisonOfficial.table.row4.winner": "Nabda OTP",

    "comparisonOfficial.table.row5.feature": "Webhook Support",
    "comparisonOfficial.table.row5.nabda": "Yes",
    "comparisonOfficial.table.row5.official": "Yes",
    "comparisonOfficial.table.row5.winner": "Tie",

    "comparisonOfficial.table.row6.feature": "Onboarding Speed",
    "comparisonOfficial.table.row6.nabda": "About 2 minutes",
    "comparisonOfficial.table.row6.official":
      "Usually longer verification cycle",
    "comparisonOfficial.table.row6.winner": "Nabda OTP",

    "comparisonOfficial.calculator.badge": "Live Cost Calculator",
    "comparisonOfficial.calculator.title":
      "Move the slider and compare your monthly bill instantly",
    "comparisonOfficial.calculator.desc":
      "Nabda OTP stays fixed at $10/month. Official API estimate below uses a realistic authentication baseline near $0.0030/message.",
    "comparisonOfficial.calculator.label": "Total OTP messages per month",
    "comparisonOfficial.calculator.messages": "messages/month",

    "comparisonOfficial.calculator.table.provider": "Provider",
    "comparisonOfficial.calculator.table.monthlyCost": "Monthly Cost",
    "comparisonOfficial.calculator.table.costPerMsg": "Cost per Message",
    "comparisonOfficial.calculator.table.billingModel": "Billing Model",
    "comparisonOfficial.calculator.table.bestFit": "Best Fit",

    "comparisonOfficial.calculator.nabda.cost":
      '<strong id="nabdaCost">$10.00</strong><br />Monthly: $10 | Yearly: $110 (1 month free)',
    "comparisonOfficial.calculator.nabda.model": "Fixed monthly or yearly",
    "comparisonOfficial.calculator.nabda.fit":
      "MENA products needing predictable costs",

    "comparisonOfficial.calculator.official.model":
      "Per-message category/country pricing",
    "comparisonOfficial.calculator.official.fit":
      "Large enterprises requiring official flow",

    "comparisonOfficial.calculator.note":
      "Official rates vary by destination country and message category.",

    "comparisonOfficial.why.title": "Why Businesses in MENA Choose Nabda OTP",
    "comparisonOfficial.why.card1.title": "Simple Pricing",
    "comparisonOfficial.why.card1.desc":
      "Fixed monthly and yearly plans avoid unpredictable cost spikes.",
    "comparisonOfficial.why.card2.title": "Regional Priority",
    "comparisonOfficial.why.card2.desc":
      "Built with Iraq, Syria, and MENA delivery realities in mind.",
    "comparisonOfficial.why.card3.title": "Fast Launch",
    "comparisonOfficial.why.card3.desc":
      "Clear docs and easy API flow reduce time to production.",

    "comparisonOfficial.why.cta.title": "Ready to simplify WhatsApp OTP costs?",
    "comparisonOfficial.why.cta.button": "Create Free Nabda Account",
    // Comparison - Nabda OTP vs BulkSMS
    "comparisonBulkSMS.badge": "BulkSMS Alternative for MENA",
    "comparisonBulkSMS.title": "Nabda OTP vs BulkSMS",
    "comparisonBulkSMS.subtitle":
      "BulkSMS pricing is usually per-message. Nabda keeps pricing fixed for predictable OTP growth.",

    "comparisonBulkSMS.hero.cta1": "Start 5-Day Free Trial",
    "comparisonBulkSMS.hero.cta2": "View API Docs",

    "comparisonBulkSMS.table.feature": "Feature",
    "comparisonBulkSMS.table.nabda": "Nabda OTP",
    "comparisonBulkSMS.table.bulksms": "BulkSMS",
    "comparisonBulkSMS.table.winner": "Winner",

    "comparisonBulkSMS.table.row1.feature": "Pricing Options",
    "comparisonBulkSMS.table.row1.nabda":
      "<strong>Monthly: $10 (Unlimited)</strong><br /><strong>Yearly: $110/year (12 for 11)</strong>",
    "comparisonBulkSMS.table.row1.bulksms": "Per-message pricing",
    "comparisonBulkSMS.table.row1.winner": "Nabda OTP",

    "comparisonBulkSMS.table.row2.feature": "Predictability",
    "comparisonBulkSMS.table.row2.nabda": "High",
    "comparisonBulkSMS.table.row2.bulksms": "Variable",
    "comparisonBulkSMS.table.row2.winner": "Nabda OTP",

    "comparisonBulkSMS.table.row3.feature": "MENA Focus",
    "comparisonBulkSMS.table.row3.nabda": "Strong",
    "comparisonBulkSMS.table.row3.bulksms": "General global",
    "comparisonBulkSMS.table.row3.winner": "Nabda OTP",

    "comparisonBulkSMS.calculator.badge": "Live Cost Calculator",
    "comparisonBulkSMS.calculator.title":
      "Move the slider and compare your monthly bill instantly",
    "comparisonBulkSMS.calculator.desc":
      "Nabda OTP stays fixed at $10/month. BulkSMS estimate below uses $0.0321/message benchmark.",
    "comparisonBulkSMS.calculator.label": "Total OTP messages per month",
    "comparisonBulkSMS.calculator.messages": "messages/month",

    "comparisonBulkSMS.calculator.table.provider": "Provider",
    "comparisonBulkSMS.calculator.table.monthlyCost": "Monthly Cost",
    "comparisonBulkSMS.calculator.table.costPerMsg": "Cost per Message",
    "comparisonBulkSMS.calculator.table.billingModel": "Billing Model",
    "comparisonBulkSMS.calculator.table.bestFit": "Best Fit",

    "comparisonBulkSMS.calculator.nabda.cost":
      '<strong id="nabdaCost">$10.00</strong><br />Monthly: $10 | Yearly: $110 (1 month free)',
    "comparisonBulkSMS.calculator.nabda.model": "Fixed monthly or yearly",
    "comparisonBulkSMS.calculator.nabda.fit": "MENA OTP teams",

    "comparisonBulkSMS.calculator.bulksms.model": "Per-message SMS billing",
    "comparisonBulkSMS.calculator.bulksms.fit": "SMS-first use cases",

    "comparisonBulkSMS.calculator.note":
      "BulkSMS rates vary by destination and route.",

    "comparisonBulkSMS.why.title": "Why Businesses in MENA Choose Nabda OTP",
    "comparisonBulkSMS.why.card1.title": "Fixed Economics",
    "comparisonBulkSMS.why.card1.desc":
      "No message-level billing surprises as traffic grows.",
    "comparisonBulkSMS.why.card2.title": "Regional Execution",
    "comparisonBulkSMS.why.card2.desc":
      "Built for Iraq, Syria, and nearby markets.",
    "comparisonBulkSMS.why.card3.title": "Fast Setup",
    "comparisonBulkSMS.why.card3.desc": "Easy API onboarding and clear docs.",

    "comparisonBulkSMS.why.cta.title": "Ready to switch?",
    "comparisonBulkSMS.why.cta.button": "Create Free Nabda Account",
    // Comparison - Nabda OTP vs OTPIQ
    "comparisonOTPIQ.badge": "OTPIQ Alternative for MENA",
    "comparisonOTPIQ.title": "Nabda OTP vs OTPIQ",
    "comparisonOTPIQ.subtitle":
      "Both target regional OTP workflows, but Nabda provides fixed monthly and yearly pricing for easier budgeting.",

    "comparisonOTPIQ.hero.cta1": "Start 5-Day Free Trial",
    "comparisonOTPIQ.hero.cta2": "View API Docs",

    "comparisonOTPIQ.table.feature": "Feature",
    "comparisonOTPIQ.table.nabda": "Nabda OTP",
    "comparisonOTPIQ.table.otpiq": "OTPIQ",
    "comparisonOTPIQ.table.winner": "Winner",

    "comparisonOTPIQ.table.row1.feature": "Pricing Options",
    "comparisonOTPIQ.table.row1.nabda":
      "<strong>Monthly: $10 (Unlimited)</strong><br /><strong>Yearly: $110/year (12 for 11)</strong>",
    "comparisonOTPIQ.table.row1.otpiq": "Per-message pricing",
    "comparisonOTPIQ.table.row1.winner": "Nabda OTP",

    "comparisonOTPIQ.table.row2.feature": "Predictability",
    "comparisonOTPIQ.table.row2.nabda": "High",
    "comparisonOTPIQ.table.row2.otpiq": "Variable",
    "comparisonOTPIQ.table.row2.winner": "Nabda OTP",

    "comparisonOTPIQ.table.row3.feature": "MENA Focus",
    "comparisonOTPIQ.table.row3.nabda": "Strong",
    "comparisonOTPIQ.table.row3.otpiq": "Strong local focus",
    "comparisonOTPIQ.table.row3.winner": "Tie",

    "comparisonOTPIQ.table.row4.feature": "Webhook Support",
    "comparisonOTPIQ.table.row4.nabda": "Yes",
    "comparisonOTPIQ.table.row4.otpiq": "Yes",
    "comparisonOTPIQ.table.row4.winner": "Tie",

    "comparisonOTPIQ.calculator.badge": "Live Cost Calculator",
    "comparisonOTPIQ.calculator.title":
      "Move the slider and compare your monthly bill instantly",
    "comparisonOTPIQ.calculator.desc":
      "Nabda OTP stays fixed at $10/month. OTPIQ estimate uses a public Iraq SMS benchmark around 80 IQD (~$0.061/message).",
    "comparisonOTPIQ.calculator.label": "Total OTP messages per month",
    "comparisonOTPIQ.calculator.messages": "messages/month",

    "comparisonOTPIQ.calculator.table.provider": "Provider",
    "comparisonOTPIQ.calculator.table.monthlyCost": "Monthly Cost",
    "comparisonOTPIQ.calculator.table.costPerMsg": "Cost per Message",
    "comparisonOTPIQ.calculator.table.billingModel": "Billing Model",
    "comparisonOTPIQ.calculator.table.bestFit": "Best Fit",

    "comparisonOTPIQ.calculator.nabda.cost":
      '<strong id="nabdaCost">$10.00</strong><br />Monthly: $10 | Yearly: $110 (1 month free)',
    "comparisonOTPIQ.calculator.nabda.model": "Fixed monthly or yearly",
    "comparisonOTPIQ.calculator.nabda.fit": "MENA OTP teams",

    "comparisonOTPIQ.calculator.otpiq.model": "Per-message routing model",
    "comparisonOTPIQ.calculator.otpiq.fit": "Local multi-channel routing",

    "comparisonOTPIQ.calculator.note":
      "OTPIQ WhatsApp-specific rates should be confirmed directly from OTPIQ contracts.",

    "comparisonOTPIQ.why.title": "Why Businesses in MENA Choose Nabda OTP",
    "comparisonOTPIQ.why.card1.title": "Fixed Pricing",
    "comparisonOTPIQ.why.card1.desc":
      "Predictable monthly and yearly cost at scale.",
    "comparisonOTPIQ.why.card2.title": "Regional Product Fit",
    "comparisonOTPIQ.why.card2.desc":
      "Purpose-built for local delivery and support needs.",
    "comparisonOTPIQ.why.card3.title": "Developer Experience",
    "comparisonOTPIQ.why.card3.desc":
      "Fast integration with clean API workflows.",

    "comparisonOTPIQ.why.cta.title": "Ready to reduce OTP costs?",
    "comparisonOTPIQ.why.cta.button": "Create Free Nabda Account",
    // Comparison - Nabda OTP vs Twilio
    "comparisonTwilio.badge": "Twilio Alternative for MENA",
    "comparisonTwilio.title": "Nabda OTP vs Twilio",
    "comparisonTwilio.subtitle":
      "Twilio is strong for global enterprise workflows, while Nabda OTP provides predictable fixed pricing and MENA-first execution for OTP-heavy products.",

    "comparisonTwilio.hero.cta1": "Start 5-Day Free Trial",
    "comparisonTwilio.hero.cta2": "View API Docs",

    "comparisonTwilio.table.feature": "Feature",
    "comparisonTwilio.table.nabda": "Nabda OTP",
    "comparisonTwilio.table.twilio": "Twilio",
    "comparisonTwilio.table.winner": "Winner",

    "comparisonTwilio.table.row1.feature": "Pricing Options",
    "comparisonTwilio.table.row1.nabda":
      "<strong>Monthly: $10 (Unlimited)</strong><br /><strong>Yearly: $110/year (12 for 11)</strong>",
    "comparisonTwilio.table.row1.twilio": "Usage-based, country-dependent",
    "comparisonTwilio.table.row1.winner": "Nabda OTP",

    "comparisonTwilio.table.row2.feature": "Billing Predictability",
    "comparisonTwilio.table.row2.nabda": "High and fixed",
    "comparisonTwilio.table.row2.twilio": "Variable at volume",
    "comparisonTwilio.table.row2.winner": "Nabda OTP",

    "comparisonTwilio.table.row3.feature": "WhatsApp API Type",
    "comparisonTwilio.table.row3.nabda": "Gateway API",
    "comparisonTwilio.table.row3.twilio": "Official API via Twilio",
    "comparisonTwilio.table.row3.winner": "Tie",

    "comparisonTwilio.table.row4.feature": "MENA Focus",
    "comparisonTwilio.table.row4.nabda": "Strong regional focus",
    "comparisonTwilio.table.row4.twilio": "Global-first platform",
    "comparisonTwilio.table.row4.winner": "Nabda OTP",

    "comparisonTwilio.table.row5.feature": "Webhook Support",
    "comparisonTwilio.table.row5.nabda": "Yes",
    "comparisonTwilio.table.row5.twilio": "Yes",
    "comparisonTwilio.table.row5.winner": "Tie",

    "comparisonTwilio.table.row6.feature": "Media & Documents",
    "comparisonTwilio.table.row6.nabda": "Yes",
    "comparisonTwilio.table.row6.twilio": "Yes",
    "comparisonTwilio.table.row6.winner": "Tie",

    "comparisonTwilio.table.row7.feature": "Onboarding Speed",
    "comparisonTwilio.table.row7.nabda": "About 2 minutes",
    "comparisonTwilio.table.row7.twilio": "Typically longer setup flow",
    "comparisonTwilio.table.row7.winner": "Nabda OTP",

    "comparisonTwilio.table.row8.feature": "Support",
    "comparisonTwilio.table.row8.nabda": "Arabic + English",
    "comparisonTwilio.table.row8.twilio": "Global support model",
    "comparisonTwilio.table.row8.winner": "Nabda OTP",

    "comparisonTwilio.calculator.badge": "Live Cost Calculator",
    "comparisonTwilio.calculator.title":
      "Move the slider and compare your monthly bill instantly",
    "comparisonTwilio.calculator.desc":
      "Nabda OTP stays fixed at $10/month. Twilio is estimated with a blended usage model around $0.0084/message (Twilio fee + Meta template fee).",
    "comparisonTwilio.calculator.label": "Total OTP messages per month",
    "comparisonTwilio.calculator.messages": "messages/month",

    "comparisonTwilio.calculator.table.provider": "Provider",
    "comparisonTwilio.calculator.table.monthlyCost": "Monthly Cost",
    "comparisonTwilio.calculator.table.costPerMsg": "Cost per Message",
    "comparisonTwilio.calculator.table.billingModel": "Billing Model",
    "comparisonTwilio.calculator.table.bestFit": "Best Fit",

    "comparisonTwilio.calculator.nabda.cost":
      '<strong id="nabdaCost">$10.00</strong><br />Monthly: $10 | Yearly: $110 (1 month free)',
    "comparisonTwilio.calculator.nabda.model": "Fixed monthly or yearly",
    "comparisonTwilio.calculator.nabda.fit": "MENA startups and scaleups",

    "comparisonTwilio.calculator.twilio.model":
      "Usage based (platform + Meta fees)",
    "comparisonTwilio.calculator.twilio.fit": "Global enterprise stacks",

    "comparisonTwilio.calculator.note":
      "Twilio and Meta pricing varies by destination country, template category, and billing updates.",

    "comparisonTwilio.why.title": "Why Businesses in MENA Choose Nabda OTP",
    "comparisonTwilio.why.card1.title": "Predictable Cost",
    "comparisonTwilio.why.card1.desc":
      "Fixed monthly and yearly plans make budgeting simple as verification traffic grows.",
    "comparisonTwilio.why.card2.title": "MENA-First Product",
    "comparisonTwilio.why.card2.desc":
      "Delivery and support priorities are designed for Iraq, Syria, and nearby markets.",
    "comparisonTwilio.why.card3.title": "Fast Go-Live",
    "comparisonTwilio.why.card3.desc":
      "Clean API and clear docs let engineering teams launch OTP workflows quickly.",

    "comparisonTwilio.why.cta.title":
      "Ready to lower OTP costs and launch faster?",
    "comparisonTwilio.why.cta.button": "Create Free Nabda Account",
    // Comparison - Nabda OTP vs UltraMsg
    "comparisonUltra.badge": "UltraMsg Alternative for MENA",
    "comparisonUltra.title": "Nabda OTP vs UltraMsg",
    "comparisonUltra.subtitle":
      "If you need WhatsApp OTP delivery in Iraq, Syria, and the wider MENA region, Nabda gives you a simple fixed plan while UltraMsg pricing scales with how many active numbers you need.",

    "comparisonUltra.hero.cta1": "Start 5-Day Free Trial",
    "comparisonUltra.hero.cta2": "View API Docs",

    "comparisonUltra.table.feature": "Feature",
    "comparisonUltra.table.nabda": "Nabda OTP",
    "comparisonUltra.table.ultramsg": "UltraMsg",
    "comparisonUltra.table.winner": "Winner",

    "comparisonUltra.table.row1.feature": "Pricing Options",
    "comparisonUltra.table.row1.nabda":
      "<strong>Monthly: $10 (Unlimited)</strong><br /><strong>Yearly: $110/year (12 for 11)</strong>",
    "comparisonUltra.table.row1.ultramsg":
      "<strong>Monthly: $39 per number</strong><br /><strong>Yearly: $390/year</strong>",
    "comparisonUltra.table.row1.winner": "Nabda OTP",

    "comparisonUltra.table.row2.feature": "WhatsApp Type",
    "comparisonUltra.table.row2.nabda": "Gateway API",
    "comparisonUltra.table.row2.ultramsg": "Gateway API",
    "comparisonUltra.table.row2.winner": "Tie",

    "comparisonUltra.table.row3.feature": "Volume Predictability",
    "comparisonUltra.table.row3.nabda": "Stable monthly cost",
    "comparisonUltra.table.row3.ultramsg": "Cost grows with added numbers",
    "comparisonUltra.table.row3.winner": "Nabda OTP",

    "comparisonUltra.table.row4.feature": "Regional Optimization",
    "comparisonUltra.table.row4.nabda": "Iraq + Syria + MENA focused",
    "comparisonUltra.table.row4.ultramsg": "General global routing",
    "comparisonUltra.table.row4.winner": "Nabda OTP",

    "comparisonUltra.table.row5.feature": "Webhook Support",
    "comparisonUltra.table.row5.nabda": "Yes",
    "comparisonUltra.table.row5.ultramsg": "Yes",
    "comparisonUltra.table.row5.winner": "Tie",

    "comparisonUltra.table.row6.feature": "Media/Documents",
    "comparisonUltra.table.row6.nabda": "Yes",
    "comparisonUltra.table.row6.ultramsg": "Yes",
    "comparisonUltra.table.row6.winner": "Tie",

    "comparisonUltra.table.row7.feature": "Free Trial",
    "comparisonUltra.table.row7.nabda": "5 days",
    "comparisonUltra.table.row7.ultramsg": "Limited trial options",
    "comparisonUltra.table.row7.winner": "Nabda OTP",

    "comparisonUltra.table.row8.feature": "Onboarding Speed",
    "comparisonUltra.table.row8.nabda": "About 2 minutes",
    "comparisonUltra.table.row8.ultramsg": "Longer setup flow",
    "comparisonUltra.table.row8.winner": "Nabda OTP",

    "comparisonUltra.why.title": "Why teams switch from UltraMsg to Nabda OTP",
    "comparisonUltra.why.card1.title": "Predictable Costs",
    "comparisonUltra.why.card1.desc":
      "Pay $10/month with no surprise scaling charges as your OTP traffic increases.",
    "comparisonUltra.why.card2.title": "Built for MENA Delivery",
    "comparisonUltra.why.card2.desc":
      "Routing and support are built around Iraq, Syria, Egypt, Saudi, and nearby markets.",
    "comparisonUltra.why.card3.title": "Faster to Launch",
    "comparisonUltra.why.card3.desc":
      "Simple REST API + webhooks + clear docs so your team can go live quickly.",

    "comparisonUltra.why.cta.title":
      "Ready to lower OTP costs and launch faster?",
    "comparisonUltra.why.cta.button": "Create Free Nabda Account",
    // OTP Solution Page
    "otpSolution.hero.title": "OTP & User Verification via WhatsApp",
    "otpSolution.hero.desc":
      "Send instant one-time passwords to Iraq, Syria, and all MENA countries. No templates. No Meta approval. Just create an instance and start verifying users in minutes.",
    "otpSolution.hero.cta1": "Start Free — No Credit Card",
    "otpSolution.hero.cta2": "View API Docs",

    "otpSolution.stats.delivery": "Delivery Rate",
    "otpSolution.stats.time": "Average Delivery Time",
    "otpSolution.stats.countries": "Countries Supported",
    "otpSolution.stats.pricing": "Unlimited Messages",

    "otpSolution.why.label": "Why WhatsApp?",
    "otpSolution.why.title":
      "SMS OTP is broken in Iraq & Syria.<br />WhatsApp just works.",
    "otpSolution.why.desc":
      "SMS delivery rates in Iraq and Syria are notoriously unreliable — messages get delayed, blocked by carriers, or simply never arrive. WhatsApp penetration in the region exceeds 90%, making it the most reliable channel for OTP delivery. With Nabda OTP, your verification codes land in seconds, not minutes.",

    "otpSolution.features.instant.title": "Instant Delivery",
    "otpSolution.features.instant.desc":
      "OTPs delivered via WhatsApp in under 3 seconds on average, even on slow mobile connections.",
    "otpSolution.features.noTemplates.title": "No Templates Needed",
    "otpSolution.features.noTemplates.desc":
      "Send any plain text message. No approval process, no waiting, no Meta business verification required.",
    "otpSolution.features.regional.title": "Iraq & Syria First",
    "otpSolution.features.regional.desc":
      "Purpose-built for +964 and +963 numbers. Full support for E.164 format across all MENA countries.",
    "otpSolution.features.secure.title": "Secure by Design",
    "otpSolution.features.secure.desc":
      "Instance-scoped Bearer tokens. Generate OTPs server-side. Each instance has a dedicated number.",
    "otpSolution.features.webhooks.title": "Delivery Webhooks",
    "otpSolution.features.webhooks.desc":
      "Real-time callbacks for sent, delivered, and failed events. Know exactly when your OTP arrives.",
    "otpSolution.features.pricing.title": "Flat Pricing",
    "otpSolution.features.pricing.desc":
      "One flat monthly fee per instance. No per-message costs. Send unlimited OTPs without surprises.",

    "otpSolution.how.label": "Integration",
    "otpSolution.how.title": "Go live in 4 simple steps",
    "otpSolution.how.step1.title": "Create a Nabda OTP Account",
    "otpSolution.how.step1.desc":
      "Sign up at dash.nabdaotp.com. Free to start, no credit card required.",
    "otpSolution.how.step2.title": "Create an Instance & Scan QR",
    "otpSolution.how.step2.desc":
      "Each instance gives you a dedicated WhatsApp number. Scan the QR code once to connect your WhatsApp — done.",
    "otpSolution.how.step3.title": "Get Your Instance Token",
    "otpSolution.how.step3.desc":
      "Call the select-instance endpoint to receive a Bearer token scoped to your instance. Store it securely on your backend.",
    "otpSolution.how.step4.title": "Send OTP with a Single API Call",
    "otpSolution.how.step4.desc":
      "POST to /api/v1/messages/send with the phone number and your message. That's it.",

    "otpSolution.code.label": "Code Example",
    "otpSolution.code.title": "Send your first OTP in under 10 lines",
    "otpSolution.code.desc":
      "Everything runs server-side. Generate the OTP, send it via Nabda, store the hash — verify on submission.",

    "otpSolution.usecases.label": "Use Cases",
    "otpSolution.usecases.title": "Built for every verification scenario",
    "otpSolution.usecases.item1": "📱 User registration & signup verification",
    "otpSolution.usecases.item2": "🔐 Two-factor authentication (2FA)",
    "otpSolution.usecases.item3": "🔑 Password reset & account recovery",
    "otpSolution.usecases.item4": "💳 Payment & transaction authorization",

    "otpSolution.cta.title": "Start verifying users via WhatsApp today",
    "otpSolution.cta.desc":
      "Create your first Nabda OTP instance in minutes. No contracts, no per-message fees, no Meta approval needed.",
    "otpSolution.cta.button1": "Create Free Instance",
    "otpSolution.cta.button2": "Read Full Guide →",
    // Order Solution Page
    "orderSolution.hero.title":
      "Order Confirmations & Delivery Updates via WhatsApp",
    "orderSolution.hero.desc":
      "Keep your customers informed at every step — from order placed to doorstep delivery. Real-time WhatsApp notifications that actually get read.",
    "orderSolution.hero.cta1": "Start Free — No Credit Card",
    "orderSolution.hero.cta2": "View API Docs",

    "orderSolution.stats.openRate": "Open Rate on WhatsApp",
    "orderSolution.stats.support": "Less Customer Support Calls",
    "orderSolution.stats.deliveryTime": "Message Delivery Time",
    "orderSolution.stats.unlimited": "Unlimited Notifications",

    "orderSolution.why.label": "Why WhatsApp?",
    "orderSolution.why.title":
      "Your customers ignore emails.<br />They can't ignore WhatsApp.",
    "orderSolution.why.desc":
      "In Iraq and Syria, email open rates hover below 15%. WhatsApp messages, on the other hand, are opened within minutes — often seconds. With Nabda OTP, you can send instant order confirmations, payment receipts, and delivery tracking updates that customers actually see and trust.",

    "orderSolution.features.confirmation.title": "Order Confirmation",
    "orderSolution.features.confirmation.desc":
      "Send an instant confirmation the moment an order is placed. Reduce cancellations and build customer trust from the first interaction.",
    "orderSolution.features.payment.title": "Payment Receipt",
    "orderSolution.features.payment.desc":
      "Automatically notify customers when payment is received and processed. Essential for COD and online payment workflows.",
    "orderSolution.features.shipping.title": "Shipping Updates",
    "orderSolution.features.shipping.desc":
      "Notify when the order is packed, shipped, out for delivery, and delivered. Keep customers in the loop at every stage.",
    "orderSolution.features.return.title": "Return & Refund Alerts",
    "orderSolution.features.return.desc":
      "Proactively communicate return status and refund confirmations to avoid confusion and reduce support tickets.",
    "orderSolution.features.api.title": "Simple REST API",
    "orderSolution.features.api.desc":
      "One endpoint. One POST request. Works with any backend — Node.js, Python, PHP, Laravel, whatever your stack is.",
    "orderSolution.features.regional.title": "Iraq & Syria Ready",
    "orderSolution.features.regional.desc":
      "Full support for +964 and +963 numbers. Works perfectly with local Iraqi and Syrian e-commerce operations.",

    "orderSolution.journey.label": "Customer Journey",
    "orderSolution.journey.title": "A message for every moment that matters",
    "orderSolution.journey.step1.label": "Order Placed",
    "orderSolution.journey.step1.title": "Instant Confirmation",
    "orderSolution.journey.step1.desc":
      '"✅ Your order #1042 has been confirmed! Total: 35,000 IQD. We\'ll notify you when it ships. – YourStore"',
    "orderSolution.journey.step2.label": "Payment Received",
    "orderSolution.journey.step2.title": "Payment Receipt",
    "orderSolution.journey.step2.desc":
      '"💳 Payment received for order #1042. Amount: 35,000 IQD. Thank you! – YourStore"',
    "orderSolution.journey.step3.label": "Order Shipped",
    "orderSolution.journey.step3.title": "Shipping Notification",
    "orderSolution.journey.step3.desc":
      '"🚚 Your order #1042 is on its way! Estimated delivery: tomorrow between 10am–2pm. – YourStore"',
    "orderSolution.journey.step4.label": "Delivered",
    "orderSolution.journey.step4.title": "Delivery Confirmation",
    "orderSolution.journey.step4.desc":
      '"✅ Order #1042 delivered! We hope you love it. Need anything? Reply to this message. – YourStore"',

    "orderSolution.code.label": "Code Example",
    "orderSolution.code.title":
      "Trigger order notifications with a single API call",
    "orderSolution.code.desc":
      "Hook into your order management system's events and fire a WhatsApp notification instantly — no complex setup required.",

    "orderSolution.usecases.label": "Who Uses This",
    "orderSolution.usecases.title": "Perfect for every type of seller in MENA",
    "orderSolution.usecases.item1": "🛍️ Online stores & marketplaces",
    "orderSolution.usecases.item2": "🍕 Food delivery & restaurants",
    "orderSolution.usecases.item3": "💊 Pharmacies & health products",
    "orderSolution.usecases.item4": "👗 Fashion & clothing brands",
    "orderSolution.usecases.item5": "📱 Electronics & mobile shops",
    "orderSolution.usecases.item6": "🚗 Auto parts & accessories",
    "orderSolution.usecases.item7": "🏗️ B2B wholesale suppliers",
    "orderSolution.usecases.item8": "🎁 Gift shops & subscription boxes",

    "orderSolution.cta.title": "Start sending order updates via WhatsApp today",
    "orderSolution.cta.desc":
      "Create your Nabda OTP instance in minutes and connect it to your store. Unlimited notifications, flat monthly price.",
    "orderSolution.cta.button1": "Create Free Instance",
    "orderSolution.cta.button2": "Read the Docs →",
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

    // Partner / Referral Section
    "partner.title": "اكسب أموال عن طريق دعوة أصدقائك",
    "partner.subtitle":
      "شارك كود الدعوة الخاص بك مع المطورين والشركات. وعندما يشتركون، تكسب أموال يمكن استبدالها بشهور مجانية أو رصيد أو مكافآت حصرية.",
    "partner.cta": "احصل على كود الدعوة الخاص بك",
    "partner.note": "ابدأ في الكسب اليوم • لا يوجد حد أقصى لعدد الدعوات",

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

    // Pricing AR
    "pricing.title": "أسعار بسيطة وشفافة",
    "pricing.subtitle":
      "بدون رسوم مخفية. بدون تكلفة لكل رسالة. أفضل قيمة لواجهة واتساب API.",
    "pricing.monthly": "شهري",
    "pricing.annual": "سنوي",
    "pricing.period": "/شهر",
    "pricing.periodYear": "/سنة",

    "pricing.standard.badge": "الخطة القياسية",
    "pricing.standard.typeLine": "النوع: بوابة واتساب",
    "pricing.standard.bestForLine": "مناسبة لـ: المطورين والشركات الصغيرة",
    "pricing.standard.messagesLine": "الرسائل: غير محدودة",

    "pricing.features.unlimited": "رسائل واتساب غير محدودة",
    "pricing.features.noFee": "بدون تكلفة لكل رسالة",
    "pricing.features.trial": "تجربة مجانية لمدة 5 أيام",
    "pricing.features.api": "إمكانية الوصول إلى RESTful API",
    "pricing.features.webhookReceive": "استقبال الرسائل عبر Webhook",
    "pricing.features.media": "إرسال الوسائط والمستندات",
    "pricing.features.webhook": "دعم Webhook",
    "pricing.features.support": "دعم أولوية",
    "pricing.features.cancel": "إلغاء في أي وقت",

    "pricing.cta.trial": "ابدأ تجربتك المجانية",
    "pricing.note.trial": "لا حاجة لبطاقة بنكية • الإعداد خلال دقيقتين",

    "pricing.annual.save": "12 شهر بسعر 11 شهر",
    "pricing.annual.bestFor": "مناسبة للتوفير على المدى الطويل",
    "pricing.annual.messages": "رسائل واتساب غير محدودة (سنوي)",
    "pricing.cta.yearly": "اختر الخطة السنوية",
    "pricing.note.yearly": "وفر 8.33% • يتم الدفع سنويًا",

    "pricing.enterprise.contact": "تواصل معنا",
    "pricing.enterprise.enter": "الشركات",
    "pricing.enterprise.type": "النوع: واجهة واتساب الرسمية",
    "pricing.enterprise.bestFor": "مناسبة للشركات الكبيرة والامتثال",
    "pricing.enterprise.messages": "الرسائل: الدفع لكل محادثة",
    "pricing.enterprise.meta": "واجهة رسمية موثقة من Meta",
    "pricing.enterprise.limits": "حدود رسائل أعلى",
    "pricing.enterprise.verification": "دعم توثيق النشاط التجاري",
    "pricing.enterprise.onboarding": "إعداد مخصص",
    "pricing.enterprise.sla": "ضمان SLA",

    "pricing.cta.contact": "تواصل معنا",
    "pricing.note.enterprise": "سنقوم بإعداد كل شيء لك",
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
    "footer.comparisons.title": "مقارنات",
    "footer.comparisons.nabda_vs_ultramsg": "نبضة مقابل UltraMsg",
    "footer.comparisons.nabda_vs_twilio": "نبضة مقابل Twilio",
    "footer.comparisons.nabda_vs_bulksms": "نبضة مقابل BulkSMS",
    "footer.comparisons.nabda_vs_official": "نبضة مقابل Official API",
    "footer.comparisons.nabda_vs_otpiq": "نبضة مقابل OTPIQ",
    "footer.comparisons.nabda_alternatives": "بدائل نبضة ←",
    "blogs.title": "مدونتنا",
    "blogs.subtitle": "رؤى وأدلة وآخر التحديثات حول واتساب API وحلول OTP",

    "blogs.post1.title": "كيفية إرسال OTP عبر WhatsApp API – دليل شامل 2026",
    "blogs.post1.desc":
      "دليل خطوة بخطوة لدمج Nabda OTP للتحقق الأمني من المستخدمين.",

    "blogs.post2.title":
      "لماذا يحل WhatsApp OTP محل SMS في الشرق الأوسط – اتجاهات 2026",
    "blogs.post2.desc":
      "الاتجاهات والإحصائيات والفرص للشركات في مصر والسعودية وخارجها.",

    "blogs.comingSoon.title": "دليل ومقالات قيمة جديدة قادمة قريبًا",
    "blogs.comingSoon.desc":
      "نعمل حاليًا على مقالات متعمقة حول أفضل ممارسات WhatsApp API وقصص نجاح من المنطقة.",
    "blogs.comingSoon.stayTuned": "تابعونا ..",

    "blogs.readMore": "اقرأ المزيد →",

    "nav.blogs": "المدونة",
    "nav.solutions": "الحلول",
    "nav.comparing": "مقارنات",
    // Comparison Page
    "comparison.title": "نبضة أوتي بي مقابل المنافسين",
    "comparison.subtitle":
      "اكتشف لماذا تختار الشركات الذكية في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",

    "comparison.card1.title": "نبضة أوتي بي مقابل UltraMsg",
    "comparison.card1.description":
      "أفضل قيمة وموثوقية للشركات في الشرق الأوسط وشمال أفريقيا",

    "comparison.card2.title": "نبضة أوتي بي مقابل Twilio",
    "comparison.card2.description": "مقارنة التكلفة وأداء التوصيل",

    "comparison.card3.title": "نبضة أوتي بي مقابل Official WhatsApp API",
    "comparison.card3.description": "السعر مقابل الميزات مقابل التعقيد",

    "comparison.card4.title": "نبضة أوتي بي مقابل BulkSMS",
    "comparison.card4.description":
      "WhatsApp API مقابل بوابة الرسائل القصيرة التقليدية – التكلفة والتوصيل والموثوقية في الشرق الأوسط وشمال أفريقيا",

    "comparison.card5.title": "نبضة أوتي بي مقابل OTPIQ",
    "comparison.card5.description":
      "مقارنة مزودي خدمة OTP المحليين – التسعير وسرعة التوصيل والميزات",

    "comparison.card6.title": "أفضل بدائل نبضة أوتي بي",
    "comparison.card6.description":
      "دليل شامل لجميع مزودي WhatsApp API الرئيسيين في 2026",

    "comparison.detailed_comparison": "مقارنة تفصيلية ←",
    "comparison.view_all": "عرض جميع البدائل ←",
    // Solutions Page
    "solutions.title": "الحلول",
    "solutions.subtitle":
      "حلول واتساب قوية مصممة خصيصًا لاحتياجات أعمالك في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا",
    "solutions.card1.title": "التحقق بالكود المؤقت (OTP) وتأكيد الهوية",
    "solutions.card1.description":
      "أرسل كلمات مرور مؤقتة آمنة وفورية عبر واتساب للتسجيل وتسجيل الدخول والتحقق بخطوتين.",
    "solutions.card2.title": "تأكيدات الطلبات والتوصيل",
    "solutions.card2.description":
      "تحديثات حالة الطلب في الوقت الفعلي، إشعارات التوصيل، وتأكيدات الدفع لأعمال التجارة الإلكترونية.",
    "solutions.coming_soon.title": "المزيد من الحلول قريبًا",
    "solutions.coming_soon.description":
      "نعمل حاليًا على حلول واتساب قوية إضافية مصممة خصيصًا للشركات في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا.",
    "solutions.coming_soon.text": "ابقوا على اطلاع ...",
    "solutions.learn_more": "اعرف المزيد ←",
    // Blog Post - How to Send OTP via WhatsApp API
    "blogPost.title":
      "دليل كامل 2026: كيفية إرسال كود التحقق (OTP) عبر واتساب API",
    "blogPost.excerpt":
      "دليل عملي جاهز للإنتاج للمطورين باستخدام <strong>Nabda OTP</strong> – أسرع حل لإرسال كود التحقق عبر واتساب في العراق (+964) وسوريا (+963) وباقي الدول.",

    "blogPost.section1.title":
      "لماذا يُعد نبضة أوتي بي الخيار الأفضل للعراق وسوريا",
    "blogPost.section1.desc":
      "يمنحك نبضة أوتي بي وصولاً مباشراً إلى واتساب دون الحاجة إلى قوالب Business API الرسمية أو تأخيرات موافقة ميتا. فقط أنشئ مثيل وابدأ في إرسال أكواد التحقق فوراً.",

    "blogPost.section2.title": "ما تحتاجه للبدء",
    "blogPost.section2.item1": "حساب نبضة أوتي بي",
    "blogPost.section2.item2":
      "مثيل واحد أو أكثر نشط (كل مثيل = رقم واتساب مخصص)",
    "blogPost.section2.item3": "توكن خاص بالمثيل (Bearer token)",
    "blogPost.section2.item4": "منطق توليد OTP على جانب السيرفر",

    "blogPost.section3.title":
      "خطوة بخطوة: إرسال OTP باستخدام API نبضة أوتي بي",
    "blogPost.section3.step1": "1. إنشاء واختيار المثيل",
    "blogPost.section3.step1.desc":
      "بعد إنشاء المثيل من لوحة التحكم، يجب عليك اختياره للحصول على توكن المثيل:",
    "blogPost.section3.step2": "2. توليد OTP على الباك إند",
    "blogPost.section3.step3": "3. إرسال OTP عبر واتساب (الإند بوينت الصحيح)",
    "blogPost.section3.step4": "4. التحقق من OTP على السيرفر",
    "blogPost.section3.step4.desc":
      "يجب دائماً التحقق من كود التحقق على الباك إند (لا تعتمد أبداً على العميل).",
    "blogPost.section4.title": "اختياري: إعداد Webhook لمعرفة حالة التوصيل",
    "blogPost.section5.title": "أفضل الممارسات في العراق وسوريا",
    "blogPost.section5.item1":
      "استخدم صيغة E.164: +96477xxxxxxxx أو +9639xxxxxxxx",
    "blogPost.section5.item2": "اجعل صلاحية OTP بين 3-8 دقائق",
    "blogPost.section5.item3":
      "أرسل رسائل ثنائية اللغة عند الإمكان (العربية + الإنجليزية)",
    "blogPost.section5.item4": "أدرج اسم علامتك التجارية دائماً في الرسالة",
    "blogPost.section5.item5":
      "راقب أحداث الـ webhook لمعرفة sent و delivered والفشل",
    "blogPost.section6.title": "استكشاف الأخطاء وإصلاحها",
    "blogPost.section6.item1":
      "<strong>401 Unauthorized</strong> → تأكد من اختيار المثيل واستخدام توكن المثيل",
    "blogPost.section6.item2":
      "<strong>رقم الهاتف غير صالح</strong> → يجب أن يبدأ بـ +964 أو +963 أو أي رمز دولة مدعوم آخر.",
    "blogPost.section6.item3":
      "<strong>لم يتم استلام الرسالة</strong> → تأكد من أن المثيل متصل (تم مسح رمز QR)",
    "blogPost.section7.title": "هل أنت جاهز للبدء؟",
    "blogPost.section7.desc":
      "أنشئ أول مثيل لك في ثوانٍ وابدأ في إرسال أكواد التحقق عبر واتساب اليوم.",
    "blogPost.cta.title": "ابدأ مع نبضة أوتي بي",
    "blogPost.cta.button": "أنشئ مثيل مجاني الآن",
    "blogPost.back": "← العودة إلى جميع المقالات",
    // Blog Post 2 - Why WhatsApp OTP is Replacing SMS
    "blogPost2.title":
      "لماذا يحل واتساب أوتي بي محل الرسائل القصيرة في الشرق الأوسط – الاتجاهات والواقع 2026",
    "blogPost2.excerpt":
      "لماذا تنتقل فرق المنتجات في العراق وسوريا ومصر والسعودية ودول أخرى من الرسائل القصيرة إلى واتساب أوتي بي — وكيف يجعل نبضة أوتي بي هذا الانتقال سهلاً وموثوقاً.",

    "blogPost2.section1.title": "التحول يحدث أسرع مما يتوقع معظم الناس",
    "blogPost2.section1.desc1":
      "في عام 2026، أصبح واتساب التطبيق الرئيسي للتراسل في الشرق الأوسط. يتحقق المستخدمون من واتساب عشرات المرات يومياً، بينما تستمر معدلات فتح الرسائل القصيرة في الانخفاض بسبب تصفية شركات الاتصالات وإدراك الرسائل كسبام.",
    "blogPost2.section1.desc2":
      "بالنسبة لحالات التحقق مثل تسجيل الدخول وإعادة تعيين كلمة المرور والتحقق من المعاملات، يقدم واتساب أوتي بي معدلات توصيل أفضل بكثير وتجربة مستخدم أفضل.",

    "blogPost2.section2.title":
      "المميزات الرئيسية لواتساب أوتي بي مقارنة بالرسائل القصيرة التقليدية",
    "blogPost2.section2.item1":
      "<strong>معدل توصيل أعلى</strong> – يتجاوز غالباً 95% في العراق وسوريا ومصر",
    "blogPost2.section2.item2":
      "<strong>تكلفة أقل</strong> – خاصة عند الحجم الكبير مقارنة بخطوط الرسائل القصيرة الدولية",
    "blogPost2.section2.item3":
      "<strong>تجربة مستخدم أفضل</strong> – تظهر الرسائل في واجهة محادثة مألوفة",
    "blogPost2.section2.item4":
      "<strong>تتبع حالة غني</strong> – تعرف متى تم إرسال الرسالة أو توصيلها أو قراءتها",
    "blogPost2.section2.item5":
      "<strong>ثقة بالعلامة التجارية</strong> – تأتي الرسائل من رقم أعمال موثق",

    "blogPost2.section3.title":
      "الأداء الفعلي في أسواق الشرق الأوسط وشمال أفريقيا",
    "blogPost2.section3.intro": "الشركات التي تستخدم نبضة أوتي بي تشهد:",
    "blogPost2.section3.item1":
      "انخفاض يصل إلى 40% في تذاكر الدعم المتعلقة بالتحقق",
    "blogPost2.section3.item2":
      "انخفاض ملحوظ في تكاليف الرسائل القصيرة بعد نقل التدفقات ذات الحجم الكبير",
    "blogPost2.section3.item3":
      "أوقات تحقق أسرع (يستلم المستخدمون أوتي بي في أقل من 5 ثوانٍ في المتوسط)",

    "blogPost2.section4.title": "كيف يجعل نبضة أوتي بي واتساب أوتي بي سهلاً",
    "blogPost2.section4.desc":
      "على عكس واتساب بيزنس API الرسمي الذي يتطلب موافقة القوالب وإعداداً معقداً، يتبع نبضة أوتي بي نهجاً مباشراً على طريقة UltraMsg:",
    "blogPost2.section4.item1": "أنشئ مثيلاً → احصل على رقم واتساب مخصص",
    "blogPost2.section4.item2": "اختر المثيل لتحصل على توكنك المحدد",
    "blogPost2.section4.item3":
      "أرسل رسائل أوتي بي نصية مباشرة عبر <code>/api/v1/messages/send</code>",
    "blogPost2.section4.item4": "Webhook اختياري لحالة التوصيل",

    "blogPost2.section5.title": "من يقوم بالتحول في 2026؟",
    "blogPost2.section5.desc":
      "الشركات الناشئة في التكنولوجيا المالية، ومنصات التجارة الإلكترونية، وتطبيقات التوصيل، ومنتجات SaaS المؤسسية في العراق وسوريا ومصر والأردن والسعودية تتجه بشكل متزايد إلى جعل واتساب القناة الرئيسية لأوتي بي، مع الاحتفاظ بالرسائل القصيرة كخيار احتياطي فقط.",

    "blogPost2.section6.title": "الخلاصة",
    "blogPost2.section6.desc":
      "واتساب أوتي بي ليس مجرد اتجاه — بل أصبح المعيار الجديد للتحقق في الشرق الأوسط. الفرق التي تنتقل مبكراً مع مزود موثوق مثل نبضة أوتي بي تحصل على ميزة واضحة في التكلفة وتجربة المستخدم وموثوقية التوصيل.",

    "blogPost2.cta.title":
      "هل أنت جاهز لاستبدال الرسائل القصيرة بواتساب أوتي بي؟",
    "blogPost2.cta.button": "ابدأ مجاناً مع نبضة أوتي بي",
    "blogPost.back": "← العودة إلى جميع المقالات",
    // Comparison Modern Page - Nabda OTP vs Top Alternatives
    "comparisonModern.badge": "نظرة شاملة على السوق",
    "comparisonModern.title": "نبضة أوتي بي مقابل أفضل البدائل",
    "comparisonModern.subtitle":
      "مقارنة عالية المستوى لنماذج التسعير وسرعة الإعداد ومدى التوافق مع منتجات أوتي بي في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا.",

    "comparisonModern.table.provider": "المزود",
    "comparisonModern.table.pricingModel": "نموذج التسعير",
    "comparisonModern.table.entryPrice": "السعر الابتدائي (النمطي)",
    "comparisonModern.table.costPredictability": "قابلية التنبؤ بالتكلفة",
    "comparisonModern.table.menaFocus":
      "التركيز على الشرق الأوسط وشمال أفريقيا",
    "comparisonModern.table.bestFor": "الأنسب لـ",

    "comparisonModern.table.nabda.pricing": "شهري ثابت + سنوي",
    "comparisonModern.table.nabda.price":
      "<strong>10 دولار/شهر</strong> أو <strong>110 دولار/سنة</strong>",
    "comparisonModern.table.nabda.cost": "عالية",
    "comparisonModern.table.nabda.mena": "قوي",
    "comparisonModern.table.nabda.bestFor":
      "منتجات أوتي بي في الشرق الأوسط وشمال أفريقيا",

    "comparisonModern.table.ultramsg.pricing": "لكل رقم/شهر",
    "comparisonModern.table.ultramsg.price": "حوالي 39 دولار/شهر لكل رقم",
    "comparisonModern.table.ultramsg.cost": "متوسطة",
    "comparisonModern.table.ultramsg.mena": "عالمي عام",
    "comparisonModern.table.ultramsg.bestFor": "الفرق التي تدير أرقام متعددة",

    "comparisonModern.table.twilio.pricing": "لكل رسالة + رسوم المنصة",
    "comparisonModern.table.twilio.price":
      "حوالي 0.005 دولار + رسوم ميتا لكل رسالة",
    "comparisonModern.table.twilio.cost": "منخفضة-متوسطة عند الحجم الكبير",
    "comparisonModern.table.twilio.mena": "عالمي أولاً",
    "comparisonModern.table.twilio.bestFor": "مكدسات المؤسسات متعددة القنوات",

    "comparisonModern.table.bulksms.pricing": "لكل رسالة قصيرة",
    "comparisonModern.table.bulksms.price": "حوالي 0.0321 دولار/رسالة (معيار)",
    "comparisonModern.table.bulksms.cost": "منخفضة-متوسطة",
    "comparisonModern.table.bulksms.mena": "عالمي عام",
    "comparisonModern.table.bulksms.bestFor":
      "التوصيل عبر الرسائل القصيرة أولاً",

    "comparisonModern.table.official.pricing": "لكل رسالة قالب",
    "comparisonModern.table.official.price": "حسب الدولة والفئة",
    "comparisonModern.table.official.cost": "متوسطة",
    "comparisonModern.table.official.mena": "نموذج عالمي",
    "comparisonModern.table.official.bestFor":
      "المؤسسات الكبيرة ذات الامتثال العالي",

    "comparisonModern.table.otpiq.pricing": "لكل توجيه رسالة",
    "comparisonModern.table.otpiq.price":
      "معيار الرسائل القصيرة العام ~80 دينار عراقي/رسالة",
    "comparisonModern.table.otpiq.cost": "متوسطة",
    "comparisonModern.table.otpiq.mena": "تركيز محلي على العراق",
    "comparisonModern.table.otpiq.bestFor": "التوجيه المحلي متعدد القنوات",

    "comparisonModern.note":
      "البيانات المعروضة تعتمد على نماذج تسعير معيارية عامة وقد تختلف حسب الدولة والمسار والفئة وشروط العقد.",

    "comparisonModern.why.title":
      "لماذا تختار الشركات في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",
    "comparisonModern.why.card1.title": "أفضل قابلية للتنبؤ بالتكلفة",
    "comparisonModern.why.card1.desc":
      "الخطط الشهرية والسنوية الثابتة تجعل التخطيط طويل الأمد سهلاً.",
    "comparisonModern.why.card2.title": "توافق إقليمي مع المنتج",
    "comparisonModern.why.card2.desc":
      "مصمم خصيصاً لواقع الأعمال في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا.",
    "comparisonModern.why.card3.title": "إطلاق أسرع",
    "comparisonModern.why.card3.desc":
      "واجهة برمجة تطبيقات نظيفة، وثائق عملية، وإعداد سريع.",

    "comparisonModern.cta.title": "اختر أكثر شريك أوتي بي يمكن التنبؤ به",
    "comparisonModern.cta.button": "أنشئ حساب نبضة مجاني",
    // Comparison Official WhatsApp API
    "comparisonOfficial.badge": "بديل الـ API الرسمي",
    "comparisonOfficial.title": "نبضة أوتي بي مقابل Official WhatsApp API",
    "comparisonOfficial.subtitle":
      "تسعير الـ API الرسمي يكون عادةً لكل رسالة ويعتمد على الدولة. نبضة يحافظ على اقتصاديات أوتي بي بسيطة من خلال خطط شهرية وسنوية ثابتة.",

    "comparisonOfficial.hero.cta1": "ابدأ تجربة مجانية لمدة 5 أيام",
    "comparisonOfficial.hero.cta2": "عرض وثائق الـ API",

    "comparisonOfficial.table.feature": "الميزة",
    "comparisonOfficial.table.nabda": "نبضة أوتي بي",
    "comparisonOfficial.table.official": "Official API",
    "comparisonOfficial.table.winner": "الفائز",

    "comparisonOfficial.table.row1.feature": "خيارات التسعير",
    "comparisonOfficial.table.row1.nabda":
      "<strong>شهري: 10 دولار (غير محدود)</strong><br /><strong>سنوي: 110 دولار/سنة (12 شهر بـ 11)</strong>",
    "comparisonOfficial.table.row1.official": "نموذج التسعير لكل رسالة",
    "comparisonOfficial.table.row1.winner": "نبضة أوتي بي",

    "comparisonOfficial.table.row2.feature": "قابلية التنبؤ بالفوترة",
    "comparisonOfficial.table.row2.nabda": "عالية وثابتة",
    "comparisonOfficial.table.row2.official": "متغيرة حسب الحجم والدولة",
    "comparisonOfficial.table.row2.winner": "نبضة أوتي بي",

    "comparisonOfficial.table.row3.feature": "الامتثال",
    "comparisonOfficial.table.row3.nabda":
      "قوي للشركات الصغيرة والمتوسطة والناشئة",
    "comparisonOfficial.table.row3.official": "أعلى مستوى رسمي",
    "comparisonOfficial.table.row3.winner": "Official API",

    "comparisonOfficial.table.row4.feature":
      "التركيز على الشرق الأوسط وشمال أفريقيا",
    "comparisonOfficial.table.row4.nabda": "تركيز إقليمي قوي",
    "comparisonOfficial.table.row4.official": "نموذج عالمي",
    "comparisonOfficial.table.row4.winner": "نبضة أوتي بي",

    "comparisonOfficial.table.row5.feature": "دعم Webhook",
    "comparisonOfficial.table.row5.nabda": "نعم",
    "comparisonOfficial.table.row5.official": "نعم",
    "comparisonOfficial.table.row5.winner": "تعادل",

    "comparisonOfficial.table.row6.feature": "سرعة الإعداد",
    "comparisonOfficial.table.row6.nabda": "حوالي دقيقتين",
    "comparisonOfficial.table.row6.official": "عادة دورة تحقق أطول",
    "comparisonOfficial.table.row6.winner": "نبضة أوتي بي",

    "comparisonOfficial.calculator.badge": "حاسبة التكلفة المباشرة",
    "comparisonOfficial.calculator.title":
      "حرك الشريط وقارن فاتورتك الشهرية فوراً",
    "comparisonOfficial.calculator.desc":
      "نبضة أوتي بي ثابت عند 10 دولار شهرياً. التقدير أدناه لـ Official API يستخدم خط أساس واقعي للتحقق قريب من 0.0030 دولار/رسالة.",
    "comparisonOfficial.calculator.label": "إجمالي رسائل أوتي بي شهرياً",
    "comparisonOfficial.calculator.messages": "رسالة/شهر",

    "comparisonOfficial.calculator.table.provider": "المزود",
    "comparisonOfficial.calculator.table.monthlyCost": "التكلفة الشهرية",
    "comparisonOfficial.calculator.table.costPerMsg": "التكلفة لكل رسالة",
    "comparisonOfficial.calculator.table.billingModel": "نموذج الفوترة",
    "comparisonOfficial.calculator.table.bestFit": "الأنسب لـ",

    "comparisonOfficial.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00 دولار</strong><br />شهري: 10 دولار | سنوي: 110 دولار (شهر مجاني)',
    "comparisonOfficial.calculator.nabda.model": "ثابت شهري أو سنوي",
    "comparisonOfficial.calculator.nabda.fit":
      "منتجات الشرق الأوسط وشمال أفريقيا التي تحتاج تكاليف يمكن التنبؤ بها",

    "comparisonOfficial.calculator.official.model":
      "تسعير لكل رسالة حسب الفئة والدولة",
    "comparisonOfficial.calculator.official.fit":
      "المؤسسات الكبيرة التي تحتاج التدفق الرسمي",

    "comparisonOfficial.calculator.note":
      "تختلف أسعار Official API حسب الدولة المرسل إليها وفئة الرسالة.",

    "comparisonOfficial.why.title":
      "لماذا تختار الشركات في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",
    "comparisonOfficial.why.card1.title": "تسعير بسيط",
    "comparisonOfficial.why.card1.desc":
      "الخطط الشهرية والسنوية الثابتة تتجنب الارتفاعات غير المتوقعة في التكلفة.",
    "comparisonOfficial.why.card2.title": "أولوية إقليمية",
    "comparisonOfficial.why.card2.desc":
      "مصمم مع مراعاة واقع التوصيل في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا.",
    "comparisonOfficial.why.card3.title": "إطلاق سريع",
    "comparisonOfficial.why.card3.desc":
      "وثائق واضحة وتدفق API سهل يقللان الوقت اللازم للوصول إلى الإنتاج.",

    "comparisonOfficial.why.cta.title":
      "هل أنت جاهز لتبسيط تكاليف واتساب أوتي بي؟",
    "comparisonOfficial.why.cta.button": "أنشئ حساب نبضة مجاني",
    // Comparison - Nabda OTP vs BulkSMS
    "comparisonBulkSMS.badge": "بديل BulkSMS لمنطقة الشرق الأوسط وشمال أفريقيا",
    "comparisonBulkSMS.title": "نبضة أوتي بي مقابل BulkSMS",
    "comparisonBulkSMS.subtitle":
      "تسعير BulkSMS يكون عادةً لكل رسالة. نبضة يحافظ على التسعير ثابتاً لدعم نمو أوتي بي بشكل يمكن التنبؤ به.",

    "comparisonBulkSMS.hero.cta1": "ابدأ تجربة مجانية لمدة 5 أيام",
    "comparisonBulkSMS.hero.cta2": "عرض وثائق الـ API",

    "comparisonBulkSMS.table.feature": "الميزة",
    "comparisonBulkSMS.table.nabda": "نبضة أوتي بي",
    "comparisonBulkSMS.table.bulksms": "BulkSMS",
    "comparisonBulkSMS.table.winner": "الفائز",

    "comparisonBulkSMS.table.row1.feature": "خيارات التسعير",
    "comparisonBulkSMS.table.row1.nabda":
      "<strong>شهري: 10 دولار (غير محدود)</strong><br /><strong>سنوي: 110 دولار/سنة (12 شهر بـ 11)</strong>",
    "comparisonBulkSMS.table.row1.bulksms": "تسعير لكل رسالة",
    "comparisonBulkSMS.table.row1.winner": "نبضة أوتي بي",

    "comparisonBulkSMS.table.row2.feature": "قابلية التنبؤ",
    "comparisonBulkSMS.table.row2.nabda": "عالية",
    "comparisonBulkSMS.table.row2.bulksms": "متغيرة",
    "comparisonBulkSMS.table.row2.winner": "نبضة أوتي بي",

    "comparisonBulkSMS.table.row3.feature":
      "التركيز على الشرق الأوسط وشمال أفريقيا",
    "comparisonBulkSMS.table.row3.nabda": "قوي",
    "comparisonBulkSMS.table.row3.bulksms": "عالمي عام",
    "comparisonBulkSMS.table.row3.winner": "نبضة أوتي بي",

    "comparisonBulkSMS.calculator.badge": "حاسبة التكلفة المباشرة",
    "comparisonBulkSMS.calculator.title":
      "حرك الشريط وقارن فاتورتك الشهرية فوراً",
    "comparisonBulkSMS.calculator.desc":
      "نبضة أوتي بي ثابت عند 10 دولار شهرياً. التقدير أدناه لـ BulkSMS يستخدم معيار 0.0321 دولار/رسالة.",
    "comparisonBulkSMS.calculator.label": "إجمالي رسائل أوتي بي شهرياً",
    "comparisonBulkSMS.calculator.messages": "رسالة/شهر",

    "comparisonBulkSMS.calculator.table.provider": "المزود",
    "comparisonBulkSMS.calculator.table.monthlyCost": "التكلفة الشهرية",
    "comparisonBulkSMS.calculator.table.costPerMsg": "التكلفة لكل رسالة",
    "comparisonBulkSMS.calculator.table.billingModel": "نموذج الفوترة",
    "comparisonBulkSMS.calculator.table.bestFit": "الأنسب لـ",

    "comparisonBulkSMS.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00 دولار</strong><br />شهري: 10 دولار | سنوي: 110 دولار (شهر مجاني)',
    "comparisonBulkSMS.calculator.nabda.model": "ثابت شهري أو سنوي",
    "comparisonBulkSMS.calculator.nabda.fit":
      "فرق أوتي بي في الشرق الأوسط وشمال أفريقيا",

    "comparisonBulkSMS.calculator.bulksms.model":
      "فوترة الرسائل القصيرة لكل رسالة",
    "comparisonBulkSMS.calculator.bulksms.fit":
      "حالات الاستخدام التي تعتمد على الرسائل القصيرة أولاً",

    "comparisonBulkSMS.calculator.note":
      "تختلف أسعار BulkSMS حسب الوجهة والمسار.",

    "comparisonBulkSMS.why.title":
      "لماذا تختار الشركات في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",
    "comparisonBulkSMS.why.card1.title": "اقتصاديات ثابتة",
    "comparisonBulkSMS.why.card1.desc":
      "لا توجد مفاجآت في الفوترة على مستوى الرسائل عند زيادة الحجم.",
    "comparisonBulkSMS.why.card2.title": "تنفيذ إقليمي",
    "comparisonBulkSMS.why.card2.desc":
      "مصمم خصيصاً للعراق وسوريا والأسواق المجاورة.",
    "comparisonBulkSMS.why.card3.title": "إعداد سريع",
    "comparisonBulkSMS.why.card3.desc": "إعداد API سهل ووثائق واضحة.",

    "comparisonBulkSMS.why.cta.title": "هل أنت جاهز للتبديل؟",
    "comparisonBulkSMS.why.cta.button": "أنشئ حساب نبضة مجاني",
    // Comparison - Nabda OTP vs OTPIQ
    "comparisonOTPIQ.badge": "بديل OTPIQ لمنطقة الشرق الأوسط وشمال أفريقيا",
    "comparisonOTPIQ.title": "نبضة أوتي بي مقابل OTPIQ",
    "comparisonOTPIQ.subtitle":
      "كلاهما يستهدفان تدفقات أوتي بي الإقليمية، لكن نبضة يوفر تسعيراً شهرياً وسنوياً ثابتاً لتسهيل عملية التخطيط المالي.",

    "comparisonOTPIQ.hero.cta1": "ابدأ تجربة مجانية لمدة 5 أيام",
    "comparisonOTPIQ.hero.cta2": "عرض وثائق الـ API",

    "comparisonOTPIQ.table.feature": "الميزة",
    "comparisonOTPIQ.table.nabda": "نبضة أوتي بي",
    "comparisonOTPIQ.table.otpiq": "OTPIQ",
    "comparisonOTPIQ.table.winner": "الفائز",

    "comparisonOTPIQ.table.row1.feature": "خيارات التسعير",
    "comparisonOTPIQ.table.row1.nabda":
      "<strong>شهري: 10 دولار (غير محدود)</strong><br /><strong>سنوي: 110 دولار/سنة (12 شهر بـ 11)</strong>",
    "comparisonOTPIQ.table.row1.otpiq": "تسعير لكل رسالة",
    "comparisonOTPIQ.table.row1.winner": "نبضة أوتي بي",

    "comparisonOTPIQ.table.row2.feature": "قابلية التنبؤ",
    "comparisonOTPIQ.table.row2.nabda": "عالية",
    "comparisonOTPIQ.table.row2.otpiq": "متغيرة",
    "comparisonOTPIQ.table.row2.winner": "نبضة أوتي بي",

    "comparisonOTPIQ.table.row3.feature":
      "التركيز على الشرق الأوسط وشمال أفريقيا",
    "comparisonOTPIQ.table.row3.nabda": "قوي",
    "comparisonOTPIQ.table.row3.otpiq": "تركيز محلي قوي",
    "comparisonOTPIQ.table.row3.winner": "تعادل",

    "comparisonOTPIQ.table.row4.feature": "دعم Webhook",
    "comparisonOTPIQ.table.row4.nabda": "نعم",
    "comparisonOTPIQ.table.row4.otpiq": "نعم",
    "comparisonOTPIQ.table.row4.winner": "تعادل",

    "comparisonOTPIQ.calculator.badge": "حاسبة التكلفة المباشرة",
    "comparisonOTPIQ.calculator.title":
      "حرك الشريط وقارن فاتورتك الشهرية فوراً",
    "comparisonOTPIQ.calculator.desc":
      "نبضة أوتي بي ثابت عند 10 دولار شهرياً. تقدير OTPIQ يستخدم معيار رسائل قصيرة عراقي عام حوالي 80 دينار عراقي (~0.061 دولار/رسالة).",
    "comparisonOTPIQ.calculator.label": "إجمالي رسائل أوتي بي شهرياً",
    "comparisonOTPIQ.calculator.messages": "رسالة/شهر",

    "comparisonOTPIQ.calculator.table.provider": "المزود",
    "comparisonOTPIQ.calculator.table.monthlyCost": "التكلفة الشهرية",
    "comparisonOTPIQ.calculator.table.costPerMsg": "التكلفة لكل رسالة",
    "comparisonOTPIQ.calculator.table.billingModel": "نموذج الفوترة",
    "comparisonOTPIQ.calculator.table.bestFit": "الأنسب لـ",

    "comparisonOTPIQ.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00 دولار</strong><br />شهري: 10 دولار | سنوي: 110 دولار (شهر مجاني)',
    "comparisonOTPIQ.calculator.nabda.model": "ثابت شهري أو سنوي",
    "comparisonOTPIQ.calculator.nabda.fit":
      "فرق أوتي بي في الشرق الأوسط وشمال أفريقيا",

    "comparisonOTPIQ.calculator.otpiq.model": "نموذج توجيه لكل رسالة",
    "comparisonOTPIQ.calculator.otpiq.fit": "التوجيه المحلي متعدد القنوات",

    "comparisonOTPIQ.calculator.note":
      "يجب التأكد من أسعار OTPIQ الخاصة بواتساب مباشرة من عقود OTPIQ.",

    "comparisonOTPIQ.why.title":
      "لماذا تختار الشركات في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",
    "comparisonOTPIQ.why.card1.title": "تسعير ثابت",
    "comparisonOTPIQ.why.card1.desc":
      "تكلفة شهرية وسنوية يمكن التنبؤ بها عند النمو الكبير.",
    "comparisonOTPIQ.why.card2.title": "توافق المنتج الإقليمي",
    "comparisonOTPIQ.why.card2.desc":
      "مصمم خصيصاً لاحتياجات التوصيل والدعم المحلي.",
    "comparisonOTPIQ.why.card3.title": "تجربة المطورين",
    "comparisonOTPIQ.why.card3.desc": "تكامل سريع مع تدفقات API نظيفة.",

    "comparisonOTPIQ.why.cta.title": "هل أنت جاهز لتقليل تكاليف أوتي بي؟",
    "comparisonOTPIQ.why.cta.button": "أنشئ حساب نبضة مجاني",
    // Comparison - نبضة أوتي بي vs Twilio
    "comparisonTwilio.badge": "بديل Twilio لمنطقة الشرق الأوسط وشمال أفريقيا",
    "comparisonTwilio.title": "نبضة أوتي بي مقابل Twilio",
    "comparisonTwilio.subtitle":
      "Twilio قوي في تدفقات المؤسسات العالمية، بينما توفر نبضة أوتي بي تسعيراً ثابتاً يمكن التنبؤ به وتنفيذاً يركز على الشرق الأوسط وشمال أفريقيا للمنتجات ذات الاعتماد الكبير على أوتي بي.",

    "comparisonTwilio.hero.cta1": "ابدأ تجربة مجانية لمدة 5 أيام",
    "comparisonTwilio.hero.cta2": "عرض وثائق الـ API",

    "comparisonTwilio.table.feature": "الميزة",
    "comparisonTwilio.table.nabda": "نبضة أوتي بي",
    "comparisonTwilio.table.twilio": "Twilio",
    "comparisonTwilio.table.winner": "الفائز",

    "comparisonTwilio.table.row1.feature": "خيارات التسعير",
    "comparisonTwilio.table.row1.nabda":
      "<strong>شهري: 10 دولار (غير محدود)</strong><br /><strong>سنوي: 110 دولار/سنة (12 شهر بـ 11)</strong>",
    "comparisonTwilio.table.row1.twilio":
      "قائم على الاستخدام ويعتمد على الدولة",
    "comparisonTwilio.table.row1.winner": "نبضة أوتي بي",

    "comparisonTwilio.table.row2.feature": "قابلية التنبؤ بالفوترة",
    "comparisonTwilio.table.row2.nabda": "عالية وثابتة",
    "comparisonTwilio.table.row2.twilio": "متغيرة عند الحجم الكبير",
    "comparisonTwilio.table.row2.winner": "نبضة أوتي بي",

    "comparisonTwilio.table.row3.feature": "نوع WhatsApp API",
    "comparisonTwilio.table.row3.nabda": "Gateway API",
    "comparisonTwilio.table.row3.twilio": "Official API عبر Twilio",
    "comparisonTwilio.table.row3.winner": "تعادل",

    "comparisonTwilio.table.row4.feature":
      "التركيز على الشرق الأوسط وشمال أفريقيا",
    "comparisonTwilio.table.row4.nabda": "تركيز إقليمي قوي",
    "comparisonTwilio.table.row4.twilio": "منصة عالمية أولاً",
    "comparisonTwilio.table.row4.winner": "نبضة أوتي بي",

    "comparisonTwilio.table.row5.feature": "دعم Webhook",
    "comparisonTwilio.table.row5.nabda": "نعم",
    "comparisonTwilio.table.row5.twilio": "نعم",
    "comparisonTwilio.table.row5.winner": "تعادل",

    "comparisonTwilio.table.row6.feature": "الوسائط والمستندات",
    "comparisonTwilio.table.row6.nabda": "نعم",
    "comparisonTwilio.table.row6.twilio": "نعم",
    "comparisonTwilio.table.row6.winner": "تعادل",

    "comparisonTwilio.table.row7.feature": "سرعة الإعداد",
    "comparisonTwilio.table.row7.nabda": "حوالي دقيقتين",
    "comparisonTwilio.table.row7.twilio": "عادة تدفق إعداد أطول",
    "comparisonTwilio.table.row7.winner": "نبضة أوتي بي",

    "comparisonTwilio.table.row8.feature": "الدعم",
    "comparisonTwilio.table.row8.nabda": "العربية + الإنجليزية",
    "comparisonTwilio.table.row8.twilio": "نموذج دعم عالمي",
    "comparisonTwilio.table.row8.winner": "نبضة أوتي بي",

    "comparisonTwilio.calculator.badge": "حاسبة التكلفة المباشرة",
    "comparisonTwilio.calculator.title":
      "حرك الشريط وقارن فاتورتك الشهرية فوراً",
    "comparisonTwilio.calculator.desc":
      "نبضة أوتي بي ثابتة عند 10 دولار شهرياً. تقدير Twilio يعتمد على نموذج استخدام مختلط حوالي 0.0084 دولار/رسالة (رسوم Twilio + رسوم قوالب ميتا).",
    "comparisonTwilio.calculator.label": "إجمالي رسائل أوتي بي شهرياً",
    "comparisonTwilio.calculator.messages": "رسالة/شهر",

    "comparisonTwilio.calculator.table.provider": "المزود",
    "comparisonTwilio.calculator.table.monthlyCost": "التكلفة الشهرية",
    "comparisonTwilio.calculator.table.costPerMsg": "التكلفة لكل رسالة",
    "comparisonTwilio.calculator.table.billingModel": "نموذج الفوترة",
    "comparisonTwilio.calculator.table.bestFit": "الأنسب لـ",

    "comparisonTwilio.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00 دولار</strong><br />شهري: 10 دولار | سنوي: 110 دولار (شهر مجاني)',
    "comparisonTwilio.calculator.nabda.model": "ثابت شهري أو سنوي",
    "comparisonTwilio.calculator.nabda.fit":
      "الشركات الناشئة والمتوسعة في الشرق الأوسط وشمال أفريقيا",

    "comparisonTwilio.calculator.twilio.model":
      "قائم على الاستخدام (رسوم المنصة + رسوم ميتا)",
    "comparisonTwilio.calculator.twilio.fit": "مكدسات المؤسسات العالمية",

    "comparisonTwilio.calculator.note":
      "تختلف أسعار Twilio وميتا حسب الدولة المرسل إليها وفئة القالب وتحديثات الفوترة.",

    "comparisonTwilio.why.title":
      "لماذا تختار الشركات في الشرق الأوسط وشمال أفريقيا نبضة أوتي بي",
    "comparisonTwilio.why.card1.title": "تكلفة يمكن التنبؤ بها",
    "comparisonTwilio.why.card1.desc":
      "الخطط الشهرية والسنوية الثابتة تجعل عملية التخطيط المالي سهلة مع نمو حركة التحقق.",
    "comparisonTwilio.why.card2.title":
      "منتج يركز على الشرق الأوسط وشمال أفريقيا",
    "comparisonTwilio.why.card2.desc":
      "أولويات التوصيل والدعم مصممة خصيصاً للعراق وسوريا والأسواق المجاورة.",
    "comparisonTwilio.why.card3.title": "إطلاق سريع",
    "comparisonTwilio.why.card3.desc":
      "واجهة برمجة تطبيقات نظيفة ووثائق واضحة تتيح لفرق الهندسة إطلاق تدفقات أوتي بي بسرعة.",

    "comparisonTwilio.why.cta.title":
      "هل أنت جاهز لخفض تكاليف أوتي بي وإطلاق أسرع؟",
    "comparisonTwilio.why.cta.button": "أنشئ حساب نبضة مجاني",
    // Comparison - نبضة أوتي بي vs UltraMsg
    "comparisonUltra.badge": "بديل UltraMsg لمنطقة الشرق الأوسط وشمال أفريقيا",
    "comparisonUltra.title": "نبضة أوتي بي مقابل UltraMsg",
    "comparisonUltra.subtitle":
      "إذا كنت بحاجة إلى توصيل أوتي بي عبر واتساب في العراق وسوريا ومنطقة الشرق الأوسط وشمال أفريقيا الأوسع، فإن نبضة توفر لك خطة ثابتة بسيطة بينما يزداد تسعير UltraMsg حسب عدد الأرقام النشطة التي تحتاجها.",

    "comparisonUltra.hero.cta1": "ابدأ تجربة مجانية لمدة 5 أيام",
    "comparisonUltra.hero.cta2": "عرض وثائق الـ API",

    "comparisonUltra.table.feature": "الميزة",
    "comparisonUltra.table.nabda": "نبضة أوتي بي",
    "comparisonUltra.table.ultramsg": "UltraMsg",
    "comparisonUltra.table.winner": "الفائز",

    "comparisonUltra.table.row1.feature": "خيارات التسعير",
    "comparisonUltra.table.row1.nabda":
      "<strong>شهري: 10 دولار (غير محدود)</strong><br /><strong>سنوي: 110 دولار/سنة (12 شهر بـ 11)</strong>",
    "comparisonUltra.table.row1.ultramsg":
      "<strong>شهري: 39 دولار لكل رقم</strong><br /><strong>سنوي: 390 دولار/سنة</strong>",
    "comparisonUltra.table.row1.winner": "نبضة أوتي بي",

    "comparisonUltra.table.row2.feature": "نوع WhatsApp",
    "comparisonUltra.table.row2.nabda": "Gateway API",
    "comparisonUltra.table.row2.ultramsg": "Gateway API",
    "comparisonUltra.table.row2.winner": "تعادل",

    "comparisonUltra.table.row3.feature": "قابلية التنبؤ بالحجم",
    "comparisonUltra.table.row3.nabda": "تكلفة شهرية مستقرة",
    "comparisonUltra.table.row3.ultramsg": "التكلفة تزداد مع إضافة أرقام",
    "comparisonUltra.table.row3.winner": "نبضة أوتي بي",

    "comparisonUltra.table.row4.feature": "التحسين الإقليمي",
    "comparisonUltra.table.row4.nabda":
      "تركيز على العراق + سوريا + الشرق الأوسط وشمال أفريقيا",
    "comparisonUltra.table.row4.ultramsg": "توجيه عالمي عام",
    "comparisonUltra.table.row4.winner": "نبضة أوتي بي",

    "comparisonUltra.table.row5.feature": "دعم Webhook",
    "comparisonUltra.table.row5.nabda": "نعم",
    "comparisonUltra.table.row5.ultramsg": "نعم",
    "comparisonUltra.table.row5.winner": "تعادل",

    "comparisonUltra.table.row6.feature": "الوسائط والمستندات",
    "comparisonUltra.table.row6.nabda": "نعم",
    "comparisonUltra.table.row6.ultramsg": "نعم",
    "comparisonUltra.table.row6.winner": "تعادل",

    "comparisonUltra.table.row7.feature": "تجربة مجانية",
    "comparisonUltra.table.row7.nabda": "5 أيام",
    "comparisonUltra.table.row7.ultramsg": "خيارات تجربة محدودة",
    "comparisonUltra.table.row7.winner": "نبضة أوتي بي",

    "comparisonUltra.table.row8.feature": "سرعة الإعداد",
    "comparisonUltra.table.row8.nabda": "حوالي دقيقتين",
    "comparisonUltra.table.row8.ultramsg": "تدفق إعداد أطول",
    "comparisonUltra.table.row8.winner": "نبضة أوتي بي",

    "comparisonUltra.why.title":
      "لماذا ينتقل الفرق من UltraMsg إلى نبضة أوتي بي",
    "comparisonUltra.why.card1.title": "تكاليف يمكن التنبؤ بها",
    "comparisonUltra.why.card1.desc":
      "ادفع 10 دولار شهرياً بدون مفاجآت في التكاليف عند زيادة حركة أوتي بي.",
    "comparisonUltra.why.card2.title": "مصمم لتوصيل الشرق الأوسط وشمال أفريقيا",
    "comparisonUltra.why.card2.desc":
      "التوجيه والدعم مبنيان حول العراق وسوريا ومصر والسعودية والأسواق المجاورة.",
    "comparisonUltra.why.card3.title": "إطلاق أسرع",
    "comparisonUltra.why.card3.desc":
      "REST API بسيط + webhooks + وثائق واضحة حتى يتمكن فريقك من الإطلاق بسرعة.",

    "comparisonUltra.why.cta.title":
      "هل أنت جاهز لخفض تكاليف أوتي بي وإطلاق أسرع؟",
    "comparisonUltra.why.cta.button": "أنشئ حساب نبضة مجاني",
    // OTP Solution Page - Arabic
    "otpSolution.hero.title":
      "التحقق بالكود المؤقت (OTP) وتأكيد الهوية عبر واتساب",
    "otpSolution.hero.desc":
      "أرسل كلمات مرور مؤقتة فورية إلى العراق وسوريا وجميع دول الشرق الأوسط وشمال أفريقيا. بدون قوالب. بدون موافقة ميتا. فقط أنشئ مثيلاً وابدأ في التحقق من المستخدمين خلال دقائق.",
    "otpSolution.hero.cta1": "ابدأ مجاناً — بدون بطاقة ائتمان",
    "otpSolution.hero.cta2": "عرض وثائق الـ API",

    "otpSolution.stats.delivery": "معدل التوصيل",
    "otpSolution.stats.time": "متوسط وقت التوصيل",
    "otpSolution.stats.countries": "دول مدعومة",
    "otpSolution.stats.pricing": "رسائل غير محدودة",

    "otpSolution.why.label": "لماذا واتساب؟",
    "otpSolution.why.title":
      "أوتي بي عبر الرسائل القصيرة معطل في العراق وسوريا.<br>واتساب يعمل ببساطة.",
    "otpSolution.why.desc":
      "معدلات توصيل الرسائل القصيرة في العراق وسوريا غير موثوقة على الإطلاق — الرسائل تتأخر أو تحجب من قبل شركات الاتصالات أو لا تصل أبداً. انتشار واتساب في المنطقة يتجاوز 90%، مما يجعله القناة الأكثر موثوقية لتوصيل أوتي بي. مع نبضة أوتي بي، تصل أكواد التحقق خلال ثوانٍ وليس دقائق.",

    "otpSolution.features.instant.title": "توصيل فوري",
    "otpSolution.features.instant.desc":
      "يتم توصيل أكواد أوتي بي عبر واتساب في أقل من 3 ثوانٍ في المتوسط، حتى على اتصالات الموبايل البطيئة.",
    "otpSolution.features.noTemplates.title": "لا حاجة للقوالب",
    "otpSolution.features.noTemplates.desc":
      "أرسل أي رسالة نصية عادية. لا عملية موافقة، لا انتظار، ولا حاجة للتحقق من حساب الأعمال في ميتا.",
    "otpSolution.features.regional.title": "العراق وسوريا أولاً",
    "otpSolution.features.regional.desc":
      "مصمم خصيصاً لأرقام +964 و +963. دعم كامل لصيغة E.164 في جميع دول الشرق الأوسط وشمال أفريقيا.",
    "otpSolution.features.secure.title": "آمن بالتصميم",
    "otpSolution.features.secure.desc":
      "توكنات Bearer خاصة بالمثيل. توليد أوتي بي على جانب السيرفر. كل مثيل له رقم واتساب مخصص.",
    "otpSolution.features.webhooks.title": "Webhook للتوصيل",
    "otpSolution.features.webhooks.desc":
      "إشعارات فورية للأحداث: مرسلة، تم التوصيل، وفشل. تعرف بالضبط متى وصل كود أوتي بي.",
    "otpSolution.features.pricing.title": "تسعير ثابت",
    "otpSolution.features.pricing.desc":
      "رسوم شهرية ثابتة واحدة لكل مثيل. لا تكلفة لكل رسالة. أرسل أوتي بي غير محدود بدون مفاجآت.",

    "otpSolution.how.label": "التكامل",
    "otpSolution.how.title": "ابدأ العمل في 4 خطوات بسيطة",
    "otpSolution.how.step1.title": "أنشئ حساب نبضة أوتي بي",
    "otpSolution.how.step1.desc":
      "سجل في dash.nabdaotp.com. مجاني للبداية، بدون بطاقة ائتمان.",
    "otpSolution.how.step2.title": "أنشئ مثيلاً وامسح رمز QR",
    "otpSolution.how.step2.desc":
      "كل مثيل يعطيك رقم واتساب مخصص. امسح رمز QR مرة واحدة لربط واتساب — انتهى الأمر.",
    "otpSolution.how.step3.title": "احصل على توكن المثيل",
    "otpSolution.how.step3.desc":
      "استدعِ endpoint select-instance للحصول على توكن Bearer خاص بالمثيل. احفظه بأمان على الباك إند.",
    "otpSolution.how.step4.title": "أرسل أوتي بي باستدعاء API واحد",
    "otpSolution.how.step4.desc":
      "POST إلى /api/v1/messages/send مع رقم الهاتف والرسالة. هذا كل شيء.",

    "otpSolution.code.label": "مثال على الكود",
    "otpSolution.code.title": "أرسل أول أوتي بي في أقل من 10 أسطر",
    "otpSolution.code.desc":
      "كل شيء يعمل على جانب السيرفر. أنشئ الأوتي بي، أرسله عبر نبضة، احفظ الهاش — ثم تحقق عند الإرسال.",

    "otpSolution.usecases.label": "حالات الاستخدام",
    "otpSolution.usecases.title": "مصممة لكل سيناريو تحقق",
    "otpSolution.usecases.item1": "📱 التحقق من تسجيل المستخدم والاشتراك",
    "otpSolution.usecases.item2": "🔐 التحقق بخطوتين (2FA)",
    "otpSolution.usecases.item3": "🔑 إعادة تعيين كلمة المرور واستعادة الحساب",
    "otpSolution.usecases.item4": "💳 تفويض الدفع والمعاملات",

    "otpSolution.cta.title": "ابدأ التحقق من المستخدمين عبر واتساب اليوم",
    "otpSolution.cta.desc":
      "أنشئ أول مثيل لنبضة أوتي بي في دقائق. لا عقود، لا رسوم لكل رسالة، ولا حاجة لموافقة ميتا.",
    "otpSolution.cta.button1": "أنشئ مثيل مجاني",
    "otpSolution.cta.button2": "اقرأ الدليل الكامل →",
    // Order Solution Page - Arabic
    "orderSolution.hero.title": "تأكيدات الطلبات وتحديثات التوصيل عبر واتساب",
    "orderSolution.hero.desc":
      "أبقِ عملاءك على اطلاع في كل خطوة — من لحظة تقديم الطلب حتى وصوله إلى باب المنزل. إشعارات واتساب فورية يتم قراءتها فعلياً.",
    "orderSolution.hero.cta1": "ابدأ مجاناً — بدون بطاقة ائتمان",
    "orderSolution.hero.cta2": "عرض وثائق الـ API",

    "orderSolution.stats.openRate": "معدل الفتح على واتساب",
    "orderSolution.stats.support": "انخفاض في مكالمات دعم العملاء",
    "orderSolution.stats.deliveryTime": "وقت توصيل الرسائل",
    "orderSolution.stats.unlimited": "إشعارات غير محدودة",

    "orderSolution.why.label": "لماذا واتساب؟",
    "orderSolution.why.title":
      "عملاؤك يتجاهلون الإيميلات.<br>لا يستطيعون تجاهل واتساب.",
    "orderSolution.why.desc":
      "في العراق وسوريا، معدلات فتح الإيميلات تقل عن 15%. أما رسائل واتساب فتُفتح خلال دقائق — وغالباً خلال ثوانٍ. مع نبضة أوتي بي، يمكنك إرسال تأكيدات الطلبات الفورية، إيصالات الدفع، وتحديثات تتبع التوصيل التي يراها العملاء ويثقون بها فعلاً.",

    "orderSolution.features.confirmation.title": "تأكيد الطلب",
    "orderSolution.features.confirmation.desc":
      "أرسل تأكيداً فورياً في لحظة تقديم الطلب. قلل من الإلغاءات وبنِ الثقة من أول تفاعل.",
    "orderSolution.features.payment.title": "إيصال الدفع",
    "orderSolution.features.payment.desc":
      "أخطر العملاء تلقائياً عند استلام ومعالجة الدفع. ضروري للدفع عند الاستلام والدفع الإلكتروني.",
    "orderSolution.features.shipping.title": "تحديثات الشحن",
    "orderSolution.features.shipping.desc":
      "أخطر عندما يتم تغليف الطلب أو شحنه أو إرساله للتوصيل أو تسليمه. أبقِ العملاء على اطلاع في كل مرحلة.",
    "orderSolution.features.return.title": "تنبيهات الإرجاع والاسترداد",
    "orderSolution.features.return.desc":
      "أبلغ بشكل استباقي بحالة الإرجاع وتأكيدات الاسترداد لتجنب الالتباس وتقليل تذاكر الدعم.",
    "orderSolution.features.api.title": "REST API بسيط",
    "orderSolution.features.api.desc":
      "نقطة نهاية واحدة. طلب POST واحد. يعمل مع أي باك إند — Node.js أو Python أو PHP أو Laravel، أياً كان stack الخاص بك.",
    "orderSolution.features.regional.title": "جاهز للعراق وسوريا",
    "orderSolution.features.regional.desc":
      "دعم كامل لأرقام +964 و +963. يعمل بشكل مثالي مع عمليات التجارة الإلكترونية المحلية في العراق وسوريا.",

    "orderSolution.journey.label": "رحلة العميل",
    "orderSolution.journey.title": "رسالة لكل لحظة مهمة",
    "orderSolution.journey.step1.label": "تم تقديم الطلب",
    "orderSolution.journey.step1.title": "تأكيد فوري",
    "orderSolution.journey.step1.desc":
      '"✅ تم تأكيد طلبك #1042! الإجمالي: 35,000 دينار عراقي. سنُخطرك عند الشحن. – متجرك"',
    "orderSolution.journey.step2.label": "تم استلام الدفع",
    "orderSolution.journey.step2.title": "إيصال الدفع",
    "orderSolution.journey.step2.desc":
      '"💳 تم استلام الدفع للطلب #1042. المبلغ: 35,000 دينار عراقي. شكراً لك! – متجرك"',
    "orderSolution.journey.step3.label": "تم شحن الطلب",
    "orderSolution.journey.step3.title": "إشعار الشحن",
    "orderSolution.journey.step3.desc":
      '"🚚 طلبك #1042 في الطريق! التوصيل المتوقع: غداً بين 10 صباحاً و 2 مساءً. – متجرك"',
    "orderSolution.journey.step4.label": "تم التسليم",
    "orderSolution.journey.step4.title": "تأكيد التسليم",
    "orderSolution.journey.step4.desc":
      '"✅ تم تسليم الطلب #1042! نأمل أن يعجبك. تحتاج أي شيء؟ رد على هذه الرسالة. – متجرك"',

    "orderSolution.code.label": "مثال على الكود",
    "orderSolution.code.title": "أطلق إشعارات الطلبات باستدعاء API واحد",
    "orderSolution.code.desc":
      "اربط مع أحداث نظام إدارة الطلبات الخاص بك وأرسل إشعار واتساب فوري — بدون إعداد معقد.",

    "orderSolution.usecases.label": "من يستخدم هذا",
    "orderSolution.usecases.title":
      "مثالي لكل نوع من البائعين في الشرق الأوسط وشمال أفريقيا",
    "orderSolution.usecases.item1": "🛍️ المتاجر الإلكترونية والأسواق",
    "orderSolution.usecases.item2": "🍕 توصيل الطعام والمطاعم",
    "orderSolution.usecases.item3": "💊 الصيدليات والمنتجات الصحية",
    "orderSolution.usecases.item4": "👗 العلامات التجارية للأزياء والملابس",
    "orderSolution.usecases.item5": "📱 الإلكترونيات ومحلات الموبايل",
    "orderSolution.usecases.item6": "🚗 قطع غيار السيارات والإكسسوارات",
    "orderSolution.usecases.item7": "🏗️ الموردين بالجملة B2B",
    "orderSolution.usecases.item8": "🎁 محلات الهدايا وصناديق الاشتراك",

    "orderSolution.cta.title": "ابدأ إرسال تحديثات الطلبات عبر واتساب اليوم",
    "orderSolution.cta.desc":
      "أنشئ مثيل نبضة أوتي بي في دقائق وربطه بمتجرك. إشعارات غير محدودة، سعر شهري ثابت.",
    "orderSolution.cta.button1": "أنشئ مثيل مجاني",
    "orderSolution.cta.button2": "اقرأ الوثائق →",
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
    // Partner / Referral Section - Turkish
    "partner.title": "Arkadaşlarını Davet Ederek Puan Kazan",
    "partner.subtitle":
      "Referans kodunu geliştiriciler ve işletmelerle paylaş. Abone olduklarında, ücretsiz aylar, krediler veya özel ödüller için kullanabileceğin puanlar kazanırsın.",
    "partner.cta": "Referans Kodunu Al",
    "partner.note": "Hemen kazanmaya başla • Davetlerde sınır yok",

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

    // Pricing TR
    "pricing.title": "Basit ve Şeffaf Fiyatlandırma",
    "pricing.subtitle":
      "Gizli ücret yok. Mesaj başına ücret yok. En iyi WhatsApp API değeri.",
    "pricing.monthly": "Aylık",
    "pricing.annual": "Yıllık",
    "pricing.period": "/ay",
    "pricing.periodYear": "/yıl",

    "pricing.standard.badge": "Standart",
    "pricing.standard.typeLine": "Tür: WhatsApp Gateway",
    "pricing.standard.bestForLine": "En uygun: Geliştiriciler ve KOBİ'ler",
    "pricing.standard.messagesLine": "Mesajlar: Sınırsız",

    "pricing.features.unlimited": "Sınırsız WhatsApp Mesajları",
    "pricing.features.noFee": "Mesaj başına ücret yok",
    "pricing.features.trial": "5 Gün Ücretsiz Deneme",
    "pricing.features.api": "RESTful API Erişimi",
    "pricing.features.webhookReceive": "Webhook ile mesaj alma",
    "pricing.features.media": "Medya ve belge gönderimi",
    "pricing.features.webhook": "Webhook desteği",
    "pricing.features.support": "Öncelikli Destek",
    "pricing.features.cancel": "İstediğiniz zaman iptal",

    "pricing.cta.trial": "Ücretsiz Denemenizi Başlatın",
    "pricing.note.trial": "Kredi kartı gerekmez • 2 dakikada kurulum",

    "pricing.annual.save": "11 ay fiyatına 12 ay",
    "pricing.annual.bestFor": "Uzun vadeli tasarruf için ideal",
    "pricing.annual.messages": "Mesajlar: Sınırsız WhatsApp (Yıllık)",
    "pricing.cta.yearly": "Yıllık Planı Seç",
    "pricing.note.yearly": "%8.33 tasarruf • Yıllık faturalandırılır",

    "pricing.enterprise.contact": "Bize Ulaşın",
    "pricing.enterprise.enter": "Kurumsal",
    "pricing.enterprise.type": "Tür: WhatsApp Resmi API",
    "pricing.enterprise.bestFor": "En uygun: Kurumsal ve uyumluluk",
    "pricing.enterprise.messages": "Mesajlar: Konuşma başına ödeme",
    "pricing.enterprise.meta": "Resmi Meta Onaylı API",
    "pricing.enterprise.limits": "Daha yüksek mesaj limitleri",
    "pricing.enterprise.verification": "İşletme doğrulama desteği",
    "pricing.enterprise.onboarding": "Özel kurulum desteği",
    "pricing.enterprise.sla": "SLA Garantisi",

    "pricing.cta.contact": "Bize Ulaşın",
    "pricing.note.enterprise": "Her şeyi sizin için kuracağız",

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
    // ====================== BLOGS PAGE ======================
    "blogs.title": "Blogumuz",
    "blogs.subtitle":
      "WhatsApp API ve OTP çözümleri hakkında içgörüler, rehberler ve en son güncellemeler",

    "blogs.post1.title":
      "WhatsApp API ile OTP Nasıl Gönderilir – Tam Kılavuz 2026",
    "blogs.post1.desc":
      "Nabda OTP'yi güvenli kullanıcı doğrulaması için entegre etmek üzere adım adım tam rehber.",

    "blogs.post2.title":
      "WhatsApp OTP Neden Orta Doğu'da SMS'in Yerini Alıyor – 2026 Trendleri ve Gerçekler",
    "blogs.post2.desc":
      "Mısır, Suudi Arabistan ve ötesindeki işletmeler için trendler, istatistikler ve fırsatlar.",

    "blogs.comingSoon.title": "Daha Fazla Değerli Rehber ve Makale Geliyor",
    "blogs.comingSoon.desc":
      "WhatsApp API en iyi uygulamaları, gelişmiş entegrasyonlar ve MENA işletmelerinden başarı hikayeleri hakkında yeni derinlemesine makaleler üzerinde çalışıyoruz.",
    "blogs.comingSoon.stayTuned": "Takipte Kalın ..",
    "blogs.readMore": "Devamını Oku →",

    // Comparison Page
    "comparison.title": "Nabda OTP Rakip Karşılaştırması",
    "comparison.subtitle":
      "Akıllı MENA işletmelerinin neden Nabda OTP'yi tercih ettiğini görün",

    "comparison.card1.title": "Nabda OTP VS UltraMsg",
    "comparison.card1.description":
      "MENA işletmeleri için en iyi değer ve güvenilirlik",

    "comparison.card2.title": "Nabda OTP VS Twilio",
    "comparison.card2.description":
      "Maliyet ve teslimat performansı karşılaştırması",

    "comparison.card3.title": "Nabda OTP VS Official WhatsApp API",
    "comparison.card3.description": "Fiyat vs özellikler vs karmaşıklık",

    "comparison.card4.title": "Nabda OTP VS BulkSMS",
    "comparison.card4.description":
      "WhatsApp API vs Geleneksel SMS Gateway – MENA'da maliyet, teslimat ve güvenilirlik",

    "comparison.card5.title": "Nabda OTP VS OTPIQ",
    "comparison.card5.description":
      "Yerel OTP sağlayıcı karşılaştırması – Fiyatlandırma, teslimat hızı ve özellikler",

    "comparison.card6.title": "En İyi Nabda OTP Alternatifleri",
    "comparison.card6.description":
      "2026'da tüm büyük WhatsApp API sağlayıcıları için kapsamlı rehber",

    "comparison.detailed_comparison": "Detaylı Karşılaştırma →",
    "comparison.view_all": "Tüm Alternatifleri Görüntüle →",

    // Solutions Page
    "solutions.title": "Çözümler",
    "solutions.subtitle":
      "Irak, Suriye ve MENA'daki iş ihtiyaçlarınıza özel güçlü WhatsApp çözümleri",

    "solutions.card1.title": "OTP ve Kullanıcı Doğrulaması",
    "solutions.card1.description":
      "Kayıt, giriş ve iki faktörlü kimlik doğrulama için WhatsApp üzerinden güvenli ve anında tek kullanımlık şifreler gönderin.",

    "solutions.card2.title": "Sipariş Onayları ve Teslimat",
    "solutions.card2.description":
      "E-ticaret işletmeleri için gerçek zamanlı sipariş durumu güncellemeleri, teslimat bildirimleri ve ödeme onayları.",

    "solutions.coming_soon.title": "Daha Fazla Çözüm Yakında Geliyor",
    "solutions.coming_soon.description":
      "Irak, Suriye ve MENA bölgesindeki işletmeler için özel olarak tasarlanmış ek güçlü WhatsApp çözümleri üzerinde çalışıyoruz.",
    "solutions.coming_soon.text": "Takipte Kalın ...",

    "solutions.learn_more": "Daha Fazla Bilgi →",
    // Footer - Comparisons
    "footer.comparisons.title": "Karşılaştırmalar",
    "footer.comparisons.nabda_vs_ultramsg": "Nabda vs UltraMsg",
    "footer.comparisons.nabda_vs_twilio": "Nabda vs Twilio",
    "footer.comparisons.nabda_vs_bulksms": "Nabda vs BulkSMS",
    "footer.comparisons.nabda_vs_official": "Nabda vs Official API",
    "footer.comparisons.nabda_vs_otpiq": "Nabda vs OTPIQ",
    "footer.comparisons.nabda_alternatives": "Nabda alternatifleri→",
    // Blog Post - How to Send OTP via WhatsApp API
    "blogPost.title": "WhatsApp API ile OTP Gönderme - Tam Kılavuz 2026",
    "blogPost.excerpt":
      "Geliştiriciler için pratik ve üretime hazır rehber: <strong>Nabda OTP</strong> kullanarak – Irak (+964) ve Suriye (+963) ile diğer ülkelerde en hızlı WhatsApp OTP çözümü.",

    "blogPost.section1.title":
      "Neden Nabda OTP Irak ve Suriye için en iyi seçimdir",
    "blogPost.section1.desc":
      "Nabda OTP size resmi Business API şablonları veya Meta onay gecikmeleriyle uğraşmadan doğrudan WhatsApp erişimi sağlar. Sadece bir instance oluşturun ve anında OTP göndermeye başlayın.",

    "blogPost.section2.title": "Başlamak için ihtiyacınız olanlar",
    "blogPost.section2.item1": "Bir Nabda OTP hesabı",
    "blogPost.section2.item2":
      "Bir veya daha fazla aktif instance (her instance = özel WhatsApp numarası)",
    "blogPost.section2.item3": "Instance kapsamlı token (Bearer token)",
    "blogPost.section2.item4": "Sunucu tarafında OTP üretme mantığı",

    "blogPost.section3.title": "Adım adım: Nabda OTP API ile OTP gönderme",
    "blogPost.section3.step1": "1. Instance Oluşturma ve Seçme",
    "blogPost.section3.step1.desc":
      "Dashboard'dan instance oluşturduktan sonra, instance token'ını almak için onu seçmelisiniz:",
    "blogPost.section3.step2": "2. Backend'de OTP üretme",
    "blogPost.section3.step3":
      "3. WhatsApp üzerinden OTP gönderme (Doğru Endpoint)",
    "blogPost.section3.step4": "4. OTP'yi sunucunuzda doğrulama",
    "blogPost.section3.step4.desc":
      "OTP'yi her zaman backend'de doğrulayın (asla client tarafına güvenmeyin).",

    "blogPost.section4.title":
      "İsteğe bağlı: Teslimat Durumu için Webhook Yapılandırma",

    "blogPost.section5.title": "Irak ve Suriye için En İyi Uygulamalar",
    "blogPost.section5.item1":
      "E.164 formatını kullanın: +96477xxxxxxxx veya +9639xxxxxxxx",
    "blogPost.section5.item2":
      "OTP geçerlilik süresini 3-8 dakika arasında tutun",
    "blogPost.section5.item3":
      "Mümkün olduğunda iki dilli mesaj gönderin (Arapça + İngilizce)",
    "blogPost.section5.item4": "Mesaja her zaman marka adınızı ekleyin",
    "blogPost.section5.item5":
      "Webhook olaylarını izleyin: sent, delivered ve hatalar",

    "blogPost.section6.title": "Sorun Giderme",
    "blogPost.section6.item1":
      "<strong>401 Unauthorized</strong> → Instance'ı seçtiğinizden ve instance token'ını kullandığınızdan emin olun",
    "blogPost.section6.item2":
      "<strong>Geçersiz telefon</strong> → +964 veya +963 ile başlamalı veya desteklenen diğer ülke kodlarından biri olmalıdır.",
    "blogPost.section6.item3":
      "<strong>Mesaj alınmadı</strong> → Instance'ın bağlı olduğundan emin olun (QR kod tarandı)",

    "blogPost.section7.title": "Başlamaya hazır mısınız?",
    "blogPost.section7.desc":
      "İlk instance'ınızı saniyeler içinde oluşturun ve bugün WhatsApp üzerinden OTP göndermeye başlayın.",

    "blogPost.cta.title": "Nabda OTP ile Başlayın",
    "blogPost.cta.button": "Ücretsiz Instance Oluştur",
    "blogPost.back": "← Tüm Makalelere Geri Dön",
    // Blog Post 2 - Why WhatsApp OTP is Replacing SMS
    "blogPost2.title":
      "Neden WhatsApp OTP Orta Doğu'da SMS'in Yerini Alıyor – 2026 Trendleri ve Gerçekler",
    "blogPost2.excerpt":
      "Irak, Suriye, Mısır, Suudi Arabistan ve ötesindeki ürün ekipleri neden SMS'ten WhatsApp OTP'ye geçiyor — ve Nabda OTP bu geçişi nasıl basit ve güvenilir kılıyor.",

    "blogPost2.section1.title":
      "Değişim çoğu kişinin beklediğinden daha hızlı gerçekleşiyor",
    "blogPost2.section1.desc1":
      "2026'da WhatsApp, Orta Doğu genelinde ana mesajlaşma uygulaması haline geldi. Kullanıcılar WhatsApp'ı günde onlarca kez kontrol ederken, SMS açılma oranları operatör filtrelemesi ve spam algısı nedeniyle düşmeye devam ediyor.",
    "blogPost2.section1.desc2":
      "Giriş, şifre sıfırlama ve işlem doğrulama gibi kimlik doğrulama durumlarında WhatsApp OTP çok daha iyi teslimat oranları ve kullanıcı deneyimi sunar.",

    "blogPost2.section2.title":
      "WhatsApp OTP'nin Geleneksel SMS'e Göre Başlıca Avantajları",
    "blogPost2.section2.item1":
      "<strong>Daha Yüksek Teslimat Oranı</strong> – Irak, Suriye ve Mısır'da sıklıkla %95'i aşar",
    "blogPost2.section2.item2":
      "<strong>Daha Düşük Maliyet</strong> – Özellikle büyük ölçekte uluslararası SMS rotalarına kıyasla",
    "blogPost2.section2.item3":
      "<strong>Daha İyi Kullanıcı Deneyimi</strong> – Mesajlar tanıdık sohbet arayüzünde görünür",
    "blogPost2.section2.item4":
      "<strong>Zengin Durum Takibi</strong> – Mesajın ne zaman gönderildiğini, teslim edildiğini veya okunduğunu bilin",
    "blogPost2.section2.item5":
      "<strong>Marka Güveni</strong> – Mesajlar doğrulanmış bir iş numarasından gelir",

    "blogPost2.section3.title": "MENA Pazarlarında Gerçek Dünya Performansı",
    "blogPost2.section3.intro":
      "Nabda OTP kullanan şirketler şunları rapor ediyor:",
    "blogPost2.section3.item1":
      "Kimlik doğrulama ile ilgili destek taleplerinde %40'a varan azalma",
    "blogPost2.section3.item2":
      "Yüksek hacimli akışları taşıdıktan sonra SMS maliyetlerinde önemli düşüş",
    "blogPost2.section3.item3":
      "Daha hızlı doğrulama süreleri (kullanıcılar ortalama 5 saniyenin altında OTP alır)",

    "blogPost2.section4.title":
      "Nabda OTP WhatsApp OTP'yi Nasıl Kolaylaştırıyor",
    "blogPost2.section4.desc":
      "Şablon onayı ve karmaşık kurulum gerektiren resmi WhatsApp Business API'nin aksine, Nabda OTP basit ve UltraMsg tarzı bir yaklaşım izler:",
    "blogPost2.section4.item1":
      "Bir instance oluşturun → Özel WhatsApp numarası edinin",
    "blogPost2.section4.item2": "Instance'ı seçerek kapsamlı token'ınızı alın",
    "blogPost2.section4.item3":
      "Düz metin OTP'leri doğrudan <code>/api/v1/messages/send</code> ile gönderin",
    "blogPost2.section4.item4": "Teslimat durumu için isteğe bağlı webhook",

    "blogPost2.section5.title": "2026'da geçişi kimler yapıyor?",
    "blogPost2.section5.desc":
      "Irak, Suriye, Mısır, Ürdün ve Suudi Arabistan'daki fintech startup'ları, e-ticaret platformları, teslimat uygulamaları ve kurumsal SaaS ürünleri, WhatsApp'ı ana OTP kanalı haline getiriyor; SMS ise yalnızca yedek olarak kalıyor.",

    "blogPost2.section6.title": "Özet",
    "blogPost2.section6.desc":
      "WhatsApp OTP sadece bir trend değil — Orta Doğu'da kimlik doğrulamanın yeni standardı haline geliyor. Nabda OTP gibi güvenilir bir sağlayıcı ile erken hareket eden ekipler, maliyet, kullanıcı deneyimi ve teslimat güvenilirliğinde net bir avantaj elde eder.",

    "blogPost2.cta.title": "SMS'i WhatsApp OTP ile değiştirmeye hazır mısınız?",
    "blogPost2.cta.button": "Nabda OTP ile Ücretsiz Başlayın",
    "blogPost.back": "← Tüm Makalelere Geri Dön",
    // Comparison Modern Page - Nabda OTP vs Top Alternatives
    "comparisonModern.badge": "Tam Pazar İncelemesi",
    "comparisonModern.title": "Nabda OTP En İyi Alternatiflere Karşı",
    "comparisonModern.subtitle":
      "Irak, Suriye ve MENA'daki OTP ürünleri için fiyatlandırma modelleri, onboarding hızı ve özellik uyumunun yüksek seviyeli karşılaştırması.",

    "comparisonModern.table.provider": "Sağlayıcı",
    "comparisonModern.table.pricingModel": "Fiyatlandırma Modeli",
    "comparisonModern.table.entryPrice": "Giriş Fiyatı (Tipik)",
    "comparisonModern.table.costPredictability":
      "Maliyet Tahmin Edilebilirliği",
    "comparisonModern.table.menaFocus": "MENA Odaklı",
    "comparisonModern.table.bestFor": "En Uygun Olduğu Alan",

    "comparisonModern.table.nabda.pricing": "Sabit Aylık + Yıllık",
    "comparisonModern.table.nabda.price":
      "<strong>10$/ay</strong> veya <strong>110$/yıl</strong>",
    "comparisonModern.table.nabda.cost": "Yüksek",
    "comparisonModern.table.nabda.mena": "Güçlü",
    "comparisonModern.table.nabda.bestFor": "MENA OTP ürünleri",

    "comparisonModern.table.ultramsg.pricing": "Numara başına/ay",
    "comparisonModern.table.ultramsg.price": "~39$/ay her numara için",
    "comparisonModern.table.ultramsg.cost": "Orta",
    "comparisonModern.table.ultramsg.mena": "Genel global",
    "comparisonModern.table.ultramsg.bestFor":
      "Birden fazla numara yöneten ekipler",

    "comparisonModern.table.twilio.pricing": "Mesaj başına + platform markup",
    "comparisonModern.table.twilio.price": "~0.005$ + Meta ücreti/mesaj",
    "comparisonModern.table.twilio.cost": "Yüksek hacimde düşük-orta",
    "comparisonModern.table.twilio.mena": "Global öncelikli",
    "comparisonModern.table.twilio.bestFor": "Kurumsal çok kanallı yapılar",

    "comparisonModern.table.bulksms.pricing": "SMS mesajı başına",
    "comparisonModern.table.bulksms.price": "~0.0321$/mesaj benchmark",
    "comparisonModern.table.bulksms.cost": "Düşük-Orta",
    "comparisonModern.table.bulksms.mena": "Genel global",
    "comparisonModern.table.bulksms.bestFor": "SMS öncelikli teslimat",

    "comparisonModern.table.official.pricing": "Şablon mesajı başına",
    "comparisonModern.table.official.price": "Ülke/kategori bazlı",
    "comparisonModern.table.official.cost": "Orta",
    "comparisonModern.table.official.mena": "Global model",
    "comparisonModern.table.official.bestFor":
      "Büyük uyumluluk ağırlıklı organizasyonlar",

    "comparisonModern.table.otpiq.pricing": "Mesaj yönlendirme başına",
    "comparisonModern.table.otpiq.price": "Genel SMS benchmark ~80 IQD/msg",
    "comparisonModern.table.otpiq.cost": "Orta",
    "comparisonModern.table.otpiq.mena": "Yerel Irak odaklı",
    "comparisonModern.table.otpiq.bestFor": "Yerel çok kanallı yönlendirme",

    "comparisonModern.note":
      "Gösterilen veriler kamu benchmark fiyatlandırma modellerine dayanır ve ülke, rota, kategori ve sözleşme koşullarına göre değişebilir.",

    "comparisonModern.why.title":
      "MENA'daki İşletmeler Neden Nabda OTP'yi Tercih Ediyor",
    "comparisonModern.why.card1.title": "En İyi Maliyet Tahmin Edilebilirliği",
    "comparisonModern.why.card1.desc":
      "Sabit aylık ve yıllık planlar uzun vadeli planlamayı kolaylaştırır.",
    "comparisonModern.why.card2.title": "Bölgesel Ürün Uyumu",
    "comparisonModern.why.card2.desc":
      "Irak, Suriye ve MENA iş gerçeklerine göre tasarlandı.",
    "comparisonModern.why.card3.title": "Daha Hızlı Başlangıç",
    "comparisonModern.why.card3.desc":
      "Temiz API, pratik dokümantasyon ve hızlı onboarding.",

    "comparisonModern.cta.title": "En tahmin edilebilir OTP ortağını seçin",
    "comparisonModern.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // Comparison Official WhatsApp API - Turkish
    "comparisonOfficial.badge": "Resmi API Alternatifi",
    "comparisonOfficial.title": "Nabda OTP vs Resmi WhatsApp API",
    "comparisonOfficial.subtitle":
      "Resmi API fiyatlandırması genellikle mesaj başına ve ülkeye bağlıdır. Nabda, sabit aylık ve yıllık planlarla OTP ekonomisini basit tutar.",

    "comparisonOfficial.hero.cta1": "5 Günlük Ücretsiz Denemeye Başla",
    "comparisonOfficial.hero.cta2": "API Dokümanlarını İncele",

    "comparisonOfficial.table.feature": "Özellik",
    "comparisonOfficial.table.nabda": "Nabda OTP",
    "comparisonOfficial.table.official": "Resmi API",
    "comparisonOfficial.table.winner": "Kazanan",

    "comparisonOfficial.table.row1.feature": "Fiyatlandırma Seçenekleri",
    "comparisonOfficial.table.row1.nabda":
      "<strong>Aylık: 10$ (Sınırsız)</strong><br /><strong>Yıllık: 110$/yıl (12'ye 11)</strong>",
    "comparisonOfficial.table.row1.official":
      "Mesaj başına fiyatlandırma modeli",
    "comparisonOfficial.table.row1.winner": "Nabda OTP",

    "comparisonOfficial.table.row2.feature":
      "Faturalandırma Tahmin Edilebilirliği",
    "comparisonOfficial.table.row2.nabda": "Yüksek ve sabit",
    "comparisonOfficial.table.row2.official": "Hacme ve ülkeye göre değişken",
    "comparisonOfficial.table.row2.winner": "Nabda OTP",

    "comparisonOfficial.table.row3.feature": "Uyumluluk",
    "comparisonOfficial.table.row3.nabda":
      "KOBİ'ler ve ölçeklenen şirketler için güçlü",
    "comparisonOfficial.table.row3.official": "En yüksek resmi seviye",
    "comparisonOfficial.table.row3.winner": "Resmi API",

    "comparisonOfficial.table.row4.feature": "MENA Odaklı",
    "comparisonOfficial.table.row4.nabda": "Güçlü bölgesel odak",
    "comparisonOfficial.table.row4.official": "Global model",
    "comparisonOfficial.table.row4.winner": "Nabda OTP",

    "comparisonOfficial.table.row5.feature": "Webhook Desteği",
    "comparisonOfficial.table.row5.nabda": "Evet",
    "comparisonOfficial.table.row5.official": "Evet",
    "comparisonOfficial.table.row5.winner": "Berabere",

    "comparisonOfficial.table.row6.feature": "Onboarding Hızı",
    "comparisonOfficial.table.row6.nabda": "Yaklaşık 2 dakika",
    "comparisonOfficial.table.row6.official":
      "Genellikle daha uzun doğrulama süreci",
    "comparisonOfficial.table.row6.winner": "Nabda OTP",

    "comparisonOfficial.calculator.badge": "Canlı Maliyet Hesaplayıcı",
    "comparisonOfficial.calculator.title":
      "Kaydırıcıyı hareket ettirin ve aylık faturanızı anında karşılaştırın",
    "comparisonOfficial.calculator.desc":
      "Nabda OTP aylık 10$'da sabit kalır. Aşağıdaki Resmi API tahmini, gerçekçi bir kimlik doğrulama bazında yaklaşık 0.0030$/mesaj kullanır.",
    "comparisonOfficial.calculator.label": "Aylık toplam OTP mesajı",
    "comparisonOfficial.calculator.messages": "mesaj/ay",

    "comparisonOfficial.calculator.table.provider": "Sağlayıcı",
    "comparisonOfficial.calculator.table.monthlyCost": "Aylık Maliyet",
    "comparisonOfficial.calculator.table.costPerMsg": "Mesaj Başına Maliyet",
    "comparisonOfficial.calculator.table.billingModel": "Faturalandırma Modeli",
    "comparisonOfficial.calculator.table.bestFit": "En Uygun Olduğu Alan",

    "comparisonOfficial.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00$</strong><br />Aylık: 10$ | Yıllık: 110$ (1 ay ücretsiz)',
    "comparisonOfficial.calculator.nabda.model": "Sabit aylık veya yıllık",
    "comparisonOfficial.calculator.nabda.fit":
      "Tahmin edilebilir maliyet ihtiyacı olan MENA ürünleri",

    "comparisonOfficial.calculator.official.model":
      "Mesaj başına kategori/ülke fiyatlandırması",
    "comparisonOfficial.calculator.official.fit":
      "Resmi akış gerektiren büyük işletmeler",

    "comparisonOfficial.calculator.note":
      "Resmi API ücretleri hedef ülke ve mesaj kategorisine göre değişir.",

    "comparisonOfficial.why.title":
      "MENA'daki İşletmeler Neden Nabda OTP'yi Tercih Ediyor",
    "comparisonOfficial.why.card1.title": "Basit Fiyatlandırma",
    "comparisonOfficial.why.card1.desc":
      "Sabit aylık ve yıllık planlar öngörülemeyen maliyet artışlarını önler.",
    "comparisonOfficial.why.card2.title": "Bölgesel Öncelik",
    "comparisonOfficial.why.card2.desc":
      "Irak, Suriye ve MENA teslimat gerçekleri göz önünde bulundurularak geliştirildi.",
    "comparisonOfficial.why.card3.title": "Hızlı Başlangıç",
    "comparisonOfficial.why.card3.desc":
      "Net dokümantasyon ve kolay API akışı üretime geçiş süresini azaltır.",

    "comparisonOfficial.why.cta.title":
      "WhatsApp OTP maliyetlerini basitleştirmeye hazır mısınız?",
    "comparisonOfficial.why.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // Comparison - Nabda OTP vs BulkSMS
    "comparisonBulkSMS.badge": "MENA için BulkSMS Alternatifi",
    "comparisonBulkSMS.title": "Nabda OTP vs BulkSMS",
    "comparisonBulkSMS.subtitle":
      "BulkSMS fiyatlandırması genellikle mesaj başına olur. Nabda, öngörülebilir OTP büyümesi için fiyatlandırmayı sabit tutar.",

    "comparisonBulkSMS.hero.cta1": "5 Günlük Ücretsiz Denemeye Başla",
    "comparisonBulkSMS.hero.cta2": "API Dokümanlarını İncele",

    "comparisonBulkSMS.table.feature": "Özellik",
    "comparisonBulkSMS.table.nabda": "Nabda OTP",
    "comparisonBulkSMS.table.bulksms": "BulkSMS",
    "comparisonBulkSMS.table.winner": "Kazanan",

    "comparisonBulkSMS.table.row1.feature": "Fiyatlandırma Seçenekleri",
    "comparisonBulkSMS.table.row1.nabda":
      "<strong>Aylık: 10$ (Sınırsız)</strong><br /><strong>Yıllık: 110$/yıl (12'ye 11)</strong>",
    "comparisonBulkSMS.table.row1.bulksms": "Mesaj başına fiyatlandırma",
    "comparisonBulkSMS.table.row1.winner": "Nabda OTP",

    "comparisonBulkSMS.table.row2.feature": "Tahmin Edilebilirlik",
    "comparisonBulkSMS.table.row2.nabda": "Yüksek",
    "comparisonBulkSMS.table.row2.bulksms": "Değişken",
    "comparisonBulkSMS.table.row2.winner": "Nabda OTP",

    "comparisonBulkSMS.table.row3.feature": "MENA Odaklı",
    "comparisonBulkSMS.table.row3.nabda": "Güçlü",
    "comparisonBulkSMS.table.row3.bulksms": "Genel global",
    "comparisonBulkSMS.table.row3.winner": "Nabda OTP",

    "comparisonBulkSMS.calculator.badge": "Canlı Maliyet Hesaplayıcı",
    "comparisonBulkSMS.calculator.title":
      "Kaydırıcıyı hareket ettirin ve aylık faturanızı anında karşılaştırın",
    "comparisonBulkSMS.calculator.desc":
      "Nabda OTP aylık 10$'da sabit kalır. Aşağıdaki BulkSMS tahmini 0.0321$/mesaj benchmark'ını kullanır.",
    "comparisonBulkSMS.calculator.label": "Aylık toplam OTP mesajı",
    "comparisonBulkSMS.calculator.messages": "mesaj/ay",

    "comparisonBulkSMS.calculator.table.provider": "Sağlayıcı",
    "comparisonBulkSMS.calculator.table.monthlyCost": "Aylık Maliyet",
    "comparisonBulkSMS.calculator.table.costPerMsg": "Mesaj Başına Maliyet",
    "comparisonBulkSMS.calculator.table.billingModel": "Faturalandırma Modeli",
    "comparisonBulkSMS.calculator.table.bestFit": "En Uygun Olduğu Alan",

    "comparisonBulkSMS.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00$</strong><br />Aylık: 10$ | Yıllık: 110$ (1 ay ücretsiz)',
    "comparisonBulkSMS.calculator.nabda.model": "Sabit aylık veya yıllık",
    "comparisonBulkSMS.calculator.nabda.fit": "MENA OTP ekipleri",

    "comparisonBulkSMS.calculator.bulksms.model":
      "Mesaj başına SMS faturalandırması",
    "comparisonBulkSMS.calculator.bulksms.fit":
      "SMS öncelikli kullanım durumları",

    "comparisonBulkSMS.calculator.note":
      "BulkSMS ücretleri hedef ülke ve rotaya göre değişir.",

    "comparisonBulkSMS.why.title":
      "MENA'daki İşletmeler Neden Nabda OTP'yi Tercih Ediyor",
    "comparisonBulkSMS.why.card1.title": "Sabit Ekonomi",
    "comparisonBulkSMS.why.card1.desc":
      "Trafik arttıkça mesaj bazlı fatura sürprizleri yaşanmaz.",
    "comparisonBulkSMS.why.card2.title": "Bölgesel Uygulama",
    "comparisonBulkSMS.why.card2.desc":
      "Irak, Suriye ve yakın pazarlar için geliştirildi.",
    "comparisonBulkSMS.why.card3.title": "Hızlı Kurulum",
    "comparisonBulkSMS.why.card3.desc":
      "Kolay API onboarding ve net dokümantasyon.",

    "comparisonBulkSMS.why.cta.title": "Geçiş yapmaya hazır mısınız?",
    "comparisonBulkSMS.why.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // Comparison - Nabda OTP vs OTPIQ
    "comparisonOTPIQ.badge": "MENA için OTPIQ Alternatifi",
    "comparisonOTPIQ.title": "Nabda OTP vs OTPIQ",
    "comparisonOTPIQ.subtitle":
      "Her ikisi de bölgesel OTP iş akışlarını hedefler, ancak Nabda daha kolay bütçeleme için sabit aylık ve yıllık fiyatlandırma sunar.",

    "comparisonOTPIQ.hero.cta1": "5 Günlük Ücretsiz Denemeye Başla",
    "comparisonOTPIQ.hero.cta2": "API Dokümanlarını İncele",

    "comparisonOTPIQ.table.feature": "Özellik",
    "comparisonOTPIQ.table.nabda": "Nabda OTP",
    "comparisonOTPIQ.table.otpiq": "OTPIQ",
    "comparisonOTPIQ.table.winner": "Kazanan",

    "comparisonOTPIQ.table.row1.feature": "Fiyatlandırma Seçenekleri",
    "comparisonOTPIQ.table.row1.nabda":
      "<strong>Aylık: 10$ (Sınırsız)</strong><br /><strong>Yıllık: 110$/yıl (12'ye 11)</strong>",
    "comparisonOTPIQ.table.row1.otpiq": "Mesaj başına fiyatlandırma",
    "comparisonOTPIQ.table.row1.winner": "Nabda OTP",

    "comparisonOTPIQ.table.row2.feature": "Tahmin Edilebilirlik",
    "comparisonOTPIQ.table.row2.nabda": "Yüksek",
    "comparisonOTPIQ.table.row2.otpiq": "Değişken",
    "comparisonOTPIQ.table.row2.winner": "Nabda OTP",

    "comparisonOTPIQ.table.row3.feature": "MENA Odaklı",
    "comparisonOTPIQ.table.row3.nabda": "Güçlü",
    "comparisonOTPIQ.table.row3.otpiq": "Güçlü yerel odak",
    "comparisonOTPIQ.table.row3.winner": "Berabere",

    "comparisonOTPIQ.table.row4.feature": "Webhook Desteği",
    "comparisonOTPIQ.table.row4.nabda": "Evet",
    "comparisonOTPIQ.table.row4.otpiq": "Evet",
    "comparisonOTPIQ.table.row4.winner": "Berabere",

    "comparisonOTPIQ.calculator.badge": "Canlı Maliyet Hesaplayıcı",
    "comparisonOTPIQ.calculator.title":
      "Kaydırıcıyı hareket ettirin ve aylık faturanızı anında karşılaştırın",
    "comparisonOTPIQ.calculator.desc":
      "Nabda OTP aylık 10$'da sabit kalır. OTPIQ tahmini, Irak SMS benchmark'ını (~0.061$/mesaj) kullanır.",
    "comparisonOTPIQ.calculator.label": "Aylık toplam OTP mesajı",
    "comparisonOTPIQ.calculator.messages": "mesaj/ay",

    "comparisonOTPIQ.calculator.table.provider": "Sağlayıcı",
    "comparisonOTPIQ.calculator.table.monthlyCost": "Aylık Maliyet",
    "comparisonOTPIQ.calculator.table.costPerMsg": "Mesaj Başına Maliyet",
    "comparisonOTPIQ.calculator.table.billingModel": "Faturalandırma Modeli",
    "comparisonOTPIQ.calculator.table.bestFit": "En Uygun Olduğu Alan",

    "comparisonOTPIQ.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00$</strong><br />Aylık: 10$ | Yıllık: 110$ (1 ay ücretsiz)',
    "comparisonOTPIQ.calculator.nabda.model": "Sabit aylık veya yıllık",
    "comparisonOTPIQ.calculator.nabda.fit": "MENA OTP ekipleri",

    "comparisonOTPIQ.calculator.otpiq.model": "Mesaj başına yönlendirme modeli",
    "comparisonOTPIQ.calculator.otpiq.fit": "Yerel çok kanallı yönlendirme",

    "comparisonOTPIQ.calculator.note":
      "OTPIQ'un WhatsApp'a özel ücretleri doğrudan OTPIQ sözleşmelerinden teyit edilmelidir.",

    "comparisonOTPIQ.why.title":
      "MENA'daki İşletmeler Neden Nabda OTP'yi Tercih Ediyor",
    "comparisonOTPIQ.why.card1.title": "Sabit Fiyatlandırma",
    "comparisonOTPIQ.why.card1.desc":
      "Büyük ölçekte öngörülebilir aylık ve yıllık maliyet.",
    "comparisonOTPIQ.why.card2.title": "Bölgesel Ürün Uyumu",
    "comparisonOTPIQ.why.card2.desc":
      "Yerel teslimat ve destek ihtiyaçları için özel olarak tasarlandı.",
    "comparisonOTPIQ.why.card3.title": "Geliştirici Deneyimi",
    "comparisonOTPIQ.why.card3.desc":
      "Temiz API akışlarıyla hızlı entegrasyon.",

    "comparisonOTPIQ.why.cta.title":
      "OTP maliyetlerini azaltmaya hazır mısınız?",
    "comparisonOTPIQ.why.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // Comparison - Nabda OTP vs Twilio
    "comparisonTwilio.badge": "MENA için Twilio Alternatifi",
    "comparisonTwilio.title": "Nabda OTP vs Twilio",
    "comparisonTwilio.subtitle":
      "Twilio küresel kurumsal iş akışlarında güçlüdür, Nabda OTP ise OTP ağırlıklı ürünler için öngörülebilir sabit fiyatlandırma ve MENA öncelikli yürütme sunar.",

    "comparisonTwilio.hero.cta1": "5 Günlük Ücretsiz Denemeye Başla",
    "comparisonTwilio.hero.cta2": "API Dokümanlarını İncele",

    "comparisonTwilio.table.feature": "Özellik",
    "comparisonTwilio.table.nabda": "Nabda OTP",
    "comparisonTwilio.table.twilio": "Twilio",
    "comparisonTwilio.table.winner": "Kazanan",

    "comparisonTwilio.table.row1.feature": "Fiyatlandırma Seçenekleri",
    "comparisonTwilio.table.row1.nabda":
      "<strong>Aylık: 10$ (Sınırsız)</strong><br /><strong>Yıllık: 110$/yıl (12'ye 11)</strong>",
    "comparisonTwilio.table.row1.twilio": "Kullanıma dayalı, ülkeye bağlı",
    "comparisonTwilio.table.row1.winner": "Nabda OTP",

    "comparisonTwilio.table.row2.feature":
      "Faturalandırma Tahmin Edilebilirliği",
    "comparisonTwilio.table.row2.nabda": "Yüksek ve sabit",
    "comparisonTwilio.table.row2.twilio": "Yüksek hacimde değişken",
    "comparisonTwilio.table.row2.winner": "Nabda OTP",

    "comparisonTwilio.table.row3.feature": "WhatsApp API Türü",
    "comparisonTwilio.table.row3.nabda": "Gateway API",
    "comparisonTwilio.table.row3.twilio": "Twilio aracılığıyla Official API",
    "comparisonTwilio.table.row3.winner": "Berabere",

    "comparisonTwilio.table.row4.feature": "MENA Odaklı",
    "comparisonTwilio.table.row4.nabda": "Güçlü bölgesel odak",
    "comparisonTwilio.table.row4.twilio": "Global öncelikli platform",
    "comparisonTwilio.table.row4.winner": "Nabda OTP",

    "comparisonTwilio.table.row5.feature": "Webhook Desteği",
    "comparisonTwilio.table.row5.nabda": "Evet",
    "comparisonTwilio.table.row5.twilio": "Evet",
    "comparisonTwilio.table.row5.winner": "Berabere",

    "comparisonTwilio.table.row6.feature": "Medya ve Belgeler",
    "comparisonTwilio.table.row6.nabda": "Evet",
    "comparisonTwilio.table.row6.twilio": "Evet",
    "comparisonTwilio.table.row6.winner": "Berabere",

    "comparisonTwilio.table.row7.feature": "Onboarding Hızı",
    "comparisonTwilio.table.row7.nabda": "Yaklaşık 2 dakika",
    "comparisonTwilio.table.row7.twilio": "Genellikle daha uzun kurulum akışı",
    "comparisonTwilio.table.row7.winner": "Nabda OTP",

    "comparisonTwilio.table.row8.feature": "Destek",
    "comparisonTwilio.table.row8.nabda": "Arapça + İngilizce",
    "comparisonTwilio.table.row8.twilio": "Global destek modeli",
    "comparisonTwilio.table.row8.winner": "Nabda OTP",

    "comparisonTwilio.calculator.badge": "Canlı Maliyet Hesaplayıcı",
    "comparisonTwilio.calculator.title":
      "Kaydırıcıyı hareket ettirin ve aylık faturanızı anında karşılaştırın",
    "comparisonTwilio.calculator.desc":
      "Nabda OTP aylık 10$'da sabit kalır. Twilio tahmini, karışık kullanım modeliyle yaklaşık 0.0084$/mesaj (Twilio ücreti + Meta şablon ücreti) baz alınarak hesaplanmıştır.",
    "comparisonTwilio.calculator.label": "Aylık toplam OTP mesajı",
    "comparisonTwilio.calculator.messages": "mesaj/ay",

    "comparisonTwilio.calculator.table.provider": "Sağlayıcı",
    "comparisonTwilio.calculator.table.monthlyCost": "Aylık Maliyet",
    "comparisonTwilio.calculator.table.costPerMsg": "Mesaj Başına Maliyet",
    "comparisonTwilio.calculator.table.billingModel": "Faturalandırma Modeli",
    "comparisonTwilio.calculator.table.bestFit": "En Uygun Olduğu Alan",

    "comparisonTwilio.calculator.nabda.cost":
      '<strong id="nabdaCost">10.00$</strong><br />Aylık: 10$ | Yıllık: 110$ (1 ay ücretsiz)',
    "comparisonTwilio.calculator.nabda.model": "Sabit aylık veya yıllık",
    "comparisonTwilio.calculator.nabda.fit":
      "MENA startup'ları ve ölçeklenen şirketler",

    "comparisonTwilio.calculator.twilio.model":
      "Kullanıma dayalı (platform + Meta ücretleri)",
    "comparisonTwilio.calculator.twilio.fit": "Küresel kurumsal yapılar",

    "comparisonTwilio.calculator.note":
      "Twilio ve Meta fiyatlandırması hedef ülke, şablon kategorisi ve faturalandırma güncellemelerine göre değişir.",

    "comparisonTwilio.why.title":
      "MENA'daki İşletmeler Neden Nabda OTP'yi Tercih Ediyor",
    "comparisonTwilio.why.card1.title": "Tahmin Edilebilir Maliyet",
    "comparisonTwilio.why.card1.desc":
      "Sabit aylık ve yıllık planlar, doğrulama trafiği arttıkça bütçelemeyi kolaylaştırır.",
    "comparisonTwilio.why.card2.title": "MENA Öncelikli Ürün",
    "comparisonTwilio.why.card2.desc":
      "Teslimat ve destek öncelikleri Irak, Suriye ve yakın pazarlar için tasarlanmıştır.",
    "comparisonTwilio.why.card3.title": "Hızlı Devreye Alma",
    "comparisonTwilio.why.card3.desc":
      "Temiz API ve net dokümantasyon, mühendislik ekiplerinin OTP iş akışlarını hızlıca başlatmasını sağlar.",

    "comparisonTwilio.why.cta.title":
      "OTP maliyetlerini düşürmeye ve daha hızlı başlatmaya hazır mısınız?",
    "comparisonTwilio.why.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // Comparison - Nabda OTP vs UltraMsg
    "comparisonUltra.badge": "MENA için UltraMsg Alternatifi",
    "comparisonUltra.title": "Nabda OTP vs UltraMsg",
    "comparisonUltra.subtitle":
      "Irak, Suriye ve geniş MENA bölgesinde WhatsApp OTP teslimatı ihtiyacınız varsa, Nabda size basit sabit plan sunarken UltraMsg fiyatlandırması aktif numara sayısına göre ölçeklenir.",

    "comparisonUltra.hero.cta1": "5 Günlük Ücretsiz Denemeye Başla",
    "comparisonUltra.hero.cta2": "API Dokümanlarını İncele",

    "comparisonUltra.table.feature": "Özellik",
    "comparisonUltra.table.nabda": "Nabda OTP",
    "comparisonUltra.table.ultramsg": "UltraMsg",
    "comparisonUltra.table.winner": "Kazanan",

    "comparisonUltra.table.row1.feature": "Fiyatlandırma Seçenekleri",
    "comparisonUltra.table.row1.nabda":
      "<strong>Aylık: 10$ (Sınırsız)</strong><br /><strong>Yıllık: 110$/yıl (12'ye 11)</strong>",
    "comparisonUltra.table.row1.ultramsg":
      "<strong>Aylık: 39$ her numara için</strong><br /><strong>Yıllık: 390$/yıl</strong>",
    "comparisonUltra.table.row1.winner": "Nabda OTP",

    "comparisonUltra.table.row2.feature": "WhatsApp Türü",
    "comparisonUltra.table.row2.nabda": "Gateway API",
    "comparisonUltra.table.row2.ultramsg": "Gateway API",
    "comparisonUltra.table.row2.winner": "Berabere",

    "comparisonUltra.table.row3.feature": "Hacim Tahmin Edilebilirliği",
    "comparisonUltra.table.row3.nabda": "Sabit aylık maliyet",
    "comparisonUltra.table.row3.ultramsg": "Maliyet eklenen numaralarla artar",
    "comparisonUltra.table.row3.winner": "Nabda OTP",

    "comparisonUltra.table.row4.feature": "Bölgesel Optimizasyon",
    "comparisonUltra.table.row4.nabda": "Irak + Suriye + MENA odaklı",
    "comparisonUltra.table.row4.ultramsg": "Genel global yönlendirme",
    "comparisonUltra.table.row4.winner": "Nabda OTP",

    "comparisonUltra.table.row5.feature": "Webhook Desteği",
    "comparisonUltra.table.row5.nabda": "Evet",
    "comparisonUltra.table.row5.ultramsg": "Evet",
    "comparisonUltra.table.row5.winner": "Berabere",

    "comparisonUltra.table.row6.feature": "Medya/Belgeler",
    "comparisonUltra.table.row6.nabda": "Evet",
    "comparisonUltra.table.row6.ultramsg": "Evet",
    "comparisonUltra.table.row6.winner": "Berabere",

    "comparisonUltra.table.row7.feature": "Ücretsiz Deneme",
    "comparisonUltra.table.row7.nabda": "5 gün",
    "comparisonUltra.table.row7.ultramsg": "Sınırlı deneme seçenekleri",
    "comparisonUltra.table.row7.winner": "Nabda OTP",

    "comparisonUltra.table.row8.feature": "Onboarding Hızı",
    "comparisonUltra.table.row8.nabda": "Yaklaşık 2 dakika",
    "comparisonUltra.table.row8.ultramsg": "Daha uzun kurulum akışı",
    "comparisonUltra.table.row8.winner": "Nabda OTP",

    "comparisonUltra.why.title":
      "Ekipler neden UltraMsg'ten Nabda OTP'ye geçiyor",
    "comparisonUltra.why.card1.title": "Tahmin Edilebilir Maliyetler",
    "comparisonUltra.why.card1.desc":
      "OTP trafiğiniz arttıkça sürpriz ölçekleme ücretleri olmadan aylık 10$ ödeyin.",
    "comparisonUltra.why.card2.title": "MENA Teslimatı için Tasarlandı",
    "comparisonUltra.why.card2.desc":
      "Yönlendirme ve destek Irak, Suriye, Mısır, Suudi Arabistan ve yakın pazarlar için tasarlanmıştır.",
    "comparisonUltra.why.card3.title": "Daha Hızlı Başlatma",
    "comparisonUltra.why.card3.desc":
      "Basit REST API + webhook'lar + net dokümantasyon sayesinde ekibiniz hızlıca yayına geçebilir.",

    "comparisonUltra.why.cta.title":
      "OTP maliyetlerini düşürmeye ve daha hızlı başlatmaya hazır mısınız?",
    "comparisonUltra.why.cta.button": "Ücretsiz Nabda Hesabı Oluştur",
    // OTP Solution Page - Turkish
    "otpSolution.hero.title": "OTP ve Kullanıcı Doğrulaması WhatsApp Üzerinden",
    "otpSolution.hero.desc":
      "Irak, Suriye ve tüm MENA ülkelerine anında tek kullanımlık şifre gönderin. Şablon yok. Meta onayı yok. Sadece bir instance oluşturun ve dakikalar içinde kullanıcı doğrulamaya başlayın.",
    "otpSolution.hero.cta1": "Ücretsiz Başla — Kredi Kartı Gerekmez",
    "otpSolution.hero.cta2": "API Dokümanlarını İncele",

    "otpSolution.stats.delivery": "Teslimat Oranı",
    "otpSolution.stats.time": "Ortalama Teslimat Süresi",
    "otpSolution.stats.countries": "Desteklenen Ülkeler",
    "otpSolution.stats.pricing": "Sınırsız Mesaj",

    "otpSolution.why.label": "Neden WhatsApp?",
    "otpSolution.why.title":
      "Irak ve Suriye'de SMS OTP çalışmıyor.<br>WhatsApp sorunsuz çalışıyor.",
    "otpSolution.why.desc":
      "Irak ve Suriye'de SMS teslimat oranları oldukça güvenilmezdir — mesajlar gecikir, operatörler tarafından engellenir veya hiç ulaşmaz. Bölgede WhatsApp kullanımı %90'ın üzerindedir, bu da OTP teslimatı için en güvenilir kanal yapar. Nabda OTP ile doğrulama kodlarınız saniyeler içinde ulaşır, dakikalar içinde değil.",

    "otpSolution.features.instant.title": "Anında Teslimat",
    "otpSolution.features.instant.desc":
      "OTPs WhatsApp üzerinden ortalama 3 saniyenin altında teslim edilir, yavaş mobil bağlantılarda bile.",
    "otpSolution.features.noTemplates.title": "Şablon Gerekmez",
    "otpSolution.features.noTemplates.desc":
      "Herhangi bir düz metin mesajı gönderin. Onay süreci yok, bekleme yok, Meta iş doğrulaması gerekmez.",
    "otpSolution.features.regional.title": "Irak ve Suriye Öncelikli",
    "otpSolution.features.regional.desc":
      "+964 ve +963 numaraları için özel tasarlandı. Tüm MENA ülkelerinde E.164 formatı tam desteklenir.",
    "otpSolution.features.secure.title": "Tasarımından Güvenli",
    "otpSolution.features.secure.desc":
      "Instance kapsamlı Bearer token'ları. OTP'leri sunucu tarafında üretin. Her instance'ın kendine ait bir numarası vardır.",
    "otpSolution.features.webhooks.title": "Teslimat Webhook'ları",
    "otpSolution.features.webhooks.desc":
      "Gönderildi, teslim edildi ve başarısız olayları için gerçek zamanlı geri bildirim. OTP'nizin ne zaman ulaştığını tam olarak bilin.",
    "otpSolution.features.pricing.title": "Sabit Fiyatlandırma",
    "otpSolution.features.pricing.desc":
      "Her instance için tek sabit aylık ücret. Mesaj başına maliyet yok. Sınırsız OTP gönderin, sürpriz olmadan.",

    "otpSolution.how.label": "Entegrasyon",
    "otpSolution.how.title": "4 basit adımda yayına alın",
    "otpSolution.how.step1.title": "Nabda OTP Hesabı Oluşturun",
    "otpSolution.how.step1.desc":
      "dash.nabdaotp.com'a kaydolun. Başlamak ücretsizdir, kredi kartı gerekmez.",
    "otpSolution.how.step2.title": "Instance Oluşturun ve QR Kodunu Tarayın",
    "otpSolution.how.step2.desc":
      "Her instance size özel bir WhatsApp numarası verir. QR kodunu bir kez tarayın ve WhatsApp'ınızı bağlayın — tamamdır.",
    "otpSolution.how.step3.title": "Instance Token'ınızı Alın",
    "otpSolution.how.step3.desc":
      "select-instance endpoint'ini çağırarak instance'ınıza özel Bearer token alın. Bunu backend'inizde güvenli bir şekilde saklayın.",
    "otpSolution.how.step4.title": "Tek API Çağrısıyla OTP Gönderin",
    "otpSolution.how.step4.desc":
      "Telefon numarası ve mesajınızla /api/v1/messages/send adresine POST yapın. Hepsi bu kadar.",

    "otpSolution.code.label": "Kod Örneği",
    "otpSolution.code.title": "İlk OTP'nizi 10 satırın altında gönderin",
    "otpSolution.code.desc":
      "Her şey sunucu tarafında çalışır. OTP'yi üretin, Nabda üzerinden gönderin, hash'ini saklayın — gönderimde doğrulayın.",

    "otpSolution.usecases.label": "Kullanım Alanları",
    "otpSolution.usecases.title": "Her doğrulama senaryosu için tasarlandı",
    "otpSolution.usecases.item1": "📱 Kullanıcı kaydı ve kayıt doğrulama",
    "otpSolution.usecases.item2": "🔐 İki faktörlü kimlik doğrulama (2FA)",
    "otpSolution.usecases.item3": "🔑 Şifre sıfırlama ve hesap kurtarma",
    "otpSolution.usecases.item4": "💳 Ödeme ve işlem onayı",

    "otpSolution.cta.title":
      "Bugün WhatsApp üzerinden kullanıcı doğrulamaya başlayın",
    "otpSolution.cta.desc":
      "İlk Nabda OTP instance'ınızı dakikalar içinde oluşturun. Sözleşme yok, mesaj başına ücret yok, Meta onayı gerekmez.",
    "otpSolution.cta.button1": "Ücretsiz Instance Oluştur",
    "otpSolution.cta.button2": "Tam Rehberi Oku →",
    // Order Solution Page - Turkish
    "orderSolution.hero.title":
      "Sipariş Onayları ve Teslimat Güncellemeleri WhatsApp Üzerinden",
    "orderSolution.hero.desc":
      "Müşterilerinizi her adımda bilgilendirin — sipariş verildiğinden kapıya teslimata kadar. Gerçek zamanlı WhatsApp bildirimleri gerçekten okunur.",
    "orderSolution.hero.cta1": "Ücretsiz Başla — Kredi Kartı Gerekmez",
    "orderSolution.hero.cta2": "API Dokümanlarını İncele",

    "orderSolution.stats.openRate": "WhatsApp'ta Açılma Oranı",
    "orderSolution.stats.support": "Müşteri Destek Aramalarında Azalma",
    "orderSolution.stats.deliveryTime": "Mesaj Teslimat Süresi",
    "orderSolution.stats.unlimited": "Sınırsız Bildirim",

    "orderSolution.why.label": "Neden WhatsApp?",
    "orderSolution.why.title":
      "Müşterileriniz e-postaları görmezden geliyor.<br>WhatsApp'ı görmezden gelemezler.",
    "orderSolution.why.desc":
      "Irak ve Suriye'de e-posta açılma oranları %15'in altında kalıyor. Buna karşılık WhatsApp mesajları dakikalar içinde — çoğu zaman saniyeler içinde — açılıyor. Nabda OTP ile anında sipariş onayları, ödeme makbuzları ve teslimat takip güncellemeleri gönderebilirsiniz; müşteriler bunları gerçekten görür ve güvenir.",

    "orderSolution.features.confirmation.title": "Sipariş Onayı",
    "orderSolution.features.confirmation.desc":
      "Sipariş verildiği anda anında onay gönderin. İptalleri azaltın ve ilk etkileşimden itibaren müşteri güveni oluşturun.",
    "orderSolution.features.payment.title": "Ödeme Makbuzu",
    "orderSolution.features.payment.desc":
      "Ödeme alındığında ve işlendiğinde müşterileri otomatik olarak bilgilendirin. Kapıda ödeme ve online ödeme akışları için vazgeçilmez.",
    "orderSolution.features.shipping.title": "Kargo Güncellemeleri",
    "orderSolution.features.shipping.desc":
      "Sipariş paketlendiğinde, gönderildiğinde, teslimata çıktığında ve teslim edildiğinde bildirim gönderin. Müşterileri her aşamada bilgilendirin.",
    "orderSolution.features.return.title": "İade ve İade Bildirimleri",
    "orderSolution.features.return.desc":
      "İade durumunu ve iade onaylarını proaktif olarak iletin; karışıklığı önleyin ve destek taleplerini azaltın.",
    "orderSolution.features.api.title": "Basit REST API",
    "orderSolution.features.api.desc":
      "Tek endpoint. Tek POST isteği. Her türlü backend ile çalışır — Node.js, Python, PHP, Laravel, stack'iniz ne olursa olsun.",
    "orderSolution.features.regional.title": "Irak ve Suriye Hazır",
    "orderSolution.features.regional.desc":
      "+964 ve +963 numaraları için tam destek. Yerel Irak ve Suriye e-ticaret operasyonlarıyla mükemmel çalışır.",

    "orderSolution.journey.label": "Müşteri Yolculuğu",
    "orderSolution.journey.title": "Önemli her an için bir mesaj",
    "orderSolution.journey.step1.label": "Sipariş Verildi",
    "orderSolution.journey.step1.title": "Anında Onay",
    "orderSolution.journey.step1.desc":
      '"✅ Siparişiniz #1042 onaylandı! Toplam: 35.000 IQD. Kargoya verdiğimizde sizi bilgilendireceğiz. – Mağazanız"',
    "orderSolution.journey.step2.label": "Ödeme Alındı",
    "orderSolution.journey.step2.title": "Ödeme Makbuzu",
    "orderSolution.journey.step2.desc":
      '"💳 #1042 numaralı sipariş için ödeme alındı. Tutar: 35.000 IQD. Teşekkürler! – Mağazanız"',
    "orderSolution.journey.step3.label": "Sipariş Kargoya Verildi",
    "orderSolution.journey.step3.title": "Kargo Bildirimi",
    "orderSolution.journey.step3.desc":
      '"🚚 Siparişiniz #1042 yolda! Tahmini teslimat: yarın 10:00-14:00 arası. – Mağazanız"',
    "orderSolution.journey.step4.label": "Teslim Edildi",
    "orderSolution.journey.step4.title": "Teslimat Onayı",
    "orderSolution.journey.step4.desc":
      '"✅ Sipariş #1042 teslim edildi! Umarız beğenirsiniz. Bir şeye ihtiyacınız olursa bu mesaja cevap verin. – Mağazanız"',

    "orderSolution.code.label": "Kod Örneği",
    "orderSolution.code.title":
      "Tek API çağrısıyla sipariş bildirimlerini tetikleyin",
    "orderSolution.code.desc":
      "Sipariş yönetim sisteminizin olaylarına bağlanın ve anında WhatsApp bildirimi gönderin — karmaşık kurulum gerekmez.",

    "orderSolution.usecases.label": "Bunu Kimler Kullanıyor",
    "orderSolution.usecases.title": "MENA'daki her tür satıcı için mükemmel",
    "orderSolution.usecases.item1": "🛍️ Online mağazalar ve pazar yerleri",
    "orderSolution.usecases.item2": "🍕 Yemek teslimatı ve restoranlar",
    "orderSolution.usecases.item3": "💊 Eczaneler ve sağlık ürünleri",
    "orderSolution.usecases.item4": "👗 Moda ve giyim markaları",
    "orderSolution.usecases.item5": "📱 Elektronik ve cep telefonu mağazaları",
    "orderSolution.usecases.item6": "🚗 Oto yedek parça ve aksesuarlar",
    "orderSolution.usecases.item7": "🏗️ B2B toptan tedarikçiler",
    "orderSolution.usecases.item8": "🎁 Hediye dükkanları ve abonelik kutuları",

    "orderSolution.cta.title":
      "Sipariş güncellemelerini WhatsApp üzerinden bugün göndermeye başlayın",
    "orderSolution.cta.desc":
      "Nabda OTP instance'ınızı dakikalar içinde oluşturun ve mağazanıza bağlayın. Sınırsız bildirim, sabit aylık fiyat.",
    "orderSolution.cta.button1": "Ücretsiz Instance Oluştur",
    "orderSolution.cta.button2": "Dokümanları Oku →",
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
    const pricingModel =
      slider.getAttribute("data-pricing-model") || "per-number";
    const competitorFixed =
      parseFloat(slider.getAttribute("data-competitor-fixed")) || 0;
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
function switchPricing(type) {
  const monthlyCard = document.getElementById("monthlyCard");
  const annualCard = document.getElementById("annualCard");
  const toggleMonthly = document.getElementById("toggleMonthly");
  const toggleAnnual = document.getElementById("toggleAnnual");

  if (type === "monthly") {
    monthlyCard.style.display = "block";
    annualCard.style.display = "none";
    toggleMonthly.classList.add("active");
    toggleAnnual.classList.remove("active");
  } else {
    monthlyCard.style.display = "none";
    annualCard.style.display = "block";
    toggleMonthly.classList.remove("active");
    toggleAnnual.classList.add("active");
  }
}
// Initialize
document.addEventListener("DOMContentLoaded", initDynamicPricing);
