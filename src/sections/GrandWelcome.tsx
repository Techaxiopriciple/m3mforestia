import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function GrandWelcome() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate elements with fade-in and upward motion on scroll trigger
      gsap.from(".grand-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arrival"
      ref={root}
      className="relative w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      <div className="grand-fade relative w-full h-full flex items-center justify-center">
        {/* Image stretches end-to-end to completely fill the screen without cutting content */}
        <img
          src="/images/forestia-master-bg.webp"
          alt="M3M Forestia West grand entrance arrival"
          width={2400}
          height={1802}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none block"
          style={{
            filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6))",
          }}
        />

        {/* Soft gradient overlay at the bottom for cinematic depth */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}