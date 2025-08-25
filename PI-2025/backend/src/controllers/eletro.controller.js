import { prisma } from "../prisma/client.js";

// GET todos
export const getAllEletros = async (req, res) => {
  try {
    const eletros = await prisma.eletrodomestico.findMany();
    res.json(eletros);
  } catch (error) {
    console.error('Erro ao buscar eletrodomésticos:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET por ID
export const getEletroById = async (req, res) => {
  try {
    const eletro = await prisma.eletrodomestico.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!eletro) return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    res.json(eletro);
  } catch (error) {
    console.error('Erro ao buscar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// POST criar
export const createEletro = async (req, res) => {
  try {
    const { nomeEletro, consumoHora } = req.body;
    
    if (!nomeEletro || !consumoHora) {
      return res.status(400).json({ message: "Nome e consumo são obrigatórios" });
    }

    const novo = await prisma.eletrodomestico.create({
      data: { nomeEletro, consumoHora: Number(consumoHora) }
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error('Erro ao criar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// PUT atualizar
export const updateEletro = async (req, res) => {
  try {
    const { nomeEletro, consumoHora } = req.body;
    const id = Number(req.params.id);

    // Verificar se existe
    const eletroExistente = await prisma.eletrodomestico.findUnique({
      where: { id }
    });
    if (!eletroExistente) {
      return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    }

    const atualizado = await prisma.eletrodomestico.update({
      where: { id },
      data: { 
        nomeEletro: nomeEletro || eletroExistente.nomeEletro, 
        consumoHora: consumoHora ? Number(consumoHora) : eletroExistente.consumoHora 
      }
    });
    res.json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// DELETE apagar
export const deleteEletro = async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    // Verificar se existe
    const eletroExistente = await prisma.eletrodomestico.findUnique({
      where: { id }
    });
    if (!eletroExistente) {
      return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    }

    await prisma.eletrodomestico.delete({ where: { id } });
    res.json({ message: "Eletrodoméstico removido com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
