import ComparisonHero from '@/components/comparing/ComparisonHero';
import ComparisonTable from '@/components/comparing/ComparisonTable';
import PricingCalculator from '@/components/comparing/PricingCalculator';
import WhyNabdaCards from '@/components/comparing/WhyNabdaCards';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP vs Official WhatsApp API 2026 — Full Comparison | Fixed vs Per-Message Pricing',
        ar: 'Nabda OTP مقابل Official WhatsApp API 2026 — مقارنة كاملة | تسعير ثابت مقابل لكل رسالة',
        tr: 'Nabda OTP vs Official WhatsApp API 2026 — Tam Karşılaştırma | Sabit vs Mesaj Başına Fiyatlandırma',
    };

    const descriptions = {
        en: 'Compare Nabda OTP with Official WhatsApp API pricing and features for MENA OTP delivery. Fixed $10/month vs per-message pricing. Built for Iraq, Syria & MENA markets.',
        ar: 'قارن Nabda OTP مع Official WhatsApp API للتسعير والميزات لتوصيل OTP في الشرق الأوسط. 10 دولار شهرياً ثابت مقابل التسعير لكل رسالة. مصمم لأسواق العراق وسوريا والشرق الأوسط.',
        tr: 'Nabda OTP ve Official WhatsApp API\'yi MENA OTP teslimatı için fiyatlandırma ve özellikler açısından karşılaştırın. Sabit $10/ay vs mesaj başına fiyatlandırma. Irak, Suriye ve MENA pazarları için tasarlandı.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-vs-official`
            : `${BASE_URL}/${locale}/comparing/nabda-vs-official`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP vs Official WhatsApp API, WhatsApp Business API alternative, fixed pricing vs per-message, MENA WhatsApp gateway, Iraq WhatsApp API, Syria messaging API',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-vs-official`,
                ar: `${BASE_URL}/ar/comparing/nabda-vs-official`,
                tr: `${BASE_URL}/tr/comparing/nabda-vs-official`,
                'x-default': `${BASE_URL}/comparing/nabda-vs-official`,
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
                    url: `${BASE_URL}/assets/og-nabda-vs-official.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP vs Official WhatsApp API Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-vs-official.png`],
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
    name: 'Nabda OTP vs Official WhatsApp API Comparison',
    description:
        'Detailed comparison between Nabda OTP and Official WhatsApp API for OTP delivery in MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page
export default function NabdaVsOfficialPage() {
    // Comparison table rows
    const tableRows = [
        {
            featureKey: 'comparisonOfficial.table.row1.feature',
            nabdaKey: 'comparisonOfficial.table.row1.nabda',
            competitorKey: 'comparisonOfficial.table.row1.official',
            winnerKey: 'comparisonOfficial.table.row1.winner',
        },
        {
            featureKey: 'comparisonOfficial.table.row2.feature',
            nabdaKey: 'comparisonOfficial.table.row2.nabda',
            competitorKey: 'comparisonOfficial.table.row2.official',
            winnerKey: 'comparisonOfficial.table.row2.winner',
        },
        {
            featureKey: 'comparisonOfficial.table.row3.feature',
            nabdaKey: 'comparisonOfficial.table.row3.nabda',
            competitorKey: 'comparisonOfficial.table.row3.official',
            winnerKey: 'comparisonOfficial.table.row3.winner',
        },
        {
            featureKey: 'comparisonOfficial.table.row4.feature',
            nabdaKey: 'comparisonOfficial.table.row4.nabda',
            competitorKey: 'comparisonOfficial.table.row4.official',
            winnerKey: 'comparisonOfficial.table.row4.winner',
        },
        {
            featureKey: 'comparisonOfficial.table.row5.feature',
            nabdaKey: 'comparisonOfficial.table.row5.nabda',
            competitorKey: 'comparisonOfficial.table.row5.official',
            winnerKey: 'comparisonOfficial.table.row5.winner',
        },
        {
            featureKey: 'comparisonOfficial.table.row6.feature',
            nabdaKey: 'comparisonOfficial.table.row6.nabda',
            competitorKey: 'comparisonOfficial.table.row6.official',
            winnerKey: 'comparisonOfficial.table.row6.winner',
        },
    ];

    // Why Nabda cards
    const whyCards: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'comparisonOfficial.why.card1.title',
                descKey: 'comparisonOfficial.why.card1.desc',
            },
            {
                titleKey: 'comparisonOfficial.why.card2.title',
                descKey: 'comparisonOfficial.why.card2.desc',
            },
            {
                titleKey: 'comparisonOfficial.why.card3.title',
                descKey: 'comparisonOfficial.why.card3.desc',
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
                competitorName="Official API"
                badgeKey="comparisonOfficial.badge"
                titleKey="comparisonOfficial.title"
                subtitleKey="comparisonOfficial.subtitle"
                cta1Key="comparisonOfficial.hero.cta1"
                cta2Key="comparisonOfficial.hero.cta2"
                icon={CheckCircle}
            />

            {/* Comparison Table */}
            <ComparisonTable
                competitorName="Official API"
                baseKey="comparisonOfficial.table"
                rows={tableRows}
            />

            {/* Pricing Calculator */}
            <PricingCalculator
                competitorName="Official API"
                baseKey="comparisonOfficial.calculator"
                competitorPerMessage={0.003}
                defaultMessages={30000}
            />

            {/* Why Nabda */}
            <WhyNabdaCards baseKey="comparisonOfficial.why" cards={whyCards} />
        </main>
    );
}