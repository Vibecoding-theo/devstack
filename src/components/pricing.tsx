'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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
    <section className="pricing-section">
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

              <button
                className={`plan-cta ${plan.popular ? 'primary' : 'secondary'}`}
              >
                {plan.cta}
              </button>
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

      <style jsx global>{`
        /* ===== PRICING SECTION ===== */
        .pricing-section {
          position: relative;
          padding: 100px 60px;
          background: #0a0a0f;
          overflow: hidden;
        }

        .noise-overlay-pricing {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Pricing Header */
        .pricing-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .pricing-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(147, 51, 234, 0.15);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 25px;
          padding: 8px 18px;
          font-size: 0.9rem;
          color: #ffffff;
          margin-bottom: 28px;
        }

        .badge-icon {
          font-size: 0.8rem;
        }

        .pricing-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1px;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .gradient-text {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pricing-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin: 0 auto 32px;
        }

        /* Toggle */
        .pricing-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 30px;
          padding: 6px;
        }

        .toggle-option {
          padding: 10px 24px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 24px;
          transition: all 0.3s;
          position: relative;
        }

        .toggle-option:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .toggle-option.active {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          color: #ffffff;
        }

        .save-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
          font-size: 0.7rem;
          border-radius: 10px;
          margin-left: 6px;
        }

        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 100px;
        }

        .pricing-card {
          position: relative;
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 24px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s;
        }

        .pricing-card:hover {
          border-color: rgba(147, 51, 234, 0.4);
          transform: translateY(-8px);
        }

        .pricing-card.popular {
          border-color: #e83e8c;
          background: rgba(232, 62, 140, 0.05);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .pricing-card-header {
          margin-bottom: 24px;
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .plan-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .pricing-card-price {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(147, 51, 234, 0.15);
        }

        .price-amount {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }

        .price-value {
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .price-currency {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.8);
        }

        .free-price {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .price-period {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .plan-features {
          list-style: none;
          margin-bottom: 32px;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .feature-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .plan-cta {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .plan-cta.primary {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          border: none;
          color: #ffffff;
        }

        .plan-cta.primary:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 30px rgba(232, 62, 140, 0.3);
        }

        .plan-cta.secondary {
          background: transparent;
          border: 2px solid rgba(147, 51, 234, 0.4);
          color: #ffffff;
        }

        .plan-cta.secondary:hover {
          border-color: #9333ea;
          background: rgba(147, 51, 234, 0.1);
        }

        /* FAQ Section */
        .faq-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
          margin-bottom: 48px;
        }

        .faq-grid {
          display: grid;
          gap: 24px;
        }

        .faq-item {
          background: rgba(15, 15, 25, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 16px;
          padding: 28px;
        }

        .faq-question {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .faq-answer {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .pricing-section {
            padding: 80px 40px;
          }

          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pricing-card:last-child {
            grid-column: span 2;
            max-width: 500px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .pricing-section {
            padding: 60px 24px;
          }

          .pricing-title {
            font-size: 2.25rem;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card:last-child {
            grid-column: span 1;
            max-width: 100%;
          }

          .price-value {
            font-size: 2.5rem;
          }

          .pricing-card {
            padding: 28px 20px;
          }

          .faq-item {
            padding: 20px;
          }

          .faq-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}
