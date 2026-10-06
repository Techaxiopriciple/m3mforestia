import { SFDC_CONFIG } from "../config/sfdcConfig";

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  location?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  agency?: string;
  company?: string; // Honeypot field (must be empty for real users)[cite: 2]
}

export async function submitLeadToSFDC(data: LeadPayload) {
  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email || "",
    budget: data.budget || "",
    location: data.location || "",
    utm_source: data.utm_source || "",
    utm_medium: data.utm_medium || "",
    utm_campaign: data.utm_campaign || "",
    agency: data.agency || SFDC_CONFIG.agencyName,
    company: data.company || "", // Honeypot
  };

  try {
    const response = await fetch(SFDC_CONFIG.apiUrl, {
      method: "POST",
      // Apps script ke sath cors/no-cors handling ke liye standard headers
      headers: {
        "Content-Type": "text/plain;charset=utf-8", 
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.status === "error") {
      throw new Error(result.message || "Failed to submit lead");
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Lead submission error:", error);
    return { success: false, error };
  }
}