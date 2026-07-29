# Story: URL canônica do The Algarve Collection Guide

## Status

Done

## Story

**Como** Algarve Home Stay,  
**quero** uma URL empresarial estável para o The Algarve Collection Guide,  
**para que** o QR code permaneça válido mesmo se a hospedagem do guia mudar.

## Acceptance Criteria

1. `https://algarvehomestay.pt/ahs-collection-guide` redireciona para
   `https://the-algarve-collection-mvp.vercel.app/website/`.
2. A grafia pública usa `collection`, com dois `l`.
3. O redirecionamento é temporário durante a validação inicial para evitar cache
   permanente de uma configuração ainda reversível.
4. As regras existentes de consolidação de `www.algarvehomestay.pt` permanecem
   inalteradas.
5. `npm run lint`, `npm run typecheck`, `npm test` e `npm run build` passam.

## Tasks

- [x] Adicionar a rota empresarial ao `vercel.json`.
- [x] Executar os quality gates.
- [x] Validar o redirecionamento publicado.

## Dev Agent Record

### Completion Notes

- A rota foi inserida antes do redirecionamento genérico condicionado ao host.
- `permanent: false` será mantido durante a validação inicial.
- Lint, typecheck e testes passaram no repositório.
- O build passou numa cópia temporária do estado atual para preservar alterações
  não commitadas existentes em `public/`, que o script reconstrói integralmente.
- O asset já referenciado por páginas publicadas foi incluído para restaurar a
  integridade do build limpo.

### File List

- `vercel.json`
- `assets/fabio-luis-pinto-gomes.jpg`
- `docs/stories/ahs-collection-guide-redirect.md`

## QA Results

### 2026-07-29

**Gate:** PASS for release

- The redirect is scoped to the approved path and precedes the existing generic
  `www` host consolidation rule.
- JSON syntax and all repository quality gates pass in a clean release copy.
- CodeRabbit reported no critical findings.
- Production validation passed: the company URL returns HTTP 307 to the guide,
  whose final response is HTTP 200.
