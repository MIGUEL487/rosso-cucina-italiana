import React, { useEffect, useRef } from 'react';
import { ChefHat, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const VarietyGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // 1. Header scroll-triggered reveal
      gsap.fromTo(
        header,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 2. 6-Card Batch Stagger Reveal on scroll
      const cards = grid.querySelectorAll('.variety-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.5,
            grid: 'auto',
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sabores"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-texture-creme text-[#49301B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6 border-b border-[#49301B]/15 pb-8 will-change-transform"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#49301B]/15 bg-[#E7D2AC]/40 text-[#49301B]">
              <ChefHat size={13} className="text-[#A64F33]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                {siteContent.variety.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#221710] tracking-tight leading-[1.05]">
              {siteContent.variety.title}
            </h2>
            <p className="text-sm sm:text-base text-[#49301B]/85 font-light leading-relaxed">
              {siteContent.variety.subtitle}
            </p>
          </div>

          <div className="text-xs uppercase tracking-widest text-[#526343] font-semibold">
            <span>Fotos reais do restaurante</span>
          </div>
        </div>

        {/* 6-Card Editorial Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.variety.categories.map((cat, idx) => (
            <article
              key={cat.id}
              className="variety-card group flex flex-col rounded-3xl bg-white border border-[#49301B]/12 overflow-hidden card-shadow-warm transform hover:-translate-y-2 transition-all duration-500 will-change-transform"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E7D2AC]/15">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Tag Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#221710]/90 text-[#F7F0E2] backdrop-blur-sm shadow-sm">
                  {cat.tag}
                </div>

                <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[11px] font-bold text-[#49301B] shadow-sm">
                  0{idx + 1}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl text-[#221710] leading-snug group-hover:text-[#A64F33] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#49301B]/80 font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#49301B]/10 flex items-center justify-between text-xs text-[#A64F33] font-medium">
                  <span className="font-serif italic text-sm">Cantina Viana</span>
                  <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Ver mesa</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-14 text-center">
          <p className="text-xs text-[#49301B]/70 italic max-w-xl mx-auto">
            A disponibilidade dos pratos pode variar diariamente para garantir ingredientes frescos da estação e a melhor experiência para você.
          </p>
        </div>

      </div>
    </section>
  );
};
