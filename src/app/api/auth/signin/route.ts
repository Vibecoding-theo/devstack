import { NextRequest, NextResponse } from 'next/server';
import { signIn, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  const isForm = contentType.includes('application/x-www-form-urlencoded');

  let email: string;
  let password: string;
  let redirect = '/app';

  if (isForm) {
    const formData = await request.formData();
    email = formData.get('email') as string;
    password = formData.get('password') as string;
    redirect = (formData.get('redirect') as string) || '/app';
  } else {
    const body = await request.json();
    email = body.email;
    password = body.password;
  }

  if (!email || !password) {
    if (isForm) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', redirect);
      url.searchParams.set('error', 'Email et mot de passe requis');
      return NextResponse.redirect(url);
    }
    return NextResponse.json(
      { success: false, error: 'Email et mot de passe requis' },
      { status: 400 }
    );
  }

  const result = await signIn(email, password);

  if (!result.success) {
    if (isForm) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', redirect);
      url.searchParams.set('error', result.error || 'Erreur');
      return NextResponse.redirect(url);
    }
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 401 }
    );
  }

  if (isForm) {
    const response = NextResponse.redirect(new URL(redirect, request.url));
    response.cookies.set(SESSION_COOKIE_NAME, result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_COOKIE_MAX_AGE,
      path: '/',
    });
    return response;
  }

  const response = NextResponse.json({
    success: true,
    user: { name: result.userName },
  });
  response.cookies.set(SESSION_COOKIE_NAME, result.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
}
