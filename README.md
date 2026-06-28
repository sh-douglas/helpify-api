# Helpify API

API REST para um sistema de Help Desk, desenvolvida com Node.js, Express, MySQL, Sequelize, JWT e Zod.

O projeto tem como objetivo gerenciar chamados de suporte, usuários, categorias, comentários, histórico de status, dashboard administrativo e regras de acesso baseadas em perfil.

---

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- Sequelize CLI
- Zod
- JWT
- bcryptjs
- Docker / Docker Compose
- CORS
- Helmet
- dotenv

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

```txt
Controller → Service → Repository → Model
```

### Responsabilidades

```txt
Controller
→ recebe a requisição
→ chama o service
→ define status HTTP
→ retorna JSON

Service
→ aplica regras de negócio
→ valida dados com Zod
→ define formato das respostas
→ lança erros de domínio

Repository
→ acessa o banco de dados
→ executa queries com Sequelize

Model
→ representa as tabelas do banco
→ define campos e associações
```

---

## Funcionalidades implementadas

### Autenticação

- Cadastro de usuário
- Login
- Consulta do usuário autenticado
- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Middleware de autenticação

### Roles e permissões

Perfis disponíveis:

```txt
ADMIN
TECHNICIAN
USER
```

Regras gerais:

```txt
ADMIN
→ acesso administrativo completo

TECHNICIAN
→ acessa apenas tickets atribuídos a ele

USER
→ acessa apenas os próprios tickets
```

### Usuários

- Listar usuários
- Buscar usuário por ID
- Alterar role de um usuário
- Rotas protegidas para ADMIN
- Bloqueio para impedir que um admin altere a própria role

### Categorias

- Criar categoria
- Listar categorias
- Buscar categoria por ID
- Atualizar categoria
- Deletar categoria
- Validação contra categorias duplicadas

### Tickets

- Criar ticket
- Listar tickets conforme perfil do usuário
- Buscar ticket por ID
- Atualizar ticket
- Deletar ticket
- Autoatribuição para o técnico com menor número de tickets ativos
- Controle de acesso por perfil
- Registro automático de histórico quando o status muda
- Transaction no update de ticket + histórico de status

### Comentários

- Adicionar comentários em tickets
- Listar comentários de um ticket
- Controle de acesso baseado no ticket

### Histórico de status

- Registro automático de mudanças de status
- Consulta do histórico de status de um ticket
- Registro de:
  - ticket alterado
  - usuário que alterou
  - status anterior
  - novo status
  - data da alteração

### Dashboard

- Resumo de tickets
- Contagem total
- Contagem por status
- Contagem por prioridade
- Escopo baseado no perfil do usuário

---

## Regras de acesso

### Tickets

```txt
ADMIN
→ lista todos os tickets
→ visualiza qualquer ticket
→ atualiza qualquer ticket
→ deleta tickets

TECHNICIAN
→ lista apenas tickets atribuídos a ele
→ visualiza apenas tickets atribuídos a ele
→ atualiza apenas tickets atribuídos a ele
→ não deleta tickets

USER
→ lista apenas os próprios tickets
→ visualiza apenas os próprios tickets
→ não atualiza tickets
→ não deleta tickets
```

### Comentários

```txt
ADMIN
→ acessa comentários de qualquer ticket

TECHNICIAN
→ acessa comentários de tickets atribuídos a ele

USER
→ acessa comentários dos próprios tickets
```

### Histórico de status

```txt
ADMIN
→ acessa histórico de qualquer ticket

TECHNICIAN
→ acessa histórico de tickets atribuídos a ele

USER
→ acessa histórico dos próprios tickets
```

---

## Status de tickets

```txt
OPEN
IN_PROGRESS
WAITING_USER
RESOLVED
CLOSED
```

---

## Prioridades de tickets

```txt
LOW
MEDIUM
HIGH
CRITICAL
```

---

## Estrutura de pastas

```txt
src/
├── config/
│   └── database.js
├── controllers/
├── database/
│   ├── migrations/
│   └── seeders/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
└── app.js
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root
DB_NAME=helpify_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

---

## Rodando o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o banco com Docker

```bash
docker compose up -d
```

### 3. Rodar migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Rodar seeders

```bash
npx sequelize-cli db:seed:all
```

### 5. Iniciar a API

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

---

## Health check

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok",
  "message": "App is running"
}
```

---

## Rotas da API

### Auth

```http
POST /auth/signup
POST /auth/signin
GET /auth/me
```

### Users

Rotas protegidas para `ADMIN`.

```http
GET /users
GET /users/:id
PATCH /users/:id/role
```

Payload para alterar role:

```json
{
  "role": "TECHNICIAN"
}
```

Roles aceitas:

```txt
ADMIN
TECHNICIAN
USER
```

---

### Categories

```http
POST /categories
GET /categories
GET /categories/:id
PATCH /categories/:id
DELETE /categories/:id
```

Payload de criação:

```json
{
  "name": "Hardware"
}
```

---

### Tickets

```http
POST /tickets
GET /tickets
GET /tickets/:id
PATCH /tickets/:id
DELETE /tickets/:id
```

