import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarSimulacao = async (req, res) => {
  try {
    // Pega o id do usuário logado da sessão
    const userId = req.session.user.id;

    const { nomeSimulacao, tarifa } = req.body;

    // Buscar cômodos do usuário
    const comodos = await prisma.comodo.findMany({
      where: { clienteId: userId },
      include: {
        eletros: { include: { eletro: true } }
      }
    });

    let totalConsumo = 0;
    let totalCusto = 0;

    // Criar simulação inicial
    const simulacao = await prisma.simulacao.create({
      data: {
        nomeSimulacao,
        data: new Date(),
        consumo: 0,
        custo: 0,
        clienteId: userId
      }
    });

    // Calcular consumo/custo por cômodo
    for (const comodo of comodos) {
      let consumoComodo = 0;

      for (const ec of comodo.eletros) {
        const { potencia, horasDia, diasMes } = ec.eletro;
        consumoComodo += (potencia / 1000) * horasDia * diasMes;
      }

      const custoComodo = consumoComodo * tarifa;
      totalConsumo += consumoComodo;
      totalCusto += custoComodo;

      await prisma.simulacaoComodo.create({
        data: {
          simulacaoId: simulacao.id,
          comodoId: comodo.id,
          consumo: consumoComodo,
          custo: custoComodo
        }
      });
    }

    const simulacaoFinal = await prisma.simulacao.update({
      where: { id: simulacao.id },
      data: { consumo: totalConsumo, custo: totalCusto },
      include: { comodos: true }
    });

    res.json(simulacaoFinal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar simulação" });
  }
};
