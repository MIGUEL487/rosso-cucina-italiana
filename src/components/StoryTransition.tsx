import React, { useEffect, useRef } from 'react';
import { Utensils, Award, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const StoryTransition: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const banner = bannerRef.current;
    if (!section || !header || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // 1. Header scroll-triggered reveal
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 2. Staggered card entrance on scroll
      const cards = cardsContainer.querySelectorAll('.story-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 78%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 3. Subtle differential parallax on the 3 cards while scrolling
      cards.forEach((card, index) => {
        const speed = (index - 1) * 25; // -25 for first, 0 for middle, +25 for third
        gsap.to(card, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // 4. Hospitality banner entrance
      if (banner) {
        gsap.fromTo(
          banner,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: banner,
              start: 'top 85%',
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
      id="nossa-cozinha"
      ref={sectionRef}
      className="relative pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 sm:px-12 bg-texture-creme text-[#49301B] transition-colors duration-700 overflow-hidden"
    >
      {/* Seamless transition curve at top */}
      <div
        className="pointer-events-none absolute -top-1 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#1A100B] to-transparent z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Narrative Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#49301B]/20 bg-[#E7D2AC]/40 text-[#49301B] shadow-sm">
            <Utensils size={13} className="text-[#A64F33]" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
              {siteContent.story.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#221710] tracking-tight leading-[1.05]">
            Muitos sabores. <span className="italic text-[#A64F33]">Uma mesa.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#49301B]/85 font-normal leading-relaxed pt-2">
            {siteContent.story.lead}
          </p>
        </div>

        {/* 3 Real Food Showcase Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {siteContent.story.items.map((item, index) => (
            <div
              key={item.title}
              className="story-card group relative flex flex-col rounded-3xl bg-white border border-[#49301B]/12 overflow-hidden card-shadow-warm transform hover:-translate-y-2 transition-all duration-500 will-change-transform"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E7D2AC]/20">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#F7F0E2]/95 backdrop-blur-sm flex items-center justify-center text-xs font-serif font-bold text-[#49301B] shadow-md border border-[#49301B]/10">
                  0{index + 1}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#221710] leading-snug group-hover:text-[#A64F33] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#49301B]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#49301B]/10 flex items-center justify-between text-xs text-[#526343] font-medium">
                  <span className="flex items-center space-x-1.5">
                    <Sparkles size={13} />
                    <span>Feito com cuidado</span>
                  </span>
                  <span className="font-serif italic text-sm text-[#A64F33]">Monte Sião</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hospitality quote banner */}
        <div
          ref={bannerRef}
          className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-3xl bg-[#E7D2AC]/40 border border-[#E7D2AC] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm will-change-transform"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#49301B] text-[#F7F0E2] flex items-center justify-center shrink-0 shadow-md">
              <Award size={22} className="text-[#E7D2AC]" />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#221710] leading-tight">
                Receitas autênticas preparadas com carinho todo dia
              </p>
              <p className="text-xs sm:text-sm text-[#49301B]/80 mt-1 font-light">
                Ingredientes selecionados para valorizar cada momento à mesa com quem você gosta.
              </p>
            </div>
          </div>
          <a
            href="#especialidade"
            className="shrink-0 inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#49301B] text-[#F7F0E2] hover:bg-[#221710] transition-colors shadow-md hover:scale-[1.02]"
          >
            <span>Conheça a Especialidade</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};
