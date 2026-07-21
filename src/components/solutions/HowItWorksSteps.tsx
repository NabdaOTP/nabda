import { useTranslations } from 'next-intl';

interface Step {
    titleKey: string;
    descKey: string;
}

interface HowItWorksStepsProps {
    labelKey: string;
    titleKey: string;
    steps: [Step, Step, Step, Step];
}

export default function HowItWorksSteps({ labelKey, titleKey, steps }: HowItWorksStepsProps) {
    const t = useTranslations();

    return (
        <section className="bg-[#f8f9ff] dark:bg-[#0a1628] border-y border-gray-100 dark:border-white/8 py-12">
            <div className="container max-w-240 mx-auto px-6">
                {/* Label */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wide mb-3">
                    {t(labelKey as Parameters<typeof t>[0])}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-8 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            {/* Step number */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#635bff] text-white font-bold text-lg shrink-0">
                                {i + 1}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-[#0a2540] dark:text-white mb-2 leading-snug">
                                    {t(step.titleKey as Parameters<typeof t>[0])}
                                </h4>
                                <p className="text-sm leading-relaxed text-[#425466] dark:text-[#8899a6]">
                                    {t(step.descKey as Parameters<typeof t>[0])}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}