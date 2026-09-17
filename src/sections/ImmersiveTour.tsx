import { useLayoutEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap } from "../lib/gsap";

const VIDEO_DATA = {
  video: "/images/Forestia_CONSTRUCTION-UPDATE.mp4",
  title: "Construction Update | August 2026",
};

export default function ImmersiveTour() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  return (
    <section id="immersive-tour" ref={root} className="relative py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="tour-fade text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-forest-950">
            Construction Update
          </h2>
        </div>

        {/* Clean Video Player Box */}
        <div className="tour-fade relative rounded-xl overflow-hidden bg-forest-950 shadow-2xl w-full h-64 sm:h-96 group">
          <video
            ref={videoRef}
            src={VIDEO_DATA.video}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            controls={false}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          {/* Title Overlay (Video play hone par fade out ho jayega, pause hone par dikhega) */}
          <div
            className={`absolute inset-0 bg-forest-950/40 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 z-10 pointer-events-none ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <h3 className="font-display text-xl sm:text-3xl lg:text-4xl text-cream-50 tracking-wider">
              {VIDEO_DATA.title}
            </h3>
            <div className="w-24 sm:w-48 h-[1px] bg-cream-50/50 mt-4" />
          </div>

          {/* Center Play/Pause Button */}
          <button
            aria-label={playing ? "Pause video" : "Play video"}
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <span className="grid place-items-center size-16 sm:size-20 rounded-full bg-white/95 text-forest-950 shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <Play size={28} className="ml-1" fill="currentColor" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}