import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllDistribuidoras(req, res) {
  try {
    const distribuidoras = await prisma.distribuidora.findMany();
    res.json(distribuidoras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar distribuidoras' });
  }
}

export async function getDistribuidoraById(req, res) {
  try {
    const distribuidora = await prisma.distribuidora.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!distribuidora) return res.status(404).json({ error: 'Não encontrada' });
    res.json(distribuidora);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar distribuidora' });
  }
}

export async function createDistribuidora(req, res) {
  try {
    const { nome, tarifa } = req.body;
    const nova = await prisma.distribuidora.create({
      data: { nome, tarifa: Number(tarifa) }
    });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar distribuidora' });
  }
}

export async function updateDistribuidora(req, res) {
  try {
    const { nome, tarifa } = req.body;
    const atualizada = await prisma.distribuidora.update({
      where: { id: Number(req.params.id) },
      data: { nome, tarifa: Number(tarifa) }
    });
    res.json(atualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar distribuidora' });
  }
}

export async function deleteDistribuidora(req, res) {
  try {
    await prisma.distribuidora.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Distribuidora deletada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar distribuidora' });
  }
}