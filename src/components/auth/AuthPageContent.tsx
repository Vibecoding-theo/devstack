'use client';

import React, { useState } from 'react';
import AuthBackground from './AuthBackground';
import AuthCard from './AuthCard';
import './auth.css';

type AuthMode = 'login' | 'signup';

export default function AuthPageContent() {
  const [mode, setMode] = useState<AuthMode>('login');

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const redirect = params.get('redirect') || '/app';
  const error = params.get('error') || undefined;

  return (
    <div className="auth-page">
      <AuthBackground />
      <AuthCard
        mode={mode}
        onModeChange={setMode}
        redirect={redirect}
        error={error}
      />
    </div>
  );
}
