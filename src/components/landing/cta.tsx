'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function CTA() {
  const { isAuthenticated } = useAuth();
  const ctaHref = isAuthenticated ? '/app' : '/auth';

  return (
    <section className="cta-section">
      <div className="noise-overlay-cta" />

      <div className="cta-container">
        <div className="cta-content">
          {/* Background glow */}
          <div className="cta-glow-1" />
          <div className="cta-glow-2" />
          <div className="cta-glow-3" />

          <div className="cta-badge">
            <span className="badge-icon">🚀</span> Prêt à accélérer ?
          </div>

          <h2 className="cta-title">
            Commence à construire
            <br />
            <span className="gradient-text">plus rapidement.</span>
          </h2>

          <p className="cta-description">
            Rejoins des milliers de développeurs qui économisent des heures chaque semaine avec
            DevStack. C&apos;est gratuit pour toujours.
          </p>

          <div className="cta-buttons">
            <Link href={ctaHref} className="btn-cta-primary">
              Commencer gratuitement
              <span className="btn-arrow">→</span>
            </Link>
            <button className="btn-cta-secondary">
              Voir une démo
              <span className="btn-play">▶</span>
            </button>
          </div>

          <div className="cta-social-proof">
            <div className="cta-avatars">
              <div className="cta-avatar cta-avatar-1" />
              <div className="cta-avatar cta-avatar-2" />
              <div className="cta-avatar cta-avatar-3" />
              <div className="cta-avatar cta-avatar-4" />
              <div className="cta-avatar cta-avatar-more">+9K</div>
            </div>
            <span className="cta-proof-text">
              Rejoins <strong className="gradient-text">10,000+</strong> développeurs
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
