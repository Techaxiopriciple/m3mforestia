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
    <section className="relative py-8 sm:py-10 bg-forest-800 border-y border-forest-700 overflow-hidden">
      <div className="text-center mb-10 px-6">
        <h2 className="font-display text-2xl sm:text-4xl text-cream-50">
          Where Nature Paints a <span className="italic text-gold-400">New Story Every Season</span>
        </h2>
      </div>

      <div className="marquee flex w-max gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 text-cream-100/75 text-sm sm:text-base whitespace-nowrap"
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

      <style>{`
        .marquee {
          animation: marquee-scroll 32s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
