import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useAutoPauseVideo } from "../lib/useAutoPauseVideo";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useAutoPauseVideo<HTMLVideoElement>();

  // GSAP timeline animation on component mount
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-bg", { scale: 1.15, duration: 1.8, ease: "power2.out" }, 0)
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, 0.3)
        .from(".hero-title-line", { yPercent: 120, stagger: 0.12, duration: 1 }, 0.45)
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, 0.9)
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 1.05)
        .from(".hero-logos", { opacity: 0, y: 20, duration: 0.8 }, 1.2)
        .from(".hero-rera", { opacity: 0, y: -20, duration: 0.8 }, 1.25)
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, 1.4);
    }, root);

    return () => ctx.revert();
  }, []);

  // Handler to close floating form on scroll click
  const handleScrollClick = () => {
    window.dispatchEvent(new CustomEvent("close-floating-form"));
  };

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-dvh w-full overflow-hidden py-28 lg:py-0 bg-forest-950"
    >
      {/* Fallback dark solid background layer */}
      <div className="absolute inset-0 bg-forest-950 -z-10" />

      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero-bg absolute inset-0 w-full h-full object-cover bg-forest-950"
        src="/images/banner-video-forestia.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Top Right Corner RERA Info */}
      <div className="hero-rera absolute top-20 sm:top-24 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex justify-end">
          <div className="max-w-xs sm:max-w-sm pointer-events-auto text-right space-y-0.5">
            <div>
              <p className="text-[6px] sm:text-[7px] font-normal text-white leading-tight tracking-wide">
                RERA REG. NO. RC/REP/HARERA/GGM/1030/762/2026/02
              </p>
              <p className="text-[6px] sm:text-[7px] font-normal text-gold-300 tracking-wide">
                Dated: 02.01.2026
              </p>
            </div>

            <div className="w-full h-px bg-gold-400/60 my-0.5 ml-auto w-3/4" />

            <div>
              <p className="text-[6px] sm:text-[7px] font-normal text-white leading-tight tracking-wide">
                RERA REG. NO. RC/REP/HARERA/GGM/991/723/2025/94
              </p>
              <p className="text-[6px] sm:text-[7px] font-normal text-gold-300 tracking-wide">
                Dated: 16.10.2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left Aligned Content with Centered Logo relative to bottom section width */}
      <div className="hero-logos absolute inset-x-0 bottom-12 sm:bottom-16 lg:bottom-20 z-20 flex flex-col items-start text-left px-5 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="w-full max-w-xl flex flex-col items-start pointer-events-auto space-y-6">
          
          {/* M3M Forestia Logo & Subtitle - Centered specifically over the left-aligned bottom container */}
          <div className="w-full flex justify-center pr-0 sm:pr-12 lg:pr-[30%]">
            <div className="flex flex-col items-center group">
              <a href="#top" aria-label="M3M Forestia" className="flex flex-col items-center group">
                <img
                  src="/images/logo/forestia-logo_new_1.png"
                  alt="M3M Forestia"
                  width={1200}
                  height={373}
                  className="h-14 sm:h-20 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                />
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-2">
                  Forest-Themed Residences
                </span>
              </a>
            </div>
          </div>

          {/* Integrated City Text & White GIC Logo (Left Aligned Block) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-8 pt-2 w-full">
            <p className="text-xs sm:text-sm tracking-[0.2em] text-white uppercase font-normal text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Part of the Largest <br className="hidden sm:block" /> Integrated City of Gurgaon
            </p>
            <div className="hidden sm:block h-10 w-px bg-gold-400/80 shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <a href="#top" aria-label="GIC Logo" className="flex items-center justify-start p-1">
              <img
                src="/images/logo/gic.webp"
                alt="GIC Logo"
                width={300}
                height={223}
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert contrast-200 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
              />
            </a>
          </div>

        </div>
      </div>

      {/* Clickable Scroll Button */}
      <a
        href="#location"
        onClick={handleScrollClick}
        className="hero-scroll absolute bottom-8 inset-x-0 hidden lg:flex flex-col items-center gap-2 text-white hover:text-white text-xs tracking-[0.3em] transition-colors cursor-pointer w-fit mx-auto z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-normal"
      >
        <span>SCROLL</span>
        <ChevronDown className="animate-bounce" size={18} />
      </a>
    </section>
  );
}