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
    <section id="enquiry" ref={root} className="relative py-10 sm:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="enq-fade">
          <p className="text-xs sm:text-sm tracking-[0.4em] text-forest-600 mb-5">GET IN TOUCH</p>
          <h2 className="section-heading text-forest-950">
            Experience a <span className="italic text-forest-600">Different Rhythm of Living</span>
          </h2>
          <p className="mt-5 text-forest-900/70 leading-relaxed">
            Share your details and our senior sales executive will reach out.
          </p>

          <div className="mt-10 space-y-4">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-forest-900/85 hover:text-forest-600">
              <Phone size={18} className="text-forest-600" />
              {CONTACT.phoneDisplay} · {CONTACT.tollFree}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-forest-900/85 hover:text-forest-600">
              <Mail size={18} className="text-forest-600" />
              {CONTACT.email}
            </a>
          </div>
        </div>

        <EnquiryForm className="enq-fade rounded-3xl border border-forest-100 bg-forest-50 p-8 shadow-xl shadow-forest-950/5" />
      </div>
    </section>
  );
}
