import { useTranslations } from 'next-intl';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ComparisonHeroProps {
    competitorName: string;
    badgeKey: string;
    titleKey: string;
    subtitleKey: string;
    cta1Key: string;
    cta2Key: string;
    icon?: LucideIcon;
}

export default function ComparisonHero({
    competitorName,
    badgeKey,
    titleKey,
    subtitleKey,
    cta1Key,
    cta2Key,
    icon: Icon,
}: ComparisonHeroProps) {
    const t = useTranslations();

    return (
        <section className="relative pt-32 pb-16 bg-linear-to-b from-[#f8f9ff] to-white dark:from-[#0a1628] dark:to-[#060f1e]">
            <div className="container max-w-240 mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] mb-6">
                    <Link href="/" className="hover:text-[#635bff] dark:hover:text-[#a89fff] transition-colors">
                        {t('nav.home')}
                    </Link>
                    <span>/</span>
                    <Link href="/comparing" className="hover:text-[#635bff] dark:hover:text-[#a89fff] transition-colors">
                        {t('nav.comparing')}
                    </Link>
                    <span>/</span>
                    <span className="text-[#0a2540] dark:text-white font-medium">
                        Nabda OTP vs {competitorName}
                    </span>
                </nav>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-sm font-bold uppercase tracking-wide mb-4">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{t(badgeKey as Parameters<typeof t>[0])}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0a2540] dark:text-white mb-4 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-[#475569] dark:text-[#94a3b8] mb-8 max-w-3xl leading-relaxed">
                    {t(subtitleKey as Parameters<typeof t>[0])}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="https://app.nabda-otp.com/en/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold text-base transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        {t(cta1Key as Parameters<typeof t>[0])}
                    </Link>
                    <Link
                        href="https://connect.nabdaotp.com/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-[#635bff] text-[#635bff] dark:border-[#a89fff] dark:text-[#a89fff] hover:bg-[#635bff]/10 dark:hover:bg-[#635bff]/20 font-bold text-base transition-all"
                    >
                        {t(cta2Key as Parameters<typeof t>[0])}
                    </Link>
                </div>
            </div>
        </section>
    );
}