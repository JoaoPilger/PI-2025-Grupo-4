import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarSimulacao = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { nomeSimulacao, comodosSelecionados } = req.body;

    console.log('\n=== DEBUG SIMULAÇÃO DETALHADO ===');
    console.log('userId:', userId);
    console.log('nomeSimulacao:', nomeSimulacao);
    console.log('comodosSelecionados (original):', comodosSelecionados);
    console.log('Tipo dos IDs selecionados:', comodosSelecionados?.map(id => typeof id));

    if (!comodosSelecionados || comodosSelecionados.length === 0) {
      console.log('ERRO: Nenhum cômodo selecionado');
      return res.status(400).json({ error: "Nenhum cômodo selecionado para a simulação." });
    }

    // Converter IDs para números
    const idsSelecionados = comodosSelecionados.map(id => Number(id));
    console.log('IDs selecionados convertidos para números:', idsSelecionados);

    // Primeiro, vamos verificar todos os cômodos do usuário
    const todosComodos = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true
      },
      include: { eletros: true }
    });

    console.log('\n--- TODOS OS CÔMODOS ATIVOS ---');
    console.log('Total de cômodos ativos:', todosComodos.length);
    todosComodos.forEach(comodo => {
      console.log(`ID: ${comodo.id}, Nome: ${comodo.nomeComodo}, Eletros: ${comodo.eletros.length}`);
    });

    // Agora buscar apenas os selecionados
    console.log('\n--- BUSCANDO APENAS OS SELECIONADOS ---');
    console.log('Query com IDs:', idsSelecionados);
    
    const comodos = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true,
        id: { in: idsSelecionados }
      },
      include: { eletros: true }
    });

    console.log('\n--- CÔMODOS ENCONTRADOS NA QUERY ---');
    console.log('Cômodos encontrados no banco:', comodos.length);
    comodos.forEach(comodo => {
      console.log(`ID: ${comodo.id}, Nome: ${comodo.nomeComodo}, Eletros: ${comodo.eletros.length}`);
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
    console.log('\n--- CÁLCULO DE CONSUMO ---');
    console.log('Tarifa:', tarifa);

    // Calcular consumo total apenas dos cômodos selecionados
    let totalConsumo = 0;
    comodos.forEach(comodo => {
      console.log(`\nCalculando consumo do cômodo ${comodo.id} (${comodo.nomeComodo}):`);
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
      
      console.log(`  Consumo total do cômodo ${comodo.nomeComodo}: ${consumoComodo.toFixed(2)} kWh/mês`);
    });

    const totalCusto = totalConsumo * tarifa;
    console.log('\n--- RESUMO FINAL ---');
    console.log('Consumo total:', totalConsumo.toFixed(2), 'kWh/mês');
    console.log('Custo total:', totalCusto.toFixed(2), 'R$/mês');
    console.log('=== FIM DEBUG ===\n');

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
