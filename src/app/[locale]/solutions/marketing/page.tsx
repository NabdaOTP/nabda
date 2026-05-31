import SolutionHero from '@/components/solutions/SolutionHero';
import StatsBar from '@/components/solutions/StatsBar';
import FeatureGrid from '@/components/solutions/FeatureGrid';
import SolutionWhySection from '@/components/solutions/SolutionWhySection';
import HowItWorksSteps from '@/components/solutions/HowItWorksSteps';
import CodeExample from '@/components/solutions/CodeExample';
import UseCasesList from '@/components/solutions/UseCasesList';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import { Megaphone } from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAR = locale === 'ar';
  const isTR = locale === 'tr';

  const titles = {
    en: 'WhatsApp Marketing & Promotional Campaigns — Bulk Messaging for Iraq & MENA | Nabda OTP',
    ar: 'حملات التسويق والترويج عبر واتساب — رسائل جماعية للعراق والشرق الأوسط | نبضة OTP',
    tr: 'WhatsApp Pazarlama ve Promosyon Kampanyaları — Irak ve MENA için Toplu Mesajlaşma | Nabda OTP',
  };

  const descriptions = {
    en: 'Send promotional campaigns, product launches, and marketing messages via WhatsApp to customers in Iraq, Syria & MENA. 98% open rate, instant delivery, no spam filters. Perfect for e-commerce, retail, and service businesses. $10/month unlimited with Nabda OTP.',
    ar: 'أرسل حملات ترويجية، إطلاق منتجات، ورسائل تسويقية عبر واتساب للعملاء في العراق وسوريا والشرق الأوسط. نسبة فتح 98%، تسليم فوري، بدون فلاتر بريد مزعج. مثالي للتجارة الإلكترونية والبيع بالتجزئة. 10 دولار شهرياً غير محدود مع نبضة OTP.',
    tr: 'Irak, Suriye ve MENA\'daki müşterilere WhatsApp üzerinden promosyon kampanyaları, ürün lansmanları ve pazarlama mesajları gönderin. %98 açılma oranı, anında teslimat, spam filtresi yok. E-ticaret, perakende ve hizmet işletmeleri için mükemmel. Nabda OTP ile ayda $10 sınırsız.',
  };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;

  const canonicalPath =
    locale === 'en'
      ? `${BASE_URL}/solutions/marketing`
      : `${BASE_URL}/${locale}/solutions/marketing`;

  return {
    title,
    description: desc,
    keywords: 'WhatsApp marketing Iraq, bulk WhatsApp messages MENA, promotional campaigns WhatsApp, WhatsApp business API, Nabda OTP marketing, WhatsApp newsletters Syria',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/solutions/marketing`,
        ar: `${BASE_URL}/ar/solutions/marketing`,
        tr: `${BASE_URL}/tr/solutions/marketing`,
        'x-default': `${BASE_URL}/solutions/marketing`,
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
          url: `${BASE_URL}/assets/og-marketing.png`,
          width: 1200,
          height: 630,
          alt: 'WhatsApp Marketing & Promotional Campaigns — Nabda OTP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/og-marketing.png`],
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
  name: 'WhatsApp Marketing & Promotional Campaigns',
  description:
    'Send bulk promotional messages and marketing campaigns via WhatsApp to customers in Iraq, Syria & MENA.',
  publisher: {
    '@type': 'Organization',
    name: 'Nabda OTP',
    url: BASE_URL,
  },
};

