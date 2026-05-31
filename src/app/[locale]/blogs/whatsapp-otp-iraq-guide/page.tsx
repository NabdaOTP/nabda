import BackToArticles from '@/components/shared/BackToArticles';
import { Link } from '@/i18n/navigation';
import { AlertCircle, Calendar, CheckCircle, ChevronRight, Clock, Info } from 'lucide-react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// JSON-LD
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Send OTP via WhatsApp API in Iraq & Syria – Complete Guide 2026',
    description: 'Step-by-step guide to sending OTP via WhatsApp API in Iraq and Syria using Nabda OTP.',
    author: { '@type': 'Organization', name: 'Nabda OTP', url: BASE_URL },
    publisher: {
        '@type': 'Organization', name: 'Nabda OTP',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/android-chrome-192x192.png` },
    },
    datePublished: '2026-03-25',
    dateModified: '2026-03-25',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/whatsapp-otp-iraq-guide` },
    image: 'https://cdn.prod.website-files.com/66efa862351a8bef3b48cb70/683b50590a1e6f2c8dab172e_Blog_%20Send%20Otp%20Via%20Whatsapp.webp',
};

//Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'How to Send OTP via WhatsApp API in Iraq & Syria – Complete Guide 2026 | Nabda OTP',
        ar: 'كيفية إرسال OTP عبر WhatsApp API في العراق وسوريا – دليل شامل 2026 | نبضة OTP',
        tr: 'Irak ve Suriye\'de WhatsApp API ile OTP Nasıl Gönderilir – Eksiksiz Kılavuz 2026 | Nabda OTP',
    };

    const descriptions = {
        en: 'Complete 2026 guide to sending OTP via WhatsApp API in Iraq (+964) and Syria (+963) with Nabda OTP. Step-by-step setup, code examples in Node.js, best practices, webhook configuration, and troubleshooting.',
        ar: 'دليل شامل 2026 لإرسال OTP عبر WhatsApp API في العراق (+964) وسوريا (+963) باستخدام نبضة OTP. إعداد خطوة بخطوة، أمثلة كود Node.js، أفضل الممارسات، وإعداد الـ webhook.',
        tr: 'Nabda OTP ile Irak (+964) ve Suriye (+963)\'de WhatsApp API üzerinden OTP göndermeye yönelik eksiksiz 2026 kılavuzu. Adım adım kurulum, Node.js kod örnekleri ve webhook yapılandırması.',
    };

    const keywords = {
        en: 'WhatsApp OTP Iraq, WhatsApp OTP Syria, Nabda OTP API, WhatsApp Business API MENA, OTP verification Iraq, send OTP WhatsApp +964, WhatsApp gateway Iraq Syria, OTP integration guide 2026',
        ar: 'واتساب OTP العراق, واتساب OTP سوريا, Nabda OTP API, إرسال OTP واتساب +964, بوابة واتساب العراق سوريا',
        tr: 'WhatsApp OTP Irak, WhatsApp OTP Suriye, Nabda OTP API, WhatsApp API MENA, OTP doğrulama kılavuzu',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
    const kw = keywords[locale as keyof typeof keywords] ?? keywords.en;

    const canonicalPath = locale === 'en'
        ? `${BASE_URL}/blogs/whatsapp-otp-iraq-guide`
        : `${BASE_URL}/${locale}/blogs/whatsapp-otp-iraq-guide`;

    return {
        title,
        description: desc,
        keywords: kw,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/blogs/whatsapp-otp-iraq-guide`,
                ar: `${BASE_URL}/ar/blogs/whatsapp-otp-iraq-guide`,
                tr: `${BASE_URL}/tr/blogs/whatsapp-otp-iraq-guide`,
                'x-default': `${BASE_URL}/blogs/whatsapp-otp-iraq-guide`,
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
                url: 'https://cdn.prod.website-files.com/66efa862351a8bef3b48cb70/683b50590a1e6f2c8dab172e_Blog_%20Send%20Otp%20Via%20Whatsapp.webp',
                width: 1200,
                height: 630,
                alt: 'How to Send OTP via WhatsApp API in Iraq & Syria — Nabda OTP Guide 2026',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: ['https://cdn.prod.website-files.com/66efa862351a8bef3b48cb70/683b50590a1e6f2c8dab172e_Blog_%20Send%20Otp%20Via%20Whatsapp.webp'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}

// Code block component
function CodeBlock({ code, lang = 'js' }: { code: string; lang?: string }) {
    return (
        <div className="rounded-xl overflow-hidden border border-white/10 my-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] border-b border-white/8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ms-2 text-xs text-[#4a6278] font-mono">{lang}</span>
            </div>
            <pre className="bg-[#0d1b2e] p-5 overflow-x-auto text-[0.875rem] leading-7">
                <code className="text-[#e2e8f0] font-mono">{code}</code>
            </pre>
        </div>
    );
}

// Step badge 
function StepBadge({ n }: { n: number }) {
    return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#635bff] text-white text-xs font-bold shrink-0">
            {n}
        </span>
    );
}

// Page
export default function BlogPostOTPGuide() {
    const t = useTranslations('blogs.blogPost');
    const tNav = useTranslations('nav');

    const selectInstanceCode = `const res = await fetch("https://api.nabdaotp.com/api/v1/auth/select-instance", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ instanceId: "your-instance-id" })
});

