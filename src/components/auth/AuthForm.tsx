'use client';

import React, { useState } from 'react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  loading: boolean;
}

export default function AuthForm({ mode, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: mode === 'signup' ? name : undefined, email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <div className="auth-field">
          <label htmlFor="name">Nom</label>
          <div className="auth-input-wrapper">
            <input
              id="name"
              type="text"
              className="auth-input"
              placeholder="Ton nom"
              value={name}
              onChange={e => setName(e.target.value)}
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
            type="email"
            className="auth-input"
            placeholder="ton@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

      <button
        type="submit"
        className="auth-submit"
        disabled={loading}
      >
        {loading
          ? 'Chargement...'
          : mode === 'login'
            ? 'Se connecter'
            : 'Créer un compte'}
      </button>
    </form>
  );
}
