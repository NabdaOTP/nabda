import ComparisonHero from '@/components/comparing/ComparisonHero';
import ComparisonTable from '@/components/comparing/ComparisonTable';
import WhyNabdaCards from '@/components/comparing/WhyNabdaCards';
import { Zap } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Nabda OTP vs UltraMsg 2026 — Full Comparison | Which is Better for MENA?',
        ar: 'Nabda OTP مقابل UltraMsg 2026 — مقارنة كاملة | أيهما أفضل للشرق الأوسط؟',
        tr: 'Nabda OTP vs UltraMsg 2026 — Tam Karşılaştırma | MENA İçin Hangisi Daha İyi?',
    };

    const descriptions = {
        en: 'Detailed comparison between Nabda OTP and UltraMsg. Pricing ($10/mo vs $39/number), features, delivery speed, and why Nabda is the cheapest WhatsApp API for Iraq, Syria & MENA.',
        ar: 'مقارنة تفصيلية بين Nabda OTP و UltraMsg. التسعير (10 دولار شهرياً مقابل 39 دولار لكل رقم)، الميزات، سرعة التسليم، ولماذا Nabda هو أرخص WhatsApp API للعراق وسوريا والشرق الأوسط.',
        tr: 'Nabda OTP ve UltraMsg arasında detaylı karşılaştırma. Fiyatlandırma ($10/ay vs $39/numara), özellikler, teslimat hızı ve Nabda\'nın neden Irak, Suriye ve MENA için en ucuz WhatsApp API olduğu.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/comparing/nabda-vs-ultramsg`
            : `${BASE_URL}/${locale}/comparing/nabda-vs-ultramsg`;

    return {
        title,
        description: desc,
        keywords: 'Nabda OTP vs UltraMsg, UltraMsg alternative, cheapest WhatsApp API MENA, WhatsApp gateway comparison, Iraq WhatsApp API, Syria messaging service',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/comparing/nabda-vs-ultramsg`,
                ar: `${BASE_URL}/ar/comparing/nabda-vs-ultramsg`,
                tr: `${BASE_URL}/tr/comparing/nabda-vs-ultramsg`,
                'x-default': `${BASE_URL}/comparing/nabda-vs-ultramsg`,
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
                    url: `${BASE_URL}/assets/og-nabda-vs-ultramsg.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Nabda OTP vs UltraMsg Comparison',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-nabda-vs-ultramsg.png`],
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
    name: 'Nabda OTP vs UltraMsg Comparison',
    description:
        'Detailed comparison between Nabda OTP and UltraMsg for WhatsApp messaging in MENA markets.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page
export default function NabdaVsUltraMsgPage() {
    // Comparison table rows
    const tableRows = [
        {
            featureKey: 'comparisonUltra.table.row1.feature',
            nabdaKey: 'comparisonUltra.table.row1.nabda',
            competitorKey: 'comparisonUltra.table.row1.ultramsg',
            winnerKey: 'comparisonUltra.table.row1.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row2.feature',
            nabdaKey: 'comparisonUltra.table.row2.nabda',
            competitorKey: 'comparisonUltra.table.row2.ultramsg',
            winnerKey: 'comparisonUltra.table.row2.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row3.feature',
            nabdaKey: 'comparisonUltra.table.row3.nabda',
            competitorKey: 'comparisonUltra.table.row3.ultramsg',
            winnerKey: 'comparisonUltra.table.row3.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row4.feature',
            nabdaKey: 'comparisonUltra.table.row4.nabda',
            competitorKey: 'comparisonUltra.table.row4.ultramsg',
            winnerKey: 'comparisonUltra.table.row4.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row5.feature',
            nabdaKey: 'comparisonUltra.table.row5.nabda',
            competitorKey: 'comparisonUltra.table.row5.ultramsg',
            winnerKey: 'comparisonUltra.table.row5.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row6.feature',
            nabdaKey: 'comparisonUltra.table.row6.nabda',
            competitorKey: 'comparisonUltra.table.row6.ultramsg',
            winnerKey: 'comparisonUltra.table.row6.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row7.feature',
            nabdaKey: 'comparisonUltra.table.row7.nabda',
            competitorKey: 'comparisonUltra.table.row7.ultramsg',
            winnerKey: 'comparisonUltra.table.row7.winner',
        },
        {
            featureKey: 'comparisonUltra.table.row8.feature',
            nabdaKey: 'comparisonUltra.table.row8.nabda',
            competitorKey: 'comparisonUltra.table.row8.ultramsg',
            winnerKey: 'comparisonUltra.table.row8.winner',
        },
    ];

    // Why Nabda cards
    const whyCards: [
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
        { titleKey: string; descKey: string },
    ] = [
            {
                titleKey: 'comparisonUltra.why.card1.title',
                descKey: 'comparisonUltra.why.card1.desc',
            },
            {
                titleKey: 'comparisonUltra.why.card2.title',
                descKey: 'comparisonUltra.why.card2.desc',
            },
            {
                titleKey: 'comparisonUltra.why.card3.title',
                descKey: 'comparisonUltra.why.card3.desc',
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
                competitorName="UltraMsg"
                badgeKey="comparisonUltra.badge"
                titleKey="comparisonUltra.title"
                subtitleKey="comparisonUltra.subtitle"
                cta1Key="comparisonUltra.hero.cta1"
                cta2Key="comparisonUltra.hero.cta2"
                icon={Zap}
            />

            {/* Comparison Table */}
            <ComparisonTable
                competitorName="UltraMsg"
                baseKey="comparisonUltra.table"
                rows={tableRows}
            />

            {/* Why Nabda (No pricing calculator for UltraMsg) */}
            <WhyNabdaCards baseKey="comparisonUltra.why" cards={whyCards} />
        </main>
    );
}