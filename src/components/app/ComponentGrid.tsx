'use client';

import { Component } from '@/lib/types';

interface ComponentGridProps {
  components: Component[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  selectionMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
}

const langClass: Record<string, string> = {
  react: 'lang-react',
  typescript: 'lang-typescript',
  javascript: 'lang-javascript',
  vue: 'lang-vue',
  svelte: 'lang-svelte',
  css: 'lang-css',
  html: 'lang-html',
  other: 'lang-other',
};

export default function ComponentGrid({ components, onView, onDelete, selectionMode, selectedIds, onToggleSelect }: ComponentGridProps) {
  if (components.length === 0) return null;

  return (
    <div className="component-grid">
      {components.map((comp) => {
        const isSelected = selectedIds.has(comp.id);

        return (
          <div
            key={comp.id}
            className={`component-card ${selectionMode && isSelected ? 'card-selected' : ''}`}
            onClick={() => selectionMode ? onToggleSelect(comp.id) : onView(comp.id)}
          >
            {selectionMode && (
              <div className="card-checkbox">
                <div className={`checkbox-visual ${isSelected ? 'checked' : ''}`}>
                  {isSelected && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            )}

            <div className="card-header">
              <span className={`card-lang-badge ${langClass[comp.language] || 'lang-other'}`}>
                {comp.language}
              </span>
              <div className="card-actions">
                <button
                  className="card-action-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(comp.id);
                  }}
                  title="Supprimer"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  className="card-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(comp.id);
                  }}
                  title="Voir"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <h3 className="card-name">{comp.name}</h3>
            <p className="card-desc">{comp.description}</p>

            <div className="card-footer">
              <div className="card-tags">
                {comp.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="card-tag">#{tag}</span>
                ))}
                {comp.tags.length > 3 && (
                  <span className="card-tag" style={{ opacity: 0.5 }}>+{comp.tags.length - 3}</span>
                )}
              </div>
              {comp.dependencies && comp.dependencies.length > 0 && (
                <span className="card-deps">
                  {comp.dependencies.length} dep{comp.dependencies.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
