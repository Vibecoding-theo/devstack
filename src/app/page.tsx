'use client';

import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Testimonials from '@/components/landing/testimonials';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/cta';
import Footer from '@/components/landing/footer';
import HeaderLP from '@/components/landing/HeaderLP';
import './landing.css';

export default function LandingPage() {
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
