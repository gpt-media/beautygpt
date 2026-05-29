# TheBeautyGPT

AI-native, evidence-led skincare answers for Malaysian skin — the media/authority layer of the Wone engine (EL-114). Built to be **cited by AI answer engines** (ChatGPT, Perplexity, Google AI Overviews) and funnel discovery demand to Wone's product brands (STIK first).

Stack: [Astro](https://astro.build) static site → deploys free on Vercel. Near-zero JavaScript = fast, clean HTML that AI crawlers read easily. Articles are markdown in `src/content/articles/`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

## Add a new article

Create `src/content/articles/your-slug.md` with frontmatter (see `best-acne-patches-malaysia-2026.md` as the template). The `faqs:` array auto-generates FAQPage structured data — the highest-value schema for getting pulled into AI answers. Commit + push; Vercel rebuilds automatically.

## Deploy (one-time, ~10 min) — non-technical steps

1. **Put this repo on GitHub.** Create a new private repo (e.g. `wonehq/thebeautygpt`), then from this folder:
   ```bash
   git remote add origin https://github.com/wonehq/thebeautygpt.git
   git push -u origin main
   ```
2. **Connect Vercel.** Go to vercel.com → **Add New → Project** → import the `thebeautygpt` repo. Vercel auto-detects Astro. Click **Deploy**. You'll get a live `…vercel.app` URL in ~1 minute.
3. **Connect the domain.** In the Vercel project → **Settings → Domains** → add `thebeautygpt.com`. Vercel shows you the DNS records to set at your domain registrar (where you bought thebeautygpt.com). Add them; the domain goes live in minutes-to-an-hour.
4. Done. Every future `git push` auto-rebuilds + redeploys.

## Editorial voice

See `thebeautygpt/voice-guide.md` in the `wonehq/wone` repo. Key difference from STIK: this is a **media brand** — it names competitors honestly and must disclose Wone/STIK ownership when recommending a Wone product. Do NOT apply STIK's product-marketing voice rules here.
