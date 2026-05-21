'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { X, MapPin, ArrowRight } from 'lucide-react';

// Slug → country name mapping
const COUNTRY_NAMES: Record<string, { en: string; ar: string; flag: string }> = {
  egypt:                { en: 'Egypt',        ar: 'مصر',         flag: '🇪🇬' },
  iraq:                 { en: 'Iraq',         ar: 'العراق',      flag: '🇮🇶' },
  'saudi-arabia':       { en: 'Saudi Arabia', ar: 'السعودية',    flag: '🇸🇦' },
  'united-arab-emirates': { en: 'UAE',        ar: 'الإمارات',    flag: '🇦🇪' },
  qatar:                { en: 'Qatar',        ar: 'قطر',         flag: '🇶🇦' },
  jordan:               { en: 'Jordan',       ar: 'الأردن',      flag: '🇯🇴' },
  syria:                { en: 'Syria',        ar: 'سوريا',       flag: '🇸🇾' },
  kuwait:               { en: 'Kuwait',       ar: 'الكويت',      flag: '🇰🇼' },
  bahrain:              { en: 'Bahrain',      ar: 'البحرين',     flag: '🇧🇭' },
  oman:                 { en: 'Oman',         ar: 'عُمان',       flag: '🇴🇲' },
  lebanon:              { en: 'Lebanon',      ar: 'لبنان',       flag: '🇱🇧' },
  palestine:            { en: 'Palestine',    ar: 'فلسطين',      flag: '🇵🇸' },
  yemen:                { en: 'Yemen',        ar: 'اليمن',       flag: '🇾🇪' },
  algeria:              { en: 'Algeria',      ar: 'الجزائر',     flag: '🇩🇿' },
  morocco:              { en: 'Morocco',      ar: 'المغرب',      flag: '🇲🇦' },
  tunisia:              { en: 'Tunisia',      ar: 'تونس',        flag: '🇹🇳' },
  libya:                { en: 'Libya',        ar: 'ليبيا',       flag: '🇱🇾' },
  sudan:                { en: 'Sudan',        ar: 'السودان',     flag: '🇸🇩' },
  germany:              { en: 'Germany',      ar: 'ألمانيا',     flag: '🇩🇪' },
  usa:                  { en: 'USA',          ar: 'أمريكا',      flag: '🇺🇸' },
  turkey:               { en: 'Turkey',       ar: 'تركيا',       flag: '🇹🇷' },
};

// ISO country code → slug
const ISO_TO_SLUG: Record<string, string> = {
  EG: 'egypt', IQ: 'iraq', SA: 'saudi-arabia', AE: 'united-arab-emirates',
  QA: 'qatar', JO: 'jordan', SY: 'syria', KW: 'kuwait', BH: 'bahrain',
  OM: 'oman', LB: 'lebanon', PS: 'palestine', YE: 'yemen', DZ: 'algeria',
  MA: 'morocco', TN: 'tunisia', LY: 'libya', SD: 'sudan',
  DE: 'germany', US: 'usa', TR: 'turkey',
};

const DISMISSED_KEY = 'nabda_geo_dismissed';

export default function GeoLocationBanner() {
  const locale = useLocale();
  const router = useRouter();
  const isAR   = locale === 'ar';

  const [slug,      setSlug]      = useState<string | null>(null);
  const [visible,   setVisible]   = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    async function detect() {
      try {
        // Free IP geolocation — no API key needed
        const res  = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const iso  = (data.country_code ?? '').toUpperCase();
        const s    = ISO_TO_SLUG[iso];

        if (s && COUNTRY_NAMES[s]) {
          setSlug(s);
          // Small delay so page loads first
          setTimeout(() => {
            setVisible(true);
            setTimeout(() => setAnimating(true), 10);
          }, 1200);
        }
      } catch {
        // Fail silently — geolocation is enhancement only
      }
    }

    detect();
  }, []);

  function dismiss() {
    setAnimating(false);
    setTimeout(() => setVisible(false), 300);
    sessionStorage.setItem(DISMISSED_KEY, '1');
  }

  function goToCountryPage() {
    if (!slug) return;
    const path = isAR ? `/ar/${slug}` : `/${slug}`;
    dismiss();
    router.push(path);
  }

  if (!visible || !slug) return null;

  const country = COUNTRY_NAMES[slug];

  return (
    <div
      className={`
        fixed bottom-24 inset-e-4 z-50 w-[min(340px,calc(100vw-2rem))]
        transition-all duration-300 ease-out
        ${animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      role="region"
      aria-label="Location detected"
    >
      <div className="
        rounded-2xl border shadow-2xl overflow-hidden
        bg-white border-gray-100
        dark:bg-[#0d1525] dark:border-white/10
      ">
        {/* Top accent line */}
        <div className="h-1 bg-linear-to-r from-[#635bff] to-[#00d4aa]" />

        <div className="p-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#635bff]/10">
                <MapPin size={16} className="text-[#635bff]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#635bff]">
                {isAR ? 'تم تحديد موقعك' : 'Location detected'}
              </span>
            </div>
            <button
              onClick={dismiss}
              className="p-1 rounded-lg text-[#94a3b8] hover:text-[#475569] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>

          {/* Message */}
          <p className="text-[0.9375rem] font-semibold text-[#0a2540] dark:text-white mb-1" dir={isAR ? 'rtl' : 'ltr'}>
            {isAR
              ? `${country.flag} يبدو أنك في ${country.ar}`
              : `${country.flag} It seems you're in ${country.en}`
            }
          </p>
          <p className="text-sm text-[#64748b] dark:text-[#8899a6] mb-4" dir={isAR ? 'rtl' : 'ltr'}>
            {isAR
              ? `لدينا صفحة مخصصة لـ${country.ar} بمعلومات محلية أفضل.`
              : `We have a dedicated page for ${country.en} with local info.`
            }
          </p>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={goToCountryPage}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-[#635bff] hover:bg-[#7a73ff] text-white transition-colors"
            >
              {isAR ? `اذهب لصفحة ${country.ar}` : `Go to ${country.en} page`}
              <ArrowRight size={15} className={isAR ? 'rotate-180' : ''} />
            </button>
            <button
              onClick={dismiss}
              className="py-2.5 px-4 rounded-xl text-sm font-medium text-[#64748b] dark:text-[#8899a6] hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
            >
              {isAR ? 'لاحقاً' : 'Later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}