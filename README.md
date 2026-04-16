# Hero Academy

Aplicação fullstack para gerenciamento de heróis de diversos universos fictícios.

- **Backend** — API REST com NestJS, Prisma e MySQL
- **Frontend** — SPA com React, TypeScript e Vite

---

## Rodando com Docker (recomendado)

### Pré-requisitos

- Docker e Docker Compose instalados

### Configuração

Crie um arquivo `.env` na raiz do projeto copiando o exemplo:

```bash
cp .env.example .env
```

Preencha as variáveis no `.env`:

```env
MYSQL_ROOT_PASSWORD="sua_senha_root"
MYSQL_DATABASE="hero_academy"
MYSQL_USER="hero_user"
MYSQL_PASSWORD="sua_senha"
```

### Subindo o projeto

```bash
docker compose up --build
```

Isso irá subir três containers:

- **db** — MySQL 8.4 na porta `3306`
- **backend** — API NestJS na porta `3000` (aplica as migrations automaticamente ao iniciar)
- **frontend** — Aplicação React (nginx) na porta `5173`

### URLs

| Serviço  | URL                            |
| -------- | ------------------------------ |
| Frontend | http://localhost:5173          |
| API      | http://localhost:3000          |
| Swagger  | http://localhost:3000/api/docs |

### Parar os containers

```bash
docker compose down
```

Para remover também os volumes (apaga os dados do banco):

```bash
docker compose down --volumes
```

---

## Backend

API REST para gerenciamento de heróis, construída com NestJS, Prisma e MySQL.

### Sobre

Expõe uma API completa de CRUD de heróis. Cada herói possui nome, nome de guerra, data de nascimento, universo (Marvel, DC, Dragon Ball, Naruto, etc.), poder principal e um avatar. Heróis podem ser desativados e reativados. Um herói inativo não pode ser editado até ser reativado.

Funcionalidades:

- Listagem paginada com busca por nome/nome de guerra
- Validação de entrada com `class-validator`
- Documentação automática via Swagger
- Arquitetura com camadas separadas (Controller → Service → Repository)
- Interface de repositório para facilitar testes e troca de implementação

### Tecnologias

- **NestJS 11** — framework principal
- **Prisma 7** — ORM, com adapter para MariaDB/MySQL
- **MySQL 8** — banco de dados
- **Swagger** — documentação interativa da API
- **Jest** — testes unitários e e2e

### Rodando localmente

```bash
cd hero-academy-backend
npm install
```

Crie um `.env` em `hero-academy-backend/` com a variável:

```env
DATABASE_URL="mysql://user:password@localhost:3306/hero_academy"
```

Gere o client do Prisma e rode as migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Inicie em modo desenvolvimento:

```bash
npm run start:dev
```

A API fica disponível em `http://localhost:3000`.  
A documentação Swagger em `http://localhost:3000/api/docs`.

### Endpoints

| Método  | Rota                 | Descrição                        |
| ------- | -------------------- | -------------------------------- |
| `POST`  | `/api/v1/heroes`     | Criar um novo herói              |
| `GET`   | `/api/v1/heroes`     | Listar heróis (paginado + busca) |
| `GET`   | `/api/v1/heroes/:id` | Buscar herói por ID              |
| `PATCH` | `/api/v1/heroes/:id` | Atualizar herói parcialmente     |
| `DELETE`| `/api/v1/heroes/:id` | Deletar herói                    |

### Testes (backend)

```bash
# testes unitários
npm test

# testes e2e
npm run test:e2e

# cobertura
npm run test:cov
```

Os testes unitários cobrem:

- **HeroesService** — lógica de negócio, validações, paginação
- **HeroesController** — rotas e delegação ao service
- **HeroesRepository** — interação com o Prisma

Os testes e2e validam o fluxo completo dos endpoints HTTP com mock do repositório.

### Estrutura (backend)

```
hero-academy-backend/src/
├── heroes/
│   ├── controller/       # Rotas e decorators do Swagger
│   ├── dto/              # Validação de entrada (create/update)
│   ├── repository/       # Interface + implementação Prisma
│   ├── service/          # Regras de negócio
│   └── swagger/          # Decorators de documentação
├── prisma/               # PrismaService (conexão com o banco)
└── main.ts               # Bootstrap da aplicação
```

---

## Frontend

Interface web para o gerenciamento de heróis, construída com React, TypeScript e Vite.

### Sobre

SPA que consome a API do backend para listar, criar, editar, visualizar e excluir heróis. A interface apresenta os heróis em cards com avatares, suporta busca por nome/nickname, paginação e ações rápidas via menu de contexto.

Funcionalidades:

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

### Tecnologias

- **React 19** — biblioteca de UI
- **TypeScript 6** — tipagem estática
- **Vite 8** — bundler e dev server
- **Vitest** — testes unitários
- **Testing Library** — testes de componentes
- **Nginx** — servidor de produção (via Docker)

### Rodando localmente

```bash
cd hero-academy-frontend
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`. As chamadas para `/api` são automaticamente redirecionadas ao backend na porta 3000.

### Testes (frontend)

```bash
# rodar todos os testes
npm test

# modo watch
npm run test:watch
```

Os testes cobrem:

- **heroesApi** — chamadas HTTP com mock de `fetch`
- **HeroCard** — renderização, click, badge de inativo
- **Pagination** — botões de página, navegação, estados desabilitados
- **ConfirmModal** — renderização, callbacks, estado de loading
- **ActionMenu** — abertura do dropdown, opções condicionais, callbacks
- **Toast** — renderização, ícones, auto-remoção por timeout

### Estrutura (frontend)

```
hero-academy-frontend/src/
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
