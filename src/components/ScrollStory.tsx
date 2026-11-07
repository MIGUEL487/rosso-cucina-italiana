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

        // Ballet ingredients ambient floating
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
      // Faixa creme recolhida na base
      gsap.set(creamLayerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        willChange: 'clip-path',
      });

      // Garfo vazio começa oculto
      gsap.set('.hero-img-fork-empty', {
        autoAlpha: 0,
      });

      // Novelo em queda (.falling-twirl-wrapper) começa alinhado ao garfo no quadrante superior direito
      gsap.set('.falling-twirl-wrapper', {
        x: '24vw',
        y: '-14vh',
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        autoAlpha: 0,
      });

      // Espiral e itens do ballet começam fora de cena
      gsap.set('.ballet-spiral-wrapper', {
        autoAlpha: 0,
        y: -300,
        scale: 0.9,
      });
      gsap.set('.ballet-item', {
        autoAlpha: 0,
        scale: 0.7,
      });
      gsap.set('.ballet-callout', {
        autoAlpha: 0,
        pointerEvents: 'none',
      });
      gsap.set('.ballet-arrow', {
        autoAlpha: 0,
        pointerEvents: 'none',
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
        y: '65%',
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
          scrub: prefersReducedMotion ? false : 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.28) {
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
      // FASE 1: HERO -> O NOVELO CAI PARA O CENTRO E DESAPARECE
      // =================================================================

      // 1.1 Título do Hero sobe e some
      masterTL.to('.hero-text-block', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, 0);

      // 1.2 No início do movimento, troca suave da imagem combinada para o garfo e o novelo de queda
      masterTL.to('.hero-img-twirl-combined', {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 0.15);
      masterTL.to('.hero-img-fork-empty', {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 0.15);
      masterTL.to('.falling-twirl-wrapper', {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 0.15);

      // 1.3 O garfo inclina e sai para cima/direita
      masterTL.to('.hero-img-fork-empty', {
        rotation: 32,
        transformOrigin: 'top right',
        x: 180,
        y: -220,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.4);

      // 1.4 A faixa creme sobe de baixo (POR TRÁS DA MASSA EM QUEDA)
      masterTL.to(creamLayerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0.4);

      // 1.5 O NOVELO CAI EM DIREÇÃO AO CENTRO EXATO (onde a espiral vai ficar!)
      // Vai de (x: 24vw, y: -14vh) diretamente para o centro (x: 0, y: 0) esticando com a gravidade
      masterTL.to('.falling-twirl-wrapper', {
        x: 0,
        y: 0,
        scaleY: 1.35,
        scaleX: 0.95,
        rotation: -8,
        duration: 1.2,
        ease: 'power1.in',
      }, 0.35);

      // 1.6 O NOVELO CONTINUA CAINDO PARA BAIXO E DESAPARECE ANTES DA ESPIRAL ENTRAR!
      // "o macarrao deve cair sempre onde o outro vai ficar e deve desapareçer antes do outro aparecer pra dar a impressçao de cair"
      masterTL.to('.falling-twirl-wrapper', {
        y: '55vh',
        scaleY: 1.6,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.in',
      }, 1.55);

      // =================================================================
      // FASE 2: A ESPIRAL CAI DE CIMA NO MESMO LUGAR E O ATO 2 SE ABRE
      // =================================================================

      // 2.1 AGORA que o novelo desapareceu na queda (após t=2.15), a espiral despenca de cima para o MESMO centro!
      masterTL.fromTo('.ballet-spiral-wrapper', {
        y: -280,
        scale: 0.88,
        autoAlpha: 0,
      }, {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 2.15);

      // 2.2 Título do Ato 2 entra
      masterTL.to('.ballet-title-block', {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, 2.3);

      // 2.3 Ingredientes orbitam para fora com stagger
      masterTL.to('.ballet-item', {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1.0,
        ease: 'back.out(1.15)',
      }, 2.4);

      // 2.4 Callouts e setas aparecem
      masterTL.to(['.ballet-callout', '.ballet-arrow'], {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 2.8);

      // 2.5 Espiral gira suavemente enquanto o usuário navega pelo Ato 2
      masterTL.to('.ballet-spiral-wrapper', {
        rotation: 22,
        scale: 1.05,
        duration: 2.0,
        ease: 'none',
      }, 2.5);

      // 2.6 FIM DO ATO 2 — Callouts e setas recolhem e somem
      masterTL.to('.ballet-callout', {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 3.8);
      masterTL.to('.ballet-arrow', {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 3.8);
      masterTL.to('.ballet-title-block', {
        autoAlpha: 0,
        y: -30,
        duration: 0.5,
        ease: 'power2.in',
      }, 3.9);

      // =================================================================
      // FASE 3: A ESPIRAL CAI PARA O PRATO E DESAPARECE; O PRATO SOBE
      // =================================================================

      // 3.1 Ingredientes caem em direção ao fundo
      masterTL.to('.ballet-item', {
        y: '+=420',
        autoAlpha: 0,
        rotation: '+=30',
        stagger: 0.06,
        duration: 1.0,
        ease: 'power2.in',
      }, 4.1);

      // 3.2 A ESPIRAL CAI PELO CENTRO PARA BAIXO E DESAPARECE
      // "o macarrao deve cair sempre onde o outro vai ficar e deve desapareçer antes do outro aparecer pra dar a impressçao de cair"
      masterTL.to('.ballet-spiral-wrapper', {
        y: '60vh',
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power2.in',
      }, 4.2);

      // 3.3 Ato 3 Masterpiece ativa (após a espiral cair e sumir)
      masterTL.to(masterpieceActRef.current, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.5,
      }, 4.9);

      // 3.4 Prato com a massa montada sobe suavemente
      masterTL.to('.masterpiece-plate-img', {
        y: '0%',
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
      }, 5.1);

      // 3.5 Título "SUA MESA ESTÁ ESPERANDO." e botão entram
      masterTL.to('.masterpiece-header', {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
      }, 5.3);

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

      {/* Camada 3: Garfo no Canto Superior Direito (z-30) */}
      <div
        className="hero-fork-box absolute top-0 -right-[1vw] z-30 pointer-events-none origin-top-right flex items-start justify-end"
        style={{
          width: 'clamp(320px, 46vw, 680px)',
          height: 'clamp(46svh, 96svh, 980px)',
        }}
      >
        <div className="relative w-full h-full">
          {/* Garfo + novelo combinado no repouso */}
          <img
            src="/assets/hero-fork-twirl.png"
            alt="Garfo artesanal com espaguete enrolado e frutos do mar"
            className="hero-img-twirl-combined absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          {/* Garfo vazio que inclina e sai para cima/direita */}
          <img
            src="/assets/hero-fork-empty.png"
            alt=""
            aria-hidden="true"
            className="hero-img-fork-empty absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
            style={{ opacity: 0, visibility: 'hidden' }}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Camada 4: Novelo de Massa em Queda Centralizada (z-35 - ACIMA DA FAIXA CREME) */}
      <div className="falling-twirl-container absolute inset-0 z-35 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="falling-twirl-wrapper relative w-[280px] sm:w-[380px] md:w-[440px] h-[400px] sm:h-[520px] flex items-center justify-center">
          <img
            src="/assets/hero-twirl-only.png"
            alt=""
            aria-hidden="true"
            className="falling-twirl-img w-full h-full object-contain filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
