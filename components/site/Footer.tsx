import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { CookieSettingsButton } from "./CookieBanner";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-on-navy-footer">
      {/* Schwellen-Streifen */}
      <div
        aria-hidden="true"
        className="h-3.5 border-y-2 border-navy-600"
        style={{ background: "repeating-linear-gradient(90deg,#0E2A4C 0 6px,transparent 6px 26px)" }}
      />
      <div className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-x-8 min-[1100px]:grid-cols-6 gap-y-10 px-[clamp(16px,3vw,40px)] pb-10 pt-[72px]">
        <div className="col-span-full flex min-w-0 flex-col gap-[18px] min-[460px]:col-span-2">
          <Logo size="footer" />
          <p className="m-0 text-[28px] font-extrabold tracking-[-.01em] text-white">Zukunft auf Schienen.</p>
          <address className="text-[15px] not-italic leading-[1.8]">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            <a href={`mailto:${site.email}`} className="text-white underline hover:text-blue-light">
              {site.email}
            </a>
            <br />
            <a href={site.phoneHref} className="text-white underline hover:text-blue-light">
              {site.phone}
            </a>
          </address>
          <div className="flex flex-wrap gap-2.5">
            {site.social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`So geht Eisenbahn auf ${s.name}`}
                className="rounded-full border border-white/20 px-3.5 py-[9px] text-sm font-semibold text-white no-underline transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.label} className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[.14em] text-blue-light">{col.title}</span>
            {col.links.map((l) => (
              <Link key={l.href} href={l.href} className="text-base text-white no-underline hover:text-blue-light">
                {l.label}
              </Link>
            ))}
            {col.title === "LEGAL" && <CookieSettingsButton />}
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-page flex-wrap justify-between gap-3 border-t border-white/10 px-[clamp(16px,3vw,40px)] pb-8 pt-6 text-[13px] text-on-navy-dim">
        <span>© 2026 So geht Eisenbahn GmbH</span>
        <span className="font-mono tracking-[.08em]">Anerkannte Stelle EBA · §14/§15 TfV · AZAV · ISO 9001</span>
      </div>
    </footer>
  );
}
