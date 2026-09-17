import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { INNOVATION_PARK } from "../lib/content";

interface InnovationItem {
  title: string;
  tagline: string;
  image: string;
}

export default function InnovationPark() {
  const root = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ip-fade", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="innovation-park" ref={root} className="relative py-12 sm:py-20 bg-white overflow-hidden w-full">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="ip-fade text-center font-display text-2xl sm:text-4xl text-forest-950 tracking-tight">
          M3M Innovation Park : A Park For Global Standard Business
        </h2>
      </div>

      {/* Edge-to-Edge Full Width Cards Section */}
      <div className="ip-fade w-full px-0 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-0 sm:gap-3 h-auto lg:h-[480px] w-full">
          {INNOVATION_PARK.map((item: InnovationItem, index: number) => {
            const isActive = activeIndex === index;
            const isFirst = index === 0;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                style={{
                  transitionProperty: "flex-basis, width",
                }}
                className={`relative cursor-pointer overflow-hidden rounded-none sm:rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "lg:flex-[2.8] h-[380px] lg:h-full"
                    : "lg:flex-[1] h-[120px] lg:h-full"
                } h-80 sm:h-96 lg:h-full shadow-lg group`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`absolute inset-0 size-full object-cover transition-transform duration-700 ease-out ${
                    isActive ? "scale-105" : "scale-100 group-hover:scale-102"
                  }`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-forest-950/40 opacity-90 transition-opacity duration-500" />

                {/* Content Layout (Hidden for the first card) */}
                {!isFirst && (
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div>
                      <h3 className="font-display text-lg sm:text-2xl text-cream-50 tracking-wide font-medium leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <div className="overflow-hidden">
                      <div
                        className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0 lg:opacity-0"
                        }`}
                      >
                        <span className="text-xs sm:text-sm text-cream-100/90 tracking-[0.15em] uppercase font-semibold drop-shadow block">
                          {item.tagline}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}