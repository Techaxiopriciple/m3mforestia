import { useState } from "react";
import { Send } from "lucide-react";
import { RESIDENCE_SIZES, whatsappLink } from "../lib/content";

// Shared lead-capture form: compact (Hero, first fold — name + phone only)
// or full (Enquiry section — adds unit interest). Same WhatsApp submit for both.
export default function EnquiryForm({
  compact = false,
  title,
  className = "",
}: {
  compact?: boolean;
  title?: string;
  className?: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", unit: RESIDENCE_SIZES[0].size });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I'm ${form.name || "interested in M3M Forestia West"}. Phone: ${
      form.phone || "—"
    }. I'd like details for a ${form.unit} unit.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {title && (
        <p className="text-sm font-medium tracking-wide text-forest-950 mb-1">{title}</p>
      )}
      <input
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full rounded-lg bg-white border border-forest-200 px-4 py-3 text-forest-950 text-sm focus:outline-none focus:border-forest-600"
        placeholder="Your name"
      />
      <input
        required
        type="tel"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="w-full rounded-lg bg-white border border-forest-200 px-4 py-3 text-forest-950 text-sm focus:outline-none focus:border-forest-600"
        placeholder="+91 00000 00000"
      />
      {!compact && (
        <select
          value={form.unit}
          onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
          className="w-full rounded-lg bg-white border border-forest-200 px-4 py-3 text-forest-950 text-sm focus:outline-none focus:border-forest-600"
        >
          {RESIDENCE_SIZES.map((r) => (
            <option key={r.size} value={r.size}>
              {r.label} · {r.size}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-full bg-forest-700 text-white px-6 py-3.5 text-sm font-medium hover:bg-forest-800 transition-colors"
      >
        <Send size={16} />
        {compact ? "Get a Callback" : "Send via WhatsApp"}
      </button>
      <div className="pt-1 text-center space-y-1">
        <p className="text-[10px] text-forest-900/45 leading-relaxed">
          RERA REG. NO. RC/REP/HARERA/GGM/1030/762/2026/02
        </p>
        <p className="text-[10px] text-forest-900/45 leading-relaxed">
          RERA REG. NO. RC/REP/HARERA/GGM/991/723/2025/94
        </p>
      </div>
      {!compact && (
        <p className="text-[11px] text-forest-900/50 text-center leading-relaxed">
          No spam — this opens a WhatsApp chat directly with our sales team.
        </p>
      )}
    </form>
  );
}
