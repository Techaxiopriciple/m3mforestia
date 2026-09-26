import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function GrandWelcome() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
      className="relative w-full aspect-[4/3] max-h-[100svh] overflow-hidden bg-forest-950"
    >
      {/* Full-bleed background image */}
      <img
        src="/images/forestia-master-bg.webp"
        alt="M3M Forestia West grand entrance arrival"
        width={2400}
        height={1802}
        loading="lazy"
        decoding="async"
        className="grand-fade absolute inset-0 w-full h-full object-cover object-[center_60%] pointer-events-none"
      />
    </section>
  );
}