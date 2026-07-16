# Story: Exploração Content Hub para AI GEO

## Status

Done

## Objetivo

Criar o hub editorial do pilar Exploração para aumentar autoridade temática, descoberta por motores de busca e interpretação por assistentes de IA.

## Escopo

- FAQ gigante com 200 perguntas sobre alojamento local, Airbnb, Booking, custos, operação, fiscalidade, mercado do Algarve e decisão do proprietário.
- Página "Como Trabalhamos" com fluxo operacional AHS.
- Página "Inteligência Artificial na Gestão de Alojamento Local".
- Knowledge Hub com guias práticos de exploração.
- Artigos de suporte sobre ocupação, gestão, custos, canais, ADR/RevPAR, preparação do imóvel e fiscalidade orientativa.
- Links internos a partir do pilar Exploração e rodapé.
- Atualização de sitemap.xml e llms.txt.

## Critérios de Aceitação

- [x] Todas as novas páginas ficam sob o pilar Exploração na navegação.
- [x] `exploracao.html` aponta para FAQ, Knowledge Hub, Como Trabalhamos e IA.
- [x] `llms.txt` inclui um bloco do pilar Exploração com as páginas prioritárias.
- [x] `sitemap.xml` inclui as novas páginas indexáveis.
- [x] FAQ inclui JSON-LD `FAQPage` com 200 perguntas.
- [x] Conteúdo fiscal/legal é orientativo e não substitui aconselhamento profissional.
- [x] `npm run lint` passa.
- [x] `npm run typecheck` passa.
- [x] `npm test` passa.
- [x] `npm run build` passa.
- [x] Preview e produção verificados por smoke test.

## File List

- `scripts/generate-ai-geo-content.js`
- `exploracao.html`
- `Footer.dc.html`
- `guias.html`
- `faq-alojamento-local.html`
- `como-trabalhamos.html`
- `inteligencia-artificial-gestao-alojamento-local.html`
- `como-aumentar-ocupacao-airbnb.html`
- `como-funciona-gestao-alojamento-local.html`
- `quanto-custa-gerir-airbnb.html`
- `alojamento-local-portugal.html`
- `booking-vs-airbnb.html`
- `aumentar-adr-revpar.html`
- `declarar-rendimentos-alojamento-local.html`
- `preparar-imovel-para-alojamento-local.html`
- `sitemap.xml`
- `llms.txt`
