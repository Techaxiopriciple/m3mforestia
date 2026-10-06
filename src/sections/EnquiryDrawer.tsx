import { useState } from "react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitLeadToSFDC } from "../lib/sfdcService";
import { markEnquirySubmitted } from "../lib/enquiry";

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = { name: "", phone: "", email: "", company: "" };

// Reads attribution params from the current URL at submit time.
function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    agency: params.get("agency") ?? "", // service falls back to SFDC_CONFIG.agencyName
  };
}

export default function EnquiryDrawer({ isOpen, onClose }: EnquiryDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    const response = await submitLeadToSFDC({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      budget: "",
      location: "",
      ...getTrackingParams(),
      company: formData.company,
    });

    setLoading(false);

    if (!response.success) {
      setError("Something went wrong. Please check your connection and try again.");
      return;
    }

    markEnquirySubmitted();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData(EMPTY_FORM);
    }, 2500);
  };

  return (
    <>
      {/* Backdrop Overlay for Slide-over Drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Right Side Slide-Over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white text-forest-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-forest-100 bg-forest-50/50">
          <span className="font-display text-lg text-forest-950">Quick Enquiry</span>
          <button
            onClick={onClose}
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
                <h4 className="font-display text-[1.6rem] md:text-[2rem] leading-tight text-forest-950">Request Callback</h4>
                <p className="text-sm text-forest-600">
                  Fill in your details below to schedule a site visit or receive the e-brochure.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5">
                    Email Address <span className="text-xs font-normal text-forest-500">(Recommended)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-forest-200 bg-forest-50/30 text-forest-950 focus:outline-none focus:border-forest-600 transition-colors"
                  />
                </div>

                {/* Honeypot: hidden from people and screen readers; bots that fill it get rejected server-side */}
                <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                  <label>
                    Company
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
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