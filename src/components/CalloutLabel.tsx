import React from 'react';

interface CalloutLabelProps {
  label: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  side?: 'left' | 'right';
  active?: boolean;
}

export const CalloutLabel: React.FC<CalloutLabelProps> = ({
  label,
  x,
  y,
  side = 'left',
  active = true,
}) => {
  const isLeft = side === 'left';

  return (
    <div
      className={`absolute pointer-events-none transition-opacity duration-700 select-none z-30 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative flex items-center">
        {/* SVG elbow line */}
        <svg
          className="absolute overflow-visible pointer-events-none"
          width="90"
          height="40"
          style={{
            transform: isLeft ? 'translate(-80px, -20px)' : 'translate(0px, -20px)',
          }}
        >
          {isLeft ? (
            <path
              d="M 80 20 L 40 20 L 10 35"
              fill="none"
              stroke="#500000"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />
          ) : (
            <path
              d="M 10 20 L 50 20 L 80 35"
              fill="none"
              stroke="#500000"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />
          )}
          {/* Target endpoint dot */}
          <circle
            cx={isLeft ? 80 : 10}
            cy="20"
            r="2.5"
            fill="#500000"
          />
        </svg>

        {/* Text label */}
        <span
          className={`font-serif italic text-sm sm:text-base text-ink whitespace-nowrap tracking-wide drop-shadow-sm ${
            isLeft ? '-translate-x-full pr-3' : 'translate-x-20 pl-3'
          }`}
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
