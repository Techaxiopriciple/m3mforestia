import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });
      // Kept short — this is a branded flourish, not a real loading gate. It used to
      // run ~2.7s fixed regardless of asset state, which read as slow page load.
      tl.from(".preloader-word", {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(".preloader-word", { yPercent: -110, stagger: 0.05, duration: 0.35, ease: "power3.in" }, "+=0.15")
        .to(root.current, { yPercent: -100, duration: 0.5, ease: "power4.inOut" }, "-=0.15");
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-100 bg-forest-950 grid place-items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url(/images/logo-hero.webp)] bg-cover bg-center opacity-25" />
      <div className="relative overflow-hidden">
        <span className="preloader-word block font-display text-cream-50 text-4xl sm:text-6xl tracking-[0.2em]">
          FORESTIA
        </span>
      </div>
    </div>
  );
}
