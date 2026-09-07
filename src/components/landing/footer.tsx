'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="noise-overlay-footer" />

      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo & Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-dev">Dev</span>
              <span className="logo-stack">Stack</span>
            </div>
            <p className="footer-description">
              Ta bibliothèque de composants React. Centralise, réutilise, crée mieux.
            </p>
          </div>

          {/* Links Columns */}
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Produit</h4>
              <ul className="footer-column-links">
                <li>
                  <Link href="/#features">Fonctionnalités</Link>
                </li>
                <li>
                  <Link href="/#pricing">Tarifs</Link>
                </li>
                <li>
                  <Link href="/#faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/app">Application</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Légal</h4>
              <ul className="footer-column-links">
                <li>
                  <Link href="/legal/mentions-legales">Mentions légales</Link>
                </li>
                <li>
                  <Link href="/legal/confidentialite">Confidentialité</Link>
                </li>
                <li>
                  <Link href="/legal/conditions">Conditions d&apos;utilisation</Link>
                </li>
                <li>
                  <Link href="/legal/cookies">Cookies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} DevStack. Tous droits réservés. Fait avec{' '}
            <span className="heart">♥</span> en France.
          </p>
        </div>
      </div>

    </footer>
  );
}
