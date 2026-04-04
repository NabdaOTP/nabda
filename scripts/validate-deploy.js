/**
 * Pre-deploy checks: valid JSON-LD, core files, local asset paths referenced from HTML/manifest.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let errors = 0;

function fail(msg) {
  console.error("ERROR:", msg);
  errors++;
}

function warn(msg) {
  console.warn("WARN:", msg);
}

const required = [
  "index.html",
  "script.js",
  "style.css",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "netlify.toml",
  "serve.json",
  "_redirects",
];

for (const f of required) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) fail(`Missing required file: ${f}`);
}

const htmlPath = path.join(root, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

const ldRe = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
let match;
let block = 0;
while ((match = ldRe.exec(html)) !== null) {
  block++;
  try {
    JSON.parse(match[1]);
  } catch (e) {
    fail(`JSON-LD block #${block}: ${e.message}`);
  }
}
if (block === 0) fail("No JSON-LD blocks found in index.html");
else console.log(`OK: ${block} JSON-LD block(s) parse`);

/** Collect local /assets/... paths from HTML (href, src, meta content, etc.) */
const assetRefs = new Set();
for (const m of html.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)) {
  assetRefs.add(m[1].replace(/^\//, ""));
}
for (const m of html.matchAll(/https:\/\/www\.nabdaotp\.com(\/assets\/[a-zA-Z0-9._/-]+)/g)) {
  assetRefs.add(m[1].replace(/^\//, ""));
}

try {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "assets", "site.webmanifest"), "utf8")
  );
  for (const icon of manifest.icons || []) {
    if (icon.src && icon.src.startsWith("/")) {
      assetRefs.add(icon.src.replace(/^\//, ""));
    }
  }
} catch (e) {
  fail(`site.webmanifest: ${e.message}`);
}

for (const rel of assetRefs) {
  const clean = rel.split("?")[0];
  const disk = path.join(root, clean);
  if (!fs.existsSync(disk)) {
    warn(`Missing asset (add before production deploy): /${clean}`);
  }
}

if (errors > 0) {
  console.error(`\nvalidate-deploy: ${errors} error(s)`);
  process.exit(1);
}
console.log("validate-deploy: passed (see WARNs for any missing images/icons)");
