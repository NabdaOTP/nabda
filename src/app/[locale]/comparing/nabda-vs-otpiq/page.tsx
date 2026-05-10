import ComparisonHero from '@/components/comparing/ComparisonHero';
import ComparisonTable from '@/components/comparing/ComparisonTable';
import PricingCalculator from '@/components/comparing/PricingCalculator';
import WhyNabdaCards from '@/components/comparing/WhyNabdaCards';
import { Key } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP vs OTPIQ 2026 — MENA OTP Comparison | Fixed vs Per-Message Pricing',
        ar: 'Nabda OTP مقابل OTPIQ 2026 — مقارنة OTP للشرق الأوسط | تسعير ثابت مقابل لكل رسالة',
        tr: 'Nabda OTP vs OTPIQ 2026 — MENA OTP Karşılaştırması | Sabit vs Mesaj Başına Fiyatlandırma',
    };

    const descriptions = {
        en: 'Compare Nabda OTP vs OTPIQ for MENA OTP delivery, pricing model, and product fit. Fixed $10/month vs per-message pricing. Both target Iraq, Syria & MENA markets.',
        ar: 'قارن Nabda OTP مقابل OTPIQ لتوصيل OTP في الشرق الأوسط، نموذج التسعير، وملاءمة المنتج. 10 دولار شهرياً ثابت مقابل التسعير لكل رسالة. كلاهما يستهدف أسواق العراق وسوريا والشرق الأوسط.',
        tr: 'Nabda OTP ve OTPIQ\'yi MENA OTP teslimatı, fiyatlandırma modeli ve ürün uyumu açısından karşılaştırın. Sabit $10/ay vs mesaj başına fiyatlandırma. Her ikisi de Irak, Suriye ve MENA pazarlarını hedefliyor.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-vs-otpiq`
            : `${BASE_URL}/${locale}/comparing/nabda-vs-otpiq`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP vs OTPIQ, OTPIQ alternative, Iraq OTP service, Syria messaging, MENA WhatsApp gateway, fixed vs per-message pricing',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-vs-otpiq`,
                ar: `${BASE_URL}/ar/comparing/nabda-vs-otpiq`,
                tr: `${BASE_URL}/tr/comparing/nabda-vs-otpiq`,
                'x-default': `${BASE_URL}/comparing/nabda-vs-otpiq`,
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
                    url: `${BASE_URL}/assets/og-nabda-vs-otpiq.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP vs OTPIQ Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-vs-otpiq.png`],
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
    name: 'Nabda OTP vs OTPIQ Comparison',
    description:
        'Detailed comparison between Nabda OTP and OTPIQ for OTP delivery in MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page
export default function NabdaVsOTPIQPage() {
    // Comparison table rows (4 rows)
    const tableRows = [
        {
            featureKey: 'comparisonOTPIQ.table.row1.feature',
            nabdaKey: 'comparisonOTPIQ.table.row1.nabda',
            competitorKey: 'comparisonOTPIQ.table.row1.otpiq',
            winnerKey: 'comparisonOTPIQ.table.row1.winner',
        },
        {
            featureKey: 'comparisonOTPIQ.table.row2.feature',
            nabdaKey: 'comparisonOTPIQ.table.row2.nabda',
            competitorKey: 'comparisonOTPIQ.table.row2.otpiq',
            winnerKey: 'comparisonOTPIQ.table.row2.winner',
        },
        {
            featureKey: 'comparisonOTPIQ.table.row3.feature',
            nabdaKey: 'comparisonOTPIQ.table.row3.nabda',
            competitorKey: 'comparisonOTPIQ.table.row3.otpiq',
            winnerKey: 'comparisonOTPIQ.table.row3.winner',
        },
        {
            featureKey: 'comparisonOTPIQ.table.row4.feature',
            nabdaKey: 'comparisonOTPIQ.table.row4.nabda',
            competitorKey: 'comparisonOTPIQ.table.row4.otpiq',
            winnerKey: 'comparisonOTPIQ.table.row4.winner',
        },
    ];

    // Why Nabda cards
    const whyCards: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'comparisonOTPIQ.why.card1.title',
                descKey: 'comparisonOTPIQ.why.card1.desc',
            },
            {
                titleKey: 'comparisonOTPIQ.why.card2.title',
                descKey: 'comparisonOTPIQ.why.card2.desc',
            },
            {
                titleKey: 'comparisonOTPIQ.why.card3.title',
                descKey: 'comparisonOTPIQ.why.card3.desc',
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
                competitorName="OTPIQ"
                badgeKey="comparisonOTPIQ.badge"
                titleKey="comparisonOTPIQ.title"
                subtitleKey="comparisonOTPIQ.subtitle"
                cta1Key="comparisonOTPIQ.hero.cta1"
                cta2Key="comparisonOTPIQ.hero.cta2"
                icon={Key}
            />

            {/* Comparison Table */}
            <ComparisonTable
                competitorName="OTPIQ"
                baseKey="comparisonOTPIQ.table"
                rows={tableRows}
            />

            {/* Pricing Calculator */}
            <PricingCalculator
                competitorName="OTPIQ"
                baseKey="comparisonOTPIQ.calculator"
                competitorPerMessage={0.061}
                defaultMessages={30000}
            />

            {/* Why Nabda */}
            <WhyNabdaCards baseKey="comparisonOTPIQ.why" cards={whyCards} />
        </main>
    );
}