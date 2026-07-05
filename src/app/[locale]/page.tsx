import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import Partner  from '@/components/home/Partner';
import Features from '@/components/home/Features';
import FAQ      from '@/components/home/FAQ';
import CTA      from '@/components/home/CTA';
import Payment  from '@/components/home/Payment';
import GeoLocationBannerLoader from '@/components/home/GeoLocationBannerLoader';

// Client-heavy components: split into deferred JS chunks, SSR stays on
const Stats   = dynamic(() => import('@/components/home/Stats'));
const Pricing = dynamic(() => import('@/components/home/Pricing'));

const BASE_URL = 'https://www.nabdaotp.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nabda OTP',
  url: BASE_URL,
  logo: `${BASE_URL}/assets/android-chrome-192x192.png`,
  description:
    'The cheapest WhatsApp API for Iraq, Syria, and MENA. Unlimited messages, REST API, webhooks, from $10/month.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://wa.me/905352682350',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nabda OTP',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/blogs?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Nabda OTP',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '10',
    priceCurrency: 'USD',
    priceValidUntil: '2027-01-01',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '65',
    bestRating: '5',
  },
  description:
    'WhatsApp API gateway for OTP verification, order confirmations, and business messaging in MENA. From $10/month with no per-message fees.',
};

export default async function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <Hero />
      <Stats />
      <Partner />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Payment />
      <GeoLocationBannerLoader />
    </>
  );
}
