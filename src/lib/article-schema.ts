// article-schema.ts — builds the Article + FAQPage JSON-LD shared by all six article templates.
//
// Centralising this keeps the six per-locale [...slug].astro templates consistent: each passes its
// own locale/url/data; the E-E-A-T enrichment (author entity, publishingPrinciples, image,
// dormant reviewer) lives here once.

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

/** Build the JSON-LD array (Article, plus FAQPage when faqs exist) for one article page. */
export function buildArticleJsonLd(opts: {
  data: ArticleData;
  inLanguage: string;
  url: string;
  /** absolute path resolver bound to Astro.site, e.g. (p) => new URL(p, Astro.site).href */
  abs: (p: string) => string;
}): Record<string, any>[] {
  const { data: d, inLanguage, url, abs } = opts;
  const imageAbs = d.image ? abs(d.image) : OG_IMAGE ? abs(OG_IMAGE) : '';
  const lastReviewed = (d.updatedDate ?? d.publishDate).toISOString();

  // Named credentialed reviewer — dormant until SITE REVIEWER is set to a REAL reviewer. Never
  // fabricated. When present it adds reviewedBy + lastReviewed.
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
    headline: d.title,
    description: d.description,
    datePublished: d.publishDate.toISOString(),
    dateModified: lastReviewed,
    author: { '@type': 'Organization', name: AUTHOR.name, url: AUTHOR.url },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publishingPrinciples: PUBLISHING_PRINCIPLES,
    inLanguage,
    ...(imageAbs ? { image: { '@type': 'ImageObject', url: imageAbs } } : {}),
    ...(reviewedBy ? { reviewedBy, lastReviewed } : {}),
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
