import React from 'react';

interface PageDotsProps {
  currentAct: number; // 0, 1, 2
  onActClick?: (actIndex: number) => void;
  isCream: boolean;
}

export const PageDots: React.FC<PageDotsProps> = ({ currentAct, onActClick, isCream }) => {
  return (
    <div
      className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-4"
      aria-label="Navegação por atos"
    >
      {[0, 1, 2].map((actIndex) => {
        const isActive = currentAct === actIndex;
        return (
          <button
            key={actIndex}
            type="button"
            onClick={() => onActClick && onActClick(actIndex)}
            aria-label={`Ir para o Ato ${actIndex + 1}`}
            className="group p-2 flex items-center justify-center focus:outline-none"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? isCream
                    ? 'w-2.5 h-2.5 bg-ink ring-2 ring-ink/30 ring-offset-2 ring-offset-cream-100'
                    : 'w-2.5 h-2.5 bg-cream-50 ring-2 ring-cream-50/40 ring-offset-2 ring-offset-wine-900'
                  : isCream
                  ? 'w-1.5 h-1.5 bg-ink/30 group-hover:bg-ink/60'
                  : 'w-1.5 h-1.5 bg-cream-50/40 group-hover:bg-cream-50/80'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