const { accessToken } = await res.json();
// Store securely on your backend — never expose to the client`;

    const generateOtpCode = `function generateOTP(length = 6) {
  return Math.floor(
    Math.pow(10, length - 1) +
    Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))
  ).toString();
}

// Store hash (never store plain OTP)
const crypto = require('crypto');
const otp = generateOTP();
const hash = crypto.createHash('sha256').update(otp + secret).digest('hex');`;

    const sendOtpCode = `const payload = {
  phone: "+9647701234567",    // Iraq  (+964)
  // phone: "+9639XXXXXXXX", // Syria (+963)
  message: \`Your Nabda verification code is \${otp}. Valid for 5 minutes. Do not share it.\`
};

const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${instanceToken}\`
  },
  body: JSON.stringify(payload)
});

const result = await response.json();
if (result.success) {
  console.log("✓ OTP sent via WhatsApp");
}`;

    const verifyOtpCode = `// On form submission — verify on the BACKEND, never the client
function verifyOTP(userInput, storedHash, secret) {
  const inputHash = crypto
    .createHash('sha256')
    .update(userInput + secret)
    .digest('hex');
  return inputHash === storedHash;
}`;

    const webhookCode = `await fetch("https://api.nabdaotp.com/api/v1/instances/webhook", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${instanceToken}\`
  },
  body: JSON.stringify({
    webhookUrl: "https://yourdomain.com/webhook/nabda",
    webhookEnabled: true
  })
});

// Your webhook handler receives events like:
// { event: "message.sent", phone: "+964...", status: "delivered" }`;

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero band */}
            <div className="relative overflow-hidden pt-20 pb-12 bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
                </div>
                <div className="relative max-w-[860px] mx-auto px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">{tNav('home')}</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-[#635bff] transition-colors">{tNav('blogs')}</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0a2540] dark:text-white font-medium">{t('breadcrumb')}</span>
                    </nav>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] dark:text-[#a89fff] text-xs font-bold border border-[#635bff]/20">
                            {t('badge')}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Calendar size={14} /> {t('date')}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Clock size={14} /> {t('readingTime')}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5 text-[#0a2540] dark:text-white">
                        {t('title')}
                    </h1>

                    {/* Excerpt */}
                    <p
                        className="text-lg leading-relaxed text-[#425466] dark:text-[#8899a6]"
                        dangerouslySetInnerHTML={{ __html: t('excerpt') }}
                    />
                </div>
            </div>

            {/* Article body */}
            <div className="max-w-215 mx-auto px-6 py-12">
                <div className="rounded-2xl border bg-white border-gray-100 shadow-sm dark:bg-white/4 dark:border-white/8 overflow-hidden">
                    <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />
                    <div className="p-8 md:p-10">

                        {/* Section 1 */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3">{t('section1.title')}</h2>
                        <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-6">{t('section1.desc')}</p>

                        {/* Section 2 */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4 mt-10">{t('section2.title')}</h2>
                        <ul className="flex flex-col gap-2.5 mb-6">
                            {(['item1', 'item2', 'item3', 'item4'] as const).map((k, i) => (
                                <li key={k} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-[#00d4aa] shrink-0 mt-0.5" />
                                    <span className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">
                                        {t(`section2.${k}` as Parameters<typeof t>[0])}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Section 3 — Steps */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-6 mt-10">{t('section3.title')}</h2>

                        {/* Step 1 */}
                        <div className="flex items-center gap-3 mb-3">
                            <StepBadge n={1} />
                            <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('section3.step1')}</h3>
                        </div>
                        <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6] mb-1 ps-10">
                            {t('section3.step1Desc')}
                        </p>
                        <CodeBlock code={selectInstanceCode} lang="api/v1/auth/select-instance" />

                        {/* Step 2 */}
                        <div className="flex items-center gap-3 mb-3 mt-8">
                            <StepBadge n={2} />
                            <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('section3.step2')}</h3>
                        </div>
                        <CodeBlock code={generateOtpCode} lang="backend (Node.js)" />

                        {/* Step 3 */}
                        <div className="flex items-center gap-3 mb-3 mt-8">
                            <StepBadge n={3} />
                            <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('section3.step3')}</h3>
                        </div>
                        <CodeBlock code={sendOtpCode} lang="api/v1/messages/send" />

                        {/* Step 4 */}
                        <div className="flex items-center gap-3 mb-3 mt-8">
                            <StepBadge n={4} />
                            <h3 className="text-lg font-bold text-[#0a2540] dark:text-white">{t('section3.step4')}</h3>
                        </div>
                        <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6] mb-1 ps-10">
                            {t('section3.step4Desc')}
                        </p>
                        <CodeBlock code={verifyOtpCode} lang="verify OTP" />

                        {/* Section 4 — Webhook */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4 mt-10">{t('section4.title')}</h2>
                        <CodeBlock code={webhookCode} lang="api/v1/instances/webhook" />

                        {/* Section 5 — Best practices */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4 mt-10">{t('section5.title')}</h2>
                        <ul className="flex flex-col gap-2.5 mb-6">
                            {(['item1', 'item2', 'item3', 'item4', 'item5'] as const).map((k) => (
                                <li key={k} className="flex items-start gap-3">
                                    <Info size={16} className="text-[#635bff] shrink-0 mt-1" />
                                    <span
                                        className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]"
                                        dangerouslySetInnerHTML={{ __html: t(`section5.${k}` as Parameters<typeof t>[0]) }}
                                    />
                                </li>
                            ))}
                        </ul>

                        {/* Section 6 — Troubleshooting */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-4 mt-10">{t('section6.title')}</h2>
                        <div className="flex flex-col gap-3 mb-6">
                            {['item1', 'item2', 'item3'].map((key) => (
                                <div key={key} className="flex items-start gap-3">
                                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                                    <p
                                        className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]"
                                        dangerouslySetInnerHTML={{ __html: t.raw(`section6.${key}` as Parameters<typeof t>[0]) }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Section 7 */}
                        <h2 className="text-2xl font-bold text-[#0a2540] dark:text-white mb-3 mt-10">{t('section7.title')}</h2>
                        <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6]">{t('section7.desc')}</p>

                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 rounded-2xl bg-linear-to-br from-[#635bff] to-[#4f46e5] dark:from-[#1a1040] dark:to-[#2d1b69] p-6 md:p-10 text-center relative overflow-hidden">
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