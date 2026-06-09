// article-schema.ts — builds the Article + FAQPage JSON-LD shared by all six article templates.
//
// Centralising this keeps the six per-locale [...slug].astro templates consistent: each passes its
// own locale/url/data; the E-E-A-T enrichment (author entity, publishingPrinciples, image,
// dormant reviewer, machine-readable citations) lives here once.

import { SITE_NAME, SITE_URL, AUTHOR, PUBLISHING_PRINCIPLES, OG_IMAGE, REVIEWER } from './site';

interface ArticleData {
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  author: string;
  image?: string;
  faqs: { q: string; a: string }[];
}

/** Hosts that are us or commerce, not third-party sources — never emitted as a citation. */
const NON_CITATION_HOSTS = ['thebeautygpt.com', 'shopee', 'tiktok', 'stikbrand'];

/**
 * Pull the external source URLs the prose cites out of the raw markdown body.
 * Matches markdown links `](https://…)`, keeps only EXTERNAL absolute URLs (relative and
 * internal-article links are already excluded by requiring an http(s) scheme), drops our own
 * domain + any commerce links, and dedupes. These surface the AAD/NHS/PMC/Cleveland sources the
 * article cites as machine-readable `citation` entries — a strong AI-citation + E-E-A-T signal.
 */
function extractCitations(body?: string): string[] {
  if (!body) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  const re = /\]\((https?:\/\/[^)\s]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const url = m[1];
    let host: string;
    try {
      host = new URL(url).hostname.toLowerCase();
    } catch {
      continue; // malformed URL — skip
    }
    if (NON_CITATION_HOSTS.some((h) => host.includes(h))) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

/** Build the JSON-LD array (Article, plus FAQPage when faqs exist) for one article page. */
export function buildArticleJsonLd(opts: {
  data: ArticleData;
  inLanguage: string;
  url: string;
  /** absolute path resolver bound to Astro.site, e.g. (p) => new URL(p, Astro.site).href */
  abs: (p: string) => string;
  /** raw markdown body (entry.body) — source for auto-extracted citations. */
  body?: string;
}): Record<string, any>[] {
  const { data: d, inLanguage, url, abs, body } = opts;
  const imageAbs = d.image ? abs(d.image) : OG_IMAGE ? abs(OG_IMAGE) : '';
  const lastReviewed = (d.updatedDate ?? d.publishDate).toISOString();
  const citations = extractCitations(body);

  // Named credentialed reviewer — dormant until SITE REVIEWER is set to a REAL reviewer. Never
  // fabricated. When present it adds reviewedBy.
  const reviewedBy = REVIEWER
    ? {
        '@type': 'Person',
        name: REVIEWER.name,
        jobTitle: REVIEWER.credential,
        ...(REVIEWER.url ? { url: REVIEWER.url } : {}),
      }
    : null;

  const articleSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    // Signals health content to crawlers without invalidating Article (no fabricated reviewer).
    additionalType: 'https://schema.org/MedicalWebPage',
    headline: d.title,
    description: d.description,
    datePublished: d.publishDate.toISOString(),
    dateModified: lastReviewed,
    lastReviewed,
    author: { '@type': 'Organization', name: AUTHOR.name, url: AUTHOR.url },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publishingPrinciples: PUBLISHING_PRINCIPLES,
    inLanguage,
    ...(imageAbs ? { image: { '@type': 'ImageObject', url: imageAbs } } : {}),
    ...(citations.length
      ? { citation: citations.map((u) => ({ '@type': 'WebPage', url: u })) }
      : {}),
    ...(reviewedBy ? { reviewedBy } : {}),
  };

  const faqSchema = d.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage,
        mainEntity: d.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return faqSchema ? [articleSchema, faqSchema] : [articleSchema];
}
