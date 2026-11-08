import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoryTransition } from './components/StoryTransition';
import { Specialty } from './components/Specialty';
import { VarietyGrid } from './components/VarietyGrid';
import { Invitation } from './components/Invitation';
import { SiteFooter } from './components/SiteFooter';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isCream, setIsCream] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
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

    // 2. Setup ScrollTriggers for header theme & active section detection
    const ctx = gsap.context(() => {
      // Hero (#inicio): Café (dark)
      ScrollTrigger.create({
        trigger: '#inicio',
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => {
          setIsCream(false);
          setActiveSection('inicio');
        },
        onEnterBack: () => {
          setIsCream(false);
          setActiveSection('inicio');
        },
      });

      // Nossa Cozinha (#nossa-cozinha): Creme (light)
      ScrollTrigger.create({
        trigger: '#nossa-cozinha',
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => {
          setIsCream(true);
          setActiveSection('nossa-cozinha');
        },
        onEnterBack: () => {
          setIsCream(true);
          setActiveSection('nossa-cozinha');
        },
      });

      // Especialidade (#especialidade): Café (dark)
      ScrollTrigger.create({
        trigger: '#especialidade',
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => {
          setIsCream(false);
          setActiveSection('especialidade');
        },
        onEnterBack: () => {
          setIsCream(false);
          setActiveSection('especialidade');
        },
      });

      // Sabores (#sabores): Creme (light)
      ScrollTrigger.create({
        trigger: '#sabores',
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => {
          setIsCream(true);
          setActiveSection('sabores');
        },
        onEnterBack: () => {
          setIsCream(true);
          setActiveSection('sabores');
        },
      });

      // Visita (#visita): Café (dark)
      ScrollTrigger.create({
        trigger: '#visita',
        start: 'top 40%',
        end: 'bottom bottom',
        onEnter: () => {
          setIsCream(false);
          setActiveSection('visita');
        },
        onEnterBack: () => {
          setIsCream(false);
          setActiveSection('visita');
        },
      });
    });

    // Handle hash links with Lenis
    const handleHashClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        const el = document.querySelector(target.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleHashClick);

    // Refresh ScrollTrigger on load and resize
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleRefresh);
    window.addEventListener('resize', handleRefresh);
    const timer = setTimeout(handleRefresh, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleRefresh);
      document.removeEventListener('click', handleHashClick);
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A100B] font-sans text-[#F7F0E2] selection:bg-[#A64F33] selection:text-white">
      {/* Sticky Dynamic Header */}
      <Header isCream={isCream} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        {/* Sequência A: Hero Cinematográfico Editorial */}
        <Hero />

        {/* Sequência B: Da nossa cozinha para a sua mesa */}
        <StoryTransition />

        {/* Sequência C: Especialidade de Monte Sião (Macarrão Quadrado) */}
        <Specialty />

        {/* Sequência D: Variedade de Sabores */}
        <VarietyGrid />

        {/* Sequência E: Atmosfera e Convite */}
        <Invitation />
      </main>

      {/* Rodapé Nobre */}
      <SiteFooter />
    </div>
  );
};

export default App;
