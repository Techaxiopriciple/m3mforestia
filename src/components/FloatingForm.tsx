import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { gsap } from "../lib/gsap";

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const formRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<number | null>(null);

  // Automatically expand the callback form after 4 seconds of site inactivity.
  useEffect(() => {
    const clearInactivityTimer = () => {
      if (inactivityTimerRef.current !== null) {
        window.clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };

    const resetInactivityTimer = () => {
      clearInactivityTimer();

      if (isOpen || submitted) return;

      inactivityTimerRef.current = window.setTimeout(() => {
        setIsOpen(true);
      }, 4000);
    };

    const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer, { passive: true });
    });

    resetInactivityTimer();

    return () => {
      clearInactivityTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer);
      });
    };
  }, [isOpen, submitted]);

  // GSAP animation when the form opens or closes
  useEffect(() => {
    if (isOpen && formRef.current) {
      const isMobile = window.innerWidth < 640;
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: isMobile ? 30 : 0, x: isMobile ? 0 : 20, scale: 0.95 },
        { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Automatically close form when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Handle form submission logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);

    // Reset and close form after 4 seconds on successful submission
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({ name: "", phone: "" });
    }, 4000);
  };

  return (
    <>
      {/* Mobile Backdrop / Shadow to separate form cleanly from content */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Container: Centered on Mobile, Right-aligned with margin on Desktop */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 pointer-events-none flex justify-center sm:justify-end">
        <div className="w-full max-w-xl sm:pr-16 md:pr-24 pointer-events-none flex justify-center sm:justify-end">
          <div className="pointer-events-auto w-full sm:w-auto">
            {/* Expanded Form Box */}
            {isOpen && (
              <div
                ref={formRef}
                className="relative bg-forest-950/98 backdrop-blur-2xl border border-gold-400/40 rounded-2xl p-4 sm:p-3.5 shadow-2xl text-cream-50 w-full sm:w-auto max-w-md sm:max-w-xl pr-9 sm:pr-8"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Form"
                  className="absolute top-3 right-3 sm:top-2 sm:right-2 h-6 w-6 sm:h-4 sm:w-4 rounded-md bg-forest-900/80 border border-gold-400/20 text-cream-100/70 hover:text-white hover:border-gold-400/40 transition-all flex items-center justify-center cursor-pointer shrink-0 z-10"
                >
                  <X size={14} className="sm:hidden" />
                  <X size={10} className="hidden sm:block" />
                </button>

                {submitted ? (
                  <div className="py-2 sm:py-1 text-center flex items-center gap-2.5">
                    <CheckCircle2 className="text-gold-400 shrink-0" size={22} />
                    <div className="text-left">
                      <p className="text-xs font-medium text-cream-50">Thank you!</p>
                      <p className="text-[10px] text-cream-100/70">We will get in touch shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-2 pt-1 sm:pt-0.5">
                    {/* Name Input */}
                    <div className="w-full sm:w-36 md:w-44">
                      <label className="block text-[11px] sm:text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-forest-900/90 border border-gold-400/30 text-sm sm:text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="w-full sm:w-36 md:w-44">
                      <label className="block text-[11px] sm:text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-forest-900/90 border border-gold-400/30 text-sm sm:text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    {/* Enquire Now Button */}
                    <button
                      type="submit"
                      aria-label="Enquire Now"
                      className="w-full sm:w-auto py-3 sm:py-1.5 px-4 h-11 sm:h-[30px] rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 mt-1 sm:mt-0"
                    >
                      <Sparkles size={13} className="text-forest-950" />
                      <span>Enquire Now</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}