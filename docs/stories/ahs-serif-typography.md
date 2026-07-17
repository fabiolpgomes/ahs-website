# Story: Tipografia Serifada Global

## Status

Done

## Objetivo

Alterar a tipografia principal do site para uma fonte serifada, melhorando a experiência de leitura em páginas institucionais, guias, FAQ e conteúdos longos.

## Escopo

- Trocar a fonte base de texto comum de `Manrope` para `Georgia, 'Times New Roman', serif`.
- Manter `Cormorant Garamond` nos títulos e destaques, preservando a identidade visual já existente.
- Atualizar componentes partilhados, páginas públicas, apresentação e gerador de conteúdo AI GEO.
- Manter inputs e formulários consistentes com a nova fonte base.

## Critérios de Aceitação

- [x] Não existem referências a `Manrope` nas páginas públicas e componentes principais.
- [x] Texto comum usa fonte serifada.
- [x] Títulos continuam com `Cormorant Garamond`.
- [x] `npm run lint` passa.
- [x] `npm run typecheck` passa.
- [x] `npm test` passa.
- [x] `npm run build` passa.
- [x] Produção verificada após deploy.

## File List

- `*.html`
- `*.dc.html`
- `scripts/generate-ai-geo-content.js`
