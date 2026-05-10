import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Shield } from 'lucide-react';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'Privacy Policy — Nabda OTP | WhatsApp API Platform',
    ar: 'سياسة الخصوصية — نبضة OTP | منصة واتساب API',
    tr: 'Gizlilik Politikası — Nabda OTP | WhatsApp API Platformu',
  };
  const descriptions = {
    en: 'Learn how Nabda OTP collects, uses, and protects your data on our WhatsApp API platform.',
    ar: 'تعرف على كيفية جمع نبضة OTP لبياناتك واستخدامها وحمايتها على منصة واتساب API الخاصة بنا.',
    tr: 'Nabda OTP\'nin WhatsApp API platformunda verilerinizi nasıl topladığını, kullandığını ve koruduğunu öğrenin.',
  };
  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc  = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const canonicalPath = locale === 'en' ? `${BASE_URL}/privacy-policy` : `${BASE_URL}/${locale}/privacy-policy`;

  return {
    title, description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/privacy-policy`, ar: `${BASE_URL}/ar/privacy-policy`,
        tr: `${BASE_URL}/tr/privacy-policy`, 'x-default': `${BASE_URL}/privacy-policy`,
      },
    },
    openGraph: { title, description: desc, url: canonicalPath, siteName: 'Nabda OTP',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description: desc },
    robots: { index: true, follow: true },
  };
}

// Reusable section
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-[#0a2540] dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1rem] leading-[1.8] text-[#425466] dark:text-[#8899a6]">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 ps-4">
      {items.map((item, i) => (
        <li key={i} className="text-[0.9375rem] leading-[1.8] text-[#425466] dark:text-[#8899a6] list-disc">{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const t  = useTranslations('privacy');
  const tn = useTranslations('nav');
  const tf = useTranslations('footer');
  const ta = useTranslations('about')

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">

      {/* Hero band */}
      <div className="relative overflow-hidden pt-20 pb-14 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
        </div>
        <div className="relative max-w-200 mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569]">
            <Link href="/" className="hover:text-[#635bff] transition-colors">{tn('home') ?? 'Home'}</Link>
            <ChevronRight size={14} />
            <span className="text-[#0a2540] dark:text-white font-medium">{tf('links.company.privacy')}</span>
          </nav>
          <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4 text-[#0a2540] dark:text-white">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-[#425466] dark:text-[#8899a6] max-w-150">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-200 mx-auto px-6 py-12">
        <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">
          <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />
          <div className="p-8 md:p-10 flex flex-col gap-8">

            <P>{t('intro.one')}</P>
            <P>{t('intro.two')}</P>
            <P>{t('intro.three')}</P>

            <hr className="border-gray-100 dark:border-white/8" />

            <Section title={t('changes.title')}>
              <P>{t('changes.one')}</P>
              <P>{t('changes.two')}</P>
            </Section>

            <Section title={t('definitions.title')}>
              <P>{t('definitions.one')}</P>
              <P>{t('definitions.two')}</P>
              <P>{t('definitions.three')}</P>
            </Section>

            <Section title={t('collect.title')}>
              <P>{t('collect.intro')}</P>
              <h3 className="text-base font-semibold text-[#0a2540] dark:text-white">{t('personal.title')}</h3>
              <P>{t('personal.intro')}</P>
              <UL items={[
                t('personal.one'), t('personal.two'), t('personal.three'),
                t('personal.four'), t('personal.five'), t('personal.six'),
              ]} />
              <P>{t('personal.note')}</P>
              <h3 className="text-base font-semibold text-[#0a2540] dark:text-white">{t('general.title')}</h3>
              <P>{t('general.intro')}</P>
              <UL items={[
                t('general.one'), t('general.two'), t('general.three'),
                t('general.four'), t('general.five'),
              ]} />
              <P>{t('general.note')}</P>
            </Section>

            <Section title={t('cookies.title')}>
              <P>{t('cookies.intro')}</P>
              <UL items={[t('cookies.one'), t('cookies.two'), t('cookies.three')]} />
              <P>{t('cookies.note')}</P>
            </Section>

            <Section title={t('usage.title')}>
              <P>{t('usage.important')}</P>
              <P>{t('usage.intro')}</P>
              <UL items={[t('usage.one'), t('usage.two'), t('usage.three')]} />
              <P>{t('usage.noteOne')}</P>
              <P>{t('usage.noteTwo')}</P>
            </Section>

            <Section title={t('security.title')}>
              <P>{t('security.one')}</P>
              <P>{t('security.two')}</P>
            </Section>

            <Section title={t('rights.title')}>
              <P>{t('rights.intro')}</P>
              <UL items={[t('rights.one'), t('rights.two'), t('rights.three')]} />
              <P>{t('rights.note')}</P>
            </Section>

            <Section title={t('retention.title')}>
              <P>{t('retention.one')}</P>
            </Section>

            <Section title={t('contact.title')}>
              <P>{t('contact.intro')}</P>
              <a href="https://nabdaotp.com" target="_blank" rel="noopener noreferrer"
                className="text-[#635bff] hover:text-[#7a73ff] underline text-sm transition-colors">
                https://nabdaotp.com
              </a>
            </Section>

            {/* Notice box */}
            <div className="rounded-xl border border-[#635bff]/15 bg-[#635bff]/5 dark:bg-[#635bff]/8 dark:border-[#635bff]/20 p-6 flex items-start gap-3">
              <Shield size={20} className="text-[#635bff] shrink-0 mt-0.5" />
              <p className="text-[0.9375rem] leading-[1.8] text-[#425466] dark:text-[#8899a6] m-0">
                {t('notice')}
              </p>
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