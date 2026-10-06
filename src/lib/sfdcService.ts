import { SFDC_CONFIG } from "../config/sfdcConfig";

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  location?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  agency?: string;
  company?: string; // Honeypot: real users never see this field, so it must stay empty
}

export type LeadResult = { success: true } | { success: false; message: string };

const MAX_FIELD_LENGTH = 200;

const clean = (value: string | undefined) => (value ?? "").trim().slice(0, MAX_FIELD_LENGTH);

// Reads attribution params from the current URL at submit time.
export function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    agency: params.get("agency") ?? "", // submitLeadToSFDC falls back to SFDC_CONFIG.agencyName
  };
}

export async function submitLeadToSFDC(data: LeadInput): Promise<LeadResult> {
  const payload = {
    name: clean(data.name),
    phone: clean(data.phone),
    email: clean(data.email),
    budget: clean(data.budget),
    location: clean(data.location),
    utm_source: clean(data.utm_source),
    utm_medium: clean(data.utm_medium),
    utm_campaign: clean(data.utm_campaign),
    agency: clean(data.agency) || SFDC_CONFIG.agencyName,
    company: clean(data.company),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SFDC_CONFIG.requestTimeoutMs);

  try {
    // text/plain keeps this a CORS "simple request" (no preflight), which Apps Script cannot answer.
    const response = await fetch(SFDC_CONFIG.leadUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      return { success: false, message: `Lead endpoint responded with ${response.status}` };
    }

    // Apps Script returns HTML (not JSON) on script errors or permission problems.
    const text = await response.text();
    let result: { status?: string; message?: string };
    try {
      result = JSON.parse(text);
    } catch {
      return { success: false, message: "Unexpected response from lead endpoint" };
    }

    if (result.status === "error") {
      return { success: false, message: result.message || "Failed to submit lead" };
    }

    return { success: true };
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === "AbortError"
        ? "Lead submission timed out"
        : "Network error while submitting lead";
    console.error(message, error);
    return { success: false, message };
  } finally {
    clearTimeout(timeout);
  }
}
