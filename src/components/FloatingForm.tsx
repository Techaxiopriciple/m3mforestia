import { useState, useEffect, useRef } from "react";
import { Phone, X, Send, CheckCircle2 } from "lucide-react";
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
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Form Box with GSAP Animation Support */}
      {isOpen && (
        <div
          ref={formRef}
          className="mb-4 w-80 sm:w-96 bg-forest-950/95 backdrop-blur-xl border border-gold-400/30 rounded-2xl p-5 shadow-2xl text-cream-50"
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gold-400/20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
                <Phone size={16} />
              </div>
              <h4 className="font-display text-sm font-semibold tracking-wider uppercase text-gold-400">
                Request a Callback
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Form"
              className="text-cream-100/70 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="text-gold-400" size={36} />
              <p className="text-sm font-medium text-cream-50">Thank you!</p>
              <p className="text-xs text-cream-100/70">We will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Floating Phone Icon Button with Pulsing Effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Callback Form"
        className="relative group size-14 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {/* Pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-25 pointer-events-none" />
        
        <Phone size={22} className="transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}