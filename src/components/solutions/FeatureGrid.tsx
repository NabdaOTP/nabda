import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Feature {
    emoji: string;
    titleKey: string;
    descKey: string;
}

interface FeatureGridProps {
    features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
    const t = useTranslations();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {features.map((feat, i) => (
                <div
                    key={i}
                    className="group flex flex-col gap-3 p-6 rounded-2xl border bg-white border-gray-100 shadow-sm transition-all duration-300 hover:shadow-[0_8px_28px_rgba(99,91,255,0.12)] hover:-translate-y-1 hover:border-[#635bff]/30 dark:bg-white/4 dark:border-white/8 dark:hover:bg-white/6"
                >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#635bff]/10 dark:bg-[#635bff]/20 text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {feat.emoji}
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-[#0a2540] dark:text-white leading-snug">
                        {t(feat.titleKey as Parameters<typeof t>[0])}
                    </h4>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">
                        {t(feat.descKey as Parameters<typeof t>[0])}
                    </p>
                </div>
            ))}
        </div>
    );
}