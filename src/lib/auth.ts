import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function verifyAuth(token: string) {
  try {
    console.log('Verificando token JWT...');
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET não está definido!');
      throw new Error('Configuração de JWT ausente');
    }

    console.log('Decodificando token...');
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
    };
    console.log('Token decodificado:', { userId: decoded.userId, email: decoded.email });

    console.log('Buscando usuário no banco...');
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      console.log('Usuário não encontrado no banco');
      throw new Error('Usuário não encontrado');
    }

    console.log('Usuário encontrado:', { id: user.id, email: user.email });
    return user;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('Erro na verificação do JWT:', error.message);
      throw new Error(`Token JWT inválido: ${error.message}`);
    }
    console.error('Erro na autenticação:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createInitialUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'luidanielcunha@gmail.com' },
  });

  if (!existingUser) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('Daniel91', 10);

    await prisma.user.create({
      data: {
        email: 'luidanielcunha@gmail.com',
        password: hashedPassword,
        name: 'Luis Daniel',
        role: 'ADMIN',
      },
    });
  }
} 