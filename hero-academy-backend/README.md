# Hero Academy — Backend

API REST para gerenciamento de heróis de diversos universos fictícios, construída com NestJS, Prisma e MySQL.

## Sobre o projeto

O backend do Hero Academy expõe uma API completa de CRUD de heróis. Cada herói possui nome, nome de guerra, data de nascimento, universo (Marvel, DC, Dragon Ball, Naruto, etc.), poder principal e um avatar. Heróis podem ser desativados e reativados — um herói inativo não pode ser editado até ser reativado.

A API conta com:

- Listagem paginada com busca por nome/nickname
- Validação de entrada com `class-validator`
- Documentação automática via Swagger
- Arquitetura com camadas separadas (Controller → Service → Repository)
- Interface de repositório para facilitar testes e troca de implementação

## Tecnologias

- **NestJS 11** — framework principal
- **Prisma 7** — ORM, com adapter para MariaDB/MySQL
- **MySQL 8** — banco de dados
- **Swagger** — documentação interativa da API
- **Jest** — testes unitários e e2e
- **Docker** — containerização

## Pré-requisitos

- Node.js 22+
- npm
- MySQL 8 rodando (ou Docker)

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
DATABASE_URL=mysql://usuario:senha@localhost:3306/hero_academy
PORT=3000
```

Depois, gere o client do Prisma e rode as migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

## Rodando o projeto

```bash
# desenvolvimento (com hot reload)
npm run start:dev

# produção
npm run build
npm run start:prod
```

A API fica disponível em `http://localhost:3000`.

A documentação Swagger pode ser acessada em `http://localhost:3000/api/docs`.

## Endpoints

| Método   | Rota                 | Descrição                        |
| -------- | -------------------- | -------------------------------- |
| `POST`   | `/api/v1/heroes`     | Criar um novo herói              |
| `GET`    | `/api/v1/heroes`     | Listar heróis (paginado + busca) |
| `GET`    | `/api/v1/heroes/:id` | Buscar herói por ID              |
| `PATCH`  | `/api/v1/heroes/:id` | Atualizar herói parcialmente     |
| `DELETE` | `/api/v1/heroes/:id` | Deletar herói                    |

## Testes

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

## Estrutura do projeto

```
src/
├── heroes/
│   ├── controller/       # Rotas e decorators do Swagger
│   ├── dto/              # Validação de entrada (create/update)
│   ├── repository/       # Interface + implementação Prisma
│   ├── service/          # Regras de negócio
│   └── swagger/          # Decorators de documentação
├── prisma/               # PrismaService (conexão com o banco)
└── main.ts               # Bootstrap da aplicação
```

## Docker

O projeto inclui um Dockerfile multi-stage otimizado para produção. Para rodar tudo junto (banco + backend + frontend), use o `docker-compose.yml` na raiz do monorepo:

```bash
docker compose up --build
```
