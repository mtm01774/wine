const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupAdmin() {
  try {
    console.log('Conectando ao banco de dados...');
    
    // Deletar usuário existente se houver
    console.log('Removendo usuário existente se houver...');
    await prisma.user.deleteMany({
      where: { email: 'luisdanielcunha@gmail.com' }
    });

    // Criar novo usuário admin
    console.log('Criando novo usuário admin...');
    const hashedPassword = await bcrypt.hash('Daniel91', 10);
    
    const user = await prisma.user.create({
      data: {
        email: 'luisdanielcunha@gmail.com',
        password: hashedPassword,
        name: 'Luis Daniel',
        role: 'ADMIN'
      }
    });

    console.log('Usuário admin criado com sucesso:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('Erro ao configurar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin(); 