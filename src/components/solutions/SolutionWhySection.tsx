import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface SolutionWhySectionProps {
    labelKey: string;
    titleKey: string;
    descKey: string;
    children: ReactNode;
}

export default function SolutionWhySection({
    labelKey,
    titleKey,
    descKey,
    children,
}: SolutionWhySectionProps) {
    const t = useTranslations();

    return (
        <section className="py-16">
            <div className="container max-w-240 mx-auto px-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wide mb-3">
                    {t(labelKey as Parameters<typeof t>[0])}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-4 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>
                <p className="text-base leading-relaxed text-[#425466] dark:text-[#8899a6] mb-6 max-w-200">
                    {t(descKey as Parameters<typeof t>[0])}
                </p>
                {children}
            </div>
        </section>
    );
}
