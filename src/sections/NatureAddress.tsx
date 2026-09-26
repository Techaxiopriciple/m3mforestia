import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "../lib/gsap";
import { CheckCircle2, Leaf } from "lucide-react";

const features = [
  {
    label: "Skywalk",
    image: "/images/overbridge-cam.webp",
    position: "center",
    category: "Health & Wellness",
    items: ["Pilates Studio", "Jogging Track", "Spa & Sauna", "Yoga Decks", "Outdoor Gym and many more..."],
  },
  {
    label: "Nature's Den",
    image: "/images/landscape-top.webp",
    position: "center",
    category: "Nature Living",
    items: ["Forest Trail", "Eco Pond", "Reflexology Garden", "Organic Farm", "Lantern Garden and many more..."],
  },
  {
    label: "Water Park",
    image: "/images/central-grove-bg.webp",
    position: "center 35%",
    category: "Lifestyle & Sports",
    items: ["Kids Play Area", "Bowling Alley", "Mini Golf", "Cricket Net", "Lawn Tennis and many more..."],
  },
];

export default function NatureAddress() {
  const root = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);
  const [active, setActive] = useState(0);

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

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const tween = gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = features.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const feature = features[active];

  return (
    <section id="central-grove" ref={root} className="relative bg-white py-10 text-forest-950 lg:py-14 overflow-hidden">
      
      {/* Lower Left Decorative Leaf */}
      <div className="absolute -left-8 sm:left-[-27%] lg:left-[-85px] bottom-[5%] sm:bottom-[10%] lg:bottom-[8%] w-28 sm:w-36 lg:w-40 pointer-events-none z-10 scale-x-[-1]">
        <img
          src="/images/leaf-r.webp"
          alt=""
          width={129}
          height={128}
          loading="lazy"
          className="eco-leaf w-full h-auto opacity-75 sm:opacity-90"
        />
      </div>

      {/* Upper Right Decorative Leaf */}
      <div className="absolute -right-8 sm:right-[-27%] lg:right-[-85px] top-[5%] sm:top-[10%] lg:top-[8%] w-28 sm:w-36 lg:w-40 pointer-events-none z-10">
        <img
          src="/images/leaf-r.webp"
          alt=""
          width={129}
          height={128}
          loading="lazy"
          className="eco-leaf w-full h-auto opacity-75 sm:opacity-90"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-20">
        
        {/* Heading & Subheading */}
        <div className="nature-fade mx-auto max-w-3xl text-center">
          <h5 className="font-display text-2xl uppercase leading-[1.2] text-forest-950 sm:text-4xl">
            An Extravagant Club Lifestyle
          </h5>
          <p className="mt-2 text-xs uppercase tracking-widest text-forest-700 sm:text-sm">
            A Thoughtfully Curated Clubhouse, Contemporary In Design and Rich In Experiences
          </p>
        </div>

        <div className="nature-fade relative mt-6 overflow-hidden sm:mt-8 rounded-3xl shadow-lg">
          <img
            src="/images/sanctuary-pool.webp"
            alt="Resort-style pool and clubhouse at M3M Forestia"
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
          <span className="absolute bottom-3 right-3 text-[9px] tracking-wider text-white/80 bg-forest-950/40 px-2 py-1 rounded">Artistic impression</span>
        </div>

        <div className="nature-fade mt-10 flex items-center gap-4 sm:mt-12 sm:gap-6">
          <span className="h-px flex-1 bg-gold-400/60" />
          <p className="text-center text-[10px] tracking-[0.25em] text-forest-950 sm:text-[11px] font-bold">EXPERIENCE CENTRAL GROVE AT GIC</p>
          <span className="h-px flex-1 bg-gold-400/60" />
        </div>

        <div className="nature-fade mt-8">
          {/* Rounded Tabs with Leaf Icons */}
          <div
            role="tablist"
            aria-label="Central Grove features"
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {features.map((f, i) => {
              const selected = i === active;
              return (
                <button
                  key={f.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`grove-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="grove-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onTabKeyDown}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border shadow-sm cursor-pointer ${
                    selected
                      ? "bg-forest-950 text-gold-400 border-forest-950 shadow-md scale-105"
                      : "bg-forest-50/80 text-forest-950 border-forest-200 hover:bg-forest-100"
                  }`}
                >
                  <Leaf size={14} className={selected ? "text-gold-400" : "text-[#a37e38]"} />
                  {f.category}
                </button>
              );
            })}
          </div>

          {/* Panel Layout with Image on Right and Items in Chips */}
          <div
            ref={panelRef}
            key={active}
            role="tabpanel"
            id="grove-panel"
            aria-labelledby={`grove-tab-${active}`}
            className="mx-auto mt-8 max-w-5xl bg-forest-50/40 p-6 sm:p-8 rounded-3xl border border-forest-200 shadow-xl grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Left Side: Items Chips */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2.5">
                {feature.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 bg-white text-forest-950 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl border border-forest-200/80 shadow-sm"
                  >
                    <CheckCircle2 size={14} className="text-[#a37e38] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Image View */}
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <img
                src={feature.image}
                alt={feature.label}
                loading="lazy"
                style={{ objectPosition: feature.position }}
                className="block aspect-[16/10] w-full object-cover"
              />
              <span className="absolute bottom-2 right-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white drop-shadow bg-forest-950/60 px-2.5 py-0.5 rounded">
                {feature.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}