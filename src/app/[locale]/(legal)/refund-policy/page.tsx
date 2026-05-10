import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, MessageCircle } from 'lucide-react';

const BASE_URL = 'https://www.nabdaotp.com';

type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Refund Policy — Nabda OTP | WhatsApp API Platform',
    ar: 'سياسة الاسترداد — نبضة OTP | منصة واتساب API',
    tr: 'İade Politikası — Nabda OTP | WhatsApp API Platformu',
  };
  const descriptions = {
    en: 'Nabda OTP refund policy. Learn about our 5-day free trial, subscription terms, and how to request a refund.',
    ar: 'سياسة استرداد نبضة OTP. تعرف على فترة التجربة المجانية لمدة 5 أيام وشروط الاشتراك وكيفية طلب الاسترداد.',
    tr: 'Nabda OTP iade politikası. 5 günlük ücretsiz deneme, abonelik koşulları ve iade talebinde bulunma hakkında bilgi edinin.',
  };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc  = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const canonicalPath = locale === 'en'
    ? `${BASE_URL}/refund-policy`
    : `${BASE_URL}/${locale}/refund-policy`;

  return {
    title,
    description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en:          `${BASE_URL}/refund-policy`,
        ar:          `${BASE_URL}/ar/refund-policy`,
        tr:          `${BASE_URL}/tr/refund-policy`,
        'x-default': `${BASE_URL}/refund-policy`,
      },
    },
    openGraph: {
      title, description: desc, url: canonicalPath, siteName: 'Nabda OTP',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: desc },
    robots: { index: true, follow: true },
  };
}

// Page 
export default function RefundPolicyPage() {
  const t  = useTranslations('refund');
  const tn = useTranslations('nav');
  const tf = useTranslations('footer.links.company');
  const ta = useTranslations('about');

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">

      {/* Hero band */}
      <div className="relative overflow-hidden pt-20 pb-14 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
        </div>
        <div className="relative max-w-200 mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
            <Link href="/" className="hover:text-[#635bff] transition-colors">
              {tn('home')}
            </Link>
            <ChevronRight size={14} />
            <Link href="/terms-of-service" className="hover:text-[#635bff] transition-colors">
              {tf('terms')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-deep-navy dark:text-white font-medium">
              {tf('refund')}
            </span>
          </nav>

          <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4 text-[#0a2540] dark:text-white">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-[#425466] dark:text-[#8899a6] max-w-150">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-200 mx-auto px-6 py-12">
        <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">

          {/* Top accent */}
          <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />

          <div className="p-8 md:p-10 flex flex-col gap-6">

            {/* Trial paragraph */}
            <p className="text-[1rem] leading-[1.8] text-[#425466] dark:text-[#8899a6]">
              {t('trial')}
            </p>

            {/* Policy paragraph */}
            <p className="text-[1rem] leading-[1.8] text-[#425466] dark:text-[#8899a6]">
              {t('policy')}
            </p>

            {/* Contact notice box */}
            <div className="rounded-xl border border-[#635bff]/15 bg-[#635bff]/5 dark:bg-[#635bff]/8 dark:border-[#635bff]/20 p-6">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#635bff]/10 shrink-0 mt-0.5">
                  <MessageCircle size={18} className="text-[#635bff]" />
                </div>
                <p className="text-[0.9375rem] leading-[1.8] text-[#425466] dark:text-[#8899a6] m-0">
                  {t('contactText')}{' '}
                  <a
                    href="https://wa.me/905346639145"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#635bff] hover:text-[#7a73ff] underline transition-colors"
                  >
                    {t('whatsapp')}
                  </a>
                  {' '}{t('note')}
                </p>
              </div>
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
            {ta('back')}
          </Link>
        </div>
      </div>
    </main>
  );
}