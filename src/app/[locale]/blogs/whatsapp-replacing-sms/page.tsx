import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
    ChevronRight, ArrowLeft, Clock, Calendar,
    TrendingUp, CheckCircle, Users, Zap, ShieldCheck, Star,
} from 'lucide-react';
import BackToArticles from '@/components/shared/BackToArticles';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// JSON-LD 
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Why WhatsApp OTP is Replacing SMS in the Middle East – Trends & Statistics 2026',
    description: 'Market trends and practical comparisons between WhatsApp OTP and SMS OTP in key MENA countries.',
    author: { '@type': 'Organization', name: 'Nabda OTP', url: BASE_URL },
    publisher: {
        '@type': 'Organization', name: 'Nabda OTP',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/android-chrome-192x192.png` },
    },
    datePublished: '2026-03-15',
    dateModified: '2026-03-15',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/whatsapp-replacing-sms` },
    image: 'https://mojoauth.com/how-whatsapp-otp-works.webp',
};

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Why WhatsApp OTP is Replacing SMS in the Middle East – Trends & Statistics 2026 | Nabda OTP',
        ar: 'لماذا يحل WhatsApp OTP محل SMS في الشرق الأوسط – الاتجاهات والإحصاءات 2026 | نبضة OTP',
        tr: 'WhatsApp OTP Neden Orta Doğu\'da SMS\'in Yerini Alıyor – Trendler ve İstatistikler 2026 | Nabda OTP',
    };

    const descriptions = {
        en: '2026 analysis of why businesses in Iraq, Syria, Egypt, and Saudi Arabia are shifting from SMS OTP to WhatsApp OTP — with delivery rate comparisons, cost models, and real-world performance data from Nabda OTP customers.',
        ar: 'تحليل 2026 لأسباب تحول الشركات في العراق وسوريا ومصر والسعودية من SMS OTP إلى WhatsApp OTP — مع مقارنات معدلات التوصيل ونماذج التكلفة وبيانات الأداء الحقيقية من عملاء نبضة OTP.',
        tr: 'Irak, Suriye, Mısır ve Suudi Arabistan\'daki işletmelerin SMS OTP\'den WhatsApp OTP\'ye geçişinin nedenlerinin 2026 analizi — teslimat oranı karşılaştırmaları ve maliyet modelleri ile.',
    };

    const keywords = {
        en: 'WhatsApp OTP vs SMS, OTP Middle East, Iraq OTP API, Egypt Saudi OTP, WhatsApp Business API trends 2026, SMS replacement MENA, WhatsApp delivery rate Iraq Syria',
        ar: 'واتساب OTP مقابل SMS, OTP الشرق الأوسط, واتساب API العراق مصر السعودية, اتجاهات 2026, بديل SMS MENA',
        tr: 'WhatsApp OTP vs SMS, OTP Orta Doğu, Irak OTP API, WhatsApp API trendleri 2026, MENA SMS alternatifi',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
    const kw = keywords[locale as keyof typeof keywords] ?? keywords.en;

    const canonicalPath = locale === 'en'
        ? `${BASE_URL}/blogs/whatsapp-replacing-sms`
        : `${BASE_URL}/${locale}/blogs/whatsapp-replacing-sms`;

    return {
        title,
        description: desc,
        keywords: kw,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/blogs/whatsapp-replacing-sms`,
                ar: `${BASE_URL}/ar/blogs/whatsapp-replacing-sms`,
                tr: `${BASE_URL}/tr/blogs/whatsapp-replacing-sms`,
                'x-default': `${BASE_URL}/blogs/whatsapp-replacing-sms`,
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
                url: 'https://mojoauth.com/how-whatsapp-otp-works.webp',
                width: 1200,
                height: 630,
                alt: 'Why WhatsApp OTP is Replacing SMS in MENA 2026 — Nabda OTP',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: ['https://mojoauth.com/how-whatsapp-otp-works.webp'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}

// Advantage card 
function AdvantageCard({
    icon: Icon,
    color,
    children,
}: {
    icon: React.ElementType;
    color: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-4 p-5 rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8">
            <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ backgroundColor: `${color}15`, color }}
            >
                <Icon size={20} strokeWidth={1.75} />
            </div>
            <p
                className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]"
                dangerouslySetInnerHTML={{ __html: String(children) }}
            />
        </div>
    );
}

// Stat card 
function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-white border-gray-100 dark:bg-white/4 dark:border-white/8">
            <span className="text-3xl font-extrabold text-[#635bff] dark:text-[#a89fff] mb-1">{value}</span>
            <span className="text-sm text-[#64748b] dark:text-[#8899a6] leading-snug">{label}</span>
        </div>
    );
}

// Page 
export default function BlogPostWhatsAppReplacingSMS() {
    const t = useTranslations('blogs.blogPost2');

    const ADVANTAGES = [
        { icon: TrendingUp, color: '#635bff', key: 'item1' },
        { icon: Zap, color: '#00d4aa', key: 'item2' },
        { icon: Users, color: '#3b82f6', key: 'item3' },
        { icon: CheckCircle, color: '#10b981', key: 'item4' },
        { icon: ShieldCheck, color: '#f59e0b', key: 'item5' },
    ] as const;

    const HOW_STEPS = ['item1', 'item2', 'item3', 'item4'] as const;

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero band */}
            <div className="relative overflow-hidden pt-20 pb-12 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
                </div>
                <div className="relative max-w-215 mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-[#635bff] transition-colors">Blog</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0a2540] dark:text-white font-medium">WhatsApp vs SMS</span>
                    </nav>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d4aa]/10 text-[#00a88a] dark:text-[#00d4aa] text-xs font-bold border border-[#00d4aa]/20">
                            Trends
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Calendar size={14} /> March 15, 2026
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Clock size={14} /> 6 min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5 text-[#0a2540] dark:text-white">
                        {t('title')}
                    </h1>
                    <p className="text-lg leading-relaxed text-[#425466] dark:text-[#8899a6]">
                        {t('excerpt')}
                    </p>
                </div>
            </div>

            {/* Article body */}
            <div className="max-w-[860px] mx-auto px-6 py-12 flex flex-col gap-6">

                {/* Card wrapper */}
                <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">
                    <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />
                    <div className="p-8 md:p-10 flex flex-col gap-8">

                        {/* Section 1 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4">{t('section1.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-3">{t('section1.desc1')}</p>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('section1.desc2')}</p>
                        </div>

                        <hr className="border-gray-100 dark:border-white/8" />

                        {/* Section 2 — Advantages */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-5">{t('section2.title')}</h2>
                            <div className="flex flex-col gap-3">
                                {ADVANTAGES.map(({ icon, color, key }) => (
                                    <AdvantageCard key={key} icon={icon} color={color}>
                                        {t.raw(`section2.${key}` as Parameters<typeof t>[0]) as string}
                                    </AdvantageCard>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-white/8" />

                        {/* Section 3 — Stats */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('section3.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-5">{t('section3.intro')}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <StatCard value="40%" label={t('section3.item1')} />
                                <StatCard value="~90%" label={t('section3.item2')} />
                                <StatCard value="<5s" label={t('section3.item3')} />
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-white/8" />

                        {/* Section 4 — How Nabda */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('section4.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-5">{t('section4.desc')}</p>
                            <div className="flex flex-col gap-3">
                                {HOW_STEPS.map((key, i) => (
                                    <div key={key} className="flex items-start gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#635bff] text-white text-xs font-bold shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <p
                                            className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]"
                                            dangerouslySetInnerHTML={{ __html: t.raw(`section4.${key}` as Parameters<typeof t>[0]) as string }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-100 dark:border-white/8" />

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('section5.title')}</h2>
                            <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('section5.desc')}</p>
                        </div>

                        {/* Section 6 — Bottom Line */}
                        <div className="rounded-xl border border-[#635bff]/15 bg-[#635bff]/5 dark:bg-[#635bff]/8 dark:border-[#635bff]/20 p-6 flex items-start gap-3">
                            <Star size={20} className="text-[#635bff] shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-2">{t('section6.title')}</h2>
                                <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">{t('section6.desc')}</p>
                            </div>
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
                    <a
                        href="https://app.nabda-otp.com/en/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-white text-[#635bff] font-bold text-sm md:text-base hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t('cta.button')}
                    </a>
                </div>

                {/* Back link */}
                <BackToArticles/>

            </div>
        </main>
    );
}