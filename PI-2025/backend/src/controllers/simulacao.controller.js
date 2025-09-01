import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarSimulacao = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { nomeSimulacao, comodosSelecionados } = req.body;

    if (!comodosSelecionados || comodosSelecionados.length === 0) {
      console.log('ERRO: Nenhum cômodo selecionado');
      return res.status(400).json({ error: "Nenhum cômodo selecionado para a simulação." });
    }

    // Converter IDs para números
    const idsSelecionados = comodosSelecionados.map(id => Number(id));

    // Primeiro, vamos verificar todos os cômodos do usuário
    const todosComodos = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true
      },
      include: { eletros: true }
    });
    
    const comodos = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true,
        id: { in: idsSelecionados }
      },
      include: { eletros: true }
    });

    if (comodos.length === 0) {
      console.log('ERRO: Nenhum cômodo encontrado na query');
      return res.status(400).json({ error: "Nenhum cômodo ativo encontrado entre os selecionados." });
    }

    // Buscar tarifa do cliente
    const cliente = await prisma.cliente.findUnique({
      where: { id: userId },
      include: { distribuidora: true }
    });

    const tarifa = Number(cliente?.distribuidora?.tarifa ?? 0);

    // Calcular consumo total apenas dos cômodos selecionados
    let totalConsumo = 0;
    comodos.forEach(comodo => {
      let consumoComodo = 0;
      
      comodo.eletros.forEach(ec => {
        const potencia = Number(ec.potencia || 0);
        const horasUsoDia = Number(ec.horasUsoDia || 0);
        const diasMes = 30;
        const quantidade = ec.quantidade || 1;
        const consumoEletro = (potencia / 1000) * horasUsoDia * diasMes * quantidade;
        consumoComodo += consumoEletro;
        totalConsumo += consumoEletro;
        console.log(`  - ${ec.eletrodomestico?.nomeEletro || 'Nome não disponível'}: ${consumoEletro.toFixed(2)} kWh/mês`);
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
      include: { cliente: true }
    });

    res.json(simulacao);

  } catch (err) {
    console.error('ERRO NA SIMULAÇÃO:', err);
    res.status(500).json({ error: "Erro ao gerar simulação" });
  }
};
