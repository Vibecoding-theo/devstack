'use client';

import React, { useState } from 'react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  redirect: string;
  error?: string;
}

export default function AuthForm({ mode, redirect, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const action = mode === 'login' ? '/api/auth/signin' : '/api/auth/signup';

  return (
    <form className="auth-form" action={action} method="POST">
      <input type="hidden" name="redirect" value={redirect} />

      {mode === 'signup' && (
        <div className="auth-field">
          <label htmlFor="name">Nom</label>
          <div className="auth-input-wrapper">
            <input
              id="name"
              name="name"
              type="text"
              className="auth-input"
              placeholder="Ton nom"
              required
              autoComplete="name"
            />
            <span className="input-icon">👤</span>
          </div>
        </div>
      )}

      <div className="auth-field">
        <label htmlFor="email">Email</label>
        <div className="auth-input-wrapper">
          <input
            id="email"
            name="email"
            type="email"
            className="auth-input"
            placeholder="ton@email.com"
            required
            autoComplete="email"
          />
          <span className="input-icon">✉</span>
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="password">Mot de passe</label>
        <div className="auth-input-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
          <span className="input-icon">🔒</span>
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        </div>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button
        type="submit"
        className="auth-submit"
      >
        {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
      </button>
    </form>
  );
}
