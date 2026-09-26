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
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-transparent"
    >
      <div className="grand-fade relative w-full h-full flex items-center justify-center">
        {/* Image poori device ki width aur height legi */}
        <img
          src="/images/forestia-master-bg.webp"
          alt="M3M Forestia West grand entrance arrival"
          width={2400}
          height={1802}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center pointer-events-none block"
          style={{
            filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5))",
          }}
        />

        {/* Agar aur deep 3D feel chahiye toh bottom par ye soft gradient overlay rahega */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}