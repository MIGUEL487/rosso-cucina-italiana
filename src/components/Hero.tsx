import React, { useEffect, useRef } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const dishRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const textCol = textColRef.current;
    const dish = dishRef.current;
    if (!heroEl || !textCol || !dish) return;

    // GSAP context for clean animation and teardown
    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline (refined, cinema-grade)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroEl,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.8 }
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.5'
      )
      .fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        dish,
        { opacity: 0, scale: 0.92, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.2'
      );

      // 2. Micro-movement: continuous gentle alive sensation
      gsap.to(dish, {
        y: '-=8',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. ScrollTrigger scrub: cinematic depth parallax on scroll
      gsap.to(dish, {
        y: 110,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(textCol, {
        y: -60,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });
    }, heroRef);

    // 4. Interactive desktop mouse micro-tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !dish) return;
      const rect = heroEl.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(dish, {
        x: xNorm * 18,
        rotateY: xNorm * 4,
        rotateX: -yNorm * 3,
        duration: 0.9,
        ease: 'power2.out',
      });
    };

    heroEl.addEventListener('mousemove', handleMouseMove);

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#1A100B] text-[#F7F0E2]"
      style={{
        background:
          'radial-gradient(circle at 72% 52%, rgba(110, 58, 30, 0.35) 0%, rgba(38, 22, 13, 0.92) 55%, #160D08 100%), #1A100B',
      }}
    >
      {/* Subtle warm ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E7D2AC]/10 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#A64F33]/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center z-10 my-auto">
        
        {/* Left Column: Pure Editorial Typography matching Reference 1:1 */}
        <div
          ref={textColRef}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 pr-0 lg:pr-4"
        >
          {/* Eyebrow Badge with leaf icon */}
          <div
            ref={badgeRef}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#E7D2AC]/40 bg-[#352014]/60 backdrop-blur-md self-start shadow-sm"
          >
            <Leaf size={13} className="text-[#E7D2AC] stroke-[2.2]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#E7D2AC]">
              {siteContent.hero.eyebrow}
            </span>
          </div>

          {/* Headline matching Reference Exact */}
          <div className="space-y-4">
            <h1
              ref={titleRef}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.02] text-[#F7F0E2]"
            >
              {siteContent.hero.titleLine1}{' '}
              <span className="block">
                {siteContent.hero.titleLine2}{' '}
                <span className="italic text-[#E7D2AC] font-normal">
                  {siteContent.hero.titleAccent}
                </span>
              </span>
            </h1>

            {/* Terracotta horizontal divider bar matching Reference */}
            <div
              ref={dividerRef}
              className="w-16 h-1 bg-[#A64F33] rounded-full mt-3"
              aria-hidden="true"
            />
          </div>

          {/* Subtitle / Paragraph */}
          <p
            ref={paragraphRef}
            className="text-sm sm:text-base md:text-lg text-[#F7F0E2]/85 font-light leading-relaxed max-w-lg pt-1"
          >
            {siteContent.hero.subtitle}
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <a
              ref={ctaRef}
              href={siteContent.hero.ctaPrimaryHref}
              className="inline-flex items-center space-x-3 px-8 sm:px-9 py-4 rounded-full text-xs uppercase font-semibold tracking-widest bg-[#E7D2AC] text-[#221710] shadow-xl hover:bg-white hover:text-black hover:scale-[1.03] transition-all duration-300"
            >
              <span>{siteContent.hero.ctaPrimary}</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Right Column: Dominant Hero Dish matching Reference 1:1 */}
        <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
          <div
            ref={dishRef}
            className="relative w-full max-w-[560px] lg:max-w-none lg:w-[125%] lg:-mr-[15%] transition-transform duration-100 will-change-transform"
            style={{ perspective: 1000 }}
          >
            <img
              src={siteContent.hero.dishImage}
              alt={siteContent.hero.dishAlt}
              className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] select-none pointer-events-none"
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
