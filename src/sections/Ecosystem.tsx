import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { MapPin, ChevronDown, ExternalLink } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ECOSYSTEM, CONNECTIVITY, CENTRAL_CONNECTIVITY, VICINITY, ECO_ICON } from "../lib/content";
import { useInView } from "../lib/useInView";
import { useAutoPauseVideo } from "../lib/useAutoPauseVideo";

// heading = gold stat line, text = caption below it, label = diagram node text
type PaneItem = { heading: string; text: string; label: string };

function toNodes(items: PaneItem[]) {
  return items.map((item, i, arr) => ({
    ...item,
    angle: -90 + (360 / arr.length) * i,
    radius: 42,
  }));
}

const CONNECTIVITY_NODES = toNodes(
  [...CONNECTIVITY, ...CENTRAL_CONNECTIVITY].map((item) => ({
    heading: item.time,
    text: item.title,
    label: item.title,
  })),
);

const VICINITY_NODES = toNodes(
  VICINITY.map((item) => ({
    heading: item.category,
    text: item.places.join(", "),
    label: item.category,
  })),
);

// Future Development 6 Cards with Links, Texts, and Images based on your screenshot
const FUTURE_DEVELOPMENT_ITEMS = [
  {
    title: "Haryana plans to invest Rs 1 trillion in Gurugram Global City",
    source: "Construction World",
    date: "10 Oct 2022",
    text: "The Haryana government is looking to invest of Rs 1 trillion in the Global City project in Gurugram, which will come up on...",
    image: "/images/news-1.webp",
    link: "https://www.constructionworld.in",
  },
  {
    title: "Haryana to launch AI Mission with World Bank support: CM Nayab Saini",
    source: "The Tribune",
    date: "22 Jan 2026",
    text: "Calling Artificial Intelligence (AI) the future of development, Haryana Chief Minister Nayab Saini on Wednesday announced that the...",
    image: "/images/news-2.webp",
    link: "https://www.tribuneindia.com",
  },
  {
    title: "M3M enters integrated township segment, to invest Rs 7,200 cr in Gurugram",
    source: "Business Standard",
    date: "5 Nov 2025",
    text: "M3M India will invest 7200 crore to develop a 150-acre integrated township, Gurgaon International City, marking its entry into the...",
    image: "/images/news-3.webp",
    link: "https://www.business-standard.com",
  },
  {
    title: "Haryana Govt to expedite Global City project work in Gurugram",
    source: "The Statesman",
    date: "20 Jan 2025",
    text: "After the Punjab and Haryana High Court quashed the public interest litigation against it, the Haryana Government on Friday said that the...",
    image: "/images/news-4.webp",
    link: "https://www.thestatesman.com",
  },
  {
    title: "Haryana Unveils 'Make in Haryana' Industrial Policy; Targets ₹5 Lakh Crore Investment, AI-Led Growth",
    source: "ETGovernment",
    date: "2 Jun 2026",
    text: "Chief Minister Nayab Saini Launches New Industrial Policy Framework, with Focus on AI, Data Centres, GCCs and Future-Ready.",
    image: "/images/news-5.webp",
    link: "https://government.economictimes.indiatimes.com",
  },
  {
    title: "M3M India to invest ₹7,200 crore to develop integrated city in Delhi",
    source: "ET Realty",
    date: "5 Nov 2025",
    text: "M3M India is set to invest ₹7,200 crore to develop integrated city in Gurgaon International City (GIC), a 150-acre integrated township on the Dwarka Expressway Link Road.",
    image: "/images/news-6.webp",
    link: "https://realty.economictimes.indiatimes.com",
  },
];

const FUTURE_DEVELOPMENT_NODES = toNodes(
  FUTURE_DEVELOPMENT_ITEMS.map((item) => ({
    heading: item.source,
    text: item.title,
    label: item.source,
  })),
);

const TAB_NODES: Record<string, ReturnType<typeof toNodes>> = {
  Vicinity: VICINITY_NODES,
  "Future Development": FUTURE_DEVELOPMENT_NODES,
};

