'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole, ROLE_LIMITS } from '@/lib/storage';

interface AppHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSmartImport: () => void;
  onApiKeyClick: () => void;
  componentCount: number;
  userRole: UserRole;
  selectionMode: boolean;
  selectedCount: number;
  onToggleSelectionMode: () => void;
}

export default function AppHeader({
  searchQuery,
  onSearchChange,
  onSmartImport,
  onApiKeyClick,
  componentCount,
  userRole,
  selectionMode,
  selectedCount,
  onToggleSelectionMode,
}: AppHeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setUserName(data.user.name);
      })
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } catch {
      // On redirige même si l'appel échoue
    }
    window.location.href = '/';
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="app-logo">
          <span className="app-logo-dev">Dev</span>
          <span className="app-logo-stack">Stack</span>
        </Link>

        <div className="search-container">
          <svg className="search-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={`Rechercher dans ${componentCount} composant${componentCount !== 1 ? 's' : ''}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <div className="plan-badge">
            {userRole === 'premium' ? (
              <span className="plan-badge-premium">Premium</span>
            ) : (
              <span className="plan-badge-free">
                Gratuit &middot; {componentCount}/{ROLE_LIMITS.free}
              </span>
            )}
          </div>

          <button
            className={`btn-icon ${selectionMode ? 'active' : ''}`}
            onClick={onToggleSelectionMode}
            title={selectionMode ? 'Annuler la sélection' : 'Sélectionner'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>

          <button className="btn-icon" onClick={onApiKeyClick} title="Configuration IA">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>

          <button className="btn-import-smart" onClick={onSmartImport}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Import intelligent</span>
          </button>

          {/* User avatar + déconnexion */}
          {userName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #9333ea, #e83e8c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleSignOut}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,0.5)',
                  padding: '6px 10px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
                title="Se déconnecter"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span style={{ display: 'none' }}>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
