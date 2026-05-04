import { getDb } from './db';

const SESSION_COOKIE = 'devstack_session';
const SESSION_DURATION_DAYS = 30;

// --- Password hashing (Web Crypto API, compatible Edge) ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.randomUUID();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${salt}:${hashHex}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(':');
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computed = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return computed === hashHex;
}

// --- Session token ---

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function sessionExpiryDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_DURATION_DAYS);
  return d;
}

// --- Auth functions (à utiliser dans les API routes) ---

export async function signUp(name: string, email: string, password: string) {
  const sql = getDb();

  // Vérifier si l'email existe déjà
  const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
  if (existing.length > 0) {
    return { success: false, error: 'Cet email est déjà utilisé' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Le mot de passe doit faire au moins 6 caractères' };
  }

  if (!name.trim()) {
    return { success: false, error: 'Le nom est requis' };
  }

  const passwordHash = await hashPassword(password);

  const [user] = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${passwordHash})
    RETURNING id, name, email
  `;

  const token = generateToken();
  const expiresAt = sessionExpiryDate();

  await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
  `;

  return { success: true, userId: user.id, token };
}

export async function signIn(email: string, password: string) {
  const sql = getDb();

  const [user] = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email.trim().toLowerCase()}`;
  if (!user) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }

  const token = generateToken();
  const expiresAt = sessionExpiryDate();

  await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
  `;

  return { success: true, userId: user.id, userName: user.name, token };
}

export async function signOut(token: string) {
  const sql = getDb();
  await sql`DELETE FROM sessions WHERE token = ${token}`;
}

export async function validateSession(token: string) {
  if (!token) return null;

  const sql = getDb();
  const [session] = await sql`
    SELECT s.user_id, s.expires_at, u.name, u.email, u.role
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ${token}
  `;

  if (!session) return null;

  if (new Date(session.expires_at) < new Date()) {
    // Session expirée, on la supprime
    await sql`DELETE FROM sessions WHERE token = ${token}`;
    return null;
  }

  return { userId: session.user_id, name: session.name, email: session.email, role: session.role || 'free' };
}

// Nom du cookie de session
export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_COOKIE_MAX_AGE = SESSION_DURATION_DAYS * 24 * 60 * 60;

export async function updateUserRole(userId: string, role: 'free' | 'premium') {
  const sql = getDb();
  await sql`UPDATE users SET role = ${role} WHERE id = ${userId}`;
}
