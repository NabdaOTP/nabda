import CountryPageTemplate from "@/components/shared/CountryPageTemplate";
import { countries } from "@/lib/countries";
import { ALL_COUNTRY_SLUGS, getCountryData } from "@/lib/country-data";
import {
  getCountryProductSchema,
  getCountryFAQSchema,
  getCountryBreadcrumbSchema,
  type Locale,
} from "@/lib/seo"; 
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = "https://www.nabdaotp.com";

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

export async function generateStaticParams() {
  return ALL_COUNTRY_SLUGS.flatMap((country) => {
    const locales = country === "turkey" ? ["en", "ar", "tr"] : ["en", "ar"];
    return locales.map((locale) => ({ locale, country }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country: slug } = await params;
  const country = getCountryData(slug);
  if (!country) return {};

  const isAR = locale === "ar";
  const isTR = locale === "tr";
  const data = isAR ? country.ar : isTR && country.tr ? country.tr : country;

  const canonicalPath = isAR
    ? `${BASE_URL}/ar/${slug}`
    : isTR
      ? `${BASE_URL}/tr/${slug}`
      : `${BASE_URL}/${slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: country.metaKeywords,
    metadataBase: new URL(BASE_URL),

    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/${slug}`,
        ar: `${BASE_URL}/ar/${slug}`,
        ...(slug === "turkey" ? { tr: `${BASE_URL}/tr/${slug}` } : {}),
        "x-default": `${BASE_URL}/${slug}`,
      },
    },

    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalPath,
      siteName: "Nabda OTP",
      locale: isAR ? "ar_SA" : isTR ? "tr_TR" : "en_US",
      type: "website",
      images: [
        { url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [`${BASE_URL}/assets/og-image.png`],
    },

    other: {
      "geo.region": country.countryCode,
      "geo.placename": country.countryName,
      "geo.position": country.geoPosition,
      ICBM: country.geoPosition,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─────────────────────────────────────────────
// Page Component JSON-LD Schemas
// ─────────────────────────────────────────────

export default async function CountryPage({ params }: Props) {
  const { locale, country: slug } = await params;
  const country = getCountryData(slug);

  if (!country) notFound();

  const countryMeta = countries.find((c) => c.slug === slug);
  const phoneExample = `${countryMeta?.dialCode ?? "+"}7XXXXXXXXX`;

  // 🎯 الـ schemas الجديدة
  const typedLocale = locale as Locale;
  const productSchema = getCountryProductSchema(country, typedLocale);
  const faqSchema = getCountryFAQSchema(country, typedLocale);
  const breadcrumbSchema = getCountryBreadcrumbSchema(country, typedLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CountryPageTemplate
        country={country}
        locale={typedLocale}
        phoneExample={phoneExample}
      />
    </>
  );
}
