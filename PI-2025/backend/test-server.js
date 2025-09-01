import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('Testando conexão com o banco de dados...');
    
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão com banco de dados OK');
    
    // Testar se a tabela Comodo existe
    const comodos = await prisma.comodo.findMany({
      take: 1
    });
    console.log('✅ Tabela Comodo acessível');
    console.log('Cômodos encontrados:', comodos.length);
    
    // Testar se a tabela Cliente existe
    const clientes = await prisma.cliente.findMany({
      take: 1
    });
    console.log('✅ Tabela Cliente acessível');
    console.log('Clientes encontrados:', clientes.length);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
