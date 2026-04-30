'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'devstack_theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--bg-color', '#0a0a0f');
    root.style.setProperty('--bg-surface', '#111118');
    root.style.setProperty('--bg-scrolled', 'rgba(10, 10, 15, 0.9)');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.85)');
    root.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--text-dim', 'rgba(255, 255, 255, 0.35)');
    root.style.setProperty('--border-color', 'rgba(147, 51, 234, 0.15)');
    root.style.setProperty('--surface-bg', 'rgba(255, 255, 255, 0.03)');
    root.style.setProperty('--surface-border', 'rgba(255, 255, 255, 0.06)');
    root.style.setProperty('--surface-hover', 'rgba(255, 255, 255, 0.05)');
    root.style.setProperty('--surface-elevated', 'rgba(255, 255, 255, 0.06)');
    root.style.setProperty('--overlay-bg', 'rgba(0, 0, 0, 0.75)');
    root.style.setProperty('--header-bg', 'rgba(10, 10, 15, 0.8)');
    root.style.setProperty('--scrollbar-track', '#0a0a0f');
    root.style.setProperty('--code-bg', 'rgba(0, 0, 0, 0.4)');
    root.classList.remove('light');
    root.classList.add('dark');
  } else {
    root.style.setProperty('--bg-color', '#ffffff');
    root.style.setProperty('--bg-surface', '#f8f8fb');
    root.style.setProperty('--bg-scrolled', 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--text-color', '#1a1a1f');
    root.style.setProperty('--text-secondary', 'rgba(26, 26, 31, 0.75)');
    root.style.setProperty('--text-muted', 'rgba(26, 26, 31, 0.55)');
    root.style.setProperty('--text-dim', 'rgba(26, 26, 31, 0.35)');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--surface-bg', 'rgba(0, 0, 0, 0.03)');
    root.style.setProperty('--surface-border', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--surface-hover', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--surface-elevated', 'rgba(0, 0, 0, 0.04)');
    root.style.setProperty('--overlay-bg', 'rgba(0, 0, 0, 0.4)');
    root.style.setProperty('--header-bg', 'rgba(255, 255, 255, 0.85)');
    root.style.setProperty('--scrollbar-track', '#f0f0f5');
    root.style.setProperty('--code-bg', 'rgba(0, 0, 0, 0.04)');
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored || 'dark';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
