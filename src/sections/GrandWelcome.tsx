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
      className="relative w-full bg-white flex flex-col items-center overflow-hidden p-0 m-0"
    >
      {/* Straight text positioned at the top */}
      <div className="absolute top-12 sm:top-16 lg:top-20 inset-x-0 z-10 w-full px-4 text-center pointer-events-none">
        <div className="grand-fade max-w-4xl mx-auto flex flex-col items-center gap-1 sm:gap-2">
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-neutral-900 drop-shadow-sm">
            A Grand Welcome.
          </h2>
          <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-amber-600 drop-shadow-sm">
            Every single day.
          </p>
        </div>
      </div>

      {/* Edge-to-edge Full Width Image Container */}
      <div className="relative z-0 w-full p-0 m-0 pointer-events-none">
        <img
          src="/images/V1-FORESTIA-MASTER.png"
          alt="M3M Forestia West grand entrance arrival"
          className="w-full h-auto object-contain block m-0 p-0"
        />
      </div>
    </section>
  );
}