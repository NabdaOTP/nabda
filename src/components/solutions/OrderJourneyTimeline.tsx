import { useTranslations } from 'next-intl';

interface JourneyStep {
    emoji: string;
    labelKey: string;
    titleKey: string;
    descKey: string;
}

interface OrderJourneyTimelineProps {
    labelKey: string;
    titleKey: string;
    steps: [JourneyStep, JourneyStep, JourneyStep, JourneyStep];
}

export default function OrderJourneyTimeline({
    labelKey,
    titleKey,
    steps,
}: OrderJourneyTimelineProps) {
    const t = useTranslations();

    return (
        <section className="bg-[#f8f9ff] dark:bg-[#0a1628] border-y border-gray-100 dark:border-white/8 py-16">
            <div className="container max-w-240 mx-auto px-6">
                {/* Label */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wide mb-3">
                    {t(labelKey as Parameters<typeof t>[0])}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-12 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line (hidden on mobile) */}
                    <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#635bff] via-[#00d4aa] to-[#635bff] opacity-20" />

                    {/* Steps */}
                    <div className="flex flex-col gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-5 relative">
                                {/* Icon */}
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-white/8 border-2 border-[#635bff] dark:border-[#635bff]/60 text-2xl shrink-0 z-10">
                                    {step.emoji}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-4">
                                    {/* Label */}
                                    <span className="inline-block text-xs font-bold uppercase tracking-wide text-[#635bff] dark:text-[#a89fff] mb-2">
                                        {t(step.labelKey as Parameters<typeof t>[0])}
                                    </span>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-[#0a2540] dark:text-white mb-2 leading-snug">
                                        {t(step.titleKey as Parameters<typeof t>[0])}
                                    </h4>

                                    {/* Message preview */}
                                    <div className="p-4 rounded-xl bg-white dark:bg-white/4 border border-gray-200 dark:border-white/10 shadow-sm">
                                        <p className="text-sm text-[#374151] dark:text-[#e2e8f0] leading-relaxed font-mono">
                                            {t(step.descKey as Parameters<typeof t>[0])}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}