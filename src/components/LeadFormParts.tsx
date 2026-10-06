// Small pieces shared by the lead forms. Styling stays with each form so they keep their own look.

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
