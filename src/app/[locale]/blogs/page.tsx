import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ChevronRight, Clock, ArrowRight } from 'lucide-react';
import GetStartCard from '@/components/shared/GetStartCard';


const BASE_URL = 'https://www.nabdaotp.com';
type Props = { params: Promise<{ locale: string }> };

// Metadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'Blog — Nabda OTP | WhatsApp API Guides & Insights',
    ar: 'المدونة — نبضة OTP | أدلة وتقارير واتساب API',
    tr: 'Blog — Nabda OTP | WhatsApp API Kılavuzları',
  };
  const descriptions = {
    en: 'Latest guides, tutorials, and insights about WhatsApp API, OTP solutions, and messaging best practices for businesses in Iraq, Syria, Egypt and MENA.',
    ar: 'أحدث الأدلة والدروس التعليمية حول واتساب API وحلول OTP وأفضل ممارسات المراسلة للشركات في العراق وسوريا ومصر ومنطقة الشرق الأوسط.',
    tr: 'WhatsApp API, OTP çözümleri ve Irak, Suriye, Mısır ve MENA\'daki işletmeler için mesajlaşma en iyi uygulamaları hakkında en son kılavuzlar.',
  };
  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const desc  = descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  const canonicalPath = locale === 'en' ? `${BASE_URL}/blogs` : `${BASE_URL}/${locale}/blogs`;

  return {
    title, description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${BASE_URL}/blogs`, ar: `${BASE_URL}/ar/blogs`,
        tr: `${BASE_URL}/tr/blogs`, 'x-default': `${BASE_URL}/blogs`,
      },
    },
    openGraph: {
      title, description: desc, url: canonicalPath,
      siteName: 'Nabda OTP', type: 'website',
      images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: desc },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

// Blog posts data 
const BLOG_POSTS = [
  {
    slug:    'whatsapp-otp-iraq-guide',
    titleKey: 'blogs.post1.title',
    descKey:  'blogs.post1.desc',
    date:    'March 25, 2026',
    image:   '/images/blogs/otp-guide.webp',
    imageAlt: 'How to Send OTP via WhatsApp API',
    readTime: '8 min read',
    tag:     'Guide',
  },
  {
    slug:    'whatsapp-replacing-sms',
    titleKey: 'blogs.post2.title',
    descKey:  'blogs.post2.desc',
    date:    'March 15, 2026',
    image:   '/images/blogs/how-whatsapp-otp-works.webp',
    imageAlt: 'WhatsApp replacing SMS in MENA',
    readTime: '6 min read',
    tag:     'Trends',
  },
  {
    slug:    'bundle-vs-instance',
    titleKey: 'blogs.post3.title',
    descKey:  'blogs.post3.desc',
    date:    'April 10, 2026',
    image:   '/images/blogs/bundle-vs-instance.jpg',
    imageAlt: 'WhatsApp Bundle vs Single Instance',
    readTime: '5 min read',
    tag:     'Product',
  },
  {
    slug:    'whatsapp-otp-mistakes',
    titleKey: 'blogs.post4.title',
    descKey:  'blogs.post4.desc',
    date:    'April 20, 2026',
    image:   '/images/blogs/top-5-mistakes.webp',
    imageAlt: 'Top 5 WhatsApp OTP Mistakes Developers Make',
    readTime: '7 min read',
    tag:     'Developer',
  },
  {
    slug:    'whatsapp-vs-sms-cost',
    titleKey: 'blogs.post5.title',
    descKey:  'blogs.post5.desc',
    date:    'May 1, 2026',
    image:   '/images/blogs/cost-comparing.avif',
    imageAlt: 'WhatsApp API vs SMS OTP Cost Comparison MENA',
    readTime: '6 min read',
    tag:     'Comparison',
  },
] as const;

// Tag colors 
const TAG_COLORS: Record<string, string> = {
  Guide:      'bg-[#635bff]/10 text-[#635bff] dark:bg-[#635bff]/20 dark:text-[#a89fff]',
  Trends:     'bg-[#00d4aa]/10 text-[#00a88a] dark:bg-[#00d4aa]/15 dark:text-[#00d4aa]',
  Product:    'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  Developer:  'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400',
  Comparison: 'bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400',
};

export default function BlogsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-[#060f1e] dark:to-[#0a1628]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden pt-20 pb-14 text-center bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe] dark:from-[#0a2540] dark:via-[#0d1b2e] dark:to-[#0a1628]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#635bff]/10 blur-[100px] dark:bg-[#635bff]/20" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6">
          <nav className="flex items-center justify-center gap-1.5 text-sm mb-6 text-[#64748b] dark:text-[#475569]">
            <Link href="/" className="hover:text-[#635bff] transition-colors">
              {t('nav.home') ?? 'Home'}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0a2540] dark:text-white font-medium">{t('nav.blogs')}</span>
          </nav>
          <h1 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight mb-4 text-[#0a2540] dark:text-white">
            {t('blogs.title')}
          </h1>
          <p className="text-lg text-[#425466] dark:text-[#8899a6] max-w-[560px] mx-auto leading-relaxed">
            {t('blogs.subtitle')}
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Published posts */}
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border bg-white border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,91,255,0.12)] hover:-translate-y-1.5 transition-all duration-300 dark:bg-white/4 dark:border-white/8 dark:hover:bg-white/6"
            >
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-white/5">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={post.image.startsWith('http')}
                />
                {/* Tag badge */}
                <span className={`absolute top-3 start-3 px-2.5 py-1 rounded-full text-xs font-semibold ${TAG_COLORS[post.tag] ?? TAG_COLORS.Guide}`}>
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                <div className="flex items-center gap-3 text-xs text-[#94a3b8] dark:text-[#475569]">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-[1.0625rem] font-bold leading-snug text-[#0a2540] dark:text-white group-hover:text-[#635bff] dark:group-hover:text-[#a89fff] transition-colors">
                  {t(post.titleKey as Parameters<typeof t>[0])}
                </h3>

                <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6] flex-1 line-clamp-2">
                  {t(post.descKey as Parameters<typeof t>[0])}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#635bff] dark:text-[#a89fff] mt-auto">
                  {t('blogs.readMore')}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}

          {/* Coming Soon card */}
          <div className="flex flex-col rounded-2xl overflow-hidden border bg-white border-gray-100 shadow-sm opacity-70 dark:bg-white/4 dark:border-white/8 cursor-default">
            <div className="relative h-[200px] overflow-hidden bg-linear-to-br from-[#f0f1ff] to-[#e0e7ff] dark:from-[#1a1040] dark:to-[#0d1b2e]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#635bff]/15 dark:bg-[#635bff]/20 flex items-center justify-center">
                    <span className="text-3xl">✍️</span>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#635bff]/15 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-6 flex-1">
              <div className="h-3 rounded-full bg-gray-100 dark:bg-white/8 w-1/3" />
              <h3 className="text-[1.0625rem] font-bold leading-snug text-[#0a2540] dark:text-white">
                {t('blogs.comingSoon.title')}
              </h3>
              <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">
                {t('blogs.comingSoon.desc')}
              </p>
              <span className="text-sm font-semibold text-[#94a3b8] dark:text-[#475569] mt-auto">
                {t('blogs.comingSoon.stayTuned')}
              </span>
            </div>
          </div>
        </div>
      </section>
      <GetStartCard/>
    </main>
  );
}