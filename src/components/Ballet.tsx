import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '../content/site';
import { CalloutLabel } from './CalloutLabel';

interface BalletProps {
  onRotateNudge?: (direction: 'left' | 'right') => void;
}

export const Ballet: React.FC<BalletProps> = ({ onRotateNudge }) => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-24 overflow-hidden select-none bg-cream-radial text-ink">
      {/* Top Left Title Block */}
      <div className="ballet-title-block pt-24 sm:pt-28 z-20 max-w-lg">
        <span className="ballet-eyebrow text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-ink/70 uppercase block mb-3">
          {siteContent.ballet.eyebrow}
        </span>
        <h2 className="ballet-title font-serif text-4xl sm:text-5xl md:text-6xl text-ink uppercase leading-[0.95] tracking-tight">
          {siteContent.ballet.title}
        </h2>
      </div>

      {/* Central Choreography Stage: Spiral + Orbiting Ingredients + Callouts */}
      <div className="ballet-stage absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[900px] h-full max-h-[750px] flex items-center justify-center">
          
          {/* Central Spaghetti Spiral */}
          <div className="ballet-spiral-wrapper absolute z-20 w-[240px] sm:w-[320px] md:w-[380px] h-[500px] sm:h-[620px] flex items-center justify-center">
            <img
              src="/assets/spiral-spaghetti.png"
              alt="Espiral em S de espaguete artesanal com molho de tomate"
              className="ballet-spiral-img w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(80,0,0,0.18)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Orbiting Ingredient 1: Top-Left Open Mussel */}
          <div
            className="ballet-item ballet-item-mussel-1 absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ left: '16%', top: '24%' }}
          >
            <img
              src="/assets/ing-mussel-open.png"
              alt="Mexilhão fresco aberto"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)] -rotate-12"
            />
          </div>
          <CalloutLabel
            label="Mexilhões frescos"
            x={15}
            y={28}
            side="left"
          />

          {/* Orbiting Ingredient 2: Top-Right Whole Cherry Tomato */}
          <div
            className="ballet-item ballet-item-tomato-1 absolute z-20 w-20 sm:w-28 md:w-32 aspect-square"
            style={{ right: '18%', top: '20%' }}
          >
            <img
              src="/assets/ing-tomato.png"
              alt="Tomate cereja maduro"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(200,40,30,0.3)] rotate-15"
            />
          </div>
          <CalloutLabel
            label="Tomates maduros"
            x={75}
            y={24}
            side="right"
          />

          {/* Orbiting Ingredient 3: Lower-Left Halved Cherry Tomato */}
          <div
            className="ballet-item ballet-item-tomato-2 absolute z-20 w-20 sm:w-28 md:w-32 aspect-square"
            style={{ left: '22%', top: '62%' }}
          >
            <img
              src="/assets/ing-tomato-2.png"
              alt="Tomate cereja cortado ao meio"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(200,40,30,0.25)] -rotate-20"
            />
          </div>
          <CalloutLabel
            label="Tomates maduros"
            x={22}
            y={66}
            side="left"
          />

          {/* Orbiting Ingredient 4: Center-Right Open Mussel */}
          <div
            className="ballet-item ballet-item-mussel-2 absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ right: '28%', top: '50%' }}
          >
            <img
              src="/assets/ing-mussel-open.png"
              alt="Mexilhão aberto"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)] rotate-45 scale-90"
            />
          </div>
          <CalloutLabel
            label="Mexilhões frescos"
            x={65}
            y={52}
            side="right"
          />

          {/* Orbiting Ingredient 5: Bottom-Right Curled Shrimp */}
          <div
            className="ballet-item ballet-item-shrimp absolute z-20 w-24 sm:w-32 md:w-36 aspect-square"
            style={{ right: '16%', bottom: '16%' }}
          >
            <img
              src="/assets/ing-shrimp.png"
              alt="Camarão selvagem cozido"
              className="w-full h-full object-contain filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.25)] rotate-12"
            />
          </div>
          <CalloutLabel
            label="Camarão selvagem"
            x={78}
            y={80}
            side="right"
          />

          {/* Orbiting Ingredient 6: Floating Basil Leaves */}
          <div
            className="ballet-item ballet-item-basil absolute z-20 w-16 sm:w-24 aspect-square"
            style={{ left: '46%', bottom: '26%' }}
          >
            <img
              src="/assets/ing-basil.png"
              alt="Folhas frescas de manjericão"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(76,122,52,0.3)] rotate-25"
            />
          </div>
          <CalloutLabel
            label="Folhas de manjericão"
            x={47}
            y={76}
            side="left"
          />

          {/* Central Callout for the Spaghetti itself */}
          <CalloutLabel
            label="Espaguete artesanal"
            x={40}
            y={40}
            side="left"
          />
        </div>
      </div>

      {/* Discrete Side Navigation Arrows (as seen in video reference 2) */}
      <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-30">
        <button
          type="button"
          onClick={() => onRotateNudge && onRotateNudge('left')}
          aria-label="Girar ingredientes para a esquerda"
          className="p-3 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors pointer-events-auto min-touch-target flex items-center justify-center"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-30">
        <button
          type="button"
          onClick={() => onRotateNudge && onRotateNudge('right')}
          aria-label="Girar ingredientes para a direita"
          className="p-3 rounded-full hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors pointer-events-auto min-touch-target flex items-center justify-center"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Bottom spacer for layout balance */}
      <div className="h-12" />
    </div>
  );
};
