import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function testQuery() {
  try {
    console.log('=== TESTE DE QUERY ===');
    
    // Simular dados de teste
    const userId = 1; // Substitua pelo ID real do usuário
    const idsSelecionados = [1, 2]; // IDs que você quer testar
    
    console.log('User ID:', userId);
    console.log('IDs selecionados:', idsSelecionados);
    
    // Buscar todos os cômodos ativos
    const todosComodos = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true
      },
      include: { eletros: true }
    });
    
    console.log('\nTodos os cômodos ativos:', todosComodos.length);
    todosComodos.forEach(c => {
      console.log(`ID: ${c.id}, Nome: ${c.nomeComodo}, Eletros: ${c.eletros.length}`);
    });
    
    // Buscar apenas os selecionados
    const comodosSelecionados = await prisma.comodo.findMany({
      where: { 
        clienteId: userId,
        ativo: true,
        id: { in: idsSelecionados }
      },
      include: { eletros: true }
    });
    
    console.log('\nCômodos selecionados:', comodosSelecionados.length);
    comodosSelecionados.forEach(c => {
      console.log(`ID: ${c.id}, Nome: ${c.nomeComodo}, Eletros: ${c.eletros.length}`);
    });
    
    console.log('=== FIM TESTE ===');
    
  } catch (error) {
    console.error('Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testQuery();
