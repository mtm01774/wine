import jwt from 'jsonwebtoken';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyAuth(token: string): Promise<boolean> {
  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    return !!user;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return false;
  }
}

export async function createInitialUser() {
  try {
    console.log('\n=== CREATING INITIAL USER ===');
    
    // Primeiro, vamos deletar o usuário existente para garantir um estado limpo
    console.log('Deleting existing user if any...');
    await prisma.user.deleteMany({
      where: { email: 'luisdanielcunha@gmail.com' }
    });

    // Criar a senha hash
    console.log('Creating password hash...');
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hash created successfully');
    
    // Criar o usuário
    console.log('Creating new user...');
    const user = await prisma.user.create({
      data: {
        email: 'luisdanielcunha@gmail.com',
        password: hashedPassword,
        name: 'Luis Daniel',
        role: 'ADMIN',
      },
    });
    
    console.log('Initial admin user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash: hashedPassword
    });

    // Verificar se a senha funciona
    console.log('Testing password verification...');
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    console.log('Password verification test:', isPasswordValid ? '✅ Success' : '❌ Failed');

    console.log('=== INITIAL USER CREATION COMPLETE ===\n');
    return user;
  } catch (error) {
    console.error('Error creating initial user:', error);
    throw error;
  }
} 