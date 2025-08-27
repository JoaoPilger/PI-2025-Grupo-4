import { prisma } from '../prisma/client.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) =>{
    const {email, senha} = req.body;

    try {
        const user = await prisma.cliente.findUnique({
            where: {email},
        })
        
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha)

        if (!user || !senhaValida) {
            return res.status(401).json({ error: 'Senha ou usuário não correspondem' });
        }

        createSession(req, res, user)
        
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
}


// VERIFICACAO DE SESSION
export const sessionVer = async (req, res) => {
  if (req.session.user) {
    // Usuário está autenticado, responde com dados da sessão
    console.log("Sessão válida");
    return res.json({ loggedIn: true, user: req.session.user });
    
  } else {
    // Sessão não existe
    console.log("Não autenticado");
    return res.status(401).json({ loggedIn: false, message: 'Não autenticado' });
  }
};

// LOGOUT
export const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao encerrar sessão' });
    }
    res.clearCookie('connect.sid', { path: '/' }); // Nome do cookie padrão do express-session
    res.json({ message: 'Logout realizado com sucesso' });
  });
};

export const loginVerify = async (req, res) => {
  if (req.session.user) { 
    return res.json({ loggedIn: true, user: req.session.user });
  }
  return res.json({ loggedIn: false });
};

function createSession(req, res, user) {
  // Criar a sessão do usuário
  req.session.user = {
      id: user.id,
      nome: user.nome,
      email: user.email
  };

  // Salvar a sessão
  req.session.save((err) => {
      if (err) {
          console.error('Erro ao salvar sessão:', err);
          return res.status(500).json({ error: 'Erro ao criar sessão' });
      }
      res.json({ 
          message: 'Login realizado com sucesso',
          user: {
              id: user.id,
              nome: user.nome,
              email: user.email
          }
      });
  });
}