import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useInView } from "../lib/useInView";

const AUTO_SLIDE_DELAY = 4500;
const DESKTOP_SLIDE_WIDTH = 960;
const DESKTOP_SLIDE_HEIGHT = 460;
const SWIPE_THRESHOLD = 50;
const SLIDE_TRANSITION = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

// Slides mirror the "Experience Central Grove at GIC" section on m3mindia.com/gic/m3m-forestia-west
const carouselSlides = [
  {
    id: 1,
    image: "/images/M3M-IMT-Manesar-Arrival-Area.webp",
    title: "Grand Arrival",
    description: "From a grand 60m approach to nature-touched entrances, step into a life beautifully lived."
  },
  {
    id: 2,
    image: "/images/natures-den.webp",
    title: "Nature's Den",
    description: "Shaded Cabanas And Quiet Sit-outs Designed For Pause And Presence."
  },
  {
    id: 3,
    image: "/images/skywalk.webp",
    title: "Skywalk",
    description: "An Elevated Pathway Offering Uninterrupted Views."
  },
  {
    id: 4,
    image: "/images/central-grove-bg.webp",
    title: "Whispering Falls",
    description: "Flowing Water Features That Bring Calm And Balance."
  },
  {
    id: 5,
    image: "/images/forest-trail.webp",
    title: "Forest Trails",
    description: "Meandering Paths For Slow Walks Through Lush Greens."
  },
  {
    id: 6,
    image: "/images/M3M-IMT-Manesar-Forest-Garden.webp",
    title: "Homes That Open To Naturel",
    description: "Tranquil interiors crafted with soothing aesthetics to melt away daily stress and promote everyday well-being."
  },
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
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.title}
        draggable={false}
        className={`h-full w-full select-none object-cover ${isCenter ? "scale-100" : "scale-[0.86]"} transition-transform duration-700`}
      />
      {/* Text Content shown ONLY on the center slide */}
      {isCenter && (
        <div className="absolute inset-x-0 bottom-0 left-0 right-0 flex flex-col justify-end p-6 sm:p-8 pointer-events-none">
          <div className="max-w-xl">
            <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
              {slide.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/95 font-normal drop-shadow-md">
              {slide.description}
            </p>
          </div>
        </div>
      )}
    </div>
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
          <h2 className="font-display text-3xl leading-[1.15] text-forest-950 sm:text-5xl">An Address That Breathes With Nature</h2>
          <p className="mx-auto max-w-xl text-xs font-normal leading-relaxed text-forest-700 sm:text-sm">M3M Forestia West offers thoughtfully designed homes, where space, light, and nature
            come together to create everyday calm.
          </p>
        </div>

        <div ref={carouselRef} className="editorial-fade relative w-full overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Desktop */}
          <div className="relative hidden lg:block">
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-xl"
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
                  <div key={`${slide.id}-${index}`} className="relative h-full w-[var(--slide-w)] shrink-0 overflow-hidden rounded-2xl">
                    {nearViewport && <SlideImage slide={slide} isCenter={index === slideIndex} />}
                  </div>
                ))}
              </div>

              <ArrowControls onPrev={handlePrev} onNext={handleNext} />
            </div>
          </div>

          {/* Mobile */}
          <div className="relative block w-full lg:hidden">
            <div className="relative mx-auto aspect-[380/254] w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg">
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
      </div>
    </section>
  );
}