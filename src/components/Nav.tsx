import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#story", label: "The Project" },
  { href: "#location", label: "Location" },
  { href: "#residences", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-forest-950/90 backdrop-blur-sm shadow-lg shadow-black/20"
          : "bg-forest-950/45 backdrop-blur-[2px]"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
        <img
          src="/images/logo/logo.webp"
          alt="M3M Forestia"
          className="h-12 sm:h-14 w-auto object-contain"
        />

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cream-50 hover:text-gold-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#enquiry"
            className="rounded-full border border-gold-500 px-5 py-2 text-sm text-gold-400 hover:bg-gold-500 hover:text-forest-950 transition-colors"
          >
            Enquire Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-cream-50"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-forest-950/98 border-t border-forest-700 px-5 pb-6 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream-100/90 py-2 border-b border-forest-800 text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-gold-500 px-5 py-3 text-center text-sm text-gold-400"
          >
            Enquire Now
          </a>
        </div>
      )}
    </header>
  );
}
