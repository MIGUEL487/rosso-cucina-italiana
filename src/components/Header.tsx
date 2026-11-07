import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { siteContent } from '../content/site';

interface HeaderProps {
  isCream: boolean;
  activeSection: number;
}

export const Header: React.FC<HeaderProps> = ({ isCream, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 px-6 sm:px-12 py-5 sm:py-6 ${
        isCream ? 'bg-cream-100/90 text-ink backdrop-blur-md shadow-sm' : 'bg-transparent text-cream-50'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#inicio" className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-cream-50/50 rounded-sm">
          <span className="font-serif text-3xl sm:text-4xl tracking-wider leading-none transition-transform duration-300 group-hover:scale-105">
            {siteContent.brand.name}
          </span>
          <span className="font-serif italic text-xs tracking-widest opacity-80 mt-0.5">
            {siteContent.brand.subtitle}
          </span>
        </a>

        {/* Center content: Desktop Nav on Hero OR "O BALÉ DOS INGREDIENTES" on Cream */}
        <div className="hidden md:flex items-center justify-center relative min-h-[32px]">
          {/* Ato 1 Nav */}
          <nav
            className={`flex items-center space-x-8 text-xs tracking-[0.18em] font-medium transition-all duration-500 ${
              isCream
                ? 'opacity-0 -translate-y-3 pointer-events-none absolute'
                : 'opacity-100 translate-y-0 relative'
            }`}
          >
            {siteContent.nav.map((item, idx) => {
              const isActive = idx === activeSection;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-200 hover:text-white py-1 relative ${
                    isActive ? 'text-white' : 'text-cream-50/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-cream-50 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Atos 2 & 3 Center Title */}
          <div
            className={`transition-all duration-500 font-sans text-xs tracking-[0.25em] font-semibold text-ink uppercase ${
              isCream
                ? 'opacity-100 translate-y-0 relative'
                : 'opacity-0 translate-y-3 pointer-events-none absolute'
            }`}
          >
            {siteContent.ballet.headerTitle}
          </div>
        </div>

        {/* Right CTA + Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Action button: changes visual style between Hero and Cream */}
          <div className="flex items-center">
            {isCream ? (
              // Cream state: Pill + Wine Square with White Search Icon (as seen in video reference 2 & 3)
              <div className="flex items-center shadow-sm">
                <a
                  href="#cardapio"
                  className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-l-full border border-r-0 border-ink/70 text-xs font-semibold tracking-wider text-ink hover:bg-ink/5 transition-colors"
                >
                  {siteContent.headerCta.creamLabel}
                </a>
                <button
                  type="button"
                  aria-label={siteContent.headerCta.searchAria}
                  className="w-10 h-10 rounded-full sm:rounded-none sm:rounded-r-xl bg-wine-900 text-cream-50 flex items-center justify-center hover:bg-wine-700 transition-colors"
                >
                  <Search size={16} />
                </button>
              </div>
            ) : (
              // Hero wine state: Pill button with subtle cream outline & inline search icon
              <a
                href="#cardapio"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-cream-50/70 text-xs font-semibold tracking-wider text-cream-50 hover:bg-cream-50 hover:text-wine-900 transition-all duration-300"
              >
                <span>{siteContent.headerCta.heroLabel}</span>
                <Search size={14} className="opacity-90" />
              </a>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className={`p-2 rounded-full min-touch-target flex items-center justify-center transition-colors ${
              isCream ? 'hover:bg-ink/10 text-ink' : 'hover:bg-white/10 text-cream-50'
            }`}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-wine-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-8 space-y-8 animate-fadeIn md:hidden">
          <nav className="flex flex-col items-center space-y-6 text-base tracking-[0.2em] font-medium text-cream-50">
            {siteContent.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-6 border-t border-cream-50/20 w-48 text-center">
            <a
              href="#reservar"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3 rounded-full bg-cream-50 text-wine-900 text-xs font-bold tracking-widest hover:bg-white transition-colors"
            >
              {siteContent.masterpiece.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
