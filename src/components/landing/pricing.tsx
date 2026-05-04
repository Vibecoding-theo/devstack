'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function Pricing({ id }: { id?: string }) {
  const { isAuthenticated, role } = useAuth();

  const freeCtaHref = isAuthenticated ? '/app' : '/auth?redirect=/app';

  const premiumCtaHref = isAuthenticated ? '/payment' : '/auth?redirect=/payment';

  return (
    <section id={id} className="pricing-section">
      <div className="noise-overlay-pricing" />

      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-badge">
            <span className="badge-icon">💳</span> Tarifs
          </div>

          <h2 className="pricing-title">
            Des prix simples.
            <br />
            <span className="gradient-text">Sans surprise.</span>
          </h2>

          <p className="pricing-description">
            Commence gratuitement, passe au Premium quand tu es prêt. Paiement unique, accès à vie.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid pricing-grid--two">
          {/* Free */}
          <div className={`pricing-card ${role === 'free' && isAuthenticated ? 'current' : ''}`}>
            {role === 'free' && isAuthenticated && <div className="current-badge">Plan actuel</div>}

            <div className="pricing-card-header">
              <h3 className="plan-name">Gratuit</h3>
              <p className="plan-description">Pour découvrir DevStack</p>
            </div>

            <div className="pricing-card-price">
              <div className="price-amount">
                <span className="free-price">0 €</span>
              </div>
              <div className="price-period">Pour toujours</div>
            </div>

            <ul className="plan-features">
              <li className="feature-item">
                <span className="feature-check">✓</span>
                3 composants maximum
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Import manuel
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Export JSON
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Recherche & filtres
              </li>
            </ul>

            <Link
              href={freeCtaHref}
              className="plan-cta secondary"
            >
              {isAuthenticated ? 'Plan actuel' : 'Commencer gratuitement'}
            </Link>
          </div>

          {/* Premium */}
          <div className={`pricing-card popular ${role === 'premium' && isAuthenticated ? 'current' : ''}`}>
            <div className="popular-badge">Recommandé</div>
            {role === 'premium' && isAuthenticated && <div className="current-badge inside">Plan actuel</div>}

            <div className="pricing-card-header">
              <h3 className="plan-name">Premium</h3>
              <p className="plan-description">Pour les développeurs sérieux</p>
            </div>

            <div className="pricing-card-price">
              <div className="price-amount">
                <span className="price-value">10</span>
                <span className="price-currency">€</span>
              </div>
              <div className="price-period">10 € TTC &middot; Paiement unique &middot; Accès à vie</div>
            </div>

            <ul className="plan-features">
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Composants illimités
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Import intelligent IA
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Export en tout format
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Génération de prompts
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Mises à jour à vie
              </li>
              <li className="feature-item">
                <span className="feature-check">✓</span>
                Support prioritaire
              </li>
            </ul>

            <Link
              href={role === 'premium' && isAuthenticated ? '/app' : premiumCtaHref}
              className="plan-cta primary"
            >
              {role === 'premium' && isAuthenticated ? 'Plan actuel' : 'Passer au Premium'}
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section" id="faq">
          <h3 className="faq-title">Questions fréquentes</h3>

          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-question">Le plan Gratuit est-il vraiment gratuit ?</h4>
              <p className="faq-answer">
                Oui, le plan Gratuit est gratuit pour toujours. Tu peux stocker jusqu&apos;à 3 composants sans aucune limite de temps.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Qu&apos;est-ce que le paiement unique ?</h4>
              <p className="faq-answer">
                Le Premium coûte 10 € une seule fois. Pas d&apos;abonnement, pas de frais cachés. Tu as accès à vie à toutes les fonctionnalités Premium.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Puis-je passer du Gratuit au Premium ?</h4>
              <p className="faq-answer">
                Absolument. Tu peux upgrader à tout moment, tes composants existants sont conservés automatiquement.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Mes composants sont-ils sécurisés ?</h4>
              <p className="faq-answer">
                Oui, tous tes composants sont chiffrés et stockés de manière sécurisée. Tu restes propriétaire de tout ton code.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
