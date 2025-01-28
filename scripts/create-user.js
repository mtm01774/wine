const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createInitialUser() {
  try {
    console.log('Conectando ao banco de dados...');
    
    console.log('Verificando usuário existente...');
    const existingUser = await prisma.user.findUnique({
      where: { email: 'luidanielcunha@gmail.com' },
    });

    if (!existingUser) {
      console.log('Usuário não encontrado, criando novo usuário...');
      
      console.log('Gerando hash da senha...');
      const hashedPassword = await bcrypt.hash('Daniel91', 10);

      console.log('Criando usuário no banco de dados...');
      const user = await prisma.user.create({
        data: {
          email: 'luidanielcunha@gmail.com',
          password: hashedPassword,
          name: 'Luis Daniel',
          role: 'ADMIN',
        },
      });

      console.log('Usuário criado com sucesso:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } else {
      console.log('Usuário já existe:', {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      });
    }
  } catch (error) {
    console.error('Erro ao criar usuário inicial:', error);
  } finally {
    console.log('Desconectando do banco de dados...');
    await prisma.$disconnect();
  }
}

createInitialUser(); 