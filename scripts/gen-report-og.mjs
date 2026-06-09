#!/usr/bin/env node
// gen-report-og.mjs — one-off generator for the report's static Open Graph image.
//
// The site has a per-page OG mechanism (BaseLayout's `image` prop → og:image/twitter:image,
// forwarded by src/pages/reports/[...slug].astro from each report's `image` frontmatter) but
// no dynamic OG route. This script renders a branded 1200×630 social card for the State of
// Skin report as a committed static PNG under public/reports/, using the site's own palette +
// serif (matching public/favicon.svg and src/styles/global.css). Run on demand, not at build:
//
//   node scripts/gen-report-og.mjs
//
// Rasterized with `sharp` (already in the dependency tree, transitive via astro). The PNG is the
// committed artifact; this script just makes it reproducible. Numbers/wording mirror the report
// verbatim (9.4 percent; eighth most prevalent; 231 million prevalent cases, GBD 2019).

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = resolve(ROOT, 'public/reports/state-of-skin-2026-og.png');

// Brand tokens, kept in sync with src/styles/global.css + public/favicon.svg.
const PAPER = '#fbf9f6';
const INK = '#181818';
const INK_SOFT = '#4a4a4a';
const ACCENT = '#c8503c'; // terracotta — TheBeautyGPT accent
const LINE = '#e6e0d8';
const SERIF = "Georgia, 'Times New Roman', serif"; // system-safe serif for headless raster
const SANS = '-apple-system, Helvetica, Arial, sans-serif';

const W = 1200;
const H = 630;

// 1200×630 social card. Layout: brand lockup (terracotta monogram + wordmark), kicker,
// headline, the two headline stats as a numeric callout (9.4% + 231M), source line + domain.
// SVG text only (sharp rasterizes with its bundled fonts).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="0" y="0" width="${W}" height="12" fill="${ACCENT}"/>

  <!-- brand lockup -->
  <g>
    <rect x="72" y="72" width="48" height="48" rx="11" fill="${ACCENT}"/>
    <text x="96" y="106" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="30" fill="#ffffff">B</text>
    <text x="136" y="105" font-family="${SERIF}" font-weight="700" font-size="28" fill="${INK}">The<tspan fill="${ACCENT}">Beauty</tspan>GPT</text>
  </g>

  <text x="72" y="190" font-family="${SANS}" font-weight="700" font-size="22" letter-spacing="3" fill="${ACCENT}">ORIGINAL DATA STUDY</text>

  <text x="72" y="262" font-family="${SERIF}" font-weight="700" font-size="60" fill="${INK}">Acne affects 9.4% of the world</text>

  <!-- headline stats: global prevalence + prevalent cases -->
  <g font-family="${SERIF}">
    <text x="72" y="438" font-weight="700" font-size="128" fill="${ACCENT}">9.4<tspan font-size="56" fill="${ACCENT}">%</tspan></text>
    <text x="72" y="484" font-family="${SANS}" font-size="26" fill="${INK}">The 8th most prevalent disease on Earth</text>
  </g>

  <line x1="612" y1="324" x2="612" y2="494" stroke="${LINE}" stroke-width="2"/>

  <g font-family="${SERIF}">
    <text x="660" y="438" font-weight="700" font-size="128" fill="${INK}">231<tspan font-size="56" fill="${INK_SOFT}" font-family="${SANS}" font-weight="600">M</tspan></text>
    <text x="660" y="484" font-family="${SANS}" font-size="26" fill="${INK}">People living with acne (GBD 2019)</text>
  </g>

  <text x="72" y="566" font-family="${SANS}" font-size="22" fill="${INK_SOFT}">The State of Skin 2026 · TheBeautyGPT</text>
  <text x="${W - 72}" y="566" text-anchor="end" font-family="${SANS}" font-size="22" fill="${INK_SOFT}">thebeautygpt.com</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
writeFileSync(OUT, png);
console.log(`[gen-report-og] wrote ${OUT} (${png.length} bytes, ${W}x${H})`);
