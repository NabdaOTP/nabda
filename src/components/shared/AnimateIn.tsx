'use client';

import { useRef, useEffect, useState, CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
  distance?: number;
};

export default function AnimateIn({
  children,
  className,
  delay = 0,
  from = 'bottom',
  distance = 24,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [done, setDone] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translateInit =
    from === 'bottom' ? `translateY(${distance}px)` :
    from === 'left'   ? `translateX(-${distance}px)` :
                        `translateX(${distance}px)`;

  let style: CSSProperties;
  if (done) {
    style = {};
  } else if (visible) {
    style = {
      opacity: 1,
      transform: 'translateY(0) translateX(0)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      willChange: 'transform',
    };
  } else {
    style = {
      opacity: 0,
      transform: translateInit,
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    };
  }

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'opacity' && visible) setDone(true);
      }}
    >
      {children}
    </div>
  );
}
