import { useTranslations } from 'next-intl';

export default function GetStartCard() {
    const t = useTranslations();
    return (
        <>
            {/* Bottom CTA */}
            <section className="max-w-300 mx-auto px-6 pb-14">
                <div className="rounded-2xl bg-linear-to-br from-[#635bff] to-[#4f46e5] dark:from-[#1a1040] dark:to-[#2d1b69] p-10 text-center relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/8 blur-3xl" />
                    </div>
                    <h2 className="relative text-2xl md:text-3xl font-extrabold text-white mb-3">
                        {t('cta.title')}
                    </h2>
                    <p className="relative text-white/75 mb-7 max-w-125 mx-auto">
                        {t('cta.subtitle')}
                    </p>
                    <a
                        href="https://dash.nabdaotp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-3.5 rounded-full bg-white text-[#635bff] font-bold hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                    >
                        {t('cta.button')}
                    </a>
                </div>
            </section>
        </>
    )
}
