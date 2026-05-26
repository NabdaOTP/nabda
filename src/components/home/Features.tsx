import { useTranslations } from 'next-intl';
import AnimateIn from '@/components/shared/AnimateIn';
import {
  BadgeDollarSign,
  Code2,
  ShieldCheck,
  Zap,
  Webhook,
  type LucideIcon,
  Heart,
} from 'lucide-react';

// Feature data
type Feature = {
  key:     string;
  icon:    LucideIcon;
  primary: boolean;
};

const FEATURES: Feature[] = [
  { key: 'cheapest',  icon: BadgeDollarSign, primary: true  },
  { key: 'developer', icon: Code2,           primary: false },
  { key: 'secure',    icon: ShieldCheck,     primary: false },
  { key: 'fast',      icon: Zap,             primary: false },
  { key: 'bundle', icon: ShieldCheck, primary: false },
  { key: 'webhook',   icon: Webhook,         primary: false },
];

// Types for translation keys
type FeatureKey =
  | 'cheapest.title' | 'cheapest.desc' | 'cheapest.highlight'
  | 'bundle.title'    | 'bundle.desc'
  | 'developer.title'| 'developer.desc'
  | 'secure.title'   | 'secure.desc'
  | 'fast.title'     | 'fast.desc'
  | 'webhook.title'  | 'webhook.desc';

// Main Component 
export default function Features() {
  const t = useTranslations('features');

  return (
    <section
      id="features"
      className="
        py-20 md:py-28
        bg-linear-to-b from-[#ede9fe]/30 to-white
        dark:from-[#060f1e] dark:to-[#0a1628]
      "
    >
      <div className="max-w-300 mx-auto px-6">

        {/* ── Header ── */}
        <AnimateIn className="text-center max-w-170 mx-auto mb-16">
          <h2 className="text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4
            text-deep-navy dark:text-white
          ">
            {t('title')}
          </h2>
          <p className="text-lg leading-relaxed text-navy-lighter dark:text-[#8899a6] inline">
            {t('subtitle')}
          </p>
           <Heart className='text-[#635bff] dark:text-[#a89fff] inline-block' />
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ key, icon: Icon, primary }, i) =>
            primary ? (
              /* Primary Card */
              <AnimateIn
                key={key}
                className="
                  relative overflow-hidden flex flex-col gap-5 p-8 rounded-2xl
                  bg-linear-to-br from-deep-navy to-navy-light
                  dark:from-[#1a1040] dark:to-[#2d1b69]
                  shadow-[0_8px_30px_rgba(10,37,64,0.25)]
                  dark:shadow-[0_8px_30px_rgba(99,91,255,0.25)]
                "
                delay={i * 100}
              >
                {/* Orb */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#635bff]/25 blur-2xl" />

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 shrink-0">
                  <Icon size={24} strokeWidth={1.75} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {t(`${key}.title` as FeatureKey)}
                </h3>

                <p className="text-[0.9375rem] leading-7 text-white/75 flex-1">
                  {t(`${key}.desc` as FeatureKey)}
                </p>

                {/* Highlight pill */}
                <span className="self-start px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 text-white border border-white/20">
                  {t('cheapest.highlight')}
                </span>
              </AnimateIn>

            ) : (
              /* Regular Card*/
              <AnimateIn
                key={key}
                className="
                  group flex flex-col gap-5 p-8 rounded-2xl border transition-all duration-300
                  bg-white border-gray-100
                  hover:border-[#635bff]/40 hover:shadow-[0_8px_30px_rgba(99,91,255,0.1)] hover:-translate-y-1
                  dark:bg-white/4 dark:border-white/8
                  dark:hover:border-[#635bff]/40 dark:hover:bg-white/8
                "
                delay={i * 100}
              >
                {/* Icon */}
                <div className="
                  flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-colors duration-300
                  bg-[#635bff]/8 text-[#635bff]
                  group-hover:bg-[#635bff] group-hover:text-white
                  dark:bg-[#635bff]/15 dark:text-[#a89fff]
                  dark:group-hover:bg-[#635bff] dark:group-hover:text-white
                ">
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                <h3 className="text-xl font-bold text-deep-navy dark:text-white">
                  {t(`${key}.title` as FeatureKey)}
                </h3>

                <p className="text-[0.9375rem] leading-7 flex-1 text-navy-lighter dark:text-[#8899a6]">
                  {t(`${key}.desc` as FeatureKey)}
                </p>
              </AnimateIn>
            )
          )}
        </div>

      </div>
    </section>
  );
}