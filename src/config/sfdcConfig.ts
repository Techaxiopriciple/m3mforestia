// Leads are posted to a Google Apps Script Web App, which forwards them to Salesforce
// server-side. No Salesforce credentials ever ship to the browser.
export const SFDC_CONFIG = {
  leadUrl:
    "https://script.google.com/macros/s/AKfycbyejG_6cuAgvmY04rVIqNcxBz2AdsYpS4lxYUiQ5Non-BV4Z3GLovZjypRx5EAzJIVJ/exec",
  projectId: "a0GS200000922dvMAA",
  agencyName: "axio",
  requestTimeoutMs: 15000,
} as const;
