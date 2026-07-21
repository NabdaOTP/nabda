import AnimateIn from '@/components/shared/AnimateIn';
import { Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Partner() {
  const t = useTranslations('partner');

  return (
    <section className="
      relative overflow-hidden py-14 md:py-18 text-center
      bg-linear-to-br from-[#f0f1ff] via-[#e8e6ff] to-[#dde4ff]
      dark:bg-none dark:bg-[#0d1525]
    ">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 -right-1/5 h-150 w-150 rounded-full bg-[#635bff]/12 blur-[100px] dark:bg-[#635bff]/20" />
        <div className="absolute -bottom-1/3 -left-1/5 h-100 w-100 rounded-full bg-[#a89fff]/10 blur-[80px] dark:bg-[#a89fff]/10" />
      </div>

      <AnimateIn className="relative max-w-180 mx-auto px-6">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="
            flex items-center justify-center w-20 h-20 rounded-3xl
            bg-white
            dark:bg-white/8
          ">
            <Gift width={48} height={48} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4
          text-[#1f2937]
          dark:text-white
        ">
          {t('title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg leading-relaxed max-w-145 mx-auto mb-6
          text-[#475569]
          dark:text-[#8899a6]
        ">
          {t('subtitle')}
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://dash.nabdaotp.com/en/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center px-8 py-4 text-base font-semibold rounded-full text-white
              bg-[#635bff] hover:bg-[#7a73ff]
              shadow-[0_4px_20px_rgba(99,91,255,0.4)] hover:shadow-[0_6px_28px_rgba(99,91,255,0.6)]
              hover:-translate-y-0.5 transition-all duration-200
            "
          >
            {t('cta')}
          </a>

          <span className="text-sm text-[#64748b] dark:text-[#4a6278]">
            {t('note')}
          </span>
        </div>

      </AnimateIn>
    </section>
  );
}