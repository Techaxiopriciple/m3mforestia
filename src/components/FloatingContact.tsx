import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, whatsappLink } from "../lib/content";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      {/* Client Logos */}
      <div className="fixed left-5 bottom-6 z-50 flex items-center gap-3">
        <a
          href="#top"
          aria-label="M3M Forestia"
          className="w-20 h-16 flex items-center justify-center rounded-lg bg-white/90 p-2"
        >
          <img
            src="/images/logo/Forestia.png"
            alt="M3M Forestia"
            className="max-w-full max-h-full object-contain scale-250"
          />
        </a>
        <a
          href="#top"
          aria-label="GIC Logo"
          className="w-20 h-16 flex items-center justify-center rounded-lg bg-white/90 p-2"
        >
          <img
            src="/images/logo/gic-logo.png"
            alt="GIC Logo"
            className="max-w-full max-h-full object-contain"
          />
        </a>
      </div>
      <a
        href={whatsappLink("Hi, I'm interested in M3M Forestia West. Please share more details.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid place-items-center size-13 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:scale-105 transition-transform"
      >
        <MessageCircle size={24} fill="white" strokeWidth={0} />
      </a>
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label="Call us"
        className="grid place-items-center size-13 rounded-full bg-gold-500 text-forest-950 shadow-lg shadow-black/30 hover:scale-105 transition-transform"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
