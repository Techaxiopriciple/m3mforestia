import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });

      tl.from(".preloader-word", {
        yPercent: 110,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          ".preloader-word",
          {
            yPercent: -110,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.in",
          },
          "+=0.3"
        )
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-100 bg-white grid place-items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url(/images/logo-hero.webp)] bg-cover bg-center opacity-25" />

      <div className="relative overflow-hidden">
        {/* Source PNG is a white cutout (for dark backgrounds) — recolored green here via a mask so it reads on the white preloader */}
        <div
          className="preloader-word w-64 sm:w-80 lg:w-96 aspect-[2511/780] bg-forest-600"
          style={{
            WebkitMaskImage: "url(/images/logo/forestia-logo_new_1.png)",
            maskImage: "url(/images/logo/forestia-logo_new_1.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
