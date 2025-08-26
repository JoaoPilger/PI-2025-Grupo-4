import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Função auxiliar para criar sessão (igual do auth.controller.js)
function createSession(req, res, user) {
  req.session.user = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    distribuidoraId: user.distribuidoraId
  };
  req.session.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar sessão' });
    }
    res.status(201).json({
      message: 'Cadastro realizado com sucesso!',
      user: req.session.user
    });
  });
}

// GET all clientes
export const getAllClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { comodos: true, simulacoes: true, distribuidora: true }
    });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// GET cliente by ID
export const getClienteById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: { comodos: true, simulacoes: true, distribuidora: true }
    });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

// POST create cliente
export const createCliente = async (req, res) => {
  const { nome, email, senha, distribuidoraId } = req.body;
  try {
    if (!nome || !email || !senha || !distribuidoraId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    const existente = await prisma.cliente.findUnique({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }
    const hash = await bcrypt.hash(senha, 10);
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, senha: hash, distribuidoraId: Number(distribuidoraId) }
    });
    // Cria a sessão automaticamente após cadastro
    createSession(req, res, novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar cliente." });
  }
};

// PUT update cliente
export const updateCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, senha, distribuidoraId } = req.body;
  try {
    const data = { nome, email, distribuidoraId: Number(distribuidoraId) };
    if (senha) data.senha = await bcrypt.hash(senha, 10);

    const cliente = await prisma.cliente.update({ where: { id }, data });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};

// DELETE cliente
export const deleteCliente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.cliente.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};
