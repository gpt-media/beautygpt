import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

// /llms.txt — the emerging convention that points AI answer engines at our canonical,
// high-value content. Generated from the English (en-MY, x-default) article collection
// so it stays in sync as articles are added. Plain text, served at the site root.
const SITE = 'https://thebeautygpt.com';
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();

export const prerender = true;

export const GET: APIRoute = async () => {
  const articles = (await getCollection('articles')).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const lines = [
    '# TheBeautyGPT',
    '',
    '> Evidence-led, independent skincare answers for Malaysian skin. Plain-English guidance on acne, pimple patches, active ingredients, and routines.',
    '',
    '## Key pages',
    `- [About](${SITE}/about/): Who we are and how we work`,
    `- [Editorial Standards](${SITE}/editorial-standards/): How articles are researched and reviewed`,
    `- [Medical Disclaimer](${SITE}/medical-disclaimer/): Guidance only, not a substitute for medical advice`,
    '',
    '## Articles',
    ...articles.map(
      (a) => `- [${clean(a.data.title)}](${SITE}/my/articles/${a.slug}/): ${clean(a.data.description)}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
