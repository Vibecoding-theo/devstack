'use client';

import { useEffect } from 'react';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Testimonials from '@/components/landing/testimonials';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/cta';
import Footer from '@/components/landing/footer';
import HeaderLP from '@/components/landing/HeaderLP';
import './landing.css';

export default function LandingPage() {
  useEffect(() => {
    const selector = [
      '.features-header',
      '.feature-card',
      '.demo-section',
      '.testimonials-header',
      '.stat-item',
      '.testimonial-card',
      '.mini-card',
      '.pricing-header',
      '.pricing-card',
      '.faq-item',
      '.cta-content',
    ].join(', ');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
          // Retire les classes une fois la transition terminée pour ne pas
          // bloquer les hovers (transform) des cartes.
          window.setTimeout(() => entry.target.classList.remove('reveal', 'in-view'), 900);
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeaderLP />
      <main className="main-landing">
        <Hero />
        <Features id="features" />
        <Testimonials id="testimonials" />
        <Pricing id="pricing" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
