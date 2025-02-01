const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkUserAndPassword() {
  try {
    console.log('Conectando ao banco de dados...');
    
    const user = await prisma.user.findUnique({
      where: { email: 'luidanielcunha@gmail.com' },
    });

    if (user) {
      console.log('Usuário encontrado:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      // Testar a senha
      const testPassword = 'Daniel91';
      const isPasswordValid = await bcrypt.compare(testPassword, user.password);
      console.log('Senha está válida?', isPasswordValid);
      console.log('Hash atual da senha:', user.password);
    } else {
      console.log('Usuário não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserAndPassword(); 