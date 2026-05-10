import ComparisonHero from '@/components/comparing/ComparisonHero';
import ComparisonTable from '@/components/comparing/ComparisonTable';
import PricingCalculator from '@/components/comparing/PricingCalculator';
import WhyNabdaCards from '@/components/comparing/WhyNabdaCards';
import { Shield } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP vs Twilio 2026 — Full Comparison | Pricing, Features & MENA Support',
        ar: 'نبضة OTP مقابل Twilio 2026 — مقارنة كاملة | الأسعار والميزات والدعم في الشرق الأوسط',
        tr: 'Nabda OTP vs Twilio 2026 — Tam Karşılaştırma | Fiyatlandırma, Özellikler ve MENA Desteği',
    };

    const descriptions = {
        en: 'Detailed comparison between Nabda OTP and Twilio. Compare pricing models ($10/mo fixed vs usage-based), delivery reliability, and MENA market fit for OTP and WhatsApp messaging in Iraq, Syria & MENA.',
        ar: 'مقارنة تفصيلية بين نبضة OTP و Twilio. قارن نماذج التسعير (10 دولار شهرياً ثابت مقابل الاستخدام)، موثوقية التسليم، وملاءمة سوق الشرق الأوسط لرسائل OTP وواتساب في العراق وسوريا.',
        tr: 'Nabda OTP ve Twilio arasında detaylı karşılaştırma. Fiyatlandırma modellerini ($10/ay sabit vs kullanıma dayalı), teslimat güvenilirliğini ve Irak, Suriye ve MENA\'da OTP ve WhatsApp mesajlaşması için MENA pazar uyumunu karşılaştırın.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-vs-twilio`
            : `${BASE_URL}/${locale}/comparing/nabda-vs-twilio`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP vs Twilio, Twilio alternative MENA, WhatsApp API pricing comparison, fixed vs usage-based pricing, Iraq WhatsApp API, Syria messaging API, Nabda Twilio comparison',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-vs-twilio`,
                ar: `${BASE_URL}/ar/comparing/nabda-vs-twilio`,
                tr: `${BASE_URL}/tr/comparing/nabda-vs-twilio`,
                'x-default': `${BASE_URL}/comparing/nabda-vs-twilio`,
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
                    url: `${BASE_URL}/assets/og-nabda-vs-twilio.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP vs Twilio Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-vs-twilio.png`],
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
    '@type': 'ComparisonWebPage',
    name: 'Nabda OTP vs Twilio Comparison',
    description:
        'Detailed comparison between Nabda OTP and Twilio for WhatsApp messaging and OTP in MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page 
export default function NabdaVsTwilioPage() {
    // Comparison table rows
    const tableRows = [
        {
            featureKey: 'comparisonTwilio.table.row1.feature',
            nabdaKey: 'comparisonTwilio.table.row1.nabda',
            competitorKey: 'comparisonTwilio.table.row1.twilio',
            winnerKey: 'comparisonTwilio.table.row1.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row2.feature',
            nabdaKey: 'comparisonTwilio.table.row2.nabda',
            competitorKey: 'comparisonTwilio.table.row2.twilio',
            winnerKey: 'comparisonTwilio.table.row2.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row3.feature',
            nabdaKey: 'comparisonTwilio.table.row3.nabda',
            competitorKey: 'comparisonTwilio.table.row3.twilio',
            winnerKey: 'comparisonTwilio.table.row3.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row4.feature',
            nabdaKey: 'comparisonTwilio.table.row4.nabda',
            competitorKey: 'comparisonTwilio.table.row4.twilio',
            winnerKey: 'comparisonTwilio.table.row4.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row5.feature',
            nabdaKey: 'comparisonTwilio.table.row5.nabda',
            competitorKey: 'comparisonTwilio.table.row5.twilio',
            winnerKey: 'comparisonTwilio.table.row5.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row6.feature',
            nabdaKey: 'comparisonTwilio.table.row6.nabda',
            competitorKey: 'comparisonTwilio.table.row6.twilio',
            winnerKey: 'comparisonTwilio.table.row6.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row7.feature',
            nabdaKey: 'comparisonTwilio.table.row7.nabda',
            competitorKey: 'comparisonTwilio.table.row7.twilio',
            winnerKey: 'comparisonTwilio.table.row7.winner',
        },
        {
            featureKey: 'comparisonTwilio.table.row8.feature',
            nabdaKey: 'comparisonTwilio.table.row8.nabda',
            competitorKey: 'comparisonTwilio.table.row8.twilio',
            winnerKey: 'comparisonTwilio.table.row8.winner',
        },
    ];

    // Why Nabda cards
    const whyCards: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'comparisonTwilio.why.card1.title',
                descKey: 'comparisonTwilio.why.card1.desc',
            },
            {
                titleKey: 'comparisonTwilio.why.card2.title',
                descKey: 'comparisonTwilio.why.card2.desc',
            },
            {
                titleKey: 'comparisonTwilio.why.card3.title',
                descKey: 'comparisonTwilio.why.card3.desc',
            },
        ];

    return (
        <main className="min-h-screen bg-white dark:bg-[#060f1e]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <ComparisonHero
                competitorName="Twilio"
                badgeKey="comparisonTwilio.badge"
                titleKey="comparisonTwilio.title"
                subtitleKey="comparisonTwilio.subtitle"
                cta1Key="comparisonTwilio.hero.cta1"
                cta2Key="comparisonTwilio.hero.cta2"
                icon={Shield}
            />

            {/* Comparison Table */}
            <ComparisonTable
                competitorName="Twilio"
                baseKey="comparisonTwilio.table"
                rows={tableRows}
            />

            {/* Pricing Calculator */}
            <PricingCalculator
                competitorName="Twilio"
                baseKey="comparisonTwilio.calculator"
                competitorPerMessage={0.0084}
                defaultMessages={30000}
            />

            {/* Why Nabda */}
            <WhyNabdaCards baseKey="comparisonTwilio.why" cards={whyCards} />
        </main>
    );
}