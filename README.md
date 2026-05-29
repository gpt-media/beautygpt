# TheBeautyGPT

Evidence-led skincare answers for Malaysian skin. Built to be fast, clean, and easily read by search + AI answer engines.

Stack: [Astro](https://astro.build) static site → deploys on Vercel. Near-zero JavaScript = fast pages and clean HTML. Articles are markdown in `src/content/articles/`. All content lives under the `/my/` locale (so other markets like `/us/` can be added later as a clean copy).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

## Add a new article

Create `src/content/articles/your-slug.md` with frontmatter (see `best-acne-patches-malaysia-2026.md` as the template). The `faqs:` array auto-generates FAQ structured data. Commit + push; Vercel rebuilds automatically. New article URL: `/my/articles/your-slug/`.

## Deploy

1. **GitHub:** this repo (already pushed) — `beautygpt/site` (public).
2. **Vercel:** LIVE (Astro auto-detected, Hobby/free). Deployed 2026-05-29. Default URL: https://site-rust-eight-74.vercel.app
3. **Domain:** ✅ LIVE at **https://thebeautygpt.com** — GoDaddy apex `A @ → 216.198.79.1`, valid Let's Encrypt SSL (auto-renew). Connected 2026-05-29. `www.` → apex 308 redirect also live.

Every future `git push` auto-rebuilds + redeploys.

## Editorial voice

Clear, calm, evidence-led. Explain the mechanism before recommending a product; compare real options available in Malaysia; keep it relevant to local prices and climate. Educational content, not medical advice.
