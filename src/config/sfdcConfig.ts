// Leads are posted to a Google Apps Script Web App, which forwards them to Salesforce
// server-side. No Salesforce credentials ever ship to the browser.
export const SFDC_CONFIG = {
  leadUrl:
    "https://script.google.com/macros/s/AKfycbzISAfO0jKFasPfZCCHWe5rPJP_5CQL_26DKs_GYSCqR746J2KDdKFeAJ6T8t--nQ1N/exec",
  projectId: "a0GS200000922dvMAA",
  agencyName: "axio",
  requestTimeoutMs: 15000,
} as const;
