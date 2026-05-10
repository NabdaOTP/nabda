import { useTranslations } from 'next-intl';

interface ComparisonRow {
    featureKey: string;
    nabdaKey: string;
    competitorKey: string;
    winnerKey: string;
}

interface ComparisonTableProps {
    competitorName: string;
    baseKey: string;
    rows: ComparisonRow[];
}

export default function ComparisonTable({
    competitorName,
    baseKey,
    rows,
}: ComparisonTableProps) {
    const t = useTranslations();

    return (
        <section className="py-16 bg-white dark:bg-[#060f1e]">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white dark:bg-white/4 rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-[#f8f9ff] dark:bg-white/8 border-b border-gray-200 dark:border-white/10">
                                <th className="px-6 py-4 text-left text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.feature` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.nabda` as Parameters<typeof t>[0])}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {competitorName}
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-[#0a2540] dark:text-white">
                                    {t(`${baseKey}.winner` as Parameters<typeof t>[0])}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/4 transition-colors"
                                >
                                    {/* Feature */}
                                    <td className="px-6 py-4 text-sm font-semibold text-[#0a2540] dark:text-white">
                                        {t(row.featureKey as Parameters<typeof t>[0])}
                                    </td>

                                    {/* Nabda */}
                                    <td className="px-6 py-4 text-sm text-center text-[#425466] dark:text-[#94a3b8]">
                                        <div dangerouslySetInnerHTML={{ __html: t.raw(row.nabdaKey as Parameters<typeof t>[0]) as string }} />
                                    </td>

                                    {/* Competitor */}
                                    <td className="px-6 py-4 text-sm text-center text-[#425466] dark:text-[#94a3b8]">
                                        <div dangerouslySetInnerHTML={{ __html: t.raw(row.competitorKey as Parameters<typeof t>[0]) as string }} />
                                    </td>

                                    {/* Winner */}
                                    <td className="px-6 py-4 text-sm text-center font-bold">
                                        <span
                                            className={
                                                t(row.winnerKey as Parameters<typeof t>[0]).includes('Nabda') ||
                                                    t(row.winnerKey as Parameters<typeof t>[0]).toLowerCase().includes('nabda')
                                                    ? 'text-[#10b981]'
                                                    : t(row.winnerKey as Parameters<typeof t>[0]).toLowerCase() === 'tie'
                                                        ? 'text-[#64748b]'
                                                        : 'text-[#f59e0b]'
                                            }
                                        >
                                            {t(row.winnerKey as Parameters<typeof t>[0])}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}