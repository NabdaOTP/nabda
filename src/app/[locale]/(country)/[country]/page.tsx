import CountryPageTemplate from '@/components/shared/CountryPageTemplate';
import { countries } from '@/lib/countries';
import { ALL_COUNTRY_SLUGS, getCountryData } from '@/lib/country-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const BASE_URL = 'https://www.nabdaotp.com';

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

// Static generation 
export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  return ALL_COUNTRY_SLUGS.flatMap((country) =>
    locales.map((locale) => ({ locale, country }))
  );
}

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country: slug } = await params;
  const country = getCountryData(slug);
  if (!country) return {};

  const isAR = locale === 'ar';
  const data  = isAR ? country.ar : country;

  const canonicalPath = isAR
    ? `${BASE_URL}/ar/${slug}/`
    : `${BASE_URL}/${slug}/`;

  return {
    title:       data.metaTitle,
    description: data.metaDescription,
    keywords:    country.metaKeywords,
    metadataBase: new URL(BASE_URL),

    alternates: {
      canonical: canonicalPath,
      languages: {
        'en':        `${BASE_URL}/${slug}/`,
        'ar':        `${BASE_URL}/ar/${slug}/`,
        'x-default': `${BASE_URL}/${slug}/`,
      },
    },

    openGraph: {
      title:       data.metaTitle,
      description: data.metaDescription,
      url:         canonicalPath,
      siteName:    'Nabda OTP',
      locale:      isAR ? 'ar_SA' : 'en_US',
      type:        'website',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       data.metaTitle,
      description: data.metaDescription,
      images:      [`${BASE_URL}/assets/og-image.png`],
    },

    // Geo targeting — custom meta via Next.js 'other'
    other: {
      'geo.region':    country.countryCode,
      'geo.placename': country.countryName,
      'geo.position':  country.geoPosition,
      'ICBM':          country.geoPosition,
    },

    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

// Page Component 
export default async function CountryPage({ params }: Props) {
  const { locale, country: slug } = await params;
  const country = getCountryData(slug);

  if (!country) notFound();

  // Get dial code from existing countries.ts
  const countryMeta = countries.find((c) => c.slug === slug);
  const phoneExample = `${countryMeta?.dialCode ?? '+'}7XXXXXXXXX`;

  return (
    <CountryPageTemplate
      country={country}
      locale={locale as 'en' | 'ar' | 'tr'}
      phoneExample={phoneExample}
    />
  );
}