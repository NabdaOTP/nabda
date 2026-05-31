import { useTranslations } from 'next-intl';

interface WhyCard {
    titleKey: string;
    descKey: string;
}

interface WhyNabdaCardsProps {
    baseKey: string;
    cards: [WhyCard, WhyCard, WhyCard];
}

export default function WhyNabdaCards({ baseKey, cards }: WhyNabdaCardsProps) {
    const t = useTranslations();

    return (
        <section className="py-20 bg-white dark:bg-[#060f1e]">
            <div className="container max-w-6xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white text-center mb-12">
                    {t(`${baseKey}.title` as Parameters<typeof t>[0])}
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {cards.map((card, i) => (
                        <article
                            key={i}
                            className="p-8 rounded-2xl bg-white dark:bg-white/4 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold text-[#0a2540] dark:text-white mb-3">
                                {t(card.titleKey as Parameters<typeof t>[0])}
                            </h3>
                            <p className="text-base text-[#475569] dark:text-[#94a3b8] leading-relaxed">
                                {t(card.descKey as Parameters<typeof t>[0])}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0a2540] dark:text-white mb-6">
                        {t(`${baseKey}.cta.title` as Parameters<typeof t>[0])}
                    </h2>
                    <a
                        href="https://app.nabda-otp.com/en/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#635bff] hover:bg-[#4f46e5] text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        {t(`${baseKey}.cta.button` as Parameters<typeof t>[0])}
                    </a>
                </div>
            </div>
        </section>
    );
}