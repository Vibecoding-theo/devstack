'use client';

import { Component } from '@/lib/types';
import { useState } from 'react';
import { generatePromptWithAI, isApiKeySet } from '@/lib/aiService';

interface ComponentDetailProps {
  component: Component;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function ComponentDetail({ component, onClose, onDelete }: ComponentDetailProps) {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [promptLoading, setPromptLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(component.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGeneratePrompt = async () => {
    setPromptLoading(true);
    try {
      const result = await generatePromptWithAI(component);
      setPrompt(result);
    } catch {
      setPrompt('Erreur lors de la génération du prompt.');
    } finally {
      setPromptLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title-wrap">
            <h2 className="detail-name">{component.name}</h2>
            <span className={`card-lang-badge ${component.language}`}>
              {component.language}
            </span>
          </div>
          <button className="detail-close" onClick={onClose}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <div className="detail-section-title">Description</div>
            <p className="detail-desc">{component.description}</p>
          </div>

          {(component.tags.length > 0 || (component.dependencies && component.dependencies.length > 0)) && (
            <div className="detail-section">
              <div className="detail-section-title">Métadonnées</div>
              <div className="detail-meta">
                {component.tags.map((tag) => (
                  <span key={tag} className="detail-meta-item">#{tag}</span>
                ))}
                {component.dependencies?.map((dep) => (
                  <span key={dep} className="detail-meta-item">{dep}</span>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <div className="detail-section-title">Code source</div>
            <div className="detail-code-wrap">
              <div className="detail-code-header">
                <span className="detail-code-lang">{component.language}</span>
                <button className="btn-copy" onClick={handleCopyCode}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <pre className="detail-code">{component.code}</pre>
            </div>
          </div>

          {prompt && (
            <div className="detail-section">
              <div className="detail-section-title">Prompt d'intégration</div>
              <div className="detail-code-wrap">
                <div className="detail-code-header">
                  <span className="detail-code-lang">Prompt</span>
                  <button className="btn-copy" onClick={handleCopyPrompt}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copier
                  </button>
                </div>
                <div className="detail-code" style={{ whiteSpace: 'pre-wrap' }}>{prompt}</div>
              </div>
            </div>
          )}
        </div>

        <div className="detail-footer">
          <span className="detail-date">
            Créé le {formatDate(component.createdAt)}
            {component.updatedAt !== component.createdAt && (
              <> · Modifié le {formatDate(component.updatedAt)}</>
            )}
          </span>
          <div className="detail-footer-actions">
            <button
              className="btn-detail-action btn-detail-delete"
              onClick={() => onDelete(component.id)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
            <button
              className="btn-detail-action btn-detail-prompt"
              onClick={handleGeneratePrompt}
              disabled={promptLoading}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {promptLoading ? 'Génération...' : 'Générer un prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
