'use client';

import { Component as ComponentType } from '@/lib/types';
import { generateIntegrationPrompt, generateRefactorPrompt, generateTestPrompt } from '@/lib/promptGenerator';
import { useState } from 'react';

interface ComponentCardProps {
  component: ComponentType;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  css: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  typescript: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  vue: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  svelte: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

const PROMPT_BUTTONS = [
  { type: 'integration' as const, icon: 'plus', label: 'Intégrer', color: 'blue' },
  { type: 'refactor' as const, icon: 'refresh', label: 'Refactorer', color: 'green' },
  { type: 'test' as const, icon: 'check', label: 'Tester', color: 'purple' }
] as const;

const ICONS = {
  plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />,
  refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
  copy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
} as const;

const COLOR_CLASSES = {
  blue: { bg: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'text-green-600 dark:text-green-400' },
  purple: { bg: 'text-purple-600 dark:text-purple-400' }
} as const;

export default function ComponentCard({ component, onView, onEdit, onDelete, selectionMode, selected, onToggleSelect }: ComponentCardProps) {
  const [showPrompts, setShowPrompts] = useState(false);

  const copyToClipboard = (text: string, onSuccess: () => void) => {
    navigator.clipboard.writeText(text).then(onSuccess);
  };

  const copyCode = () => copyToClipboard(component.code, () => {});

  const copyPrompt = (type: 'integration' | 'refactor' | 'test') => {
    const prompts = {
      integration: generateIntegrationPrompt(component),
      refactor: generateRefactorPrompt(component),
      test: generateTestPrompt(component)
    };
    copyToClipboard(prompts[type], () => {});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const languageColor = LANGUAGE_COLORS[component.language] || LANGUAGE_COLORS.other;

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col relative ${
        selected
          ? 'border-red-500 dark:border-red-400 ring-2 ring-red-500/30'
          : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={selectionMode ? () => onToggleSelect?.(component.id) : undefined}
      style={selectionMode ? { cursor: 'pointer' } : undefined}
    >
      {selectionMode && (
        <div className="absolute top-3 left-3 z-10">
          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            selected
              ? 'bg-red-500 border-red-500'
              : 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700'
          }`}>
            {selected && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">{component.name}</h3>
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${languageColor}`}>
              {component.language}
            </span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {!selectionMode && (<>
            <button
              onClick={() => onView(component.id)}
              className="p-1.5 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Voir le détail"
              aria-label="Voir le détail"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {ICONS.eye}
              </svg>
            </button>
            <button
              onClick={() => onEdit(component.id)}
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Modifier"
              aria-label="Modifier le composant"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {ICONS.edit}
              </svg>
            </button>
            <button
              onClick={() => onDelete(component.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Supprimer"
              aria-label="Supprimer le composant"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {ICONS.trash}
              </svg>
            </button>
            </>)}
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
          {component.description}
        </p>

        {component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {component.tags.slice(0, 5).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                #{tag}
              </span>
            ))}
            {component.tags.length > 5 && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                +{component.tags.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3 flex-1 min-h-[80px]">
          <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap break-all">
            {component.code.substring(0, 150)}
            {component.code.length > 150 && '...'}
          </pre>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">
            {formatDate(component.updatedAt)}
          </span>
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            {showPrompts ? 'Masquer' : 'Prompts IA'}
          </button>
        </div>
      </div>

      {showPrompts && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="grid grid-cols-3 gap-2">
            {PROMPT_BUTTONS.map(({ type, icon, label, color }) => (
              <button
                key={type}
                onClick={() => copyPrompt(type)}
                className="flex flex-col items-center gap-1 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs"
                title={`Copier le prompt de ${label.toLowerCase()}`}
                aria-label={`Copier le prompt de ${label.toLowerCase()}`}
              >
                <svg className={`w-5 h-5 ${COLOR_CLASSES[color].bg}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {ICONS[icon]}
                </svg>
                <span className="text-center">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!selectionMode && (
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => onView(component.id)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          aria-label="Voir le détail"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {ICONS.eye}
          </svg>
          <span>Voir</span>
        </button>
        <button
          onClick={copyCode}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          aria-label="Copier le code"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {ICONS.copy}
          </svg>
          <span>Copier</span>
        </button>
      </div>
      )}
    </article>
  );
}
