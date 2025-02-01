import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { verifyAuth } from '@/lib/auth';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'always'
});

const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/store',
  '/about',
  '/contact',
  '/plans',
  '/api/auth/login',
  '/api/auth/register',
];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Always apply internationalization first
  const response = await intlMiddleware(request);
  const locale = response.headers.get('x-next-intl-locale') || defaultLocale;

  // If it's an API route, add locale to the request headers and proceed
  if (pathname.includes('/api/')) {
    const apiResponse = NextResponse.next();
    apiResponse.headers.set('x-next-intl-locale', locale);
    return apiResponse;
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

  // Check if it's a public path
  const isPublicPath = PUBLIC_PATHS.some(path => 
    pathname.startsWith(`/${locale}${path}`) || 
    pathname === path
  );

  if (isPublicPath) {
    return response;
  }

  // Check authentication token
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  try {
    // Verify if token is valid
    const isValid = await verifyAuth(token.value);
    
    if (!isValid) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    return response;
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/',
    '/(pt|en)/:path*',
    '/api/:path*',
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ]
};