import React from 'react';
import { Heart, MapPin, ArrowUp, Utensils } from 'lucide-react';
import { siteContent } from '../content/site';

export const Invitation: React.FC = () => {
  return (
    <section
      id="visita"
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-texture-cafe text-[#F7F0E2] overflow-hidden"
    >
      {/* Ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E7D2AC]/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#E7D2AC]/30 bg-[#49301B]/50 backdrop-blur-sm">
          <MapPin size={13} className="text-[#A64F33]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E7D2AC]">
            {siteContent.invitation.eyebrow}
          </span>
        </div>

        {/* Big Editorial Title */}
        <div className="space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F7F0E2] tracking-tight leading-[1.05]">
            Comida boa tem <span className="italic text-[#E7D2AC]">jeito de encontro.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F7F0E2]/80 font-light max-w-2xl mx-auto leading-relaxed">
            {siteContent.invitation.subtitle}
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
          {siteContent.invitation.highlights.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm space-y-2 card-shadow-deep"
            >
              <div className="w-8 h-8 rounded-full bg-[#A64F33]/30 flex items-center justify-center text-[#E7D2AC] mb-3">
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
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#sabores"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#E7D2AC] text-[#221710] hover:bg-white transition-all duration-300 shadow-lg hover:scale-105"
          >
            <Utensils size={14} />
            <span>{siteContent.invitation.ctaExplore}</span>
          </a>

          <a
            href="#inicio"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#F7F0E2] border border-[#E7D2AC]/30 hover:bg-[#49301B]/50 transition-colors"
          >
            <span>{siteContent.invitation.ctaTop}</span>
            <ArrowUp size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};
