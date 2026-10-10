import { useEffect } from "react";
import { X } from "lucide-react";

const CARD_WIDTH = "min(400px, 90vw)";

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPopup({ isOpen, onClose }: AdPopupProps) {

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Transparent click-catcher (no dim overlay): clicking anywhere outside the card closes it
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Big Festive Offer"
        style={{ width: CARD_WIDTH }}
        className="relative overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button: shifted further down (top-10) and towards the right side (right-3) */}
        <button
          onClick={onClose}
          className="absolute top-10 right-3 z-20 text-white hover:text-white/80 transition-opacity cursor-pointer p-0 border-none outline-none shadow-none drop-shadow-md"
          aria-label="Close offer"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Banner Image Container */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src="/images/ad-banner.jpeg"
            alt="M3M Forestia Big Festive Offer"
            width={1080}
            height={1920}
            className="w-full h-auto object-contain block"
          />
        </div>
      </div>
    </div>
  );
}