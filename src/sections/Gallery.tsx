import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "../lib/gsap";
import { GALLERY_IMAGES } from "../lib/content";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (openIndex === null || !overlay.current) return;
    gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % GALLERY_IMAGES.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section id="gallery" ref={root} className="relative py-10 sm:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">GALLERY</p>
          <h2 className="font-display text-3xl sm:text-5xl text-forest-950 leading-tight">
            Curated to Take You <span className="italic text-forest-600">Close to Nature</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[220px]">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpenIndex(i)}
              className={`gallery-item relative overflow-hidden rounded-xl group ${
                i === 0 || i === 5 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 right-3 text-left text-xs sm:text-sm text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div
          ref={overlay}
          className="fixed inset-0 z-100 bg-forest-950/95 backdrop-blur-sm grid place-items-center px-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-cream-50 hover:text-gold-400"
            onClick={() => setOpenIndex(null)}
          >
            <X size={28} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-cream-50 hover:text-gold-400"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % GALLERY_IMAGES.length));
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-cream-50 hover:text-gold-400"
          >
            <ChevronRight size={32} />
          </button>

          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[openIndex].src}
              alt={GALLERY_IMAGES[openIndex].caption}
              className="w-full max-h-[75vh] object-contain rounded-lg"
            />
            <figcaption className="mt-4 text-center text-cream-100/80 text-sm">
              {GALLERY_IMAGES[openIndex].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
