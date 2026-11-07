import React from 'react';

interface SectionLabelProps {
  label: string;
  number?: string;
  isCream: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label, isCream }) => {
  return (
    <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-20 pointer-events-none select-none">
      <span
        className={`text-[10px] tracking-[0.3em] font-semibold uppercase -rotate-90 origin-center whitespace-nowrap mb-6 transition-colors duration-500 ${
          isCream ? 'text-ink/60' : 'text-cream-50/60'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-[1px] h-24 transition-colors duration-500 ${
          isCream ? 'bg-ink/20' : 'bg-cream-50/20'
        }`}
      />
    </div>
  );
};
