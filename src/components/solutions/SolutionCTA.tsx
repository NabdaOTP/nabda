import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SolutionCTAProps {
    titleKey: string;
    descKey: string;
    button1Key: string;
    button2Key: string;
    button1Href?: string;
    button2Href?: string;
}

export default function SolutionCTA({
    titleKey,
    descKey,
    button1Key,
    button2Key,
    button1Href = 'https://dash.nabdaotp.com/en/signup',
    button2Href = '/blogs/whatsapp-otp-iraq-guide',
}: SolutionCTAProps) {
    const t = useTranslations();

    return (
        <section className="py-18 text-center">
            <div className="container max-w-200 mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-4 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>

                <p className="text-base text-[#6b7280] dark:text-[#8899a6] max-w-125 mx-auto leading-relaxed mb-8">
                    {t(descKey as Parameters<typeof t>[0])}
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    {/* Primary CTA */}
                    <a
                        href={button1Href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#635bff] text-white font-bold text-sm hover:bg-[#4f46e5] hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t(button1Key as Parameters<typeof t>[0])}
                    </a>

                    {/* Secondary CTA */}
                    <Link
                        href={button2Href}
                        className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-lg border border-gray-200 dark:border-white/10 text-[#0a2540] dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        {t(button2Key as Parameters<typeof t>[0])}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}