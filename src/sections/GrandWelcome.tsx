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
      className="relative flex min-h-[380px] items-center overflow-hidden py-16 sm:min-h-[520px] sm:py-20 lg:min-h-[640px]"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/grand-welcome-bg-mob.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover object-center sm:hidden"
        />
        <img
          src="/images/grand-welcome-bg-desktop.webp"
          alt="M3M Forestia West grand entrance arrival"
          loading="lazy"
          decoding="async"
          className="hidden h-full w-full object-cover object-center sm:block"
        />
        <div className="absolute inset-0 bg-forest-950/45" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grand-fade text-center">
          <h2 className="font-display text-3xl leading-tight text-cream-50 sm:text-5xl">
            A Grand Welcome.
          </h2>

          <h2 className="mt-1 font-display text-3xl leading-tight text-gold-400 sm:text-5xl">
            Every single day.
          </h2>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-6%] top-[30%] z-10 hidden w-32 sm:block lg:right-[-85px] lg:w-40">
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