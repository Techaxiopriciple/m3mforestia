// Server-side phone check for the Apps Script lead endpoint. Bundled together with
// libphonenumber's full metadata into PhoneValidation.js by `npm run build:apps-script`;
// see README.md in this folder for how the endpoint calls it.
import { parsePhoneNumberFromString, validatePhoneNumberLength } from "libphonenumber-js/max";
import { checkPhone, type PhoneCheck } from "../src/lib/phone";

const lib = { parsePhoneNumberFromString, validatePhoneNumberLength };

// `phone` and `countryCode` are the `phone` and `country_code` fields posted by
// src/lib/sfdcService.ts (national number + "+971"), but anything can hit the endpoint
// directly, so a full "+971 50..." in `phone` or a missing code are handled too.
function validateLeadPhone(phone: unknown, countryCode: unknown): PhoneCheck {
  const number = String(phone ?? "").trim();
  const code = String(countryCode ?? "").trim();
  return checkPhone(number.startsWith("+") || !code ? number : `${code} ${number}`, lib);
}

// Apps Script shares one global scope across a project's files.
(globalThis as Record<string, unknown>).validateLeadPhone = validateLeadPhone;
