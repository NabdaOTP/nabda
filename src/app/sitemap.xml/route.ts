// sitemap.xml/route.ts
import { NextResponse } from 'next/server';

const baseUrl = 'https://www.nabdaotp.com';

const locales = ['en', 'ar', 'tr'] as const;
type Locale = (typeof locales)[number];

const getLocalizedUrl = (locale: Locale, path: string = ''): string => {
  if (locale === 'en') return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
};

const localizedPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0, lastmod: '2026-05-31' },
  { path: '/solutions', changefreq: 'monthly' as const, priority: 0.8, lastmod: '2026-05-15' },
  { path: '/comparing', changefreq: 'monthly' as const, priority: 0.8, lastmod: '2026-05-15' },
  { path: '/blogs', changefreq: 'monthly' as const, priority: 0.85, lastmod: '2026-05-20' },
  { path: '/about', changefreq: 'monthly' as const, priority: 0.7, lastmod: '2026-04-15' },
  { path: '/privacy-policy', changefreq: 'yearly' as const, priority: 0.5, lastmod: '2026-01-01' },
  { path: '/terms-of-service', changefreq: 'yearly' as const, priority: 0.5, lastmod: '2026-01-01' },
  { path: '/refund-policy', changefreq: 'yearly' as const, priority: 0.5, lastmod: '2026-01-01' },
];

const subPages = [
  // Solutions
  { path: '/solutions/otp-verification', lastmod: '2026-05-10' },
  { path: '/solutions/order-confirmations', lastmod: '2026-05-10' },
  { path: '/solutions/account-security', lastmod: '2026-05-10' },
  { path: '/solutions/appointment-reminders', lastmod: '2026-05-10' },
  { path: '/solutions/marketing', lastmod: '2026-05-10' },
  // Comparing
  { path: '/comparing/nabda-vs-ultramsg', lastmod: '2026-05-05' },
  { path: '/comparing/nabda-vs-twilio', lastmod: '2026-05-05' },
  { path: '/comparing/nabda-vs-official', lastmod: '2026-05-05' },
  { path: '/comparing/nabda-vs-bulk-sms', lastmod: '2026-05-05' },
  { path: '/comparing/nabda-vs-otpiq', lastmod: '2026-05-05' },
  { path: '/comparing/nabda-vs-alternatives', lastmod: '2026-05-05' },
  // Blogs
  { path: '/blogs/whatsapp-otp-iraq-guide', lastmod: '2026-04-20' },
  { path: '/blogs/whatsapp-replacing-sms', lastmod: '2026-04-15' },
  { path: '/blogs/bundle-vs-instance', lastmod: '2026-04-10' },
  { path: '/blogs/whatsapp-otp-mistakes', lastmod: '2026-03-25' },
  { path: '/blogs/whatsapp-vs-sms-cost', lastmod: '2026-03-20' },
].map(p => ({ ...p, changefreq: 'monthly' as const, priority: 0.75 }));

const countries = [
  { slug: 'egypt', languages: ['en', 'ar'] as const },
  { slug: 'iraq', languages: ['en', 'ar'] as const },
  { slug: 'saudi-arabia', languages: ['en', 'ar'] as const },
  { slug: 'qatar', languages: ['en', 'ar'] as const },
  { slug: 'jordan', languages: ['en', 'ar'] as const },
  { slug: 'united-arab-emirates', languages: ['en', 'ar'] as const },
  { slug: 'syria', languages: ['en', 'ar'] as const },
  { slug: 'usa', languages: ['en', 'ar'] as const },
  { slug: 'kuwait', languages: ['en', 'ar'] as const },
  { slug: 'bahrain', languages: ['en', 'ar'] as const },
  { slug: 'germany', languages: ['en', 'ar'] as const },
  { slug: 'algeria', languages: ['en', 'ar'] as const },
  { slug: 'lebanon', languages: ['en', 'ar'] as const },
  { slug: 'libya', languages: ['en', 'ar'] as const },
  { slug: 'morocco', languages: ['en', 'ar'] as const },
  { slug: 'oman', languages: ['en', 'ar'] as const },
  { slug: 'palestine', languages: ['en', 'ar'] as const },
  { slug: 'sudan', languages: ['en', 'ar'] as const },
  { slug: 'tunisia', languages: ['en', 'ar'] as const },
  { slug: 'yemen', languages: ['en', 'ar'] as const },
  { slug: 'france', languages: ['en', 'ar'] as const },
  { slug: 'netherlands', languages: ['en', 'ar'] as const },
  { slug: 'spain', languages: ['en', 'ar'] as const },
  { slug: 'italy', languages: ['en', 'ar'] as const },
  { slug: 'poland', languages: ['en', 'ar'] as const },
  { slug: 'sweden', languages: ['en', 'ar'] as const },
  { slug: 'belgium', languages: ['en', 'ar'] as const },
  { slug: 'united-kingdom', languages: ['en', 'ar'] as const },
  { slug: 'canada', languages: ['en', 'ar'] as const },
  { slug: 'india', languages: ['en', 'ar'] as const },
  { slug: 'pakistan', languages: ['en', 'ar'] as const },
  { slug: 'indonesia', languages: ['en', 'ar'] as const },
  { slug: 'malaysia', languages: ['en', 'ar'] as const },
  { slug: 'bangladesh', languages: ['en', 'ar'] as const },
  { slug: 'turkey', languages: ['en', 'ar', 'tr'] as const },
];

const COUNTRY_LASTMOD = '2026-05-25';

export async function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const allPages = [...localizedPages, ...subPages];

  allPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = getLocalizedUrl(locale, page.path);
      const enUrl = getLocalizedUrl('en', page.path);

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

      locales.forEach((altLocale) => {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${getLocalizedUrl(altLocale, page.path)}"/>`;
      });
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`;

      if (page.path === '') {
        xml += `
    <image:image>
      <image:loc>${baseUrl}/assets/og-image.png</image:loc>
      <image:title>Nabda OTP - Cheapest WhatsApp API</image:title>
      <image:caption>Unlimited WhatsApp messages, REST API, webhooks, media support, 5-day trial — from $10/month MENA.</image:caption>
    </image:image>`;
      }

      xml += `
  </url>`;
    });
  });


  countries.forEach((country) => {
    country.languages.forEach((locale) => {
      const url = locale === 'en'
        ? `${baseUrl}/${country.slug}`
        : `${baseUrl}/${locale}/${country.slug}`;
      const enUrl = `${baseUrl}/${country.slug}`;

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${COUNTRY_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>`;

      country.languages.forEach((altLocale) => {
        const altUrl = altLocale === 'en'
          ? `${baseUrl}/${country.slug}`
          : `${baseUrl}/${altLocale}/${country.slug}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>`;
      });
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>`;
    });
  });


  xml += `
  <url>
    <loc>${baseUrl}/llms.txt</loc>
    <lastmod>2026-05-01</lastmod>
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