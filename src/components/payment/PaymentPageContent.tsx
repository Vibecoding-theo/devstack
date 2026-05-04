'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './payment.css';

const PLAN_PRICE = 10;
const PLAN_NAME = 'Premium';

const FEATURES = [
  'Composants illimités',
  'Import intelligent IA',
  'Export en tout format',
  'Génération de prompts',
  'Mises à jour à vie',
  'Support prioritaire',
];

type PaymentStep = 'form' | 'loading' | 'success' | 'error';

export default function PaymentPageContent() {
  const [step, setStep] = useState<PaymentStep>('form');
  const [authChecked, setAuthChecked] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          if (data.user?.role === 'premium') {
            window.location.href = '/app';
          } else {
            setAuthChecked(true);
          }
        } else {
          window.location.href = '/auth?redirect=/payment';
        }
      })
      .catch(() => {
        window.location.href = '/auth?redirect=/payment';
      });
  }, []);

  const total = PLAN_PRICE;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMsg('Numéro de carte invalide');
      return;
    }
    if (!cardExpiry || !cardCvc || !cardName) {
      setErrorMsg('Tous les champs sont requis');
      return;
    }

    setStep('loading');

    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setStep('success');
      } else {
        setErrorMsg(data.error || 'Le paiement a échoué');
        setStep('error');
      }
    } catch {
      setErrorMsg('Erreur de connexion au serveur');
      setStep('error');
    }
  };

  const formatCardNumber = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  if (!authChecked) {
    return (
      <div className="payment-page">
        <div className="payment-bg-glow glow-1" />
        <div className="payment-bg-glow glow-2" />
        <div className="payment-bg-glow glow-3" />
        <div className="payment-loading-state">
          <span className="payment-spinner" />
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="payment-page">
        <div className="payment-bg-glow glow-1" />
        <div className="payment-bg-glow glow-2" />
        <div className="payment-bg-glow glow-3" />

        <div className="payment-card payment-success-card">
          <div className="success-checkmark">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="success-title">Paiement confirmé !</h2>
          <p className="success-desc">
            Ton plan <strong>{PLAN_NAME}</strong> est maintenant actif.
            Profite de toutes les fonctionnalités premium.
          </p>
          <Link href="/app" className="btn-success-cta">
            Accéder à mes composants
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-bg-glow glow-1" />
      <div className="payment-bg-glow glow-2" />
      <div className="payment-bg-glow glow-3" />

      <div className="payment-container">
        {/* Left — Summary */}
        <div className="payment-summary">
          <div className="payment-logo">
            <Link href="/">
              <span className="logo-dev">Dev</span>
              <span className="logo-stack">Stack</span>
            </Link>
          </div>

          <h2 className="payment-section-title">Récapitulatif</h2>

          <div className="plan-options">
            <div className="plan-option active" style={{ cursor: 'default' }}>
              <div className="plan-option-left">
                <div className="plan-radio">
                  <div className="plan-radio-dot" />
                </div>
                <div>
                  <div className="plan-option-name">{PLAN_NAME}</div>
                  <div className="plan-option-period">Paiement unique &middot; Accès à vie</div>
                </div>
              </div>
              <div className="plan-option-price">{PLAN_PRICE}€</div>
            </div>
          </div>

          <div className="payment-features">
            <h3 className="payment-features-title">Ce qui est inclus :</h3>
            <ul className="payment-features-list">
              {FEATURES.map((f, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="payment-total">
            <div className="payment-total-row">
              <span>Plan {PLAN_NAME} (à vie)</span>
              <span>{PLAN_PRICE}€</span>
            </div>
            <div className="payment-total-divider" />
            <div className="payment-total-row total-final">
              <span>Total TTC</span>
              <span>{total}€</span>
            </div>
          </div>
        </div>

        {/* Right — Payment form */}
        <div className="payment-form-wrap">
          <h2 className="payment-section-title">Informations de paiement</h2>

          <div className="card-preview">
            <div className="card-preview-inner">
              <div className="card-preview-top">
                <div className="card-preview-chip">
                  <svg width="40" height="30" viewBox="0 0 40 30">
                    <rect x="0" y="0" width="40" height="30" rx="4" fill="rgba(255,255,255,0.15)" />
                    <rect x="6" y="8" width="12" height="14" rx="2" fill="rgba(255,255,255,0.2)" />
                    <line x1="0" y1="12" x2="6" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="0" y1="18" x2="6" y2="18" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="18" y1="12" x2="24" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="18" y1="18" x2="24" y2="18" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  </svg>
                </div>
                <div className="card-preview-brand">VISA</div>
              </div>
              <div className="card-preview-number">
                {cardNumber || '•••• •••• •••• ••••'}
              </div>
              <div className="card-preview-bottom">
                <div className="card-preview-name">
                  {cardName || 'TON NOM'}
                </div>
                <div className="card-preview-expiry">
                  {cardExpiry || 'MM/AA'}
                </div>
              </div>
            </div>
          </div>

          <form className="payment-form" onSubmit={handlePay}>
            <div className="payment-field">
              <label htmlFor="cardName">Titulaire de la carte</label>
              <div className="payment-input-wrapper">
                <input
                  id="cardName"
                  type="text"
                  className="payment-input"
                  placeholder="Nom sur la carte"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  required
                  autoComplete="cc-name"
                  disabled={step === 'loading'}
                />
                <span className="input-icon">👤</span>
              </div>
            </div>

            <div className="payment-field">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <div className="payment-input-wrapper">
                <input
                  id="cardNumber"
                  type="text"
                  className="payment-input"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  required
                  autoComplete="cc-number"
                  inputMode="numeric"
                  disabled={step === 'loading'}
                />
                <span className="input-icon">💳</span>
              </div>
            </div>

            <div className="payment-row">
              <div className="payment-field">
                <label htmlFor="cardExpiry">Expiration</label>
                <div className="payment-input-wrapper">
                  <input
                    id="cardExpiry"
                    type="text"
                    className="payment-input"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    required
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    disabled={step === 'loading'}
                  />
                  <span className="input-icon">📅</span>
                </div>
              </div>
              <div className="payment-field">
                <label htmlFor="cardCvc">CVC</label>
                <div className="payment-input-wrapper">
                  <input
                    id="cardCvc"
                    type="text"
                    className="payment-input"
                    placeholder="123"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    disabled={step === 'loading'}
                  />
                  <span className="input-icon">🔒</span>
                </div>
              </div>
            </div>

            {errorMsg && <div className="payment-error">{errorMsg}</div>}

            <button
              type="submit"
              className="payment-submit"
              disabled={step === 'loading'}
            >
              {step === 'loading' ? (
                <span className="payment-loading">
                  <span className="payment-spinner" />
                  Traitement en cours...
                </span>
              ) : (
                <>
                  Payer {total}€
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="payment-security">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Paiement sécurisé par chiffrement SSL 256 bits
          </div>

          <div className="payment-guarantees">
            <div className="guarantee-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Garantie satisfait ou remboursé 30 jours
            </div>
            <div className="guarantee-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Paiement unique, accès à vie
            </div>
          </div>

          <div className="payment-footer">
            <Link href="/app">← Retour à l&apos;application</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
