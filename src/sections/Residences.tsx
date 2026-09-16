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

const SLIDES = RESIDENCE_SIZES.map((r, i) => ({
  ...r,
  image: IMAGES[i],
}));

const AUTOPLAY_DELAY = 5000;

export default function Residences() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const previous = SLIDES[(active - 1 + SLIDES.length) % SLIDES.length];
  const current = SLIDES[active];
  const next = SLIDES[(active + 1) % SLIDES.length];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".res-fade-in", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!gallery.current) return;

    gsap.fromTo(
      gallery.current.querySelectorAll(".res-gallery-image"),
      { opacity: 0.6 },
      { opacity: 1, duration: 0.55, ease: "power3.out" },
    );
  }, [active]);

  useLayoutEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active]);

  const go = (dir: 1 | -1) => {
    if (timer.current) clearTimeout(timer.current);

    setActive(
      (current) =>
        (current + dir + SLIDES.length) % SLIDES.length,
    );
  };

  return (
    <section
      id="residences"
      ref={root}
      className="relative py-28 sm:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="res-fade-in flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">
              HOMES THAT OPEN TO NATURE
            </p>

            <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-tight">
              Forest-Themed{" "}
              <span className="italic text-forest-600">
                3 BHK Residences
              </span>
            </h2>
          </div>

          <div className="text-right">
            <p className="font-display text-3xl text-forest-700">
              {PRICE.starting}
            </p>

            <p className="text-xs text-forest-900/60 mt-1">
              {PRICE.reference}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={gallery}
        className="res-fade-in relative w-full"
      >
        <div className="relative flex items-center justify-center overflow-hidden h-[280px] sm:h-[390px] lg:h-[430px]">

          {/* Previous */}
          <div className="res-gallery-image absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block w-[16%] h-[82%] overflow-hidden">
            <img
              src={previous.image}
              alt={`${previous.label} · ${previous.size}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Current */}
          <div className="res-gallery-image relative z-10 w-[88%] sm:w-[68%] lg:w-[67%] h-full overflow-hidden">
            <img
              key={current.image}
              src={current.image}
              alt={`${current.label} · ${current.size}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-wrap items-end gap-x-10 gap-y-3">
              <div className="flex items-center gap-2 text-gold-300">
                <Trees size={20} />

                <span className="font-display text-2xl sm:text-3xl text-cream-50">
                  {current.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-cream-100/85">
                <Maximize2 size={16} />

                <span className="text-sm sm:text-base">
                  {current.size}
                </span>
              </div>
            </div>

            {/* Previous */}
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 grid place-items-center size-11 sm:size-12 rounded-full border border-white bg-transparent text-white hover:bg-white/15 transition-colors"
            >
              <ChevronLeft size={23} strokeWidth={1.5} />
            </button>

            {/* Next */}
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 grid place-items-center size-11 sm:size-12 rounded-full border border-white bg-transparent text-white hover:bg-white/15 transition-colors"
            >
              <ChevronRight size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* Next */}
          <div className="res-gallery-image absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block w-[16%] h-[82%] overflow-hidden">
            <img
              src={next.image}
              alt={`${next.label} · ${next.size}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
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


