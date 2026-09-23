import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE } from "../lib/content";
import { useInView } from "../lib/useInView";

const AUTO_SLIDE_DELAY = 4500;
const DESKTOP_SLIDE_WIDTH = 960;
const DESKTOP_SLIDE_HEIGHT = 460;
const SWIPE_THRESHOLD = 50;
const SLIDE_TRANSITION = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

const carouselSlides = [
  { id: 1, image: "/images/M3M-IMT-Manesar-Sports-Area.webp", title: "Forest-Themed Sports & Greens" },
  { id: 2, image: "/images/arrival-fountain.webp", title: "Eco Clubhouse & Wellness" },
  { id: 3, image: "/images/M3M-IMT-Manesar-Jogging-Track-Cam.webp", title: "300m Jogging & Fitness Trail" },
  { id: 4, image: "/images/M3M-IMT-Manesar-Waterbody-Seating-Cam.webp", title: "Cascading Waterfall Courtyard" },
  { id: 5, image: "/images/M3M-IMT-Manesar-Kids-Play-Area.webp", title: "Whimsical Kids' Play Zone" },
  { id: 6, image: "/images/M3M-IMT-Manesar-Forest-Garden.webp", title: "Lantern-Lit Forest Garden" },
];

const slidesWithClones = [carouselSlides.at(-1)!, ...carouselSlides, carouselSlides[0]];

function ArrowButton({ direction, onClick, mobile = false }: { direction: "prev" | "next"; onClick: () => void; mobile?: boolean }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
      className={`pointer-events-auto flex shrink-0 items-center justify-center rounded-full border border-white/80 bg-black/25 text-white backdrop-blur-sm transition duration-300 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        mobile ? "h-10 w-10" : "h-12 w-12"
      }`}
    >
      <Icon size={mobile ? 20 : 24} strokeWidth={1.4} />
    </button>
  );
}

// Overlay that spans exactly the visible (centre) slide, so the arrows always sit inside its edges.
function ArrowControls({ onPrev, onNext, mobile = false }: { onPrev: () => void; onNext: () => void; mobile?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-30 flex items-center justify-between ${
        mobile ? "inset-x-0 px-3" : "left-1/2 w-[var(--slide-w)] -translate-x-1/2 px-6"
      }`}
    >
      <ArrowButton direction="prev" onClick={onPrev} mobile={mobile} />
      <ArrowButton direction="next" onClick={onNext} mobile={mobile} />
    </div>
  );
}

function SlideImage({ slide, isCenter = false }: { slide: (typeof carouselSlides)[number]; isCenter?: boolean }) {
  return (
    <img
      src={slide.image}
      alt={slide.title}
      draggable={false}
      className={`h-full w-full select-none object-cover ${isCenter ? "scale-100" : "scale-[0.86]"} transition-transform duration-700`}
    />
  );
}

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [slideIndex, setSlideIndex] = useState(1);
  const [animate, setAnimate] = useState(true);

  const { ref: carouselRef, inView: carouselInView } = useInView<HTMLDivElement>("0px");
  const { ref: preloadRef, inView: nearViewport } = useInView<HTMLDivElement>("1250px");

  const clearAutoSlide = () => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const scheduleAutoSlide = () => {
    clearAutoSlide();
    if (!carouselInView) return;

    timerRef.current = setTimeout(() => {
      if (document.hidden) {
        scheduleAutoSlide();
        return;
      }

      setAnimate(true);
      setSlideIndex((prev) => prev + 1);
    }, AUTO_SLIDE_DELAY);
  };

  const handleNext = () => {
    clearAutoSlide();
    setAnimate(true);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    clearAutoSlide();
    setAnimate(true);
    setSlideIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    const lastCloneIndex = carouselSlides.length + 1;

    if (slideIndex === lastCloneIndex) {
      setAnimate(false);
      setSlideIndex(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });

      return;
    }

    if (slideIndex === 0) {
      setAnimate(false);
      setSlideIndex(carouselSlides.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      distance > 0 ? handleNext() : handlePrev();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    if (!carouselInView) {
      clearAutoSlide();
      return;
    }

    scheduleAutoSlide();
    return clearAutoSlide;
  }, [carouselInView, slideIndex]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".editorial-fade", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={root} className="relative overflow-hidden bg-white py-12 text-forest-950 lg:py-16">
      <div ref={preloadRef} className="relative z-10 w-full">
        <div className="editorial-fade mx-auto mb-12 max-w-3xl space-y-3 px-4 text-center">
          <h2 className="font-display text-3xl leading-[1.15] text-forest-950 sm:text-5xl">Homes that add to your life</h2>
          <p className="mx-auto max-w-xl text-xs font-normal leading-relaxed text-forest-700 sm:text-sm">
            Sports & wellness themed 2.5 BHK residences that bring together comfort, elegance, and functionality.
          </p>
        </div>

        <div ref={carouselRef} className="editorial-fade relative w-full overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Desktop */}
          <div className="relative hidden lg:block">
            <div
              className="relative w-full overflow-hidden"
              style={
                {
                  "--slide-w": `min(${DESKTOP_SLIDE_WIDTH}px, calc(100vw - 4rem))`,
                  height: `calc(var(--slide-w) * ${DESKTOP_SLIDE_HEIGHT / DESKTOP_SLIDE_WIDTH})`,
                } as React.CSSProperties
              }
            >
              <div
                onTransitionEnd={handleTransitionEnd}
                className="absolute left-1/2 top-0 flex h-full"
                style={{
                  transform: `translate3d(calc(var(--slide-w) * ${-(slideIndex + 0.5)}), 0, 0)`,
                  transition: animate ? SLIDE_TRANSITION : "none",
                }}
              >
                {slidesWithClones.map((slide, index) => (
                  <div key={`${slide.id}-${index}`} className="relative h-full w-[var(--slide-w)] shrink-0 overflow-hidden">
                    {nearViewport && <SlideImage slide={slide} isCenter={index === slideIndex} />}
                  </div>
                ))}
              </div>

              <ArrowControls onPrev={handlePrev} onNext={handleNext} />
            </div>
          </div>

          {/* Mobile */}
          <div className="relative block w-full lg:hidden">
            <div className="relative mx-auto aspect-[380/254] w-full max-w-2xl overflow-hidden">
              <div
                onTransitionEnd={handleTransitionEnd}
                className="flex h-full"
                style={{
                  transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
                  transition: animate ? SLIDE_TRANSITION : "none",
                }}
              >
                {slidesWithClones.map((slide, index) => (
                  <div key={`${slide.id}-mobile-${index}`} className="relative h-full w-full shrink-0">
                    {nearViewport && <SlideImage slide={slide} isCenter />}
                  </div>
                ))}
              </div>

              <ArrowControls onPrev={handlePrev} onNext={handleNext} mobile />
            </div>
          </div>
        </div>

        {/* Plan Pills */}
        <div className="editorial-fade mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-3 border-t border-forest-100 px-4 pt-10">
          {PRICE?.plans?.map((plan) => (
            <span key={plan} className="rounded-full border border-emerald-800/50 bg-[#11221a] px-6 py-2.5 text-xs font-semibold tracking-wide text-emerald-100 shadow-sm sm:text-sm">
              {plan}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}