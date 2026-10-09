// Client-side validation shared by every lead form. The Apps Script endpoint still
// sanitises server-side; this is about giving visitors immediate, specific feedback.

export interface LeadFields {
  name: string;
  phone: string;
  email: string;
  budget: string;
  location: string;
  company: string; // Honeypot: must stay empty for real visitors
}

export type LeadErrors = Partial<Record<"name" | "phone" | "email" | "budget", string>>;

// Sent to the lead endpoint verbatim, so changing a label changes what lands in the CRM.
export const BUDGET_OPTIONS = ["₹2.5 Cr – ₹3 Cr", "₹3 Cr – ₹4 Cr", "Above ₹4 Cr"] as const;

export const EMPTY_LEAD: LeadFields = {
  name: "",
  phone: "",
  email: "",
  budget: "",
  location: "",
  company: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[\d\s()+-]+$/;
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

// Accepts the usual ways people type an Indian mobile number ("+91 98765 43210",
// "098765-43210", "9876543210") and reduces it to the bare 10 digits.
// Returns null when the input isn't a valid mobile number.
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!PHONE_CHARS.test(trimmed)) return null;

  let digits = trimmed.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);

  return INDIAN_MOBILE.test(digits) ? digits : null;
}

// Errors are returned in on-screen field order so the first key is the first invalid field.
export function validateLead(values: LeadFields): LeadErrors {
  const errors: LeadErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!normalizePhone(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  const email = values.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!(BUDGET_OPTIONS as readonly string[]).includes(values.budget)) {
    errors.budget = "Please select your budget range.";
  }

  return errors;
}
