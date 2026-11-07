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

      // Camadas do Garfo e Novelo dentro de hero-fork-box
      gsap.set('.hero-img-twirl-combined', {
        autoAlpha: 1,
      });
      gsap.set(['.hero-img-fork-empty', '.hero-img-twirl-only'], {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
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
      // FASE 1: HERO -> O NOVELO SE SOLTA, CAI NO CENTRO E SOME
      // =================================================================

      // 1.1 Título do Hero sobe e some
      masterTL.to('.hero-text-block', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, 0);

      // 1.2 Transição inicial: troca do hero combinado para garfo vazio + novelo separado
      masterTL.to('.hero-img-twirl-combined', {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power1.inOut',
      }, 0.12);
      masterTL.to('.hero-img-fork-empty', {
        autoAlpha: 1,
        duration: 0.25,
        ease: 'power1.inOut',
      }, 0.12);
      masterTL.to('.hero-img-twirl-only', {
        autoAlpha: 1,
        duration: 0.25,
        ease: 'power1.inOut',
      }, 0.12);

      // 1.3 O garfo inclina e sai para cima/direita
      masterTL.to('.hero-img-fork-empty', {
        rotation: 32,
        transformOrigin: 'top right',
        x: 180,
        y: -220,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.35);

      // 1.4 A faixa creme sobe cobrindo o vinho (POR TRÁS DA MASSA)
      masterTL.to(creamLayerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power2.inOut',
      }, 0.35);

      // 1.5 O NOVELO SE SOLTA E CAI EM DIREÇÃO AO CENTRO EXATO DA TELA
      // Onde a espiral vai ficar! Deslocamento horizontal preciso (-25vw desktop / -8vw mobile)
      masterTL.to('.hero-img-twirl-only', {
        x: () => (window.innerWidth < 768 ? '-8vw' : '-25vw'),
        y: () => (window.innerWidth < 768 ? '24vh' : '20vh'),
        scaleY: 1.35,
        scaleX: 0.95,
        rotation: -6,
        duration: 1.2,
        ease: 'power1.in',
      }, 0.28);

      // 1.6 O NOVELO DESPENCA PARA BAIXO E DESAPARECE COMPLETAMENTE ANTES DA ESPIRAL APARECER!
      // "o macarrao deve cair sempre onde o outro vai ficar e deve desapareçer antes do outro aparecer pra dar a impressçao de cair"
      masterTL.to('.hero-img-twirl-only', {
        y: '+=50vh',
        scaleY: 1.6,
        autoAlpha: 0,
        duration: 0.55,
        ease: 'power2.in',
      }, 1.48);

      // =================================================================
      // FASE 2: A ESPIRAL CAI DE CIMA NO MESMO LUGAR E O ATO 2 SE ABRE
      // =================================================================

      // 2.1 AGORA que o novelo desapareceu na queda (após t=2.03), a espiral despenca de cima para o MESMO centro!
      masterTL.fromTo('.ballet-spiral-wrapper', {
        y: -280,
        scale: 0.88,
        autoAlpha: 0,
      }, {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.05);

      // 2.2 Título do Ato 2 entra
      masterTL.to('.ballet-title-block', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.2);

      // 2.3 Ingredientes orbitam para fora com stagger
      masterTL.to('.ballet-item', {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: 'back.out(1.15)',
      }, 2.3);

      // 2.4 Callouts e setas aparecem
      masterTL.to(['.ballet-callout', '.ballet-arrow'], {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 2.6);

      // 2.5 Espiral gira suavemente enquanto o usuário navega pelo Ato 2
      masterTL.to('.ballet-spiral-wrapper', {
        rotation: 22,
        scale: 1.05,
        duration: 1.8,
        ease: 'none',
      }, 2.4);

      // 2.6 FIM DO ATO 2 — Callouts e setas recolhem e somem
      masterTL.to('.ballet-callout', {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 3.6);
      masterTL.to('.ballet-arrow', {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 3.6);
      masterTL.to('.ballet-title-block', {
        autoAlpha: 0,
        y: -30,
        duration: 0.5,
        ease: 'power2.in',
      }, 3.7);

      // =================================================================
      // FASE 3: A ESPIRAL CAI PARA O PRATO E DESAPARECE; O PRATO SOBE
      // =================================================================

      // 3.1 Ingredientes caem em direção ao fundo
      masterTL.to('.ballet-item', {
        y: '+=420',
        autoAlpha: 0,
        rotation: '+=30',
        stagger: 0.06,
        duration: 0.9,
        ease: 'power2.in',
      }, 3.9);

      // 3.2 A ESPIRAL CAI PELO CENTRO PARA BAIXO E DESAPARECE
      // "o macarrao deve cair sempre onde o outro vai ficar e deve desapareçer antes do outro aparecer pra dar a impressçao de cair"
      masterTL.to('.ballet-spiral-wrapper', {
        y: '+=45vh',
        scale: 0.55,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, 4.0);

      // 3.3 Ato 3 Masterpiece ativa (após a espiral cair e sumir)
      masterTL.to(masterpieceActRef.current, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.5,
      }, 4.7);

      // 3.4 Prato com a massa montada sobe suavemente
      masterTL.to('.masterpiece-plate-img', {
        y: '0%',
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, 4.9);

      // 3.5 Título "SUA MESA ESTÁ ESPERANDO." e botão entram
      masterTL.to('.masterpiece-header', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 5.1);

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

      {/* Camada 3: Garfo e Massa do Hero (z-index 35 - ACIMA DA FAIXA CREME!) */}
      <div
        className="hero-fork-box absolute top-0 -right-[1vw] pointer-events-none origin-top-right flex items-start justify-end"
        style={{
          zIndex: 35,
          width: 'clamp(320px, 46vw, 680px)',
          height: 'clamp(46svh, 96svh, 980px)',
        }}
      >
        <div className="relative w-full h-full">
          {/* 1. Garfo + novelo combinado no repouso */}
          <img
            src="/assets/hero-fork-twirl.png"
            alt="Garfo artesanal com espaguete enrolado e frutos do mar"
            className="hero-img-twirl-combined absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          {/* 2. Garfo vazio que inclina e sai para cima/direita */}
          <img
            src="/assets/hero-fork-empty.png"
            alt=""
            aria-hidden="true"
            className="hero-img-fork-empty absolute inset-0 w-full h-full object-contain object-top-right filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
            style={{ opacity: 0, visibility: 'hidden' }}
            loading="eager"
            decoding="async"
          />

          {/* 3. Novelo de massa que se solta do garfo, cai em direção ao centro e despenca */}
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
