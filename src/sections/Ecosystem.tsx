import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { ECOSYSTEM, CONNECTIVITY, CENTRAL_CONNECTIVITY, ECO_ICON } from "../lib/content";

export default function Ecosystem() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eco-item", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      gsap.from(".connectivity-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 55%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Forestia-Render-3.jpg"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-forest-950/50" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Top 4 Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((item, i) => {
            const Icon = ECO_ICON[i];

            return (
              <div
                key={item.title}
                className="eco-item relative text-center px-6 py-8 lg:py-4 flex flex-col justify-between"
              >
                {/* Vertical divider */}
                {i < ECOSYSTEM.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gold-400/50" />
                )}

                <div>
                  <div className="flex justify-center mb-6">
                    <img
                      src={Icon.image}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="object-contain brightness-0 invert"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-medium text-cream-50 hover:text-gold-400 transition-colors tracking-[0.16em] leading-snug uppercase min-h-[3.5rem] flex items-center justify-center">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-medium text-cream-100/80 leading-relaxed max-w-[230px] mx-auto">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mt-14 sm:mt-16">
          <p className="text-sm sm:text-base font-medium text-cream-50/90 leading-relaxed">
            Located within Gurugram's largest integrated ecosystem,
            Nature's Court offers seamless connectivity without
            compromising calm living.
          </p>
        </div>

        {/* Bottom Connectivity */}
        <div className="mt-12 sm:mt-14">

          {/* IGI / Rewari / Jaipur */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONNECTIVITY.map((item) => (
              <div
                key={item.title}
                className="connectivity-item border border-gold-400/50 px-5 py-4 bg-forest-950/25"
              >
                <p className="text-sm sm:text-base font-medium text-cream-50 hover:text-gold-400 transition-colors">
                  {item.title}
                </p>

                <p className="mt-2 text-sm font-medium text-cream-100/80">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

          {/* KMP + Dwarka Expressway */}
          <div className="mt-5 flex justify-center gap-5 flex-col sm:flex-row">
            {CENTRAL_CONNECTIVITY.map((item) => (
              <div
                key={item.title}
                className="connectivity-item w-full sm:w-56 border border-gold-400/50 px-5 py-4 bg-forest-950/25"
              >
                <p className="text-sm sm:text-base font-medium text-cream-50 hover:text-gold-400 transition-colors">
                  {item.title}
                </p>

                <p className="mt-2 text-sm font-medium text-cream-100/80">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center mt-8">
            <a
              href="#enquiry"
              className="connectivity-item flex items-center justify-center bg-cream-50 text-forest-950 px-7 py-4 text-sm font-medium hover:bg-gold-400 hover:text-forest-950 transition-colors"
            >
              Enquire Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}