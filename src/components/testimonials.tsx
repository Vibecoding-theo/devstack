'use client';

import React, { useState } from 'react';

export default function Testimonials({ id }: { id?: string }) {
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
    <section id={id} className="testimonials-section">
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

    </section>
  );
}
