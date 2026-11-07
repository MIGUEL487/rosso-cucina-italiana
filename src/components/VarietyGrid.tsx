import React from 'react';
import { ChefHat, ArrowUpRight } from 'lucide-react';
import { siteContent } from '../content/site';

export const VarietyGrid: React.FC = () => {
  return (
    <section
      id="sabores"
      className="relative py-20 sm:py-28 px-6 sm:px-12 bg-texture-creme text-[#49301B]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6 border-b border-[#49301B]/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#49301B]/15 bg-[#E7D2AC]/40 text-[#49301B]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.variety.categories.map((cat, idx) => (
            <article
              key={cat.id}
              className="group flex flex-col rounded-2xl bg-white border border-[#49301B]/10 overflow-hidden card-shadow-warm transform hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E7D2AC]/15">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Tag Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#221710]/90 text-[#F7F0E2] backdrop-blur-sm">
                  {cat.tag}
                </div>

                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[11px] font-bold text-[#49301B]">
                  0{idx + 1}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-3">
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
