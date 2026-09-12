import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { CENTRAL_GROVE } from "../lib/content";

export default function CentralGrove() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".grove-panel");

      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          scrub: 0.6,
          pin: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, duration: 0.4 }).to(
          panel,
          { autoAlpha: 1, duration: 0.4 },
          "<"
        );
        tl.to({}, { duration: 0.6 }); // hold
      });

      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-dvh min-h-[600px] w-full overflow-hidden">
      {CENTRAL_GROVE.map((item) => (
        <div key={item.title} className="grove-panel absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/30" />
          <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-end pb-20 sm:pb-28">
            <p className="text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-4">
              THE CENTRAL GROVE · HEART OF GIC
            </p>
            <h3 className="font-display text-4xl sm:text-6xl text-cream-50">{item.title}</h3>
            <p className="mt-2 text-gold-300 text-sm sm:text-base italic">{item.tag}</p>
            <p className="mt-5 max-w-lg text-cream-100/80 leading-relaxed">{item.body}</p>
          </div>
        </div>
      ))}

      <div className="absolute top-8 inset-x-0 z-10 flex justify-center gap-2">
        {CENTRAL_GROVE.map((item) => (
          <span key={item.title} className="h-1 w-10 rounded-full bg-cream-100/25" />
        ))}
      </div>
    </section>
  );
}
