// site.ts — brand identity + dormant feature flags for TheBeautyGPT.
//
// This site HARDCODES name/url in BaseLayout + components (no edition objects). This file holds
// only the cross-cutting constants the feature set needs: E-E-A-T signals, the dormant named
// reviewer, the dormant newsletter, and the default OG image.

/** Brand identity. */
export const SITE_NAME = 'TheBeautyGPT';
export const SITE_URL = 'https://thebeautygpt.com';

/** Article-schema author + visible byline. A real, honest editorial entity (not a fabricated
 *  person); links to /about/ where the team + method are described (E-E-A-T). */
export const AUTHOR = { name: 'TheBeautyGPT Editorial Team', url: 'https://thebeautygpt.com/about/' };

/** publishingPrinciples target: the canonical (country-neutral) editorial-standards page. */
export const PUBLISHING_PRINCIPLES = 'https://thebeautygpt.com/editorial-standards/';

/** Organization E-E-A-T signals. */
export const FOUNDING_DATE = '2026';
export const KNOWS_ABOUT = [
  'acne',
  'acne patches',
  'hydrocolloid',
  'salicylic acid',
  'skincare ingredients',
  'acne scars',
];

/** Site-wide default OG/social image (absolute path under the domain, e.g. '/og-default.png').
 *  '' = none emitted. Per-article `image` frontmatter overrides. */
export const OG_IMAGE = '';

/** Named credentialed reviewer for these skincare pages. NULL until a real reviewer is engaged —
 *  when set to {name, credential, url} it lights up `reviewedBy` + `lastReviewed` schema AND a
 *  visible "Reviewed by …" byline everywhere. NEVER fabricate a credential here. */
export const REVIEWER: null | { name: string; credential: string; url?: string } = null;

/** Newsletter capture. Disabled until the founder picks an ESP/endpoint — PII handling + the
 *  independent-publication footprint are a founder call. When enabled the form renders site-wide
 *  and POSTs to `action`. Until then it ships dormant: no dead form on the live site. */
export const NEWSLETTER = { enabled: false, action: '' };

/** Cloudflare Web Analytics beacon token (privacy-first, cookieless; separate property per site to preserve independence) */
export const CF_BEACON_TOKEN = 'a285616ef0bd4f178e282b35a5ea3a28';

/** Edition homepages, grouped by region — drives the footer language switch (compact zero-JS
 *  <details> disclosure). This site has no edition objects (identity is hardcoded), so this list
 *  is the single source of truth for WHICH editions exist. Links are edition HOMEPAGES on
 *  purpose, never per-page alternates: pages that exist only in the global English edition
 *  (/articles/*, /reports/*) have no /ms/ or /zh/ twins, so per-page alternate links 404 there.
 *  NOTE: /my/ 308-redirects to / (vercel.json) since the MY-English homepage merged into the
 *  root; the link still lands on the English homepage and self-heals if /my/ is ever un-merged.
 *  Region labels stay in English (recognizable from any edition); language names are autonyms.
 *  Add a row/language here when a new edition ships. */
export const EDITIONS: {
  region: string;
  flag: string;
  label: string;
  languages: { code: 'en' | 'ms' | 'zh'; name: string; href: string }[];
}[] = [
  {
    region: 'global',
    flag: '\u{1F30D}',
    label: 'Global',
    languages: [{ code: 'en', name: 'English', href: '/' }],
  },
  {
    region: 'my',
    flag: '\u{1F1F2}\u{1F1FE}',
    label: 'Malaysia',
    languages: [
      { code: 'en', name: 'English', href: '/my/' },
      { code: 'ms', name: 'Bahasa Malaysia', href: '/my/ms/' },
      { code: 'zh', name: '中文', href: '/my/zh/' },
    ],
  },
  {
    region: 'sg',
    flag: '\u{1F1F8}\u{1F1EC}',
    label: 'Singapore',
    languages: [
      { code: 'en', name: 'English', href: '/sg/' },
      { code: 'ms', name: 'Bahasa Malaysia', href: '/sg/ms/' },
      { code: 'zh', name: '中文', href: '/sg/zh/' },
    ],
  },
];

/** STIK retail channels, single source of truth for the "where to buy" note on patch-purchase-intent
 *  articles. These are STIK's LIVE Malaysia channels. No UTM params (would signal ownership of this
 *  independent-presenting site); the BuyStik component links them with rel="nofollow noopener". The
 *  official store is the only channel safe to show in markets beyond MY. */
export const STIK_BUY = {
  /** Malaysia channels (all live — Wone Core > Storefronts). */
  my: {
    shopee: 'https://shopee.com.my/stikbrand',
    tiktokShop: 'https://www.tiktok.com/@stikbrand.my',
    officialStore: 'https://stikbrand.com',
  },
  /** Singapore channels — DRAFTED, not yet live. Fill from Wone Core > Storefronts when the SG
   *  storefronts open, then set `buyStik: true` on the SG-edition article files (articles-sg*,
   *  the same slugs as MY). The BuyStik block renders only the NON-EMPTY channels here, and
   *  renders nothing if all are empty — so it stays dormant until you populate it.
   *  ⚠️ officialStore left '' on purpose: stikbrand.com is a MYR/MY Shopify store — confirm it
   *  ships to SG (or use a dedicated SG store) before listing it as the SG official store. */
  sg: {
    shopee: '',
    tiktokShop: '',
    officialStore: '',
  },
  /** Market-agnostic official store (back-compat). */
  officialStore: 'https://stikbrand.com',
};
