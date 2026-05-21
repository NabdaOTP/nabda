import { useTranslations } from 'next-intl'; 
const PAYMENT_METHODS = [
  {
    name: 'Visa',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="8" fill="#1A1F71" />
        <path d="M19.5 30L21.5 18H25L23 30H19.5Z" fill="white" />
        <path d="M32.5 18.3C31.7 18 30.5 17.7 29 17.7C25.5 17.7 23 19.5 23 22C23 23.8 24.7 24.8 26 25.4C27.3 26 27.8 26.5 27.8 27.1C27.8 28 26.7 28.4 25.7 28.4C24.3 28.4 23.5 28.2 22.3 27.7L21.8 27.5L21.3 30.5C22.2 30.9 23.8 31.2 25.5 31.2C29.2 31.2 31.7 29.5 31.7 26.8C31.7 25.4 30.8 24.3 28.8 23.4C27.6 22.8 26.9 22.4 26.9 21.7C26.9 21.1 27.6 20.5 29 20.5C30.2 20.5 31 20.7 31.7 21L32 21.1L32.5 18.3Z" fill="white" />
        <path d="M37.5 18H35C34.2 18 33.5 18.2 33.2 19L28 30H31.7L32.4 28H36.9L37.3 30H40.5L37.5 18ZM33.3 25.5C33.6 24.7 34.8 21.5 34.8 21.5C34.8 21.5 35.1 20.7 35.3 20.2L35.5 21.4C35.5 21.4 36.3 25 36.5 25.5H33.3Z" fill="white" />
        <path d="M16.5 18L13 26.5L12.7 25C12.1 23.3 10.5 21.4 8.5 20.5L11.7 30H15.5L20.5 18H16.5Z" fill="white" />
        <path d="M11 18H5.5L5.5 18.3C10 19.4 13 22.3 14 25L13 19C12.8 18.3 12.2 18 11.5 18H11Z" fill="#F9A825" />
      </svg>
    ),
  },
  {
    name: 'Mastercard',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="8" fill="#F5F5F5" />
        <circle cx="18" cy="24" r="10" fill="#EB001B" />
        <circle cx="30" cy="24" r="10" fill="#F79E1B" />
        <path d="M24 17.5C26.1 19.2 27.5 21.5 27.5 24C27.5 26.5 26.1 28.8 24 30.5C21.9 28.8 20.5 26.5 20.5 24C20.5 21.5 21.9 19.2 24 17.5Z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    name: 'USDT',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="48" height="48" rx="8" fill="#26A17B" />
        <circle cx="24" cy="24" r="12" fill="white" />
        <path d="M26.5 22.5V20H31V17H17V20H21.5V22.5C17.5 22.8 14.5 23.8 14.5 25C14.5 26.2 17.5 27.2 21.5 27.5V34H26.5V27.5C30.5 27.2 33.5 26.2 33.5 25C33.5 23.8 30.5 22.8 26.5 22.5ZM26.5 26.8V26.8C26.3 26.8 25.5 26.9 24 26.9C22.8 26.9 21.8 26.8 21.5 26.8V26.8C18.2 26.5 16 25.8 16 25C16 24.2 18.2 23.5 21.5 23.2V26.2C21.8 26.2 22.8 26.3 24 26.3C25.5 26.3 26.3 26.2 26.5 26.2V23.2C29.8 23.5 32 24.2 32 25C32 25.8 29.8 26.5 26.5 26.8Z" fill="#26A17B" />
      </svg>
    ),
  },
] as const;

// Main 
export default function Payment() {
  const t = useTranslations('payment');

  return (
    <section className="
      py-18
      bg-linear-to-b from-[#ede9fe]/30 to-white
      dark:from-[#060f1e] dark:to-[#0a1628]
    ">
      <div className="max-w-300 mx-auto px-6">

        {/* Title */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8
          text-[#94a3b8]
          dark:text-[#475569]
        ">
          {t('title')}
        </p>

        {/* Cards */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {PAYMENT_METHODS.map(({ name, svg }) => (
            <div
              key={name}
              className="
                flex flex-col items-center gap-3 px-8 py-5 rounded-2xl
                border transition-all duration-200
                bg-white border-gray-100 hover:border-gray-200 hover:shadow-md
                dark:bg-white/4 dark:border-white/8 dark:hover:bg-white/8
              "
            >
              {svg}
              <span className="text-sm font-semibold
                text-[#425466]
                dark:text-[#8899a6]
              ">
                {name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}