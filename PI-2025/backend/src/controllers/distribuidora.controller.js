import { prisma } from "../prisma/client.js";

export const getAllDistribuidoras = async (req, res) => {
  try {
    const dist = await prisma.distribuidora.findMany();
    res.json(dist);
  } catch (error) {
    console.error('Erro ao buscar distribuidoras:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getDistribuidoraById = async (req, res) => {
  try {
    const dist = await prisma.distribuidora.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!dist) return res.status(404).json({ message: "Distribuidora não encontrada" });
    res.json(dist);
  } catch (error) {
    console.error('Erro ao buscar distribuidora:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createDistribuidora = async (req, res) => {
  try {
    const { nome, tarifa } = req.body;
    
    if (!nome || tarifa === undefined) {
      return res.status(400).json({ message: "Nome e tarifa são obrigatórios" });
    }

    if (Number(tarifa) <= 0) {
      return res.status(400).json({ message: "Tarifa deve ser maior que zero" });
    }

    const nova = await prisma.distribuidora.create({
      data: { nome, tarifa: Number(tarifa) }
    });
    res.status(201).json(nova);
  } catch (error) {
    console.error('Erro ao criar distribuidora:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateDistribuidora = async (req, res) => {
  try {
    const { nome, tarifa } = req.body;
    const id = Number(req.params.id);

    // Verificar se existe
    const distExistente = await prisma.distribuidora.findUnique({
      where: { id }
    });
    if (!distExistente) {
      return res.status(404).json({ message: "Distribuidora não encontrada" });
    }

    // Validar tarifa se fornecida
    if (tarifa !== undefined && Number(tarifa) <= 0) {
      return res.status(400).json({ message: "Tarifa deve ser maior que zero" });
    }

    const atualizada = await prisma.distribuidora.update({
      where: { id },
      data: { 
        nome: nome || distExistente.nome, 
        tarifa: tarifa !== undefined ? Number(tarifa) : distExistente.tarifa 
      }
    });
    res.json(atualizada);
  } catch (error) {
    console.error('Erro ao atualizar distribuidora:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteDistribuidora = async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    // Verificar se existe
    const distExistente = await prisma.distribuidora.findUnique({
      where: { id }
    });
    if (!distExistente) {
      return res.status(404).json({ message: "Distribuidora não encontrada" });
    }

    // Verificar se há clientes associados
    const clientesAssociados = await prisma.cliente.findMany({
      where: { distribuidoraId: id }
    });
    if (clientesAssociados.length > 0) {
      return res.status(400).json({ 
        message: "Não é possível deletar distribuidora com clientes associados" 
      });
    }

    await prisma.distribuidora.delete({ where: { id } });
    res.json({ message: "Distribuidora removida com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar distribuidora:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
