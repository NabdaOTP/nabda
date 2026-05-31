import { useTranslations } from 'next-intl';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP Alternatives 2026 — Compare Twilio, UltraMsg, Official API, BulkSMS & OTPIQ',
        ar: 'بدائل Nabda OTP 2026 — قارن Twilio و UltraMsg و Official API و BulkSMS و OTPIQ',
        tr: 'Nabda OTP Alternatifleri 2026 — Twilio, UltraMsg, Official API, BulkSMS ve OTPIQ Karşılaştırması',
    };

    const descriptions = {
        en: 'Compare Nabda OTP with top WhatsApp API alternatives: Twilio, UltraMsg, Official WhatsApp API, BulkSMS, and OTPIQ. Fixed $10/mo pricing vs per-message billing. Built for Iraq, Syria & MENA markets.',
        ar: 'قارن Nabda OTP مع أفضل بدائل WhatsApp API: Twilio و UltraMsg و Official WhatsApp API و BulkSMS و OTPIQ. تسعير ثابت 10 دولار شهرياً مقابل الفوترة لكل رسالة. مصمم لأسواق العراق وسوريا والشرق الأوسط.',
        tr: 'Nabda OTP\'yi en iyi WhatsApp API alternatifleriyle karşılaştırın: Twilio, UltraMsg, Official WhatsApp API, BulkSMS ve OTPIQ. Sabit $10/ay fiyatlandırma vs mesaj başına faturalama. Irak, Suriye ve MENA pazarları için tasarlandı.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-alternatives`
            : `${BASE_URL}/${locale}/comparing/nabda-alternatives`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP alternatives, Twilio alternative, UltraMsg alternative, WhatsApp API comparison, Iraq messaging service, MENA WhatsApp gateway, OTP provider comparison',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-alternatives`,
                ar: `${BASE_URL}/ar/comparing/nabda-alternatives`,
                tr: `${BASE_URL}/tr/comparing/nabda-alternatives`,
                'x-default': `${BASE_URL}/comparing/nabda-alternatives`,
            },
        },
        openGraph: {
            title,
            description: desc,
            url: canonicalPath,
            type: 'article',
            siteName: 'Nabda OTP',
            locale: isAR ? 'ar_SA' : isTR ? 'tr_TR' : 'en_US',
            images: [
                {
                    url: `${BASE_URL}/assets/og-nabda-alternatives.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP Alternatives Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-alternatives.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// JSON-LD
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nabda OTP Alternatives Comparison',
    description:
        'Comprehensive comparison of Nabda OTP with all major WhatsApp API alternatives for MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page 
export default function NabdaAlternativesPage() {
    const t = useTranslations();

    const alternatives = [
        { name: 'Twilio', slug: 'twilio', pricing: '$0.0084/msg', monthlyCost: '$252', type: 'Official API', menaFocus: false, bestForKey: 'alternatives.competitors.twilio.bestFor' },
        { name: 'Official WhatsApp API', slug: 'official', pricing: '$0.003/msg', monthlyCost: '$90', type: 'Official API', menaFocus: false, bestForKey: 'alternatives.competitors.official.bestFor' },
        { name: 'UltraMsg', slug: 'ultramsg', pricing: '$39/number', monthlyCost: '$39+', type: 'Gateway API', menaFocus: false, bestForKey: 'alternatives.competitors.ultramsg.bestFor' },
        { name: 'BulkSMS', slug: 'bulksms', pricing: '$0.0321/msg', monthlyCost: '$963', type: 'SMS Gateway', menaFocus: false, bestForKey: 'alternatives.competitors.bulksms.bestFor' },
        { name: 'OTPIQ', slug: 'otpiq', pricing: '$0.061/msg', monthlyCost: '$1,830', type: 'Regional OTP', menaFocus: true, bestForKey: 'alternatives.competitors.otpiq.bestFor' },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-[#060f1e]">
            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#f8f9ff] to-white dark:from-[#0a1628] dark:to-[#060f1e]">
                <div className="container max-w-240 mx-auto px-6">
                    <nav className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] mb-6">
                        <Link href="/">{t('nav.home')}</Link>
                        <span>/</span>
                        <Link href="/comparing">{t('alternatives.breadcrumb.comparing')}</Link>
                        <span>/</span>
                        <span className="text-[#0a2540] dark:text-white font-medium">
                            {t('alternatives.breadcrumb.current')}
                        </span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-sm font-bold uppercase tracking-wide mb-4">
                        {t('alternatives.badge')}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0a2540] dark:text-white mb-4 leading-tight">
                        {t('alternatives.title')}
                    </h1>

                    <p className="text-lg md:text-xl text-[#475569] dark:text-[#94a3b8] mb-8 max-w-3xl leading-relaxed">
                        {t('alternatives.subtitle')}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="https://app.nabda-otp.com/en/login" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold text-base transition-all shadow-lg hover:shadow-xl hover:scale-105">
                            {t('alternatives.cta.trial')}
                        </Link>
                        <Link href="https://connect.nabdaotp.com/docs" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-[#635bff] text-[#635bff] dark:border-[#a89fff] dark:text-[#a89fff] hover:bg-[#635bff]/10 font-bold text-base transition-all">
                            {t('alternatives.cta.docs')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Comparison */}
            <section className="py-16 bg-white dark:bg-[#060f1e]">
                <div className="container max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white text-center mb-12">
                        {t('alternatives.quickCompare.title')}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white dark:bg-white/4 rounded-2xl overflow-hidden">
                            <thead>
                                <tr className="bg-[#f8f9ff] dark:bg-white/8 border-b border-gray-200 dark:border-white/10">
                                    {['provider', 'pricingModel', 'monthlyCost', 'type', 'menaFocus', 'details'].map(k => (
                                        <th key={k} className="px-6 py-4 text-center first:text-left text-sm font-bold text-[#0a2540] dark:text-white">
                                            {t(`alternatives.quickCompare.${k}` as Parameters<typeof t>[0])}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-[#f0fdf4] dark:bg-[#10b981]/10 border-l-4 border-[#10b981]">
                                    <td className="px-6 py-4 text-sm font-bold text-[#0a2540] dark:text-white">Nabda OTP</td>
                                    <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">$10/month fixed</td>
                                    <td className="px-6 py-4 text-center"><span className="text-2xl font-extrabold text-[#10b981]">$10</span></td>
                                    <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">Gateway API</td>
                                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#10b981] mx-auto" /></td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium text-[#635bff]">{t('alternatives.quickCompare.current')}</span>
                                    </td>
                                </tr>
                                {alternatives.map((alt, i) => (
                                    <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/4 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-[#0a2540] dark:text-white">{alt.name}</td>
                                        <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">{alt.pricing}</td>
                                        <td className="px-6 py-4 text-center"><span className="text-lg font-bold text-[#f59e0b]">{alt.monthlyCost}</span></td>
                                        <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">{alt.type}</td>
                                        <td className="px-6 py-4 text-center">
                                            {alt.menaFocus ? <Check className="w-5 h-5 text-[#10b981] mx-auto" /> : <X className="w-5 h-5 text-[#64748b] mx-auto" />}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href={`/comparing/nabda-vs-${alt.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-[#635bff] hover:text-[#4f46e5] transition-colors">
                                                {t('alternatives.quickCompare.compare')}
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Detailed Comparisons */}
            <section className="py-20 bg-[#f8f9ff] dark:bg-[#0a1628]">
                <div className="container max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white text-center mb-12">
                        {t('alternatives.detailed.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {alternatives.map((alt, i) => (
                            <article key={i} className="p-6 rounded-2xl bg-white dark:bg-white/4 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                <h3 className="text-xl font-bold text-[#0a2540] dark:text-white mb-2">Nabda vs {alt.name}</h3>
                                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mb-4">
                                    {t(alt.bestForKey as Parameters<typeof t>[0])}
                                </p>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-sm text-[#64748b] dark:text-[#94a3b8]">{t('alternatives.detailed.from')}</span>
                                    <span className="text-2xl font-bold text-[#f59e0b]">{alt.pricing}</span>
                                </div>
                                <a href={`/comparing/nabda-vs-${alt.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#635bff] hover:text-[#4f46e5] transition-colors">
                                    {t('alternatives.detailed.viewFull')}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* When to Choose */}
            <section className="py-20 bg-white dark:bg-[#060f1e]">
                <div className="container max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white text-center mb-12">
                        {t('alternatives.whenToChoose.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-2xl bg-[#f0fdf4] dark:bg-[#10b981]/10 border-2 border-[#10b981]">
                            <h3 className="text-xl font-bold text-[#0a2540] dark:text-white mb-4">
                                {t('alternatives.whenToChoose.choose.title')}
                            </h3>
                            <ul className="space-y-3 text-base text-[#475569] dark:text-[#94a3b8]">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <li key={n} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                                        <span>{t(`alternatives.whenToChoose.choose.item${n}` as Parameters<typeof t>[0])}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-[#fef3c7] dark:bg-[#f59e0b]/10 border-2 border-[#f59e0b]">
                            <h3 className="text-xl font-bold text-[#0a2540] dark:text-white mb-4">
                                {t('alternatives.whenToChoose.consider.title')}
                            </h3>
                            <ul className="space-y-3 text-base text-[#475569] dark:text-[#94a3b8]">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <li key={n} className="flex items-start gap-2">
                                        <span className="text-[#f59e0b] mt-0.5">→</span>
                                        <span>{t(`alternatives.whenToChoose.consider.item${n}` as Parameters<typeof t>[0])}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0a2540] dark:text-white mb-6">
                            {t('alternatives.bottomCta.title')}
                        </h2>
                        <a href="https://app.nabda-otp.com/en/login" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
                            {t('alternatives.bottomCta.button')}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}