import { useTranslations } from 'next-intl';

interface UseCase {
    emoji: string;
    textKey: string;
}

interface UseCasesListProps {
    labelKey: string;
    titleKey: string;
    useCases: UseCase[];
}

export default function UseCasesList({ labelKey, titleKey, useCases }: UseCasesListProps) {
    const t = useTranslations();

    return (
        <section className="bg-[#f8f9ff] dark:bg-[#0a1628] border-y border-gray-100 dark:border-white/8 py-16">
            <div className="container max-w-240 mx-auto px-6">
                {/* Label */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wide mb-3">
                    {t(labelKey as Parameters<typeof t>[0])}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-10 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>

                {/* Use cases grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {useCases.map((uc, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-5 rounded-xl bg-white dark:bg-white/4 border-s-4 border-[#635bff] shadow-sm"
                        >
                            <span className="text-2xl shrink-0">{uc.emoji}</span>
                            <span className="text-sm font-medium text-[#374151] dark:text-[#e2e8f0] leading-snug">
                                {t(uc.textKey as Parameters<typeof t>[0])}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}