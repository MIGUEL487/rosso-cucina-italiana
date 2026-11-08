import React, { useEffect, useRef } from 'react';
import { Layers, Bookmark, CheckCircle2, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const Specialty: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualColRef = useRef<HTMLDivElement | null>(null);
  const cardFrameRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visualCol = visualColRef.current;
    const textCol = textColRef.current;
    const cardFrame = cardFrameRef.current;
    const watermark = watermarkRef.current;
    if (!section || !visualCol || !textCol) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Left Column (Framed Dish Card) reveal
      tl.fromTo(
        cardFrame,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1 }
      );

      // Right Column (Editorial Text & Badges) staggered reveal
      const textChildren = textCol.querySelectorAll('.anim-text-item');
      tl.fromTo(
        textChildren,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        '-=0.7'
      );

      // 2. Parallax scrub on the geometric background grid
      if (watermark) {
        gsap.to(watermark, {
          y: 60,
          rotate: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 3. Subtle floating breathing motion for the dish card
      gsap.to(cardFrame, {
        y: '-=6',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    // 4. Subtle desktop cursor tilt effect on the framed dish
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !cardFrame) return;
      const rect = cardFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardFrame, {
        rotateY: x * 6,
        rotateX: -y * 6,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!cardFrame) return;
      gsap.to(cardFrame, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const visualNode = visualCol;
    visualNode.addEventListener('mousemove', handleMouseMove);
    visualNode.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      visualNode.removeEventListener('mousemove', handleMouseMove);
      visualNode.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="especialidade"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-[#261912] text-[#F7F0E2] overflow-hidden"
    >
      {/* Background geometric watermark representing square pasta cutting grids */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute inset-0 opacity-5 flex items-center justify-center overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <svg width="850" height="850" viewBox="0 0 100 100" className="text-[#E7D2AC] stroke-current fill-none stroke-[0.4]">
          <pattern id="square-pasta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,1" />
          </pattern>
          <rect width="100" height="100" fill="url(#square-pasta-grid)" />
        </svg>
      </div>

      {/* Warm accent background glow */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[550px] h-[550px] rounded-full bg-[#A64F33]/20 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-12 right-12 w-[400px] h-[400px] rounded-full bg-[#E7D2AC]/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase with Museum-Grade Framing */}
          <div ref={visualColRef} className="lg:col-span-6 flex flex-col items-center">
            
            {/* Museum-Grade Framed Presentation */}
            <div
              ref={cardFrameRef}
              className="relative w-full max-w-md sm:max-w-lg rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#3D2719] via-[#241710] to-[#1C120D] border border-[#E7D2AC]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-shadow duration-500"
              style={{ perspective: 1000 }}
            >
              
              {/* Inner clean photo container with exact 4:5 aspect ratio */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#180E09] group">
                <img
                  src={siteContent.specialty.image}
                  alt={siteContent.specialty.imageCaption}
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle cinematic edge vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Top Floating Cultural Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#221710]/85 text-[#E7D2AC] backdrop-blur-md border border-[#E7D2AC]/30 shadow-lg">
                  <Bookmark size={12} className="text-[#A64F33]" />
                  <span>{siteContent.specialty.badge}</span>
                </div>

                {/* Top Right Craftsmanship Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#A64F33]/90 text-[#F7F0E2] backdrop-blur-md shadow-md">
                  <Sparkles size={11} />
                  <span>Corte Autêntico</span>
                </div>
              </div>

              {/* Decorative Corner Framing Tabs */}
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-[#E7D2AC]/70 pointer-events-none" />
              <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-[#E7D2AC]/70 pointer-events-none" />

              {/* Museum-style Caption Plate Below Dish */}
              <div className="mt-4 p-4 rounded-xl bg-[#1C120D]/90 border border-[#E7D2AC]/15 flex items-start space-x-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#A64F33]/25 border border-[#A64F33]/30 flex items-center justify-center shrink-0 text-[#E7D2AC] mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-[#F7F0E2] font-medium leading-snug">
                    {siteContent.specialty.imageCaption}
                  </p>
                  <p className="text-[10px] text-[#E7D2AC]/80 mt-1 uppercase tracking-wider font-mono">
                    Foto real · Receita tradicional de Monte Sião (MG)
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Footnote Pill */}
            <div className="mt-5 flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#3D2719]/50 border border-[#E7D2AC]/20 text-xs text-[#E7D2AC]/90">
              <Layers size={14} className="text-[#A64F33] shrink-0" />
              <span className="tracking-wide text-[11px] sm:text-xs">
                Massa artesanal cortada em cubos generosos para abraçar o molho
              </span>
            </div>

          </div>

          {/* Right Column: Cultural & Affective Narrative */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Eyebrow */}
            <div className="anim-text-item inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E7D2AC]/30 bg-[#3D2719]/60 text-[#E7D2AC] self-start">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                {siteContent.specialty.eyebrow}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="anim-text-item space-y-2">
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

            {/* Authentic Highlights */}
            <div className="space-y-3.5 pt-2">
              {siteContent.specialty.notes.map((note) => (
                <div key={note} className="anim-text-item flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-[#A64F33] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#F7F0E2]/90 leading-normal">
                    {note}
                  </span>
                </div>
              ))}
            </div>

            {/* Cultural Connection Notice */}
            <div className="anim-text-item p-4 sm:p-5 rounded-2xl bg-black/30 border border-[#E7D2AC]/15 text-xs text-[#E7D2AC]/90 leading-relaxed space-y-1.5">
              <div className="flex items-center space-x-2 text-[#E7D2AC] font-semibold text-xs uppercase tracking-wider">
                <Sparkles size={13} className="text-[#A64F33]" />
                <span>Patrimônio Afetivo de Monte Sião</span>
              </div>
              <p className="text-[#F7F0E2]/80 font-light text-xs sm:text-sm">
                O macarrão quadrado é um patrimônio vivo dos almoços de domingo na serra da Mantiqueira. Na Cantina Viana, honramos essa tradição preparando a receita com ingredientes frescos e o mesmo carinho que atravessou gerações.
              </p>
            </div>

            {/* Action CTA */}
            <div className="anim-text-item pt-2">
              <a
                href="#sabores"
                className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#E7D2AC] text-[#221710] hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                <span>Conhecer Todos os Sabores</span>
                <ChevronRight size={15} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
