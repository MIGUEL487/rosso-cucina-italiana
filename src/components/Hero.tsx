import React from 'react';
import { siteContent } from '../content/site';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-hero-radial">
      {/* Container de conteúdo do Hero */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end lg:justify-center pb-12 sm:pb-16 lg:pb-0 pointer-events-none">
        
        {/* Bloco de Tipografia (Desktop: lado esquerdo; Mobile: abaixo da imagem) */}
        <div className="hero-text-block w-full max-w-xl lg:max-w-2xl flex flex-col items-start space-y-4 sm:space-y-6 lg:space-y-8 pointer-events-auto z-20">
          
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center space-x-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-cream-50/75 uppercase">
              {siteContent.hero.eyebrow}
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="hero-title font-serif text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-normal leading-[0.92] tracking-tight text-cream-50 uppercase">
            {siteContent.hero.titleLines.map((line, idx) => (
              <span key={idx} className="block hero-title-line">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtítulo */}
          <div className="hero-subtitle space-y-1 text-xs sm:text-sm md:text-base text-cream-50/80 font-sans font-light tracking-wide max-w-md">
            {siteContent.hero.subtitle.map((sub, idx) => (
              <p key={idx}>{sub}</p>
            ))}
          </div>

          {/* Botão de Ação CTA */}
          <div className="hero-cta-wrap pt-2">
            <a
              href="#cardapio"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-cream-50 text-wine-900 font-sans font-semibold text-xs tracking-[0.18em] uppercase shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 min-touch-target"
            >
              {siteContent.hero.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
