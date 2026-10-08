import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import EnquiryDrawer from "../sections/EnquiryDrawer";

const LINKS = [
  { href: "#location", label: "Location" },
  { href: "#floorplans", label: "Floor Plans" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
];

interface NavProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export default function Nav({ isDrawerOpen, setIsDrawerOpen }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll for navbar hide/show, background style, and Hero section reset
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

      // If the user is on the hero section (near the top), clear the active section
      if (currentScrollY < 150) {
        setActiveSection("");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
        setOpen(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track active section using IntersectionObserver for highlighting menu items
  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only trigger the intersection update when the page isn't at the top
            if (entry.isIntersecting && window.scrollY >= 150) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { threshold: 0.4 } // Increased threshold so it triggers only when well into the section
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-white/95 shadow-lg shadow-forest-950/10 backdrop-blur-md"
            : "bg-forest-950/35 backdrop-blur-[2px]"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <img
            src={scrolled ? "/images/logo/m3m-logo.png" : "/images/logo/logo.webp"}
            alt="M3M Forestia"
            className="h-12 sm:h-14 w-auto object-contain transition-all"
          />

          <div className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative eyebrow transition-colors py-1 ${
                    isActive
                      ? scrolled
                        ? "text-forest-600"
                        : "text-gold-400"
                      : scrolled
                      ? "text-forest-900 hover:text-forest-600"
                      : "text-cream-50 hover:text-gold-400"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 rounded-full animate-pulse" />
                  )}
                </a>
              );
            })}
            <a
              href="#enquiry"
              onClick={handleOpenEnquiry}
              className="rounded-full bg-gold-500 px-5 py-2 text-sm font-bold text-forest-950 shadow-sm cursor-pointer hover:bg-gold-400 transition-colors"
            >
              Enquire Now
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            className={scrolled ? "lg:hidden text-forest-900" : "lg:hidden text-cream-50"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden bg-white border-t border-forest-100 px-5 pb-6 flex flex-col gap-4 shadow-lg shadow-forest-950/10">
            {LINKS.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 border-b border-forest-100 text-sm flex items-center justify-between ${
                    isActive ? "text-forest-600 font-semibold pl-2 bg-forest-50/50 rounded" : "text-forest-900"
                  }`}
                >
                  <span>{l.label}</span>
                  {isActive && <span className="size-2 rounded-full bg-gold-500 mr-2" />}
                </a>
              );
            })}
            <a
              href="#enquiry"
              onClick={handleOpenEnquiry}
              className="mt-2 rounded-full bg-gold-500 px-5 py-3 text-center text-sm text-forest-950 font-bold shadow-sm cursor-pointer"
            >
              Enquire Now
            </a>
          </div>
        )}
      </header>

      <EnquiryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}