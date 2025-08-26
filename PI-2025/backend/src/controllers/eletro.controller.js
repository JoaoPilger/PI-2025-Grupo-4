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
    const { nomeEletro } = req.body;
    if (!nomeEletro) {
      return res.status(400).json({ message: "Nome é obrigatório" });
    }

    const novo = await prisma.eletrodomestico.create({
      data: { nomeEletro }
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error('Erro ao criar eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// POST salvar detalhes do eletrodoméstico
export const saveEletroDetails = async (req, res) => {
  try {
    const { nomeEletro, quantidade, horasUso, horasUsoDia, potencia, comodoId } = req.body;

    if (!nomeEletro || !quantidade || (!horasUso && !horasUsoDia) || !potencia) {
      return res.status(400).json({ 
        message: "Nome, quantidade, horas de uso e potência são obrigatórios" 
      });
    }

    // Criar ou buscar o eletrodoméstico por nome
    let eletro = await prisma.eletrodomestico.findFirst({ where: { nomeEletro } });
    if (!eletro) {
      eletro = await prisma.eletrodomestico.create({ data: { nomeEletro } });
    }

    // Converter horasUso (mês) para horasUsoDia se necessário
    const horasDia = horasUsoDia != null ? Number(horasUsoDia) : Number(horasUso) / 30;

    if (comodoId) {
      await prisma.eletroComodo.create({
        data: {
          comodoId: Number(comodoId),
          eletroId: eletro.id,
          quantidade: Number(quantidade),
          horasUsoDia: horasDia,
          potencia: Number(potencia)
        }
      });
    }

    res.status(201).json({
      eletrodomestico: eletro,
      quantidade: Number(quantidade),
      horasUsoDia: horasDia,
      potencia: Number(potencia),
      comodoId: comodoId ? Number(comodoId) : null
    });
  } catch (error) {
    console.error('Erro ao salvar detalhes do eletrodoméstico:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// PUT atualizar
export const updateEletro = async (req, res) => {
  try {
    const { nomeEletro } = req.body;
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
      data: { nomeEletro: nomeEletro || eletroExistente.nomeEletro }
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
