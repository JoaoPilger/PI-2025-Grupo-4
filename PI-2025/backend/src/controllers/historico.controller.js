import { prisma } from "../prisma/client.js";

// GET todas as simulações
export const getSimulacoes = async (req, res) => {
  try {
    const historicos = await prisma.simulacao.findMany({
      include: {
        cliente: {
          include: {
            distribuidora: true
          }
        },
        simulacoesComodos: {
          include: {
            comodo: true
          }
        }
      },
      orderBy: {
        data: "desc"
      }
    });

    // Formata os dados para enviar pro frontend
    const historicosFormatados = historicos.map(h => {
      const tarifa = h.cliente.distribuidora?.tarifa?.toNumber?.() ?? 0;
      const consumoTotal = h.consumo?.toNumber?.() ?? 0;
      return {
        id: h.id,
        nomeSimulacao: h.nomeSimulacao,
        data: h.data,
        consumo: consumoTotal,
        custo: consumoTotal * tarifa,
        tarifa,
        simulacoesComodos: h.simulacoesComodos.map(sc => ({
          id: sc.id,
          comodo: {
            id: sc.comodo.id,
            nome: sc.comodo.nomeComodo
          }
        }))
      };
    });

    res.json(historicosFormatados);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
