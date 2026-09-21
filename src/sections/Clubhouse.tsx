import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "../lib/gsap";
import { CLUBHOUSE_IMAGES } from "../lib/content";

export default function Clubhouse() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const total = CLUBHOUSE_IMAGES.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".club-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section id="clubhouse" ref={root} className="relative py-10 sm:py-14 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Headings + Arrows & Thumbnails side-by-side at bottom */}
          <div className="club-fade lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Top Subheading */}
              <p className="font-sans text-sm sm:text-base text-forest-900/80 font-normal mb-2">
                A world of privileges.
              </p>
              
              {/* Italic Subheading */}
              <h2 className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-forest-900/90 font-normal leading-snug mb-6">
                Designed for a dynamic way of living.
              </h2>
              
              {/* Massive Clubhouse Title block */}
              <div className="mb-10">
                <span className="font-sans text-base sm:text-lg text-forest-900/70 block font-light tracking-wide mb-[-2px]">
                  A massive
                </span>
                <h3 className="font-display text-6xl sm:text-7xl lg:text-8xl text-forest-950 tracking-tight font-normal">
                  Clubhouse
                </h3>
              </div>
            </div>

            {/* Bottom Row of Left Column: Arrows + 4 Thumbnails in exact reference layout */}
            <div className="flex items-center gap-4 sm:gap-6 mt-4">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  aria-label="Previous"
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 grid place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Next"
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-forest-950/25 text-forest-950 grid place-items-center hover:bg-forest-950 hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* 4 Thumbnails Horizontal Row */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 flex-1">
                {CLUBHOUSE_IMAGES.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setActive(i)}
                    aria-label={img.caption}
                    className={`relative rounded-xl overflow-hidden h-16 sm:h-20 transition-all duration-300 ${
                      i === active 
                        ? "ring-2 ring-forest-950 scale-[1.03] opacity-100 shadow-md" 
                        : "opacity-50 hover:opacity-100 ring-1 ring-forest-950/10"
                    }`}
                  >
                    <img src={img.src} alt={img.caption} loading="lazy" className="absolute inset-0 size-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Featured Cinematic Image */}
          <div className="club-fade lg:col-span-6 relative">
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[308px] sm:h-[405px] lg:h-[470px] shadow-2xl shadow-forest-950/10 bg-forest-900"
              onMouseEnter={() => (paused.current = true)}
              onMouseLeave={() => (paused.current = false)}
            >
              {CLUBHOUSE_IMAGES.map((img, i) => (
                <div
                  key={img.src}
                  className={`absolute inset-0 size-full transition-opacity duration-700 ease-in-out ${
                    i === active ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                  {/* Artistic Impression Watermark */}
                  <div className="absolute bottom-4 left-4 text-white/70 text-[10px] tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 select-none pointer-events-none">
                    Artistic Impression
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating leaf accents */}
      <div className="hidden sm:block absolute left-[-6%] lg:left-[-85px] bottom-[10%] w-32 lg:w-40 pointer-events-none z-10">
        <img src="/images/leaf-l.webp" alt="" width={129} height={128} loading="lazy" className="club-leaf w-full h-auto opacity-90" />
      </div>
      <div className="hidden sm:block absolute right-[-6%] lg:right-[-85px] top-[8%] w-28 lg:w-36 pointer-events-none z-10">
        <img src="/images/leaf-r.webp" alt="" width={129} height={128} loading="lazy" className="club-leaf-r w-full h-auto opacity-90" />
      </div>

      <style>{`
        .club-leaf {
          animation: clubLeafFloat 4s ease-in-out infinite;
        }
        .club-leaf-r {
          animation: clubLeafFloatR 4.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        @keyframes clubLeafFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(-7deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes clubLeafFloatR {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}