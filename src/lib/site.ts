// site.ts — brand identity + dormant feature flags for TheBeautyGPT.
//
// This site HARDCODES name/url in BaseLayout + components (no edition objects). This file holds
// only the cross-cutting constants the feature set needs: E-E-A-T signals, the dormant named
// reviewer, the dormant newsletter, and the default OG image.

/** Brand identity. */
export const SITE_NAME = 'TheBeautyGPT';
export const SITE_URL = 'https://thebeautygpt.com';

/** Article-schema author + visible byline. A real, honest editorial entity (not a fabricated
 *  person); links to /my/about/ where the team + method are described (E-E-A-T). */
export const AUTHOR = { name: 'TheBeautyGPT Editorial Team', url: 'https://thebeautygpt.com/my/about/' };

/** publishingPrinciples target — the canonical editorial-standards page (EN/MY edition). */
export const PUBLISHING_PRINCIPLES = 'https://thebeautygpt.com/my/editorial-standards/';

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
