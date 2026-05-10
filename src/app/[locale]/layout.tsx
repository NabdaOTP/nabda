import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer'
import '@/app/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import WhatsAppFloat from '@/components/home/WhatsAppFloat';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://www.nabdaotp.com';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Nabda OTP — Cheapest WhatsApp API for Iraq, Syria & MENA',
    ar: 'نبضة OTP — أرخص واتساب API للعراق وسوريا ومنطقة الشرق الأوسط',
    tr: 'Nabda OTP — Türkiye ve MENA için En Ucuz WhatsApp API',
  };

  const descriptions = {
    en: 'Send unlimited WhatsApp OTPs from $10/month. No per-message fees, REST API, webhooks, 5-day free trial. The #1 WhatsApp gateway for Iraq, Syria, Egypt, Saudi Arabia & MENA.',
    ar: 'أرسل رسائل واتساب OTP بدون حد أدنى مقابل 10 دولار/شهر. بدون رسوم لكل رسالة، REST API، Webhook، تجربة مجانية 5 أيام. أفضل خدمة OTP في العراق وسوريا ومصر.',
    tr: 'Aylık 10$\'dan başlayan fiyatlarla sınırsız WhatsApp OTP gönderin. Mesaj başına ücret yok, REST API, webhook, 5 günlük ücretsiz deneme. Türkiye ve MENA için #1 WhatsApp gateway.',
  };

  const ogLocales = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' };

  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const ogLoc = ogLocales[locale as keyof typeof ogLocales] ?? 'en_US';

  // Canonical URL: EN = no prefix, AR/TR = with prefix
  const canonicalPath = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | Nabda OTP`,
    },
    description: desc,

    metadataBase: new URL(BASE_URL),

    // Canonical + hreflang
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': BASE_URL,
        'ar': `${BASE_URL}/ar`,
        'tr': `${BASE_URL}/tr`,
        'x-default': BASE_URL,
      },
    },

    // Open Graph
    openGraph: {
      title,
      description: desc,
      url: canonicalPath,
      siteName: 'Nabda OTP',
      locale: ogLoc,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/assets/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Nabda OTP — Cheapest WhatsApp API for MENA',
        },
      ],
    },

    // Twitter / X
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${BASE_URL}/assets/og-image.png`],
    },

    // Robots
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


export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar' | 'tr')) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <body
        className={isRTL ? 'font-arabic' : 'font-inter'}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}