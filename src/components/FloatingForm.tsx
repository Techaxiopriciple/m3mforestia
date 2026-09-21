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
    <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center">
      {/* Website ke standard container ke sath exact align karne ke liye wrapper */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none flex justify-start">
        <div className="pointer-events-auto flex items-center gap-3 flex-row-reverse">
          {/* Expanded Form Box positioned to the right of the button */}
          {isOpen && (
            <div
              ref={formRef}
              className="bg-forest-950/95 backdrop-blur-xl border border-gold-400/30 rounded-2xl p-4 shadow-2xl text-cream-50 w-auto max-w-xl"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gold-400/20 gap-6">
                <h4 className="font-display text-xs font-semibold tracking-wider uppercase text-gold-400">
                  Request a Callback
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Form"
                  className="text-cream-100/70 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {submitted ? (
                <div className="py-2 px-4 text-center flex items-center justify-center gap-3">
                  <CheckCircle2 className="text-gold-400 shrink-0" size={24} />
                  <div className="text-left">
                    <p className="text-xs font-medium text-cream-50">Thank you!</p>
                    <p className="text-[11px] text-cream-100/70">We will get in touch shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-end gap-2.5">
                  {/* Name Input */}
                  <div className="w-36 sm:w-44">
                    <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="w-36 sm:w-44">
                    <label className="block text-[10px] font-medium text-cream-100/80 mb-1 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-forest-900/80 border border-gold-400/20 text-xs text-cream-50 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    aria-label="Submit Form"
                    className="py-2 px-3.5 h-[34px] rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 self-end"
                  >
                    <span>Submit</span>
                    <Send size={13} />
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