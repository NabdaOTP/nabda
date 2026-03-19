import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nabdaotp.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'es', 'pt', 'fr', 'de', 'tr', 'it', 'id', 'tl', 'sw'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ar: 'ar',
          es: 'es',
          pt: 'pt',
          fr: 'fr',
          de: 'de',
          tr: 'tr',
          it: 'it',
          id: 'id',
          tl: 'tl',
          sw: 'sw',
        },
      },
      customPages: [],
      serialize(item) {
        // Set priority based on URL path
        const isHomepage = /^https:\/\/nabdaotp\.com\/([a-z]{2}\/)?$/.test(item.url);
        if (isHomepage) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/countries/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/compare/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/solutions/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  output: 'static',
  build: {
    assets: 'assets',
  },
});
