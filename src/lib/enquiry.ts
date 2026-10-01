// Shared "has the visitor submitted any enquiry form" state, backed by localStorage
// so it persists across refreshes and is readable synchronously by any component.

export const ENQUIRY_STORAGE_KEY = "enquirySubmitted";
export const ENQUIRY_EVENT = "enquirySubmitted";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4wCBlXXQvpEQZjhGdOYr0462N0sVV0Ec-x2HMHBDGewNwN08IGbz0HZgAPy9eBtoy/exec";

export interface EnquiryData {
  name: string;
  phone: string;
  email: string;
}

// Sends the lead to the Google Sheet and unlocks gated content.
// GET with query parameters (CORS issues se bachne ke liye).
export async function submitEnquiry(data: EnquiryData) {
  const params = new URLSearchParams({
    name: data.name,
    phone: data.phone,
    email: data.email,
  });

  await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
    method: "GET",
    mode: "no-cors",
  });

  markEnquirySubmitted();
}

export function isEnquirySubmitted() {
  return localStorage.getItem(ENQUIRY_STORAGE_KEY) === "true";
}

export function markEnquirySubmitted() {
  localStorage.setItem(ENQUIRY_STORAGE_KEY, "true");
  window.dispatchEvent(new Event(ENQUIRY_EVENT));
}
