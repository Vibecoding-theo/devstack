'use client';

import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonials from '@/components/testimonials';
import Pricing from '@/components/pricing';
import CTA from '@/components/cta';
import Footer from '@/components/footer';
import HeaderLP from '@/components/HeaderLP';
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
