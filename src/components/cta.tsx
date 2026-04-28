'use client';

import React from 'react';
import Link from 'next/link';

export default function CTA() {
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
            <Link href="/app" className="btn-cta-primary">
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

      <style jsx global>{`
        /* ===== CTA SECTION ===== */
        .cta-section {
          position: relative;
          padding: 120px 60px;
          background: #0a0a0f;
          overflow: hidden;
        }

        .noise-overlay-cta {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .cta-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta-content {
          text-align: center;
          position: relative;
        }

        /* Background Glows */
        .cta-glow-1 {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .cta-glow-2 {
          position: absolute;
          top: 30%;
          right: -15%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(232, 62, 140, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .cta-glow-3 {
          position: absolute;
          bottom: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(147, 51, 234, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }

        .cta-badge {
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

        .cta-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          color: #ffffff;
        }

        .gradient-text {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-description {
          font-size: 1.2rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .btn-cta-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          color: #ffffff;
          border: none;
          padding: 18px 36px;
          border-radius: 35px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 30px rgba(232, 62, 140, 0.3);
        }

        .btn-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(232, 62, 140, 0.4);
        }

        .btn-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s;
        }

        .btn-cta-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-cta-secondary {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(147, 51, 234, 0.5);
          padding: 16px 32px;
          border-radius: 35px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-cta-secondary:hover {
          border-color: #9333ea;
          background: rgba(147, 51, 234, 0.1);
        }

        .btn-play {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(232, 62, 140, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          padding-left: 2px;
        }

        .cta-social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .cta-avatars {
          display: flex;
        }

        .cta-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid #0a0a0f;
          margin-left: -12px;
        }

        .cta-avatar:first-child {
          margin-left: 0;
        }

        .cta-avatar-1 {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
        }

        .cta-avatar-2 {
          background: linear-gradient(135deg, #60a5fa, #34d399);
        }

        .cta-avatar-3 {
          background: linear-gradient(135deg, #fbbf24, #f97316);
        }

        .cta-avatar-4 {
          background: linear-gradient(135deg, #a78bfa, #6366f1);
        }

        .cta-avatar-more {
          background: rgba(147, 51, 234, 0.2);
          border: 3px solid #0a0a0f;
          color: #a78bfa;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-proof-text {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .cta-proof-text strong {
          font-weight: 700;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .cta-section {
            padding: 80px 24px;
          }

          .cta-title {
            font-size: 2.25rem;
            letter-spacing: -1px;
          }

          .cta-description {
            font-size: 1.05rem;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn-cta-primary,
          .btn-cta-secondary {
            width: 100%;
            justify-content: center;
          }

          .cta-social-proof {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
