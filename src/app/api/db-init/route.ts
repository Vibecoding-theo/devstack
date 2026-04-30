import { NextResponse } from 'next/server';
import { initDb } from '@/lib/db';

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({ success: true, message: 'Base de données initialisée' });
  } catch (error) {
    console.error('Erreur init DB:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'initialisation de la base de données' },
      { status: 500 }
    );
  }
}
