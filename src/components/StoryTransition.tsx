import React from 'react';
import { Utensils, Award, Sparkles } from 'lucide-react';
import { siteContent } from '../content/site';

export const StoryTransition: React.FC = () => {
  return (
    <section
      id="nossa-cozinha"
      className="relative pt-20 sm:pt-28 pb-20 sm:pb-28 px-6 sm:px-12 bg-texture-creme text-[#49301B] transition-colors duration-700"
    >
      {/* Seamless transition curve at top */}
      <div
        className="pointer-events-none absolute -top-1 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#221710] to-transparent z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Narrative Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#49301B]/15 bg-[#E7D2AC]/40 text-[#49301B]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {siteContent.story.items.map((item, index) => (
            <div
              key={item.title}
              className="group relative flex flex-col rounded-2xl bg-white border border-[#49301B]/10 overflow-hidden card-shadow-warm transform hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E7D2AC]/20">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F7F0E2]/90 backdrop-blur-sm flex items-center justify-center text-xs font-serif font-bold text-[#49301B] shadow-sm">
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

                <div className="pt-2 border-t border-[#49301B]/10 flex items-center justify-between text-xs text-[#526343] font-medium">
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
        <div className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl bg-[#E7D2AC]/30 border border-[#E7D2AC] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#49301B] text-[#F7F0E2] flex items-center justify-center shrink-0">
              <Award size={22} className="text-[#E7D2AC]" />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-[#221710] leading-tight">
                Receitas autênticas preparadas com carinho todo dia
              </p>
              <p className="text-xs sm:text-sm text-[#49301B]/80 mt-1">
                Ingredientes selecionados para valorizar cada momento à mesa com quem você gosta.
              </p>
            </div>
          </div>
          <a
            href="#especialidade"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#49301B] text-[#F7F0E2] hover:bg-[#221710] transition-colors shadow-sm"
          >
            Conheça a Especialidade
          </a>
        </div>

      </div>
    </section>
  );
};
