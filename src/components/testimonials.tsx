'use client';

import React, { useState } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Marie Dupont',
      role: 'Senior Frontend Developer',
      company: 'TechStartup',
      avatar: '👩‍💻',
      content:
        'DevStack a transformé ma façon de travailler. Je gagne au moins 10h par semaine en réutilisant mes composants. L\'IA comprend exactement ce que je veux.',
      rating: 5,
    },
    {
      name: 'Thomas Martin',
      role: 'Full Stack Developer',
      company: 'Agence Digital',
      avatar: '👨‍💻',
      content:
        'La fonction d\'import intelligent est incroyable. Je copie-colle un composant et il est automatiquement organisé dans ma bibliothèque. Magique !',
      rating: 5,
    },
    {
      name: 'Sophie Laurent',
      role: 'Lead Developer',
      company: 'Fintech Corp',
      avatar: '👩‍🔬',
      content:
        'Notre équipe a adopté DevStack en une semaine. La collaboration sur les composants est devenue fluide et les délais de projet ont diminué de 30%.',
      rating: 5,
    },
    {
      name: 'Alexandre Petit',
      role: 'Freelance Developer',
      company: 'Indépendant',
      avatar: '🧑‍💻',
      content:
        'En tant que freelance, je jongle entre plusieurs projets. DevStack me permet de garder mes meilleurs composants à portée de main et de livrer plus vite.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Développeurs actifs' },
    { value: '500,000+', label: 'Composants créés' },
    { value: '98%', label: 'Satisfaction' },
    { value: '30%', label: 'Gain de temps moyen' },
  ];

  return (
    <section className="testimonials-section">
      <div className="noise-overlay-testimonials" />

      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <div className="testimonial-badge">
            <span className="badge-icon">💬</span> Témoignages
          </div>

          <h2 className="testimonials-title">
            Ce qu&apos;ils en pensent.
            <br />
            <span className="gradient-text">Des vrais développeurs.</span>
          </h2>

          <p className="testimonials-description">
            Découvrez pourquoi des milliers de développeurs font confiance à DevStack au quotidien.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-glow" />
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-carousel">
          <div className="testimonial-card featured">
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonials[activeIndex].content}</p>
              <div className="rating">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">{testimonials[activeIndex].avatar}</div>
              <div className="author-info">
                <div className="author-name">{testimonials[activeIndex].name}</div>
                <div className="author-role">
                  {testimonials[activeIndex].role} @ {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="carousel-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini Testimonials Grid */}
        <div className="mini-testimonials">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`mini-card ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="mini-avatar">{testimonial.avatar}</div>
              <div className="mini-info">
                <div className="mini-name">{testimonial.name}</div>
                <div className="mini-company">{testimonial.company}</div>
              </div>
              <div className="mini-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="mini-star">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* ===== TESTIMONIALS SECTION ===== */
        .testimonials-section {
          position: relative;
          padding: 100px 60px;
          background: #0a0a0f;
          overflow: hidden;
        }

        .noise-overlay-testimonials {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Testimonials Header */
        .testimonials-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .testimonial-badge {
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

        .testimonials-title {
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

        .testimonials-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .stat-item {
          position: relative;
          text-align: center;
          padding: 32px 20px;
          background: rgba(15, 15, 25, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 20px;
          overflow: hidden;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .stat-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(232, 62, 140, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Testimonials Carousel */
        .testimonials-carousel {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 60px;
        }

        .testimonial-card {
          max-width: 800px;
          width: 100%;
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .testimonial-card.featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #e83e8c, #9333ea);
        }

        .quote-icon {
          font-size: 6rem;
          color: rgba(147, 51, 234, 0.1);
          position: absolute;
          top: -20px;
          left: 20px;
          line-height: 1;
          font-family: Georgia, serif;
        }

        .testimonial-content {
          position: relative;
          z-index: 1;
          margin-bottom: 32px;
        }

        .testimonial-text {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
          margin-bottom: 24px;
        }

        .rating {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #e83e8c;
          font-size: 1.2rem;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .author-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .author-role {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Navigation Dots */
        .carousel-nav {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-dot:hover {
          background: rgba(147, 51, 234, 0.6);
        }

        .nav-dot.active {
          background: #e83e8c;
          transform: scale(1.2);
        }

        /* Mini Testimonials */
        .mini-testimonials {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .mini-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(15, 15, 25, 0.4);
          border: 1px solid rgba(147, 51, 234, 0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .mini-card:hover {
          background: rgba(15, 15, 25, 0.6);
          border-color: rgba(147, 51, 234, 0.3);
        }

        .mini-card.active {
          background: rgba(147, 51, 234, 0.15);
          border-color: rgba(147, 51, 234, 0.4);
        }

        .mini-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e83e8c, #9333ea);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .mini-info {
          flex: 1;
          min-width: 0;
        }

        .mini-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mini-company {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .mini-rating {
          display: flex;
          gap: 2px;
        }

        .mini-star {
          color: #e83e8c;
          font-size: 0.7rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .testimonials-section {
            padding: 80px 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonial-card {
            padding: 36px 32px;
          }

          .testimonial-text {
            font-size: 1.2rem;
          }

          .mini-testimonials {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 24px;
          }

          .testimonials-title {
            font-size: 2.25rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .stat-label {
            font-size: 0.85rem;
          }

          .stat-item {
            padding: 24px 16px;
          }

          .testimonial-card {
            padding: 28px 20px;
          }

          .quote-icon {
            font-size: 4rem;
          }

          .testimonial-text {
            font-size: 1.1rem;
          }

          .author-avatar {
            width: 48px;
            height: 48px;
            font-size: 1.3rem;
          }

          .author-name {
            font-size: 1rem;
          }

          .author-role {
            font-size: 0.85rem;
          }

          .mini-testimonials {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
