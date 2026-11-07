import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { PageDots } from './components/PageDots';
import { SectionLabel } from './components/SectionLabel';
import { ScrollStory } from './components/ScrollStory';
import { Footer } from './components/Footer';
import { siteContent } from './content/site';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isCream, setIsCream] = useState(false);
  const [activeAct, setActiveAct] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Watch footer visibility to hide PageDots & SectionLabel on footer
    const footerTrigger = ScrollTrigger.create({
      trigger: '#contato',
      start: 'top 85%',
      end: 'bottom bottom',
      onEnter: () => setIsFooterVisible(true),
      onLeaveBack: () => setIsFooterVisible(false),
    });

    return () => {
      footerTrigger.kill();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleActClick = (actIndex: number) => {
    if (!lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = actIndex === 0 ? 0 : actIndex === 1 ? maxScroll * 0.45 : maxScroll * 0.85;
    lenisRef.current.scrollTo(targetScroll, { duration: 1.5 });
  };

  return (
    <div className="relative min-h-screen bg-wine-900 font-sans selection:bg-tomato selection:text-white">
      {/* Dynamic Header */}
      <Header isCream={isCream} activeSection={activeAct} />

      {/* Persistent Left Section Label (hidden on footer) */}
      <div className={`transition-opacity duration-500 ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <SectionLabel
          label={
            activeAct === 0
              ? siteContent.hero.sectionLabel
              : activeAct === 1
              ? 'SEÇÃO 02'
              : 'SEÇÃO 03'
          }
          isCream={isCream}
        />
      </div>

      {/* Right Vertical Page Dots Indicator (hidden on footer) */}
      <div className={`transition-opacity duration-500 ${isFooterVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <PageDots
          currentAct={activeAct}
          isCream={isCream}
          onActClick={handleActClick}
        />
      </div>

      {/* Main Orchestrated Scroll Story (Acts 1, 2, 3) */}
      <main id="inicio">
        <ScrollStory
          onCreamChange={setIsCream}
          onActChange={setActiveAct}
        />
      </main>

      {/* Elegant Footer */}
      <Footer />

      {/* Reservation Dialog Modal */}
      {reservationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-cream-100 text-ink rounded-3xl p-8 max-w-md w-full shadow-2xl border border-ink/10 relative">
            <button
              type="button"
              onClick={() => setReservationOpen(false)}
              className="absolute top-6 right-6 text-ink/60 hover:text-ink font-bold text-xl"
            >
              ✕
            </button>
            <span className="text-[11px] font-bold tracking-[0.25em] text-ink/70 uppercase block mb-1">
              Reserva
            </span>
            <h3 className="font-serif text-3xl mb-4 text-ink">
              Reserve sua Mesa
            </h3>
            <p className="text-xs text-ink/70 mb-6 font-light leading-relaxed">
              Atendimento exclusivo para almoço e jantar. Para confirmações imediatas, fale diretamente com nossa equipe via WhatsApp.
            </p>
            <div className="space-y-3">
              <a
                href={siteContent.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-ink text-cream-50 text-xs font-semibold tracking-widest uppercase hover:bg-wine-700 transition-colors"
              >
                Reservar pelo WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setReservationOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-full border border-ink/30 text-ink text-xs font-semibold tracking-wider hover:bg-ink/5 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
