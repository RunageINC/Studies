# Introdução

## Stack

- React + Vite
- React Query
- Pnpm

> PNPM tem um gerenciamento de cache melhor

### Shadcn

Segue um estilo chamado design by copy/paste, onde os componenetes são determinados dentro da aplicação. Dessa forma, os componentes são mais facilmente customizáveis.

### Plugins e Extensões

- PostCSS Language Support
- [Tailwind CSS IntelliSense ](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [ESLint Simple Import Sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)

### React Router

A escolha do tipo de routing foi de Framework.

### React Helmet Async

Nos permite alterar as meta tags (como título diferente para cada página). O [React Helmet Async](https://www.npmjs.com/package/react-helmet-async) é um fork do antigo React Helmet com mais manutenção e atualizações.

## State Types

- Local State - estados da aplicação react, como useState
- Global State - estados gerenciados como contextos (redux, jotai, zustand)
- HTTP State - Dados http que populam a interface

## Interface otimista

Pressupõe que uma atualização de dados através da interface deu certo. Por exemplo, se estamos lidando com um pequeno form de atualizar nomes, podemos pressupor mesmo que a operação não tenha concluído totalmente no back-end que tenha dado certo. Se der errado, podemos fazer um rollback.

Muito útil em casos pequenos como atualizações pequenas de nome e etc.

## E2E

Nem todo E2E precisa rodar com mocks.
