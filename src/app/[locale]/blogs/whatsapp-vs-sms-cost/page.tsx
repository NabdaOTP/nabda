import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
    ChevronRight, ArrowLeft, ArrowRight,
    Clock, Calendar, TrendingDown, DollarSign,
    CheckCircle, AlertTriangle, BarChart3,
    ChevronLeft,
} from 'lucide-react';
import BackToArticles from '@/components/shared/BackToArticles';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'WhatsApp API vs SMS OTP: Real Cost Comparison for MENA 2026',
    description: 'A detailed cost breakdown comparing WhatsApp OTP to traditional SMS for businesses in Iraq, Egypt, Saudi Arabia and MENA.',
    author: { '@type': 'Organization', name: 'Nabda OTP', url: BASE_URL },
    publisher: {
        '@type': 'Organization', name: 'Nabda OTP',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/android-chrome-192x192.png` },
    },
    datePublished: '2026-05-01',
    dateModified: '2026-05-01',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/whatsapp-vs-sms-cost` },
    image: `${BASE_URL}/assets/blog/whatsapp-vs-sms.webp`,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'WhatsApp API vs SMS OTP: Real Cost Comparison for MENA 2026 | Nabda OTP',
        ar: 'WhatsApp API مقابل SMS OTP: مقارنة تكلفة حقيقية لمنطقة الشرق الأوسط 2026 | نبضة OTP',
        tr: 'WhatsApp API vs SMS OTP: MENA 2026 Gerçek Maliyet Karşılaştırması | Nabda OTP',
    };

    const descriptions = {
        en: 'A detailed cost breakdown comparing WhatsApp OTP via Nabda ($10/month flat) to traditional SMS pricing in Iraq, Egypt, Saudi Arabia and the wider MENA region. Real numbers, real savings.',
        ar: 'مقارنة تفصيلية لتكلفة WhatsApp OTP عبر نبضة (10 دولار/شهر ثابت) مقابل أسعار SMS التقليدية في العراق ومصر والسعودية ومنطقة الشرق الأوسط. أرقام حقيقية، وفورات حقيقية.',
        tr: 'Nabda aracılığıyla WhatsApp OTP ($10/ay sabit) ile Irak, Mısır, Suudi Arabistan ve MENA bölgesindeki geleneksel SMS fiyatlandırmasının ayrıntılı maliyet karşılaştırması.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath = locale === 'en'
        ? `${BASE_URL}/blogs/whatsapp-vs-sms-cost`
        : `${BASE_URL}/${locale}/blogs/whatsapp-vs-sms-cost`;

    return {
        title,
        description: desc,
        keywords: 'WhatsApp OTP vs SMS cost, OTP pricing MENA, Iraq SMS price, WhatsApp API price, Nabda OTP cost, cheapest OTP MENA 2026, SMS alternative MENA',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/blogs/whatsapp-vs-sms-cost`,
                ar: `${BASE_URL}/ar/blogs/whatsapp-vs-sms-cost`,
                tr: `${BASE_URL}/tr/blogs/whatsapp-vs-sms-cost`,
                'x-default': `${BASE_URL}/blogs/whatsapp-vs-sms-cost`,
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
                url: `${BASE_URL}/assets/blog/whatsapp-vs-sms.webp`,
                width: 1200,
                height: 630,
                alt: 'WhatsApp API vs SMS Cost Comparison MENA 2026 — Nabda OTP',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/blog/whatsapp-vs-sms.webp`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}

// Cost Calculator (visual only, static) 
function CostRow({
    msgs, smsTotal, whatsappTotal
}: { msgs: string; smsTotal: string; whatsappTotal: string }) {
    const waWins = true;
    return (
        <tr className="border-t border-gray-100 dark:border-white/8">
            <td className="px-5 py-3.5 text-sm font-medium text-[#0a2540] dark:text-[#94a3b8]">{msgs}</td>
            <td className="px-5 py-3.5 text-sm text-red-500 dark:text-red-400 font-semibold">{smsTotal}</td>
            <td className="px-5 py-3.5 text-sm text-[#00a88a] dark:text-[#00d4aa] font-bold">{whatsappTotal}</td>
        </tr>
    );
}

export default async function BlogWhatsAppVsSMSCost({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogs.costPost' });
    const tb = await getTranslations({ locale, namespace: 'blogs.blogPost' });

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div className="relative overflow-hidden pt-20 pb-12 bg-linear-to-br from-white via-[#f0fff8] to-[#dcfce7] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#00d4aa]/10 blur-[100px] dark:bg-[#00d4aa]/8" />
                </div>
                <div className="relative max-w-[860px] mx-auto px-6">
                    <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-[#635bff] transition-colors">Blog</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0a2540] dark:text-white font-medium">WhatsApp vs SMS Cost</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400 text-xs font-bold border border-purple-100 dark:border-purple-500/20">
                            Comparison
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Calendar size={14} /> May 1, 2026
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Clock size={14} /> 6 min read
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
            <div className="max-w-[860px] mx-auto px-6 py-12 flex flex-col gap-6">
                <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">
                    <div className="h-1 bg-linear-to-r from-[#00d4aa] to-[#635bff]" />
                    <div className="p-8 md:p-10 flex flex-col gap-10">

                        {/* Intro */}
                        <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('intro')}</p>

                        {/* Quick summery box */}
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#635bff]/5 border border-[#635bff]/15 dark:bg-[#635bff]/8 dark:border-[#635bff]/20">
                            <BarChart3 size={22} className="text-[#635bff] shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-[#0a2540] dark:text-white mb-1">{t('qsummery')}</p>
                                <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">{t('tldr')}</p>
                            </div>
                        </div>

                        {/* Section 1: SMS pricing */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4">{t('sms.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-5">{t('sms.desc')}</p>

                            {/* SMS price table */}
                            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/8">
                                <table className="w-full text-sm min-w-[480px]">
                                    <thead>
                                        <tr className="bg-[#0a2540] dark:bg-[#0d1b2e]">
                                            {[t('table.country'), t('table.smsPrice'), t('table.monthly1k'), t('table.monthly10k')].map((h) => (
                                                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#8899a6]">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { country: '🇮🇶 Iraq', price: '~$0.050/msg', k1: '$50', k10: '$500' },
                                            { country: '🇸🇾 Syria', price: '~$0.060/msg', k1: '$60', k10: '$600' },
                                            { country: '🇪🇬 Egypt', price: '~$0.025/msg', k1: '$25', k10: '$250' },
                                            { country: '🇸🇦 Saudi Arabia', price: '~$0.035/msg', k1: '$35', k10: '$350' },
                                            { country: '🇦🇪 UAE', price: '~$0.040/msg', k1: '$40', k10: '$400' },
                                        ].map((row, i) => (
                                            <tr key={row.country} className={`border-t border-gray-100 dark:border-white/8 ${i % 2 === 0 ? '' : 'bg-gray-50/60 dark:bg-white/2'}`}>
                                                <td className="px-5 py-3.5 text-sm font-medium text-[#0a2540] dark:text-[#94a3b8]">{row.country}</td>
                                                <td className="px-5 py-3.5 text-sm text-red-500 dark:text-red-400">{row.price}</td>
                                                <td className="px-5 py-3.5 text-sm text-[#425466] dark:text-[#8899a6]">{row.k1}</td>
                                                <td className="px-5 py-3.5 text-sm text-[#425466] dark:text-[#8899a6]">{row.k10}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#94a3b8] sm:hidden">
                                <ChevronLeft size={12} />
                                <span>Scroll to see more</span>
                                <ChevronRight size={12} />
                            </div>
                            <p className="text-xs text-[#94a3b8] dark:text-[#475569] mt-2 ps-1">{t('sms.note')}</p>
                        </div>

                        {/* Section 2: Nabda pricing */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4">{t('nabda.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-5">{t('nabda.desc')}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Standard */}
                                <div className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-white/3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-[#475569]">Standard Instance</span>
                                    <span className="text-3xl font-extrabold text-[#635bff]">$10<span className="text-base font-medium text-[#64748b]">/mo</span></span>
                                    <ul className="flex flex-col gap-1.5">
                                        {[t('nabda.s1'), t('nabda.s2'), t('nabda.s3')].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                                <CheckCircle size={13} className="text-[#00d4aa] shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Annual */}
                                <div className="flex flex-col gap-3 p-6 rounded-2xl border-2 border-[#635bff]/40 bg-[#635bff]/4 dark:bg-[#635bff]/8">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#635bff] dark:text-[#a89fff]">Annual Plan</span>
                                    <span className="text-3xl font-extrabold text-[#635bff]">$110<span className="text-base font-medium text-[#64748b]">/yr</span></span>
                                    <ul className="flex flex-col gap-1.5">
                                        {[t('nabda.a1'), t('nabda.a2'), t('nabda.a3')].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                                <CheckCircle size={13} className="text-[#635bff] shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Cost comparison */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4">{t('comparison.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-5">{t('comparison.desc')}</p>

                            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/8">
                                <table className="w-full text-sm min-w-[420px]">
                                    <thead>
                                        <tr className="bg-[#0a2540] dark:bg-[#0d1b2e]">
                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#8899a6]">{t('comparison.msgs')}</th>
                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-red-400">{t('comparison.smsCost')}</th>
                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#00d4aa]">{t('comparison.nabdaCost')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CostRow msgs="500 msg/mo" smsTotal="~$25" whatsappTotal="$10 ✅" />
                                        <CostRow msgs="1,000 msg/mo" smsTotal="~$50" whatsappTotal="$10 ✅" />
                                        <CostRow msgs="5,000 msg/mo" smsTotal="~$250" whatsappTotal="$10 ✅" />
                                        <CostRow msgs="10,000 msg/mo" smsTotal="~$500" whatsappTotal="$10 ✅" />
                                        <CostRow msgs="50,000 msg/mo" smsTotal="~$2,500" whatsappTotal="$10 ✅" />
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#94a3b8] sm:hidden">
                                <ChevronLeft size={12} />
                                <span>Scroll to see more</span>
                                <ChevronRight size={12} />
                            </div>
                            <p className="text-xs text-[#94a3b8] dark:text-[#475569] mt-2 ps-1">{t('comparison.note')}</p>
                        </div>

                        {/* Section 4: Beyond cost */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-5">{t('beyond.title')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: TrendingDown, color: '#635bff', k: 'b1' },
                                    { icon: CheckCircle, color: '#00d4aa', k: 'b2' },
                                    { icon: DollarSign, color: '#f59e0b', k: 'b3' },
                                    { icon: AlertTriangle, color: '#3b82f6', k: 'b4' },
                                ].map(({ icon: Icon, color, k }) => (
                                    <div key={k} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 dark:border-white/8 bg-white dark:bg-white/3">
                                        <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ backgroundColor: `${color}15`, color }}>
                                            <Icon size={18} strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#0a2540] dark:text-white mb-0.5">
                                                {t(`beyond.${k}Title` as Parameters<typeof t>[0])}
                                            </p>
                                            <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">
                                                {t(`beyond.${k}Desc` as Parameters<typeof t>[0])}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* When SMS still makes sense */}
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-100 dark:bg-amber-500/8 dark:border-amber-500/20">
                            <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-[#0a2540] dark:text-white mb-1">{t('smsStillWorks.title')}</p>
                                <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">{t('smsStillWorks.desc')}</p>
                            </div>
                        </div>

                        {/* Conclusion */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('conclusion.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('conclusion.desc')}</p>
                        </div>

                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-2xl bg-linear-to-br from-[#635bff] to-[#4f46e5] p-10 text-center relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/8 blur-2xl" />
                    </div>
                    <h2 className="relative text-2xl font-extrabold text-white mb-2">{t('cta.title')}</h2>
                    <p className="relative text-white/75 mb-6 text-sm">{t('cta.subtitle')}</p>
                    <a
                        href="https://dash.nabdaotp.com/en/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#635bff] font-bold hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t('cta.button')} <ArrowRight size={16} />
                    </a>
                </div>

                {/* Back link */}
                <BackToArticles />
            </div>
        </main>
    );
}