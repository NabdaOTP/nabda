'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Activity, Building2, MessageSquare, ShieldCheck, type LucideIcon } from 'lucide-react';

// Count-up hook 
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

// Stat Item
function StatItem({
  icon: Icon,
  countTarget,
  suffix,
  staticValue,
  label,
  animate,
}: {
  icon: LucideIcon;
  countTarget?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  animate: boolean;
}) {
  const count = useCountUp(countTarget ?? 0, 1800, animate && !!countTarget);
  const display = countTarget ? `${count}${suffix ?? ''}` : staticValue;

  return (
    <div className="
      group flex flex-col items-center gap-3 px-6 py-8 rounded-2xl
      text-center transition-all duration-300
      bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1
      dark:bg-white/5 dark:border-white/8 dark:hover:bg-white/8
    ">
      {/* Icon */}
      <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#635bff]/10 dark:bg-[#635bff]/20 text-deep-navy transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-6 h-6 text-[#635bff]
        dark:text-white" />
      </span>

      {/* Number */}
      <span className="text-4xl font-extrabold tracking-tight
        text-deep-navy
        dark:text-white
      ">
        {display}
      </span>

      {/* Label */}
      <span className="text-sm font-medium leading-snug
        text-navy-lighter
        dark:text-[#8899a6]
      ">
        {label}
      </span>
    </div>
  );
}

// Main Component 
export default function Stats() {
  const t = useTranslations('stats');
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  // Trigger count-up when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Building2,     countTarget: 146,  suffix: '+', label: t('businesses') },
    { icon: MessageSquare, countTarget: 49, suffix: 'k+', label: t('messages')   },
    { icon: Activity,      staticValue: '99.99%',          label: t('uptime')     },
    { icon: ShieldCheck,   staticValue: '✓',               label: t('reliable')   },
  ];

  return (
    <section
      ref={ref}
      className="py-24
        bg-[#f5f3ff]
        dark:bg-[#060f1e]
      "
    >
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}