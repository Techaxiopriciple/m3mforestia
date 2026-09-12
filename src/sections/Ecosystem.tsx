import { useLayoutEffect, useRef } from "react";
import { Building2, Lightbulb, Briefcase, Sparkles } from "lucide-react";
import { gsap } from "../lib/gsap";
import { ECOSYSTEM } from "../lib/content";

const ICONS = [Building2, Lightbulb, Briefcase, Sparkles];

export default function Ecosystem() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eco-card", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-28 sm:py-36 bg-forest-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-5">
            GURGAON INTERNATIONAL CITY
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-cream-50 max-w-2xl mx-auto leading-tight">
            A Life Built Within the{" "}
            <span className="italic text-gold-400">Largest Integrated City</span> of
            Gurgaon
          </h2>
          <p className="mt-5 text-cream-100/70 max-w-xl mx-auto">
            Where living, working, innovation, and experiences coexist seamlessly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ECOSYSTEM.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={item.title}
                className="eco-card rounded-2xl border border-forest-700 bg-forest-950/40 p-8 hover:border-gold-500/60 transition-colors"
              >
                <Icon className="text-gold-400" size={28} strokeWidth={1.5} />
                <h3 className="font-display text-2xl text-cream-50 mt-6">{item.title}</h3>
                <p className="mt-3 text-sm text-cream-100/65 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
