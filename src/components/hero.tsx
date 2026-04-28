'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <Link href="/app" className="btn-primary">Explorer mes composants →</Link>
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

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
            sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ===== HERO SECTION ===== */
        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 60px 60px;
          background: #0a0a0f;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          width: 100%;
          margin: 0 auto;
          gap: 80px;
        }

        .hero-left {
          max-width: 650px;
          padding-top: 0;
          flex-shrink: 0;
          z-index: 10;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(147, 51, 234, 0.15);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 30px;
          padding: 12px 24px;
          font-size: 1.1rem;
          color: #ffffff;
          margin-bottom: 40px;
        }

        .hero-tag .tag-icon {
          width: 22px;
          height: 22px;
          background: #e83e8c;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .hero-left h1 {
          font-size: 5rem;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 32px;
        }

        .hero-left h1 .line1 {
          color: #ffffff;
        }

        .hero-left h1 .line2 {
          color: #ffffff;
        }

        .hero-left h1 .line3 {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
        }

        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #e83e8c;
          color: #ffffff;
          border: none;
          padding: 18px 36px;
          border-radius: 35px;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #d63384;
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(147, 51, 234, 0.5);
          padding: 18px 36px;
          border-radius: 35px;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .btn-secondary:hover {
          border-color: #9333ea;
        }

        .social-proof {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.55);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-proof .heart {
          color: #e83e8c;
        }

        /* ===== HERO RIGHT (VISUAL) ===== */
        .hero-right {
          flex: 1;
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Background glow */
        .hero-right::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(147, 51, 234, 0.2) 0%,
            rgba(232, 62, 140, 0.1) 40%,
            transparent 70%
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          filter: blur(40px);
        }

        /* 3D Cubes */
        .cubes-container {
          position: relative;
          width: 400px;
          height: 400px;
          perspective: 800px;
        }

        .cube {
          position: absolute;
          width: 130px;
          height: 130px;
          transform-style: preserve-3d;
        }

        .cube-top {
          top: 40px;
          left: 135px;
          transform: rotateX(-25deg) rotateY(35deg) translateZ(25px);
        }

        .cube-mid {
          top: 120px;
          left: 115px;
          transform: rotateX(-25deg) rotateY(35deg) translateZ(-13px);
        }

        .cube-bottom {
          top: 200px;
          left: 95px;
          transform: rotateX(-25deg) rotateY(35deg) translateZ(-50px);
        }

        .cube-face {
          position: absolute;
          width: 130px;
          height: 130px;
          border: 1px solid rgba(147, 51, 234, 0.3);
        }

        .cube-top .cube-face.front {
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.4),
            rgba(232, 62, 140, 0.3)
          );
          transform: translateZ(50px);
        }

        .cube-top .cube-face.back {
          background: rgba(88, 28, 135, 0.3);
          transform: translateZ(-50px) rotateY(180deg);
        }

        .cube-top .cube-face.left {
          background: rgba(88, 28, 135, 0.4);
          transform: translateX(-50px) rotateY(-90deg);
        }

        .cube-top .cube-face.right {
          background: rgba(147, 51, 234, 0.25);
          transform: translateX(50px) rotateY(90deg);
        }

        .cube-top .cube-face.top {
          background: linear-gradient(
            135deg,
            rgba(232, 62, 140, 0.3),
            rgba(147, 51, 234, 0.4)
          );
          transform: translateY(-50px) rotateX(90deg);
        }

        .cube-top .cube-face.bottom {
          background: rgba(10, 10, 15, 0.8);
          transform: translateY(50px) rotateX(-90deg);
        }

        .cube-mid .cube-face.front {
          background: rgba(88, 28, 135, 0.35);
          transform: translateZ(50px);
        }

        .cube-mid .cube-face.back {
          background: rgba(10, 10, 15, 0.5);
          transform: translateZ(-50px) rotateY(180deg);
        }

        .cube-mid .cube-face.left {
          background: rgba(10, 10, 15, 0.6);
          transform: translateX(-50px) rotateY(-90deg);
        }

        .cube-mid .cube-face.right {
          background: rgba(88, 28, 135, 0.3);
          transform: translateX(50px) rotateY(90deg);
        }

        .cube-mid .cube-face.top {
          background: rgba(147, 51, 234, 0.2);
          transform: translateY(-50px) rotateX(90deg);
        }

        .cube-mid .cube-face.bottom {
          background: rgba(10, 10, 15, 0.9);
          transform: translateY(50px) rotateX(-90deg);
        }

        .cube-bottom .cube-face.front {
          background: rgba(10, 10, 15, 0.7);
          transform: translateZ(50px);
        }

        .cube-bottom .cube-face.back {
          background: rgba(10, 10, 15, 0.4);
          transform: translateZ(-50px) rotateY(180deg);
        }

        .cube-bottom .cube-face.left {
          background: rgba(10, 10, 15, 0.5);
          transform: translateX(-50px) rotateY(-90deg);
        }

        .cube-bottom .cube-face.right {
          background: rgba(88, 28, 135, 0.2);
          transform: translateX(50px) rotateY(90deg);
        }

        .cube-bottom .cube-face.top {
          background: rgba(88, 28, 135, 0.15);
          transform: translateY(-50px) rotateX(90deg);
        }

        .cube-bottom .cube-face.bottom {
          background: rgba(10, 10, 15, 0.9);
          transform: translateY(50px) rotateX(-90deg);
        }

        /* Cube code icon */
        .cube-code-icon {
          position: absolute;
          top: 70px;
          left: 170px;
          z-index: 10;
          width: 50px;
          height: 50px;
          background: rgba(232, 62, 140, 0.2);
          border: 1px solid rgba(232, 62, 140, 0.4);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #e83e8c;
          box-shadow: 0 0 20px rgba(232, 62, 140, 0.3);
        }

        /* Floating UI Cards */
        .floating-card {
          position: absolute;
          background: rgba(15, 15, 25, 0.9);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(147, 51, 234, 0.15);
        }

        .card-header-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .card-header-icon {
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: #a78bfa;
        }

        .card-content {
          padding: 12px 14px;
        }

        /* Preview Card */
        .preview-card {
          top: 0;
          right: 0;
          width: 280px;
        }

        .preview-content {
          padding: 20px;
        }

        .mini-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 75px;
        }

        /* Code Card */
        .code-card {
          bottom: 80px;
          right: -30px;
          width: 300px;
        }

        .code-content {
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.85rem;
          color: #a78bfa;
          line-height: 1.7;
        }

        /* Prompt Card */
        .prompt-card {
          bottom: 30px;
          left: -40px;
          width: 280px;
        }

        .prompt-content {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        /* Stats Card */
        .stats-card {
          top: 70px;
          left: -50px;
          width: 220px;
        }

        .stats-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 8px;
        }

        .stats-value {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .mini-chart .bar {
          flex: 1;
          border-radius: 3px 3px 0 0;
          background: linear-gradient(
            to top,
            rgba(147, 51, 234, 0.5),
            rgba(232, 62, 140, 0.5)
          );
        }

        .mini-chart .bar:nth-child(1) {
          height: 40%;
        }

        .mini-chart .bar:nth-child(2) {
          height: 65%;
        }

        .mini-chart .bar:nth-child(3) {
          height: 45%;
        }

        .mini-chart .bar:nth-child(4) {
          height: 80%;
        }

        .mini-chart .bar:nth-child(5) {
          height: 55%;
        }

        .mini-chart .bar:nth-child(6) {
          height: 70%;
        }

        .mini-chart .bar:nth-child(7) {
          height: 90%;
        }

        /* Code Card */
        .code-card {
          bottom: 60px;
          right: -20px;
          width: 240px;
        }

        .code-content {
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.7rem;
          color: #a78bfa;
          line-height: 1.6;
        }

        .code-content .keyword {
          color: #e83e8c;
        }

        .code-content .string {
          color: #34d399;
        }

        .code-content .comment {
          color: rgba(255, 255, 255, 0.3);
        }

        .code-content .func {
          color: #60a5fa;
        }

        .btn-copy {
          background: rgba(147, 51, 234, 0.2);
          border: 1px solid rgba(147, 51, 234, 0.3);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.65rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Prompt Card */
        .prompt-card {
          bottom: 20px;
          left: -30px;
          width: 220px;
        }

        .prompt-content {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .prompt-content .highlight {
          color: #a78bfa;
        }

        .prompt-footer {
          margin-top: 10px;
          text-align: right;
        }

        .badge-ia {
          background: rgba(147, 51, 234, 0.2);
          color: #a78bfa;
          font-size: 0.6rem;
          padding: 2px 8px;
          border-radius: 10px;
          border: 1px solid rgba(147, 51, 234, 0.3);
        }

        /* Stats Card */
        .stats-card {
          top: 50px;
          left: -40px;
          width: 180px;
        }

        .stats-content {
          text-align: center;
        }

        .stats-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 6px;
        }

        .stats-value {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .stats-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .stats-bar-fill {
          width: 78%;
          height: 100%;
          background: linear-gradient(90deg, #e83e8c, #9333ea);
          border-radius: 2px;
        }

        /* Connecting lines (decorative) */
        .glow-line {
          position: absolute;
          background: linear-gradient(90deg, rgba(147, 51, 234, 0.4), rgba(232, 62, 140, 0.2));
          height: 1px;
          width: 80px;
          filter: blur(1px);
        }

        .glow-line-1 {
          top: 180px;
          left: 60px;
          transform: rotate(25deg);
        }

        .glow-line-2 {
          top: 200px;
          right: 40px;
          transform: rotate(-30deg);
        }

        .glow-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #e83e8c;
          box-shadow: 0 0 8px rgba(232, 62, 140, 0.6);
        }

        .glow-dot-1 {
          top: 100px;
          right: 230px;
        }

        .glow-dot-2 {
          bottom: 120px;
          left: 180px;
        }

        .glow-dot-3 {
          top: 60px;
          left: 50px;
        }

        /* Sparkle particles */
        .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.6);
        }

        .sparkle-1 {
          top: 40px;
          left: 200px;
        }

        .sparkle-2 {
          top: 250px;
          right: 30px;
          width: 2px;
          height: 2px;
          background: rgba(232, 62, 140, 0.4);
        }

        .sparkle-3 {
          bottom: 80px;
          right: 120px;
          width: 2px;
          height: 2px;
          background: rgba(232, 62, 140, 0.5);
        }

        .sparkle-4 {
          top: 150px;
          left: 50px;
          width: 2px;
          height: 2px;
        }

        .sparkle-5 {
          top: 300px;
          right: 200px;
          width: 2px;
          height: 2px;
          background: rgba(232, 62, 140, 0.3);
        }

        /* Noise texture overlay */
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          z-index: 1000;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Avatar group for social proof */
        .avatar-group {
          display: flex;
          margin-right: 10px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid #0a0a0f;
          margin-left: -10px;
        }

        .avatar:first-child {
          margin-left: 0;
        }

        .avatar-1 {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
        }

        .avatar-2 {
          background: linear-gradient(135deg, #60a5fa, #34d399);
        }

        .avatar-3 {
          background: linear-gradient(135deg, #fbbf24, #f97316);
        }

        .avatar-4 {
          background: linear-gradient(135deg, #a78bfa, #6366f1);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .hero-section {
            padding: 30px 40px 40px;
            min-height: auto;
          }

          .hero-container {
            flex-direction: column;
            gap: 40px;
          }

          .hero-left {
            max-width: 100%;
            text-align: center;
          }

          .hero-tag {
            justify-content: center;
          }

          .hero-left h1 {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .social-proof {
            justify-content: center;
            flex-direction: column;
            gap: 12px;
          }

          .avatar-group {
            margin-right: 0;
            margin-bottom: 4px;
          }

          .hero-right {
            min-height: 400px;
          }

          .cubes-container {
            width: 250px;
            height: 250px;
          }

          .cube {
            width: 80px;
            height: 80px;
          }

          .cube-face {
            width: 80px;
            height: 80px;
          }

          .cube-top {
            top: 25px;
            left: 85px;
            transform: rotateX(-25deg) rotateY(35deg) translateZ(15px);
          }

          .cube-mid {
            top: 70px;
            left: 75px;
            transform: rotateX(-25deg) rotateY(35deg) translateZ(-8px);
          }

          .cube-bottom {
            top: 115px;
            left: 65px;
            transform: rotateX(-25deg) rotateY(35deg) translateZ(-30px);
          }

          .cube-code-icon {
            top: 45px;
            left: 105px;
            width: 32px;
            height: 32px;
            font-size: 0.7rem;
          }

          .preview-card {
            width: 180px;
            right: -10px;
          }

          .code-card {
            width: 200px;
            right: 0;
            bottom: 40px;
          }

          .prompt-card {
            width: 180px;
            left: -10px;
            bottom: 10px;
          }

          .stats-card {
            width: 150px;
            left: -20px;
            top: 30px;
          }

          .stats-value {
            font-size: 1.2rem;
          }

          .code-content {
            font-size: 0.6rem;
          }

          .prompt-content {
            font-size: 0.65rem;
          }

          .mini-chart {
            height: 45px;
          }

          .card-header-title,
          .btn-copy {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 20px 24px 30px;
          }

          .hero-left h1 {
            font-size: 2rem;
            letter-spacing: -0.5px;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-right {
            min-height: 320px;
          }

          .cubes-container {
            width: 200px;
            height: 200px;
          }

          .cube {
            width: 65px;
            height: 65px;
          }

          .cube-face {
            width: 65px;
            height: 65px;
          }

          .cube-top {
            top: 20px;
            left: 67px;
          }

          .cube-mid {
            top: 55px;
            left: 60px;
          }

          .cube-bottom {
            top: 90px;
            left: 52px;
          }

          .cube-code-icon {
            top: 38px;
            left: 85px;
            width: 28px;
            height: 28px;
            font-size: 0.6rem;
          }

          .preview-card {
            width: 150px;
            right: 0;
            top: -10px;
          }

          .code-card {
            width: 160px;
            right: -20px;
            bottom: 20px;
          }

          .prompt-card {
            width: 150px;
            left: 0;
            bottom: -10px;
          }

          .stats-card {
            width: 130px;
            left: 0;
            top: 10px;
          }

          .mini-chart {
            height: 35px;
          }

          .card-header-title,
          .btn-copy {
            font-size: 0.6rem;
            padding: 4px 8px;
          }

          .card-header {
            padding: 8px 10px;
          }

          .card-content {
            padding: 10px;
          }

          .code-content {
            font-size: 0.55rem;
            line-height: 1.4;
          }

          .prompt-content {
            font-size: 0.6rem;
            line-height: 1.3;
          }

          .glow-line {
            display: none;
          }

          .sparkle {
            display: none;
          }

          .hero-tag {
            font-size: 0.8rem;
            padding: 6px 14px;
          }

          .social-proof {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}
