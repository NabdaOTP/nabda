import { defineRouting } from 'next-intl/routing';

// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'ar', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', 
});

export type Locale = (typeof routing.locales)[number];