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

1. **Configure o banco PostgreSQL:**
   - Crie um banco de dados PostgreSQL
   - Execute: `npx prisma migrate dev`
   - Execute: `npx prisma db push`

2. **Configure o banco de dados:**
   
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
   **INSERTS**
   INSERT INTO "Eletrodomestico" (id, "nomeEletro") VALUES 
   (1, 'Geladeira'),
   (2, 'Freezer'),
   (3, 'Micro-ondas'),
   (4, 'Forno Elétrico'),
   (5, 'Panela Elétrica'),
   (6, 'Airfryer'),
   (7, 'Liquidificador'),
   (8, 'Batedeira'),
   (9, 'Torradeira'),
   (10, 'Cafeteira'),
   (11, 'Exaustor'),
   (12, 'Lava Louças'),
   (13, 'Lava Roupas'),
   (14, 'Secadora de Roupas'),
   (15, 'Ferro de Passar'),
   (16, 'Aspirador de Pó'),
   (17, 'Robô Aspirador'),
   (18, 'Ventilador'),
   (19, 'Ar Condicionado'),
   (20, 'Aquecedor Elétrico'),
   (21, 'Televisão'),
   (22, 'Videogame'),
   (23, 'Computador'),
   (24, 'Notebook'),
   (25, 'Impressora'),
   (26, 'Modem / Roteador'),
   (27, 'Chuveiro Elétrico'),
   (28, 'Secador de Cabelo'),
   (29, 'Barbeador Elétrico'),
   (30, 'Escova Secadora'),
   (31, 'Aparelho de Som'),
   (32, 'Relógio Despertador'),
   (33, 'Lâmpada LED'),
   (34, 'Luminária Elétrica');


   INSERT INTO "Distribuidora" (id, nome, tarifa) VALUES
   (1, 'CELESC', 0.6933),
   (2, 'COELBA', 0.4841),
   (3, 'CEMIG', 0.6933),
   (4, 'CPFL', 0.7),
   (5, 'ENEL SP', 0.636),
   (6, 'ENEL RJ', 0.833),
   (7, 'ENEL CE', 0.72697),
   (8, 'EQUATORIAL MA', 0.58309),
   (9, 'EQUATORIAL AL', 0.58309),
   (10, 'EQUATORIAL PI', 0.58309),
   (11, 'EQUATORIAL PA', 0.58309),
   (12, 'COPEL', 0.63),
   (13, 'ELEKTRO', 0.71),
   (14, 'ENERGISA', 0.65),
   (15, 'LIGHT', 0.833),
   (16, 'RGE', 0.636),
   (17, 'AMAZONAS ENERGIA', 0.86),
   (18, 'ESCELSA', 0.65),
   (19, 'CHESP', 0.65),
   (20, 'BOA VISTA ENERGIA', 0.86),
   (21, 'EFLUL', 0.65),
   (22, 'DME Poços de Caldas', 0.636);

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

Obs: Se tiverem algum problema em rodar o projeto, por gentileza falar conosco.