import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useLeadForm } from "../lib/useLeadForm";
import { Honeypot, FieldError, BudgetSelect } from "./LeadFormParts";

const inputClass = (invalid: boolean) =>
  `w-full px-3.5 py-2.5 rounded-lg bg-forest-900/90 border text-sm text-cream-50 placeholder:text-cream-100/40 focus:outline-none ${
    invalid ? "border-red-400 focus:border-red-300" : "border-gold-400/30 focus:border-gold-400"
  }`;

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const lead = useLeadForm((reset) => {
    setTimeout(() => {
      setIsOpen(false);
      reset();
    }, 3500);
  });
  const { errors, submitting, submitted, submitError } = lead;

  const animBoxRef = useRef<HTMLDivElement>(null);
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
    if (isOpen && animBoxRef.current) {
      const isMobile = window.innerWidth < 640;
      gsap.fromTo(
        animBoxRef.current,
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

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Anchored above FloatingContact's WhatsApp/Call stack (bottom-6 + two size-13 buttons + gap ≈ 9rem) so it never covers them */}
      <div className="fixed bottom-40 left-4 right-4 sm:left-auto sm:right-5 z-50 pointer-events-none flex justify-center sm:justify-end">
        <div className="w-full max-w-sm pointer-events-none flex justify-center sm:justify-end">
          <div className="pointer-events-auto w-full sm:w-auto">
            {isOpen && (
              <div
                ref={animBoxRef}
                className="relative max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain bg-forest-950/98 backdrop-blur-xl border border-gold-400/40 rounded-xl p-5 sm:p-6 shadow-2xl text-cream-50 w-full sm:w-[370px]"
              >
                {submitted ? (
                  <div role="status" className="py-4 text-center flex flex-col items-center justify-center gap-2.5">
                    <CheckCircle2 className="text-gold-400 shrink-0" size={34} />
                    <div>
                      <p className="text-base font-semibold text-cream-50">Thank you!</p>
                      <p className="text-xs text-cream-100/70 mt-0.5">We will get in touch shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={lead.handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-3.5">
                    {/* Header with Close Button properly aligned */}
                    <div className="flex items-start justify-between gap-3 pr-8">
                      <div>
                        <h3 className="font-display text-lg text-cream-50 font-medium leading-snug">
                          Request a <span className="italic text-gold-400">Callback</span>
                        </h3>
                        <p className="text-xs text-cream-100/70 mt-1">
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
                      <X size={16} />
                    </button>

                    <div>
                      <label
                        htmlFor={lead.fieldId("name")}
                        className="block text-xs font-medium text-cream-100/80 mb-1.5 uppercase tracking-wider"
                      >
                        Name *
                      </label>
                      <input
                        {...lead.fieldProps("name")}
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Enter your name"
                        className={inputClass(!!errors.name)}
                      />
                      <FieldError id={lead.errorId("name")} message={errors.name} className="text-red-400" />
                    </div>

                    <div>
                      <label
                        htmlFor={lead.fieldId("phone")}
                        className="block text-xs font-medium text-cream-100/80 mb-1.5 uppercase tracking-wider"
                      >
                        Phone *
                      </label>
                      <input
                        {...lead.fieldProps("phone")}
                        type="tel"
                        required
                        autoComplete="tel"
                        maxLength={20}
                        placeholder="10-digit mobile number"
                        className={inputClass(!!errors.phone)}
                      />
                      <FieldError id={lead.errorId("phone")} message={errors.phone} className="text-red-400" />
                    </div>

                    <div>
                      <label
                        htmlFor={lead.fieldId("email")}
                        className="block text-xs font-medium text-cream-100/80 mb-1.5 uppercase tracking-wider"
                      >
                        Email <span className="text-cream-100/40 lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        {...lead.fieldProps("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="Enter email address"
                        className={inputClass(!!errors.email)}
                      />
                      <FieldError id={lead.errorId("email")} message={errors.email} className="text-red-400" />
                    </div>

                    <div>
                      <label
                        htmlFor={lead.fieldId("budget")}
                        className="block text-xs font-medium text-cream-100/80 mb-1.5 uppercase tracking-wider"
                      >
                        What is your preferred budget range? *
                      </label>
                      <BudgetSelect
                        {...lead.fieldProps("budget")}
                        required
                        className={inputClass(!!errors.budget)}
                        iconClassName="text-gold-400"
                      />
                      <FieldError id={lead.errorId("budget")} message={errors.budget} className="text-red-400" />
                    </div>

                    <Honeypot value={lead.values.company} onChange={(v) => lead.setField("company", v)} />

                    {submitError && (
                      <p role="alert" className="text-xs text-red-400">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-gold-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Enquire Now</span>
                      )}
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