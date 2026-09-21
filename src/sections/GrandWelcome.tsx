import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "../lib/gsap";

export default function GrandWelcome() {
  const root = useRef<HTMLDivElement>(null);
  const [croppedImgSrc, setCroppedImgSrc] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = "/images/FORESTIA-MASTER.jpeg";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      canvas.width = w;
      canvas.height = h;

      // Exact yellow curve path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, h * 0.81);

      ctx.bezierCurveTo(
        w * 0.90,
        h * 0.82,
        w * 0.82,
        h * 0.83,
        w * 0.76,
        h * 0.87
      );

      ctx.bezierCurveTo(
        w * 0.68,
        h * 0.94,
        w * 0.58,
        h * 0.96,
        w * 0.48,
        h * 0.95
      );

      ctx.bezierCurveTo(
        w * 0.35,
        h * 0.93,
        w * 0.25,
        h * 0.88,
        w * 0.15,
        h * 0.84
      );

      ctx.bezierCurveTo(
        w * 0.08,
        h * 0.82,
        w * 0.04,
        h * 0.80,
        0,
        h * 0.80
      );

      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 0, 0, w, h);

      setCroppedImgSrc(canvas.toDataURL("image/png"));
    };
  }, []);

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
      className="relative overflow-hidden bg-white py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grand-fade text-center">
          <h2 className="font-display text-3xl leading-tight text-forest-950 sm:text-5xl">
            A Grand Welcome.
          </h2>

          <h2 className="mt-1 font-display text-3xl leading-tight text-forest-600 sm:text-5xl">
            Every single day.
          </h2>
        </div>

        <div className="grand-fade mt-8 overflow-hidden sm:mt-10">
          {croppedImgSrc ? (
            <img
              src={croppedImgSrc}
              alt="M3M Forestia West grand entrance arrival"
              draggable={false}
              className="block h-auto w-full select-none object-contain"
            />
          ) : (
            <div className="h-[280px] w-full animate-pulse bg-slate-100 sm:h-[420px] lg:h-[560px]" />
          )}
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