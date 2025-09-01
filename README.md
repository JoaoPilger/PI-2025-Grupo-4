# PI-2025-Grupo-4

## Descrição do Projeto

Sistema de simulação de consumo energético desenvolvido pelo Grupo 4 do PI 2025. Permite cadastrar cômodos, adicionar eletrodomésticos e simular o consumo de energia elétrica.

## Arquitetura

- **Backend**: API REST em Node.js com Express e Prisma
- **Frontend**: Interface web em React com Vite

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL instalado e rodando
- Git

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/JoaoPilger/PI-2025-Grupo-4.git
cd PI-2025-Grupo-4/PI-2025
```

### Passo 2: Instalação das Dependências

**Backend:**
```bash
cd backend
npm install
npm install @prisma/client@^6.15.0 axios@^1.11.0 bcrypt@^6.0.0 connect-pg-simple@^10.0.0 cors@^2.8.5 express@^5.1.0 express-session@^1.18.2 pg@^8.16.3
```

**Frontend:**
```bash
cd frontend
npm install
```

### Passo 3: Configuração do Backend

1. **Configure o banco de dados:**
   
   Crie um arquivo `.env` na pasta `backend`:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   DATABASE_USER=usuario
   DATABASE_HOST=localhost
   DATABASE_NAME=nome_do_banco
   DATABASE_PASSWORD=senha
   DATABASE_PORT=5432
   SESSION_SECRET=sua_chave_secreta_aqui
   PORT=3000
   ```

2. **Configure o banco PostgreSQL:**
   - Crie um banco de dados PostgreSQL
   - Execute: `npx prisma migrate dev`

3. **Inicie o servidor:**
   ```bash
   npm start
   ```

### Passo 4: Configuração do Frontend

1. **Em um novo terminal, navegue para o frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Acessando o Projeto

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Desenvolvedores

Grupo 4 - PI 2025

Bianca Gabriela Golfe
Cézar Augusto Klein Bovi
Davi Ulisses Moretto Gusso
João Victor Pilger
Victor Andrin Bonissoni
Yuri Tedesco Germano