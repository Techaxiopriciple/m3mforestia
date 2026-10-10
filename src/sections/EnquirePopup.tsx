import { useState, useEffect } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useLeadForm } from "../lib/useLeadForm";
import { Honeypot, FieldError, BudgetSelect } from "../components/LeadFormParts";

interface EnquirePopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const inputClass = (invalid: boolean) =>
  `w-full bg-forest-50/50 border rounded-xl px-4 py-3 text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:bg-white transition-all ${
    invalid ? "border-red-500 focus:border-red-600" : "border-forest-200 focus:border-forest-900"
  }`;

export default function EnquirePopup({ isOpen: externalIsOpen, onClose: externalOnClose }: EnquirePopupProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

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

  const lead = useLeadForm((reset) => {
    setTimeout(() => {
      handleClose();
      reset();
    }, 2500);
  });
  const { errors, submitting, submitted, submitError } = lead;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enquire now"
        className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-white border border-forest-100 rounded-3xl shadow-2xl text-forest-950 p-6 sm:p-8"
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
          <div role="status" className="py-12 text-center space-y-4">
            <div className="size-16 bg-forest-50 border border-forest-200 rounded-full flex items-center justify-center mx-auto text-forest-900">
              <CheckCircle2 size={32} />
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
                Share your details and our senior sales executive will reach out.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={lead.handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor={lead.fieldId("name")} className="block text-xs font-semibold text-forest-800 mb-1">
                  Full Name
                </label>
                <input
                  {...lead.fieldProps("name")}
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={inputClass(!!errors.name)}
                />
                <FieldError id={lead.errorId("name")} message={errors.name} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={lead.fieldId("phone")} className="block text-xs font-semibold text-forest-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...lead.fieldProps("phone")}
                    type="tel"
                    required
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="+91 98765 43210"
                    className={inputClass(!!errors.phone)}
                  />
                  <FieldError id={lead.errorId("phone")} message={errors.phone} />
                </div>
                <div>
                  <label htmlFor={lead.fieldId("email")} className="block text-xs font-semibold text-forest-800 mb-1">
                    Email Address <span className="font-normal text-forest-500">(optional)</span>
                  </label>
                  <input
                    {...lead.fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className={inputClass(!!errors.email)}
                  />
                  <FieldError id={lead.errorId("email")} message={errors.email} />
                </div>
              </div>

              <div>
                <label htmlFor={lead.fieldId("budget")} className="block text-xs font-semibold text-forest-800 mb-1">
                  What is your preferred budget range?
                </label>
                <BudgetSelect
                  {...lead.fieldProps("budget")}
                  required
                  className={inputClass(!!errors.budget)}
                  iconClassName="text-forest-600"
                />
                <FieldError id={lead.errorId("budget")} message={errors.budget} />
              </div>

              <Honeypot value={lead.values.company} onChange={(v) => lead.setField("company", v)} />

              {submitError && (
                <p role="alert" className="text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-forest-950 hover:bg-forest-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-forest-950/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
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
