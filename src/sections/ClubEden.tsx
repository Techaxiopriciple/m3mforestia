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
    <section id="amenities" ref={root} className="relative py-8 sm:py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
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
                    ? "border-forest-700 bg-forest-700 text-white"
                    : "border-forest-200 text-forest-900/75 hover:border-forest-600/60"
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
              className="rounded-xl border border-forest-100 bg-forest-50 px-4 py-3.5 text-sm text-forest-900/85 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
