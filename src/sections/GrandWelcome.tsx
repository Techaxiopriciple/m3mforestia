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
      className="relative w-full min-h-[75vh] lg:min-h-[100vh] h-auto overflow-hidden bg-forest-950 flex items-center justify-center"
    >
      {/* Desktop par size pura bada rahega aur image kategi nahi */}
      <img
        src="/images/forestia-master-bg.webp"
        alt="M3M Forestia West grand entrance arrival"
        width={2400}
        height={1802}
        loading="lazy"
        decoding="async"
        className="grand-fade w-full h-auto min-h-full object-cover object-center pointer-events-none"
      />
    </section>
  );
}