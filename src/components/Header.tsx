import React, { useState } from 'react';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { siteContent } from '../content/site';

interface HeaderProps {
  isCream: boolean;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ isCream, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-5 sm:px-10 py-3.5 sm:py-4 ${
        isCream
          ? 'bg-[#F7F0E2]/90 backdrop-blur-md border-b border-[#49301B]/10 text-[#49301B] shadow-sm'
          : 'bg-[#221710]/85 backdrop-blur-md border-b border-[#E7D2AC]/10 text-[#F7F0E2]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#inicio"
          className="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#E7D2AC]/50 rounded-lg p-1 transition-transform duration-300 hover:scale-[1.02]"
          aria-label="Cantina Viana Restaurante — Início"
        >
          <img
            src={siteContent.brand.logoTransparent}
            alt="Cantina Viana Restaurante"
            className={`h-10 sm:h-12 w-auto object-contain transition-all duration-300 ${
              isCream ? '' : 'filter-logo-cream'
            }`}
          />
          <div className="flex flex-col">
            <span className={`font-serif tracking-wide font-normal text-xl sm:text-2xl leading-none ${
              isCream ? 'text-[#49301B]' : 'text-[#F7F0E2]'
            }`}>
              CANTINA VIANA
            </span>
            <span className={`text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium mt-0.5 ${
              isCream ? 'text-[#A64F33]' : 'text-[#E7D2AC]'
            }`}>
              Restaurante · Monte Sião
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-7 text-xs tracking-[0.14em] uppercase font-medium"
          aria-label="Navegação principal"
        >
          {siteContent.nav.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 py-1 relative ${
                  isCream
                    ? isActive
                      ? 'text-[#A64F33] font-semibold'
                      : 'text-[#49301B]/80 hover:text-[#49301B]'
                    : isActive
                    ? 'text-[#E7D2AC] font-semibold'
                    : 'text-[#F7F0E2]/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] rounded-full ${
                      isCream ? 'bg-[#A64F33]' : 'bg-[#E7D2AC]'
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <a
            href={siteContent.headerCta.href}
            className={`hidden sm:inline-flex items-center space-x-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm ${
              isCream
                ? 'bg-[#49301B] text-[#F7F0E2] hover:bg-[#221710]'
                : 'bg-[#E7D2AC] text-[#221710] hover:bg-white'
            }`}
          >
            <UtensilsCrossed size={13} />
            <span>{siteContent.headerCta.label}</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-[#E7D2AC] ${
              isCream ? 'text-[#49301B] hover:bg-[#49301B]/10' : 'text-[#F7F0E2] hover:bg-white/10'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 pt-4 pb-6 mt-3 border-t rounded-2xl transition-all duration-300 ${
            isCream
              ? 'bg-[#FDFBF7] border-[#49301B]/15 text-[#49301B] shadow-lg'
              : 'bg-[#221710] border-[#E7D2AC]/20 text-[#F7F0E2] shadow-xl'
          }`}
        >
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase">
            {siteContent.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isCream ? 'hover:bg-[#49301B]/5 hover:text-[#A64F33]' : 'hover:bg-white/10 hover:text-[#E7D2AC]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={siteContent.headerCta.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-full text-xs uppercase font-semibold tracking-wider bg-[#A64F33] text-white hover:bg-[#8C3F27] transition-colors"
              >
                <UtensilsCrossed size={14} />
                <span>{siteContent.headerCta.label}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
