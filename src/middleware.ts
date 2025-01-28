import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware - Verificando rota:', path);

  // Rotas públicas
  if (path === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    console.log('Middleware - Página de login - Token presente:', !!token);
    
    if (token) {
      try {
        const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const { valid } = await verifyResponse.json();

        if (valid) {
          console.log('Middleware - Token válido na página de login, redirecionando para dashboard');
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } catch (error) {
        console.log('Middleware - Erro ao verificar token:', error);
      }
      
      const response = NextResponse.next();
      response.cookies.delete('admin-token');
      return response;
    }
    return NextResponse.next();
  }

  // Verificar autenticação para rotas administrativas
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value;
    console.log('Middleware - Rota admin - Token presente:', !!token);

    if (!token) {
      console.log('Middleware - Token não encontrado, redirecionando para login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const { valid } = await verifyResponse.json();

      if (valid) {
        console.log('Middleware - Token válido, permitindo acesso');
        return NextResponse.next();
      }
    } catch (error) {
      console.log('Middleware - Erro ao verificar token:', error);
    }

    console.log('Middleware - Token inválido, redirecionando para login');
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin-token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 