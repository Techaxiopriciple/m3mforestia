// Client-side validation shared by every lead form. The Apps Script endpoint repeats the
// phone check server-side (apps-script/); this is about giving visitors immediate, specific feedback.
import { checkPhone, type PhoneLib, type ValidPhone } from "./phone";

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

// libphonenumber with full metadata is ~65 KB gzipped, so it's fetched on first use rather than
// shipped in the main bundle. useLeadForm warms it as soon as a visitor starts typing.
let phoneLib: Promise<PhoneLib> | undefined;
export function loadPhoneLib(): Promise<PhoneLib> {
  phoneLib ??= import("libphonenumber-js/max").catch((error: unknown) => {
    phoneLib = undefined; // Let the next submit retry a failed chunk download
    throw error;
  });
  return phoneLib;
}

export interface LeadValidation {
  errors: LeadErrors;
  phone?: ValidPhone; // Present whenever the phone field passed validation
}

// Errors are returned in on-screen field order so the first key is the first invalid field.
export async function validateLead(values: LeadFields): Promise<LeadValidation> {
  const errors: LeadErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const phoneCheck = checkPhone(values.phone, await loadPhoneLib());
  if (!phoneCheck.valid) {
    errors.phone = phoneCheck.error;
  }

  const email = values.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!(BUDGET_OPTIONS as readonly string[]).includes(values.budget)) {
    errors.budget = "Please select your budget range.";
  }

  return { errors, phone: phoneCheck.valid ? phoneCheck : undefined };
}
