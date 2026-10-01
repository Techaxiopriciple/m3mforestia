import { useState, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { markEnquirySubmitted } from "../lib/enquiry";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4wCBlXXQvpEQZjhGdOYr0462N0sVV0Ec-x2HMHBDGewNwN08IGbz0HZgAPy9eBtoy/exec";

interface EnquirePopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function EnquirePopup({ isOpen: externalIsOpen, onClose: externalOnClose }: EnquirePopupProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Auto popup trigger after 3.5 seconds if not controlled externally
  useEffect(() => {
    if (externalIsOpen !== undefined) return;
    
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [externalIsOpen]);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleClose = () => {
    if (externalOnClose) externalOnClose();
    setInternalIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(formData),
      });

      markEnquirySubmitted(); // Unlocks content across the application
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        handleClose();
        setFormData({ name: "", phone: "", email: "" });
      }, 2500);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white border border-forest-100 rounded-3xl shadow-2xl text-forest-950 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 size-10 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 hover:bg-forest-100 transition-all cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="size-16 bg-forest-50 border border-forest-200 rounded-full flex items-center justify-center mx-auto text-forest-900">
              {/* Add check icon if needed */}
            </div>
            <h3 className="font-display text-2xl text-forest-950">Thank You!</h3>
            <p className="text-forest-600 text-sm max-w-xs mx-auto">
              Our luxury property expert will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 space-y-1.5 text-center sm:text-left">
              <h3 className="font-display text-[1.6rem] md:text-[2rem] leading-tight text-forest-950">
                Enquire Now
              </h3>
              <p className="text-forest-600 text-xs sm:text-sm">
                Register your interest to receive detailed pricing, floor plans, and priority invites.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest-800 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-4 py-3 text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:border-forest-900 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-4 py-3 text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:border-forest-900 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-forest-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-forest-50/50 border border-forest-200 rounded-xl px-4 py-3 text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:border-forest-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-forest-950 hover:bg-forest-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-forest-950/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}