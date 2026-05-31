import BackToArticles from '@/components/shared/BackToArticles';
import { Link } from '@/i18n/navigation';
import {
    AlertTriangle,
    ArrowRight,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    XCircle
} from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Top 5 WhatsApp OTP Mistakes Developers Make (and How to Fix Them)',
    description: 'Avoid the most common pitfalls when integrating WhatsApp OTP with Nabda API — from wrong phone formats to missing webhook handlers.',
    author: { '@type': 'Organization', name: 'Nabda OTP', url: BASE_URL },
    publisher: {
        '@type': 'Organization', name: 'Nabda OTP',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/android-chrome-192x192.png` },
    },
    datePublished: '2026-04-20',
    dateModified: '2026-04-20',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blogs/whatsapp-otp-mistakes` },
    image: `${BASE_URL}/assets/blog/otp-mistakes.webp`,
};

// meta data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Top 5 WhatsApp OTP Mistakes Developers Make (and How to Fix Them) | Nabda OTP',
        ar: 'أكثر 5 أخطاء يقع فيها المطورون عند تكامل WhatsApp OTP — وكيفية إصلاحها | نبضة OTP',
        tr: 'Geliştiricilerin Yaptığı En Yaygın 5 WhatsApp OTP Hatası (ve Nasıl Düzeltilir) | Nabda OTP',
    };

    const descriptions = {
        en: 'Avoid the most common WhatsApp OTP integration mistakes when using Nabda API — wrong phone formats, missing instance tokens, insecure OTP storage, no rate limiting, and missing webhook monitoring.',
        ar: 'تجنب أكثر الأخطاء شيوعاً عند تكامل WhatsApp OTP مع Nabda API — صيغ الأرقام الخاطئة، وtoken الـ instance المفقود، وتخزين OTP غير الآمن، وغياب الـ webhook.',
        tr: 'Nabda API ile WhatsApp OTP entegrasyonunda en yaygın hatalardan kaçının — yanlış telefon formatları, eksik instance token, güvensiz OTP depolama ve webhook eksikliği.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath = locale === 'en'
        ? `${BASE_URL}/blogs/whatsapp-otp-mistakes`
        : `${BASE_URL}/${locale}/blogs/whatsapp-otp-mistakes`;

    return {
        title,
        description: desc,
        keywords: 'WhatsApp OTP mistakes, Nabda OTP integration, OTP developer tips, WhatsApp API errors, E.164 format, webhook OTP, instance token, OTP security',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/blogs/whatsapp-otp-mistakes`,
                ar: `${BASE_URL}/ar/blogs/whatsapp-otp-mistakes`,
                tr: `${BASE_URL}/tr/blogs/whatsapp-otp-mistakes`,
                'x-default': `${BASE_URL}/blogs/whatsapp-otp-mistakes`,
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
                url: `${BASE_URL}/assets/blog/otp-mistakes.webp`,
                width: 1200,
                height: 630,
                alt: 'Top 5 WhatsApp OTP Mistakes — Nabda OTP',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/blog/otp-mistakes.webp`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    };
}

// Code block 
function CodeBlock({ code, label }: { code: string; label?: string }) {
    return (
        <div className="rounded-xl overflow-hidden border border-white/10 my-4">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] border-b border-white/8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                {label && <span className="ms-2 text-xs text-[#4a6278] font-mono">{label}</span>}
            </div>
            <pre className="bg-[#0d1b2e] p-5 overflow-x-auto text-[0.875rem] leading-7">
                <code className="text-[#e2e8f0] font-mono whitespace-pre">{code}</code>
            </pre>
        </div>
    );
}

