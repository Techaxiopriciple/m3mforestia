import { useState } from "react";
import EnquirePopup from "./EnquirePopup";

const OFFER_ITEMS = [
  "3 BHK Forest-Themed Residences",
  "Starting ₹2.5 Cr*",
  "Enquire Now",
];

export default function OfferBand() {
  const [enquireOpen, setEnquireOpen] = useState(false);

  return (
    <section
      aria-label="Offer highlights"
      className="relative bg-gradient-to-r from-forest-950 via-emerald-900 to-forest-950 border-y border-gold-400/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 sm:py-4">
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-center">
          {OFFER_ITEMS.map((item, i) => (
            <li key={item} className="flex items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden sm:block mx-6 lg:mx-10 h-5 w-px bg-gold-400/60"
                />
              )}
              {i === OFFER_ITEMS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setEnquireOpen(true)}
                  // Added feature-text so it matches the exact same size as the other items
                  className="feature-text font-bold uppercase text-white transition-colors hover:text-gold-400 cursor-pointer"
                >
                  {item}
                </button>
              ) : (
                <span
                  className={`feature-text font-bold uppercase ${
                    i === 1 ? "text-gold-400" : "text-white"
                  }`}
                >
                  {item}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <EnquirePopup isOpen={enquireOpen} onClose={() => setEnquireOpen(false)} />
    </section>
  );
}