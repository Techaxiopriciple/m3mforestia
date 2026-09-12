import { useLayoutEffect, useRef, useState } from "react";
import { Dumbbell, PartyPopper, Trophy, Briefcase, Leaf } from "lucide-react";
import { gsap } from "../lib/gsap";
import { AMENITY_CATEGORIES } from "../lib/content";

const ICONS: Record<string, typeof Dumbbell> = {
  sports: Trophy,
  fitness: Dumbbell,
  entertainment: PartyPopper,
  business: Briefcase,
  rejuvenate: Leaf,
};

export default function ClubEden() {
  const [active, setActive] = useState(AMENITY_CATEGORIES[0].key);
  const listRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }
    );
  }, [active]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eden-fade", {
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

  const current = AMENITY_CATEGORIES.find((c) => c.key === active)!;

  return (
    <section id="amenities" ref={root} className="relative py-28 sm:py-36 bg-forest-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="eden-fade text-center mb-14">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-5">
            INTRODUCING CLUB EDEN
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-cream-50 max-w-2xl mx-auto leading-tight">
            Live the <span className="italic text-gold-400">Extravagant Club Lifestyle</span>
          </h2>
          <p className="mt-5 text-cream-100/70 max-w-xl mx-auto">
            Contemporary in design and rich in experiences — wellness, leisure, and
            celebration where every day feels refreshed.
          </p>
        </div>

        <div className="eden-fade relative rounded-3xl overflow-hidden mb-14">
          <img
            src="/images/connections-hero.webp"
            alt="Club Eden central grove"
            loading="lazy"
            className="w-full h-64 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent" />
        </div>

        <div className="eden-fade flex flex-wrap justify-center gap-3 mb-10">
          {AMENITY_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.key];
            const isActive = cat.key === active;
            return (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "border-gold-500 bg-gold-500 text-forest-950"
                    : "border-forest-700 text-cream-100/75 hover:border-gold-500/60"
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          ref={listRef}
          className="eden-fade grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {current.items.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-forest-700 bg-forest-900/60 px-4 py-3.5 text-sm text-cream-100/85 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
