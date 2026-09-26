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
      className="relative w-full bg-white flex flex-col items-center overflow-hidden py-12 px-4 md:px-8 m-0"
    >
      {/* Prominent 3D Perspective Container */}
      <div className="grand-fade relative z-0 w-full max-w-7xl mx-auto pointer-events-none perspective-[1400px]">
        
        {/* 3D Tilt and Depth Wrapper */}
        <div 
          className="relative w-full transform-gpu transition-transform duration-700 hover:rotate-x-1"
          style={{
            transform: "rotateX(4deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3D Card Frame with Deep Shadow & Border */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)] border-2 border-white/80 bg-white">
            <img
              src="/images/forestia-master-sharp.webp"
              alt="M3M Forestia West grand entrance arrival"
              width={2400}
              height={1802}
              className="w-full h-auto object-contain block m-0 p-0"
            />
          </div>
        </div>

      </div>
    </section>
  );
}