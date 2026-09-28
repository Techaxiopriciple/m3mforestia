import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function GrandWelcome() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in and upward motion animation on scroll
      gsap.from(".grand-fade", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      // Smooth subtle zoom-in effect tailored for all devices
      gsap.to(".grand-bg-img", {
        scale: 1.05,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arrival"
      ref={root}
      className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      <div className="grand-fade relative w-full h-full flex items-center justify-center">
        {/* High-end crisp rendering image without forced height constraints */}
        <img
          src="/images/forestia-master-bg.webp"
          alt="M3M Forestia West grand entrance arrival"
          width={2880}
          height={2160}
          loading="eager"
          decoding="async"
          className="grand-bg-img w-full h-auto object-cover pointer-events-none block"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />

        {/* Top cinematic gradient overlay for smooth header blending */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}