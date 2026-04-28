'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function Features({ id }: { id?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: '🗃',
      title: 'Bibliothèque Centralisée',
      description: 'Tous tes composants au même endroit. Plus de recherche dans tes vieux projets.',
      color: '#e83e8c',
    },
    {
      icon: '⚡',
      title: 'Import Intelligent',
      description: 'Copie-colle un composant, notre IA le détecte et l\'organise automatiquement.',
      color: '#9333ea',
    },
    {
      icon: '🤖',
      title: 'Génération par IA',
      description: 'Laisse l\'IA créer des composants personnalisés basés sur tes préférences.',
      color: '#e83e8c',
    },
    {
      icon: '🎨',
      title: 'Personnalisation Facile',
      description: 'Adapte chaque composant à ton style en quelques clics.',
      color: '#9333ea',
    },
    {
      icon: '🔍',
      title: 'Recherche Instantanée',
      description: 'Trouve exactement ce que tu cherches en une fraction de seconde.',
      color: '#e83e8c',
    },
    {
      icon: '📦',
      title: 'Collections Organisées',
      description: 'Groupe tes composants par projet, style ou fonctionnalité.',
      color: '#9333ea',
    },
  ];

  const tabs = [
    {
      label: 'Bibliothèque',
      icon: '🗃',
      description: 'Centralise et organise tous tes composants React',
    },
    {
      label: 'IA Smart',
      icon: '🤖',
      description: 'L\'IA qui comprend et génère ton code',
    },
    {
      label: 'Collections',
      icon: '📦',
      description: 'Organise intelligemment par projet ou thème',
    },
  ];

  return (
    <section id={id} className="features-section">
      <div className="noise-overlay-features" />

      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <div className="feature-badge">
            <span className="badge-icon">✨</span> Fonctionnalités
          </div>

          <h2 className="features-title">
            Tout ce dont tu as besoin.
            <br />
            <span className="gradient-text">Rien de superflu.</span>
          </h2>

          <p className="features-description">
            Une suite d\'outils pensée pour les développeurs, par des développeurs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="feature-icon-wrapper" style={{ color: feature.color }}>
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-glow" style={{ background: feature.color }} />
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="demo-section">
          <div className="demo-header">
            <h3 className="demo-title">Découvre en action</h3>
            <div className="demo-tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`demo-tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="demo-content">
            <div className="demo-visual" ref={scrollRef}>
              {activeTab === 0 && (
                <div className="demo-panel library-panel">
                  <div className="panel-header">
                    <div className="panel-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="panel-title">Ma Bibliothèque</span>
                  </div>
                  <div className="panel-content">
                    <div className="library-list">
                      <div className="library-item">
                        <span className="item-icon">🔘</span>
                        <span className="item-name">Button.tsx</span>
                        <span className="item-tag">UI</span>
                      </div>
                      <div className="library-item">
                        <span className="item-icon">📝</span>
                        <span className="item-name">Input.tsx</span>
                        <span className="item-tag">Forms</span>
                      </div>
                      <div className="library-item">
                        <span className="item-icon">🗂</span>
                        <span className="item-name">Card.tsx</span>
                        <span className="item-tag">Layout</span>
                      </div>
                      <div className="library-item">
                        <span className="item-icon">🎯</span>
                        <span className="item-name">Modal.tsx</span>
                        <span className="item-tag">Modal</span>
                      </div>
                      <div className="library-item">
                        <span className="item-icon">📊</span>
                        <span className="item-name">Chart.tsx</span>
                        <span className="item-tag">Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="demo-panel ai-panel">
                  <div className="panel-header">
                    <div className="panel-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="panel-title">IA Smart</span>
                  </div>
                  <div className="panel-content">
                    <div className="ai-chat">
                      <div className="chat-message ai-message">
                        <span className="message-avatar">🤖</span>
                        <div className="message-content">
                          <span className="highlight">Analyse du composant...</span>
                          <br />
                          J\'ai détecté un bouton avec gradient pink-purple.
                        </div>
                      </div>
                      <div className="chat-message user-message">
                        <span className="message-avatar">👤</span>
                        <div className="message-content">
                          Génère une variante avec hover effect
                        </div>
                      </div>
                      <div className="chat-message ai-message">
                        <span className="message-avatar">🤖</span>
                        <div className="message-content">
                          <span className="code-snippet">
                            &lt;button className="btn-primary hover:scale-105"&gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="demo-panel collections-panel">
                  <div className="panel-header">
                    <div className="panel-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="panel-title">Collections</span>
                  </div>
                  <div className="panel-content">
                    <div className="collections-grid">
                      <div className="collection-card">
                        <div className="collection-icon">🎨</div>
                        <div className="collection-name">UI Kit</div>
                        <div className="collection-count">24 composants</div>
                      </div>
                      <div className="collection-card">
                        <div className="collection-icon">📝</div>
                        <div className="collection-name">Forms</div>
                        <div className="collection-count">12 composants</div>
                      </div>
                      <div className="collection-card">
                        <div className="collection-icon">📊</div>
                        <div className="collection-name">Dashboard</div>
                        <div className="collection-count">18 composants</div>
                      </div>
                      <div className="collection-card">
                        <div className="collection-icon">🔐</div>
                        <div className="collection-name">Auth</div>
                        <div className="collection-count">8 composants</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="demo-info">
              <h4 className="demo-info-title">{tabs[activeTab].label}</h4>
              <p className="demo-info-description">{tabs[activeTab].description}</p>
              <div className="demo-stats">
                <div className="stat-item">
                  <span className="stat-value">
                    {activeTab === 0 ? '1,234' : activeTab === 1 ? '98%' : '15'}
                  </span>
                  <span className="stat-label">
                    {activeTab === 0 ? 'Composants' : activeTab === 1 ? 'Précision' : 'Collections'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ===== FEATURES SECTION ===== */
        .features-section {
          position: relative;
          padding: 100px 60px;
          background: #0a0a0f;
          overflow: hidden;
        }

        .noise-overlay-features {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Features Header */
        .features-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .feature-badge {
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

        .features-title {
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

        .features-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 100px;
        }

        .feature-card {
          position: relative;
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 20px;
          padding: 32px 28px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(147, 51, 234, 0.4);
        }

        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(147, 51, 234, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .feature-icon {
          font-size: 1.5rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .feature-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
        }

        .feature-glow {
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          filter: blur(60px);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Demo Section */
        .demo-section {
          background: rgba(15, 15, 25, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 24px;
          overflow: hidden;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1px solid rgba(147, 51, 234, 0.15);
        }

        .demo-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .demo-tabs {
          display: flex;
          gap: 12px;
        }

        .demo-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 25px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .demo-tab:hover {
          border-color: #9333ea;
          color: #ffffff;
        }

        .demo-tab.active {
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          border-color: transparent;
          color: #ffffff;
        }

        .tab-icon {
          font-size: 1rem;
        }

        .demo-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 0;
        }

        .demo-visual {
          padding: 40px;
          border-right: 1px solid rgba(147, 51, 234, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        /* Demo Panels */
        .demo-panel {
          width: 100%;
          max-width: 400px;
          background: rgba(10, 10, 15, 0.9);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(15, 15, 25, 0.8);
          border-bottom: 1px solid rgba(147, 51, 234, 0.15);
        }

        .panel-dots {
          display: flex;
          gap: 6px;
        }

        .panel-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.3);
        }

        .panel-dots span:nth-child(1) {
          background: #e83e8c;
        }

        .panel-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #a78bfa;
        }

        .panel-content {
          padding: 20px;
        }

        /* Library Panel */
        .library-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .library-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(147, 51, 234, 0.05);
          border: 1px solid rgba(147, 51, 234, 0.1);
          border-radius: 10px;
          transition: all 0.2s;
        }

        .library-item:hover {
          background: rgba(147, 51, 234, 0.1);
          border-color: rgba(147, 51, 234, 0.3);
        }

        .item-icon {
          font-size: 1rem;
        }

        .item-name {
          flex: 1;
          font-size: 0.9rem;
          color: #ffffff;
        }

        .item-tag {
          font-size: 0.7rem;
          padding: 3px 10px;
          background: rgba(232, 62, 140, 0.2);
          color: #e83e8c;
          border-radius: 20px;
        }

        /* AI Panel */
        .ai-chat {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-message {
          display: flex;
          gap: 12px;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .ai-message .message-avatar {
          background: rgba(147, 51, 234, 0.2);
        }

        .user-message .message-avatar {
          background: rgba(232, 62, 140, 0.2);
        }

        .message-content {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }

        .ai-message .message-content {
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.2);
        }

        .user-message .message-content {
          background: rgba(232, 62, 140, 0.1);
          border: 1px solid rgba(232, 62, 140, 0.2);
        }

        .highlight {
          color: #a78bfa;
          font-weight: 500;
        }

        .code-snippet {
          font-family: 'Fira Code', 'Cascadia Code', monospace;
          font-size: 0.75rem;
          color: #34d399;
        }

        /* Collections Panel */
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .collection-card {
          padding: 16px;
          background: rgba(147, 51, 234, 0.05);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 12px;
          text-align: center;
          transition: all 0.2s;
        }

        .collection-card:hover {
          background: rgba(147, 51, 234, 0.1);
          border-color: rgba(147, 51, 234, 0.3);
        }

        .collection-icon {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .collection-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .collection-count {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Demo Info */
        .demo-info {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .demo-info-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .demo-info-description {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 32px;
        }

        .demo-stats {
          padding: 24px;
          background: rgba(147, 51, 234, 0.05);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 16px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .features-section {
            padding: 80px 40px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .demo-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .demo-tabs {
            flex-wrap: wrap;
            justify-content: center;
          }

          .demo-content {
            grid-template-columns: 1fr;
          }

          .demo-visual {
            border-right: none;
            border-bottom: 1px solid rgba(147, 51, 234, 0.15);
            padding: 30px 20px;
            min-height: auto;
          }

          .demo-info {
            padding: 30px 20px;
          }
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 60px 24px;
          }

          .features-title {
            font-size: 2.25rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .demo-tab {
            padding: 8px 16px;
            font-size: 0.85rem;
          }

          .demo-title {
            font-size: 1.25rem;
          }

          .collections-grid {
            grid-template-columns: 1fr;
          }

          .demo-panel {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
