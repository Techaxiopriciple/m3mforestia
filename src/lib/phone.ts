// Phone validation shared by the browser (leadValidation.ts) and the Apps Script lead
// endpoint (apps-script/phoneValidation.entry.ts), so both sides accept exactly the same numbers.
// The library is passed in rather than imported: the browser lazy-loads it, Apps Script bundles it.
import type { CountryCode, parsePhoneNumberFromString, validatePhoneNumberLength } from "libphonenumber-js/max";

export interface PhoneLib {
  parsePhoneNumberFromString: typeof parsePhoneNumberFromString;
  validatePhoneNumberLength: typeof validatePhoneNumberLength;
}

export interface ValidPhone {
  valid: true;
  e164: string; // "+971501234567"
  countryCode: string; // "+971"
  nationalNumber: string; // "501234567"
  country?: CountryCode; // "AE"; undefined for non-geographic codes such as +800
}

export type PhoneCheck = ValidPhone | { valid: false; error: string };

// There's no country selector, so visitors type the code themselves ("+971 50 123 4567").
// Numbers typed without one are read as Indian, the site's main audience, which keeps
// "98765 43210", "098765 43210" and "919876543210" working as they always have.
const DEFAULT_COUNTRY: CountryCode = "IN";
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

export const PHONE_MESSAGES = {
  required: "Please enter your phone number.",
  invalidCountry: "Enter a valid country code, e.g. +91 or +971.",
  tooShort: "This number is incomplete. Please check the digits.",
  tooLong: "This number has too many digits.",
  invalid: "Enter a valid phone number with country code, e.g. +91 98765 43210.",
} as const;

export function checkPhone(raw: string, lib: PhoneLib): PhoneCheck {
  const input = raw.trim();
  if (!input) return { valid: false, error: PHONE_MESSAGES.required };
  if (!PHONE_CHARS.test(input)) return { valid: false, error: PHONE_MESSAGES.invalid };

  const options = { defaultCountry: DEFAULT_COUNTRY, extract: false };
  const phone = lib.parsePhoneNumberFromString(input, options);
  if (phone?.isValid()) {
    return {
      valid: true,
      e164: phone.number,
      countryCode: `+${phone.countryCallingCode}`,
      nationalNumber: phone.nationalNumber,
      country: phone.country,
    };
  }

  switch (lib.validatePhoneNumberLength(input, options)) {
    case "INVALID_COUNTRY":
      return { valid: false, error: PHONE_MESSAGES.invalidCountry };
    case "TOO_SHORT":
      return { valid: false, error: PHONE_MESSAGES.tooShort };
    case "TOO_LONG":
      return { valid: false, error: PHONE_MESSAGES.tooLong };
    default:
      return { valid: false, error: PHONE_MESSAGES.invalid };
  }
}
