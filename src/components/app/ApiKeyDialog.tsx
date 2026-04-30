'use client';

import { useState, useEffect } from 'react';
import { setApiKey, clearApiKey, isApiKeySet } from '@/lib/aiService';

interface ApiKeyDialogProps {
  onClose: () => void;
}

export default function ApiKeyDialog({ onClose }: ApiKeyDialogProps) {
  const [apiKey, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    setHasKey(isApiKeySet());
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('Entre ta clé API');
      return;
    }
    if (!apiKey.startsWith('gsk_')) {
      setError('La clé Groq doit commencer par "gsk_"');
      return;
    }
    setApiKey(apiKey.trim());
    setHasKey(true);
    setError('');
    onClose();
  };

  const handleClear = () => {
    clearApiKey();
    setHasKey(false);
    setApiKeyInput('');
    onClose();
  };

  return (
    <div className="apikey-overlay" onClick={onClose}>
      <div className="apikey-panel" onClick={(e) => e.stopPropagation()}>
        <div className="apikey-header">
          <div className="apikey-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="apikey-title">Configuration IA</h2>
            <p className="apikey-subtitle">Groq — Analyse intelligente</p>
          </div>
        </div>

        <div className="apikey-body">
          {hasKey ? (
            <>
              <div className="apikey-success">
                <div className="apikey-success-title">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Clé API configurée
                </div>
                <p>L'analyse IA est activée pour l'import intelligent.</p>
              </div>
              <div className="apikey-actions">
                <button className="btn-apikey-clear" onClick={handleClear}>Supprimer la clé API</button>
                <button className="btn-apikey-cancel" onClick={onClose}>Fermer</button>
              </div>
            </>
          ) : (
            <>
              <div className="apikey-input-wrap">
                <input
                  type={showKey ? 'text' : 'password'}
                  className="apikey-input"
                  placeholder="gsk_..."
                  value={apiKey}
                  onChange={(e) => { setApiKeyInput(e.target.value); setError(''); }}
                />
                <button className="apikey-toggle-vis" onClick={() => setShowKey(!showKey)}>
                  {showKey ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {error && <p className="apikey-error">{error}</p>}

              <div className="apikey-info">
                <h4>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Comment obtenir une clé ?
                </h4>
                <ol>
                  <li>Va sur <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">console.groq.com/keys</a></li>
                  <li>Crée un compte gratuit</li>
                  <li>Génère une nouvelle clé API</li>
                  <li>Colle-la ci-dessus</li>
                </ol>
              </div>

              <div className="apikey-actions">
                <button className="btn-apikey-save" onClick={handleSave}>Activer l'analyse IA</button>
                <button className="btn-apikey-cancel" onClick={onClose}>Utiliser sans IA</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
