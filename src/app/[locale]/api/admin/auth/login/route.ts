import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log('Iniciando processo de login...');
    const { email, password } = await request.json();
    console.log('Dados recebidos:', { email, passwordLength: password?.length });

    // Verificar se o usuário existe
    console.log('Buscando usuário no banco de dados...');
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Usuário não encontrado');
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('Usuário encontrado:', { id: user.id, email: user.email });
    console.log('Verificando senha...');
    
    // Verificar a senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Resultado da verificação da senha:', isValidPassword);

    if (!isValidPassword) {
      console.log('Senha inválida');
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('Senha válida, gerando token...');
    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    console.log('Token gerado, configurando resposta...');
    // Configurar o cookie e resposta
    const response = NextResponse.json(
      {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 dia
      path: '/',
    });

    console.log('Login concluído com sucesso');
    return response;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 