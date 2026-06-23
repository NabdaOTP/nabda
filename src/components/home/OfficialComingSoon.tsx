// src/components/home/OfficialComingSoon.tsx
// Place between <Pricing /> and <FAQ /> in src/app/[locale]/page.tsx

import { useTranslations } from 'next-intl';
import { ShieldCheck, Smartphone, Check } from 'lucide-react';

export default function OfficialComingSoon() {
    const t = useTranslations('official');

    return (
        <section className="py-20 bg-linear-to-b from-[#ede9fe]/30 to-white
        dark:from-[#060f1e] dark:to-[#0a1628]">
            <div className="max-w-[1200px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 mb-4">
                        {t('badge')}
                    </span>
                    <h2 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight text-[#0a2540] dark:text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-[#425466] dark:text-[#8899a6] max-w-[540px] mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Two cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 max-w-[760px] mx-auto">

                    {/* Gateway — current */}
                    <div className="flex flex-col gap-4 p-7 rounded-2xl border border-gray-100 bg-white dark:bg-white/4 dark:border-white/8">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#635bff]/10 text-[#635bff]">
                                <Smartphone size={20} strokeWidth={1.75} />
                            </div>
                            <span className="font-bold text-[#0a2540] dark:text-white">{t('gateway.name')}</span>
                        </div>

                        <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">
                            {t('gateway.desc')}
                        </p>

                        <div className="text-2xl font-extrabold text-[#0a2540] dark:text-white">
                            $10
                            <span className="text-sm font-normal text-[#64748b] dark:text-[#475569]">/month</span>
                        </div>

                        <ul className="flex flex-col gap-2 mt-auto">
                            {[
                                t('gateway.f1'),
                                t('gateway.f2'),
                                t('gateway.f3'),
                            ].map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                    <Check size={14} className="text-[#00d4aa] shrink-0" strokeWidth={2.5} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Official API — coming soon */}
                    <div className="relative flex flex-col gap-4 p-7 rounded-2xl border-2 border-blue-200 bg-blue-50/40 dark:bg-blue-500/8 dark:border-blue-500/30">

                        {/* Coming Soon pill */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap">
                            {t('official.badge')}
                        </div>

                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                <ShieldCheck size={20} strokeWidth={1.75} />
                            </div>
                            <span className="font-bold text-[#0a2540] dark:text-white">{t('official.name')}</span>
                            <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full bg-[#00d4aa]/15 text-[#00a88a] dark:text-[#00d4aa]">
                                Green Badge
                            </span>
                        </div>

                        <p className="text-[0.9375rem] leading-relaxed text-[#425466] dark:text-[#8899a6]">
                            {t('official.desc')}
                        </p>

                        <div className="text-2xl font-extrabold text-[#0a2540] dark:text-white">
                            {t('official.price')}
                            <span className="text-sm font-normal text-[#64748b] dark:text-[#475569] ms-1">
                                {t('official.priceNote')}
                            </span>
                        </div>

                        <ul className="flex flex-col gap-2 mt-auto">
                            {[
                                t('official.f1'),
                                t('official.f2'),
                                t('official.f3'),
                            ].map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-[#425466] dark:text-[#8899a6]">
                                    <Check size={14} className="text-[#00d4aa] shrink-0" strokeWidth={2.5} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Notify strip */}
                <div className="max-w-[760px] mx-auto rounded-2xl border border-gray-100 bg-gray-50 dark:bg-white/3 dark:border-white/8 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-[#0a2540] dark:text-white text-sm mb-1">
                            {t('notify.title')}
                        </p>
                        <p className="text-sm text-[#64748b] dark:text-[#475569]">
                            {t('notify.desc')}
                        </p>
                    </div>
                    <a
                        href="https://wa.me/905352682350"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#635bff]/30 text-[#635bff] dark:text-[#a89fff] dark:border-[#635bff]/30 text-sm font-semibold hover:bg-[#635bff]/8 transition-colors"
                    >
                        {t('notify.cta')}
                    </a>
                </div>

            </div>
        </section>
    );
}