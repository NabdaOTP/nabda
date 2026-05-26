import SolutionHero from '@/components/solutions/SolutionHero';
import StatsBar from '@/components/solutions/StatsBar';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import SolutionWhySection from '@/components/solutions/SolutionWhySection';
import OrderJourneyTimeline from '@/components/solutions/OrderJourneyTimeline';
import CodeExample from '@/components/solutions/CodeExample';
import UseCasesList from '@/components/solutions/UseCasesList';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import { ShoppingCart } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAR = locale === 'ar';
    const isTR = locale === 'tr';

    const titles = {
        en: 'Order Confirmations & Delivery Updates via WhatsApp — E-commerce Notifications | Nabda OTP',
        ar: 'تأكيدات الطلبات وتحديثات التوصيل عبر واتساب — إشعارات التجارة الإلكترونية | نبضة OTP',
        tr: 'WhatsApp ile Sipariş Onayları ve Teslimat Güncellemeleri — E-ticaret Bildirimleri | Nabda OTP',
    };

    const descriptions = {
        en: 'Send real-time order confirmations, delivery notifications, and payment receipts via WhatsApp to customers in Iraq, Syria & MENA using Nabda OTP. 98% open rate. $10/month unlimited notifications.',
        ar: 'أرسل تأكيدات الطلبات الفورية، إشعارات التوصيل، وإيصالات الدفع عبر واتساب للعملاء في العراق وسوريا والشرق الأوسط مع نبضة OTP. نسبة فتح 98%. 10 دولار شهرياً إشعارات غير محدودة.',
        tr: 'Nabda OTP ile Irak, Suriye ve MENA\'daki müşterilere WhatsApp üzerinden gerçek zamanlı sipariş onayları, teslimat bildirimleri ve ödeme makbuzları gönderin. %98 açılma oranı. Ayda $10 sınırsız bildirim.',
    };

    const title = titles[locale as keyof typeof titles] ?? titles.en;
    const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

    const canonicalPath =
        locale === 'en'
            ? `${BASE_URL}/solutions/order-confirmations`
            : `${BASE_URL}/${locale}/solutions/order-confirmations`;

    return {
        title,
        description: desc,
        keywords: 'WhatsApp order confirmation Iraq, WhatsApp delivery updates MENA, e-commerce WhatsApp API, Nabda OTP notifications, order tracking WhatsApp, payment receipt WhatsApp',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonicalPath,
            languages: {
                en: `${BASE_URL}/solutions/order-confirmations`,
                ar: `${BASE_URL}/ar/solutions/order-confirmations`,
                tr: `${BASE_URL}/tr/solutions/order-confirmations`,
                'x-default': `${BASE_URL}/solutions/order-confirmations`,
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
                    url: `${BASE_URL}/assets/og-order-confirmations.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Order Confirmations & Delivery Updates via WhatsApp — Nabda OTP',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [`${BASE_URL}/assets/og-order-confirmations.png`],
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
    name: 'Order Confirmations & Delivery Updates via WhatsApp',
    description:
        'Send real-time order and delivery notifications via WhatsApp in Iraq, Syria & MENA using Nabda OTP.',
    publisher: {
        '@type': 'Organization',
        name: 'Nabda OTP',
        url: BASE_URL,
    },
};

// Page 
export default function OrderConfirmationsPage() {
    // Stats data
    const stats: [
        { value: string; labelKey: string },
        { value: string; labelKey: string },
        { value: string; labelKey: string },
        { value: string; labelKey: string },
    ] = [
            { value: '98%', labelKey: 'orderSolution.stats.openRate' },
            { value: '3x', labelKey: 'orderSolution.stats.support' },
            { value: '<3s', labelKey: 'orderSolution.stats.deliveryTime' },
            { value: '$10/mo', labelKey: 'orderSolution.stats.unlimited' },
        ];

    // Features data
    const features = [
        {
            emoji: '📦',
            titleKey: 'orderSolution.features.confirmation.title',
            descKey: 'orderSolution.features.confirmation.desc',
        },
        {
            emoji: '💳',
            titleKey: 'orderSolution.features.payment.title',
            descKey: 'orderSolution.features.payment.desc',
        },
        {
            emoji: '🚚',
            titleKey: 'orderSolution.features.shipping.title',
            descKey: 'orderSolution.features.shipping.desc',
        },
        {
            emoji: '↩️',
            titleKey: 'orderSolution.features.return.title',
            descKey: 'orderSolution.features.return.desc',
        },
        {
            emoji: '⚙️',
            titleKey: 'orderSolution.features.api.title',
            descKey: 'orderSolution.features.api.desc',
        },
        {
            emoji: '🇮🇶',
            titleKey: 'orderSolution.features.regional.title',
            descKey: 'orderSolution.features.regional.desc',
        },
    ];

    // Journey steps
    const journeySteps: [
        { emoji: string; labelKey: string; titleKey: string; descKey: string },
        { emoji: string; labelKey: string; titleKey: string; descKey: string },
        { emoji: string; labelKey: string; titleKey: string; descKey: string },
        { emoji: string; labelKey: string; titleKey: string; descKey: string },
    ] = [
            {
                emoji: '🛒',
                labelKey: 'orderSolution.journey.step1.label',
                titleKey: 'orderSolution.journey.step1.title',
                descKey: 'orderSolution.journey.step1.desc',
            },
            {
                emoji: '💳',
                labelKey: 'orderSolution.journey.step2.label',
                titleKey: 'orderSolution.journey.step2.title',
                descKey: 'orderSolution.journey.step2.desc',
            },
            {
                emoji: '📦',
                labelKey: 'orderSolution.journey.step3.label',
                titleKey: 'orderSolution.journey.step3.title',
                descKey: 'orderSolution.journey.step3.desc',
            },
            {
                emoji: '🏠',
                labelKey: 'orderSolution.journey.step4.label',
                titleKey: 'orderSolution.journey.step4.title',
                descKey: 'orderSolution.journey.step4.desc',
            },
        ];

    // Code example
    const codeExample = `// Trigger this from your order webhook / event handler
async function sendOrderUpdate(order, event) {
  const messages = {
    confirmed: \`✅ Order #\${order.id} confirmed! Total: \${order.total}. We'll notify you when it ships. – \${STORE_NAME}\`,
    shipped:   \`🚚 Your order #\${order.id} is on its way! Est. delivery: \${order.eta}. – \${STORE_NAME}\`,
    delivered: \`✅ Order #\${order.id} delivered! Reply if you need anything. – \${STORE_NAME}\`,
  };

  const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${instanceToken}\`
    },
    body: JSON.stringify({
      phone: order.customerPhone,  // e.g. "+9647701234567"
      message: messages[event]
    })
  });

  return response.ok;
}

// Call it from your order events:
await sendOrderUpdate(order, "confirmed");
await sendOrderUpdate(order, "shipped");
await sendOrderUpdate(order, "delivered");`;

    // Use cases
    const useCases = [
        { emoji: '🛍️', textKey: 'orderSolution.usecases.item1' },
        { emoji: '🍕', textKey: 'orderSolution.usecases.item2' },
        { emoji: '💊', textKey: 'orderSolution.usecases.item3' },
        { emoji: '👗', textKey: 'orderSolution.usecases.item4' },
        { emoji: '📱', textKey: 'orderSolution.usecases.item5' },
        { emoji: '🚗', textKey: 'orderSolution.usecases.item6' },
        { emoji: '🏗️', textKey: 'orderSolution.usecases.item7' },
        { emoji: '🎁', textKey: 'orderSolution.usecases.item8' },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-[#060f1e]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <SolutionHero
                icon={ShoppingCart}
                titleKey="orderSolution.hero.title"
                descKey="orderSolution.hero.desc"
                cta1Key="orderSolution.hero.cta1"
                cta2Key="orderSolution.hero.cta2"
                gradient="bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]"
            />

            {/* Stats */}
            <StatsBar stats={stats} />

            {/* Why WhatsApp */}
            <SolutionWhySection
                labelKey="orderSolution.why.label"
                titleKey="orderSolution.why.title"
                descKey="orderSolution.why.desc"
            >
                <FeatureGrid features={features} />
            </SolutionWhySection>

            {/* Order journey timeline */}
            <OrderJourneyTimeline
                labelKey="orderSolution.journey.label"
                titleKey="orderSolution.journey.title"
                steps={journeySteps}
            />

            {/* Code example */}
            <CodeExample
                labelKey="orderSolution.code.label"
                titleKey="orderSolution.code.title"
                descKey="orderSolution.code.desc"
                code={codeExample}
                lang="order-notification.js"
            />

            {/* Use cases */}
            <UseCasesList
                labelKey="orderSolution.usecases.label"
                titleKey="orderSolution.usecases.title"
                useCases={useCases}
            />

            {/* CTA */}
            <SolutionCTA
                titleKey="orderSolution.cta.title"
                descKey="orderSolution.cta.desc"
                button1Key="orderSolution.cta.button1"
                button2Key="orderSolution.cta.button2"
                button2Href="https://connect.nabdaotp.com/docs"
            />
        </main>
    );
}