import BackToArticles from '@/components/shared/BackToArticles';
import { Link } from '@/i18n/navigation';
import {
    ArrowLeft,
    ArrowRight,
    Box,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    Layers
} from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// JSON-LD 
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'WhatsApp Bundle vs Single Instance — Which is Right for Your Business?',
    description: 'Understand the difference between a Nabda OTP Bundle and a single Instance, and how to choose the right setup for your message volume and fault tolerance needs.',
    author: { '@type': 'Organization', name: 'Nabda OTP', url: BASE_URL },
    publisher: {
        '@type': 'Organization', name: 'Nabda OTP',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/android-chrome-192x192.png` },
    },
    datePublished: '2026-04-10',
    dateModified: '2026-04-10',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/bundle-vs-instance` },
    image: `${BASE_URL}/assets/blog/bundle-vs-instance.webp`,
};

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'WhatsApp Bundle vs Single Instance — Which is Right for Your Business? | Nabda OTP',
        ar: 'Bundle مقابل Instance في نبضة OTP — أيهما المناسب لعملك؟',
        tr: 'WhatsApp Bundle ve Tekli Instance — İşletmeniz için Hangisi Doğru? | Nabda OTP',
    };

    const descriptions = {
        en: 'Understand the difference between a Nabda OTP Bundle and a single Instance. Learn which setup fits your message volume, fault tolerance needs, and budget — with real pricing comparisons.',
        ar: 'تعرف على الفرق بين Bundle وInstance في نبضة OTP وكيف تختار الإعداد المناسب لحجم رسائلك واحتياجات تحمل الأعطال والميزانية.',
        tr: 'Nabda OTP Bundle ve tekli Instance arasındaki farkı anlayın. Mesaj hacminize, hata toleransı ihtiyaçlarınıza ve bütçenize uygun kurulumu seçin.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath = locale === 'en'
        ? `${BASE_URL}/blogs/bundle-vs-instance`
        : `${BASE_URL}/${locale}/blogs/bundle-vs-instance`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP Bundle, WhatsApp instance, WhatsApp multi-number, OTP rotation, high volume WhatsApp API, MENA WhatsApp gateway, bundle vs instance',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/blogs/bundle-vs-instance`,
                ar: `${BASE_URL}/ar/blogs/bundle-vs-instance`,
                tr: `${BASE_URL}/tr/blogs/bundle-vs-instance`,
                'x-default': `${BASE_URL}/blogs/bundle-vs-instance`,
            },
        },
        openGraph: {
            title,
            description: desc,
            url: canonicalPath,
            type: 'article',
            siteName: 'Nabda OTP',
            locale: isAR ? 'ar_SA' : isTR ? 'tr_TR' : 'en_US',
            images: [{
                url: `${BASE_URL}/assets/blog/bundle-vs-instance.webp`,
                width: 1200,
                height: 630,
                alt: 'WhatsApp Bundle vs Instance — Nabda OTP',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/blog/bundle-vs-instance.webp`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}


// Page (Server Component) 
export default async function BlogBundleVsInstance({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogs.bundlePost' });
    const tb = await getTranslations({ locale, namespace: 'blogs.blogPost' });

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div className="relative overflow-hidden pt-20 pb-12 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
                </div>
                <div className="relative max-w-215 mx-auto px-6">
                    <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-[#635bff] transition-colors">Blog</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0a2540] dark:text-white font-medium">Bundle vs Instance</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-500/20">
                            Product
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Calendar size={14} /> April 10, 2026
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Clock size={14} /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5 text-[#0a2540] dark:text-white">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg leading-relaxed text-[#425466] dark:text-[#8899a6]">
                        {t('hero.excerpt')}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-215 mx-auto px-6 py-12 flex flex-col gap-6">
                <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">
                    <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />
                    <div className="p-8 md:p-10 flex flex-col gap-10">

                        {/* Intro */}
                        <div>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">
                                {t('intro')}
                            </p>
                        </div>

                        {/* Side by side cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Instance */}
                            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50 dark:bg-white/3 dark:border-white/8">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#635bff]/10 text-[#635bff]">
                                        <Box size={20} strokeWidth={1.75} />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('instance.name')}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">{t('instance.def')}</p>
                                <ul className="flex flex-col gap-2">
                                    {(['f1', 'f2', 'f3', 'f4'] as const).map((k) => (
                                        <li key={k} className="flex items-start gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                            <CheckCircle size={15} className="text-[#00d4aa] shrink-0 mt-0.5" />
                                            {t(`instance.${k}` as Parameters<typeof t>[0])}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/8">
                                    <span className="text-sm font-bold text-[#635bff] dark:text-[#a89fff]">{t('instance.price')}</span>
                                </div>
                            </div>

                            {/* Bundle */}
                            <div className="flex flex-col gap-4 p-6 rounded-2xl border-2 border-[#635bff]/40 bg-[#635bff]/3 dark:bg-[#635bff]/8 relative">
                                <div className="absolute -top-3 inset-e-4 px-3 py-1 rounded-full bg-[#635bff] text-white text-[0.7rem] font-bold uppercase tracking-wide">
                                    {t('bundle.badge')}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#635bff] text-white">
                                        <Layers size={20} strokeWidth={1.75} />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('bundle.name')}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">{t('bundle.def')}</p>
                                <ul className="flex flex-col gap-2">
                                    {(['f1', 'f2', 'f3', 'f4', 'f5'] as const).map((k) => (
                                        <li key={k} className="flex items-start gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                            <CheckCircle size={15} className="text-[#00d4aa] shrink-0 mt-0.5" />
                                            {t(`bundle.${k}` as Parameters<typeof t>[0])}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-3 border-t border-[#635bff]/20">
                                    <span className="text-sm font-bold text-[#635bff] dark:text-[#a89fff]">{t('bundle.price')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Comparison table */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-5">{t('table.title')}</h2>

                            {/* ── Desktop view (md+): original 3-col grid ── */}
                            <div className="hidden md:block rounded-2xl border border-gray-100 dark:border-white/8 overflow-hidden">
                                {/* Header */}
                                <div className="grid grid-cols-3 bg-[#0a2540] dark:bg-[#0d1b2e] px-5 py-3">
                                    {[t('table.feature'), t('table.instance'), t('table.bundle')].map((h, i) => (
                                        <span key={i} className={`text-xs font-bold uppercase tracking-wider ${i === 0 ? 'text-[#8899a6]' : 'text-white'}`}>{h}</span>
                                    ))}
                                </div>
                                {/* Rows */}
                                {[
                                    { feature: t('table.r1.feature'), instance: t('table.r1.instance'), bundle: t('table.r1.bundle'), bundleWins: true },
                                    { feature: t('table.r2.feature'), instance: t('table.r2.instance'), bundle: t('table.r2.bundle'), bundleWins: true },
                                    { feature: t('table.r3.feature'), instance: t('table.r3.instance'), bundle: t('table.r3.bundle'), bundleWins: true },
                                    { feature: t('table.r4.feature'), instance: t('table.r4.instance'), bundle: t('table.r4.bundle'), bundleWins: false },
                                    { feature: t('table.r5.feature'), instance: t('table.r5.instance'), bundle: t('table.r5.bundle'), bundleWins: false },
                                ].map((row, i) => (
                                    <div key={i} className={`grid grid-cols-3 px-5 py-4 text-sm border-t border-gray-100 dark:border-white/8 ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/60 dark:bg-white/2'}`}>
                                        <span className="font-semibold text-[#0a2540] dark:text-[#94a3b8]">{row.feature}</span>
                                        <span className={`text-[#425466] dark:text-[#8899a6] ${!row.bundleWins ? 'font-semibold text-[#635bff] dark:text-[#a89fff]' : ''}`}>{row.instance}</span>
                                        <span className={`text-[#425466] dark:text-[#8899a6] ${row.bundleWins ? 'font-semibold text-[#635bff] dark:text-[#a89fff]' : ''}`}>{row.bundle}</span>
                                    </div>
                                ))}
                            </div>

                            {/* ── Mobile view (<md): stacked cards ── */}
                            <div className="md:hidden space-y-3">
                                {/* Column labels pill */}
                                <div className="grid grid-cols-2 gap-2 mb-1">
                                    {[t('table.instance'), t('table.bundle')].map((label, i) => (
                                        <div key={i} className="rounded-lg bg-[#0a2540] dark:bg-[#0d1b2e] px-3 py-2 text-center">
                                            <span className="text-xs font-bold uppercase tracking-wider text-white">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* One card per row */}
                                {[
                                    { feature: t('table.r1.feature'), instance: t('table.r1.instance'), bundle: t('table.r1.bundle'), bundleWins: true },
                                    { feature: t('table.r2.feature'), instance: t('table.r2.instance'), bundle: t('table.r2.bundle'), bundleWins: true },
                                    { feature: t('table.r3.feature'), instance: t('table.r3.instance'), bundle: t('table.r3.bundle'), bundleWins: true },
                                    { feature: t('table.r4.feature'), instance: t('table.r4.instance'), bundle: t('table.r4.bundle'), bundleWins: false },
                                    { feature: t('table.r5.feature'), instance: t('table.r5.instance'), bundle: t('table.r5.bundle'), bundleWins: false },
                                ].map((row, i) => (
                                    <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/8 overflow-hidden">
                                        {/* Feature label spanning full width */}
                                        <div className={`px-4 py-2 ${i % 2 === 0 ? 'bg-gray-50/80 dark:bg-white/4' : 'bg-white dark:bg-transparent'}`}>
                                            <span className="text-xs font-bold uppercase tracking-wider text-[#8899a6]">{t('table.feature')}</span>
                                            <p className="mt-0.5 text-sm font-semibold text-[#0a2540] dark:text-[#94a3b8]">{row.feature}</p>
                                        </div>

                                        {/* Two-col values */}
                                        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-white/8">
                                            <div className={`px-4 py-3 ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/60 dark:bg-white/2'}`}>
                                                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8899a6] mb-1">{t('table.instance')}</span>
                                                <span className={`text-sm ${!row.bundleWins ? 'font-semibold text-[#635bff] dark:text-[#a89fff]' : 'text-[#425466] dark:text-[#8899a6]'}`}>
                                                    {row.instance}
                                                </span>
                                            </div>
                                            <div className={`px-4 py-3 ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/60 dark:bg-white/2'}`}>
                                                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8899a6] mb-1">{t('table.bundle')}</span>
                                                <span className={`text-sm ${row.bundleWins ? 'font-semibold text-[#635bff] dark:text-[#a89fff]' : 'text-[#425466] dark:text-[#8899a6]'}`}>
                                                    {row.bundle}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* When to use each */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-5">{t('when.title')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Use Instance */}
                                <div className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 dark:border-white/8 bg-white dark:bg-white/4">
                                    <div className="flex items-center gap-2">
                                        <Box size={18} className="text-[#635bff]" />
                                        <h3 className="font-bold text-[#0a2540] dark:text-white">{t('when.instance.title')}</h3>
                                    </div>
                                    <ul className="flex flex-col gap-2">
                                        {(['p1', 'p2', 'p3'] as const).map((k) => (
                                            <li key={k} className="flex items-start gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                                <CheckCircle size={14} className="text-[#00d4aa] shrink-0 mt-0.5" />
                                                {t(`when.instance.${k}` as Parameters<typeof t>[0])}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Use Bundle */}
                                <div className="flex flex-col gap-3 p-6 rounded-2xl border border-[#635bff]/30 bg-[#635bff]/4 dark:bg-[#635bff]/10">
                                    <div className="flex items-center gap-2">
                                        <Layers size={18} className="text-[#635bff]" />
                                        <h3 className="font-bold text-[#0a2540] dark:text-white">{t('when.bundle.title')}</h3>
                                    </div>
                                    <ul className="flex flex-col gap-2">
                                        {(['p1', 'p2', 'p3'] as const).map((k) => (
                                            <li key={k} className="flex items-start gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                                <CheckCircle size={14} className="text-[#635bff] shrink-0 mt-0.5" />
                                                {t(`when.bundle.${k}` as Parameters<typeof t>[0])}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How Bundle works */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-5">{t('how.title')}</h2>
                            <div className="flex flex-col gap-3">
                                {(['s1', 's2', 's3', 's4'] as const).map((k, i) => (
                                    <div key={k} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/8 bg-white dark:bg-white/3">
                                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#635bff] text-white text-xs font-bold shrink-0">
                                            {i + 1}
                                        </span>
                                        <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">
                                            {t(`how.${k}` as Parameters<typeof t>[0])}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="rounded-xl border border-[#635bff]/15 bg-[#635bff]/5 dark:bg-[#635bff]/8 dark:border-[#635bff]/20 p-6">
                            <h2 className="text-xl font-bold text-[#0a2540] dark:text-white mb-3">{t('pricing.title')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-[#475569]">Instance</span>
                                    <span className="text-2xl font-extrabold text-[#635bff]">$10<span className="text-sm font-medium text-[#64748b]">/mo</span></span>
                                    <span className="text-sm text-[#425466] dark:text-[#8899a6]">{t('pricing.instanceNote')}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-[#475569]">Bundle / Slot</span>
                                    <span className="text-2xl font-extrabold text-[#635bff]">$15<span className="text-sm font-medium text-[#64748b]">/slot/mo</span></span>
                                    <span className="text-sm text-[#425466] dark:text-[#8899a6]">{t('pricing.bundleNote')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom line */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('conclusion.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('conclusion.desc')}</p>
                        </div>

                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl bg-linear-to-br from-[#635bff] to-[#4f46e5] dark:from-[#1a1040] dark:to-[#2d1b69] p-6 md:p-10 text-center relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/8 blur-2xl" />
                    </div>
                    <h2 className="relative text-xl md:text-2xl font-extrabold text-white mb-4 leading-snug">
                        {t('cta.title')}
                    </h2>
                    <p className="relative text-white/75 mb-6 text-sm">{t('cta.subtitle')}</p>
                    <a
                        href="https://app.nabdaotp.com/en/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-white text-[#635bff] font-bold text-sm md:text-base hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t('cta.button')} <ArrowRight size={16} />
                    </a>
                </div>

                {/* Back link */}
                <BackToArticles/>
            </div>
        </main>
    );
}