import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log('\n=== LOGIN ATTEMPT START ===');
    
    // Log do request completo
    const requestText = await request.text();
    console.log('Raw request body:', requestText);
    
    // Parse do JSON
    let body;
    try {
      body = JSON.parse(requestText);
      console.log('Parsed request body:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { email, password } = body;
    
    if (!email || !password) {
      console.log('Missing email or password in request');
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('Login attempt for email:', email);

    // Verificar se o usuário existe
    console.log('Searching for user in database...');
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      console.log('❌ User not found in database for email:', email);
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      hasPassword: !!user.password,
      passwordLength: user.password?.length
    });
    
    // Verificar a senha
    try {
      console.log('Starting password verification...');
      
      if (!user.password) {
        console.log('❌ User has no password stored');
        return NextResponse.json(
          { message: 'Erro na configuração da conta' },
          { status: 500 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('Password verification result:', isValidPassword ? '✅ Valid' : '❌ Invalid');

      if (!isValidPassword) {
        console.log('❌ Password verification failed');
        return NextResponse.json(
          { message: 'Credenciais inválidas' },
          { status: 401 }
        );
      }
    } catch (bcryptError) {
      console.error('⚠️ Bcrypt error:', bcryptError);
      return NextResponse.json(
        { message: 'Erro na verificação da senha' },
        { status: 500 }
      );
    }

    console.log('✅ Password verified successfully');

    // Gerar token JWT
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Using JWT secret (first 3 chars):', jwtSecret.substring(0, 3));
    
    try {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '1d' }
      );
      console.log('✅ JWT token generated successfully');

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
        maxAge: 86400,
        path: '/',
      });

      console.log('=== LOGIN ATTEMPT SUCCESS ===\n');
      return response;
    } catch (jwtError) {
      console.error('⚠️ JWT generation error:', jwtError);
      return NextResponse.json(
        { message: 'Erro ao gerar o token de autenticação' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('⚠️ Unexpected login error:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 