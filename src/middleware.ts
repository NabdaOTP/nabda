// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' 
});

export const config = {
  matcher: ['/((?!api|_next|assets|.*\\..*).*)']
};