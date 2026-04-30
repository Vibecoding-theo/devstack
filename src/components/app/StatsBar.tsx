'use client';

import { Component, ComponentLanguage } from '@/lib/types';

interface StatsBarProps {
  components: Component[];
}

const langColors: Record<string, string> = {
  react: '#22d3ee',
  typescript: '#818cf8',
  javascript: '#facc15',
  vue: '#4ade80',
  svelte: '#f87171',
  css: '#60a5fa',
  html: '#fb923c',
  other: '#9ca3af',
};

export default function StatsBar({ components }: StatsBarProps) {
  const langs = components.reduce<Record<string, number>>((acc, c) => {
    acc[c.language] = (acc[c.language] || 0) + 1;
    return acc;
  }, {});

  const topLang = Object.entries(langs).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="stats-bar">
      <div className="stats-info">
        <div className="stat-item">
          <span className="stat-value">{components.length}</span>
          <span className="stat-label">
            composant{components.length !== 1 ? 's' : ''}
          </span>
        </div>
        {topLang && (
          <div className="stat-item">
            <span
              className="stat-value"
              style={{ color: langColors[topLang[0]] || '#9ca3af', WebkitTextFillColor: 'unset' }}
            >
              {topLang[1]}
            </span>
            <span className="stat-label">{topLang[0]}</span>
          </div>
        )}
        {Object.keys(langs).length > 1 && (
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#9ca3af', WebkitTextFillColor: 'unset' }}>
              {Object.keys(langs).length}
            </span>
            <span className="stat-label">langages</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {Object.entries(langs).map(([lang, count]) => (
          <span
            key={lang}
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.72rem',
              fontWeight: 600,
              background: `${langColors[lang] || '#9ca3af'}18`,
              color: langColors[lang] || '#9ca3af',
            }}
          >
            {lang} ({count})
          </span>
        ))}
      </div>
    </div>
  );
}
