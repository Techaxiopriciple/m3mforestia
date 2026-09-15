import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".story-bg-img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".story-line", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-text",
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={root}
      className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="story-bg-img absolute inset-0 w-full h-full object-cover"
          src="/images/gic-banner-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-forest-950/20 to-forest-950/40" />
      </div>

      {/* GIC Logo */}
      <div className="absolute left-5 sm:left-8 bottom-6 z-20 w-20 h-16 flex items-center justify-center">
        <img
          src="/images/logo/gic.webp"
          alt="GIC Logo"
          className="w-[72px] h-[58px] object-contain brightness-0 invert"
        />
      </div>

      {/* Story Content */}
      <div className="story-text absolute left-0 right-0 top-[75%] -translate-y-1/2 w-full max-w-3xl mx-auto px-6 text-center">
        <p className="story-line text-[10px] sm:text-xs tracking-[0.35em] text-gold-400 mb-5 sm:mb-6">
          BEYOND SURFACES &amp; STRUCTURES
        </p>

        <h2 className="story-line font-display text-2xl sm:text-3xl md:text-4xl leading-[1.2] text-cream-50">
          True luxury today is found in spaces that feel{" "}
          <span className="italic text-gold-400">open, calm,</span> and deeply
          connected to their surroundings.
        </h2>
      </div>
    </section>
  );
}