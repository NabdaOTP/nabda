'use client';

import { useTranslations } from 'next-intl';

export default function WhatsAppFloat() {
  const t = useTranslations('whatsapp');

  return (
    <a
      href="https://wa.me/905352682350"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 inset-s-6 z-40
        flex items-center gap-0 max-w-13
        overflow-hidden
        rounded-full
        bg-[#25D366] text-white
        shadow-[0_4px_20px_rgba(37,211,102,0.5)]
        hover:shadow-[0_6px_28px_rgba(37,211,102,0.7)]
        hover:max-w-80
        hover:-translate-y-0.5
        transition-all duration-300 ease-in-out
        group
      "
    >
      {/* Icon — always visible */}
      <span className="flex items-center justify-center w-13 h-13 shrink-0">
        <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3C8.82 3 3 8.82 3 16C3 18.69 3.79 21.21 5.15 23.35L3.14 29.14L9.08 27.17C11.13 28.36 13.49 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3Z"
            fill="white"
          />
          <path
            d="M22.59 20.5C22.35 21.17 21.22 21.77 20.63 21.85C19.53 22 18.62 21.77 16.82 21.08C13.34 19.67 11.13 16.14 10.96 15.91C10.79 15.68 9.64 14.17 9.64 12.6C9.64 11.03 10.45 10.28 10.78 9.92C11.11 9.56 11.5 9.47 11.73 9.47H12.39C12.62 9.49 12.92 9.39 13.21 10.07C13.51 10.77 14.21 12.34 14.29 12.51C14.37 12.68 14.43 12.88 14.31 13.11C13.71 14.31 13.06 14.24 13.46 14.91C14.86 17.26 16.29 18.02 18.33 19.04C18.69 19.23 18.89 19.2 19.09 18.97C19.29 18.74 19.96 17.95 20.19 17.59C20.42 17.23 20.65 17.29 20.98 17.41C21.31 17.53 22.88 18.3 23.24 18.49C23.6 18.68 23.83 18.77 23.91 18.91C24 19.17 24 19.83 22.59 20.5Z"
            fill="#25D366"
          />
        </svg>
      </span>

      {/* Label — visible on hover */}
      <span className="
        whitespace-nowrap text-sm font-semibold pe-4
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200 delay-100
      ">
        {t('help')}
      </span>
    </a>
  );
}