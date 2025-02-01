import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { unstable_setRequestLocale } from 'next-intl/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest, { params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  console.log('Iniciando processo de login, locale:', params.locale);
  
  try {
    const body = await request.json();
    console.log('Dados recebidos:', { email: body.email, hasPassword: !!body.password });

    const { email, password } = body;

    if (!email || !password) {
      console.log('Dados inválidos:', { email: !!email, password: !!password });
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('Procurando usuário:', email);

    let user;
    try {
      // Verificar se o usuário existe
      user = await prisma.customer.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
        },
      });

      console.log('Resultado da busca:', { userFound: !!user });
    } catch (prismaError) {
      console.error('Erro ao acessar o banco de dados:', prismaError);
      return NextResponse.json(
        { message: 'Erro ao acessar o banco de dados' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar a senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Verificação de senha:', { isValid: isValidPassword });

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Configurar o cookie e resposta
    const response = NextResponse.json(
      {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );

    // Configurar cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    console.log('Login concluído com sucesso');
    return response;
  } catch (error) {
    console.error('Erro detalhado ao fazer login:', {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Erro interno do servidor: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 