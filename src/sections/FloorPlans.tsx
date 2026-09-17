import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { gsap } from "../lib/gsap";
import { FLOOR_PLANS, whatsappLink } from "../lib/content";

function PlanArt() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(15,46,36,0.06)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(15,46,36,0.06)_24px)]">
      <div className="flex flex-col items-center gap-3 text-forest-900/35">
        <LayoutGrid size={40} strokeWidth={1.25} />
        {/* <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase">
          Floor Plan To Be Added
        </span> */}
      </div>
    </div>
  );
}

export default function FloorPlans() {
  const root = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = FLOOR_PLANS.length;

  const active = FLOOR_PLANS[activeIndex];

  const go = (i: number) => setActiveIndex((i + total) % total);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fp-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Slide-swap animation: fresh entrance each time a different unit type is picked
  useLayoutEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section id="floorplans" ref={root} className="relative py-24 sm:py-36 bg-white overflow-hidden">
      {/* Floating leaf accents, consistent with the rest of the site */}
      <div className="hidden sm:block absolute left-[-6%] lg:left-[-70px] top-[12%] w-28 lg:w-36 pointer-events-none z-10">
        <img src="/images/leaf-l.webp" alt="" className="fp-leaf w-full h-auto opacity-90" />
      </div>
      <div className="hidden sm:block absolute right-[-6%] lg:right-[-70px] bottom-[8%] w-28 lg:w-36 pointer-events-none z-10">
        <img src="/images/leaf-r.webp" alt="" className="fp-leaf-r w-full h-auto opacity-90" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="fp-fade text-center mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">
            UNIT CONFIGURATIONS
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-tight">
            Floor <span className="italic text-forest-600">Plans</span>
          </h2>
        </div>

        {/* Type selector — one plan visible at a time, matching the reference site's slider */}
        {/* <div className="fp-fade flex flex-wrap justify-center gap-3 mb-10">
          {FLOOR_PLANS.map((plan, i) => (
            <button
              key={plan.type}
              onClick={() => go(i)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                i === activeIndex
                  ? "border-forest-700 bg-forest-700 text-white"
                  : "border-forest-200 text-forest-900/75 hover:border-forest-600/60"
              }`}
            >
              {plan.type}
            </button>
          ))}
        </div> */}

        {/* Active slide */}
        <div className="fp-fade flex items-center gap-3 sm:gap-5">
          <button
            aria-label="Previous floor plan"
            onClick={() => go(activeIndex - 1)}
            className="hidden sm:grid shrink-0 w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <div ref={cardRef} className="flex-1 min-w-0">
            {/* <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
              <h3 className="font-display text-2xl sm:text-3xl text-forest-950">
                {active.type} <span className="text-forest-900/50 text-lg sm:text-xl">— {active.label}</span>
              </h3>
              <span className="flex items-center gap-1.5 text-sm text-forest-700">
                <Maximize2 size={14} />
                {active.size}
              </span>
            </div> */}

            <button
              onClick={() => setLightboxOpen(true)}
              className="relative block w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-forest-200 bg-cream-50 group"
            >
              {active.image ? (
                <img
                  src={active.image}
                  alt={`${active.type} floor plan — ${active.label}, ${active.size}`}
                  className="absolute inset-0 size-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <PlanArt />
              )}

              {/* Hover reveal: dark tint + centered CTA */}
              <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/45 transition-colors duration-500" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream-50/80 bg-forest-950/30 backdrop-blur-sm px-6 py-2.5 text-sm text-cream-50 opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
                View Floor Plan
              </span>
            </button>

            <div className="flex items-center justify-between mt-3">
              <p className="text-[11px] sm:text-xs text-forest-900/45 italic">
                *Artistic Impression
              </p>
              <button
                onClick={() => setLightboxOpen(true)}
                className="text-xs sm:text-sm text-forest-700 border-b border-forest-700/40 hover:border-forest-700 transition-colors"
              >
                View Floor Plan
              </button>
            </div>
          </div>

          <button
            aria-label="Next floor plan"
            onClick={() => go(activeIndex + 1)}
            className="hidden sm:grid shrink-0 w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="fp-fade flex sm:hidden items-center justify-center gap-4 mt-6">
          <button
            aria-label="Previous floor plan"
            onClick={() => go(activeIndex - 1)}
            className="w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 grid place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Next floor plan"
            onClick={() => go(activeIndex + 1)}
            className="w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 grid place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="fp-fade flex justify-center mt-10">
          <a
            href={whatsappLink("Hi, I'd like to receive the floor plans / E-brochure for M3M Forestia West.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-forest-950 text-cream-50 px-8 py-3.5 text-sm tracking-wide hover:bg-forest-900 transition-colors"
          >
            Download Brochure
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-100 bg-forest-950/95 backdrop-blur-sm grid place-items-center px-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-cream-50 hover:text-gold-400"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={28} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(activeIndex - 1);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-cream-50 hover:text-gold-400"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(activeIndex + 1);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-cream-50 hover:text-gold-400"
          >
            <ChevronRight size={32} />
          </button>

          <figure
            className="max-w-2xl w-full bg-cream-50 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96">
              {active.image ? (
                <img
                  src={active.image}
                  alt={`${active.type} floor plan`}
                  className="absolute inset-0 size-full object-contain p-8"
                />
              ) : (
                <PlanArt />
              )}
            </div>
            <figcaption className="p-5 text-center border-t border-forest-100">
              <span className="font-display text-lg text-forest-950">
                {active.type} · {active.label}
              </span>
              <span className="block text-sm text-forest-900/60 mt-1">{active.size} · Artistic Impression</span>
            </figcaption>
          </figure>
        </div>
      )}

      <style>{`
        .fp-leaf {
          animation: fpLeafFloat 4s ease-in-out infinite;
        }
        .fp-leaf-r {
          animation: fpLeafFloatR 4.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        @keyframes fpLeafFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-6deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes fpLeafFloatR {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(7deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
