import React from 'react';
import { ChevronDown, Sparkles, Flame, Heart } from 'lucide-react';
import { siteContent } from '../content/site';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 sm:px-12 bg-texture-cafe overflow-hidden"
    >
      {/* Warm ambient radial glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E7D2AC]/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#A64F33]/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto z-10">
        
        {/* Left Column: Editorial Typography & Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E7D2AC]/30 bg-[#49301B]/40 backdrop-blur-sm self-start">
            <Sparkles size={13} className="text-[#E7D2AC]" />
            <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#E7D2AC] font-semibold">
              {siteContent.hero.eyebrow}
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.98] text-[#F7F0E2]">
              Sabor que <span className="italic text-[#E7D2AC] underline decoration-[#A64F33]/60 underline-offset-8">reúne</span>.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#F7F0E2]/85 font-light leading-relaxed max-w-xl pt-2">
              {siteContent.hero.subtitle}
            </p>
          </div>

          {/* Key Pillars / Differentiators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-[#E7D2AC] font-semibold flex items-center space-x-1.5">
                <Flame size={12} className="text-[#A64F33]" />
                <span>Buffet Diário</span>
              </span>
              <span className="text-[11px] text-[#F7F0E2]/70 mt-1">Variedade com fartura e frescor</span>
            </div>

            <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-[#E7D2AC] font-semibold flex items-center space-x-1.5">
                <Sparkles size={12} className="text-[#E7D2AC]" />
                <span>Assados</span>
              </span>
              <span className="text-[11px] text-[#F7F0E2]/70 mt-1">Forno lento e tempero artesanal</span>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider text-[#E7D2AC] font-semibold flex items-center space-x-1.5">
                <Heart size={12} className="text-[#A64F33]" />
                <span>Tradição</span>
              </span>
              <span className="text-[11px] text-[#F7F0E2]/70 mt-1">O sabor acolhedor de Monte Sião</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#nossa-cozinha"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs uppercase font-semibold tracking-widest bg-[#E7D2AC] text-[#221710] hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              {siteContent.hero.ctaPrimary}
            </a>

            <a
              href="#especialidade"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs uppercase font-semibold tracking-widest text-[#F7F0E2] border border-[#E7D2AC]/40 hover:bg-[#49301B]/50 hover:border-[#E7D2AC] transition-all duration-300"
            >
              {siteContent.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Gastronomic Asymmetric Composition */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
          
          {/* Card 1 (Center Principal): Assados no Buffet */}
          <div className="relative z-20 w-[72%] sm:w-[68%] rounded-2xl overflow-hidden border border-[#E7D2AC]/20 card-shadow-deep bg-[#2D1F16] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/cantina-viana/reais/buffet-assados.webp"
                alt="Assados dourados no buffet da Cantina Viana"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#221710] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#A64F33] text-white">
                Assados Especiais
              </div>
            </div>
            <div className="p-4 bg-[#2D1F16]">
              <p className="font-serif text-lg text-[#F7F0E2] leading-tight">Carnes na brasa e assados de forno</p>
              <p className="text-[11px] text-[#E7D2AC]/75 mt-1 font-light">Preparados diariamente com ervas frescas e sabor caseiro</p>
            </div>
          </div>

          {/* Card 2 (Top Right Offset): Massa Colorida */}
          <div className="absolute -top-4 sm:-top-8 -right-2 sm:right-2 z-30 w-[45%] sm:w-[42%] rounded-xl overflow-hidden border border-[#E7D2AC]/30 card-shadow-deep bg-[#3A2615] transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img
                src="/images/cantina-viana/reais/buffet-macarrao-colorido.webp"
                alt="Massa colorida com tempero verde servida na Cantina Viana"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#221710] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-2 left-2 right-2 text-left">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-[#E7D2AC] bg-[#221710]/80 px-2 py-0.5 rounded">
                  Massas Frescas
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 (Bottom Left Offset): Prato Feito Caseiro */}
          <div className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:left-4 z-30 w-[46%] sm:w-[44%] rounded-xl overflow-hidden border border-[#E7D2AC]/30 card-shadow-deep bg-[#3A2615] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img
                src="/images/cantina-viana/reais/prato-feito-carne-e-acompanhamentos.webp"
                alt="Prato feito típico mineiro na Cantina Viana"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#221710] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-2 left-2 right-2 text-left">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-[#F7F0E2] bg-[#A64F33]/90 px-2 py-0.5 rounded">
                  Comida com Alma
                </span>
              </div>
            </div>
          </div>

          {/* Card 4 (Small Floating Badge Right): Salada Verde Fresca */}
          <div className="hidden sm:flex absolute bottom-8 -right-6 z-40 items-center space-x-2 px-3 py-2 rounded-xl border border-[#E7D2AC]/30 bg-[#221710]/95 backdrop-blur-md shadow-xl">
            <img
              src="/images/cantina-viana/reais/salada-verde-prato.webp"
              alt="Salada verde fresca"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E7D2AC]">Horta Fresca</span>
              <span className="text-[9px] text-[#F7F0E2]/80">Saladas selecionadas</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 text-center">
        <a
          href="#nossa-cozinha"
          className="group inline-flex flex-col items-center space-y-1 text-[#E7D2AC]/70 hover:text-[#E7D2AC] transition-colors focus:outline-none"
          aria-label="Rolar para a seção Nossa Cozinha"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Role para conhecer</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};
