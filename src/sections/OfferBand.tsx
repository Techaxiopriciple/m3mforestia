import { useState } from "react";
import EnquirePopup from "./EnquirePopup";

const OFFER_ITEMS = [
  "3 BHK Forest-Themed Residences",
  "Starting ₹2.5 Cr*",
];

export default function OfferBand() {
  const [enquireOpen, setEnquireOpen] = useState(false);

  return (
    <section
      aria-label="Offer highlights"
      className="relative bg-gradient-to-r from-forest-950 via-emerald-900 to-forest-950 border-y border-gold-400/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          {/* Text Items */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
            {OFFER_ITEMS.map((item, i) => (
              <div key={item} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden sm:block mx-6 lg:mx-10 h-5 w-px bg-gold-400/60"
                  />
                )}
                <span
                  className={`feature-text font-bold uppercase ${
                    i === 1 ? "text-gold-400" : "text-white"
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Separator for desktop */}
          <span
            aria-hidden
            className="hidden sm:block h-5 w-px bg-gold-400/60"
          />

          {/* Enquire Now Button */}
          <button
            type="button"
            onClick={() => setEnquireOpen(true)}
            className="rounded-full bg-gold-500 hover:bg-gold-400 px-6 py-2 text-xs sm:text-sm font-bold uppercase text-forest-950 shadow-md transition-all cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>

      <EnquirePopup isOpen={enquireOpen} onClose={() => setEnquireOpen(false)} />
    </section>
  );
}