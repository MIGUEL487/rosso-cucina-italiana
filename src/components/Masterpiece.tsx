import React from 'react';
import { siteContent } from '../content/site';

interface MasterpieceProps {
  onReserveClick?: () => void;
}

export const Masterpiece: React.FC<MasterpieceProps> = ({ onReserveClick }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between px-6 sm:px-12 overflow-hidden select-none bg-cream-radial text-ink pt-24 sm:pt-28 pb-4">
      {/* Top Title Section */}
      <div className="masterpiece-header text-center z-20 max-w-3xl flex flex-col items-center pointer-events-auto">
        {/* Section number 03 in Serif Italic */}
        <span className="masterpiece-number font-serif italic text-xl sm:text-2xl text-ink/70 mb-1">
          {siteContent.masterpiece.number}
        </span>

        {/* Eyebrow */}
        <span className="masterpiece-eyebrow text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-ink/75 uppercase mb-3">
          {siteContent.masterpiece.eyebrow}
        </span>

        {/* Main Centered Title */}
        <h2 className="masterpiece-title font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink uppercase leading-[0.92] tracking-tight">
          {siteContent.masterpiece.title}
        </h2>

        {/* CTA Button */}
        <div className="masterpiece-cta pt-6">
          <a
            href="#reservar"
            onClick={(e) => {
              if (onReserveClick) {
                e.preventDefault();
                onReserveClick();
              }
            }}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-ink text-ink font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-ink hover:text-cream-50 active:scale-95 transition-all duration-300 shadow-sm min-touch-target"
          >
            {siteContent.masterpiece.cta}
          </a>
        </div>
      </div>

      {/* Big Masterpiece Plate rising from bottom */}
      <div className="masterpiece-plate-wrapper relative w-full max-w-[960px] aspect-[16/10] flex items-end justify-center pointer-events-none z-10 -mb-6 sm:-mb-12">
        <img
          src="/assets/plate-dish.png"
          alt="Obra-prima de espaguete artesanal com frutos do mar frescos servido no prato de cerâmica"
          className="masterpiece-plate-img w-full h-full object-contain filter drop-shadow-[0_28px_40px_rgba(80,0,0,0.22)]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};
