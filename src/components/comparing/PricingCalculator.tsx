'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface PricingCalculatorProps {
    competitorName: string;
    baseKey: string;
    competitorPerMessage: number;
    minMessages?: number;
    maxMessages?: number;
    defaultMessages?: number;
}

export default function PricingCalculator({
    competitorName,
    baseKey,
    competitorPerMessage,
    minMessages = 1000,
    maxMessages = 200000,
    defaultMessages = 30000,
}: PricingCalculatorProps) {
    const t = useTranslations();
    const [messages, setMessages] = useState(defaultMessages);

    const nabdaCost = 10; // fixed $10/month
    const competitorCost = messages * competitorPerMessage;
    const nabdaPerMsg = messages > 0 ? nabdaCost / messages : 0;

    return (
        <section className="py-20 bg-[#f8f9ff] dark:bg-[#0a1628]">
            <div className="container max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#fef3c7] dark:bg-[#f59e0b]/20 text-[#92400e] dark:text-[#fbbf24] text-sm font-bold uppercase tracking-wide mb-3">
                        {t(`${baseKey}.badge` as Parameters<typeof t>[0])}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-4">
                        {t(`${baseKey}.title` as Parameters<typeof t>[0])}
                    </h2>
                    <p className="text-base text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
                        {t(`${baseKey}.desc` as Parameters<typeof t>[0])}
                    </p>
                </div>

                {/* Slider */}
                <div className="max-w-3xl mx-auto mb-12">
                    <label
                        htmlFor="messageSlider"
                        className="block text-center text-sm font-bold text-[#0a2540] dark:text-white mb-4"
                    >
                        {t(`${baseKey}.label` as Parameters<typeof t>[0])}
                    </label>
                    <input
                        type="range"
                        id="messageSlider"
                        min={minMessages}
                        max={maxMessages}
                        value={messages}
                        step="1000"
                        onChange={(e) => setMessages(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#f97316]"
                    />
                    <div className="text-center mt-4">
                        <span className="text-3xl font-extrabold text-[#0a2540] dark:text-white">
                            {messages.toLocaleString()}
                        </span>
                        <span className="ml-2 text-lg text-[#64748b] dark:text-[#94a3b8]">
                            {t(`${baseKey}.messages` as Parameters<typeof t>[0])}
                        </span>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white dark:bg-white/4 rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-[#f1f5f9] dark:bg-white/8 border-b border-gray-200 dark:border-white/10">
                                <th className="px-6 py-4 text-left text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.table.provider` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.table.monthlyCost` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.table.costPerMsg` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.table.billingModel` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.table.bestFit` as Parameters<typeof t>[0])}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Nabda Row */}
                            <tr className="bg-[#f0fdf4] dark:bg-[#10b981]/10 border-l-4 border-[#10b981]">
                                <td className="px-6 py-4 text-sm font-bold text-[#0a2540] dark:text-white">
                                    Nabda OTP
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="text-2xl font-extrabold text-[#10b981] mb-1">
                                        ${nabdaCost.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                                        {t(`${baseKey}.nabda.cost` as Parameters<typeof t>[0])}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    ${nabdaPerMsg.toFixed(4)}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    {t(`${baseKey}.nabda.model` as Parameters<typeof t>[0])}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    {t(`${baseKey}.nabda.fit` as Parameters<typeof t>[0])}
                                </td>
                            </tr>

                            {/* Competitor Row */}
                            <tr className="border-b border-gray-100 dark:border-white/5">
                                <td className="px-6 py-4 text-sm font-bold text-[#0a2540] dark:text-white">
                                    {competitorName}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="text-2xl font-extrabold text-[#f59e0b]">
                                        ${competitorCost.toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    ${competitorPerMessage.toFixed(4)}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    {t(`${baseKey}.${competitorName.toLowerCase()}.model` as Parameters<typeof t>[0])}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-[#425466] dark:text-[#94a3b8]">
                                    {t(`${baseKey}.${competitorName.toLowerCase()}.fit` as Parameters<typeof t>[0])}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Note */}
                <p className="text-center text-sm text-[#64748b] dark:text-[#94a3b8] mt-8">
                    {t(`${baseKey}.note` as Parameters<typeof t>[0])}
                </p>
            </div>
        </section>
    );
}