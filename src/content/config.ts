import { defineCollection, z } from 'astro:content';

// Articles = the answer-content that gets cited by AI engines.
// `faqs` powers FAQPage structured data (high-value for AI citation + Google rich results).
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),               // the direct-answer summary; also the meta description
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('The BeautyGPT Editors'),
    category: z.string().default('Skincare'),
    featured: z.boolean().default(false),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { articles };
