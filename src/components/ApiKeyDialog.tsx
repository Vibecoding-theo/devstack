'use client';

import { useState, useEffect } from 'react';
import { setApiKey, getApiKey, clearApiKey, isApiKeySet } from '@/lib/aiService';

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
      setError('Veuillez entrer une clé API');
      return;
    }

    if (!apiKey.startsWith('gsk_')) {
      setError('La clé API Groq doit commencer par "gsk_"');
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Configuration IA
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Groq - Analyse intelligente de composants
              </p>
            </div>
          </div>

          {hasKey ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-medium mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Clé API configurée
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  L'analyse IA est activée pour l'import intelligent
                </p>
              </div>

              <button
                onClick={handleClear}
                className="w-full px-4 py-2.5 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
              >
                Supprimer la clé API
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Clé API Groq
                </label>
                <div className="relative">
                  <input
                    id="apiKey"
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKeyInput(e.target.value);
                      setError('');
                    }}
                    placeholder="gsk_..."
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showKey ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                )}
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Comment obtenir une clé API ?
                </h4>
                <ol className="text-sm text-purple-800 dark:text-purple-200 space-y-1 list-decimal list-inside">
                  <li>Allez sur <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">console.groq.com/keys</a></li>
                  <li>Créez un compte gratuit</li>
                  <li>Générez une nouvelle clé API</li>
                  <li>Collez-la ci-dessus</li>
                </ol>
              </div>

              <button
                onClick={handleSave}
                className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Activer l'analyse IA
              </button>

              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                Utiliser sans IA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
