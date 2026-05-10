import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ShieldCheck, ShoppingCart, Lock, Clock, Megaphone,
  ChevronRight, ArrowRight, Sparkles,
} from 'lucide-react';
import GetStartCard from '@/components/shared/GetStartCard';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'Solutions — Nabda OTP | WhatsApp API for Every Business Need',
    ar: 'الحلول — نبضة OTP | واتساب API لكل احتياجات عملك',
    tr: 'Çözümler — Nabda OTP | Her İşletme İhtiyacı için WhatsApp API',
  };
  const descriptions = {
    en: 'Explore Nabda OTP solutions: OTP verification, order confirmations, account security, appointment reminders, and WhatsApp marketing for businesses in Iraq, Syria & MENA.',
    ar: 'استكشف حلول نبضة OTP: التحقق بـ OTP، تأكيدات الطلبات، أمان الحسابات، تذكيرات المواعيد، وتسويق واتساب للشركات في العراق وسوريا والشرق الأوسط.',
    tr: 'Nabda OTP çözümlerini keşfedin: OTP doğrulama, sipariş onayları, hesap güvenliği, randevu hatırlatıcıları ve WhatsApp pazarlaması.',
  };
  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc  = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const canonicalPath = locale === 'en' ? `${BASE_URL}/solutions` : `${BASE_URL}/${locale}/solutions`;

  return {
    title, description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/solutions`, ar: `${BASE_URL}/ar/solutions`,
        tr: `${BASE_URL}/tr/solutions`, 'x-default': `${BASE_URL}/solutions`,
      },
    },
    openGraph: {
      title, description: desc, url: canonicalPath, siteName: 'Nabda OTP',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: desc },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

// Solutions data
const SOLUTIONS = [
  {
    slug:     'otp-verification',
    icon:     Lock,
    titleKey: 'solutions.card1.title',
    descKey:  'solutions.card1.description',
    color:    'from-[#635bff] to-[#4f46e5]',
    iconBg:   'bg-[#635bff]/10 text-[#635bff] dark:bg-[#635bff]/20 dark:text-[#a89fff]',
    badge:    'Most Popular',
    badgeColor: 'bg-[#635bff] text-white',
  },
  {
    slug:     'order-confirmations',
    icon:     ShoppingCart,
    titleKey: 'solutions.card2.title',
    descKey:  'solutions.card2.description',
    color:    'from-[#00d4aa] to-[#00a88a]',
    iconBg:   'bg-[#00d4aa]/10 text-[#00a88a] dark:bg-[#00d4aa]/15 dark:text-[#00d4aa]',
    badge:    null,
    badgeColor: '',
  },
  {
    slug:     'account-security',
    icon:     ShieldCheck,
    titleKey: 'solutions.card3.title',
    descKey:  'solutions.card3.description',
    color:    'from-[#3b82f6] to-[#1d4ed8]',
    iconBg:   'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
    badge:    null,
    badgeColor: '',
  },
  {
    slug:     'appointment-reminders',
    icon:     Clock,
    titleKey: 'solutions.card4.title',
    descKey:  'solutions.card4.description',
    color:    'from-[#f59e0b] to-[#d97706]',
    iconBg:   'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
    badge:    null,
    badgeColor: '',
  },
  {
    slug:     'marketing',
    icon:     Megaphone,
    titleKey: 'solutions.card5.title',
    descKey:  'solutions.card5.description',
    color:    'from-[#ec4899] to-[#db2777]',
    iconBg:   'bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400',
    badge:    null,
    badgeColor: '',
  },
] as const;

export default function SolutionsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-white dark:bg-[#060f1e]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden pt-20 pb-16 text-center bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
        </div>
        <div className="relative max-w-300 mx-auto px-6">
          <nav className="flex items-center justify-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569]">
            <Link href="/" className="hover:text-[#635bff] transition-colors">
              {t('nav.home') ?? 'Home'}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0a2540] dark:text-white font-medium">{t('nav.solutions')}</span>
          </nav>

          <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight mb-4 text-[#0a2540] dark:text-white">
            {t('solutions.title')}
          </h1>
          <p className="text-lg text-[#425466] dark:text-[#8899a6] max-w-145 mx-auto leading-relaxed">
            {t('solutions.subtitle')}
          </p>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <section className="max-w-300 mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Solution cards */}
          {SOLUTIONS.map(({ slug, icon: Icon, titleKey, descKey, iconBg, badge, badgeColor }) => (
            <Link
              key={slug}
              href={`/solutions/${slug}`}
              className="group relative flex flex-col gap-5 p-8 rounded-2xl border bg-white border-gray-100 shadow-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,91,255,0.12)] hover:-translate-y-1.5 hover:border-[#635bff]/30 dark:bg-white/4 dark:border-white/8 dark:hover:bg-white/6 dark:hover:border-[#635bff]/30"
            >
              {/* Badge */}
              {badge && (
                <span className={`absolute top-5 inset-e-5 px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide ${badgeColor}`}>
                  {badge}
                </span>
              )}

              {/* Icon */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${iconBg}`}>
                <Icon size={26} strokeWidth={1.75} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-bold text-[#0a2540] dark:text-white leading-snug">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>
              </div>

              {/* Learn more */}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#635bff] dark:text-[#a89fff] mt-auto">
                {t('solutions.learnMore')}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}

          {/* Coming Soon card */}
          <div className="relative flex flex-col gap-5 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/2 cursor-default">
            <span className="absolute top-5 inset-e-5 px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide bg-[#635bff] text-white">
              Coming Soon
            </span>

            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/8 shrink-0">
              <Sparkles size={26} strokeWidth={1.75} className="text-[#94a3b8] dark:text-[#475569]" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-xl font-bold text-[#94a3b8] dark:text-[#475569] leading-snug">
                {t('solutions.comingSoon.title')}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-[#94a3b8] dark:text-[#334155]">
                {t('solutions.comingSoon.description')}
              </p>
            </div>

            <span className="text-sm font-medium text-[#94a3b8] dark:text-[#334155] italic mt-auto">
              {t('solutions.comingSoon.text')}
            </span>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <GetStartCard/>

    </main>
  );
}