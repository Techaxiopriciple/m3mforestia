// Shared "has the visitor submitted any enquiry form" state, backed by localStorage
// so it persists across refreshes and is readable synchronously by any component.

export const ENQUIRY_STORAGE_KEY = "enquirySubmitted";
export const ENQUIRY_EVENT = "enquirySubmitted";

export function isEnquirySubmitted() {
  return localStorage.getItem(ENQUIRY_STORAGE_KEY) === "true";
}

export function markEnquirySubmitted() {
  localStorage.setItem(ENQUIRY_STORAGE_KEY, "true");
  window.dispatchEvent(new Event(ENQUIRY_EVENT));
}
