import { useTranslations } from 'next-intl';

interface Stat {
    value: string;
    labelKey: string;
}

interface StatsBarProps {
    stats: [Stat, Stat, Stat, Stat];
}

export default function StatsBar({ stats }: StatsBarProps) {
    const t = useTranslations();

    return (
        <section className="bg-[#f8f9ff] dark:bg-[#0a1628] border-y border-gray-100 dark:border-white/8 py-7">
            <div className="container max-w-300 mx-auto px-6">
                <div className="flex items-center justify-center gap-8 md:gap-10 flex-wrap">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <span className="block text-3xl font-extrabold text-[#635bff] dark:text-[#a89fff]">
                                {stat.value}
                            </span>
                            <span className="block text-xs text-[#6b7280] dark:text-[#8899a6] mt-1 font-medium">
                                {t(stat.labelKey as Parameters<typeof t>[0])}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}