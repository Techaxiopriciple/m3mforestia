import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Trees, Maximize2 } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE, RESIDENCE_SIZES } from "../lib/content";

const IMAGES = [
  "/images/M3M-IMT-Manesar-Arrival-Area.jpg",
  "/images/M3M-IMT-Manesar-Waterbody-Seating-Cam.jpg",
  "/images/M3M-IMT-Manesar-Landscape-Top.jpg",
  "/images/M3M-IMT-Manesar-Sports-Area.jpg",
];

const SLIDES = RESIDENCE_SIZES.map((r, i) => ({ ...r, image: IMAGES[i] }));

export default function Residences() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!track.current) return;
    gsap.to(track.current, {
      xPercent: (-100 / SLIDES.length) * active,
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [active]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".res-fade-in", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="residences" ref={root} className="relative py-28 sm:py-36 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="res-fade-in flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">
              HOMES THAT OPEN TO NATURE
            </p>
            <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-tight">
              Forest-Themed <span className="italic text-forest-600">3 BHK Residences</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-forest-700">{PRICE.starting}</p>
            <p className="text-xs text-forest-900/60 mt-1">{PRICE.reference}</p>
          </div>
        </div>
      </div>

      <div className="res-fade-in relative max-w-6xl mx-auto px-6">
        <div className="overflow-hidden rounded-3xl">
          <div ref={track} className="flex" style={{ width: `${SLIDES.length * 100}%` }}>
            {SLIDES.map((s) => (
              <div key={s.size} className="w-full shrink-0 relative" style={{ width: `${100 / SLIDES.length}%` }}>
                <div className="relative aspect-16/10 sm:aspect-21/9">
                  <img src={s.image} alt={`${s.label} · ${s.size}`} loading="lazy" className="absolute inset-0 size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-wrap items-end gap-x-10 gap-y-3">
                    <div className="flex items-center gap-2 text-gold-300">
                      <Trees size={20} />
                      <span className="font-display text-2xl sm:text-3xl text-cream-50">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cream-100/85">
                      <Maximize2 size={16} />
                      <span className="text-sm sm:text-base">{s.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-white border border-forest-200 text-forest-700 shadow-lg shadow-forest-950/10 hover:border-forest-600 hover:text-forest-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-white border border-forest-200 text-forest-700 shadow-lg shadow-forest-950/10 hover:border-forest-600 hover:text-forest-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="res-fade-in flex justify-center gap-2 mt-8">
        {SLIDES.map((s, i) => (
          <button
            key={s.size}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-forest-700" : "w-1.5 bg-forest-200"
            }`}
          />
        ))}
      </div>

      <div className="res-fade-in flex flex-wrap justify-center gap-4 mt-10">
        {PRICE.plans.map((p) => (
          <span
            key={p}
            className="rounded-full border border-forest-200 px-5 py-2 text-xs sm:text-sm text-forest-900/80"
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
