import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useAutoPauseVideo } from "../lib/useAutoPauseVideo";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useAutoPauseVideo<HTMLVideoElement>();

  // GSAP timeline animation on component mount
  useLayoutEffect(() => {
    if (!ready) return;

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
  }, [ready]);

  // Handler to close floating form on scroll click
  const handleScrollClick = () => {
    window.dispatchEvent(new CustomEvent("close-floating-form"));
  };

  return (
    <section
      id="top"
      ref={root}
      className={`relative min-h-dvh w-full overflow-hidden py-28 lg:py-0 ${
        ready ? "" : "invisible"
      }`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero-bg absolute inset-0 w-full h-full object-cover"
        src="/images/banner-video-forestia.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Top Left Corner RERA Info - Date shifted to the bottom line */}
      <div className="hero-rera absolute top-20 sm:top-24 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex justify-start">
          <div className="max-w-xs sm:max-w-sm pointer-events-auto text-left space-y-1.5">
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium text-cream-50/90 leading-tight tracking-wide drop-shadow-md">
                RERA REG. NO. RC/REP/HARERA/GGM/1030/762/2026/02
              </p>
              <p className="text-[10px] sm:text-[11px] font-normal text-gold-400 tracking-wide drop-shadow-md mt-0.5">
                Dated: 02.01.2026
              </p>
            </div>

            <div className="w-full h-px bg-gold-400/30 my-1 mr-auto w-3/4" />

            <div>
              <p className="text-[10px] sm:text-[11px] font-medium text-cream-50/90 leading-tight tracking-wide drop-shadow-md">
                RERA REG. NO. RC/REP/HARERA/GGM/991/723/2025/94
              </p>
              <p className="text-[10px] sm:text-[11px] font-normal text-gold-400 tracking-wide drop-shadow-md mt-0.5">
                Dated: 16.10.2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <div className="hero-logos absolute inset-0 z-20 flex items-center pt-80 sm:pt-96 pointer-events-none">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex items-end gap-4 pointer-events-auto">
          <a href="#top" aria-label="M3M Forestia" className="flex items-center justify-center p-2">
            <img
              src="/images/logo/forestia-logo_new_1.png"
              alt="M3M Forestia"
              width={1200}
              height={373}
              className="h-[52px] sm:h-[62px] w-auto object-contain"
            />
          </a>

          <a href="#top" aria-label="GIC Logo" className="flex items-center justify-center p-2">
            <img
              src="/images/logo/gic.webp"
              alt="GIC Logo"
              width={300}
              height={223}
              className="h-[52px] sm:h-[62px] w-auto object-contain brightness-0 invert"
            />
          </a>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/30 via-transparent to-forest-950/10" />

      {/* Clickable Scroll Button */}
      <a
        href="#location"
        onClick={handleScrollClick}
        className="hero-scroll absolute bottom-8 inset-x-0 hidden lg:flex flex-col items-center gap-2 text-cream-100/70 hover:text-white text-xs tracking-[0.3em] transition-colors cursor-pointer w-fit mx-auto z-20"
      >
        <span>SCROLL</span>
        <ChevronDown className="animate-bounce" size={18} />
      </a>
    </section>
  );
}