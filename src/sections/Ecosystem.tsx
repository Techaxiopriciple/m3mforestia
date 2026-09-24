import { useLayoutEffect, useRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ECOSYSTEM, CONNECTIVITY, CENTRAL_CONNECTIVITY, ECO_ICON } from "../lib/content";
import { useInView } from "../lib/useInView";
import { useAutoPauseVideo } from "../lib/useAutoPauseVideo";

const CONNECTIVITY_NODES = [...CONNECTIVITY, ...CENTRAL_CONNECTIVITY].map((item, i, arr) => ({
  ...item,
  angle: -90 + (360 / arr.length) * i,
  radius: 42,
}));

// Custom tab labels provided by you
const SECTION_TABS = [
  "Location",
  "Vicinity",
  "Future Development",
  "Density of area",
];

function nodePos(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad) * 0.75}%`,
  };
}

export default function Ecosystem() {
  const root = useRef<HTMLDivElement>(null);
  const [locationTab, setLocationTab] = useState<"av" | "map">("av");
  
  // State for the new custom tabs placed below the cards
  const [activeTab, setActiveTab] = useState(0);

  const { ref: videoWrapRef, inView: videoInView } = useInView<HTMLDivElement>();
  const { ref: tabWrapRef, inView: tabInView } = useInView<HTMLDivElement>();
  const mainVideoRef = useAutoPauseVideo<HTMLVideoElement>();
  const tabVideoRef = useAutoPauseVideo<HTMLVideoElement>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eco-item", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      gsap.from(".eco-node", {
        opacity: 0,
        scale: 0.6,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".eco-diagram", start: "top 75%" },
      });

      gsap.from(".eco-card-up, .eco-stat-up", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });

      gsap.from(".eco-card-down, .eco-stat-down", {
        opacity: 0,
        y: -40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={root}
      className="relative pt-8 sm:pt-10 lg:pt-14 pb-14 sm:pb-20 lg:pb-24 overflow-hidden"
    >
      {/* Background with a greenish overlay instead of blackish */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/gic-bg-mob.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="block sm:hidden w-full h-full object-cover object-top"
        />
        <img
          src="/images/eco-bg.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="hidden sm:block w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/50 via-emerald-950/40 to-forest-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-emerald-900/20 backdrop-brightness-110" />
      </div>

      <div className="absolute -right-8 sm:right-[-27%] lg:right-[-85px] top-[10%] sm:top-[20%] lg:top-[12%] w-28 sm:w-36 lg:w-40 pointer-events-none z-10">
        <img
          src="/images/leaf-r.webp"
          alt=""
          width={129}
          height={128}
          loading="lazy"
          className="eco-leaf w-full h-auto opacity-75 sm:opacity-90"
        />
      </div>

      <style>{`
        .eco-leaf {
          animation: ecoLeafFloat 4s ease-in-out infinite;
        }
        @keyframes ecoLeafFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .eco-tabpane {
          animation: ecoTabFade 0.4s ease;
        }
        @keyframes ecoTabFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="eco-item flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/images/logo/gic.webp"
              alt="Gurgaon International City"
              width={300}
              height={223}
              loading="lazy"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
            />
            <p className="text-xs sm:text-sm tracking-[0.2em] text-gold-300 uppercase font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Part of the Largest Integrated City of Gurgaon
            </p>
          </div>
          
          <p className="mt-6 max-w-2xl text-sm sm:text-base text-white font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            GIC – Gurgaon International City is a thoughtfully planned, future-forward ecosystem where world-class living, leisure, and sustainability converge. Designed to inspire progress, it redefines how you live, work, and grow amidst nature.
          </p>
        </div>

        {/* First Video */}
        <div
          ref={videoWrapRef}
          className="eco-item mt-10 sm:mt-12 max-w-[59rem] mx-auto rounded-3xl overflow-hidden bg-emerald-950/80 border border-emerald-500/20 shadow-2xl h-[296px] sm:h-[415px] lg:h-[534px]"
        >
          {videoInView && (
            <video
              ref={mainVideoRef}
              className="w-full h-full object-cover"
              src="/images/gic-banner-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
          )}
        </div>

        {/* Original 4 Cards Grid Layout */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((item, i) => {
            const Icon = ECO_ICON[i];

            return (
              <div
                key={item.title}
                className={`${i % 2 === 0 ? "eco-card-up" : "eco-card-down"} relative text-center px-6 py-8 lg:py-4 flex flex-col justify-between`}
              >
                {i < ECOSYSTEM.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
                )}

                <div>
                  <div className="flex justify-center mb-6">
                    <div className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/30 shadow-inner">
                      <img
                        src={Icon.image}
                        alt={item.title}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] hover:text-gold-400 transition-colors tracking-[0.16em] leading-snug uppercase whitespace-pre-line min-h-[3.5rem] flex items-center justify-center">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-semibold text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-relaxed max-w-[230px] mx-auto">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Named Tabs Section */}
        <div className="eco-item mt-16 sm:mt-20 max-w-5xl mx-auto">
          {/* Tab Buttons Header with Greenish Tint */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-emerald-950/70 p-2 rounded-2xl border border-emerald-500/30 backdrop-blur-md mb-12 shadow-lg">
            {SECTION_TABS.map((tabName, i) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(i)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 tracking-wider uppercase text-center cursor-pointer ${
                  activeTab === i
                    ? "bg-gold-500 text-forest-950 font-bold shadow-lg shadow-gold-500/20"
                    : "text-white font-semibold hover:text-white hover:bg-emerald-900/50"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Dynamic Content Pane for Active Tab */}
          <div key={activeTab} className="eco-tabpane grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            <div className="grid grid-cols-2 gap-6">
              {CONNECTIVITY_NODES.map((item, index) => (
                <div
                  key={item.title}
                  className={`${index % 2 === 0 ? "eco-stat-down" : "eco-stat-up"} border-l-2 border-gold-400/60 pl-5`}
                >
                  <div className="font-display text-2xl sm:text-3xl text-gold-400 font-bold">{item.time}</div>
                  <p className="mt-2 text-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-snug">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="eco-diagram relative aspect-square max-w-md mx-auto w-full">
              <div className="absolute inset-[15%] rounded-full border border-dashed border-emerald-400/40" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="eco-node z-10 flex flex-col items-center gap-1.5 rounded-full bg-gold-500 text-forest-950 px-4 py-3 shadow-lg shadow-emerald-950/60 font-bold">
                  <MapPin size={18} />
                  <span className="text-[10px] font-bold tracking-wide text-center leading-tight uppercase">
                    M3M FORESTIA
                    <br />
                    West
                  </span>
                </div>
              </div>
              {CONNECTIVITY_NODES.map((n) => (
                <div
                  key={n.title}
                  className="eco-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/30 bg-emerald-950/90 px-3 py-1.5 text-[11px] text-white font-semibold whitespace-nowrap shadow-md"
                  style={nodePos(n.angle, n.radius)}
                >
                  {n.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location AV / Location Map Tabs */}
        <div className="eco-item mt-14 sm:mt-16">
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => setLocationTab("av")}
              className={`relative flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-semibold after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-cream-100/30 ${
                locationTab === "av" ? "text-gold-400 font-bold" : "text-white hover:text-gold-400"
              }`}
            >
              Location AV
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "av" ? "rotate-180 text-gold-400" : "text-white/70"}`}
              />
            </button>
            <button
              onClick={() => setLocationTab("map")}
              className={`flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-semibold ${
                locationTab === "map" ? "text-gold-400 font-bold" : "text-white hover:text-gold-400"
              }`}
            >
              Location Map
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "map" ? "rotate-180 text-gold-400" : "text-white/70"}`}
              />
            </button>
          </div>

          <div
            ref={tabWrapRef}
            key={locationTab}
            className="eco-tabpane max-w-[59rem] mx-auto rounded-3xl overflow-hidden bg-emerald-950/80 border border-emerald-500/20 shadow-2xl h-[296px] sm:h-[415px] lg:h-[534px]"
          >
            {locationTab === "av" ? (
              tabInView && (
                <video
                  ref={tabVideoRef}
                  className="w-full h-full object-cover"
                  src="/images/gic-location-av.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              )
            ) : (
              <img
                src="/images/forestia-map.webp"
                alt="M3M Forestia West location map"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}