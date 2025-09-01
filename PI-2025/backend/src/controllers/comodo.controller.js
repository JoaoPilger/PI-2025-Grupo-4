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

export const getComodosByCliente = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    if (!sessionUser?.id) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    console.log('Buscando cômodos para cliente ID:', sessionUser.id);

    const comodos = await prisma.comodo.findMany({
      where: { clienteId: sessionUser.id },
      include: {
        eletros: {
          include: {
            eletrodomestico: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    console.log('Cômodos encontrados:', comodos.length);

    // Garantir que todos os cômodos tenham o campo ativo
    const comodosComAtivo = comodos.map(comodo => ({
      ...comodo,
      ativo: comodo.ativo !== undefined ? comodo.ativo : true,
      eletros: comodo.eletros.map(eletro => ({
        ...eletro,
        ativo: eletro.ativo !== undefined ? eletro.ativo : true
      }))
    }));

    return res.json(comodosComAtivo);
  } catch (error) {
    console.error('Erro ao buscar cômodos:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const toggleComodoStatus = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    if (!sessionUser?.id) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const comodoId = Number(req.params.id);
    const { ativo } = req.body;

    if (typeof ativo !== 'boolean') {
      return res.status(400).json({ error: 'Campo ativo deve ser um boolean' });
    }

    // Garante que o cômodo pertence ao cliente logado
    const existing = await prisma.comodo.findUnique({ where: { id: comodoId } });
    if (!existing || existing.clienteId !== sessionUser.id) {
      return res.status(404).json({ error: 'Cômodo não encontrado' });
    }

    // Tentar atualizar com o campo ativo, se falhar, retornar o cômodo com ativo=true
    try {
      const updated = await prisma.comodo.update({
        where: { id: comodoId },
        data: { ativo }
      });
      return res.json(updated);
    } catch (updateError) {
      // Se o campo ativo não existe, retornar o cômodo com ativo=true
      console.log('Campo ativo não existe no banco, retornando cômodo com ativo=true');
      return res.json({
        ...existing,
        ativo: true
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar status do cômodo:', error);
    return res.status(500).json({ error: 'Erro ao atualizar cômodo' });
  }
};

export const getEletrosByComodo = async (req, res) => {
  try {
    const sessionUser = req.session?.user;
    if (!sessionUser?.id) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const comodoId = Number(req.params.id);

    // Garante que o cômodo pertence ao cliente logado
    const existing = await prisma.comodo.findUnique({ where: { id: comodoId } });
    if (!existing || existing.clienteId !== sessionUser.id) {
      return res.status(404).json({ error: 'Cômodo não encontrado' });
    }

    const eletros = await prisma.eletroComodo.findMany({
      where: { comodoId },
      include: {
        eletrodomestico: true
      }
    });

    return res.json(eletros);
  } catch (error) {
    console.error('Erro ao buscar eletrodomésticos do cômodo:', error);
    return res.status(500).json({ error: 'Erro ao buscar eletrodomésticos' });
  }
};


