const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
  try {
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
    } else {
      console.log('Usuário não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 