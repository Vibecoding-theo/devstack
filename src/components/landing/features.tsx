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
                    {activeTab === 0 ? '239' : activeTab === 1 ? '98%' : '15'}
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

    </section>
  );
}
