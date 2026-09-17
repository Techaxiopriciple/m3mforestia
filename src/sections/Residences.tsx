import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Trees, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Footprints, Waves, Baby, Bird } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE } from "../lib/content";

// Slides data for the interactive right-side carousel
const carouselSlides = [
  {
    id: 1,
    image: "/images/M3M-IMT-Manesar-Sports-Area.jpg",
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
    image: "/images/M3M-IMT-Manesar-Jogging-Track-Cam.jpg",
    title: "300m Jogging & Fitness Trail",
    tag: "Wellness Trail",
    subtitle: "Shaded, tree-lined tracks for everyday movement",
    icon: <Footprints size={18} />
  },
  {
    id: 4,
    image: "/images/M3M-IMT-Manesar-Waterbody-Seating-Cam.jpg",
    title: "Cascading Waterfall Courtyard",
    tag: "Serenity",
    subtitle: "A tranquil water feature beneath the sky bridge",
    icon: <Waves size={18} />
  },
  {
    id: 5,
    image: "/images/M3M-IMT-Manesar-Kids-Play-Area.jpg",
    title: "Whimsical Kids' Play Zone",
    tag: "Family Living",
    subtitle: "Imaginative, colourful play spaces for little ones",
    icon: <Baby size={18} />
  },
  {
    id: 6,
    image: "/images/M3M-IMT-Manesar-Forest-Garden.jpg",
    title: "Lantern-Lit Forest Garden",
    tag: "Biodiversity",
    subtitle: "Native birdlife and lantern trees, just outside your door",
    icon: <Bird size={18} />
  }
];

export default function LuxuryEditorialResidences() {
  const root = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect fixed with functional update to prevent closure issues
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const activeData = carouselSlides[currentSlide];

  return (
    <section 
      id="editorial-residences" 
      ref={root} 
      className="relative py-20 lg:py-28 bg-white text-forest-950 overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Top Header Section */}
        <div className="editorial-fade grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs tracking-[0.25em] uppercase font-medium">
              <Sparkles size={14} className="text-forest-600" />
              <span>Architectural Sanctuary</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-6xl text-forest-950 leading-[1.1]">
              A Grand Welcome. <br />
              <span className="text-forest-600 italic font-normal">Every single day.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right space-y-2">
            <p className="text-forest-600 text-xs uppercase tracking-widest font-medium">{PRICE.reference}</p>
            <p className="font-display text-3xl sm:text-4xl text-forest-900">{PRICE.starting}</p>
            <p className="text-xs text-forest-900/60">Forest-Themed 3 BHK Residences (1,910 sq. ft.)</p>
          </div>
        </div>

        {/* Editorial Asymmetric Image Grid with Interactive Carousel */}
        <div className="editorial-fade grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Large Image: Grand Arrival Fountain (Fixed Left Side) */}
          <div className="lg:col-span-7 group relative rounded-[2rem] overflow-hidden shadow-2xl border border-forest-100 bg-forest-950">
            <img
              src="/images/arrival-fountain.webp"
              alt="M3M Forestia West grand entrance arrival fountain"
              className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent flex flex-col justify-end p-8 sm:p-10">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-medium mb-1">Arrival Plaza</span>
              <h3 className="text-white font-display text-2xl sm:text-3xl">Cascading Water Courtyard</h3>
            </div>
          </div>

          {/* Secondary Editorial Card & Carousel (Right Side) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sliding Image Card */}
            <div className="group relative rounded-[2rem] overflow-hidden shadow-2xl border border-forest-100 bg-forest-950 transition-all duration-500">
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button 
                  onClick={handlePrevSlide}
                  className="size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextSlide}
                  className="size-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <img
                key={activeData.id}
                src={activeData.image}
                alt={activeData.title}
                className="w-full h-[260px] sm:h-[300px] object-cover transition-all duration-700 animate-fadeIn filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="flex items-center gap-2 text-gold-300 mb-1">
                  {activeData.icon}
                  <span className="text-xs uppercase tracking-widest font-medium">{activeData.tag}</span>
                </div>
                <h3 className="text-white font-display text-xl sm:text-2xl transition-all duration-300">{activeData.title}</h3>
              </div>
            </div>

            {/* Dynamic Content Switcher Bar with Clickable Button */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-forest-50/80 border border-forest-200/60 backdrop-blur-md flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-forest-600 animate-pulse" />
                  <p className="text-xs uppercase tracking-widest text-forest-600 font-medium">Feature {currentSlide + 1} of {carouselSlides.length}</p>
                </div>
                <p className="text-sm text-forest-900 font-medium">{activeData.subtitle}</p>
              </div>

              <button 
                onClick={handleNextSlide}
                className="size-12 rounded-full bg-forest-900 border border-forest-800 grid place-items-center text-white hover:bg-forest-800 transition-all duration-300 shadow-md group cursor-pointer"
                aria-label="Next Feature"
              >
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* Plan Pills Footer */}
        <div className="editorial-fade pt-8 border-t border-forest-800 flex flex-wrap justify-center gap-3">
          {PRICE.plans.map((p) => (
            <span
              key={p}
              className="rounded-full border border-gold-500/40 bg-forest-900/90 px-6 py-2.5 text-xs sm:text-sm text-cream-50 font-semibold tracking-wide shadow-md"
            >
              {p}
            </span>
          ))}
        </div>

      </div>

      {/* Floating Leaf Accent */}
      <div className="hidden sm:block absolute right-[-4%] lg:right-[-60px] top-[25%] w-32 lg:w-40 pointer-events-none z-10 opacity-90">
        <img src="/images/leaf-r.webp" alt="" className="grand-leaf w-full h-auto" />
      </div>

      <style>{`
        .grand-leaf {
          animation: grandLeafFloat 4s ease-in-out infinite;
        }
        @keyframes grandLeafFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(7deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0.6; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}