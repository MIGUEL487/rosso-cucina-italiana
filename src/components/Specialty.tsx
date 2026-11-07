import React from 'react';
import { Layers, Bookmark, CheckCircle2, ChevronRight } from 'lucide-react';
import { siteContent } from '../content/site';

export const Specialty: React.FC = () => {
  return (
    <section
      id="especialidade"
      className="relative py-20 sm:py-28 px-6 sm:px-12 bg-[#2D1F16] text-[#F7F0E2] overflow-hidden"
    >
      {/* Background geometric watermark representing square pasta cutting grids */}
      <div className="pointer-events-none absolute inset-0 opacity-5 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <svg width="800" height="800" viewBox="0 0 100 100" className="text-[#E7D2AC] stroke-current fill-none stroke-[0.5]">
          <pattern id="square-pasta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,1" />
          </pattern>
          <rect width="100" height="100" fill="url(#square-pasta-grid)" />
        </svg>
      </div>

      {/* Warm accent glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#A64F33]/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase with Geometric Framing */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Geometric Art & Framing */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[#49301B] via-[#221710] to-[#3A2615] border border-[#E7D2AC]/25 card-shadow-deep">
              
              {/* Inner geometric crop */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#221710]">
                <img
                  src={siteContent.specialty.image}
                  alt={siteContent.specialty.imageCaption}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#221710] via-transparent to-transparent opacity-80" />

                {/* Cultural Heritage Pill */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#A64F33] text-white shadow-md">
                  <Bookmark size={12} />
                  <span>{siteContent.specialty.badge}</span>
                </div>

                {/* Geometric Cut Visual Accent */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#221710]/90 backdrop-blur-md border border-[#E7D2AC]/20">
                  <p className="text-xs sm:text-sm text-[#F7F0E2] font-medium leading-snug">
                    {siteContent.specialty.imageCaption}
                  </p>
                  <p className="text-[10px] text-[#E7D2AC]/70 mt-1 uppercase tracking-wider">
                    Foto real do cardápio Cantina Viana
                  </p>
                </div>
              </div>

              {/* Decorative Corner Geometric Tabs */}
              <div className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-[#E7D2AC]" />
              <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-[#E7D2AC]" />
            </div>

            {/* Stylized pasta cut graphic badge */}
            <div className="mt-6 flex items-center space-x-3 px-4 py-2 rounded-xl bg-[#49301B]/50 border border-[#E7D2AC]/20 text-xs text-[#E7D2AC]">
              <Layers size={15} className="text-[#A64F33]" />
              <span className="tracking-wide">
                Massa com corte característico tradicional de Monte Sião
              </span>
            </div>

          </div>

          {/* Right Column: Cultural & Affective Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E7D2AC]/30 bg-[#49301B]/60 text-[#E7D2AC] self-start">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                {siteContent.specialty.eyebrow}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7F0E2] tracking-tight leading-[1.05]">
                {siteContent.specialty.title}{' '}
                <span className="block italic text-[#E7D2AC]">
                  {siteContent.specialty.subtitle}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#F7F0E2]/85 font-light leading-relaxed pt-3">
                {siteContent.specialty.description}
              </p>
            </div>

            {/* Respectful, Authentic Highlights */}
            <div className="space-y-3.5 pt-2">
              {siteContent.specialty.notes.map((note) => (
                <div key={note} className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-[#A64F33] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#F7F0E2]/90 leading-normal">
                    {note}
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer on Cultural Connection */}
            <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-[11px] text-[#E7D2AC]/80 leading-relaxed">
              <span className="font-semibold text-[#E7D2AC]">Nota de autenticidade:</span> O macarrão quadrado é uma especialidade enraizada nos costumes culinários de Monte Sião e preparada com dedicação artesanal pela nossa equipe, valorizando o patrimônio afetivo da nossa cidade.
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href="#sabores"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#E7D2AC] text-[#221710] hover:bg-white transition-all duration-300 shadow-md"
              >
                <span>Descobrir Todos os Sabores</span>
                <ChevronRight size={14} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
