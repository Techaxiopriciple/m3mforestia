import { useLayoutEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap } from "../lib/gsap";

const TOUR_ITEMS = [
  {
    label: "Construction Update",
    video: "/images/Forestia_CONSTRUCTION-UPDATE.mp4",
    // Video ke upar dikhne wala text aur subtitle
    subtitle: "GURGAON INTERNATIONAL CITY",
    title: "CONSTRUCTION UPDATE SEPTEMBER 2026",
  },
  {
    label: "Construction Milestone",
    video: "/images/forestia-construction-update.mp4",
    subtitle: "GURGAON INTERNATIONAL CITY",
    title: "CONSTRUCTION MILESTONE",
  },
];

export default function ImmersiveTour() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeTab, setActiveTab] = useState(0);
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tour-fade", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch (err) {
      console.error("Video playback failed:", err);
      setPlaying(false);
    }
  };

  const currentItem = TOUR_ITEMS[activeTab];

  return (
    <section id="immersive-tour" ref={root} className="relative py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Heading and Tabs */}
        <div className="tour-fade flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="font-display text-2xl sm:text-4xl text-forest-950">
            Immersive Tour
          </h2>

          <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-1.5 rounded-full self-start md:self-auto">
            {TOUR_ITEMS.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item.label}
                  onClick={() => handleTabChange(index)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-forest-950 text-white shadow-md"
                      : "text-forest-950/70 hover:text-forest-950 hover:bg-gray-200/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Player Box */}
        <div className="tour-fade relative rounded-2xl overflow-hidden bg-forest-950 shadow-2xl aspect-video">
          <video
            ref={videoRef}
            key={currentItem.video}
            src={currentItem.video}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            muted
            loop
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Overlay & Text - Video play hote hi hide ho jayega, pause hone par dikhega */}
          <div
            className={`absolute inset-0 bg-forest-950/50 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 z-10 pointer-events-none ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-xs sm:text-sm tracking-[0.25em] text-cream-200 uppercase mb-2 font-medium">
              {currentItem.subtitle}
            </p>
            <h3 className="font-display text-xl sm:text-3xl lg:text-4xl text-cream-50 tracking-wider">
              {currentItem.title}
            </h3>
            <div className="w-24 sm:w-48 h-[1px] bg-cream-50/50 mt-4" />
          </div>

          {/* Center Play Button */}
          <button
            aria-label={playing ? `Pause ${currentItem.label}` : `Play ${currentItem.label}`}
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 ${
              playing ? "opacity-0 hover:opacity-100" : "opacity-100"
            }`}
          >
            <span className="grid place-items-center size-16 sm:size-20 rounded-full bg-white/95 text-forest-950 shadow-xl hover:scale-105 transition-transform">
              <Play size={28} className="ml-1" fill="currentColor" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
} 