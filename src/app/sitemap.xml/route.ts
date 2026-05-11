import { NextResponse } from 'next/server';

const baseUrl = 'https://www.nabdaotp.com';
const today = new Date().toISOString().split('T')[0];

const locales = ['en', 'ar', 'tr'] as const;
type Locale = (typeof locales)[number];

const getLocalizedUrl = (locale: Locale, path: string = ''): string => {
  if (locale === 'en') return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
};

const localizedPages = [
  { path: '',                changefreq: 'weekly'  as const, priority: 1.0  },
  { path: '/solutions',     changefreq: 'monthly' as const, priority: 0.8  },
  { path: '/comparing',     changefreq: 'monthly' as const, priority: 0.8  },
  { path: '/blogs',         changefreq: 'monthly' as const, priority: 0.85 },
  { path: '/about',         changefreq: 'monthly' as const, priority: 0.7  },
  { path: '/privacy-policy',    changefreq: 'yearly' as const, priority: 0.5 },
  { path: '/terms-of-service',  changefreq: 'yearly' as const, priority: 0.5 },
  { path: '/refund-policy',     changefreq: 'yearly' as const, priority: 0.5 },
];

const subPages = [
  // Solutions
  { path: '/solutions/otp-verification',      changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/solutions/order-confirmations',   changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/solutions/account-security',      changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/solutions/appointment-reminders', changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/solutions/marketing',             changefreq: 'monthly' as const, priority: 0.75 },

  // Comparing
  { path: '/comparing/nabda-vs-ultramsg',     changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/comparing/nabda-vs-twilio',       changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/comparing/nabda-vs-official',     changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/comparing/nabda-vs-bulk-sms',     changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/comparing/nabda-vs-otpiq',        changefreq: 'monthly' as const, priority: 0.75 },
  { path: '/comparing/nabda-vs-alternatives', changefreq: 'monthly' as const, priority: 0.75 },

  // Blogs
  { path: '/blogs/whatsapp-otp-iraq-guide',   changefreq: 'monthly' as const, priority: 0.85 },
  { path: '/blogs/whatsapp-replacing-sms',    changefreq: 'monthly' as const, priority: 0.85 },
  { path: '/blogs/bundle-vs-instance',        changefreq: 'monthly' as const, priority: 0.85 },
  { path: '/blogs/whatsapp-otp-mistakes',     changefreq: 'monthly' as const, priority: 0.85 },
  { path: '/blogs/whatsapp-vs-sms-cost',      changefreq: 'monthly' as const, priority: 0.85 },
];

const countries = [
  { slug: 'eg',     languages: ['en', 'ar'] as const },
  { slug: 'iq',     languages: ['en', 'ar'] as const },
  { slug: 'sa',     languages: ['en', 'ar'] as const },
  { slug: 'qa',     languages: ['en', 'ar'] as const },
  { slug: 'jo',     languages: ['en', 'ar'] as const },
  { slug: 'ae',     languages: ['en', 'ar'] as const },
  { slug: 'sy',     languages: ['en', 'ar'] as const },
  { slug: 'us',     languages: ['en', 'ar'] as const },
  { slug: 'kw',     languages: ['en', 'ar'] as const },
  { slug: 'bh',     languages: ['en', 'ar'] as const },
  { slug: 'de',     languages: ['en', 'ar'] as const },
  { slug: 'dz',     languages: ['en', 'ar'] as const },
  { slug: 'lb',     languages: ['en', 'ar'] as const },
  { slug: 'ly',     languages: ['en', 'ar'] as const },
  { slug: 'ma',     languages: ['en', 'ar'] as const },
  { slug: 'om',     languages: ['en', 'ar'] as const },
  { slug: 'ps',     languages: ['en', 'ar'] as const },
  { slug: 'sd',     languages: ['en', 'ar'] as const },
  { slug: 'tn',     languages: ['en', 'ar'] as const },
  { slug: 'ye',     languages: ['en', 'ar'] as const },
];

export async function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // ── 1. Localized pages (all 3 locales) ──
  const allPages = [...localizedPages, ...subPages];

  allPages.forEach((page) => {
    locales.forEach((locale) => {
      const url   = getLocalizedUrl(locale, page.path);
      const enUrl = getLocalizedUrl('en', page.path);

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

      // hreflang alternates
      locales.forEach((altLocale) => {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${getLocalizedUrl(altLocale, page.path)}"/>`;
      });
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`;

      // OG image on homepage only
      if (page.path === '') {
        xml += `
    <image:image>
      <image:loc>${baseUrl}/assets/og-image.png</image:loc>
      <image:title>Nabda OTP - Cheapest WhatsApp API</image:title>
      <image:caption>Unlimited WhatsApp messages, REST API, webhooks, media and documents, 5-day trial, priority support — from $10/month MENA.</image:caption>
    </image:image>`;
      }

      xml += `
  </url>`;
    });
  });

  // 2. Country pages (EN + AR, Turkey gets TR too) 
  countries.forEach((country) => {
    country.languages.forEach((locale) => {
      const url   = locale === 'en'
        ? `${baseUrl}/${country.slug}/`
        : `${baseUrl}/${locale}/${country.slug}/`;
      const enUrl = `${baseUrl}/${country.slug}/`;

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>`;

      country.languages.forEach((altLocale) => {
        const altUrl = altLocale === 'en'
          ? `${baseUrl}/${country.slug}/`
          : `${baseUrl}/${altLocale}/${country.slug}/`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>`;
      });
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`;
      xml += `
  </url>`;
    });
  });

  // 3. llms.txt 
  xml += `
  <url>
    <loc>${baseUrl}/llms.txt</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;

  xml += '\n</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}