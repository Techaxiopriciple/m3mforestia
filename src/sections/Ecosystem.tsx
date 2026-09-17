import { useLayoutEffect, useRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ECOSYSTEM, CONNECTIVITY, CENTRAL_CONNECTIVITY, ECO_ICON } from "../lib/content";

const CONNECTIVITY_NODES = [...CONNECTIVITY, ...CENTRAL_CONNECTIVITY].map((item, i, arr) => ({
  ...item,
  angle: -90 + (360 / arr.length) * i,
  radius: 42,
}));

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

      // Alternating fade-up / fade-down reveal for the icon cards and
      // connectivity stats, matching the reference site's per-card AOS pattern.
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
      {/* Background Image — same responsive pair (mobile/desktop) and fade-to-green treatment as the reference */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/gic-bg-mob.jpg"
          alt=""
          className="block sm:hidden w-full h-full object-cover object-top"
        />
        <img
          src="/images/gic-bg-desktop.jpg"
          alt=""
          className="hidden sm:block w-full h-full object-cover object-top"
        />

        {/* Safety overlay for text legibility over the lighter, blurred top of the image */}
        <div className="absolute inset-0 bg-forest-950/25" />
      </div>

      {/* Floating leaf accent — same graphic + drift animation as the reference's GIC section */}
      <div className="absolute -right-8 sm:right-[-27%] lg:right-[-85px] top-[10%] sm:top-[20%] lg:top-[12%] w-28 sm:w-36 lg:w-40 pointer-events-none z-10">
        <img src="/images/leaf-r.webp" alt="" className="eco-leaf w-full h-auto opacity-70 sm:opacity-85" />
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* GIC Logo + Intro */}
        <div className="eco-item flex flex-col items-center text-center">
          <img
            src="/images/logo/gic.webp"
            alt="Gurgaon International City"
            className="h-16 sm:h-20 w-auto object-contain"
          />
          <p className="mt-6 max-w-xl text-sm sm:text-base text-cream-100/75 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            <br className="hidden sm:block" />
            Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.
          </p>
        </div>

        {/* GIC Video */}
        <div className="eco-item mt-10 sm:mt-12 max-w-[59rem] mx-auto rounded-3xl overflow-hidden">
          <video
            className="w-full h-[296px] sm:h-[415px] lg:h-[534px] object-cover"
            src="/images/gic-banner-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        {/* Top 4 Sections */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((item, i) => {
            const Icon = ECO_ICON[i];

            return (
              <div
                key={item.title}
                className={`${i % 2 === 0 ? "eco-card-up" : "eco-card-down"} relative text-center px-6 py-8 lg:py-4 flex flex-col justify-between`}
              >
                {/* Vertical divider */}
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
                      className="object-contain brightness-0 invert"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-medium text-cream-50 hover:text-gold-400 transition-colors tracking-[0.16em] leading-snug uppercase whitespace-pre-line min-h-[3.5rem] flex items-center justify-center">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-medium text-cream-100/80 leading-relaxed max-w-[230px] mx-auto">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Connectivity Diagram */}
        <div className="eco-item mt-14 sm:mt-16 max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            {CONNECTIVITY_NODES.map((item, i) => (
              <div
                key={item.title}
                className={`${i % 2 === 0 ? "eco-stat-down" : "eco-stat-up"} border-l-2 border-gold-400/60 pl-5`}
              >
                <div className="font-display text-2xl sm:text-3xl text-gold-400">{item.time}</div>
                <p className="mt-2 text-sm text-cream-100/70 leading-snug">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="eco-diagram relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-[15%] rounded-full border border-dashed border-cream-100/25" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="eco-node z-10 flex flex-col items-center gap-1.5 rounded-full bg-gold-500 text-forest-950 px-4 py-3 shadow-lg shadow-forest-950/40">
                <MapPin size={18} />
                <span className="text-[10px] font-medium tracking-wide text-center leading-tight">
                  M3M FORESTIA
                  <br />
                  WEST
                </span>
              </div>
            </div>
            {CONNECTIVITY_NODES.map((n) => (
              <div
                key={n.title}
                className="eco-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream-100/20 bg-forest-900/70 px-3 py-1.5 text-[11px] text-cream-100/85 whitespace-nowrap"
                style={nodePos(n.angle, n.radius)}
              >
                {n.title}
              </div>
            ))}
          </div>
        </div>

        {/* Location AV / Location Map Tabs */}
        <div className="eco-item mt-14 sm:mt-16">
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => setLocationTab("av")}
              className={`relative flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-5 after:w-px after:bg-cream-100/30 ${
                locationTab === "av" ? "text-gold-400" : "text-cream-100/70 hover:text-gold-400"
              }`}
            >
              Location AV
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "av" ? "rotate-180 text-gold-400" : "text-cream-100/50"}`}
              />
            </button>
            <button
              onClick={() => setLocationTab("map")}
              className={`flex items-center gap-2 px-8 py-3 text-sm sm:text-base tracking-wide transition-colors ${
                locationTab === "map" ? "text-gold-400" : "text-cream-100/70 hover:text-gold-400"
              }`}
            >
              Location Map
              <ChevronDown
                size={14}
                className={`transition-transform ${locationTab === "map" ? "rotate-180 text-gold-400" : "text-cream-100/50"}`}
              />
            </button>
          </div>

          <div key={locationTab} className="eco-tabpane rounded-3xl overflow-hidden">
            {locationTab === "av" ? (
              <video
                className="w-full h-[240px] sm:h-[336px] lg:h-[432px] object-cover"
                src="/images/gic-banner-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img
                src="/images/forestia-map.webp"
                alt="M3M Forestia West location map"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}