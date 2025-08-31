import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarSimulacao = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { nomeSimulacao, tarifa } = req.body;

    // Buscar cômodos do usuário com eletros
    const comodos = await prisma.comodo.findMany({
      where: { clienteId: userId },
      include: {
        eletros: {
          include: { eletrodomestico: true }
        }
      }
    });

    if (comodos.length === 0) {
      return res.status(400).json({ error: "Nenhum cômodo encontrado para o usuário." });
    }

    let totalConsumo = 0;
    let totalCusto = 0;

    // Criar simulação inicial com 0
    const simulacao = await prisma.simulacao.create({
      data: {
        nomeSimulacao,
        data: new Date(),
        consumo: 0,
        custo: 0,
        clienteId: userId
      }
    });

    // Criar registros SimulacaoComodo e calcular totais em paralelo
    await Promise.all(
      comodos.map(async (comodo) => {
        let consumoComodo = 0;

        for (const ec of comodo.eletros) {
          const potencia = Number(ec.potencia || 0);
          const horasUsoDia = Number(ec.horasUsoDia || 0);
          const diasMes = 30;
          const quantidade = ec.quantidade || 1;

          consumoComodo += (potencia / 1000) * horasUsoDia * diasMes * quantidade;
        }

        const custoComodo = consumoComodo * Number(tarifa);
        totalConsumo += consumoComodo;
        totalCusto += custoComodo;

        return prisma.simulacaoComodo.create({
          data: {
            simulacaoId: simulacao.id,
            comodoId: comodo.id
          }
        });
      })
    );

    // Atualizar simulação com consumo e custo total
    const simulacaoFinal = await prisma.simulacao.update({
      where: { id: simulacao.id },
      data: { consumo: totalConsumo, custo: totalCusto },
      include: {
        cliente: true,
        simulacoesComodos: { include: { comodo: true } }
      }
    });

    res.json(simulacaoFinal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar simulação" });
  }
};