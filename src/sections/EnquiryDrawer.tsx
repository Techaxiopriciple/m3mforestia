import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useLeadForm } from "../lib/useLeadForm";
import { Honeypot, FieldError, BudgetSelect } from "../components/LeadFormParts";

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass = (invalid: boolean) =>
  `w-full px-4 py-3 rounded-xl border bg-forest-50/30 text-forest-950 focus:outline-none transition-colors ${
    invalid ? "border-red-500 focus:border-red-600" : "border-forest-200 focus:border-forest-600"
  }`;

export default function EnquiryDrawer({ isOpen, onClose }: EnquiryDrawerProps) {
  const lead = useLeadForm((reset) => {
    setTimeout(() => {
      onClose();
      reset();
    }, 2500);
  });
  const { errors, submitting, submitted, submitError } = lead;

  return (
    <>
      {/* Backdrop Overlay for Slide-over Drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Right Side Slide-Over Drawer Panel; inert while closed so its fields are out of the tab order */}
      <div
        inert={!isOpen}
        className={`fixed top-0 right-0 h-dvh w-full sm:w-[420px] bg-white text-forest-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
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
            <div role="status" className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-display text-2xl text-forest-950">Thank You!</h4>
              <p className="text-sm text-forest-600">
                Our luxury consultant will get in touch with you shortly with exclusive pricing and floor plans.
              </p>
            </div>
          ) : (
            <form onSubmit={lead.handleSubmit} noValidate className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-display text-[1.6rem] md:text-[2rem] leading-tight text-forest-950">Request Callback</h4>
                <p className="text-sm text-forest-600">
                  Share your details and our senior sales executive will reach out.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={lead.fieldId("name")}
                    className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    {...lead.fieldProps("name")}
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    className={inputClass(!!errors.name)}
                  />
                  <FieldError id={lead.errorId("name")} message={errors.name} />
                </div>

                <div>
                  <label
                    htmlFor={lead.fieldId("phone")}
                    className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5"
                  >
                    Phone Number *
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
                  <label
                    htmlFor={lead.fieldId("email")}
                    className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5"
                  >
                    Email Address <span className="text-xs font-normal text-forest-500">(Recommended)</span>
                  </label>
                  <input
                    {...lead.fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    className={inputClass(!!errors.email)}
                  />
                  <FieldError id={lead.errorId("email")} message={errors.email} />
                </div>

                <div>
                  <label
                    htmlFor={lead.fieldId("budget")}
                    className="block text-xs font-semibold uppercase tracking-wider text-forest-700 mb-1.5"
                  >
                    What is your preferred budget range? *
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
              </div>

              {submitError && (
                <p role="alert" className="text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-forest-900 text-white font-medium hover:bg-forest-800 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
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
            </form>
          )}
        </div>
      </div>
    </>
  );
}
