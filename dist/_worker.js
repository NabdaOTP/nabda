/**
 * ============================================================
 * Nabda OTP — Cloudflare Worker for Geo-Detection
 * ============================================================
 *
 * DEPLOYMENT SETUP (Netlify + Cloudflare DNS):
 * ------------------------------------------------
 * Your stack: GitHub Repo → Netlify (build/host) → Cloudflare (DNS + Worker)
 *
 * The site is HOSTED on Netlify. Cloudflare acts as your DNS proxy
 * and you deploy this as a "Cloudflare Worker Route" that runs in
 * front of your Netlify URL.
 *
 * STEP-BY-STEP DEPLOYMENT:
 *
 * 1. Build & Deploy to Netlify:
 *    - Connect your GitHub repo to Netlify
 *    - Build command: npm run build
 *    - Publish directory: dist
 *    - Your Netlify URL will be something like: https://nabda-otp.netlify.app
 *
 * 2. Add Custom Domain in Netlify:
 *    - Go to Netlify → Site settings → Domain management
 *    - Add custom domain: nabdaotp.com
 *    - Netlify will give you DNS records to add to Cloudflare
 *
 * 3. Configure Cloudflare DNS:
 *    - Go to Cloudflare Dashboard → nabdaotp.com → DNS
 *    - Add a CNAME record:
 *        Name: @ (or nabdaotp.com)
 *        Target: [your-site].netlify.app
 *        Proxy: ENABLED (orange cloud) ← IMPORTANT
 *    - Add another CNAME:
 *        Name: www
 *        Target: [your-site].netlify.app
 *        Proxy: ENABLED
 *
 * 4. Deploy this Worker:
 *    Option A — Cloudflare Dashboard (easiest):
 *    a. Go to Cloudflare Dashboard → Workers & Pages → Create Application → Create Worker
 *    b. Paste this entire file content into the Worker editor
 *    c. Click "Save and Deploy"
 *    d. Go to Worker → Settings → Triggers → Add Route
 *    e. Add route: nabdaotp.com/* (select your zone: nabdaotp.com)
 *    f. Save
 *
 *    Option B — Wrangler CLI:
 *    a. npm install -g wrangler
 *    b. wrangler login
 *    c. Create wrangler.toml with:
 *         name = "nabda-geo-worker"
 *         main = "_worker.js"
 *         compatibility_date = "2024-01-01"
 *         routes = [{ pattern = "nabdaotp.com/*", zone_name = "nabdaotp.com" }]
 *    d. wrangler deploy
 *
 * 5. SSL/TLS:
 *    - In Cloudflare → SSL/TLS → set to "Full" (not Flexible)
 *    - Enable "Always Use HTTPS"
 *
 * HOW IT WORKS:
 * - Requests hit Cloudflare edge (global CDN)
 * - This Worker runs BEFORE the request reaches Netlify
 * - Worker detects country via CF-IPCountry header
 * - Sets X-Nabda-Lang-Hint and nabda_geo_lang cookie hints
 * - Then proxies request to Netlify normally
 * - All caching is handled by Cloudflare
 *
 * NOTE: This file in public/ is for reference only.
 * The actual deployed Worker is separate (see instructions above).
 * ============================================================
 */

const ARAB_COUNTRIES = new Set([
  'SA', 'AE', 'IQ', 'SY', 'EG', 'KW', 'QA', 'BH', 'OM', 'JO',
  'LB', 'LY', 'TN', 'DZ', 'MA', 'YE', 'SD', 'PS', 'MR', 'SO',
]);

const LATAM_SPANISH = new Set([
  'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO',
  'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY',
]);

const BRAZIL = new Set(['BR']);

const TURKISH = new Set(['TR']);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Detect country from Cloudflare's built-in geo header
    const country = request.cf?.country ?? request.headers.get('CF-IPCountry') ?? 'US';

    let langHint = 'en';
    if (ARAB_COUNTRIES.has(country)) langHint = 'ar';
    else if (BRAZIL.has(country)) langHint = 'pt';
    else if (LATAM_SPANISH.has(country)) langHint = 'es';
    else if (TURKISH.has(country)) langHint = 'tr';

    // Proxy the request to Netlify (Cloudflare handles this transparently
    // because nabdaotp.com CNAME points to Netlify with proxy enabled)
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);

    // Add geo hints as response headers (client-side JS can read these)
    newResponse.headers.set('X-Nabda-Country', country);
    newResponse.headers.set('X-Nabda-Lang-Hint', langHint);

    // Set a cookie hint on homepage visits (first time only)
    const existingLangCookie = request.headers.get('Cookie')?.includes('nabda_geo_lang=');
    if (!existingLangCookie && (url.pathname === '/' || url.pathname === '')) {
      newResponse.headers.append(
        'Set-Cookie',
        `nabda_geo_lang=${langHint}; Path=/; Max-Age=86400; SameSite=Lax`
      );
    }

    // Security headers
    newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Aggressive caching for static assets (Cloudflare CDN)
    const ext = url.pathname.split('.').pop()?.toLowerCase();
    if (['js', 'css', 'woff', 'woff2', 'ttf', 'otf'].includes(ext ?? '')) {
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico'].includes(ext ?? '')) {
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (ext === 'html' || url.pathname.endsWith('/')) {
      newResponse.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    }

    return newResponse;
  },
};
