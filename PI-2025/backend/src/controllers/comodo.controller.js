import { prisma } from '../prisma/client.js';

export const createComodo = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    const { nomeComodo, clienteId: bodyClienteId } = req.body || {};
    const effectiveClienteId = Number(bodyClienteId || sessionUser?.id);
    if (!effectiveClienteId) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const created = await prisma.comodo.create({
      data: {
        nomeComodo: nomeComodo || 'Novo Cômodo',
        clienteId: effectiveClienteId
      }
    });

    return res.status(201).json(created);
  } catch (error) {
    console.error('Erro ao criar cômodo:', error);
    return res.status(500).json({ error: 'Erro ao criar cômodo' });
  }
};

export const getComodosByCliente = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    if (!sessionUser?.id) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const comodos = await prisma.comodo.findMany({
      where: {
        clienteId: sessionUser.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return res.json(comodos);
  } catch (error) {
    console.error('Erro ao buscar cômodos:', error);
    return res.status(500).json({ error: 'Erro ao buscar cômodos' });
  }
};

export const updateComodoNome = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    if (!sessionUser?.id) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const comodoId = Number(req.params.id);
    const { nomeComodo } = req.body || {};

    if (!comodoId || !nomeComodo || String(nomeComodo).trim() === '') {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    // Garante que o cômodo pertence ao cliente logado
    const existing = await prisma.comodo.findUnique({ where: { id: comodoId } });
    if (!existing || existing.clienteId !== sessionUser.id) {
      return res.status(404).json({ error: 'Cômodo não encontrado' });
    }

    const updated = await prisma.comodo.update({
      where: { id: comodoId },
      data: { nomeComodo }
    });

    return res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar nome do cômodo:', error);
    return res.status(500).json({ error: 'Erro ao atualizar cômodo' });
  }
};


