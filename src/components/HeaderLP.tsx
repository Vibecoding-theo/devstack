'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeaderLP() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Update document body for global theme
    if (!isDark) {
      document.documentElement.style.setProperty('--bg-color', '#0a0a0f');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.85)');
      document.documentElement.style.setProperty('--border-color', 'rgba(147, 51, 234, 0.15)');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#1a1a1f');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(26, 26, 31, 0.75)');
      document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
    }
  };

  useEffect(() => {
    // Initialize theme on mount
    if (isDark) {
      document.documentElement.style.setProperty('--bg-color', '#0a0a0f');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.85)');
      document.documentElement.style.setProperty('--border-color', 'rgba(147, 51, 234, 0.15)');
    } else {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#1a1a1f');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(26, 26, 31, 0.75)');
      document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
    }
  }, [isDark]);

  return (
    <header className={`header-lp ${isScrolled ? 'scrolled' : ''} ${isDark ? 'dark' : 'light'}`}>
      <div className="header-container">
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }} className="logo">
          <span className="logo-dev">Dev</span>
          <span className="logo-stack">Stack</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav">
          <a href="#features">Fonctionnalités</a>
          <a href="#testimonials">Témoignages</a>
          <a href="#pricing">Tarifs</a>
          <a href="#resources">Ressources</a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            {isDark ? '☀' : '☾'}
          </button>
          <Link href="/app" className="btn-login">Connexion</Link>
          <Link href="/app" className="btn-new">Nouveau composant +</Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fonctionnalités
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Témoignages
          </a>
          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tarifs
          </a>
          <a
            href="#resources"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ressources
          </a>
        </nav>
        <div className="mobile-actions">
          <Link href="/app" className="btn-login-mobile" onClick={() => setIsMobileMenuOpen(false)}>Connexion</Link>
          <Link href="/app" className="btn-new-mobile" onClick={() => setIsMobileMenuOpen(false)}>Nouveau composant +</Link>
        </div>
      </div>

    </header>
  );
}
