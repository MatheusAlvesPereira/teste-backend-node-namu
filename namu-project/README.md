# Namu Wellness API

API REST para gerenciamento de programas de bem-estar, atividades e participações — entrega do teste técnico Backend Node.js (nível Pleno).

## Funcionalidades implementadas

### Obrigatórias

- CRUD de programas (`/programs`)
- CRUD de atividades (`/programs/:programId/activities`)
- Registro de participações (`POST /participations`)
- Relatório por programa (`GET /programs/:programId/summary`)

### Diferenciais (Pleno)

- NestJS com módulos separados por domínio
- Docker Compose (API + MySQL) com um comando
- Swagger em `/api/docs`
- Paginação nas listagens
- Health check (`GET /health`)
- Testes unitários e de integração (e2e)
- GitHub Actions para CI
- Documentação técnica em [`docs/DOCUMENTATION.md`](docs/DOCUMENTATION.md)

## Tecnologias

| Tecnologia | Motivo da escolha |
|------------|-------------------|
| **NestJS** | Estrutura modular, injeção de dependência, validação e Swagger nativos |
| **TypeScript** | Tipagem estática e melhor manutenção |
| **TypeORM** | Migrations, entidades e QueryBuilder para o relatório |
| **MySQL** | Banco exigido pelo teste; seed e Docker já fornecidos |
| **class-validator** | Validação declarativa nos DTOs |
| **Jest + Supertest** | Testes unitários e e2e |
| **ESLint + Prettier** | Padronização de código |

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (recomendado)

## Instalação e execução

### Opção 1 — Docker Compose (recomendado)

```bash
cd namu-project
cp .env.example .env
docker compose up --build
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs
- MySQL: porta 3306

O MySQL sobe com o `seed.sql` (schema + dados iniciais). A API executa migrations na inicialização.

### Opção 2 — Desenvolvimento local

```bash
cd namu-project
cp .env.example .env
docker compose up -d mysql
npm install
npm run migration:run
mysql -h 127.0.0.1 -P 3306 -u root -proot namu_wellness < seed.sql
npm run start:dev
```

## Scripts úteis

| Script | Descrição |
|--------|-----------|
| `npm run start:dev` | API em modo watch |
| `npm run migration:run` | Aplica migrations |
| `npm test` | Testes unitários |
| `npm run test:e2e` | Testes de integração |
| `npm run lint` | ESLint |

## Documentação da API

- **Swagger UI:** http://localhost:3000/api/docs
- **Documentação técnica:** [`docs/DOCUMENTATION.md`](docs/DOCUMENTATION.md)
- **Enunciado do teste:** [`docs/TESTE-TECNICO.md`](docs/TESTE-TECNICO.md)

## Decisões técnicas

1. **Módulos por domínio** — `programs`, `activities`, `participations` e `health` isolados para facilitar testes e evolução.
2. **snake_case na API** — contrato alinhado ao enunciado e ao banco; mappers convertem entidades camelCase.
3. **QueryBuilder no summary** — query agregada com JOIN, GROUP BY e LIMIT para top 5 participantes.
4. **GlobalExceptionFilter** — respostas de erro padronizadas com `statusCode`, `message`, `path` e `timestamp`.
5. **synchronize: false** — schema controlado apenas por migrations.

## O que faria com mais tempo

- Autenticação e autorização (JWT)
- Filtros avançados (categoria, intervalo de datas)
- Rate limiting e cache
- Métricas com Prometheus
- Cobertura e2e mais ampla com factories de teste

## Estrutura do projeto

```
src/
├── activities/       # CRUD de atividades
├── programs/         # CRUD + summary
├── participations/   # Registro de participações
├── health/           # Health check
├── database/         # Entidades, migrations, TypeORM config
└── common/           # Paginação, filtros, utilitários
docs/
├── DOCUMENTATION.md  # Documentação técnica detalhada
└── TESTE-TECNICO.md  # Enunciado original
```

## Licença

Projeto desenvolvido para fins de avaliação técnica — Namu.
