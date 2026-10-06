import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLeadForm } from "../lib/useLeadForm";
import { Honeypot, FieldError } from "./LeadFormParts";

const inputClass = (invalid: boolean) =>
  `w-full rounded-lg bg-white border px-4 py-3 text-forest-950 text-sm focus:outline-none ${
    invalid ? "border-red-500 focus:border-red-600" : "border-forest-200 focus:border-forest-600"
  }`;

// Shared inline lead-capture form: compact (name + phone, first fold) or full (adds email).
// Submits to Salesforce through the same service as the drawer and popups.
export default function EnquiryForm({
  compact = false,
  title,
  className = "",
}: {
  compact?: boolean;
  title?: string;
  className?: string;
}) {
  const lead = useLeadForm();
  const { errors, submitting, submitted, submitError } = lead;

  if (submitted) {
    return (
      <div role="status" className={`flex flex-col items-center justify-center gap-3 text-center py-8 ${className}`}>
        <CheckCircle2 size={36} className="text-forest-600" />
        <p className="font-display text-2xl text-forest-950">Thank You!</p>
        <p className="text-sm text-forest-900/70 max-w-xs">
          Our team will get in touch with you shortly with floor plans and pricing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={lead.handleSubmit} noValidate className={`space-y-4 ${className}`}>
      {title && (
        <p className="text-sm font-medium tracking-wide text-forest-950 mb-1">{title}</p>
      )}
      <div>
        <input
          {...lead.fieldProps("name")}
          required
          autoComplete="name"
          aria-label="Your name"
          className={inputClass(!!errors.name)}
          placeholder="Your name"
        />
        <FieldError id={lead.errorId("name")} message={errors.name} />
      </div>
      <div>
        <input
          {...lead.fieldProps("phone")}
          required
          type="tel"
          autoComplete="tel"
          maxLength={20}
          aria-label="Phone number"
          className={inputClass(!!errors.phone)}
          placeholder="+91 00000 00000"
        />
        <FieldError id={lead.errorId("phone")} message={errors.phone} />
      </div>
      {!compact && (
        <div>
          <input
            {...lead.fieldProps("email")}
            type="email"
            autoComplete="email"
            aria-label="Email address (optional)"
            className={inputClass(!!errors.email)}
            placeholder="Email (optional)"
          />
          <FieldError id={lead.errorId("email")} message={errors.email} />
        </div>
      )}

      <Honeypot value={lead.values.company} onChange={(v) => lead.setField("company", v)} />

      {submitError && (
        <p role="alert" className="text-sm text-red-600">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-forest-700 text-white px-6 py-3.5 text-sm font-medium hover:bg-forest-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} />
            {compact ? "Get a Callback" : "Submit Enquiry"}
          </>
        )}
      </button>
      <div className="pt-1 text-center space-y-1">
        <p className="text-[10px] text-forest-900/45 leading-relaxed">
          RERA REG. NO. RC/REP/HARERA/GGM/1030/762/2026/02
        </p>
        <p className="text-[10px] text-forest-900/45 leading-relaxed">
          RERA REG. NO. RC/REP/HARERA/GGM/991/723/2025/94
        </p>
      </div>
    </form>
  );
}
