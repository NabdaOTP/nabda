import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ArrowRight, TrendingDown } from 'lucide-react';
import GetStartCard from '@/components/shared/GetStartCard';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const titles = {
        en: 'Nabda OTP vs Competitors — Best WhatsApp API Comparison 2026',
        ar: 'نبضة OTP مقابل المنافسين — أفضل مقارنة واتساب API 2026',
        tr: 'Nabda OTP vs Rakipler — En İyi WhatsApp API Karşılaştırması 2026',
    };
    const descriptions = {
        en: 'Compare Nabda OTP vs UltraMsg, Twilio, Official WhatsApp API, BulkSMS, OTPIQ and alternatives. See pricing, features, and why Nabda is the cheapest WhatsApp API in MENA.',
        ar: 'قارن نبضة OTP مع UltraMsg وTwilio وAPI واتساب الرسمي وBulkSMS وOTPIQ والبدائل. شاهد الأسعار والميزات ولماذا نبضة هي أرخص واتساب API في الشرق الأوسط.',
        tr: 'Nabda OTP\'yi UltraMsg, Twilio, Resmi WhatsApp API, BulkSMS, OTPIQ ile karşılaştırın. Fiyatları, özellikleri ve Nabda\'nın neden MENA\'nın en ucuz WhatsApp API\'si olduğunu görün.',
    };
    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
    const canonicalPath = locale === 'en' ? `${BASE_URL}/comparing` : `${BASE_URL}/${locale}/comparing`;

    return {
        title, description: desc,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing`, ar: `${BASE_URL}/ar/comparing`,
                tr: `${BASE_URL}/tr/comparing`, 'x-default': `${BASE_URL}/comparing`,
            },
        },
        openGraph: {
            title, description: desc, url: canonicalPath, siteName: 'Nabda OTP',
            images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
        },
        twitter: { card: 'summary_large_image', title, description: desc },
        robots: {
            index: true, follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}

// Comparison cards data
const COMPARISONS = [
    {
        slug: 'nabda-vs-ultramsg',
        titleKey: 'comparison.card1.title',
        descKey: 'comparison.card1.description',
        linkKey: 'comparison.detailedComparison',
        accent: '#635bff',
        badgeKey: null,
        savingsKey: 'comparison.card1.savingsLabel',
    },
    {
        slug: 'nabda-vs-twilio',
        titleKey: 'comparison.card2.title',
        descKey: 'comparison.card2.description',
        linkKey: 'comparison.detailedComparison',
        accent: '#e11d48',
        badgeKey: 'comparison.mostSearched',
        savingsKey: 'comparison.card2.savingsLabel',
    },
    {
        slug: 'nabda-vs-official',
        titleKey: 'comparison.card3.title',
        descKey: 'comparison.card3.description',
        linkKey: 'comparison.detailedComparison',
        accent: '#25D366',
        badgeKey: null,
        savingsKey: 'comparison.card3.savingsLabel',
    },
    {
        slug: 'nabda-vs-bulk-sms',
        titleKey: 'comparison.card4.title',
        descKey: 'comparison.card4.description',
        linkKey: 'comparison.detailedComparison',
        accent: '#f59e0b',
        badgeKey: null,
        savingsKey: 'comparison.card4.savingsLabel',
    },
    {
        slug: 'nabda-vs-otpiq',
        titleKey: 'comparison.card5.title',
        descKey: 'comparison.card5.description',
        linkKey: 'comparison.detailedComparison',
        accent: '#3b82f6',
        badgeKey: null,
        savingsKey: 'comparison.card5.savingsLabel',
    },
    {
        slug: 'nabda-vs-alternatives',
        titleKey: 'comparison.card6.title',
        descKey: 'comparison.card6.description',
        linkKey: 'comparison.viewAll',
        accent: '#8b5cf6',
        badgeKey: null,
        savingsKey: 'comparison.card6.savingsLabel',
    },
] as const;

export default function ComparingPage() {
    const t = useTranslations();

    return (
        <main className="min-h-screen bg-white dark:bg-[#060f1e]">

            {/* Hero */}
            <div className="relative overflow-hidden pt-14 pb-12 text-center bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-deep-navy dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-blurple/10 blur-[100px] dark:bg-blurple/20" />
                </div>
                <div className="relative max-w-300 mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569]">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">
                            {t('nav.home') ?? 'Home'}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-deep-navy dark:text-white font-medium">{t('nav.comparing')}</span>
                    </nav>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#635bff]/10 border border-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-sm font-semibold mb-5">
                        <TrendingDown size={15} />
                        {t('comparison.heroBadge')}
                    </div>

                    <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight mb-4 text-deep-navy dark:text-white">
                        {t('comparison.title')}
                    </h1>
                    <p className="text-lg text-navy-lighter dark:text-[#8899a6] max-w-145 mx-auto leading-relaxed">
                        {t('comparison.subtitle')}
                    </p>
                </div>
            </div>

            {/* Grid */}
            <section className="max-w-300 mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMPARISONS.map(({ slug, titleKey, descKey, linkKey, accent, badgeKey, savingsKey }) => (
                        <Link
                            key={slug}
                            href={`/comparing/${slug}`}
                            className="group relative flex flex-col gap-4 p-7 rounded-2xl border bg-white border-gray-100 shadow-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,91,255,0.1)] hover:-translate-y-1.5 hover:border-[#635bff]/30 dark:bg-white/4 dark:border-white/8 dark:hover:bg-white/6 dark:hover:border-[#635bff]/30"
                        >
                            {/* Most Searched badge */}
                            {badgeKey && (
                                <span className="absolute top-5 inset-e-5 px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide bg-[#e11d48] text-white">
                                    {t(badgeKey as Parameters<typeof t>[0])}
                                </span>
                            )}

                            {/* VS header */}
                            <div className="flex flex-col gap-2">
                                {/* Savings pill */}
                                <span
                                    className="self-start px-2.5 py-1 rounded-full text-xs font-semibold border"
                                    style={{
                                        backgroundColor: `${accent}15`,
                                        color: accent,
                                        borderColor: `${accent}30`,
                                    }}
                                >
                                    {t(savingsKey as Parameters<typeof t>[0])}
                                </span>

                                <h3 className="text-[1.1875rem] font-bold text-deep-navy dark:text-white leading-snug mt-1">
                                    {/* Split title to highlight VS */}
                                    {t(titleKey as Parameters<typeof t>[0])
                                        .split(' VS ')
                                        .map((part, i, arr) => (
                                            <span key={i}>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <span className="text-[#e11d48] font-extrabold mx-1">VS</span>
                                                )}
                                            </span>
                                        ))}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6] flex-1">
                                {t(descKey as Parameters<typeof t>[0])}
                            </p>

                            {/* Divider */}
                            <div className="border-t border-gray-100 dark:border-white/8 pt-4 mt-auto">
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#635bff] dark:text-[#a89fff]">
                                    {t(linkKey as Parameters<typeof t>[0])}
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Nabda wins — quick table */}
            <section className="max-w-300 mx-auto px-6 pb-12">
                <div className="rounded-2xl border bg-gray-50 border-gray-100 dark:bg-white/3 dark:border-white/8 overflow-hidden">
                    {/* Header */}
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100 dark:border-white/8">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0a2540] dark:text-white text-center">
                            {t('comparison.quickTable.title')}
                        </h2>
                    </div>

                    {/* Desktop table (sm+) */}
                    <div className="hidden sm:block divide-y divide-gray-100 dark:divide-white/8">
                        <div className="grid grid-cols-3 px-8 py-3 bg-gray-100/60 dark:bg-white/4 text-xs font-bold uppercase tracking-wider text-[#94a3b8] dark:text-[#475569]">
                            <span>{t('comparison.quickTable.featureCol')}</span>
                            <span className="text-[#635bff] dark:text-[#a89fff]">{t('comparison.quickTable.nabdaCol')}</span>
                            <span>{t('comparison.quickTable.othersCol')}</span>
                        </div>
                        {(['price', 'messages', 'setup', 'mena', 'arabic', 'trial'] as const).map((key) => (
                            <div key={key} className="grid grid-cols-3 px-8 py-4 text-sm">
                                <span className="font-semibold text-[#0a2540] dark:text-[#94a3b8]">
                                    {t(`comparison.quickTable.rows.${key}.label` as Parameters<typeof t>[0])}
                                </span>
                                <span className="font-semibold text-[#635bff] dark:text-[#a89fff]">
                                    {t(`comparison.quickTable.rows.${key}.nabda` as Parameters<typeof t>[0])}
                                </span>
                                <span className="text-[#94a3b8] dark:text-[#475569]">
                                    {t(`comparison.quickTable.rows.${key}.others` as Parameters<typeof t>[0])}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Mobile stacked cards */}
                    <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/8">
                        {(['price', 'messages', 'setup', 'mena', 'arabic', 'trial'] as const).map((key) => (
                            <div key={key} className="px-4 py-4">
                                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[#94a3b8] dark:text-[#475569] mb-3">
                                    {t(`comparison.quickTable.rows.${key}.label` as Parameters<typeof t>[0])}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-[#635bff] dark:text-[#a89fff] mb-1">
                                            {t('comparison.quickTable.nabdaCol')}
                                        </p>
                                        <p className="text-sm font-semibold text-[#635bff] dark:text-[#a89fff]">
                                            {t(`comparison.quickTable.rows.${key}.nabda` as Parameters<typeof t>[0])}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-[#94a3b8] mb-1">
                                            {t('comparison.quickTable.othersCol')}
                                        </p>
                                        <p className="text-sm text-[#94a3b8] dark:text-[#475569]">
                                            {t(`comparison.quickTable.rows.${key}.others` as Parameters<typeof t>[0])}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <GetStartCard/>

        </main>
    );
}