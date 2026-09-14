import { useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { PRICE } from "../lib/content";
import EnquiryForm from "../components/EnquiryForm";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-bg", { scale: 1.15, duration: 1.8, ease: "power2.out" }, 0)
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 }, 0.3)
        .from(".hero-title-line", { yPercent: 120, stagger: 0.12, duration: 1 }, 0.45)
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, 0.9)
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 1.05)
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, 1.4);
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="top"
      ref={root}
      className={`relative min-h-dvh w-full overflow-hidden py-28 lg:py-0 ${
        ready ? "" : "invisible"
      }`}
    >
      <div
        className="hero-bg absolute inset-0 bg-[url(/images/hero-main.webp)] bg-cover bg-center"
        style={{ willChange: "transform" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/40" />

      <div className="relative z-10 min-h-dvh max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-0 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <span className="hero-eyebrow inline-block w-fit text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-5">
            GURGAON INTERNATIONAL CITY
          </span>

          <h1 className="font-display text-cream-50 text-[13vw] leading-[1.25] sm:text-7xl md:text-8xl lg:text-[5.5rem]">
            <span className="block overflow-hidden pb-[0.3em]">
              <span className="hero-title-line block">A Life Curated</span>
            </span>
            <span className="block overflow-hidden pb-[0.3em] -mt-[0.3em]">
              <span className="hero-title-line block italic text-gold-400">
                by Nature
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-cream-100/80 text-base sm:text-lg leading-relaxed">
            Forest-themed 3 BHK residences at the heart of GIC — where architecture,
            landscape, and lifestyle flow as one.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#residences"
              className="text-cream-50/90 text-sm tracking-wide underline underline-offset-4 decoration-cream-100/40 hover:text-gold-400 hover:decoration-gold-400 transition-colors"
            >
              Explore Residences
            </a>

            <span className="text-cream-50/90 text-sm tracking-wide border-l border-cream-100/30 pl-5">
              {PRICE.starting}
            </span>
          </div>
        </div>

        <EnquiryForm
          compact
          title="Get Callback & Floor Plans"
          className="hero-cta rounded-3xl border border-cream-100/15 bg-forest-950/60 backdrop-blur-md p-6 sm:p-8"
        />
      </div>

      <div className="hero-scroll absolute bottom-8 inset-x-0 hidden lg:flex flex-col items-center gap-2 text-cream-100/70 text-xs tracking-[0.3em]">
        <span>SCROLL</span>
        <ChevronDown className="animate-bounce" size={18} />
      </div>
    </section>
  );
}
