import { defineCollection, z } from 'astro:content';

// Shared article schema. `faqs` powers FAQPage structured data (high-value for AI citation).
const articleSchema = z.object({
  title: z.string(),
  description: z.string(),               // the direct-answer summary; also the meta description
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('TheBeautyGPT Editorial Team'),
  category: z.string().default('Skincare'),
  featured: z.boolean().default(false),
  /** optional absolute path to a per-article OG/social image; drives og:image + ImageObject. */
  image: z.string().optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  /** When true, renders the neutral "Where to buy STIK" note near the foot of the article.
   *  Set ONLY on patch-purchase-intent articles (a reader who has decided on a patch). */
  buyStik: z.boolean().optional(),
});

// One collection per language. Same schema; slugs match across languages so the
// language versions of an article share a stable URL key (powers hreflang later).
//   articles      -> en-MY  -> /articles/<slug>/
//   articles-ms   -> ms-MY  -> /ms/articles/<slug>/
//   articles-zh   -> zh-MY  -> /zh/articles/<slug>/
const articles = defineCollection({ type: 'content', schema: articleSchema });
const articlesMs = defineCollection({ type: 'content', schema: articleSchema });
const articlesZh = defineCollection({ type: 'content', schema: articleSchema });
// Singapore market (en-SG, ms-SG, zh-SG).
const articlesSg = defineCollection({ type: 'content', schema: articleSchema });
const articlesSgMs = defineCollection({ type: 'content', schema: articleSchema });
const articlesSgZh = defineCollection({ type: 'content', schema: articleSchema });
// Global English edition (the x-default). Market-less, de-geo'd content rendered at
// /articles/<slug>/ as a standalone English cluster (en + x-default both self-referencing).
// Same schema as the regional collections; slugs are de-geo'd (no -malaysia suffix).
const articlesGlobal = defineCollection({ type: 'content', schema: articleSchema });

export const collections = {
  'articles': articles,
  'articles-ms': articlesMs,
  'articles-zh': articlesZh,
  'articles-sg': articlesSg,
  'articles-sg-ms': articlesSgMs,
  'articles-sg-zh': articlesSgZh,
  'articles-global': articlesGlobal,
};
