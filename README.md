# Fabrisio Filho · Portfólio

Portfólio em React e TypeScript, com Vite. Visual responsivo, cartões com iluminação e inclinação ao mover o mouse, animação da composição principal e suporte a `prefers-reduced-motion`.

## Executar

```sh
npm ci
npm run dev
```

## Validar e compilar

```sh
npm run build
npm run preview
```

Os arquivos para publicação são gerados em `dist`. A configuração existente do Netlify foi preservada. Nenhuma publicação automática foi executada nesta atualização.

## Conteúdo e manutenção

- `src/App.tsx`: seções e interações do portfólio.
- `src/data/profile.ts`: contatos, competências e trajetória profissional.
- `src/components/InteractiveCard.tsx`: cartão interativo reutilizável.
- `src/hooks/useProjects.ts`: carregamento paginado dos repositórios, timeout e recuperação de erro.
- `src/app.css`: identidade visual, efeitos e regras responsivas.
- `index.html`: idioma, título e descrição para buscadores.
- Os endereços antigos `/about`, `/projects`, `/articles` e `/contact` apontam para as seções correspondentes.
- A lista consulta os repositórios públicos próprios do GitHub, com paginação, busca, filtro, timeout e recuperação de erro. A API pública pode limitar as requisições. Não coloque tokens privados no frontend.
- Saída do SENAI e retorno à Trier Sistemas como Full Stack Software Developer em outubro de 2026. Os períodos são apresentados com mês e ano.
- Projetos são exibidos em grupos de seis, com busca que ignora acentos e filtro por tecnologia.
- A área de artigos indica conteúdos futuros e não apresenta carregamento fictício.

## Verificação manual

Confira em desktop e celular: navegação por âncoras e teclado, filtros dos projetos, recuperação após erro de rede, cópia do e-mail e links externos. Ative a preferência de movimento reduzido no sistema: a inclinação e as animações devem ser desativadas.

## Organização da apresentação

O topo apresenta nome, cargo e áreas de contribuição, sem foto. A foto discreta fica em Sobre. A trajetória apresenta empresas, cargos, períodos e responsabilidades, da experiência mais recente para a mais antiga, agrupando os cargos no SENAI. Os projetos encerram o conteúdo. Todos os cartões usam o componente interativo com textura pontilhada e suporte a movimento reduzido.
