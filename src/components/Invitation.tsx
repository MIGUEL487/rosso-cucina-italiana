import React, { useEffect, useRef } from 'react';
import { Heart, MapPin, ArrowUp, Utensils } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const Invitation: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const pillars = pillarsRef.current;
    const ctaGroup = ctaGroupRef.current;
    if (!section || !content || !pillars) return;

    const ctx = gsap.context(() => {
      // 1. Title block reveal
      gsap.fromTo(
        content.querySelectorAll('.inv-anim-item'),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 2. Pillars stagger reveal
      const items = pillars.querySelectorAll('.pillar-card');
      gsap.fromTo(
        items,
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillars,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 3. CTA group reveal
      if (ctaGroup) {
        gsap.fromTo(
          ctaGroup,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaGroup,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visita"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-texture-cafe text-[#F7F0E2] overflow-hidden"
    >
      {/* Warm Ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E7D2AC]/10 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#A64F33]/15 blur-[140px]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
        
        {/* Eyebrow */}
        <div className="inv-anim-item inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#E7D2AC]/30 bg-[#49301B]/50 backdrop-blur-sm shadow-sm">
          <MapPin size={13} className="text-[#A64F33]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E7D2AC]">
            {siteContent.invitation.eyebrow}
          </span>
        </div>

        {/* Big Editorial Title */}
        <div className="inv-anim-item space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7F0E2] tracking-tight leading-[1.05]">
            Comida boa tem <span className="italic text-[#E7D2AC]">jeito de encontro.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F7F0E2]/85 font-light max-w-2xl mx-auto leading-relaxed pt-2">
            {siteContent.invitation.subtitle}
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
          {siteContent.invitation.highlights.map((item) => (
            <div
              key={item.title}
              className="pillar-card p-7 rounded-3xl bg-white/[0.04] border border-white/[0.09] backdrop-blur-md space-y-3 card-shadow-deep transform hover:-translate-y-1.5 transition-transform duration-500 will-change-transform"
            >
              <div className="w-9 h-9 rounded-full bg-[#A64F33]/25 border border-[#A64F33]/40 flex items-center justify-center text-[#E7D2AC] mb-2 shadow-sm">
                <Heart size={16} />
              </div>
              <h3 className="font-serif text-xl text-[#F7F0E2]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F0E2]/75 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dual Actions */}
        <div ref={ctaGroupRef} className="flex flex-wrap items-center justify-center gap-4 pt-4 will-change-transform">
          <a
            href="#sabores"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#E7D2AC] text-[#221710] hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Utensils size={14} />
            <span>{siteContent.invitation.ctaExplore}</span>
          </a>

          <a
            href="#inicio"
            className="inline-flex items-center space-x-2 px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F7F0E2] border border-[#E7D2AC]/30 hover:bg-[#49301B]/60 hover:border-[#E7D2AC]/60 transition-all duration-300 backdrop-blur-sm"
          >
            <span>{siteContent.invitation.ctaTop}</span>
            <ArrowUp size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};
