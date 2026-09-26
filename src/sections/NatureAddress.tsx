import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const features = [
  {
    label: "Skywalk",
    image: "/images/overbridge-cam.webp",
    position: "center",
    category: "Health & Wellness",
    items: "Pilates Studio | Jogging Track | Spa & Sauna | Yoga Decks | Outdoor Gym and many more...",
  },
  {
    label: "Nature's Den",
    image: "/images/landscape-top.webp",
    position: "center",
    category: "Nature Living",
    items: "Forest Trail | Eco Pond | Reflexology Garden | Organic Farm | Lantern Garden and many more...",
  },
  {
    label: "Water Park",
    image: "/images/central-grove-bg.webp",
    position: "center 35%",
    category: "Lifestyle & Sports",
    items: "Kids Play Area | Bowling Alley | Mini Golf | Cricket Net | Lawn Tennis and many more...",
  },
];

export default function NatureAddress() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nature-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="central-grove" ref={root} className="relative bg-white py-10 text-forest-950 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Updated Heading & Subheading */}
        <div className="nature-fade mx-auto max-w-3xl text-center">
          <h5 className="font-display text-2xl uppercase leading-[1.2] text-forest-950 sm:text-4xl">
            An Extravagant Club Lifestyle
          </h5>
          <p className="mt-2 text-xs uppercase tracking-widest text-forest-700 sm:text-sm">
            A Thoughtfully Curated Clubhouse, Contemporary In Design and Rich In Experiences
          </p>
        </div>

        <div className="nature-fade relative mt-6 overflow-hidden sm:mt-8">
          <img
            src="/images/sanctuary-pool.webp"
            alt="Resort-style pool and clubhouse at M3M Forestia"
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
          <span className="absolute bottom-3 right-3 text-[9px] tracking-wider text-white/80">Artistic impression</span>
        </div>

        <div className="nature-fade mt-10 flex items-center gap-4 sm:mt-12 sm:gap-6">
          <span className="h-px flex-1 bg-gold-400/60" />
          <p className="text-center text-[10px] tracking-[0.25em] text-forest-950 sm:text-[11px]">EXPERIENCE CENTRAL GROVE AT GIC</p>
          <span className="h-px flex-1 bg-gold-400/60" />
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {features.map((f) => (
            <div key={f.label} className="nature-fade">
              <div className="relative overflow-hidden">
                <img
                  src={f.image}
                  alt={f.label}
                  loading="lazy"
                  style={{ objectPosition: f.position }}
                  className="block aspect-[16/10] w-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[8px] text-white/80">Artistic impression</span>
                <span className="absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white drop-shadow">
                  {f.label}
                </span>
              </div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-forest-950">{f.category}</p>
              <p className="mt-1 text-[9px] uppercase leading-relaxed tracking-wide text-forest-700">{f.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}