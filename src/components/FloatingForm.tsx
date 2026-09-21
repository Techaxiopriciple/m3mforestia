import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "../lib/gsap";

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const formRef = useRef<HTMLDivElement>(null);

  // Automatically expand the callback form after 6 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // GSAP animation when the form opens or closes
  useEffect(() => {
    if (isOpen && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -20, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Automatically close form when user scrolls or clicks scroll button
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
    <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none flex justify-center">
      {/* Hero section ke exact max-w-7xl aur px-3 sm:px-6 padding ke sath perfectly match kiya gaya wrapper */}
      <div className="w-full max-w-7xl px-3 sm:px-6 pointer-events-none flex justify-start">
        <div className="pointer-events-auto flex items-end sm:items-center gap-3 flex-row-reverse w-full sm:w-auto">
          {/* Expanded Form Box */}
          {isOpen && (
            <div
              ref={formRef}
              className="relative bg-forest-950/95 backdrop-blur-xl border border-gold-400/30 rounded-2xl p-3 sm:p-3.5 shadow-2xl text-cream-50 w-full sm:w-auto max-w-xl pr-7 sm:pr-8"
            >
              {/* Perfectly sized & aligned close button inside bounds */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Form"
                className="absolute top-2 right-2 h-4 w-4 rounded-md bg-forest-900/60 border border-gold-400/20 text-cream-100/60 hover:text-white hover:border-gold-400/40 transition-all flex items-center justify-center cursor-pointer shrink-0 z-10"
              >
                <X size={10} />
              </button>

              {submitted ? (
                <div className="py-1 text-center flex items-center gap-2">
                  <CheckCircle2 className="text-gold-400 shrink-0" size={20} />
                  <div className="text-left">
                    <p className="text-xs font-medium text-cream-50">Thank you!</p>
                    <p className="text-[10px] text-cream-100/70">We will get in touch shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 pt-0.5">
                  {/* Name Input */}
                  <div className="w-full sm:w-36 md:w-44">
                    <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="w-full sm:w-36 md:w-44">
                    <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    aria-label="Submit Form"
                    className="w-full sm:w-auto py-2 sm:py-1.5 px-4 h-[34px] sm:h-[30px] rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 mt-1 sm:mt-0"
                  >
                    <span>Submit</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}