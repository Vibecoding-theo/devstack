'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function HeaderLP() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const ctaHref = isAuthenticated ? '/app' : '/auth';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-lp ${isScrolled ? 'scrolled' : ''} dark`}>
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
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <Link href={ctaHref} className="btn-login">{isAuthenticated ? 'Mes composants' : 'Connexion'}</Link>
          <Link href={ctaHref} className="btn-new">Nouveau composant +</Link>

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
        </nav>
        <div className="mobile-actions">
          <Link href={ctaHref} className="btn-login-mobile" onClick={() => setIsMobileMenuOpen(false)}>{isAuthenticated ? 'Mes composants' : 'Connexion'}</Link>
          <Link href={ctaHref} className="btn-new-mobile" onClick={() => setIsMobileMenuOpen(false)}>Nouveau composant +</Link>
        </div>
      </div>

    </header>
  );
}
