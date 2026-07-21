import { useTranslations } from 'next-intl';

interface CodeExampleProps {
    labelKey: string;
    titleKey: string;
    descKey: string;
    code: string;
    lang?: string;
}

export default function CodeExample({
    labelKey,
    titleKey,
    descKey,
    code,
    lang = 'javascript',
}: CodeExampleProps) {
    const t = useTranslations();

    return (
        <section className="py-12">
            <div className="container max-w-240 mx-auto px-6">
                {/* Label */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#ede9fe] dark:bg-[#635bff]/20 text-[#635bff] dark:text-[#a89fff] text-xs font-bold uppercase tracking-wide mb-3">
                    {t(labelKey as Parameters<typeof t>[0])}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] dark:text-white mb-4 leading-tight">
                    {t(titleKey as Parameters<typeof t>[0])}
                </h2>

                {/* Description */}
                <p className="text-base leading-relaxed text-[#425466] dark:text-[#8899a6] mb-8 max-w-180">
                    {t(descKey as Parameters<typeof t>[0])}
                </p>

                {/* Code block */}
                <div className="rounded-xl overflow-hidden border border-white/10">
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] border-b border-white/8">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        <span className="ms-2 text-xs text-[#4a6278] font-mono">{lang}</span>
                    </div>

                    {/* Code */}
                    <pre className="bg-[#0d1b2e] p-5 overflow-x-auto text-sm leading-7">
                        <code className="text-[#e2e8f0] font-mono">{code}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}