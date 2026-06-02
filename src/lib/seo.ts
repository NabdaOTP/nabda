// import type { Metadata } from 'next';

// const BASE_URL = 'https://www.nabdaotp.com';

// type Locale = 'en' | 'ar' | 'tr';

// interface PageSEO {
//   locale: Locale;
//   /** EN title — required */
//   title: string;
//   /** EN description — required (150-160 chars) */
//   description: string;
//   /** Path without locale prefix e.g. '/features' or '/iq' */
//   path?: string;
//   /** OG image path e.g. '/assets/og-features.png' — defaults to og-image.png */
//   ogImage?: string;
//   /** JSON-LD type — defaults to 'WebPage' */
//   schemaType?: 'WebPage' | 'Article' | 'FAQPage' | 'Product';
// }

// export function generatePageMetadata({
//   locale,
//   title,
//   description,
//   path = '',
//   ogImage = '/assets/og-image.png',
// }: PageSEO): Metadata {

//   const ogLocales: Record<Locale, string> = {
//     en: 'en_US',
//     ar: 'ar_SA',
//     tr: 'tr_TR',
//   };

//   // EN = no prefix, AR/TR = with prefix
//   const localePath = (loc: Locale) =>
//     loc === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${loc}${path}`;

//   const canonical = localePath(locale);

//   return {
//     title,
//     description,
//     metadataBase: new URL(BASE_URL),
//     alternates: {
//       canonical,
//       languages: {
//         en:          localePath('en'),
//         ar:          localePath('ar'),
//         tr:          localePath('tr'),
//         'x-default': localePath('en'),
//       },
//     },
//     openGraph: {
//       title,
//       description,
//       url: canonical,
//       siteName: 'Nabda OTP',
//       locale: ogLocales[locale],
//       type: 'website',
//       images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [ogImage],
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
//     },
//   };
// }

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

import type { Metadata } from 'next';
import type { CountryData } from './country-data';

const BASE_URL = 'https://www.nabdaotp.com';

export type Locale = 'en' | 'ar' | 'tr';

// ─────────────────────────────────────────────
// 1. Generic Page Metadata 
// ─────────────────────────────────────────────

interface PageSEO {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
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
        en: localePath('en'),
        ar: localePath('ar'),
        tr: localePath('tr'),
        'x-default': localePath('en'),
      },
    },
    openGraph: {
      title, description, url: canonical,
      siteName: 'Nabda OTP',
      locale: ogLocales[locale],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title, description, images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

// ─────────────────────────────────────────────
// 2. Organization Schema 
// ─────────────────────────────────────────────

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nabda OTP',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/logo.png`,
    description: 'Cheapest WhatsApp Business API for MENA and Turkey',
    sameAs: [
      
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Arabic', 'Turkish'],
    },
  };
}

// ─────────────────────────────────────────────
// 3. Website Schema 
// ─────────────────────────────────────────────

export function getWebsiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nabda OTP',
    url: BASE_URL,
    inLanguage: locale === 'ar' ? 'ar' : locale === 'tr' ? 'tr' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Nabda OTP',
    },
  };
}

// ─────────────────────────────────────────────
// 4. Country Product Schema 
// ─────────────────────────────────────────────

export function getCountryProductSchema(country: CountryData, locale: Locale) {
  const data = locale === 'ar' ? country.ar : country;
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Nabda OTP - WhatsApp API for ${country.countryName}`,
    description: data.metaDescription,
    brand: { '@type': 'Brand', name: 'Nabda OTP' },
    image: `${BASE_URL}/assets/og-image.png`,
    offers: {
      '@type': 'Offer',
      price: '10',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}${localePrefix}/${country.slug}`,
      priceValidUntil: '2026-12-31',
      seller: { '@type': 'Organization', name: 'Nabda OTP' },
    },
    areaServed: {
      '@type': 'Country',
      name: country.countryName,
    },
  };
}

// ─────────────────────────────────────────────
// 5. Country FAQ Schema 
// ─────────────────────────────────────────────

export function getCountryFAQSchema(country: CountryData, locale: Locale) {
  const data = locale === 'ar' ? country.ar : country;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────
// 6. Breadcrumb Schema
// ─────────────────────────────────────────────

export function getCountryBreadcrumbSchema(country: CountryData, locale: Locale) {
  const isAR = locale === 'ar';
  const isTR = locale === 'tr';

  const homeUrl = isAR
    ? `${BASE_URL}/ar`
    : isTR
      ? `${BASE_URL}/tr`
      : BASE_URL;

  const countryUrl = `${homeUrl}/${country.slug}`;

  const homeName = isAR ? 'الرئيسية' : isTR ? 'Ana Sayfa' : 'Home';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: country.countryName, item: countryUrl },
    ],
  };
}