import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './Hero';
import { Ballet } from './Ballet';
import { Masterpiece } from './Masterpiece';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStoryProps {
  onCreamChange: (isCream: boolean) => void;
  onActChange: (act: number) => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({
  onCreamChange,
  onActChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const creamLayerRef = useRef<HTMLDivElement>(null);
  const balletActRef = useRef<HTMLDivElement>(null);
  const masterpieceActRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Idle Ambient Floating Animations (desacopladas do scroll)
      if (!prefersReducedMotion) {
        // Hero combined twirl breathing
        gsap.to('.hero-img-twirl-combined', {
          y: '-=8',
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Ballet spiral idle rotation oscillation
        gsap.to('.ballet-spiral-img', {
          y: '-=10',
          rotation: 1.5,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Ballet ingredients ambient floating (callouts move with them because they are children)
        const items = [
          '.ballet-item-mussel-1',
          '.ballet-item-mussel-2',
          '.ballet-item-tomato-1',
          '.ballet-item-tomato-2',
          '.ballet-item-shrimp',
          '.ballet-item-basil',
        ];

        items.forEach((sel, i) => {
          gsap.to(sel, {
            y: i % 2 === 0 ? '-=12' : '+=12',
            x: i % 3 === 0 ? '+=6' : '-=6',
            rotation: i % 2 === 0 ? '+=4' : '-=4',
            duration: 2.8 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // 2. Initial Setup: Clean States
      // Painel creme começa cobrindo 0% (recolhido na base)
      gsap.set(creamLayerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        willChange: 'clip-path',
      });

      // Camadas separadas do Hero começam ocultas
      gsap.set(['.hero-img-fork-empty', '.hero-img-twirl-only'], {
        autoAlpha: 0,
      });

      // Callouts e setas do Ato 2 começam ocultos de verdade
      gsap.set(['.ballet-callout', '.ballet-arrow'], {
        autoAlpha: 0,
        pointerEvents: 'none',
      });

      // Espiral e itens do ballet começam fora de cena
      gsap.set('.ballet-spiral-wrapper', {
        autoAlpha: 0,
        scale: 0.82,
        y: -30,
      });
      gsap.set('.ballet-item', {
        autoAlpha: 0,
        scale: 0.7,
      });
      gsap.set('.ballet-title-block', {
        autoAlpha: 0,
        y: 30,
      });

      // Masterpiece (Ato 3) começa oculto
      gsap.set(masterpieceActRef.current, {
        autoAlpha: 0,
        pointerEvents: 'none',
      });
      gsap.set('.masterpiece-plate-img', {
        y: '60%',
        scale: 0.92,
      });
      gsap.set('.masterpiece-header', {
        y: 40,
        opacity: 0,
      });

      // 3. Master Choreographed Timeline (GSAP ScrollTrigger com scrub)
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: prefersReducedMotion ? false : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.30) {
              onActChange(0);
              onCreamChange(false);
            } else if (p < 0.72) {
              onActChange(1);
              onCreamChange(true);
            } else {
              onActChange(2);
              onCreamChange(true);
            }
          },
        },
      });

      // =================================================================
      // FASE 1: HERO -> TRANSIÇÃO PARA ATO 2 (Progress: 0.00 -> 0.36)
      // =================================================================

      // Step 1.1: Título e textos do Hero sobem e somem
      masterTL.to('.hero-text-block', {
        y: -100,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.in',
      }, 0);

      // Step 1.2: Crossfade suave do hero original para as duas camadas separadas
      masterTL.to('.hero-img-twirl-combined', {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power1.inOut',
      }, 0.15);
      masterTL.to(['.hero-img-fork-empty', '.hero-img-twirl-only'], {
        autoAlpha: 1,
        duration: 0.45,
        ease: 'power1.inOut',
      }, 0.15);

      // Step 1.3: Garfo inclina e sai para cima/direita
      masterTL.to('.hero-img-fork-empty', {
        rotation: 30,
        transformOrigin: 'top right',
        x: 150,
        y: -180,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0.45);

      // Step 1.4: Novelo desce e estica os fios
      masterTL.to('.hero-img-twirl-only', {
        y: '50vh',
        x: '-12vw',
        scaleY: 1.45,
        scaleX: 0.95,
        transformOrigin: '50% 0%',
        rotation: -6,
        duration: 1.6,
        ease: 'power1.inOut',
      }, 0.35);

      // Step 1.5: Faixa creme sobe de baixo (POR TRÁS DA MASSA)
      masterTL.to(creamLayerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power2.inOut',
      }, 0.45);

      // Step 1.6: Transição novelo -> espiral em S
      masterTL.to('.hero-img-twirl-only', {
        autoAlpha: 0,
        scale: 0.65,
        duration: 0.8,
        ease: 'power2.out',
      }, 1.6);
      masterTL.to('.ballet-spiral-wrapper', {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
      }, 1.5);

      // =================================================================
      // FASE 2: ATO 2 — O BALÉ DOS INGREDIENTES (Progress: 0.36 -> 0.72)
      // =================================================================

      // Step 2.1: Título do Ato 2 entra
      masterTL.to('.ballet-title-block', {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 1.7);

      // Step 2.2: Ingredientes orbitam para fora com stagger
      masterTL.to('.ballet-item', {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: 'back.out(1.15)',
      }, 1.8);

      // Step 2.3: Callouts e setas aparecem no meio do Ato 2
      masterTL.to(['.ballet-callout', '.ballet-arrow'], {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.4);

      // Step 2.4: Espiral gira suavemente com o avanço do scroll
      masterTL.to('.ballet-spiral-wrapper', {
        rotation: 25,
        scale: 1.06,
        duration: 2.2,
        ease: 'none',
      }, 1.9);

      // Step 2.5: FIM DO ATO 2 — TODOS os callouts e setas recolhem e somem de verdade!
      masterTL.to('.ballet-callout', {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.in',
      }, 3.3);
      masterTL.to('.ballet-arrow', {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.in',
      }, 3.3);
      masterTL.to('.ballet-title-block', {
        autoAlpha: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.in',
      }, 3.4);

      // =================================================================
      // FASE 3: TRANSIÇÃO ATO 2 -> ATO 3 — A OBRA-PRIMA (Progress: 0.72 -> 1.00)
      // =================================================================

      // Step 3.1: Ingredientes caem em direção ao prato
      masterTL.to('.ballet-item', {
        y: '+=420',
        autoAlpha: 0,
        rotation: '+=35',
        stagger: 0.08,
        duration: 1.2,
        ease: 'power2.in',
      }, 3.6);

      // Step 3.2: Espiral assenta e desvanece no centro do prato
      masterTL.to('.ballet-spiral-wrapper', {
        y: '+=260',
        scale: 0.55,
        autoAlpha: 0,
        duration: 1.0,
        ease: 'power2.in',
      }, 3.8);

      // Step 3.3: Ato 3 Masterpiece ativa
      masterTL.to(masterpieceActRef.current, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.6,
      }, 4.1);

      // Step 3.4: Prato sobe suavemente da borda inferior
      masterTL.to('.masterpiece-plate-img', {
        y: '0%',
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      }, 4.3);

      // Step 3.5: Cabeçalho da obra-prima entra com autoridade
      masterTL.to('.masterpiece-header', {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power2.out',
      }, 4.5);

    }, containerRef);

    // Call ScrollTrigger.refresh() after images load and decode
    const images = Array.from(containerRef.current?.querySelectorAll('img') || []);
    Promise.all(images.map((img) => img.decode().catch(() => {}))).then(() => {
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [onActChange, onCreamChange]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Camada 1: Fundo Vinho + Hero Text (z-10) */}
      <div className="absolute inset-0 z-10">
        <Hero />
      </div>

      {/* Camada 2: Faixa Creme (z-20) - Sobe cobrindo o vinho por trás da massa */}
      <div
        ref={creamLayerRef}
        className="absolute inset-0 z-20 overflow-hidden bg-cream-100"
      >
        {/* Ato 2: Balé dos Ingredientes */}
        <div ref={balletActRef} className="absolute inset-0">
          <Ballet />
        </div>

        {/* Ato 3: A Obra-Prima */}
        <div ref={masterpieceActRef} className="absolute inset-0">
          <Masterpiece />
        </div>
      </div>

      {/* Camada 3: Garfo e Massa do Hero (z-30 - ACIMA DA FAIXA CREME!) */}
      <div
        className="hero-fork-box absolute top-0 -right-[1vw] z-30 pointer-events-none origin-top-right flex items-start justify-end"
        style={{
          width: 'clamp(320px, 46vw, 680px)',
          height: 'clamp(46svh, 96svh, 980px)',
        }}
      >
        <div className="relative w-full h-full">
          {/* 1. Imagem do Hero em Repouso (garfo + novelo combinado) */}
          <img
            src="/assets/hero-fork-twirl.png"
            alt="Garfo artesanal com espaguete enrolado e frutos do mar"
            className="hero-img-twirl-combined absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          {/* 2. Camada Garfo Separado (hero-fork-empty) para a saída */}
          <img
            src="/assets/hero-fork-empty.png"
            alt=""
            aria-hidden="true"
            className="hero-img-fork-empty absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
            style={{ opacity: 0, visibility: 'hidden' }}
            loading="eager"
            decoding="async"
          />

          {/* 3. Camada Novelo Separado (hero-twirl-only) para derramar */}
          <img
            src="/assets/hero-twirl-only.png"
            alt=""
            aria-hidden="true"
            className="hero-img-twirl-only absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            style={{ opacity: 0, visibility: 'hidden' }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
