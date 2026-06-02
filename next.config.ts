// import type { NextConfig } from "next";
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// const nextConfig: NextConfig = {
//   reactCompiler: true,
// };

// export default withNextIntl(nextConfig);

// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  
  trailingSlash: false,
  
  
  async redirects() {
    return [
     
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,  // 301 redirect
      },
      
      {
        source: '/ar/:path*.html',
        destination: '/ar/:path*',
        permanent: true,
      },
      
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ar/index.html',
        destination: '/ar',
        permanent: true,
      },

    ];
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { 
            key: 'Strict-Transport-Security', 
            value: 'max-age=63072000; includeSubDomains; preload' 
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

