import { prisma } from "../prisma/client.js";

export const getAllSimulacoes = async (req, res) => {
  try {
    const sims = await prisma.simulacao.findMany({
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });
    res.json(sims);
  } catch (error) {
    console.error('Erro ao buscar simulações:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getSimulacaoById = async (req, res) => {
  try {
    const sim = await prisma.simulacao.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });
    if (!sim) return res.status(404).json({ message: "Simulação não encontrada" });
    res.json(sim);
  } catch (error) {
    console.error('Erro ao buscar simulação:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createSimulacao = async (req, res) => {
  try {
    const { nomeSimulacao, data, consumo, tarifa, custo, clienteId } = req.body;
    
    if (!nomeSimulacao || !data || !consumo || !tarifa || !custo || !clienteId) {
      return res.status(400).json({ 
        message: "Todos os campos são obrigatórios: nomeSimulacao, data, consumo, tarifa, custo, clienteId" 
      });
    }

    // Verificar se o cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) }
    });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const nova = await prisma.simulacao.create({
      data: { 
        nomeSimulacao, 
        data: new Date(data), 
        consumo: Number(consumo), 
        tarifa: Number(tarifa), 
        custo: Number(custo),
        clienteId: Number(clienteId)
      }
    });
    res.status(201).json(nova);
  } catch (error) {
    console.error('Erro ao criar simulação:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateSimulacao = async (req, res) => {
  try {
    const { nomeSimulacao, data, consumo, tarifa, custo, clienteId } = req.body;
    const id = Number(req.params.id);

    // Verificar se a simulação existe
    const simExistente = await prisma.simulacao.findUnique({
      where: { id }
    });
    if (!simExistente) {
      return res.status(404).json({ message: "Simulação não encontrada" });
    }

    // Se clienteId for fornecido, verificar se existe
    if (clienteId) {
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(clienteId) }
      });
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
    }

    const atualizada = await prisma.simulacao.update({
      where: { id },
      data: { 
        nomeSimulacao: nomeSimulacao || simExistente.nomeSimulacao,
        data: data ? new Date(data) : simExistente.data,
        consumo: consumo ? Number(consumo) : simExistente.consumo,
        tarifa: tarifa ? Number(tarifa) : simExistente.tarifa,
        custo: custo ? Number(custo) : simExistente.custo,
        clienteId: clienteId ? Number(clienteId) : simExistente.clienteId
      }
    });
    res.json(atualizada);
  } catch (error) {
    console.error('Erro ao atualizar simulação:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteSimulacao = async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    // Verificar se existe
    const simExistente = await prisma.simulacao.findUnique({
      where: { id }
    });
    if (!simExistente) {
      return res.status(404).json({ message: "Simulação não encontrada" });
    }

    await prisma.simulacao.delete({ where: { id } });
    res.json({ message: "Simulação removida com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar simulação:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
