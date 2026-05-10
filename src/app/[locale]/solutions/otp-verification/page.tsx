import SolutionHero from '@/components/solutions/SolutionHero';
import StatsBar from '@/components/solutions/StatsBar';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import SolutionWhySection from '@/components/solutions/SolutionWhySection';
import HowItWorksSteps from '@/components/solutions/HowItWorksSteps';
import CodeExample from '@/components/solutions/CodeExample';
import UseCasesList from '@/components/solutions/UseCasesList';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import { Lock } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'OTP & User Verification via WhatsApp — Instant, Reliable, Affordable | Nabda OTP',
        ar: 'التحقق بـ OTP عبر واتساب — سريع، موثوق، اقتصادي | نبضة OTP',
        tr: 'WhatsApp ile OTP ve Kullanıcı Doğrulama — Hızlı, Güvenilir | Nabda OTP',
    };

    const descriptions = {
        en: 'Send instant OTP and user verification codes via WhatsApp to Iraq (+964), Syria (+963), and all MENA countries with Nabda OTP. No templates. No Meta approval. Simple REST API with 98% delivery rate in under 3 seconds. Starting at $10/month unlimited.',
        ar: 'أرسل رموز التحقق OTP عبر واتساب للعراق (+964) وسوريا (+963) ودول الشرق الأوسط. بدون قوالب، بدون موافقة ميتا. API بسيط مع نسبة تسليم 98% في أقل من 3 ثواني. يبدأ من 10 دولار شهرياً غير محدود.',
        tr: 'Nabda OTP ile Irak (+964), Suriye (+963) ve MENA ülkelerine WhatsApp üzerinden anında OTP gönderin. Şablon yok, Meta onayı yok. Basit REST API, 3 saniyede %98 teslimat oranı. Ayda $10\'dan başlayan sınırsız paket.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/solutions/otp-verification`
            : `${BASE_URL}/${locale}/solutions/otp-verification`;

    return {
        title,
        description: desc,
        keywords: 'WhatsApp OTP Iraq, WhatsApp OTP Syria, OTP verification API, 2FA WhatsApp MENA, Nabda OTP, WhatsApp authentication, user verification WhatsApp',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/solutions/otp-verification`,
                ar: `${BASE_URL}/ar/solutions/otp-verification`,
                tr: `${BASE_URL}/tr/solutions/otp-verification`,
                'x-default': `${BASE_URL}/solutions/otp-verification`,
            },
        },
        openGraph: {
            title,
            description: desc,
            url: canonicalPath,
            type: 'website',
            siteName: 'Nabda OTP',
            locale: isAR ? 'ar_SA' : isTR ? 'tr_TR' : 'en_US',
            images: [
                {
                    url: `${BASE_URL}/assets/og-otp-verification.png`,
                    width: 1200,
                    height: 630,
                    alt: 'OTP & User Verification via WhatsApp — Nabda OTP',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-otp-verification.png`],
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
    name: 'OTP & User Verification via WhatsApp',
    description: 'Send instant OTP codes via WhatsApp to Iraq, Syria, and MENA using Nabda OTP API.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page 
export default function OTPVerificationPage() {
    // Stats data
    const stats: [
        { value: string; labelKey: string },
        { value: string; labelKey: string },
        { value: string; labelKey: string },
        { value: string; labelKey: string },
    ] = [
            { value: '98%', labelKey: 'otpSolution.stats.delivery' },
            { value: '<3s', labelKey: 'otpSolution.stats.time' },
            { value: '+20', labelKey: 'otpSolution.stats.countries' },
            { value: '$10/mo', labelKey: 'otpSolution.stats.pricing' },
        ];

    // Features data
    const features = [
        {
            emoji: '⚡',
            titleKey: 'otpSolution.features.instant.title',
            descKey: 'otpSolution.features.instant.desc',
        },
        {
            emoji: '🔑',
            titleKey: 'otpSolution.features.noTemplates.title',
            descKey: 'otpSolution.features.noTemplates.desc',
        },
        {
            emoji: '🌍',
            titleKey: 'otpSolution.features.regional.title',
            descKey: 'otpSolution.features.regional.desc',
        },
        {
            emoji: '🔒',
            titleKey: 'otpSolution.features.secure.title',
            descKey: 'otpSolution.features.secure.desc',
        },
        {
            emoji: '📊',
            titleKey: 'otpSolution.features.webhooks.title',
            descKey: 'otpSolution.features.webhooks.desc',
        },
        {
            emoji: '💰',
            titleKey: 'otpSolution.features.pricing.title',
            descKey: 'otpSolution.features.pricing.desc',
        },
    ];

    // Steps data
    const steps: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'otpSolution.how.step1.title',
                descKey: 'otpSolution.how.step1.desc',
            },
            {
                titleKey: 'otpSolution.how.step2.title',
                descKey: 'otpSolution.how.step2.desc',
            },
            {
                titleKey: 'otpSolution.how.step3.title',
                descKey: 'otpSolution.how.step3.desc',
            },
            {
                titleKey: 'otpSolution.how.step4.title',
                descKey: 'otpSolution.how.step4.desc',
            },
        ];

    // Code example
    const codeExample = `// 1. Generate OTP on your server (never the client)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 2. Send via Nabda OTP API
const otp = generateOTP();

const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${instanceToken}\`
  },
  body: JSON.stringify({
    phone: "+9647701234567",  // Iraq (+964) or Syria (+963)
    message: \`Your verification code is \${otp}. Valid for 5 minutes. – YourApp\`
  })
});

// 3. Store hashed OTP in your DB and verify on submission
if (response.ok) {
  await storeOTP(userId, otp, Date.now() + 5 * 60000);
}`;

    // Use cases
    const useCases = [
        {
            emoji: '📱',
            textKey: 'otpSolution.usecases.item1',
        },
        {
            emoji: '🔐',
            textKey: 'otpSolution.usecases.item2',
        },
        {
            emoji: '🔑',
            textKey: 'otpSolution.usecases.item3',
        },
        {
            emoji: '💳',
            textKey: 'otpSolution.usecases.item4',
        },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-[#060f1e]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <SolutionHero
                icon={Lock}
                titleKey="otpSolution.hero.title"
                descKey="otpSolution.hero.desc"
                cta1Key="otpSolution.hero.cta1"
                cta2Key="otpSolution.hero.cta2"
            />

            {/* Stats */}
            <StatsBar stats={stats} />

            {/* Why WhatsApp OTP */}
            <SolutionWhySection
                labelKey="otpSolution.why.label"
                titleKey="otpSolution.why.title"
                descKey="otpSolution.why.desc"
            >
                <FeatureGrid features={features} />
            </SolutionWhySection>

            {/* How it works */}
            <HowItWorksSteps
                labelKey="otpSolution.how.label"
                titleKey="otpSolution.how.title"
                steps={steps}
            />

            {/* Code example */}
            <CodeExample
                labelKey="otpSolution.code.label"
                titleKey="otpSolution.code.title"
                descKey="otpSolution.code.desc"
                code={codeExample}
                lang="send-otp.js"
            />

            {/* Use cases */}
            <UseCasesList
                labelKey="otpSolution.usecases.label"
                titleKey="otpSolution.usecases.title"
                useCases={useCases}
            />

            {/* CTA */}
            <SolutionCTA
                titleKey="otpSolution.cta.title"
                descKey="otpSolution.cta.desc"
                button1Key="otpSolution.cta.button1"
                button2Key="otpSolution.cta.button2"
            />
        </main>
    );
}