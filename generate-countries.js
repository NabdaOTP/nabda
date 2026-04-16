#!/usr/bin/env node
/**
 * Nabda OTP - Country Pages Generator
 * Generates clean country-specific landing pages with proper SEO and URL structure
 *
 * Usage: node generate-countries.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DATA_PATH = path.join(ROOT, "countries-data.json");
const TEMPLATE_PATH = path.join(ROOT, "country-template.html");
const OUTPUT_DIR = path.join(ROOT, "countries");

// Reading files
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function readTemplate(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function cleanDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function assertNoUnreplacedTokens(html, outputPath) {
  const leftOvers = html.match(/\{\{[^}]+\}\}/g) || [];
  if (leftOvers.length > 0) {
    console.warn(
      `⚠️  Unreplaced tokens in ${outputPath}: ${[...new Set(leftOvers)].join(", ")}`,
    );
  }
}

// Replace tokens
function replaceTokens(template, data) {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, token) => {
    const key = token.trim();
    if (data[key] !== undefined && data[key] !== null) {
      return String(data[key]);
    }
    // Backward compatibility: try original token as-is
    if (data[token] !== undefined && data[token] !== null) {
      return String(data[token]);
    }
    return "";
  });
}

// Build trust points
function buildTrustPointsHtml(points) {
  return points
    .map(
      (point) => `
    <div class="stat-item">
      <div class="stat-icon">✓</div>
      <div class="stat-label">${escapeHtml(point)}</div>
    </div>
  `,
    )
    .join("");
}

function buildBenefitsHtml(benefits) {
  return (benefits || [])
    .map(
      (benefit) => `
    <article class="feature-card">
      <div class="feature-icon">${escapeHtml(benefit.icon || "✨")}</div>
      <h3>${escapeHtml(benefit.title || "")}</h3>
      <p>${escapeHtml(benefit.description || "")}</p>
    </article>
  `,
    )
    .join("");
}

// function buildFaqHtml(faq) {
//   return (faq || [])
//     .map(
//       (item) => `
//     <article class="feature-card">
//       <h3>${escapeHtml(item.question || "")}</h3>
//       <p>${escapeHtml(item.answer || "")}</p>
//     </article>
//   `,
//     )
//     .join("");
// }
function buildFaqHtml(faq) {
  if (!faq || faq.length === 0) return "";

  return faq
    .map(
      (item) => `
    <div class="faq-item">
      <button class="faq-question">
        ${escapeHtml(item.question)}
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </div>
  `,
    )
    .join("");
}

// Build FAQ Schema
function buildFaqSchema(canonicalUrl, faq) {
  const mainEntity = faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mainEntity,
      url: canonicalUrl,
    },
    null,
    2,
  );
}

// Build WebPage Schema
function buildWebPageSchema(data) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: data.canonicalUrl,
      name: data.metaTitle,
      description: data.metaDescription,
      inLanguage: ["en", "ar"],
      isPartOf: {
        "@type": "WebSite",
        name: "Nabda OTP",
        url: data.baseUrl,
      },
      about: {
        "@type": "Service",
        name: `WhatsApp OTP API in ${data.countryName}`,
        areaServed: data.countryName,
      },
    },
    null,
    2,
  );
}

// Build Organization Schema
function buildOrganizationSchema() {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nabda OTP",
      url: "https://www.nabdaotp.com/",
      areaServed: ["Egypt", "Iraq", "Saudi Arabia", "Syria", "MENA"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
      },
    },
    null,
    2,
  );
}

function createLocalizedCountry(
  baseCountry,
  localeOverrides,
  fallbackLanguage = "en",
) {
  return {
    ...baseCountry,
    ...(localeOverrides || {}),
    language: (localeOverrides && localeOverrides.language) || fallbackLanguage,
    dir:
      (localeOverrides && localeOverrides.dir) ||
      (fallbackLanguage === "ar" ? "rtl" : "ltr"),
  };
}

function main() {
  console.log("🚀 Starting country pages generation...\n");
  console.log(`📄 Data file: ${DATA_PATH}`);
  console.log(`🧩 Template file: ${TEMPLATE_PATH}`);
  console.log(`📂 Output root: ${OUTPUT_DIR}\n`);

  const data = readJson(DATA_PATH);
  const template = readTemplate(TEMPLATE_PATH);

  if (!data.site || !Array.isArray(data.countries)) {
    throw new Error("Invalid countries-data.json structure");
  }

  cleanDir(OUTPUT_DIR);
  console.log("🧹 Cleared old countries output folder.\n");

  let generatedCount = 0;
  const generatedPaths = [];

  for (const country of data.countries) {
    const countryDir = path.join(OUTPUT_DIR, country.slug); // مثال: /eg
    ensureDir(countryDir);
    const arCountryDir = path.join(ROOT, "ar", country.slug);

    // Public URLs (clean): /slug/ and /ar/slug/
    const enUrl = `${data.site.baseUrl}/${country.slug}/`;
    const arUrl = `${data.site.baseUrl}/ar/${country.slug}/`;

    const phoneExample =
      country.countryCode === "EG"
        ? "+2010XXXXXXX"
        : country.countryCode === "IQ"
          ? "+964750XXXXXXX"
          : country.countryCode === "SA"
            ? "+9665XXXXXXXX"
            : "+9639XXXXXXX";

    const buildMergedData = (localizedCountry, pageCanonicalUrl) => ({
      ...localizedCountry,
      brandName: data.site.brandName || "Nabda OTP",
      baseUrl: data.site.baseUrl,
      enUrl,
      canonicalUrl: pageCanonicalUrl,
      arUrl: arUrl,
      ogImage: data.site.defaultOgImage,
      primaryCtaUrl: data.site.primaryCtaUrl,
      contactUrl: data.site.contactUrl,
      logoPath: data.site.logoPath,
      stylesPath: data.site.stylesPath,
      scriptPath: data.site.scriptPath,
      phoneExample: phoneExample,
      geoPosition:
        localizedCountry.countryCode === "EG"
          ? "30.0444;31.2357"
          : localizedCountry.countryCode === "SA"
            ? "24.7136;46.6753"
            : localizedCountry.countryCode === "QA"
              ? "25.2854;51.5310"
              : "33.3128;44.3615",

      // HTML Builders
      trustPointsHtml: buildTrustPointsHtml(localizedCountry.trustPoints || []),
      benefitsHtml: buildBenefitsHtml(localizedCountry.benefits || []),
      faqHtml: buildFaqHtml(localizedCountry.faq || []),

      // Structured Data
      structuredDataWebPage: buildWebPageSchema({
        ...localizedCountry,
        canonicalUrl: pageCanonicalUrl,
        baseUrl: data.site.baseUrl,
      }),
      structuredDataFaq: buildFaqSchema(
        pageCanonicalUrl,
        localizedCountry.faq || [],
      ),
      structuredDataOrganization: buildOrganizationSchema(),
    });

    // EN page
    const enCountry = createLocalizedCountry(country, null, "en");
    const enMergedData = buildMergedData(enCountry, enUrl);

    // Build HTML (EN)
    let html = replaceTokens(template, enMergedData);

    // Save EN
    const outputPath = path.join(countryDir, "index.html");
    assertNoUnreplacedTokens(html, outputPath);
    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`✅ Generated: ${outputPath}`);
    generatedCount++;
    generatedPaths.push(outputPath);

    // AR page (only for countries that define `ar`)
    if (country.ar && typeof country.ar === "object") {
      ensureDir(arCountryDir);
      const arCountry = createLocalizedCountry(country, country.ar, "ar");
      const arMergedData = buildMergedData(arCountry, arUrl);
      const arHtml = replaceTokens(template, arMergedData);
      const arOutputPath = path.join(arCountryDir, "index.html");
      assertNoUnreplacedTokens(arHtml, arOutputPath);
      fs.writeFileSync(arOutputPath, arHtml, "utf8");
      console.log(`✅ Generated: ${arOutputPath}`);
      generatedCount++;
      generatedPaths.push(arOutputPath);
    }
  }

  console.log(
    `\n🎉 Done! Successfully generated ${generatedCount} country pages.`,
  );
  console.log("📁 Generated files:");
  generatedPaths.forEach((filePath) => console.log(`   - ${filePath}`));
  console.log(
    "\n✅ All pages are ready as index.html inside their country folders.",
  );
}

main();
