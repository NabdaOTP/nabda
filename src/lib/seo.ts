import type { Metadata } from 'next';

const BASE_URL = 'https://www.nabdaotp.com';

type Locale = 'en' | 'ar' | 'tr';

interface PageSEO {
  locale: Locale;
  /** EN title — required */
  title: string;
  /** EN description — required (150-160 chars) */
  description: string;
  /** Path without locale prefix e.g. '/features' or '/iq' */
  path?: string;
  /** OG image path e.g. '/assets/og-features.png' — defaults to og-image.png */
  ogImage?: string;
  /** JSON-LD type — defaults to 'WebPage' */
  schemaType?: 'WebPage' | 'Article' | 'FAQPage' | 'Product';
}

export function generatePageMetadata({
  locale,
  title,
  description,
  path = '',
  ogImage = '/assets/og-image.png',
}: PageSEO): Metadata {

  const ogLocales: Record<Locale, string> = {
    en: 'en_US',
    ar: 'ar_SA',
    tr: 'tr_TR',
  };

  // EN = no prefix, AR/TR = with prefix
  const localePath = (loc: Locale) =>
    loc === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${loc}${path}`;

  const canonical = localePath(locale);

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: {
        en:          localePath('en'),
        ar:          localePath('ar'),
        tr:          localePath('tr'),
        'x-default': localePath('en'),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Nabda OTP',
      locale: ogLocales[locale],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

// ── Usage example in any page.tsx ─────────────────────────
//
// import { generatePageMetadata } from '@/lib/seo';
//
// export async function generateMetadata({ params }) {
//   const { locale } = await params;
//   return generatePageMetadata({
//     locale,
//     title: 'Nabda OTP Features — WhatsApp API for MENA',
//     description: 'Explore Nabda OTP features: unlimited messages, REST API, webhooks, media support. The most affordable WhatsApp API for Iraq, Syria & MENA.',
//     path: '/features',
//     ogImage: '/assets/og-features.png',
//   });
// }