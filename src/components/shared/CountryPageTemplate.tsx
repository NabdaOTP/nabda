import CTA from '@/components/home/CTA';
import Partner from '@/components/home/Partner';
import Payment from '@/components/home/Payment';
import Pricing from '@/components/home/Pricing';
import Stats from '@/components/home/Stats';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { CountryData } from '@/lib/country-data';
import trMessages from '@/messages/tr.json';
import { ArrowRight, Rocket } from 'lucide-react';
import Features from '../home/Features';


interface Props {
  country:  CountryData;
  locale:   'en' | 'ar' | 'tr';
  phoneExample: string; // e.g. "+96477XXXXXXXX"
}

export default function CountryPageTemplate({ country, locale, phoneExample }: Props) {
  const isAR  = locale === 'ar';
  const isTR  = locale === 'tr';
  const data  = isAR ? country.ar : country;
  const dir   = isAR ? 'rtl' : 'ltr';

  const interp = (s: string) =>
    s.replace(/\{countryName\}/g, country.countryName).replace(/\{dialCode\}/g, country.dialCode);

  const cp = trMessages.countryPage;
  const trData = isTR ? {
    heroBadge:        trMessages.hero.badge,
    heroH1:           interp(cp.heroH1),
    heroSubtitle:     trMessages.hero.subtitle,
    heroPriceNote:    trMessages.hero.price,
    ctaPrimaryText:   trMessages.hero.cta.primary,
    ctaSecondaryText: trMessages.hero.cta.secondary,
    metaTitle:        data.metaTitle,
    metaDescription:  data.metaDescription,
    seoIntro:         data.seoIntro,
    trustPoints:      data.trustPoints,
    faq: [
      { question: interp(cp.faq.q1), answer: interp(cp.faq.a1) },
      { question: interp(cp.faq.q2), answer: interp(cp.faq.a2) },
      { question: interp(cp.faq.q3), answer: interp(cp.faq.a3) },
      { question: interp(cp.faq.q4), answer: interp(cp.faq.a4) },
      { question: interp(cp.faq.q5), answer: interp(cp.faq.a5) },
      { question: interp(cp.faq.q6), answer: interp(cp.faq.a6) },
    ],
  } : null;

  const displayData = trData ?? data;

  const BASE_URL    = 'https://www.nabdaotp.com';
  const enUrl       = `${BASE_URL}/${country.slug}/`;
  const arUrl       = `${BASE_URL}/ar/${country.slug}/`;
  const trUrl       = `${BASE_URL}/tr/${country.slug}/`;
  const canonicalUrl = isAR ? arUrl : isTR ? trUrl : enUrl;

  // JSON-LD — FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayData.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  // JSON-LD — WebPage
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: displayData.metaTitle,
    description: displayData.metaDescription,
    url: canonicalUrl,
    inLanguage: isAR ? 'ar' : isTR ? 'tr' : 'en',
    isPartOf: { '@type': 'WebSite', url: BASE_URL, name: 'Nabda OTP' },
  };

  // JSON-LD — BreadcrumbList
  const homeUrl   = isAR ? `${BASE_URL}/ar/` : isTR ? `${BASE_URL}/tr/` : `${BASE_URL}/`;
  const homeName  = isAR ? 'الرئيسية' : isTR ? 'Ana Sayfa' : 'Home';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName,            item: homeUrl      },
      { '@type': 'ListItem', position: 2, name: country.countryName, item: canonicalUrl },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:bg-none dark:bg-[#0a2540]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-150 w-150 rounded-full bg-[#635bff]/10 blur-[120px] dark:bg-[#635bff]/25" />
          <div className="absolute -bottom-20 -left-20 h-100 w-100 rounded-full bg-[#a89fff]/15 blur-[100px]" />
        </div>

        <div className="relative max-w-300 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" dir={dir}>
            {/* Text */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center self-start gap-2 rounded-full px-4 py-1.5 text-sm font-medium border border-[#635bff]/30 bg-[#635bff]/8 text-[#635bff] dark:border-[#635bff]/40 dark:bg-[#635bff]/10 dark:text-[#a89fff]">
                <Rocket/> {displayData.heroBadge}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0a2540] dark:text-white">
                {displayData.heroH1}
              </h1>

              <p className="text-lg leading-relaxed max-w-lg text-[#425466] dark:text-[#8899a6]">
                {displayData.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.nabda-otp.com/en/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full text-white bg-[#635bff] hover:bg-[#7a73ff] shadow-[0_4px_20px_rgba(99,91,255,0.4)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {displayData.ctaPrimaryText}
                </a>
                <a
                  href="https://connect.nabda-otp.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full border border-[#635bff]/30 text-[#635bff] hover:bg-[#635bff]/8 dark:border-white/20 dark:text-white/80 dark:hover:border-white/40 transition-all duration-200"
                >
                  {displayData.ctaSecondaryText}
                  <ArrowRight size={18} />
                </a>
              </div>

              <p
                className="text-sm text-[#425466] dark:text-[#8899a6]"
                dangerouslySetInnerHTML={{ __html: displayData.heroPriceNote }}
              />
            </div>

            {/* Code Terminal */}
            <div className="rounded-2xl overflow-hidden border shadow-2xl border-[#e2e8f0] bg-[#f8fafc] dark:border-white/10 dark:bg-[#0d1b2e]">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-[#f1f5f9] border-[#e2e8f0] dark:bg-[#0a1628] dark:border-white/8">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ms-3 text-xs font-mono text-[#94a3b8] dark:text-[#4a6278]">Nabda-api.js</span>
              </div>
              <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
                <pre className="text-[#64748b] dark:text-[#8899a6]">
{`// OTP for ${country.countryName}
const response = await Nabda.send({
  phone: "${phoneExample}",
  message: "Your code: 847291",
  type: "otp"
});
// ✓ Delivered instantly`}
                </pre>
              </div>
              <div className="flex items-center gap-2 px-6 pb-5">
                <span className="flex h-2 w-2 rounded-full bg-[#00d4aa] shadow-[0_0_6px_rgba(0,212,170,0.8)]" />
                <span className="text-xs font-medium text-[#00d4aa]">Message delivered · 0.3s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Shared sections */}
      <Stats />
      <Partner />
      <Features/>
      <Pricing />
      {/* FAQ (country-specific) */}
      <section className="py-20 bg-gray-50/80 dark:bg-[#060f1e]">
        <div className="max-w-215 mx-auto px-6" dir={dir}>
          <h2 className="text-4xl font-extrabold text-center mb-14 text-[#0a2540] dark:text-white">
            {isAR ? 'الأسئلة الشائعة' : isTR ? cp.faqTitle : 'Frequently Asked Questions'}
          </h2>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {displayData.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border px-6 bg-white border-gray-100 hover:border-[#635bff]/30 data-[state=open]:border-[#635bff]/50 dark:bg-white/4 dark:border-white/8 transition-all duration-200"
              >
                <AccordionTrigger className="py-5 text-start text-base font-semibold hover:no-underline text-[#0a2540] dark:text-white [&>svg]:text-[#635bff] [&>svg]:shrink-0">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.9375rem] leading-7 text-[#425466] dark:text-[#8899a6]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTA />
      <Payment />

    </>
  );
}