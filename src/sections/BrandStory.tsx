import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".story-bg-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(".story-line", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story-text", start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="story-bg-img absolute inset-0 -top-[10%] h-[120%] bg-[url(/images/story-bg.webp)] bg-cover bg-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/85 to-forest-950" />
      </div>

      <div className="story-text max-w-4xl mx-auto px-6 text-center">
        <p className="story-line text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-8">
          BEYOND SURFACES &amp; STRUCTURES
        </p>
        <h2 className="story-line font-display text-3xl sm:text-5xl md:text-6xl leading-tight text-cream-50">
          True luxury today is found in spaces that feel{" "}
          <span className="italic text-gold-400">open, calm,</span> and deeply
          connected to their surroundings.
        </h2>
        <p className="story-line mt-8 text-cream-100/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          It is defined by balance, wellness, and the freedom to breathe easily —
          and live consciously. Thoughtfully envisioned forest-themed residences,
          crafted for those who seek harmony and conscious living.
        </p>
      </div>
    </section>
  );
}
