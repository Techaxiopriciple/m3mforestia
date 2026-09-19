import { useState, useEffect } from "react";
import { X, Sparkles, Send } from "lucide-react";

interface EnquirePopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function EnquirePopup({ isOpen: externalIsOpen, onClose: externalOnClose }: EnquirePopupProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white border border-forest-100 rounded-3xl shadow-2xl overflow-hidden text-forest-950 p-6 sm:p-8"
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
              <Sparkles size={32} />
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
              <div className="inline-flex items-center gap-1.5 text-forest-900 text-xs uppercase tracking-widest font-semibold bg-forest-50 px-3 py-1 rounded-full border border-forest-200 mb-1">
                <Sparkles size={12} /> Exclusive Invitation
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-forest-950">
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
                className="w-full mt-2 bg-forest-950 hover:bg-forest-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-forest-950/20 cursor-pointer"
              >
                <span>Submit Enquiry</span>
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}