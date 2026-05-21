import { useTranslations } from 'next-intl';
import AnimateIn from '@/components/shared/AnimateIn';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-linear-to-br from-[#635bff] via-[#4b44cc] to-deep-navy dark:from-[#1a1040] dark:via-[#2d1b69] dark:to-[#04080f]" />

      {/* Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 -right-1/4 w-125 h-125 rounded-full bg-white/8 blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-100 h-100 rounded-full bg-white/5 blur-[80px]" />
      </div>

      <AnimateIn className="relative max-w-190 mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
          {t('title')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-140 mx-auto">
          {t('subtitle')}
        </p>

        {/* CTA Button */}
        <a
          href="https://dash.nabdaotp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center px-10 py-4 text-base font-bold rounded-full
            bg-white text-[#635bff]
            hover:bg-white/90 hover:-translate-y-0.5
            shadow-[0_6px_30px_rgba(0,0,0,0.25)]
            hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]
            transition-all duration-200
          "
        >
          {t('button')}
        </a>

        {/* Trust note */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
          {[
            '✓ No credit card required',
            '✓ 5-day free trial',
            '✓ Cancel anytime',
          ].map((item) => (
            <span key={item} className="text-sm font-medium text-white/60">
              {item}
            </span>
          ))}
        </div>

      </AnimateIn>
    </section>
  );
}