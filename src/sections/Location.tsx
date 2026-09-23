import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap } from "../lib/gsap";
import { STATS } from "../lib/content";

const NODES = [
  { label: "Dwarka Expressway", angle: -100, radius: 42 },
  { label: "NH8", angle: -40, radius: 40 },
  { label: "KMP Expressway", angle: 20, radius: 42 },
  { label: "Gurgaon–Rewari Expressway", angle: 75, radius: 40 },
  { label: "IGI Airport · 20 min", angle: 130, radius: 42 },
  { label: "Global City · 2 min", angle: 180, radius: 38 },
  { label: "Sultanpur Bird Sanctuary", angle: -150, radius: 40 },
];

function nodePos(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + radius * Math.cos(rad)}%`,
    top: `${50 + radius * Math.sin(rad) * 0.75}%`,
  };
}

export default function Location() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-node", {
        opacity: 0,
        scale: 0.6,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".loc-diagram", start: "top 70%" },
      });

      STATS.forEach((s) => {
        const target = { val: 0 };
        const el = document.querySelector<HTMLSpanElement>(`[data-stat="${s.label}"]`);
        if (!el) return;
        gsap.to(target, {
          val: Number(s.value),
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
          onUpdate: () => {
            el.textContent = Math.round(target.val).toString();
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="location" ref={root} className="relative py-28 sm:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">
            AT THE CENTER OF LIFE &amp; GROWTH
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-forest-950 max-w-2xl mx-auto leading-tight">
            Strategically Placed, <span className="italic text-forest-600">Effortlessly Connected</span>
          </h2>
          <p className="mt-5 text-forest-900/70 max-w-xl mx-auto">
            Amid major expressways and growth corridors — cutting travel time to
            major hubs by up to 60%.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-forest-600/60 pl-5">
                <div className="font-display text-4xl sm:text-5xl text-forest-700">
                  <span data-stat={s.label}>0</span>
                  {s.suffix ?? ""}
                </div>
                <p className="mt-2 text-sm text-forest-900/70 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="loc-diagram relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-[15%] rounded-full border border-dashed border-forest-200" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="loc-node z-10 flex flex-col items-center gap-1.5 rounded-full bg-forest-700 text-white px-4 py-3 shadow-lg shadow-forest-950/30">
                <MapPin size={18} />
                <span className="text-[10px] font-medium tracking-wide text-center leading-tight">
                  M3M FORESTIA
                  <br />
                  WEST
                </span>
              </div>
            </div>
            {NODES.map((n) => (
              <div
                key={n.label}
                className="loc-node absolute -translate-x-1/2 -translate-y-1/2 rounded-xl sm:rounded-full border border-forest-200 bg-forest-50 px-2 py-1 sm:px-3 sm:py-1.5 text-[8px] sm:text-[11px] text-forest-900/85 text-center leading-tight max-w-[92px] sm:max-w-none sm:whitespace-nowrap"
                style={nodePos(n.angle, n.radius)}
              >
                {n.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
