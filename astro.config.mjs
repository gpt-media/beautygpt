import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TheBeautyGPT — AI-native, evidence-led skincare answers for Malaysian skin.
// Static output = fast, clean HTML that AI answer engines (GPTBot, PerplexityBot,
// ClaudeBot, Google) can read + cite. This is the whole point: be the source.
export default defineConfig({
  site: 'https://thebeautygpt.com',
  integrations: [sitemap()],
  build: { format: 'directory' },
  // Locale routing: all content lives under /my/ so adding /us/, /uk/ later is a clean copy.
  // Root redirects to the Malaysian site (the only market live today).
  redirects: { '/': '/my/' },
});
