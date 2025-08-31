import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

import clienteRoutes from './src/routes/cliente.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import distribuidoraRoutes from './src/routes/distribuidora.routes.js';
import comodoRoutes from './src/routes/comodo.routes.js';
import eletroRoutes from './src/routes/eletro.routes.js';
import simuladorRoutes from './src/routes/simulacao.routes.js';
import eletroComodoRoutes from './src/routes/eletroComodo.routes.js';

dotenv.config();

const app = express();

// --- CORS ---
app.use(cors({
  origin: 'http://localhost:5173',  // front-end
  credentials: true
}));

// --- Parse JSON ---
app.use(express.json());

// --- Configuração PostgreSQL para sessões ---
const pgPool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});

// Teste de conexão
pgPool.connect()
  .then(client => {
    console.log('Conectado ao PostgreSQL via pg.Pool para sessões!');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao PostgreSQL via pg.Pool:', err.stack);
  });

// --- Configuração do connect-pg-simple ---
const PgSessionStore = connectPgSimple(session);

app.use(session({
  secret: process.env.SESSION_SECRET || 'chave_secreta',
  resave: false,
  saveUninitialized: false,
  store: new PgSessionStore({
    pool: pgPool,
    tableName: 'session'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hora
    httpOnly: true,
    secure: false,           // true se for HTTPS
    sameSite: 'lax'
  }
}));

// --- Rotas ---
app.use('/clientes', clienteRoutes);
app.use('/auth', authRoutes);
app.use('/distribuidora', distribuidoraRoutes);
app.use('/comodos', comodoRoutes);
app.use('/eletros', eletroRoutes);
app.use('/simulacao', simuladorRoutes);
app.use('/eletroComodo', eletroComodoRoutes);

// --- Rota teste ---
app.get('/', (req, res) => res.send('API funcionando!'));

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