Payload de criação:

```json
{
  "title": "Computador travando",
  "description": "Computador está travando ao abrir o navegador.",
  "categoryId": 1,
  "priority": "HIGH"
}
```

Payload de atualização:

```json
{
  "status": "IN_PROGRESS",
  "priority": "CRITICAL",
  "categoryId": 2
}
```

---

### Comments

```http
POST /tickets/:ticketId/comments
GET /tickets/:ticketId/comments
```

Payload:

```json
{
  "content": "Chamado analisado. Será necessário verificar o hardware."
}
```

---

### Status History

```http
GET /tickets/:ticketId/status-histories
```

Exemplo de resposta:

```json
{
  "statusHistories": [
    {
      "id": 1,
      "ticketId": 8,
      "changedById": 1,
      "oldStatus": "OPEN",
      "newStatus": "IN_PROGRESS",
      "createdAt": "2026-06-27T18:30:00.000Z",
      "changedBy": {
        "id": 1,
        "name": "Admin Helpify",
        "email": "admin@helpify.com"
      }
    }
  ]
}
```

---

### Dashboard

```http
GET /dashboard/summary
```

Exemplo de resposta:

```json
{
  "totalTickets": 10,
  "ticketsByStatus": {
    "open": 2,
    "inProgress": 3,
    "waitingUser": 1,
    "resolved": 2,
    "closed": 2
  },
  "ticketsByPriority": {
    "low": 1,
    "medium": 4,
    "high": 3,
    "critical": 2
  }
}
```

---

## Formato padrão de respostas

### Resposta com usuário

```json
{
  "user": {}
}
```

### Resposta com usuários

```json
{
  "users": []
}
```

### Resposta com ticket

```json
{
  "ticket": {}
}
```

### Resposta com tickets

```json
{
  "tickets": []
}
```

### Resposta com categoria

```json
{
  "category": {}
}
```

### Resposta com categorias

```json
{
  "categories": []
}
```

### Resposta com comentários

```json
{
  "comments": []
}
```

### Resposta de exclusão

```json
{
  "message": "Ticket has been deleted."
}
```

---

## Tratamento de erros

A API utiliza um middleware global de erros.

Exemplos:

### Não autenticado

```json
{
  "error": "Unauthorized."
}
```

### Sem permissão

```json
{
  "error": "Forbidden."
}
```

### Recurso não encontrado

```json
{
  "error": "Ticket not found."
}
```

### Validação

```json
{
  "error": "Campos inválidos."
}
```

### Erro interno

```json
{
  "error": "An error occurred with your request. Please try again later."
}
```

---

## Banco de dados

Principais tabelas:

```txt
roles
users
categories
tickets
comments
ticket_status_histories
```

### Relacionamentos principais

```txt
Role 1:N User

User 1:N Ticket
Category 1:N Ticket

User 1:N assignedTickets
Ticket N:1 assignedTechnician

Ticket 1:N Comment
User 1:N Comment

Ticket 1:N TicketStatusHistory
User 1:N TicketStatusHistory
```

---

## Regras importantes de negócio

### Autoatribuição de tickets

Ao criar um ticket, a API busca todos os técnicos disponíveis e atribui o chamado ao técnico com menos tickets ativos.

Tickets ativos:

```txt
OPEN
IN_PROGRESS
WAITING_USER
```

Se não houver técnicos cadastrados, o ticket é criado com:

```txt
assignedToId = null
```

---

### Histórico de status

O histórico só é criado quando o status realmente muda.

Exemplo:

```txt
OPEN → IN_PROGRESS
```

Cria histórico.

```txt
IN_PROGRESS → IN_PROGRESS
```

Não cria histórico duplicado.

---

### Transaction no update de ticket

A atualização do ticket e a criação do histórico de status ocorrem dentro de uma transaction.

Se a criação do histórico falhar, a atualização do ticket é revertida.

---

## Scripts úteis

Rodar migrations:

```bash
npx sequelize-cli db:migrate
```

Desfazer última migration:

```bash
npx sequelize-cli db:migrate:undo
```

Rodar seeders:

```bash
npx sequelize-cli db:seed:all
```

Desfazer seeders:

```bash
npx sequelize-cli db:seed:undo:all
```

Ver status das migrations:

```bash
npx sequelize-cli db:migrate:status
```

Subir banco:

```bash
docker compose up -d
```

Parar banco:

```bash
docker compose down
```

---

## Status do projeto

API finalizada como MVP.

Funcionalidades principais concluídas:

```txt
✅ autenticação
✅ autorização por role
✅ gerenciamento de usuários
✅ categorias
✅ tickets
✅ autoatribuição
✅ comentários
✅ histórico de status
✅ dashboard summary
✅ controle de acesso por perfil
✅ transaction no update de ticket
```

---

## Melhorias futuras

Possíveis evoluções:

```txt
- paginação
- filtros avançados de tickets
- Swagger/OpenAPI
- testes automatizados
- upload de anexos
- refresh token
- recuperação de senha
- notificações
- otimização do dashboard com GROUP BY
- front-end completo
```
