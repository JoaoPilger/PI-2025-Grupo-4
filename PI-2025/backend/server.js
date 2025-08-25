import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.routes.js';
import distribuidoraRoutes from './src/routes/distribuidora.routes.js';
import eletroRoutes from './src/routes/eletro.routes.js';
import simulacaoRoutes from './src/routes/simulacao.routes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

const PORT = 4000;

// Pool de conexão com o DB
const pgPool = new pg.Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT
});

// teste de funcionamento do servidor
pgPool.connect()
    .then(client =>{
        console.log('Conectado ao PostgreSQL via pg.Pool para sessões!');
        client.release()
    })
    .catch(err =>{
        console.log("Erro ao conectar ao PostgreSQL via pg.Pool:", err.stack);   
    })

const PgSessionStore = connectPgSimple(session);

// Configuração do middleware de sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PgSessionStore({
        pool: pgPool,
        tableName: "session"
    }),
    cookie: {
        maxAge: 1000*60*60, // 1 hora
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/distribuidoras', distribuidoraRoutes);
app.use('/api/eletros', eletroRoutes);
app.use('/api/simulacoes', simulacaoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});