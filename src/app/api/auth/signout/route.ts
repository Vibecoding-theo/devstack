import { NextRequest, NextResponse } from 'next/server';
import { signOut, SESSION_COOKIE_NAME } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    try {
      await signOut(token);
    } catch {
      // On supprime le cookie même si la suppression en DB échoue
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
