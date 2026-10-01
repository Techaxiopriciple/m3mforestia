import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Rotate3d, X } from "lucide-react";
import { gsap } from "../lib/gsap";

const VR_TOUR_URL = "https://m3m-forestia-360.orangesky.org.in/";

export default function GrandWelcome() {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [vrOpen, setVrOpen] = useState(false);

  useEffect(() => {
    if (!vrOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVrOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [vrOpen]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".grand-fade", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.to(".grand-bg-img", {
        scale: 1.05,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arrival"
      ref={root}
      className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      <div className="grand-fade relative w-full h-full flex items-center justify-center">
        <img
          src="/images/forestia-master-bg.webp"
          alt="M3M Forestia West grand entrance arrival"
          width={2880}
          height={2160}
          loading="eager"
          decoding="async"
          className="grand-bg-img w-full h-auto object-cover pointer-events-none block"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={() => setVrOpen(true)}
            aria-haspopup="dialog"
            className="group absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-10 z-10 flex items-center gap-6 sm:gap-8 rounded-full bg-forest-950/80 backdrop-blur-md border border-gold-400/60 pl-2.5 pr-20 sm:pr-24 py-1.5 sm:py-2 text-cream-50 shadow-2xl shadow-black/40 hover:bg-forest-950/90 hover:border-gold-300 transition-all duration-300 cursor-pointer"
          >
            <span className="relative grid place-items-center size-9 sm:size-10 rounded-full bg-gold-400 text-forest-950 group-hover:bg-gold-300 transition-colors">
              <span className="absolute inset-0 rounded-full bg-gold-400/60 animate-ping motion-reduce:hidden" />
              <Rotate3d size={18} className="relative" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="hidden sm:block text-[9px] tracking-[3px] uppercase text-gold-300 font-semibold">
                360° Tour
              </span>
              <span className="pill-text font-medium text-xs sm:text-sm">VR View</span>
            </span>
          </button>
      </div>

      {vrOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setVrOpen(false)}
          >
            {/* Responsive Dialog Box: Full width on mobile, max-w-6xl on desktop, dynamic height */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="M3M Forestia 360° VR tour"
              className="relative flex flex-col w-full max-w-6xl h-[90vh] sm:h-[85vh] rounded-xl sm:rounded-2xl overflow-hidden bg-forest-950 border border-gold-400/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 pl-4 sm:pl-6 pr-3 py-3 border-b border-gold-400/20 bg-forest-950/90">
                <div className="flex items-center gap-2.5 text-cream-50 min-w-0">
                  <Rotate3d size={18} className="text-gold-400 shrink-0" />
                  <h3 className="font-display text-base sm:text-lg truncate">
                    360° VR View
                  </h3>
                </div>
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={() => setVrOpen(false)}
                  aria-label="Close VR view"
                  className="size-9 sm:size-10 shrink-0 rounded-full bg-forest-900 border border-gold-400/30 flex items-center justify-center text-cream-50 hover:bg-gold-400 hover:text-forest-950 transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe container wrapper with relative positioning for fluid scaling */}
              <div className="relative w-full flex-1 bg-black overflow-hidden">
                <iframe
                  src={VR_TOUR_URL}
                  title="M3M Forestia 360° VR tour"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; touch-action"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}