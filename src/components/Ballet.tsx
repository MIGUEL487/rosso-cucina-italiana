import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '../content/site';
import { CalloutLabel } from './CalloutLabel';

interface BalletProps {
  onRotateNudge?: (direction: 'left' | 'right') => void;
}

export const Ballet: React.FC<BalletProps> = ({ onRotateNudge }) => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 overflow-hidden select-none bg-cream-radial text-ink">
      {/* Top Left Title Block */}
      <div className="ballet-title-block pt-24 sm:pt-28 z-20 max-w-lg pointer-events-none">
        <span className="ballet-eyebrow text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-ink/75 uppercase block mb-2">
          {siteContent.ballet.eyebrow}
        </span>
        <h2 className="ballet-title font-serif text-4xl sm:text-5xl md:text-6xl text-ink uppercase leading-[0.95] tracking-tight">
          {siteContent.ballet.title}
        </h2>
      </div>

      {/* Central Choreography Stage: Spiral (70-80% viewport height) + Orbiting Ingredients */}
      <div className="ballet-stage absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[1100px] h-full flex items-center justify-center">
          
          {/* Central Spaghetti Spiral (Ampliada para 70-80% da altura da viewport) */}
          <div className="ballet-spiral-wrapper absolute z-20 w-[300px] sm:w-[420px] md:w-[500px] h-[65vh] sm:h-[75vh] max-h-[820px] flex items-center justify-center">
            <img
              src="/assets/spiral-spaghetti.png"
              alt="Espiral em S de espaguete artesanal com molho de tomate"
              className="ballet-spiral-img w-full h-full object-contain filter drop-shadow-[0_24px_36px_rgba(80,0,0,0.18)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Orbiting Ingredient 1: Top-Left Open Mussel */}
          <div
            className="ballet-item ballet-item-mussel-1 absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ left: '14%', top: '22%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-mussel-open.png"
                alt="Mexilhão fresco aberto"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)] -rotate-12"
              />
              <CalloutLabel label="Mexilhões frescos" side="left" />
            </div>
          </div>

          {/* Orbiting Ingredient 2: Top-Right Whole Cherry Tomato */}
          <div
            className="ballet-item ballet-item-tomato-1 absolute z-20 w-20 sm:w-28 md:w-32 aspect-square"
            style={{ right: '16%', top: '18%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-tomato.png"
                alt="Tomate cereja maduro"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(200,40,30,0.28)] rotate-15"
              />
              <CalloutLabel label="Tomates maduros" side="right" />
            </div>
          </div>

          {/* Orbiting Ingredient 3: Lower-Left Halved Cherry Tomato */}
          <div
            className="ballet-item ballet-item-tomato-2 absolute z-20 w-20 sm:w-28 md:w-32 aspect-square"
            style={{ left: '18%', top: '64%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-tomato-2.png"
                alt="Tomate cereja cortado ao meio"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(200,40,30,0.25)] -rotate-20"
              />
              <CalloutLabel label="Tomates maduros" side="left" />
            </div>
          </div>

          {/* Orbiting Ingredient 4: Center-Right Open Mussel */}
          <div
            className="ballet-item ballet-item-mussel-2 absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ right: '24%', top: '48%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-mussel-2.png"
                alt="Mexilhão"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)] rotate-45 scale-95"
              />
              <CalloutLabel label="Mexilhões frescos" side="right" />
            </div>
          </div>

          {/* Orbiting Ingredient 5: Bottom-Right Curled Shrimp */}
          <div
            className="ballet-item ballet-item-shrimp absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ right: '15%', bottom: '15%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-shrimp.png"
                alt="Camarão selvagem cozido"
                className="w-full h-full object-contain filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.25)] rotate-12"
              />
              <CalloutLabel label="Camarão selvagem" side="right" />
            </div>
          </div>

          {/* Orbiting Ingredient 6: Floating Basil Leaves */}
          <div
            className="ballet-item ballet-item-basil absolute z-20 w-20 sm:w-28 aspect-square"
            style={{ left: '46%', bottom: '22%' }}
          >
            <div className="relative w-full h-full">
              <img
                src="/assets/ing-basil.png"
                alt="Folhas frescas de manjericão"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(76,122,52,0.3)] rotate-25"
              />
              <CalloutLabel label="Folhas de manjericão" side="left" />
            </div>
          </div>

          {/* Central Callout for the Spaghetti Spiral */}
          <div
            className="ballet-item ballet-item-spaghetti-callout absolute z-20 w-8 h-8 pointer-events-none"
            style={{ left: '42%', top: '38%' }}
          >
            <CalloutLabel label="Espaguete artesanal" side="left" />
          </div>
        </div>
      </div>

      {/* Discrete Side Navigation Arrows (apenas no Ato 2) */}
      <div className="ballet-arrow absolute inset-y-0 left-4 sm:left-8 flex items-center z-30">
        <button
          type="button"
          onClick={() => onRotateNudge && onRotateNudge('left')}
          aria-label="Girar ingredientes para a esquerda"
          className="p-3 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors pointer-events-auto min-touch-target flex items-center justify-center"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      </div>
      <div className="ballet-arrow absolute inset-y-0 right-4 sm:right-8 flex items-center z-30">
        <button
          type="button"
          onClick={() => onRotateNudge && onRotateNudge('right')}
          aria-label="Girar ingredientes para a direita"
          className="p-3 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors pointer-events-auto min-touch-target flex items-center justify-center"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="h-12" />
    </div>
  );
};
