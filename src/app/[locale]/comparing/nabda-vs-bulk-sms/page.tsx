import ComparisonHero from '@/components/comparing/ComparisonHero';
import ComparisonTable from '@/components/comparing/ComparisonTable';
import PricingCalculator from '@/components/comparing/PricingCalculator';
import WhyNabdaCards from '@/components/comparing/WhyNabdaCards';
import { MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP vs BulkSMS 2026 — WhatsApp vs SMS Comparison | Fixed vs Per-Message Pricing',
        ar: 'Nabda OTP مقابل BulkSMS 2026 — مقارنة واتساب مقابل SMS | تسعير ثابت مقابل لكل رسالة',
        tr: 'Nabda OTP vs BulkSMS 2026 — WhatsApp vs SMS Karşılaştırması | Sabit vs Mesaj Başına Fiyatlandırma',
    };

    const descriptions = {
        en: 'Compare Nabda OTP and BulkSMS pricing and features for OTP workflows in MENA. WhatsApp ($10/mo fixed) vs SMS ($0.0321/msg). Built for Iraq, Syria & MENA markets.',
        ar: 'قارن Nabda OTP و BulkSMS للتسعير والميزات لسير عمل OTP في الشرق الأوسط. واتساب (10 دولار شهرياً ثابت) مقابل SMS (0.0321 دولار للرسالة). مصمم لأسواق العراق وسوريا والشرق الأوسط.',
        tr: 'Nabda OTP ve BulkSMS\'i MENA\'da OTP iş akışları için fiyatlandırma ve özellikler açısından karşılaştırın. WhatsApp ($10/ay sabit) vs SMS ($0.0321/mesaj). Irak, Suriye ve MENA pazarları için tasarlandı.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-vs-bulksms`
            : `${BASE_URL}/${locale}/comparing/nabda-vs-bulksms`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP vs BulkSMS, BulkSMS alternative, WhatsApp vs SMS pricing, SMS gateway comparison, Iraq WhatsApp API, MENA messaging service',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-vs-bulksms`,
                ar: `${BASE_URL}/ar/comparing/nabda-vs-bulksms`,
                tr: `${BASE_URL}/tr/comparing/nabda-vs-bulksms`,
                'x-default': `${BASE_URL}/comparing/nabda-vs-bulksms`,
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
                    url: `${BASE_URL}/assets/og-nabda-vs-bulksms.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP vs BulkSMS Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-vs-bulksms.png`],
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
    name: 'Nabda OTP vs BulkSMS Comparison',
    description:
        'Detailed comparison between Nabda OTP and BulkSMS for OTP delivery in MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page 
export default function NabdaVsBulkSMSPage() {
    // Comparison table rows (3 rows only)
    const tableRows = [
        {
            featureKey: 'comparisonBulkSMS.table.row1.feature',
            nabdaKey: 'comparisonBulkSMS.table.row1.nabda',
            competitorKey: 'comparisonBulkSMS.table.row1.bulksms',
            winnerKey: 'comparisonBulkSMS.table.row1.winner',
        },
        {
            featureKey: 'comparisonBulkSMS.table.row2.feature',
            nabdaKey: 'comparisonBulkSMS.table.row2.nabda',
            competitorKey: 'comparisonBulkSMS.table.row2.bulksms',
            winnerKey: 'comparisonBulkSMS.table.row2.winner',
        },
        {
            featureKey: 'comparisonBulkSMS.table.row3.feature',
            nabdaKey: 'comparisonBulkSMS.table.row3.nabda',
            competitorKey: 'comparisonBulkSMS.table.row3.bulksms',
            winnerKey: 'comparisonBulkSMS.table.row3.winner',
        },
    ];

    // Why Nabda cards
    const whyCards: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'comparisonBulkSMS.why.card1.title',
                descKey: 'comparisonBulkSMS.why.card1.desc',
            },
            {
                titleKey: 'comparisonBulkSMS.why.card2.title',
                descKey: 'comparisonBulkSMS.why.card2.desc',
            },
            {
                titleKey: 'comparisonBulkSMS.why.card3.title',
                descKey: 'comparisonBulkSMS.why.card3.desc',
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
                competitorName="BulkSMS"
                badgeKey="comparisonBulkSMS.badge"
                titleKey="comparisonBulkSMS.title"
                subtitleKey="comparisonBulkSMS.subtitle"
                cta1Key="comparisonBulkSMS.hero.cta1"
                cta2Key="comparisonBulkSMS.hero.cta2"
                icon={MessageSquare}
            />

            {/* Comparison Table */}
            <ComparisonTable
                competitorName="BulkSMS"
                baseKey="comparisonBulkSMS.table"
                rows={tableRows}
            />

            {/* Pricing Calculator */}
            <PricingCalculator
                competitorName="BulkSMS"
                baseKey="comparisonBulkSMS.calculator"
                competitorPerMessage={0.0321}
                defaultMessages={30000}
            />

            {/* Why Nabda */}
            <WhyNabdaCards baseKey="comparisonBulkSMS.why" cards={whyCards} />
        </main>
    );
}