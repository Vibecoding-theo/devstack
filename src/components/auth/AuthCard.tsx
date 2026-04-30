'use client';

import React from 'react';
import Link from 'next/link';
import AuthForm from './AuthForm';

type AuthMode = 'login' | 'signup';

interface AuthCardProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  loading: boolean;
  error: string;
  success: boolean;
}

export default function AuthCard({ mode, onModeChange, onSubmit, loading, error, success }: AuthCardProps) {
  return (
    <div className="auth-card">
      {success && (
        <div className="auth-success">
          <div className="auth-success-icon">✓</div>
        </div>
      )}

      <div className="auth-logo">
        <Link href="/">
          <span className="logo-dev">Dev</span>
          <span className="logo-stack">Stack</span>
        </Link>
      </div>

      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => onModeChange('login')}
        >
          Connexion
        </button>
        <button
          className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
          onClick={() => onModeChange('signup')}
        >
          Inscription
        </button>
      </div>

      <AuthForm mode={mode} onSubmit={onSubmit} loading={loading} />

      {error && <div className="auth-error">{error}</div>}

      <div className="auth-footer">
        <Link href="/">← Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
