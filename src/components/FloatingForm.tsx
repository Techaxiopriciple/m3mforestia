import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { gsap } from "../lib/gsap";
import { markEnquirySubmitted } from "../lib/enquiry";

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

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
      inactivityTimerRef.current = window.setTimeout(() => setIsOpen(true), 4000);
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

  // GSAP animation when the form opens
  useEffect(() => {
    if (isOpen && formRef.current) {
      const isMobile = window.innerWidth < 640;
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20, scale: 0.95 },
        { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Close form when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markEnquirySubmitted();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({ name: "", phone: "", email: "" });
    }, 3500);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-4 left-4 right-4 sm:bottom-auto sm:top-[60%] sm:-translate-y-1/2 sm:left-auto sm:right-8 z-50 pointer-events-none flex justify-center sm:justify-end">
        <div className="w-full max-w-sm pointer-events-none flex justify-center sm:justify-end">
          <div className="pointer-events-auto w-full sm:w-auto">
            {isOpen && (
              <div
                ref={formRef}
                className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto bg-forest-950/98 backdrop-blur-xl border border-gold-400/40 rounded-xl p-5 shadow-2xl text-cream-50 w-full sm:w-[350px]"
              >
                {submitted ? (
                  <div className="py-4 text-center flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 className="text-gold-400 shrink-0" size={30} />
                    <div>
                      <p className="text-sm font-semibold text-cream-50">Thank you!</p>
                      <p className="text-[11px] text-cream-100/70 mt-0.5">We will get in touch shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Header with Close Button properly aligned */}
                    <div className="flex items-start justify-between gap-3 pr-8">
                      <div>
                        <h3 className="font-display text-base text-cream-50 font-medium leading-snug">
                          Request a <span className="italic text-gold-400">Callback</span>
                        </h3>
                        <p className="text-[11px] text-cream-100/70 mt-0.5">
                          Share your details and our senior sales executive will reach out.
                        </p>
                      </div>
                    </div>

                    {/* Absolute Close Button placed safely in the top-right corner with spacing */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close Form"
                      className="absolute top-4 right-4 h-8 w-8 rounded-md bg-forest-900/90 border border-gold-400/20 text-cream-100/70 hover:text-white hover:border-gold-400/40 transition-all flex items-center justify-center cursor-pointer z-10 shadow-sm"
                    >
                      <X size={15} />
                    </button>

                    <div>
                      <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-forest-900/90 border border-gold-400/30 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-forest-900/90 border border-gold-400/30 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                        Email <span className="text-cream-100/40 lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-forest-900/90 border border-gold-400/30 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <button
                      type="submit"
                      aria-label="Enquire Now"
                      className="w-full py-2.5 px-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-[11px] uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
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