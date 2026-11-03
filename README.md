# Fabrisio Filho · Portfólio / Portfolio

Portfólio responsivo em React, TypeScript e Vite, com trajetória profissional bilíngue, vitrine curada e busca de repositórios públicos.

Responsive React, TypeScript, and Vite portfolio with bilingual career history, a curated showcase, and public repository search.

## Executar e validar / Run and verify

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
npm run preview
```

Os testes de navegador usam o build em `dist` e simulam respostas da API do GitHub. A configuração do Netlify usa o fallback de SPA e preserva os caminhos legados `/about`, `/projects`, `/articles` e `/contact`.

Browser tests use the build in `dist` and mock GitHub API responses. The Netlify SPA fallback preserves the legacy paths `/about`, `/projects`, `/articles`, and `/contact`.

## Conteúdo e idiomas / Content and locales

- `src/data/profile.ts` — contatos, competências e trajetória / contact details, skills, and career history.
- `src/data/featuredProjects.ts` — vitrine com descrições bilíngues / showcase with bilingual descriptions.
- `src/i18n/pt.ts` e `src/i18n/en.ts` — textos da interface / UI copy.
- `src/hooks/useProjects.ts` — cache de sessão de cinco minutos e lista `hiddenRepos` / five-minute session cache and `hiddenRepos` list.

A primeira preferência do navegador define o idioma inicial. Português, incluindo `pt-PT`, usa `pt-BR`. Outros idiomas usam `en-US`. O seletor salva a escolha manual localmente. A página tem URL canônica única e metadados estáticos em português, atualizados no navegador após a seleção de idioma.

The browser's first language preference sets the initial locale. Portuguese, including `pt-PT`, uses `pt-BR`. Other languages use `en-US`. The switcher saves the manual choice locally. The site has one canonical URL and static Portuguese metadata, which the browser updates after locale selection.

As descrições automáticas são exibidas no idioma original do GitHub. Em caso de falha, a vitrine continua acessível e o catálogo usa a última lista disponível na sessão.

Automatic repository descriptions are shown in their original GitHub language. If the request fails, the showcase stays available and the catalog uses the last list saved in the session.
