import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { BUDGET_OPTIONS } from "../lib/leadValidation";

// Small pieces shared by the lead forms. Styling stays with each form so they keep their own look.

// Spread `lead.fieldProps("budget")` onto this; the form supplies the label and colours.
export function BudgetSelect({
  className,
  iconClassName,
  placeholder = "Select a budget range",
  ...props
}: ComponentProps<"select"> & { iconClassName: string; placeholder?: string }) {
  return (
    <div className="relative">
      <select {...props} className={`${className} appearance-none pr-10 cursor-pointer`}>
        <option value="">{placeholder}</option>
        {BUDGET_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${iconClassName}`}
      />
    </div>
  );
}

// Hidden from people and screen readers; bots that fill it get rejected server-side.
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export function FieldError({ id, message, className = "text-red-600" }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={`mt-1 text-xs ${className}`}>
      {message}
    </p>
  );
}
