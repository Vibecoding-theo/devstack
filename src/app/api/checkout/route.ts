import { NextRequest, NextResponse } from 'next/server';
import { validateSession, updateUserRole, SESSION_COOKIE_NAME } from '@/lib/auth-db';

// POST — appelé par la page payment une fois le formulaire validé
export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const session = await validateSession(token);
    if (!session) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
    }

    if (session.role === 'premium') {
      return NextResponse.json({ success: true, role: 'premium', alreadyPremium: true });
    }

    // TODO: Valider le paiement réel (Stripe, etc.) avant cette étape
    await updateUserRole(session.userId, 'premium');

    return NextResponse.json({ success: true, role: 'premium' });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// GET — redirige vers la page de paiement (ou auth si pas connecté)
export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth?redirect=/payment', request.url));
  }

  try {
    const session = await validateSession(token);
    if (!session) {
      return NextResponse.redirect(new URL('/auth?redirect=/payment', request.url));
    }

    if (session.role === 'premium') {
      return NextResponse.redirect(new URL('/app', request.url));
    }

    return NextResponse.redirect(new URL('/payment', request.url));
  } catch {
    return NextResponse.redirect(new URL('/auth?redirect=/payment', request.url));
  }
}
