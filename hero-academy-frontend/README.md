# Hero Academy — Frontend

Interface web para o gerenciamento de heróis, construída com React, TypeScript e Vite.

## Sobre o projeto

O frontend do Hero Academy é uma SPA que consome a API do backend para listar, criar, editar, visualizar e excluir heróis. A interface apresenta os heróis em cards com avatares, suporta busca por nome/nickname, paginação e ações rápidas via menu de contexto.

Principais funcionalidades:

- Grid de cards com avatar dos heróis
- Busca em tempo real (com debounce)
- Paginação
- Modal de criação de herói com formulário completo
- Modal de edição (apenas para heróis ativos)
- Modal de detalhes com todas as informações
- Ativação/desativação de heróis
- Exclusão com confirmação
- Toasts de feedback (sucesso/erro)
- Suporte a 13 universos (Marvel, DC, Dragon Ball, Naruto, etc.) e 28 poderes

## Tecnologias

- **React 19** — biblioteca de UI
- **TypeScript 6** — tipagem estática
- **Vite 8** — bundler e dev server
- **Vitest** — testes unitários
- **Testing Library** — testes de componentes
- **Nginx** — servidor de produção (via Docker)

## Pré-requisitos

- Node.js 22+
- npm
- Backend rodando em `http://localhost:3000` (ou via Docker Compose)

## Instalação

```bash
npm install
```

## Rodando o projeto

```bash
# desenvolvimento (com hot reload e proxy para o backend)
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`. As chamadas para `/api` são automaticamente redirecionadas ao backend na porta 3000.

## Testes

```bash
# rodar todos os testes
npm test

# modo watch
npm run test:watch
```

Os testes cobrem:

- **heroesApi** — chamadas HTTP (fetch, delete, update, create) com mock de `fetch`
- **HeroCard** — renderização, click, badge de inativo
- **Pagination** — botões de página, navegação, estados desabilitados
- **ConfirmModal** — renderização, callbacks, estado de loading
- **ActionMenu** — abertura do dropdown, opções condicionais, callbacks
- **Toast** — renderização, ícones, auto-remoção por timeout

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/           # Header
│   └── ui/               # Toast (componente reutilizável)
├── features/
│   └── heroes/
│       ├── api/          # Chamadas à API (fetch)
│       ├── components/   # HeroCard, Pagination, Modais, ActionMenu
│       ├── constants/    # Opções de universo e poder (labels)
│       ├── hooks/        # useHeroes, useHeroActions, useToast
│       ├── pages/        # HeroListPage (página principal)
│       └── types/        # Tipagens (Hero, HeroesMeta, etc.)
├── App.tsx
└── main.tsx
```

## Build para produção

```bash
npm run build
```

Os arquivos estáticos são gerados em `dist/`.

## Docker

O projeto inclui um Dockerfile multi-stage que faz o build com Node e serve com Nginx. O `nginx.conf` já está configurado para:

- Redirecionar rotas do SPA para `index.html`
- Fazer proxy reverso de `/api/` para o backend

Para rodar tudo junto, use o `docker-compose.yml` na raiz do monorepo:

```bash
docker compose up --build
```
