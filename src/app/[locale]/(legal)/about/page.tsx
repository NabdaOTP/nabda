import { Link } from '@/i18n/navigation';
import { Check, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

const BASE_URL = 'https://www.nabdaotp.com';

type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'About Nabda OTP — WhatsApp API Platform for MENA',
    ar: 'من نحن — نبضة OTP | منصة واتساب API لمنطقة الشرق الأوسط',
    tr: 'Hakkımızda — Nabda OTP | MENA için WhatsApp API Platformu',
  };
  const descriptions = {
    en: 'Nabda OTP is a cloud-based WhatsApp API and OTP verification platform built for developers and businesses in Iraq, Syria, Egypt, and the MENA region. Flat $10/month, no per-message fees.',
    ar: 'نبضة OTP منصة واتساب API مبنية للمطورين والشركات في العراق وسوريا ومصر ومنطقة الشرق الأوسط. اشتراك ثابت 10 دولار شهرياً بدون رسوم لكل رسالة.',
    tr: 'Nabda OTP, Irak, Suriye, Mısır ve MENA bölgesindeki geliştiriciler ve işletmeler için bulut tabanlı WhatsApp API platformudur. Sabit $10/ay, mesaj başına ücret yok.',
  };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc  = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const canonicalPath = locale === 'en' ? `${BASE_URL}/about` : `${BASE_URL}/${locale}/about`;

  return {
    title,
    description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en:          `${BASE_URL}/about`,
        ar:          `${BASE_URL}/ar/about`,
        tr:          `${BASE_URL}/tr/about`,
        'x-default': `${BASE_URL}/about`,
      },
    },
    openGraph: {
      title, description: desc,
      url: canonicalPath,
      siteName: 'Nabda OTP',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: desc },
    robots: { index: true, follow: true },
  };
}

// Page 
export default function AboutPage() {
  const t = useTranslations();

  const FEATURES = [
    t('about.featone'),
    t('about.feattwo'),
    t('about.featthree'),
    t('about.featfour'),
    t('about.featfive'),
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">

      {/* Hero band */}
      <div className="relative overflow-hidden pt-14 pb-10 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
        </div>
        <div className="relative max-w-200 mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569]">
            <Link href="/" className="hover:text-[#635bff] transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-deep-navy dark:text-white font-medium">
              {t('footer.links.company.about')}
            </span>
          </nav>

          <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4 text-[#0a2540] dark:text-white">
            {t('about.title')}
          </h1>
          <p className="text-lg leading-relaxed text-navy-lighter dark:text-[#8899a6] max-w-150">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-200 mx-auto px-6 py-10">
        <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">

          {/* Top accent */}
          <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />

          <div className="p-7 md:p-8 flex flex-col gap-5">

            {/* Paragraphs */}
            <p className="text-[1rem] leading-[1.8] text-navy-lighter dark:text-[#8899a6]">
              {t('about.paraOne')}
            </p>
            <p className="text-[1rem] leading-[1.8] text-navy-lighter dark:text-[#8899a6]">
              {t('about.paraTwo')}
            </p>
            <p className="text-[1rem] leading-[1.8] text-navy-lighter dark:text-[#8899a6]">
              {t('about.paraThree')}
            </p>

            {/* Divider */}
            <hr className="border-gray-100 dark:border-white/8" />

            {/* What We Offer */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-deep-navy dark:text-white">
                {t('about.ques')}
              </h2>
              <ul className="flex flex-col gap-3">
                {FEATURES.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00d4aa]/15 shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} className="text-[#00d4aa]" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-navy-lighter dark:text-[#8899a6]">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 dark:border-white/8" />

            {/* Important Notice */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-deep-navy dark:text-white">
                {t('about.note')}
              </h2>
              <p className="text-[1rem] leading-[1.8] text-navy-lighter dark:text-[#8899a6]">
                {t('about.noteone')}
              </p>
            </div>

            {/* Legal notice box */}
            <div className="rounded-xl border border-[#635bff]/15 bg-[#635bff]/5 dark:bg-[#635bff]/8 dark:border-[#635bff]/20 p-6">
              <p
                className="text-[0.9375rem] leading-[1.8] text-navy-lighter dark:text-[#8899a6] m-0"
                dangerouslySetInnerHTML={{ __html: t.raw('about.legalepara') }}
              />
            </div>

          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="
              inline-flex items-center px-5 py-2.5 text-base font-semibold rounded-full text-white
              bg-[#635bff] hover:bg-[#7a73ff]
              shadow-[0_4px_20px_rgba(99,91,255,0.4)] hover:shadow-[0_6px_28px_rgba(99,91,255,0.6)]
              hover:-translate-y-0.5 transition-all duration-200
            "
          >
            <ChevronRight size={16} className="rotate-180" />
            {t('about.back')}
          </Link>
        </div>
      </div>
    </main>
  );
}