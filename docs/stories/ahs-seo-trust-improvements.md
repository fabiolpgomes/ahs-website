# Story: SEO, Performance, Content, Conversion, and Trust Improvements

## Status
Ready for Review

## Context
The public site at `https://algarvehomestay.pt` had basic static pages online, but SEO-critical metadata was only present inside the client-side `<helmet>` block. The site also lacked `robots.txt`, `sitemap.xml`, public icons, structured data, and stronger content/trust signals on some pages.

## Acceptance Criteria
- [x] Public pages expose `title`, `meta description`, canonical, Open Graph, and Twitter Card metadata in the initial HTML `<head>`.
- [x] `area-cliente.html` is marked `noindex` until real authentication is available.
- [x] `robots.txt`, `sitemap.xml`, `favicon.ico`, `favicon.png`, `apple-touch-icon.png`, and `site.webmanifest` exist.
- [x] Sitemap contains only public indexable pages and uses the canonical non-www domain.
- [x] Homepage includes valid JSON-LD for organization, professional service, and website data using only already published contact/location information.
- [x] Navigation and footer use an optimized logo asset.
- [x] Referenced JPG assets are compressed without changing page structure.
- [x] `insights.html` contains useful informational content instead of a thin "coming soon" page.
- [x] `casos-sucesso.html` presents methodology without inventing client results or testimonials.
- [x] `area-cliente.html` no longer presents a fake login form or collects credentials.

## Tests
- [x] Static SEO metadata audit across HTML files.
- [x] Sitemap and robots syntax spot-check.
- [x] JSON-LD parse validation.
- [x] Local static server smoke test for key URLs.
- [x] Production HTTP baseline checked before implementation.
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm test`
- [x] `npm run build`

## File List
- `index.html`
- `quem-somos.html`
- `investimento.html`
- `consultoria.html`
- `desenvolvimento.html`
- `construcao-remodelacao.html`
- `exploracao.html`
- `gestao-patrimonial.html`
- `contacto.html`
- `insights.html`
- `casos-sucesso.html`
- `area-cliente.html`
- `apresentacao-locacao-curta-temporada.html`
- `Nav.dc.html`
- `Footer.dc.html`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `vercel.json`
- `package.json`
- `scripts/validate-static-site.js`
- `favicon.ico`
- `favicon.png`
- `apple-touch-icon.png`
- `assets/logo-ahs-192.png`
- `assets/carvoeiro-vila.jpg`
- `assets/familia-praia.jpg`
- `assets/interior-quarto.jpg`
- `assets/piscina-condominio.jpg`
- `assets/predio-laranja.jpg`
