'use client';

import React from 'react';

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
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Produit</h4>
              <ul className="footer-column-links">
                <li>
                  <a href="#">Fonctionnalités</a>
                </li>
                <li>
                  <a href="#">Tarifs</a>
                </li>
                <li>
                  <a href="#">Intégrations</a>
                </li>
                <li>
                  <a href="#">Changelog</a>
                </li>
                <li>
                  <a href="#">Roadmap</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Ressources</h4>
              <ul className="footer-column-links">
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Tutoriels</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Communauté</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Entreprise</h4>
              <ul className="footer-column-links">
                <li>
                  <a href="#">À propos</a>
                </li>
                <li>
                  <a href="#">Carrières</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Partenaires</a>
                </li>
                <li>
                  <a href="#">Presse</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Légal</h4>
              <ul className="footer-column-links">
                <li>
                  <a href="#">Confidentialité</a>
                </li>
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Cookies</a>
                </li>
                <li>
                  <a href="#">Sécurité</a>
                </li>
                <li>
                  <a href="#">RGPD</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 DevStack. Tous droits réservés. Fait avec{' '}
            <span className="heart">♥</span> en France.
          </p>

          <div className="footer-bottom-links">
            <a href="#">Statut</a>
            <a href="#">API</a>
            <a href="#">Open Source</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ===== FOOTER ===== */
        .footer {
          position: relative;
          padding: 80px 60px 30px;
          background: #0a0a0f;
          border-top: 1px solid rgba(147, 51, 234, 0.15);
        }

        .noise-overlay-footer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 60px;
          margin-bottom: 60px;
        }

        /* Footer Brand */
        .footer-brand {
          max-width: 280px;
          flex-shrink: 0;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
          display: inline-block;
        }

        .logo-dev {
          color: #ffffff;
        }

        .logo-stack {
          color: #e83e8c;
        }

        .footer-description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s;
        }

        .social-link:hover {
          background: rgba(147, 51, 234, 0.2);
          border-color: #9333ea;
          color: #a78bfa;
          transform: translateY(-3px);
        }

        /* Footer Links */
        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          flex: 1;
        }

        .footer-column-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-column-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-column-links a {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-column-links a:hover {
          color: #a78bfa;
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(147, 51, 234, 0.1);
        }

        .footer-copyright {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .heart {
          color: #e83e8c;
        }

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-links a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-bottom-links a:hover {
          color: #a78bfa;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .footer {
            padding: 60px 40px 30px;
          }

          .footer-top {
            flex-direction: column;
            gap: 40px;
          }

          .footer-brand {
            max-width: 100%;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .footer {
            padding: 40px 24px 30px;
          }

          .footer-links {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
