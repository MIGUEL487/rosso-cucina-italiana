import React from 'react';
import { siteContent } from '../content/site';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#170F0B] text-[#F7F0E2] border-t border-white/10 pt-16 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={siteContent.brand.logoTransparent}
                alt="Cantina Viana Restaurante"
                className="h-12 w-auto object-contain filter-logo-cream"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif text-2xl tracking-wide leading-none text-[#F7F0E2]">
                  CANTINA VIANA
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#E7D2AC] font-medium mt-1">
                  Restaurante · Monte Sião - MG
                </span>
              </div>
            </div>
            <p className="text-xs text-[#F7F0E2]/70 max-w-sm pt-2 font-light">
              {siteContent.footer.summary}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E7D2AC]">
              Navegação
            </span>
            <nav className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider text-[#F7F0E2]/80">
              {siteContent.footer.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#E7D2AC] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F7F0E2]/50">
          <p>{siteContent.footer.copyright}</p>
          <p>{siteContent.footer.city}</p>
        </div>

      </div>
    </footer>
  );
};
