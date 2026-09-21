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
      className="relative pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-36 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/gic-bg-mob.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="block sm:hidden w-full h-full object-cover object-top"
        />
        <img
          src="/images/gic-bg-desktop.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="hidden sm:block w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-forest-950/60" />
      </div>

      <div className="absolute -right-8 sm:right-[-27%] lg:right-[-85px] top-[10%] sm:top-[20%] lg:top-[12%] w-28 sm:w-36 lg:w-40 pointer-events-none z-10">
        <img
          src="/images/leaf-r.webp"
          alt=""
          width={129}
          height={128}
          loading="lazy"
          className="eco-leaf w-full h-auto opacity-70 sm:opacity-85"
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
          <img
            src="/images/logo/gic.webp"
            alt="Gurgaon International City"
            width={300}
            height={223}
            loading="lazy"
            className="h-16 sm:h-20 w-auto object-contain"
          />
          <p className="mt-6 max-w-xl text-sm sm:text-base text-cream-100/90 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            <br className="hidden sm:block" />
            Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.
          </p>
        </div>

        {/* First Video */}
        <div
          ref={videoWrapRef}
          className="eco-item mt-10 sm:mt-12 max-w-[59rem] mx-auto rounded-3xl overflow-hidden bg-forest-900 h-[296px] sm:h-[415px] lg:h-[534px]"
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

        {/* ========================================== */}
        {/* Original 4 Cards Grid Layout (At Top) */}
        {/* ========================================== */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((item, i) => {
            const Icon = ECO_ICON[i];

            return (
              <div
                key={item.title}
                className={`${i % 2 === 0 ? "eco-card-up" : "eco-card-down"} relative text-center px-6 py-8 lg:py-4 flex flex-col justify-between`}
              >
                {i < ECOSYSTEM.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gold-400/50" />
                )}

                <div>
                  <div className="flex justify-center mb-6">
                    <img
                      src={Icon.image}
                      alt={item.title}
                      width={52}
                      height={52}
                      loading="lazy"
                      className="object-contain brightness-0 invert"
                    />
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-medium text-cream-50 hover:text-gold-400 transition-colors tracking-[0.16em] leading-snug uppercase whitespace-pre-line min-h-[3.5rem] flex items-center justify-center">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-medium text-cream-100/90 leading-relaxed max-w-[230px] mx-auto">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* Custom Named Tabs Section (Below Cards) */}
        {/* ========================================== */}
        <div className="eco-item mt-16 sm:mt-20 max-w-5xl mx-auto">
          {/* Tab Buttons Header */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-forest-900/60 p-2 rounded-2xl border border-gold-400/20 backdrop-blur-md mb-12">
            {SECTION_TABS.map((tabName, i) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(i)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 tracking-wider uppercase text-center cursor-pointer ${
                  activeTab === i
                    ? "bg-gold-500 text-forest-950 font-bold shadow-lg shadow-gold-500/20"
                    : "text-cream-100/80 hover:text-white hover:bg-forest-800/50"
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
                  <div className="font-display text-2xl sm:text-3xl text-gold-400">{item.time}</div>
                  <p className="mt-2 text-sm text-cream-100/85 leading-snug font-medium">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="eco-diagram relative aspect-square max-w-md mx-auto w-full">
              <div className="absolute inset-[15%] rounded-full border border-dashed border-cream-100/50" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="eco-node z-10 flex flex-col items-center gap-1.5 rounded-full bg-gold-500 text-forest-950 px-4 py-3 shadow-lg shadow-forest-950/40">
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
                  className="eco-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream-100/30 bg-forest-900/90 px-3 py-1.5 text-[11px] text-cream-100/95 whitespace-nowrap font-medium"
                  style={nodePos(n.angle, n.radius)}
                >
                  {n.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ========================================== */}

        {/* Location AV / Location Map Tabs */}
        <div className="eco-item mt-14 sm:mt-16">
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => setLocationTab("av")}
              className={`relative flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-medium after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-cream-100/30 ${
                locationTab === "av" ? "text-gold-400" : "text-cream-100/90 hover:text-gold-400"
              }`}
            >
              Location AV
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "av" ? "rotate-180 text-gold-400" : "text-cream-100/70"}`}
              />
            </button>
            <button
              onClick={() => setLocationTab("map")}
              className={`flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-medium ${
                locationTab === "map" ? "text-gold-400" : "text-cream-100/90 hover:text-gold-400"
              }`}
            >
              Location Map
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "map" ? "rotate-180 text-gold-400" : "text-cream-100/70"}`}
              />
            </button>
          </div>

          <div
            ref={tabWrapRef}
            key={locationTab}
            className="eco-tabpane max-w-[59rem] mx-auto rounded-3xl overflow-hidden bg-forest-900 h-[296px] sm:h-[415px] lg:h-[534px]"
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