# Nabda OTP — Multilingual SEO Site

Astro 5 static site for **nabdaotp.com** — fully internationalized in **11 languages**, 1,033+ auto-generated pages, and a complete SEO/AI-discovery stack.

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS + custom CSS (Stripe-inspired) |
| i18n | Central `src/i18n/translations.ts` — 11 languages |
| Hosting | Netlify |
| DNS / CDN | Cloudflare (proxy + Worker for geo detection) |
| Sitemap | `@astrojs/sitemap` with hreflang for all locales |
| Repo | GitHub |

---

## Languages Supported (11)

| # | Code | Language | Direction |
|---|------|----------|-----------|
| 1 | `en` | English | LTR |
| 2 | `ar` | العربية | **RTL** |
| 3 | `es` | Español | LTR |
| 4 | `pt` | Português | LTR |
| 5 | `fr` | Français | LTR |
| 6 | `de` | Deutsch | LTR |
| 7 | `tr` | Türkçe | LTR |
| 8 | `it` | Italiano | LTR |
| 9 | `id` | Bahasa Indonesia | LTR |
| 10 | `tl` | Filipino | LTR |
| 11 | `sw` | Kiswahili | LTR |

- English is the default locale — no prefix (`/countries/...`)
- All other locales are prefixed (`/ar/countries/...`, `/es/countries/...`, etc.)
- Arabic pages auto-apply `dir="rtl"` and `lang="ar"` on the `<html>` element
- User language preference is saved to `localStorage` as `nabda_lang` and **always overrides** geo detection

---

## Generated Pages (~1,033 total)

| Section | EN pages | × 11 locales | Total |
|---------|----------|--------------|-------|
| Homepage | 1 | 11 | 12 |
| Countries index | 1 | 11 | 12 |
| Country pages | 50 | 11 | 561 |
| Compare pages | 16 | 11 | 176 |
| Solution pages | 8 | 11 | 88 |
| Blog index | 1 | 11 | 12 |
| Blog posts | 6 | 11 | 66 |
| About | 1 | 11 | 12 |
| Privacy Policy | 1 | 11 | 12 |
| Terms of Service | 1 | 11 | 12 |
| Refund Policy | 1 | 11 | 12 |
| 404 | 1 | — | 1 |
| sitemap-index.xml | auto | — | 1 |
| robots.txt | auto | — | 1 |
| llms.txt | 1 | — | 1 |

---

## Project Structure

```
nabda-site/
├── astro.config.mjs          # Astro + i18n + sitemap config
├── netlify.toml              # Build + headers + cache config
├── tailwind.config.mjs
├── public/
│   ├── llms.txt              # AI crawler visibility file
│   ├── _worker.js            # Cloudflare geo-detection Worker
│   ├── _redirects            # Netlify redirects
│   ├── _headers              # HTTP header overrides
│   └── assets/               # Favicons, OG image, logo
├── src/
│   ├── i18n/
│   │   ├── translations.ts   # All UI strings × 11 languages + locale utils
│   │   └── page-content.ts   # Region labels, legal titles, country name helpers
│   ├── data/
│   │   ├── countries.ts      # 50 countries
│   │   ├── competitors.ts    # 16 comparison pages
│   │   ├── solutions.ts      # 8 solution pages
│   │   └── blog.ts           # 6 blog posts
│   ├── layouts/
│   │   └── BaseLayout.astro  # Global HTML head, hreflang × 11, RTL, meta, JSON-LD
│   ├── components/
│   │   ├── Navbar.astro      # Globe switcher, Home link, mobile menu, 11 languages
│   │   ├── Footer.astro      # Localized links + legal
│   │   ├── CTASection.astro  # Localized CTA
│   │   └── FAQSection.astro  # Accordion (touch-friendly)
│   ├── pages/
│   │   ├── index.astro                     # EN homepage
│   │   ├── 404.astro
│   │   ├── robots.txt.ts                   # Full robots.txt with AI bots
│   │   ├── about.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-service.astro
│   │   ├── refund-policy.astro
│   │   ├── countries/
│   │   │   ├── index.astro                 # All-countries index (EN)
│   │   │   └── [slug].astro                # Country detail (EN)
│   │   ├── compare/[slug].astro            # Compare pages (EN)
│   │   ├── solutions/[slug].astro          # Solution pages (EN)
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── [lang]/                         # ← all other 10 locales
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── privacy-policy.astro
│   │       ├── terms-of-service.astro
│   │       ├── refund-policy.astro
│   │       ├── countries/
│   │       │   ├── index.astro
│   │       │   └── [slug].astro
│   │       ├── compare/[slug].astro
│   │       ├── solutions/[slug].astro
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   └── styles/
│       └── global.css
```

