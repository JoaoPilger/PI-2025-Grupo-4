import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarSimulacao = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { nomeSimulacao } = req.body;

    // Buscar cômodos do usuário com eletros
    const comodos = await prisma.comodo.findMany({
      where: { clienteId: userId },
      include: { eletros: true }
    });

    if (comodos.length === 0) {
      return res.status(400).json({ error: "Nenhum cômodo encontrado para o usuário." });
    }

    // Buscar tarifa do cliente
    const cliente = await prisma.cliente.findUnique({
      where: { id: userId },
      include: { distribuidora: true }
    });

    const tarifa = Number(cliente?.distribuidora?.tarifa ?? 0);

    // Calcular consumo total
    let totalConsumo = 0;
    comodos.forEach(comodo => {
      comodo.eletros.forEach(ec => {
        const potencia = Number(ec.potencia || 0);
        const horasUsoDia = Number(ec.horasUsoDia || 0);
        const diasMes = 30;
        const quantidade = ec.quantidade || 1;
        totalConsumo += (potencia / 1000) * horasUsoDia * diasMes * quantidade;
      });
    });

    const totalCusto = totalConsumo * tarifa;

    // Criar simulação com consumo e custo total
    const simulacao = await prisma.simulacao.create({
      data: {
        nomeSimulacao,
        data: new Date(),
        consumo: totalConsumo,
        custo: totalCusto,
        clienteId: userId
      },
      include: { cliente: true } // opcional
    });

    res.json(simulacao);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar simulação" });
  }
};
