import { NextRequest, NextResponse } from 'next/server';
import { signUp, SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  const isForm = contentType.includes('application/x-www-form-urlencoded');

  let name: string;
  let email: string;
  let password: string;
  let redirect = '/app';

  if (isForm) {
    const formData = await request.formData();
    name = formData.get('name') as string;
    email = formData.get('email') as string;
    password = formData.get('password') as string;
    redirect = (formData.get('redirect') as string) || '/app';
  } else {
    const body = await request.json();
    name = body.name;
    email = body.email;
    password = body.password;
  }

  if (!name || !email || !password) {
    if (isForm) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', redirect);
      url.searchParams.set('error', 'Tous les champs sont requis');
      return NextResponse.redirect(url);
    }
    return NextResponse.json(
      { success: false, error: 'Tous les champs sont requis' },
      { status: 400 }
    );
  }

  const result = await signUp(name, email, password);

  if (!result.success) {
    if (isForm) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', redirect);
      url.searchParams.set('error', result.error || 'Erreur');
      return NextResponse.redirect(url);
    }
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
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

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, result.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
}