// Page 
export default function MarketingPage() {
  // Stats data
  const stats: [
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
    { value: string; labelKey: string },
  ] = [
    { value: '98%', labelKey: 'marketingSolution.stats.openRate' },
    { value: '45%', labelKey: 'marketingSolution.stats.clickRate' },
    { value: '<3s', labelKey: 'marketingSolution.stats.deliveryTime' },
    { value: '$10/mo', labelKey: 'marketingSolution.stats.unlimited' },
  ];

  // Features data
  const features = [
    {
      emoji: '📢',
      titleKey: 'marketingSolution.features.broadcasts.title',
      descKey: 'marketingSolution.features.broadcasts.desc',
    },
    {
      emoji: '🎯',
      titleKey: 'marketingSolution.features.targeting.title',
      descKey: 'marketingSolution.features.targeting.desc',
    },
    {
      emoji: '🚀',
      titleKey: 'marketingSolution.features.productLaunches.title',
      descKey: 'marketingSolution.features.productLaunches.desc',
    },
    {
      emoji: '💰',
      titleKey: 'marketingSolution.features.sales.title',
      descKey: 'marketingSolution.features.sales.desc',
    },
    {
      emoji: '📊',
      titleKey: 'marketingSolution.features.analytics.title',
      descKey: 'marketingSolution.features.analytics.desc',
    },
    {
      emoji: '🌍',
      titleKey: 'marketingSolution.features.regional.title',
      descKey: 'marketingSolution.features.regional.desc',
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
      titleKey: 'marketingSolution.how.step1.title',
      descKey: 'marketingSolution.how.step1.desc',
    },
    {
      titleKey: 'marketingSolution.how.step2.title',
      descKey: 'marketingSolution.how.step2.desc',
    },
    {
      titleKey: 'marketingSolution.how.step3.title',
      descKey: 'marketingSolution.how.step3.desc',
    },
    {
      titleKey: 'marketingSolution.how.step4.title',
      descKey: 'marketingSolution.how.step4.desc',
    },
  ];

  // Code example
  const codeExample = `// Send promotional campaign to customer list
async function sendPromotionalCampaign(campaign) {
  const message = \`🎉 \${campaign.title}

\${campaign.body}

🛍️ Shop now: \${campaign.link}
💬 Reply STOP to unsubscribe

– \${STORE_NAME}\`;

  // Send to all customers in parallel
  const results = await Promise.all(
    campaign.customers.map(async (customer) => {
      const response = await fetch("https://api.nabdaotp.com/api/v1/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": \`Bearer \${instanceToken}\`
        },
        body: JSON.stringify({
          phone: customer.phone,  // e.g. "+9647701234567"
          message: message
        })
      });

      return {
        phone: customer.phone,
        success: response.ok,
        messageId: (await response.json()).messageId
      };
    })
  );

  // Track campaign performance
  await logCampaign({
    id: campaign.id,
    sent: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    timestamp: new Date()
  });

  return results;
}

// Example: Flash sale campaign
await sendPromotionalCampaign({
  title: "⚡ Flash Sale — 50% OFF Today Only!",
  body: "Get 50% off all electronics until midnight. Limited stock available!",
  link: "https://yourstore.com/flash-sale",
  customers: await getActiveCustomers()
});`;

  // Use cases
  const useCases = [
    { emoji: '🛒', textKey: 'marketingSolution.usecases.item1' },
    { emoji: '🍕', textKey: 'marketingSolution.usecases.item2' },
    { emoji: '👗', textKey: 'marketingSolution.usecases.item3' },
    { emoji: '💄', textKey: 'marketingSolution.usecases.item4' },
    { emoji: '📱', textKey: 'marketingSolution.usecases.item5' },
    { emoji: '🏠', textKey: 'marketingSolution.usecases.item6' },
    { emoji: '🎓', textKey: 'marketingSolution.usecases.item7' },
    { emoji: '🎉', textKey: 'marketingSolution.usecases.item8' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#060f1e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <SolutionHero
        icon={Megaphone}
        titleKey="marketingSolution.hero.title"
        descKey="marketingSolution.hero.desc"
        cta1Key="marketingSolution.hero.cta1"
        cta2Key="marketingSolution.hero.cta2"
        gradient="bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]"
      />

      {/* Stats */}
      <StatsBar stats={stats} />

      {/* Why WhatsApp Marketing */}
      <SolutionWhySection
        labelKey="marketingSolution.why.label"
        titleKey="marketingSolution.why.title"
        descKey="marketingSolution.why.desc"
      >
        <FeatureGrid features={features} />
      </SolutionWhySection>

      {/* How it works */}
      <HowItWorksSteps
        labelKey="marketingSolution.how.label"
        titleKey="marketingSolution.how.title"
        steps={steps}
      />

      {/* Code example */}
      <CodeExample
        labelKey="marketingSolution.code.label"
        titleKey="marketingSolution.code.title"
        descKey="marketingSolution.code.desc"
        code={codeExample}
        lang="campaign.js"
      />

      {/* Use cases */}
      <UseCasesList
        labelKey="marketingSolution.usecases.label"
        titleKey="marketingSolution.usecases.title"
        useCases={useCases}
      />

      {/* CTA */}
      <SolutionCTA
        titleKey="marketingSolution.cta.title"
        descKey="marketingSolution.cta.desc"
        button1Key="marketingSolution.cta.button1"
        button2Key="marketingSolution.cta.button2"
        button2Href="https://connect.nabda-otp.com/docs"
      />
    </main>
  );
}