// Custom tab labels provided by you
const SECTION_TABS = [
  "Location",
  "Vicinity",
  "Future Development",
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
  const paneNodes = TAB_NODES[SECTION_TABS[activeTab]] ?? CONNECTIVITY_NODES;

  const { ref: videoWrapRef, inView: videoInView } = useInView<HTMLDivElement>();
  const tabWrapRef = useRef<HTMLDivElement>(null);
  
  // useAutoPauseVideo hook automatically pauses video when it goes out of view
  const mainVideoRef = useAutoPauseVideo<HTMLVideoElement>();
  
  // Custom ref for Location AV video to play/pause based on 100% visibility (threshold: 1.0)
  const customTabVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = customTabVideoRef.current;
    const wrapEl = tabWrapRef.current;
    if (!videoEl || !wrapEl || locationTab !== "av") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 1.0) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(wrapEl);
    return () => observer.disconnect();
  }, [locationTab]);

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
      {/* Background with a slightly darker green backdrop overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/eco-bg-gemini-5.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-emerald-950/40" />
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
          
          {/* Integrated City Text (Extra Bold/Dark), Golden Divider, & Original GIC Logo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-6 pb-4 w-full mb-8">
            <p className="text-xs sm:text-sm tracking-[0.2em] text-gold-400 uppercase font-black text-center sm:text-left leading-relaxed">
              Part of the Largest <br className="hidden sm:block" /> Integrated City of Gurgaon
            </p>
            <div className="hidden sm:block h-14 w-px bg-gold-400" />
            <a href="#top" aria-label="GIC Logo" className="flex items-center justify-start p-2">
              <img
                src="/images/logo/gic.webp"
                alt="GIC Logo"
                width={300}
                height={223}
                loading="lazy"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </a>
          </div>
          
          <p className="max-w-2xl text-sm sm:text-base text-white font-bold leading-relaxed">
            GIC – Gurgaon International City is a thoughtfully planned, future-forward ecosystem where world-class living, leisure, and sustainability converge. Designed to inspire progress, it redefines how you live, work, and grow amidst nature.
          </p>
        </div>

        {/* First Video (Plays only when in view) */}
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

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white hover:text-gold-400 transition-colors tracking-[0.16em] leading-snug uppercase whitespace-pre-line min-h-[3.5rem] flex items-center justify-center">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-bold text-white leading-relaxed max-w-[230px] mx-auto whitespace-pre-line">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Named Tabs Section */}
        <div className="eco-item mt-16 sm:mt-20 max-w-5xl mx-auto">
          {/* Tab Buttons Header */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-emerald-950/70 p-2 rounded-2xl border border-emerald-500/30 mb-12 shadow-lg">
            {SECTION_TABS.map((tabName, i) => (
              <button
                key={tabName}
                onClick={() => setActiveTab(i)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 tracking-wider uppercase text-center cursor-pointer ${
                  activeTab === i
                    ? "bg-gold-500 text-forest-950 font-bold shadow-lg shadow-gold-500/20"
                    : "text-white font-bold hover:text-white hover:bg-emerald-900/50"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Dynamic Content Pane for Active Tab */}
          <div key={activeTab} className="eco-tabpane">
            {activeTab === 2 ? (
              /* Future Development Horizontal Rectangular Grid Layout (Like Screenshot) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {FUTURE_DEVELOPMENT_ITEMS.map((news, idx) => (
                  <div
                    key={idx}
                    className="bg-emerald-950/90 border border-emerald-500/30 rounded-2xl p-4 shadow-xl flex gap-4 items-center hover:border-gold-400 transition-all duration-300 group"
                  >
                    {/* Left Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gold-400 font-bold uppercase tracking-wider mb-1">
                        {news.source}
                      </div>
                      <h4 className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-white/70 leading-relaxed line-clamp-2">
                        {news.text}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-300/80">{news.date}</span>
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-400 hover:underline"
                        >
                          Read <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>

                    {/* Right Thumbnail Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden border border-emerald-500/20 shadow-inner">
                      <img
                        src={news.image}
                        alt={news.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Location & Vicinity Default Layout */
              <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
                <div className="grid grid-cols-2 gap-6">
                  {paneNodes.map((item, index) => (
                    <div
                      key={item.label}
                      className={`${index % 2 === 0 ? "eco-stat-down" : "eco-stat-up"} border-l-2 border-gold-400/60 pl-5`}
                    >
                      <div className="font-display text-2xl sm:text-3xl text-gold-400 font-bold">{item.heading}</div>
                      {item.text && (
                        <p className="mt-2 text-sm text-white font-bold leading-snug">{item.text}</p>
                      )}
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
                  {paneNodes.map((n) => (
                    <div
                      key={n.label}
                      className="eco-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/30 bg-emerald-950/90 px-3 py-1.5 text-[11px] text-white font-bold whitespace-nowrap shadow-md"
                      style={nodePos(n.angle, n.radius)}
                    >
                      {n.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location AV / Location Map Tabs */}
        <div className="eco-item mt-14 sm:mt-16">
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => locationTab !== "av" && setLocationTab("av")}
              className={`relative flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-bold after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-cream-100/30 ${
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
              onClick={() => locationTab !== "map" && setLocationTab("map")}
              className={`flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors font-bold ${
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
            className="eco-tabpane max-w-[59rem] mx-auto rounded-3xl overflow-hidden bg-emerald-950/95 border border-emerald-500/20 shadow-2xl h-[296px] sm:h-[415px] lg:h-[534px]"
          >
            {locationTab === "av" ? (
              <video
                ref={customTabVideoRef}
                className="w-full h-full object-cover"
                src="/images/gic-location-av.mp4"
                muted
                loop
                playsInline
                preload="none"
              />
            ) : (
              <img
                src="/images/forestia-map.webp"
                alt="M3M Forestia West location map"
                className="w-full h-full object-fill"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}