export default async function BlogOTPMistakes({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogs.mistakesPost' });
    const tb = await getTranslations({ locale, namespace: 'blogs.blogPost' });

    const mistakes = [
        {
            key: 'mistake1',
            wrong: `// ❌ Wrong — missing country code
const phone = "07701234567";

await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  body: JSON.stringify({ phone, message: "Your OTP: 123456" })
});`,
            fix: `// ✅ Correct — E.164 format
const phone = "+9647701234567"; // Iraq
// const phone = "+9639XXXXXXXX"; // Syria
// const phone = "+201XXXXXXXXX"; // Egypt

await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  body: JSON.stringify({ phone, message: "Your OTP: 123456" })
});`,
        },
        {
            key: 'mistake2',
            wrong: `// ❌ Wrong — using global Nabda token, not instance token
const res = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  headers: { "Authorization": \`Bearer \${globalApiToken}\` }
});
// Result: 401 Unauthorized`,
            fix: `// ✅ Correct — select instance first, then use instance token
const selectRes = await fetch(
  "https://api.nabdaotp.com/api/v1/auth/select-instance",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ instanceId: "your-instance-id" })
  }
);
const { accessToken } = await selectRes.json();

// Now use accessToken for messages
const res = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  headers: { "Authorization": \`Bearer \${accessToken}\` }
});`,
        },
        {
            key: 'mistake3',
            wrong: `// ❌ Wrong — storing plain OTP and verifying on the client
const otp = "482917";
localStorage.setItem("otp", otp); // NEVER DO THIS

// Client-side verification — easily bypassed
if (userInput === localStorage.getItem("otp")) {
  allowLogin();
}`,
            fix: `// ✅ Correct — hash on backend, verify on backend
import crypto from "crypto";

const SECRET = process.env.OTP_SECRET;
const otp    = generateOTP(); // e.g. "482917"
const hash   = crypto.createHash("sha256")
                 .update(otp + SECRET)
                 .digest("hex");

// Store hash + expiry in DB, never the plain OTP
await db.otpStore.set(userId, { hash, expiresAt: Date.now() + 5 * 60 * 1000 });

// On verification — backend only
function verifyOTP(input, storedHash) {
  const inputHash = crypto.createHash("sha256")
    .update(input + SECRET).digest("hex");
  return inputHash === storedHash;
}`,
        },
        {
            key: 'mistake4',
            wrong: `// ❌ Wrong — no expiry, no rate limiting
// OTP stored forever, brute-forceable

app.post("/verify", (req, res) => {
  const { otp } = req.body;
  if (otp === storedOtp) { // stored without expiry
    res.json({ success: true });
  }
});`,
            fix: `// ✅ Correct — expiry check + rate limiting
const MAX_ATTEMPTS = 5;
const OTP_TTL_MS   = 5 * 60 * 1000; // 5 minutes

app.post("/verify", rateLimiter({ max: MAX_ATTEMPTS, window: "15m" }), async (req, res) => {
  const record = await db.otpStore.get(userId);

  if (!record) return res.status(400).json({ error: "OTP expired or not found" });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: "OTP expired" });
  if (!verifyOTP(req.body.otp, record.hash)) return res.status(400).json({ error: "Invalid OTP" });

  await db.otpStore.delete(userId); // single-use
  res.json({ success: true });
});`,
        },
        {
            key: 'mistake5',
            wrong: `// ❌ Wrong — not handling instance disconnection
// Instance QR expires or WhatsApp disconnects — messages silently fail
// No alert, no fallback, users never receive their OTP`,
            fix: `// ✅ Correct — configure webhook + monitor instance status
// 1. Set up webhook on Nabda dashboard or via API:
await fetch("https://api.nabdaotp.com/api/v1/instances/webhook", {
  method: "PATCH",
  headers: { "Authorization": \`Bearer \${instanceToken}\` },
  body: JSON.stringify({
    webhookUrl: "https://yourdomain.com/nabda/webhook",
    webhookEnabled: true
  })
});

// 2. Handle events in your webhook handler:
app.post("/nabda/webhook", (req, res) => {
  const { event, status } = req.body;

  if (event === "instance.disconnected") {
    // Alert your team — re-scan QR code required
    notifyTeam("Nabda instance disconnected — OTP delivery paused");
  }

  if (event === "message.failed") {
    // Log and retry or fallback to SMS
    handleDeliveryFailure(req.body);
  }

  res.sendStatus(200);
});`,
        },
    ];

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div className="relative overflow-hidden pt-20 pb-12 bg-linear-to-br from-white via-[#fff5f5] to-[#ffe4e4] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-400/10 blur-[100px] dark:bg-orange-500/10" />
                </div>
                <div className="relative max-w-[860px] mx-auto px-6">
                    <nav className="flex items-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569] flex-wrap">
                        <Link href="/" className="hover:text-[#635bff] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/blogs" className="hover:text-[#635bff] transition-colors">Blog</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#0a2540] dark:text-white font-medium">OTP Mistakes</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400 text-xs font-bold border border-orange-100 dark:border-orange-500/20">
                            Developer
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Calendar size={14} /> April 20, 2026
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#64748b] dark:text-[#475569]">
                            <Clock size={14} /> 7 min read
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
                    <div className="h-1 bg-linear-to-r from-orange-400 to-[#635bff]" />
                    <div className="p-8 md:p-10 flex flex-col gap-1">

                        <p className="text-[1rem] leading-[1.85] text-[#425466] dark:text-[#8899a6] mb-8">
                            {t('intro')}
                        </p>

                        {/* 5 Mistakes */}
                        {mistakes.map(({ key, wrong, fix }, i) => (
                            <div key={key} className="mb-10">
                                {/* Number + title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-500/15 shrink-0">
                                        <AlertTriangle size={18} className="text-orange-500" />
                                    </span>
                                    <h2 className="text-xl font-bold text-[#0a2540] dark:text-white">
                                        #{i + 1} — {t(`${key}.title` as Parameters<typeof t>[0])}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6] mb-4 ps-12">
                                    {t(`${key}.desc` as Parameters<typeof t>[0])}
                                </p>

                                {/* Wrong */}
                                <div className="ps-12">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <XCircle size={15} className="text-red-500 shrink-0" />
                                        <span className="text-sm font-semibold text-red-500">{t('labels.wrong')}</span>
                                    </div>
                                    <CodeBlock code={wrong} label="❌ avoid" />
                                </div>

                                {/* Fix */}
                                <div className="ps-12">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <CheckCircle size={15} className="text-[#00d4aa] shrink-0" />
                                        <span className="text-sm font-semibold text-[#00a88a] dark:text-[#00d4aa]">{t('labels.fix')}</span>
                                    </div>
                                    <CodeBlock code={fix} label="✅ correct" />
                                </div>

                                {/* Tip box */}
                                <div className="ps-12 mt-3">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#635bff]/5 border border-[#635bff]/15 dark:bg-[#635bff]/8 dark:border-[#635bff]/20">
                                        <span className="text-[#635bff] text-lg shrink-0">💡</span>
                                        <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">
                                            {t(`${key}.tip` as Parameters<typeof t>[0])}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider between mistakes */}
                                {i < 4 && <hr className="mt-10 border-gray-100 dark:border-white/8" />}
                            </div>
                        ))}

                        {/* Summary checklist  */}
                        <div className="rounded-xl border border-[#00d4aa]/20 bg-[#00d4aa]/5 dark:bg-[#00d4aa]/8 p-6 mt-4">
                            <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-4">{t('checklist.title')}</h2>
                            <ul className="flex flex-col gap-2.5">
                                {(['c1', 'c2', 'c3', 'c4', 'c5'] as const).map((k) => (
                                    <li key={k} className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-[#00d4aa] shrink-0 mt-0.5" />
                                        <span className="text-sm text-[#425466] dark:text-[#8899a6]">
                                            {t(`checklist.${k}` as Parameters<typeof t>[0])}
                                        </span>
                                    </li>
                                ))}
                            </ul>
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
                        href="https://app.nabda-otp.com/en/login"
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