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
      {/* Top padding with an even deeper downward curve */}
      <div className="absolute top-16 sm:top-24 lg:top-32 inset-x-0 z-10 w-full px-2 text-center pointer-events-none">
        <div className="grand-fade max-w-5xl mx-auto">
          <svg viewBox="0 0 900 240" className="w-full h-auto overflow-visible">
            {/* Aur zyada deep curve paths */}
            <path
              id="curvePath1"
              d="M 40,10 Q 450,160 860,10"
              fill="transparent"
            />
            <path
              id="curvePath2"
              d="M 80,60 Q 450,210 820,60"
              fill="transparent"
            />
            
            <text className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl fill-neutral-900 drop-shadow-sm">
              <textPath href="#curvePath1" startOffset="50%" textAnchor="middle">
                A Grand Welcome.
              </textPath>
            </text>

            <text className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl fill-amber-600 drop-shadow-sm">
              <textPath href="#curvePath2" startOffset="50%" textAnchor="middle">
                Every single day.
              </textPath>
            </text>
          </svg>
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

      {/* Floating Leaf */}
      <div className="pointer-events-none absolute right-0 top-[30%] z-20 hidden w-28 sm:block sm:w-36 lg:w-40">
        <img
          src="/images/leaf-r.webp"
          alt=""
          className="grand-leaf h-auto w-full opacity-90"
        />
      </div>

      <style>{`
        .grand-leaf {
          animation: grandLeafFloat 4s ease-in-out infinite;
        }

        @keyframes grandLeafFloat {
          0% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-22px) rotate(7deg);
          }

          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
    </section>
  );
}