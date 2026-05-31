import { useTranslations } from 'next-intl';
import { ArrowRight, Rocket } from 'lucide-react';
import AnimateIn from '@/components/shared/AnimateIn';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="
      relative overflow-hidden py-14 md:py-16
      bg-linear-to-br from-white via-[#f5f3ff] to-[#ede9fe]
      dark:bg-deep-navy dark:bg-none
    ">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Light mode orbs */}
        <div className="absolute -top-40 -right-40 h-150 w-150 rounded-full bg-[#635bff]/10 blur-[120px] dark:bg-[#635bff]/25" />
        <div className="absolute -bottom-20 -left-20 h-100 w-100 rounded-full bg-[#a89fff]/15 blur-[100px] dark:bg-[#635bff]/15" />
        <div className="absolute top-1/3 left-1/2 h-75 w-75 -translate-x-1/2 rounded-full bg-[#00d4aa]/8 blur-[80px] dark:bg-[#00d4aa]/10" />
        {/* Grid overlay — subtle in light, more visible in dark */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#635bff 1px,transparent 1px),linear-gradient(90deg,#635bff 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-300 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <AnimateIn className="flex flex-col gap-6">

            {/* Badge */}
            <div className="inline-flex items-center self-start gap-2 rounded-full px-4 py-1.5 text-sm font-medium
              border border-[#635bff]/30 bg-[#635bff]/8 text-[#635bff]
              dark:border-[#635bff]/40 dark:bg-[#635bff]/10 dark:text-[#a89fff]
            ">
              <Rocket /> {t('hero.badge')}
            </div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight
              text-deep-navy
              dark:text-white
            ">
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-lg leading-relaxed max-w-lg
              text-navy-lighter
              dark:text-[#8899a6]
            ">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://app.nabda-otp.com/en/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full text-white bg-[#635bff] hover:bg-[#7a73ff] shadow-[0_4px_20px_rgba(99,91,255,0.4)] hover:shadow-[0_6px_28px_rgba(99,91,255,0.6)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('hero.cta.primary')}
              </a>
              <a
                href="https://connect.nabdaotp.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full transition-all duration-200
                  border border-[#635bff]/30 text-[#635bff] hover:bg-[#635bff]/8
                  dark:border-white/20 dark:text-white/80 dark:hover:text-white dark:hover:border-white/40 dark:hover:bg-white/5
                "
              >
                {t('hero.cta.secondary')}
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Slogan */}
            <p className="text-2xl font-bold tracking-tight text-deep-navy dark:text-white">
              Fast.{' '}
              <span className="text-[#635bff]">Simple.</span>{' '}
              Cheap.
            </p>
          </AnimateIn>

          {/*  Right: Code Terminal  */}
          <AnimateIn className="relative" delay={150} from="right">
            <div className="rounded-2xl overflow-hidden border shadow-2xl
              border-[#e2e8f0] bg-[#f8fafc]
              dark:border-white/10 dark:bg-[#0d1b2e]
              shadow-[#635bff]/10 dark:shadow-black/50
            ">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b
                bg-[#f1f5f9] border-[#e2e8f0]
                dark:bg-[#0a1628] dark:border-white/8
              ">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ms-3 text-xs font-mono text-[#94a3b8] dark:text-[#4a6278]">Nabda-api.js</span>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
                <pre>
                  <span className="text-[#64748b] dark:text-[#4a6278]">{t('code.comment1')}</span>{'\n'}
                  <span className="text-[#7c3aed] dark:text-[#c792ea]">const</span>
                  <span className="text-[#0f172a] dark:text-white"> response </span>
                  <span className="text-[#0369a1] dark:text-[#89ddff]">=</span>
                  <span className="text-[#7c3aed] dark:text-[#c792ea]"> await </span>
                  <span className="text-[#2563eb] dark:text-[#82aaff]">Nabda</span>
                  <span className="text-[#0f172a] dark:text-white">.</span>
                  <span className="text-[#1d4ed8] dark:text-[#82b1ff]">send</span>
                  <span className="text-[#0369a1] dark:text-[#89ddff]">{'({'}</span>{'\n'}
                  {'  '}
                  <span className="text-[#dc2626] dark:text-[#f07178]">phone</span>
                  <span className="text-[#0f172a] dark:text-white">: </span>
                  <span className="text-[#16a34a] dark:text-[#c3e88d]">{'"'}+964750XXXXXXX{'"'}</span>
                  <span className="text-[#0f172a] dark:text-white">,</span>{'\n'}
                  {'  '}
                  <span className="text-[#dc2626] dark:text-[#f07178]">message</span>
                  <span className="text-[#0f172a] dark:text-white">: </span>
                  <span className="text-[#16a34a] dark:text-[#c3e88d]">{'"'}{t('code.message')}{'"'}</span>
                  <span className="text-[#0f172a] dark:text-white">,</span>{'\n'}
                  {'  '}
                  <span className="text-[#dc2626] dark:text-[#f07178]">type</span>
                  <span className="text-[#0f172a] dark:text-white">: </span>
                  <span className="text-[#16a34a] dark:text-[#c3e88d]">{'"'}otp{'"'}</span>{'\n'}
                  <span className="text-[#0369a1] dark:text-[#89ddff]">{'});'}</span>{'\n\n'}
                  <span className="text-[#64748b] dark:text-[#4a6278]">{t('code.comment2')}</span>{'\n'}
                  <span className="text-[#2563eb] dark:text-[#82aaff]">console</span>
                  <span className="text-[#0f172a] dark:text-white">.</span>
                  <span className="text-[#1d4ed8] dark:text-[#82b1ff]">log</span>
                  <span className="text-[#0f172a] dark:text-white">(response.</span>
                  <span className="text-[#dc2626] dark:text-[#f07178]">status</span>
                  <span className="text-[#0f172a] dark:text-white">); </span>
                  <span className="text-[#64748b] dark:text-[#4a6278]">{'// "sent"'}</span>
                </pre>
              </div>

              {/* Delivered indicator */}
              <div className="flex items-center gap-2 px-6 pb-5">
                <span className="flex h-2 w-2 rounded-full bg-[#00d4aa] shadow-[0_0_6px_rgba(0,212,170,0.8)]" />
                <span className="text-xs font-medium text-[#00d4aa]">Message delivered · 0.3s</span>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}