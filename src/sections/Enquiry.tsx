import { useLayoutEffect, useRef, useState } from "react";
import { Phone, Mail, Send } from "lucide-react";
import { gsap } from "../lib/gsap";
import { CONTACT, RESIDENCE_SIZES, whatsappLink } from "../lib/content";

export default function Enquiry() {
  const root = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", unit: RESIDENCE_SIZES[0].size });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".enq-fade", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I'm ${form.name || "interested in M3M Forestia West"}. Phone: ${
      form.phone || "—"
    }. I'd like details for a ${form.unit} unit.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="enquiry" ref={root} className="relative py-28 sm:py-36 bg-forest-950">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="enq-fade">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-gold-400 mb-5">GET IN TOUCH</p>
          <h2 className="font-display text-3xl sm:text-5xl text-cream-50 leading-tight">
            Experience a <span className="italic text-gold-400">Different Rhythm of Living</span>
          </h2>
          <p className="mt-5 text-cream-100/70 leading-relaxed">
            Share your details and our team will reach out with floor plans,
            pricing, and a personal walkthrough of M3M Forestia West.
          </p>

          <div className="mt-10 space-y-4">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-cream-100/85 hover:text-gold-400">
              <Phone size={18} className="text-gold-400" />
              {CONTACT.phoneDisplay} · {CONTACT.tollFree}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-cream-100/85 hover:text-gold-400">
              <Mail size={18} className="text-gold-400" />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="enq-fade rounded-3xl border border-forest-700 bg-forest-900/50 p-8 space-y-5">
          <div>
            <label className="block text-xs tracking-wide text-cream-100/60 mb-2">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg bg-forest-950 border border-forest-700 px-4 py-3 text-cream-50 text-sm focus:outline-none focus:border-gold-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs tracking-wide text-cream-100/60 mb-2">Phone Number</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-lg bg-forest-950 border border-forest-700 px-4 py-3 text-cream-50 text-sm focus:outline-none focus:border-gold-500"
              placeholder="+91 00000 00000"
            />
          </div>
          <div>
            <label className="block text-xs tracking-wide text-cream-100/60 mb-2">Unit Interest</label>
            <select
              value={form.unit}
              onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              className="w-full rounded-lg bg-forest-950 border border-forest-700 px-4 py-3 text-cream-50 text-sm focus:outline-none focus:border-gold-500"
            >
              {RESIDENCE_SIZES.map((r) => (
                <option key={r.size} value={r.size}>
                  {r.label} · {r.size}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gold-500 text-forest-950 px-6 py-3.5 text-sm font-medium hover:bg-gold-400 transition-colors"
          >
            <Send size={16} />
            Send via WhatsApp
          </button>
          <p className="text-[11px] text-cream-100/50 text-center leading-relaxed">
            No spam — this opens a WhatsApp chat directly with our sales team.
          </p>
        </form>
      </div>
    </section>
  );
}
