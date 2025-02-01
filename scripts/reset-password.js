const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    console.log('Conectando ao banco de dados...');
    
    console.log('Verificando usuário existente...');
    const user = await prisma.user.findUnique({
      where: { email: 'luidanielcunha@gmail.com' },
    });

    if (user) {
      console.log('Usuário encontrado, redefinindo senha...');
      
      console.log('Gerando nova hash da senha...');
      const hashedPassword = await bcrypt.hash('Daniel91', 10);

      console.log('Atualizando senha no banco de dados...');
      await prisma.user.update({
        where: { email: 'luidanielcunha@gmail.com' },
        data: { password: hashedPassword },
      });

      console.log('Senha atualizada com sucesso!');
    } else {
      console.log('Usuário não encontrado!');
    }
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
  } finally {
    console.log('Desconectando do banco de dados...');
    await prisma.$disconnect();
  }
}

resetPassword(); 