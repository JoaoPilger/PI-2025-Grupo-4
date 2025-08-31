import { prisma } from "../prisma/client.js";

// GET todos
export const getAllEletros = async (req, res) => {
  try {
    const eletros = await prisma.eletroComodo.findMany();
    res.json(eletros);
  } catch (error) {
    console.error('Erro ao buscar eletrodomésticos:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET por ID
export const getEletroById = async (req, res) => {
  try {
    const eletro = await prisma.eletroComodo.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!eletro) return res.status(404).json({ message: "Eletrodoméstico não encontrado" });
    res.json(eletro);
  } catch (error) {
    console.error('Erro ao buscar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// delete EletroComodo
export const deleteEletroComodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.eletroComodo.delete({
      where: { id: Number(id) }
    });
    res.json(deleted);
  } catch (error) {
    console.error('Erro ao deletar eletrodoméstico do cômodo:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};