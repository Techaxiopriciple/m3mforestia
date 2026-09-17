import { Bird, Leaf } from "lucide-react";

const ITEMS = [
  "180+ Bird Species Across Seasons",
  "200+ Species of Trees",
  "Bamboo Grove",
  "Cassia Fistula",
  "Indian Paradise Flycatcher",
  "Bombax Ceiba",
  "Striped Tiger Butterfly",
  "Nelumbo Nucifera",
  "Black Francolin",
  "Duranta Erecta",
];

export default function Biodiversity() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-b from-forest-950 via-[#0a261c] to-forest-950 border-y border-gold-500/20 overflow-hidden shadow-2xl">
      {/* Subtle top/bottom inner glow for richness */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="text-center mb-8 sm:mb-10 px-6 relative z-10">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-gold-400 mb-3 uppercase">
          Ecosystem & Wildlife
        </p>
        <h2 className="font-display text-2xl sm:text-4xl text-cream-50 leading-tight">
          Where Nature Paints a <span className="italic text-gold-400">New Story Every Season</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="marquee flex w-max gap-12 py-2">
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-cream-100/80 text-sm sm:text-base font-medium tracking-wide whitespace-nowrap bg-forest-900/40 px-5 py-2 rounded-full border border-cream-50/10 backdrop-blur-sm"
            >
              {i % 2 === 0 ? (
                <Bird size={16} className="text-gold-400 shrink-0" />
              ) : (
                <Leaf size={16} className="text-gold-400 shrink-0" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Edge fades so the marquee text dissolves smoothly into the dark background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-forest-950 via-forest-950/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-forest-950 via-forest-950/80 to-transparent z-10" />

      <style>{`
        .marquee {
          animation: marquee-scroll 38s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}