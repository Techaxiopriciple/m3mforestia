import { useState, useRef } from "react";
import { X, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "../lib/gsap"; // gsap import from this project

export default function EnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openDrawer = () => {
    setIsOpen(true);
    // GSAP animation for smooth slide in
    setTimeout(() => {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, display: "block" });
      gsap.to(drawerRef.current, { x: "0%", duration: 0.4, ease: "power3.out" });
    }, 10);
  };

  const closeDrawer = () => {
    // GSAP animation for smooth slide out
    gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
    gsap.to(backdropRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      onComplete: () => setIsOpen(false) 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({ name: "", phone: "", email: "" });
    }, 2500);
  };

  return (
    <>
      {/* 1. Trigger Button */}
      <button
        onClick={openDrawer}
        className="px-6 py-3 rounded-full bg-forest-900 text-white font-medium hover:bg-forest-800 transition-all shadow-lg cursor-pointer flex items-center gap-2"
      >
        <Sparkles size={16} className="text-gold-300" />
        <span>Enquire Now</span>
      </button>

      {/* 2. Backdrop Overlay (Controlled by GSAP) */}
      <div
        ref={backdropRef}
        onClick={closeDrawer}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* 3. Sliding Drawer Panel (Controlled by GSAP) */}
      <div
        ref={drawerRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white text-forest-950 shadow-2xl z-50 flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-forest-100 bg-forest-50/50">
          <button
            onClick={closeDrawer}
            className="size-10 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center hover:bg-forest-200 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body / Form Content */}
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