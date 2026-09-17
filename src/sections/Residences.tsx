import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Trees, Maximize2 } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE, RESIDENCE_SIZES } from "../lib/content";

const IMAGES = [
  "/images/M3M-IMT-Manesar-Tree-Closeup.jpg",
  "/images/M3M-IMT-Manesar-Sports-Area.jpg",
  "/images/M3M-IMT-Manesar-Waterbody-Seating-Cam.jpg",
  "/images/M3M-IMT-Manesar-Waterfeature-Seating-Cam.jpg",
  "/images/M3M-IMT-Manesar-Landscape-Top.jpg",
  "/images/M3M-IMT-Manesar-Pool-Cam.jpg",
  "/images/M3M-IMT-Manesar-Jogging-Track-Cam.jpg",
  "/images/M3M-IMT-Manesar-Kids-Play-Area.jpg",
  "/images/M3M-IMT-Manesar-Landscape-Cam.jpg",
  "/images/M3M-IMT-Manesar-Overbridge-Cam.jpg"
];

const SLIDES = RESIDENCE_SIZES.map((r, i) => ({
  ...r,
  image: IMAGES[i],
}));

// Preload all carousel images
SLIDES.forEach((slide) => {
  const img = new Image();
  img.src = slide.image;
});

const AUTOPLAY_DELAY = 5000;
const SLIDE_DURATION = 0.7;

export default function Residences() {
  const [active, setActive] = useState(0);

  const root = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const previous = SLIDES[(active - 1 + SLIDES.length) % SLIDES.length];
  const current = SLIDES[active];
  const next = SLIDES[(active + 1) % SLIDES.length];

  const incomingRef = useRef<HTMLDivElement>(null);

  const isAnimating = useRef(false);

  /*
   * Section entrance & Highlights animation
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main section fade in
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

      // Highlights / 150-acre section animation
      gsap.from(".hl-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#highlights", start: "top 75%" },
      });

      gsap.from(".hl-card, .hl-stat", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: "#highlights", start: "top 65%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /*
   * Smooth carousel transition
   */
  const changeSlide = (direction: 1 | -1) => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    const incomingIndex =
      (active + direction + SLIDES.length) % SLIDES.length;

    const incomingElement = incomingRef.current;

    if (!incomingElement) {
      isAnimating.current = false;
      return;
    }

    gsap.set(incomingElement, {
      xPercent: direction === 1 ? 100 : -100,
      opacity: 1,
      zIndex: 30,
    });

    gsap.to(incomingElement, {
      xPercent: 0,
      duration: SLIDE_DURATION,
      ease: "power3.inOut",
      onComplete: () => {
        setActive(incomingIndex);

        requestAnimationFrame(() => {
          gsap.set(incomingElement, {
            clearProps: "transform,zIndex,opacity",
          });

          isAnimating.current = false;
        });
      },
    });
  };

  /*
   * Autoplay
   */
  useLayoutEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      changeSlide(1);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [active]);

  /*
   * Manual navigation
   */
  const go = (direction: 1 | -1) => {
    changeSlide(direction);
  };

  const incomingSlide =
    SLIDES[(active + 1) % SLIDES.length];

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
        className="relative w-full"
      >
        <div className="relative flex items-center justify-center overflow-hidden h-[280px] sm:h-[390px] lg:h-[430px]">

          {/* Previous */}
          <div
            className="res-gallery-image absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block w-[16%] h-[82%] overflow-hidden"
          >
            <img
              src={previous.image}
              alt={`${previous.label} · ${previous.size}`}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Current */}
          <div
            className="res-gallery-image relative z-10 w-[88%] sm:w-[68%] lg:w-[67%] h-full overflow-hidden"
          >
            <img
              src={current.image}
              alt={`${current.label} · ${current.size}`}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent" />

            {/* Incoming Slide */}
            <div
              ref={incomingRef}
              className="absolute inset-0 z-30 overflow-hidden"
            >
              <img
                src={incomingSlide.image}
                alt={`${incomingSlide.label} · ${incomingSlide.size}`}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent" />

              {/* Incoming Content */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-wrap items-end gap-x-10 gap-y-3">
                <div className="flex items-center gap-2 text-gold-300">
                  <Trees size={20} />

                  <span className="font-display text-2xl sm:text-3xl text-cream-50">
                    {incomingSlide.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-cream-100/85">
                  <Maximize2 size={16} />

                  <span className="text-sm sm:text-base">
                    {incomingSlide.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-wrap items-end gap-x-10 gap-y-3 z-20">
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

            {/* Previous Button */}
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute z-40 left-5 sm:left-8 top-1/2 -translate-y-1/2 grid place-items-center size-11 sm:size-12 rounded-full border border-white bg-transparent text-white hover:bg-white/15 transition-colors"
            >
              <ChevronLeft size={23} strokeWidth={1.5} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute z-40 right-5 sm:right-8 top-1/2 -translate-y-1/2 grid place-items-center size-11 sm:size-12 rounded-full border border-white bg-transparent text-white hover:bg-white/15 transition-colors"
            >
              <ChevronRight size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* Next Slide Preview */}
          <div
            className="res-gallery-image absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block w-[16%] h-[82%] overflow-hidden"
          >
            <img
              src={next.image}
              alt={`${next.label} · ${next.size}`}
              loading="eager"
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