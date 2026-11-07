import React from 'react';
import { siteContent } from '../content/site';

interface HeroProps {
  // Ref handles or class selectors used by GSAP ScrollTrigger
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-between px-6 sm:px-12 lg:px-24 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20 pb-12">
        {/* Left Typography Block (Cols 1-7 on desktop) */}
        <div className="hero-text-block lg:col-span-7 flex flex-col justify-center items-start space-y-6 sm:space-y-8 z-20">
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center space-x-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-cream-50/70 uppercase">
              {siteContent.hero.eyebrow}
            </span>
          </div>

          {/* Main Title: 3 lines in Instrument Serif */}
          <h1 className="hero-title font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal leading-[0.92] tracking-tight text-cream-50 uppercase">
            {siteContent.hero.titleLines.map((line, idx) => (
              <span key={idx} className="block hero-title-line">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className="hero-subtitle space-y-1 text-sm sm:text-base md:text-lg text-cream-50/80 font-sans font-light tracking-wide max-w-md">
            {siteContent.hero.subtitle.map((sub, idx) => (
              <p key={idx}>{sub}</p>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="hero-cta-wrap pt-2">
            <a
              href="#cardapio"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-cream-50 text-wine-900 font-sans font-semibold text-xs tracking-[0.16em] uppercase shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 min-touch-target"
            >
              {siteContent.hero.cta}
            </a>
          </div>
        </div>

        {/* Right Visual Block: Fork & Spaghetti Twirl (Cols 8-12 on desktop) */}
        <div className="hero-visual-block lg:col-span-5 relative flex items-center justify-center h-[50vh] lg:h-full pointer-events-none">
          <div className="hero-fork-container relative w-full max-w-[420px] lg:max-w-[540px] aspect-[3/4] flex items-center justify-center">
            {/* The Fork Twirl Image */}
            <img
              src="/assets/hero-fork-twirl.png"
              alt="Espaguete artesanal enrolado no garfo com camarão e manjericão fresco"
              className="hero-fork-img w-full h-full object-contain filter drop-shadow-[0_24px_36px_rgba(0,0,0,0.6)] transform translate-y-0 rotate-0"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
