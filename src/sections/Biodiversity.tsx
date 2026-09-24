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
    <section className="relative py-8 sm:py-10 overflow-hidden bg-white">
      <div className="text-center mb-8 sm:mb-10 px-6 relative z-10">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-forest-600 mb-3 uppercase font-bold">
          Ecosystem & Wildlife
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="marquee flex w-max gap-4 py-2">
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-forest-950 text-sm sm:text-base font-medium tracking-wide whitespace-nowrap bg-forest-50/80 px-6 py-3 rounded-full border border-forest-200 shadow-sm"
            >
              {i % 2 === 0 ? (
                <Bird size={16} className="text-[#a37e38] shrink-0" />
              ) : (
                <Leaf size={16} className="text-[#a37e38] shrink-0" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Edge fades matching the white background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

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