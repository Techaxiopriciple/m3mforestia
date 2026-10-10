import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

const CARD_WIDTH = "min(400px, 90vw)";
// 800px WebP (2x the card width); preloaded from index.html while the preloader runs
const BANNER_SRC = "/images/ad-banner.webp";

interface AdPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPopup({ isOpen, onClose }: AdPopupProps) {
  // Keep the card invisible until the banner has decoded, then fade it in (no empty box / flash)
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    // Already in cache (preloaded): onLoad may have fired before React attached the handler
    if (img?.complete && img.naturalWidth > 0) setImgReady(true);
  }, []);

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
        className={`relative overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col transition-[opacity,transform] duration-300 ease-out ${
          imgReady ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
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
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <img
            ref={imgRef}
            src={BANNER_SRC}
            alt="M3M Forestia Big Festive Offer"
            width={800}
            height={1422}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImgReady(true)}
            onError={() => setImgReady(true)}
            className="w-full h-auto object-contain block"
          />
        </div>
      </div>
    </div>
  );
}