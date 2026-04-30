'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const ctaHref = isAuthenticated ? '/app' : '/auth';

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <section className="hero-section">
        <div className="hero-container">
          {/* LEFT CONTENT */}
          <div className="hero-left">
            <div className="hero-tag">
              <span className="tag-icon">★</span>
              Ta bibliothèque. Ton super pouvoir.
            </div>

            <h1>
              <span className="line1">Réutilise.</span>
              <br />
              <span className="line2">Gagne du temps.</span>
              <br />
              <span className="line3">Crée mieux.</span>
            </h1>

            <p className="hero-subtitle">
              Centralise tous tes composants. Réutilise-les partout. Laisse l&apos;IA t&apos;aider à les
              intégrer parfaitement.
            </p>

            <div className="hero-buttons">
              <Link href={ctaHref} className="btn-primary">Explorer mes composants →</Link>
              <button className="btn-secondary">Voir comment ça marche</button>
            </div>

            <div className="social-proof">
              <div className="avatar-group">
                <div className="avatar avatar-1" />
                <div className="avatar avatar-2" />
                <div className="avatar avatar-3" />
                <div className="avatar avatar-4" />
              </div>
              Déjà adopté par des développeurs qui aiment aller vite et bien.{' '}
              <span className="heart">♥</span>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hero-right">
            {/* Glow effects */}
            <div className="glow-line glow-line-1" />
            <div className="glow-line glow-line-2" />
            <div className="glow-dot glow-dot-1" />
            <div className="glow-dot glow-dot-2" />
            <div className="glow-dot glow-dot-3" />
            <div className="sparkle sparkle-1" />
            <div className="sparkle sparkle-2" />
            <div className="sparkle sparkle-3" />
            <div className="sparkle sparkle-4" />
            <div className="sparkle sparkle-5" />

            {/* 3D Cubes */}
            <div className="cubes-container">
              <div className="cube cube-top">
                <div className="cube-face front" />
                <div className="cube-face back" />
                <div className="cube-face left" />
                <div className="cube-face right" />
                <div className="cube-face top" />
                <div className="cube-face bottom" />
              </div>
              <div className="cube cube-mid">
                <div className="cube-face front" />
                <div className="cube-face back" />
                <div className="cube-face left" />
                <div className="cube-face right" />
                <div className="cube-face top" />
                <div className="cube-face bottom" />
              </div>
              <div className="cube cube-bottom">
                <div className="cube-face front" />
                <div className="cube-face back" />
                <div className="cube-face left" />
                <div className="cube-face right" />
                <div className="cube-face top" />
                <div className="cube-face bottom" />
              </div>
              <div className="cube-code-icon">&lt;/&gt;</div>
            </div>

            {/* Preview Card */}
            <div className="floating-card preview-card">
              <div className="card-header">
                <span className="card-header-title">
                  <span className="card-header-icon">👁</span> Preview
                </span>
                <button className="btn-copy">📋 Copier le code</button>
              </div>
              <div className="card-content preview-content">
                <div className="mini-chart">
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                </div>
              </div>
            </div>

            {/* Code Card */}
            <div className="floating-card code-card">
              <div className="card-header">
                <span className="card-header-title">
                  <span className="card-header-icon">📄</span> Code
                </span>
                <button className="btn-copy">📋</button>
              </div>
              <div className="card-content">
                <div className="code-content">
                  <span className="comment">// Component</span>
                  <br />
                  <span className="keyword">
                    export
                  </span>{' '}
                  <span className="keyword">
                    const
                  </span>{' '}
                  <span className="func">Button</span> = () =&gt; {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="keyword">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="string">button</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=
                  <span className="string">&quot;btn-primary&quot;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clique ici
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="string">button</span>&gt;
                  <br />
                  &nbsp;&nbsp;)
                  <br />
                  {'}'}
                </div>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="floating-card prompt-card">
              <div className="card-header">
                <span className="card-header-title">
                  <span className="card-header-icon">✨</span> Prompt IA
                </span>
                <span className="badge-ia">Généré</span>
              </div>
              <div className="card-content">
                <div className="prompt-content">
                  Crée un bouton avec{' '}
                  <span className="highlight">gradient pink-purple</span>, coins arrondis, et
                  animation hover...
                </div>
                <div className="prompt-footer">
                  <button className="btn-copy">📋 Copier le prompt</button>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="floating-card stats-card">
              <div className="card-content">
                <div className="stats-content">
                  <div className="stats-label">Temps gagné</div>
                  <div className="stats-value">+10h / semaine</div>
                  <div className="stats-bar">
                    <div className="stats-bar-fill" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