---

## Local Development

```bash
cd nabda-site
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/ (~1,033 pages)
npm run preview    # preview build locally
```

---

## Deployment: Netlify

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: full i18n 11 languages + sitemap + llms.txt"
git remote add origin https://github.com/YOUR_USERNAME/nabda-otp-site
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Select your GitHub repo
3. Build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**

### 3. Add Custom Domain

1. Netlify → Site settings → **Domain management** → **Add custom domain**
2. Enter: `nabdaotp.com`
3. Also add `www.nabdaotp.com`

---

## DNS Setup: Cloudflare

### Point Domain to Netlify via Cloudflare

1. Cloudflare Dashboard → `nabdaotp.com` → **DNS**
2. Delete existing A/CNAME records for `@` and `www`
3. Add:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `@` | `nabda-otp.netlify.app` | ✅ Proxied |
| CNAME | `www` | `nabda-otp.netlify.app` | ✅ Proxied |

4. Cloudflare → **SSL/TLS** → **Full**
5. Enable **Always Use HTTPS**

---

## Cloudflare Worker: Geo-Detection

The Worker reads the `CF-IPCountry` header and sets a `nabda_geo_lang` cookie hint — **no hard redirects, better for SEO**. User `localStorage` preference always wins.

### Deploy

**Option A — Dashboard:**

1. Workers & Pages → Create Worker
2. Paste contents of `public/_worker.js`
3. Save and Deploy
4. Add Route: `nabdaotp.com/*`

**Option B — Wrangler CLI:**

```bash
npm install -g wrangler
wrangler login
```

`wrangler.toml`:
```toml
name = "nabda-geo-worker"
main = "public/_worker.js"
compatibility_date = "2024-01-01"

[[routes]]
pattern = "nabdaotp.com/*"
zone_name = "nabdaotp.com"
```

```bash
wrangler deploy
```

### Geo-Detection Mapping

| Visitor Country | Suggested Language |
|----------------|--------------------|
| SA, AE, IQ, SY, EG, KW, QA... | `ar` |
| BR | `pt` |
| MX, CO, AR, CL, PE, ES... | `es` |
| FR, BE, CH... | `fr` |
| DE, AT... | `de` |
| TR | `tr` |
| IT | `it` |
| ID | `id` |
| PH | `tl` |
| TZ, KE, UG... | `sw` |
| Everything else | `en` |

---

## Navbar

| Link | Destination |
|------|-------------|
| Home | `/` (locale-aware) |
| Features | `/#features` |
| Pricing | `/#pricing` |
| Solutions | `/#solutions` |
| Compare | `/#compare` |
| Blog | `/blog` |
| Docs | `https://api.nabdaotp.com/docs` |
| 🌐 Language | Dropdown (11 options, active ✓, saves to localStorage) |
| Login | `https://dash.nabdaotp.com/` |

- Mobile: all links + full language list inside hamburger menu
- Arabic: navbar automatically switches to RTL layout

---

## SEO Features

