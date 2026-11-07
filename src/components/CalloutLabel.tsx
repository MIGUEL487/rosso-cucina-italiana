import React from 'react';

interface CalloutLabelProps {
  label: string;
  side?: 'left' | 'right';
  className?: string;
}

export const CalloutLabel: React.FC<CalloutLabelProps> = ({
  label,
  side = 'left',
  className = '',
}) => {
  const isLeft = side === 'left';

  return (
    <div
      className={`ballet-callout absolute pointer-events-none select-none z-30 transition-opacity duration-300 ${className}`}
      style={{
        top: '40%',
        ...(isLeft ? { right: '100%', marginRight: '8px' } : { left: '100%', marginLeft: '8px' }),
      }}
    >
      <div className="relative flex items-center whitespace-nowrap">
        {/* SVG elbow line */}
        <svg
          className="absolute overflow-visible pointer-events-none"
          width="80"
          height="32"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            ...(isLeft ? { right: 0 } : { left: 0 }),
          }}
        >
          {isLeft ? (
            <path
              className="callout-line"
              d="M 80 16 L 36 16 L 10 28"
              fill="none"
              stroke="#500000"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          ) : (
            <path
              className="callout-line"
              d="M 0 16 L 44 16 L 70 28"
              fill="none"
              stroke="#500000"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          )}
          {/* Endpoint dot touching the ingredient */}
          <circle
            cx={isLeft ? 80 : 0}
            cy="16"
            r="2.5"
            fill="#500000"
          />
        </svg>

        {/* Text label */}
        <span
          className={`font-serif italic text-sm sm:text-base text-ink tracking-wide ${
            isLeft ? 'pr-20' : 'pl-20'
          }`}
          style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
