import { Link } from '@/i18n/navigation';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SolutionHeroProps {
    icon: LucideIcon;
    titleKey: string;
    descKey: string;
    cta1Key: string;
    cta2Key: string;
    cta1Href?: string;
    cta2Href?: string;
    gradient?: string;
}

export default function SolutionHero({
    icon: Icon,
    titleKey,
    descKey,
    cta1Key,
    cta2Key,
    cta1Href = 'https://app.nabda-otp.com/en/login',
    cta2Href = 'https://connect.nabda-otp.com/docs',
    gradient = 'from-[#635bff] via-[#4f46e5] to-[#312e81]',
}: SolutionHeroProps) {
    const t = useTranslations();
    const tNav = useTranslations('nav');

    return (
        <section className={`relative overflow-hidden pt-20 pb-16 text-center bg-gradient-to-br ${gradient}`}>
            {/* Orb background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-blurple/8 dark:bg-white/8 blur-[100px]" />
            </div>

            <div className="relative max-w-300 mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center justify-center gap-1.5 text-sm mb-6 text-gray-500 dark:text-white/70">
                    <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        {tNav('home')}
                    </Link>
                    <ChevronRight size={14} />
                    <Link href="/solutions" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        {tNav('solutions')}
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 dark:text-white font-medium">{t(titleKey as Parameters<typeof t>[0])}</span>
                </nav>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-blurple/10 dark:bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Icon size={40} strokeWidth={1.75} className="text-blurple dark:text-white" />
                </div>

                {/* Title */}
                <h1 className="text-4xl md:px-4 md:text-[2.75rem] font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-white/90 max-w-145 mx-auto leading-relaxed mb-8">
                    {t(descKey as Parameters<typeof t>[0])}
                </p>

                {/* CTAs */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                        href={cta1Href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-7 py-3.5 rounded-full bg-blurple dark:bg-white text-white dark:text-blurple font-bold text-sm hover:bg-[#4f46e5] dark:hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t(cta1Key as Parameters<typeof t>[0])}
                    </a>
                    <a
                        href={cta2Href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-7 py-3 rounded-lg border-2 border-blurple/50 dark:border-white/60 text-blurple dark:text-white font-semibold text-sm hover:bg-blurple/8 dark:hover:bg-white/12 transition-colors"
                    >
                        {t(cta2Key as Parameters<typeof t>[0])}
                    </a>
                </div>
            </div>
        </section>
    );
}