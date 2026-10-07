// Leads are posted to a Google Apps Script Web App, which forwards them to Salesforce
// server-side. No Salesforce credentials ever ship to the browser.
export const SFDC_CONFIG = {
  leadUrl:
    "https://script.google.com/macros/s/AKfycbyG-2iYmcKgvqu40bSdPpJamEPU8-ROdiK5rGfOpJB5s4fG9_qaLKKpP9Hx1gZw2Lw_/exec",
  projectId: "a0GS200000922dvMAA",
  agencyName: "axio",
  requestTimeoutMs: 15000,
} as const;
