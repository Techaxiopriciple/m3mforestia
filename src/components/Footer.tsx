import { CONTACT, DISCLAIMER, RERA } from "../lib/content";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-forest-700 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-forest-100">
          <div>
            <p className="font-display text-xl text-forest-950">M3M FORESTIA WEST</p>
            <p className="mt-3 text-sm text-forest-900/60 leading-relaxed">
              M3M India Infrastructures Private Limited
              <br />
              CIN: U45400HR2014PTC054057
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-forest-600 mb-3">PROJECT SITE</p>
            <p className="text-sm text-forest-900/60 leading-relaxed">
              M3M Forestia at Gurgaon International City,
              <br />
              Sector-M-9, M-10 &amp; M-11, Gurugram, Haryana
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-forest-600 mb-3">CONTACT</p>
            <p className="text-sm text-forest-900/60 leading-relaxed">
              {CONTACT.phoneDisplay} · {CONTACT.tollFree}
              <br />
              {CONTACT.email}
            </p>
          </div>
        </div>

        <div className="pt-8 space-y-3">
          {RERA.map((r) => (
            <p key={r} className="text-[11px] text-forest-900/45">
              RERA REG. NO. {r}
            </p>
          ))}
          <p className="text-[11px] text-forest-900/45">www.haryanarera.gov.in</p>
          <p className="text-[10px] text-forest-900/35 leading-relaxed pt-4">{DISCLAIMER}</p>
        </div>

        <p className="mt-8 text-center text-[11px] text-forest-900/30">
          © {new Date().getFullYear()} M3M India Infrastructures Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
