import { useEffect, useState } from "react";
import { Menu, X, Send, CheckCircle2 } from "lucide-react";
import { markEnquirySubmitted } from "../lib/enquiry";

const LINKS = [
  { href: "#location", label: "Location" },
  { href: "#floorplans", label: "Floor Plans" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Enquiry Drawer States
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markEnquirySubmitted();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsEnquiryOpen(false);
      setFormData({ name: "", phone: "", email: "" });
    }, 2500);
  };

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setIsEnquiryOpen(true);
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
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive
                      ? scrolled
                        ? "text-forest-600 font-semibold"
                        : "text-gold-400 font-semibold"
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

      {/* Backdrop Overlay for Slide-over Drawer */}
      {isEnquiryOpen && (
        <div
          onClick={() => setIsEnquiryOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Right Side Slide-Over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white text-forest-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isEnquiryOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-forest-100 bg-forest-50/50">
          <button
            onClick={() => setIsEnquiryOpen(false)}
            className="size-10 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center hover:bg-forest-200 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-display text-2xl text-forest-950">Thank You!</h4>
              <p className="text-sm text-forest-600">
                Our luxury consultant will get in touch with you shortly with exclusive pricing and floor plans.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-display text-2xl text-forest-950">Request Callback</h4>
                <p className="text-sm text-forest-600">
                  Fill in your details below to schedule a site visit or receive the e-brochure.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Submit Enquiry</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-forest-500">
                By submitting, you agree to our terms & conditions and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}