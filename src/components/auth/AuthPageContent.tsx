'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthBackground from './AuthBackground';
import AuthCard from './AuthCard';
import './auth.css';

type AuthMode = 'login' | 'signup';

export default function AuthPageContent() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: { name?: string; email: string; password: string }) => {
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const body = mode === 'signup'
        ? { name: data.name, email: data.email, password: data.password }
        : { email: data.email, password: data.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push('/app'), 1000);
      } else {
        setError(result.error || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    }

    setLoading(false);
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className="auth-page">
      <AuthBackground />
      <AuthCard
        mode={mode}
        onModeChange={handleModeChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
}
