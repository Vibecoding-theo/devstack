'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function Pricing({ id }: { id?: string }) {
  const [isYearly, setIsYearly] = useState(false);
  const { isAuthenticated } = useAuth();
  const ctaHref = isAuthenticated ? '/app' : '/auth';

  const plans = [
    {
      name: 'Starter',
      description: 'Parfait pour découvrir',
      price: { monthly: 0, yearly: 0 },
      features: [
        '100 composants',
        'Import manuel',
        '1 collection',
        'Support email',
      ],
      cta: 'Commencer gratuitement',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Pour les développeurs sérieux',
      price: { monthly: 9, yearly: 7 },
      features: [
        'Composants illimités',
        'Import intelligent IA',
        'Collections illimitées',
        'Génération par IA',
        'Export en tout format',
        'Support prioritaire',
      ],
      cta: 'Essai gratuit 14 jours',
      popular: true,
    },
    {
      name: 'Team',
      description: 'Pour les équipes qui collaborent',
      price: { monthly: 29, yearly: 24 },
      features: [
        'Tout dans Pro',
        '5 membres inclus',
        'Collaboration en temps réel',
        'Administration avancée',
        'SSO & Sécurité',
        'API access',
        'Support dédié',
      ],
      cta: 'Contacter les ventes',
      popular: false,
    },
  ];

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
            Commence gratuitement, évolue quand tu es prêt. Annule à tout moment.
          </p>

          {/* Toggle */}
          <div className="pricing-toggle">
            <button
              className={`toggle-option ${!isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(false)}
            >
              Mensuel
            </button>
            <button
              className={`toggle-option ${isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(true)}
            >
              Annuel
              <span className="save-badge">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Le plus populaire</div>}

              <div className="pricing-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="pricing-card-price">
                <div className="price-amount">
                  {plan.price.monthly === 0 ? (
                    <span className="free-price">Gratuit</span>
                  ) : (
                    <>
                      <span className="price-value">
                        {isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="price-currency">€</span>
                    </>
                  )}
                </div>
                <div className="price-period">
                  {plan.price.monthly === 0
                    ? 'Pour toujours'
                    : isYearly
                    ? '/mois, facturé annuellement'
                    : '/mois'}
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={ctaHref}
                className={`plan-cta ${plan.popular ? 'primary' : 'secondary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h3 className="faq-title">Questions fréquentes</h3>

          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-question">Puis-je essayer gratuitement ?</h4>
              <p className="faq-answer">
                Oui ! Le plan Starter est gratuit pour toujours. Le plan Pro inclut un essai
                gratuit de 14 jours sans carte bancaire.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Puis-je changer de plan ?</h4>
              <p className="faq-answer">
                Absolument. Tu peux mettre à niveau ou rétrograder ton plan à tout moment depuis
                ton tableau de bord.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Mes composants sont-ils sécurisés ?</h4>
              <p className="faq-answer">
                Oui, tous tes composants sont chiffrés et stockés de manière sécurisée. Tu restes
                propriétaire de tout ton code.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Puis-je annuler mon abonnement ?</h4>
              <p className="faq-answer">
                Bien sûr. Tu peux annuler à tout moment. Tu conserveras l&apos;accès jusqu&apos;à
                la fin de ta période de facturation.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