- ✅ Unique `<title>` + `<meta name="description">` on every page
- ✅ `hreflang` alternates × 11 locales on every page (auto-generated by sitemap integration)
- ✅ `<html lang="...">` and `dir="rtl"` for Arabic pages
- ✅ Canonical URLs on every page
- ✅ `sitemap-index.xml` with per-page priority + `changefreq`:
  - Homepage: `1.0` / `daily`
  - Countries: `0.9` / `weekly`
  - Compare / Solutions: `0.8` / `weekly`
  - Blog: `0.7` / `weekly`
  - Static pages: `0.5` / `monthly`
- ✅ `robots.txt` — allows all, includes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- ✅ `public/llms.txt` — AI engine visibility file
- ✅ JSON-LD schemas: `SoftwareApplication`, `FAQPage`, `Organization`, `WebSite` + `SearchAction`, `TechArticle`
- ✅ Open Graph + Twitter Card on every page
- ✅ `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
- ✅ `<meta http-equiv="content-language">` per page
- ✅ `<meta name="geo.region">` + `<meta name="geo.placename">` on country pages
- ✅ `revisit-after: 7 days`

---

## Content Files

All content lives in `src/data/`:

| File | Records | Description |
|------|---------|-------------|
| `countries.ts` | 50 | Country pages with phone code, region, local market notes |
| `competitors.ts` | 16 | Comparison pages with feature tables, pros/cons, FAQs |
| `solutions.ts` | 8 | Solution pages with sections, code examples, FAQs |
| `blog.ts` | 6 | Blog posts with full Markdown content |

### Add a New Country

In `src/data/countries.ts`:

```typescript
{
  slug: 'whatsapp-api-new-country',
  name: 'New Country',
  nameAr: 'الدولة الجديدة',       // optional Arabic name
  phoneCode: '+XX',
  region: 'asia',                 // 'arab' | 'asia' | 'latam' | 'africa' | 'europe'
  languages: ['en'],
  localMarketNote: 'Description of local WhatsApp usage...',
  localMarketNoteAr: '...',       // optional Arabic note
}
```

### Add a New Blog Post

In `src/data/blog.ts`:

```typescript
{
  slug: 'my-new-post',
  title: 'My Post Title',
  metaTitle: 'My Post Title | Nabda OTP',
  metaDescription: '...',
  publishDate: '2026-03-19',
  author: 'Nabda OTP Team',
  readTime: '5 min read',
  category: 'Tutorial',
  keywords: ['keyword1', 'keyword2'],
  excerpt: 'Short excerpt...',
  content: `# Heading\n\nContent in Markdown format...`,
}
```

### Add a Translation String

In `src/i18n/translations.ts`, add the key to the `UiDictionary` interface and then add the translated value for all 11 locale entries.

---

## Key Links

| Purpose | URL |
|---------|-----|
| Dashboard / Login / Sign Up | https://dash.nabdaotp.com/ |
| API Documentation | https://api.nabdaotp.com/docs |
| WhatsApp Support | https://wa.me/905346639145 |
| Live site | https://nabdaotp.com |

---

## Post-Deployment Checklist

After deploying to Netlify + Cloudflare:

- [ ] **Google Search Console** → Add property `nabdaotp.com` → Submit sitemap: `https://nabdaotp.com/sitemap-index.xml`
- [ ] **Bing Webmaster Tools** → Add site → Submit same sitemap URL
- [ ] **Verify robots.txt** → `https://nabdaotp.com/robots.txt`
- [ ] **Verify llms.txt** → `https://nabdaotp.com/llms.txt`
- [ ] **Test Arabic page** → `https://nabdaotp.com/ar/` — confirm `dir="rtl"` and RTL layout
- [ ] **Test language switcher** → Switch languages, reload — confirm `localStorage` persists choice
- [ ] **Test mobile nav** → Hamburger menu shows all links + language list
- [ ] **Verify hreflang** → Check page source of any page for 11 `<link rel="alternate">` tags
- [ ] **Cloudflare Worker deployed** and route `nabdaotp.com/*` is active
