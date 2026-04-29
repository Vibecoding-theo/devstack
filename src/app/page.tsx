'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
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
