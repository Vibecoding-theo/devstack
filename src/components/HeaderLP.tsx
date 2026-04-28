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

      <style jsx global>{`
        /* ===== THEME VARIABLES ===== */
        :root {
          --bg-color: #0a0a0f;
          --bg-scrolled: rgba(10, 10, 15, 0.9);
          --bg-mobile: rgba(10, 10, 15, 0.98);
          --text-color: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.85);
          --border-color: rgba(147, 51, 234, 0.15);
        }

        /* ===== HEADER ===== */
        .header-lp {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 60px;
          transition: all 0.3s ease;
        }

        .header-lp.scrolled {
          padding: 12px 60px;
          background: var(--bg-scrolled);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-lp.light {
          --bg-scrolled: rgba(255, 255, 255, 0.95);
          --bg-mobile: rgba(255, 255, 255, 0.98);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .logo:hover {
          opacity: 0.8;
        }

        .logo-dev {
          color: var(--text-color);
        }

        .logo-stack {
          color: #e83e8c;
        }

        /* Desktop Navigation */
        .nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav a {
          color: var(--text-color);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          opacity: 0.85;
          transition: opacity 0.2s, color 0.2s;
        }

        .nav a:hover {
          opacity: 1;
          color: #a78bfa;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-color);
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .theme-toggle:hover {
          background: rgba(147, 51, 234, 0.2);
          border-color: rgba(147, 51, 234, 0.4);
        }

        .header-lp.light .theme-toggle {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .header-lp.light .theme-toggle:hover {
          background: rgba(147, 51, 234, 0.1);
          border-color: rgba(147, 51, 234, 0.3);
        }

        .btn-login {
          background: transparent;
          color: var(--text-color);
          border: 1px solid rgba(147, 51, 234, 0.4);
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-login:hover {
          background: rgba(147, 51, 234, 0.15);
          border-color: #9333ea;
        }

        .btn-new {
          background: #e83e8c;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
        }

        .btn-new:hover {
          background: #d63384;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(232, 62, 140, 0.3);
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background: var(--text-color);
          border-radius: 2px;
          transition: all 0.3s;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-mobile);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 20px;
        }

        .mobile-nav a {
          color: var(--text-color);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 12px 16px;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .mobile-nav a:hover {
          background: rgba(147, 51, 234, 0.1);
          color: #a78bfa;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-login-mobile {
          background: transparent;
          color: var(--text-color);
          border: 1px solid rgba(147, 51, 234, 0.4);
          padding: 14px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-login-mobile:hover {
          background: rgba(147, 51, 234, 0.15);
          border-color: #9333ea;
        }

        .btn-new-mobile {
          background: #e83e8c;
          color: #ffffff;
          border: none;
          padding: 14px 24px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-new-mobile:hover {
          background: #d63384;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .header-lp {
            padding: 16px 24px;
          }

          .header-lp.scrolled {
            padding: 12px 24px;
          }

          .nav {
            display: none;
          }

          .theme-toggle,
          .btn-login {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mobile-menu {
            display: block;
          }

          .btn-new {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .header-lp {
            padding: 12px 20px;
          }

          .logo {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </header>
  );
}
