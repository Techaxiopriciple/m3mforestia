import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Trees, Sparkles, ChevronLeft, ChevronRight, Footprints, Waves, Baby, Bird } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE } from "../lib/content";
import { useInView } from "../lib/useInView";

const carouselSlides = [
  {
    id: 1,
    image: "/images/M3M-IMT-Manesar-Sports-Area.webp",
    title: "Forest-Themed Sports & Greens",
    tag: "Active Living",
    subtitle: "150-acre sustainable luxury ecosystem",
    icon: <Trees size={18} />
  },
  {
    id: 2,
    image: "/images/arrival-fountain.webp",
    title: "Eco Clubhouse & Wellness",
    tag: "Rejuvenation",
    subtitle: "State-of-the-art holistic health spaces",
    icon: <Sparkles size={18} />
  },
  {
    id: 3,
    image: "/images/M3M-IMT-Manesar-Jogging-Track-Cam.webp",
    title: "300m Jogging & Fitness Trail",
    tag: "Wellness Trail",
    subtitle: "Shaded, tree-lined tracks for everyday movement",
    icon: <Footprints size={18} />
  },
  {
    id: 4,
    image: "/images/M3M-IMT-Manesar-Waterbody-Seating-Cam.webp",
    title: "Cascading Waterfall Courtyard",
    tag: "Serenity",
    subtitle: "A tranquil water feature beneath the sky bridge",
    icon: <Waves size={18} />
  },
  {
    id: 5,
    image: "/images/M3M-IMT-Manesar-Kids-Play-Area.webp",
    title: "Whimsical Kids' Play Zone",
    tag: "Family Living",
    subtitle: "Imaginative, colourful play spaces for little ones",
    icon: <Baby size={18} />
  },
  {
    id: 6,
    image: "/images/M3M-IMT-Manesar-Forest-Garden.webp",
    title: "Lantern-Lit Forest Garden",
    tag: "Biodiversity",
    subtitle: "Native birdlife and lantern trees, just outside your door",
    icon: <Bird size={18} />
  }
];

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref: carouselRef, inView: carouselInView } = useInView<HTMLDivElement>("0px");

  useEffect(() => {
    carouselSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (!carouselInView) return;

    const timer = setInterval(() => {
      if (document.hidden) return;
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselInView]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".editorial-fade", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { 
          trigger: root.current, 
          start: "top 75%" 
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="gallery"
      ref={root} 
      className="relative py-20 lg:py-28 bg-white text-forest-950 overflow-hidden"
    >
      <div className="w-full px-0 mx-auto relative z-10">
        
        {/* Top Header Section */}
        <div className="editorial-fade text-center max-w-3xl mx-auto mb-12 px-4 space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-[1.15]">
            Homes that add to your life
          </h2>
          <p className="text-forest-700 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
            Sports & wellness themed 2.5 BHK residences that bring together comfort, elegance, and functionality.
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div 
          ref={carouselRef}
          className="editorial-fade relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-2 mb-10 px-0 m-0"
        >
          <div className="relative w-full flex items-center justify-between gap-3 lg:gap-5 px-0 m-0">
            
            {/* Left Preview Slide */}
            <div 
              onClick={handlePrevSlide}
              className="hidden lg:block w-[14%] xl:w-[16%] h-[280px] sm:h-[360px] overflow-hidden opacity-50 cursor-pointer relative flex-shrink-0 transition-all duration-700 ease-out hover:opacity-85 pl-0 ml-0"
            >
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src={carouselSlides[(currentSlide - 1 + carouselSlides.length) % carouselSlides.length].image} 
                  alt="Previous preview" 
                  className="w-full h-full object-cover filter brightness-90 scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>

            {/* Center Main Active Slide */}
            <div className="w-full lg:w-[68%] xl:w-[64%] h-[360px] sm:h-[450px] overflow-hidden shadow-2xl relative bg-forest-950 flex-shrink-0 mx-auto">
              
              {/* Navigation Arrows */}
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 z-40 flex justify-between pointer-events-none">
                <button 
                  onClick={handlePrevSlide}
                  className="size-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer shadow-xl pointer-events-auto"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={24} />
                </button>

                <button 
                  onClick={handleNextSlide}
                  className="size-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer shadow-xl pointer-events-auto"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Smooth Track Container */}
              <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselSlides.map((slide) => (
                  <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent pointer-events-none z-20 flex flex-col justify-end p-6 sm:p-10">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-medium mb-1">{slide.tag}</span>
                      <h3 className="text-white font-display text-xl sm:text-3xl">{slide.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Preview Slide */}
            <div 
              onClick={handleNextSlide}
              className="hidden lg:block w-[14%] xl:w-[16%] h-[280px] sm:h-[360px] overflow-hidden opacity-50 cursor-pointer relative flex-shrink-0 transition-all duration-700 ease-out hover:opacity-85 pr-0 mr-0"
            >
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src={carouselSlides[(currentSlide + 1) % carouselSlides.length].image} 
                  alt="Next preview" 
                  className="w-full h-full object-cover filter brightness-90 scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>

          </div>
        </div>

        {/* Plan Pills Footer */}
        <div className="editorial-fade pt-6 border-t border-forest-100 flex flex-wrap justify-center gap-3 max-w-7xl mx-auto px-4">
          {PRICE?.plans?.map((p) => (
            <span
              key={p}
              className="rounded-full border border-emerald-800/50 bg-[#11221a] px-6 py-2.5 text-xs sm:text-sm text-emerald-100 font-semibold tracking-wide shadow-sm"
            >
              {p}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}