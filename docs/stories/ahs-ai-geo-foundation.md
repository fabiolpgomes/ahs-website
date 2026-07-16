# AHS AI GEO Foundation

## Status
In Progress

## Story
As AHS, I want the public website to expose a clearer brand entity, structured data, AI crawler access guidance, an LLM-oriented content map, and local landing pages so search engines and AI answer systems can better understand what the company does and where it operates.

## Acceptance Criteria
- `robots.txt` explicitly allows major AI discovery bots without blocking regular indexation.
- `/llms.txt` exists and curates the most important public pages for AI agents.
- Public indexable pages contain valid JSON-LD.
- Homepage JSON-LD defines AHS as an Organization and LocalBusiness/RealEstateAgent entity with factual services, contact details and areas served.
- City landing pages exist for Portimão, Albufeira, Lagos, Faro, Tavira, Vilamoura, Quarteira, Alvor and Armação de Pêra.
- Sitemap includes all new indexable city pages.
- Existing quality gates pass.

## Tasks / Subtasks
- [x] Add AI crawler allow rules to `robots.txt`.
- [x] Create `/llms.txt` with curated page map and AI guidance.
- [x] Add city landing pages for the nine priority locations.
- [x] Add JSON-LD to existing indexable public pages.
- [x] Expand homepage entity schema.
- [x] Update sitemap.
- [x] Extend static validation for `llms.txt`, AI bot rules, sitemap coverage and JSON-LD.
- [x] Run full quality gates.
- [ ] Deploy and smoke test production.

## Dev Agent Record
### Agent Model Used
GPT-5 Codex

### Debug Log References
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm test` passed.
- `npm run build` passed.

### Completion Notes List
- Fundadores, ano de criação, redes sociais and reviews were intentionally not invented; add when factual source data is available.
- The `llms.txt` convention is implemented as a complementary discovery aid, not treated as a guaranteed ranking factor.

### File List
- `robots.txt`
- `llms.txt`
- `sitemap.xml`
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
- `apresentacao-locacao-curta-temporada.html`
- `gestao-al-portimao.html`
- `gestao-al-albufeira.html`
- `gestao-al-lagos.html`
- `gestao-al-faro.html`
- `gestao-al-tavira.html`
- `gestao-al-vilamoura.html`
- `gestao-al-quarteira.html`
- `gestao-al-alvor.html`
- `gestao-al-armacao-de-pera.html`
- `scripts/build-static-site.js`
- `scripts/validate-static-site.js`
- `docs/stories/ahs-ai-geo-foundation.md`

## Change Log
- 2026-07-16: Added AI GEO foundation for entity clarity, AI discovery, schema coverage and local landing pages.
