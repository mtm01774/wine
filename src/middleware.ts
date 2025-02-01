import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Always apply internationalization first
  const response = await intlMiddleware(request);
  const locale = response.headers.get('x-next-intl-locale') || defaultLocale;

  // If it's an API route, just proceed
  if (pathname.includes('/api/')) {
    return NextResponse.next();
  }

  // If not an admin route, return the intl middleware response
  if (!pathname.includes('/admin')) {
    return response;
  }

  // For admin routes, handle authentication
  if (pathname.includes('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value;
    
    if (token) {
      try {
        const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/api/admin/auth/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const { valid } = await verifyResponse.json();

        if (valid) {
          return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url));
        }
      } catch (error) {
        console.error('Token verification failed:', error);
      }
      
      const response = NextResponse.next();
      response.cookies.delete('admin-token');
      return response;
    }

    // Clone the intl middleware response for the login page
    return response;
  }

  // Verify authentication for other admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    try {
      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/${locale}/api/admin/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const { valid } = await verifyResponse.json();

      if (valid) {
        // Clone the intl middleware response for authenticated admin routes
        return response;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    }

    const redirectResponse = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    redirectResponse.cookies.delete('admin-token');
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/',
    '/(pt|en)/:path*',
    '/api/:path*',
    '/admin/:path*'
  ]
};