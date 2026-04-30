import { NextRequest, NextResponse } from 'next/server';
import { validateSession, SESSION_COOKIE_NAME } from '@/lib/auth-db';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes protégées : /app
  const isProtected = pathname.startsWith('/app');

  if (isProtected) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        const session = await validateSession(token);
        isAuthenticated = !!session;
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si déjà connecté sur /auth, rediriger vers /app
  if (pathname === '/auth') {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      try {
        const session = await validateSession(token);
        if (session) {
          return NextResponse.redirect(new URL('/app', request.url));
        }
      } catch {
        // Token invalide, on laisse sur /auth
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/auth'],
};
