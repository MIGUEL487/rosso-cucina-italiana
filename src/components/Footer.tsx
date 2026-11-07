import React from 'react';
import { siteContent } from '../content/site';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="relative w-full bg-cream-100 text-ink py-16 px-6 sm:px-12 lg:px-24 border-t border-ink/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif text-4xl tracking-wider text-ink">
            {siteContent.brand.name}
          </span>
          <span className="font-serif italic text-sm tracking-widest text-ink/70 mt-1">
            {siteContent.brand.subtitle}
          </span>
          <p className="mt-4 text-xs font-light tracking-wide text-ink/60 max-w-xs">
            {siteContent.footer.address}
          </p>
          <p className="mt-1 text-xs font-light tracking-wide text-ink/60">
            {siteContent.footer.hours}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <span className="text-[11px] font-bold tracking-[0.25em] text-ink/80 uppercase">
            Navegação
          </span>
          <div className="flex flex-col space-y-2 text-xs tracking-widest text-ink/70">
            {siteContent.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-ink hover:underline transition-colors py-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Socials & Contact */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <span className="text-[11px] font-bold tracking-[0.25em] text-ink/80 uppercase">
            Conecte-se
          </span>
          <div className="flex items-center space-x-6 text-xs tracking-wider text-ink/80 font-medium">
            <a
              href={siteContent.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink hover:underline transition-colors py-1"
            >
              Instagram
            </a>
            <a
              href={siteContent.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink hover:underline transition-colors py-1"
            >
              WhatsApp
            </a>
            <a
              href={siteContent.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink hover:underline transition-colors py-1"
            >
              Facebook
            </a>
          </div>
          <p className="text-[11px] text-ink/50 pt-6">
            {siteContent.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
