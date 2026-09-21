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
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="arrival" ref={root} className="relative py-10 sm:py-14 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grand-fade text-center">
          <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-tight">
            A Grand Welcome.
          </h2>
          <h2 className="font-display text-3xl sm:text-5xl text-forest-600 leading-tight mt-1">
            Every single day.
          </h2>
        </div>

        <div className="grand-fade mt-8 sm:mt-10 rounded-3xl overflow-hidden">
          <img
            src="/images/FORESTIA-MASTER.jpeg"
            alt="M3M Forestia West grand entrance arrival"
            className="w-full h-[280px] sm:h-[420px] lg:h-[560px] object-cover"
          />
        </div>
      </div>

      {/* Floating leaf accent — same graphic + drift animation as the reference's Grand Welcome section */}
      <div className="hidden sm:block absolute right-[-6%] lg:right-[-85px] top-[30%] w-32 lg:w-40 pointer-events-none z-10">
        <img src="/images/leaf-r.webp" alt="" className="grand-leaf w-full h-auto opacity-90" />
      </div>

      <style>{`
        .grand-leaf {
          animation: grandLeafFloat 4s ease-in-out infinite;
        }
        @keyframes grandLeafFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(7deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
