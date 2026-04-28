import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonials from '@/components/testimonials';
import Pricing from '@/components/pricing';
import CTA from '@/components/cta';
import Footer from '@/components/footer';
import HeaderLP from '@/components/HeaderLP';

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

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
            sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .main-landing {
          padding-top: 80px;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0f;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }

        /* Selection styling */
        ::selection {
          background: rgba(232, 62, 140, 0.3);
          color: #ffffff;
        }

        /* Focus styles */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #e83e8c;
          outline-offset: 2px;
        }

        /* Remove default button styles */
        button {
          font-family: inherit;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .main-landing {
            padding-top: 72px;
          }
        }

        @media (max-width: 640px) {
          .main-landing {
            padding-top: 64px;
          }
        }
      `}</style>
    </>
  );
}
