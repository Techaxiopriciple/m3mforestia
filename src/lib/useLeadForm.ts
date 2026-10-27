import { useId, useRef, useState, type SyntheticEvent } from "react";
import { submitLeadToSFDC, getTrackingParams } from "./sfdcService";
import { markEnquirySubmitted } from "./enquiry";
import {
  EMPTY_LEAD,
  loadPhoneLib,
  validateLead,
  type LeadErrors,
  type LeadFields,
  type LeadValidation,
} from "./leadValidation";

const SUBMIT_ERROR = "We couldn't send your details. Please check your connection and try again.";

// State, validation and Salesforce submission for a lead form. Each form keeps its own
// markup and styling; this hook is the single place the submission rules live.
// `onSuccess` receives `reset` so a form can clear itself after its thank-you message.
export function useLeadForm(onSuccess?: (reset: () => void) => void) {
  const uid = useId();
  const [values, setValues] = useState<LeadFields>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Validation is async (the phone library loads lazily), so `submitting` state alone
  // can't stop a quick double click from slipping through before it re-renders.
  const busy = useRef(false);

  // Unique per form instance: EnquirePopup, for one, is mounted in more than one section.
  const fieldId = (field: keyof LeadFields) => `${uid}-${field}`;
  const errorId = (field: keyof LeadErrors) => `${uid}-${field}-error`;

  const reset = () => {
    setValues(EMPTY_LEAD);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
  };

  const setField = (field: keyof LeadFields, value: string) => {
    if (field === "phone") loadPhoneLib().catch(() => {}); // Warm-up only; submit retries
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (field in prev ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    try {
      await submit(e.currentTarget);
    } finally {
      busy.current = false;
    }
  };

  const focusField = (form: HTMLFormElement, field: keyof LeadFields) =>
    form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(field))}`)?.focus();

  const submit = async (form: HTMLFormElement) => {
    let validation: LeadValidation;
    try {
      validation = await validateLead(values);
    } catch {
      // The phone library chunk failed to download, most likely a dropped connection
      setSubmitError(SUBMIT_ERROR);
      return;
    }
    const { errors: fieldErrors, phone } = validation;
    setErrors(fieldErrors);
    setSubmitError("");

    const firstInvalid = Object.keys(fieldErrors)[0];
    if (firstInvalid || !phone) {
      focusField(form, (firstInvalid as keyof LeadFields | undefined) ?? "phone");
      return;
    }

    setSubmitting(true);
    const response = await submitLeadToSFDC({
      name: values.name,
      phone: phone.nationalNumber,
      countryCode: phone.countryCode,
      email: values.email,
      budget: values.budget,
      location: values.location,
      ...getTrackingParams(),
      company: values.company,
    });
    setSubmitting(false);

    if (!response.success) {
      if (response.field === "phone") {
        // The endpoint rejected the number on its own check; show it like a client-side error
        setErrors({ phone: response.message });
        focusField(form, "phone");
      } else {
        setSubmitError(SUBMIT_ERROR);
      }
      return;
    }

    markEnquirySubmitted();
    setSubmitted(true);
    onSuccess?.(reset);
  };

  // Spread onto an input to wire up its id, value, change handler and error description.
  const fieldProps = (field: keyof LeadFields) => {
    const error = errors[field as keyof LeadErrors];
    return {
      id: fieldId(field),
      name: field,
      value: values[field],
      onChange: (e: { target: { value: string } }) => setField(field, e.target.value),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId(field as keyof LeadErrors) : undefined,
    };
  };

  return {
    values,
    errors,
    submitting,
    submitted,
    submitError,
    fieldId,
    errorId,
    fieldProps,
    setField,
    handleSubmit,
    reset,
  };
}
