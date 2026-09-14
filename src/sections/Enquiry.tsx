import { useLayoutEffect, useRef } from "react";
import { Phone, Mail } from "lucide-react";
import { gsap } from "../lib/gsap";
import { CONTACT } from "../lib/content";
import EnquiryForm from "../components/EnquiryForm";

export default function Enquiry() {
  const root = useRef<HTMLDivElement>(null);

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

        <EnquiryForm className="enq-fade rounded-3xl border border-forest-700 bg-forest-900/50 p-8" />
      </div>
    </section>
  );
}
