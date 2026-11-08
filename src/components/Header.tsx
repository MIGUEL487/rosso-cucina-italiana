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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 sm:px-12 py-3 sm:py-4 ${
        isCream
          ? 'bg-[#F7F0E2]/92 backdrop-blur-md border-b border-[#49301B]/10 text-[#49301B] shadow-sm'
          : 'bg-[#1F130B]/75 backdrop-blur-md border-b border-white/5 text-[#F7F0E2]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo matching reference exact */}
        <a
          href="#inicio"
          className="group flex items-center focus:outline-none rounded-lg transition-transform duration-300 hover:scale-[1.03]"
          aria-label="Cantina Viana Restaurante — Início"
        >
          <img
            src={
              isCream
                ? '/images/cantina-viana/marca/logo-transparente.png'
                : '/images/cantina-viana/marca/logo-cream-transparente.png'
            }
            alt="Cantina Viana Restaurante"
            className="h-12 sm:h-14 w-auto object-contain transition-opacity duration-300"
          />
        </a>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-8 text-[11px] lg:text-xs tracking-[0.2em] uppercase font-medium"
          aria-label="Navegação principal"
        >
          {siteContent.nav.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
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
                    ? 'text-white font-semibold'
                    : 'text-[#F7F0E2]/75 hover:text-white'
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

        {/* Right CTA Button matching reference exact */}
        <div className="flex items-center space-x-3">
          <a
            href={siteContent.headerCta.href}
            className={`hidden sm:inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:scale-[1.02] ${
              isCream
                ? 'bg-[#49301B] text-[#F7F0E2] hover:bg-[#221710]'
                : 'bg-[#E7D2AC] text-[#221710] hover:bg-white hover:text-black'
            }`}
          >
            <UtensilsCrossed size={14} className="stroke-[2.2]" />
            <span>{siteContent.headerCta.label}</span>
          </a>

          {/* Mobile menu toggle */}
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
              : 'bg-[#1F130B] border-white/10 text-[#F7F0E2] shadow-xl'
          }`}
        >
          <div className="flex flex-col space-y-3 text-xs font-medium tracking-[0.18em] uppercase">
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
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-full text-xs uppercase font-semibold tracking-wider bg-[#E7D2AC] text-[#221710] hover:bg-white transition-colors"
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
