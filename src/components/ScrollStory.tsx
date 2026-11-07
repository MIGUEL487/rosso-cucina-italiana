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
  const heroActRef = useRef<HTMLDivElement>(null);
  const creamLayerRef = useRef<HTMLDivElement>(null);
  const balletActRef = useRef<HTMLDivElement>(null);
  const masterpieceActRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Ambient idle floating animations (independent of scroll)
      if (!prefersReducedMotion) {
        // Hero fork twirl gentle breathing
        gsap.to('.hero-fork-img', {
          y: '-=12',
          rotation: 1.5,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Ballet ingredients ambient floating
        gsap.to('.ballet-spiral-img', {
          y: '-=10',
          rotation: 2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

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
            y: (i % 2 === 0 ? '-=14' : '+=14'),
            x: (i % 3 === 0 ? '+=8' : '-=8'),
            rotation: (i % 2 === 0 ? '+=6' : '-=6'),
            duration: 3 + (i * 0.4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // 2. Master Choreographed Scroll Timeline
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: prefersReducedMotion ? false : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Determine active act
            if (progress < 0.28) {
              onActChange(0);
              onCreamChange(false);
            } else if (progress < 0.72) {
              onActChange(1);
              onCreamChange(true);
            } else {
              onActChange(2);
              onCreamChange(true);
            }
          },
        },
      });

      // Initial layout states
      gsap.set(creamLayerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        willChange: 'clip-path',
      });
      gsap.set(masterpieceActRef.current, {
        opacity: 0,
        pointerEvents: 'none',
      });
      gsap.set('.masterpiece-plate-img', {
        y: '55%',
        scale: 0.92,
      });
      gsap.set('.masterpiece-header', {
        y: 40,
        opacity: 0,
      });

      // ============================================
      // ACT 1 -> ACT 2 TRANSITION (Progress: 0.00 -> 0.38)
      // ============================================
      masterTL
        // Step 1: Hero text ascends and fades out
        .to('.hero-text-block', {
          y: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.in',
        }, 0)
        // Step 2: Fork twirl stretches down and moves to center
        .to('.hero-fork-container', {
          y: 120,
          scaleY: 1.08,
          scaleX: 0.96,
          duration: 1.4,
          ease: 'power1.inOut',
        }, 0.2)
        // Step 3: Cream curtain sweeps up covering the wine background
        .to(creamLayerRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'power2.inOut',
        }, 0.4)
        // Step 4: Fork twirl exits and crossfades seamlessly into the S-spiral
        .to('.hero-fork-container', {
          opacity: 0,
          y: 200,
          duration: 0.8,
          ease: 'power2.out',
        }, 1.2)
        .fromTo('.ballet-spiral-wrapper', {
          opacity: 0,
          scale: 0.82,
          rotationY: 90,
        }, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.0,
          ease: 'power2.out',
        }, 1.2);

      // ============================================
      // ACT 2: BALLET CHOREOGRAPHY (Progress: 0.38 -> 0.72)
      // ============================================
      masterTL
        // Title appears and then fades as spiral commands the center
        .fromTo('.ballet-title-block', {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, 1.4)
        // Spiral spins with scroll progression
        .to('.ballet-spiral-wrapper', {
          rotation: 30,
          scale: 1.05,
          duration: 2.2,
          ease: 'none',
        }, 1.8)
        // Orbiting ingredients expand outward into orbit
        .fromTo('.ballet-item', {
          scale: 0.6,
          opacity: 0.2,
        }, {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'back.out(1.2)',
        }, 1.8)
        // Fade title out before act 3
        .to('.ballet-title-block', {
          opacity: 0,
          y: -40,
          duration: 0.8,
        }, 3.0);

      // ============================================
      // ACT 2 -> ACT 3 TRANSITION: MASTERPIECE (Progress: 0.72 -> 1.00)
      // ============================================
      masterTL
        // Ingredients cascade/fall downward towards plate
        .to('.ballet-item', {
          y: '+=380',
          opacity: 0,
          rotation: '+=45',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power2.in',
        }, 3.4)
        // Spiral settles and transforms
        .to('.ballet-spiral-wrapper', {
          y: '+=240',
          scale: 0.6,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.in',
        }, 3.6)
        // Masterpiece content activates
        .to(masterpieceActRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.6,
        }, 3.8)
        // The Masterpiece Plate rises up majestically
        .to('.masterpiece-plate-img', {
          y: '0%',
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, 4.0)
        // Title 03 + "SUA MESA ESTÁ ESPERANDO" rises smoothly into position
        .to('.masterpiece-header', {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
        }, 4.2);

    }, containerRef);

    return () => ctx.revert();
  }, [onActChange, onCreamChange]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Layer 1: Ato 1 (Hero - Wine) */}
      <div ref={heroActRef} className="absolute inset-0 z-10">
        <Hero />
      </div>

      {/* Layer 2: Cream Layer (Atos 2 & 3) */}
      <div
        ref={creamLayerRef}
        className="absolute inset-0 z-20 overflow-hidden bg-cream-100"
      >
        {/* Ato 2: Ballet */}
        <div ref={balletActRef} className="absolute inset-0">
          <Ballet />
        </div>

        {/* Ato 3: Masterpiece */}
        <div ref={masterpieceActRef} className="absolute inset-0">
          <Masterpiece />
        </div>
      </div>
    </div>
  );
};
