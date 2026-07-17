# Story: Atualizar FAQ a partir de FAQ.md

## Status

Ready for Review

## Objetivo

Atualizar a FAQ do pilar Exploração com o conteúdo fornecido em `FAQ.md`, mantendo a nova configuração de fonte serifada.

## Escopo

- Versionar o conteúdo fonte em `content/faq.md`.
- Atualizar `faq-alojamento-local.html` com as 200 perguntas do Markdown.
- Manter `FAQPage` JSON-LD com 200 perguntas e respostas.
- Preservar links, listas e blocos de fórmula presentes no Markdown.
- Manter a fonte base `Georgia, 'Times New Roman', serif`.
- Atualizar `sitemap.xml` para sinalizar a alteração da FAQ.

## Critérios de Aceitação

- [x] FAQ gerada a partir de `content/faq.md`.
- [x] FAQ contém 200 perguntas.
- [x] JSON-LD `FAQPage` contém 200 perguntas.
- [x] A página continua com fonte serifada.
- [x] Respostas antigas geradas por template foram substituídas.
- [x] `npm run lint` passa.
- [x] `npm run typecheck` passa.
- [x] `npm test` passa.
- [x] `npm run build` passa.
- [ ] Preview e produção verificados por smoke test.

## File List

- `content/faq.md`
- `faq-alojamento-local.html`
- `scripts/generate-ai-geo-content.js`
- `sitemap.xml`
