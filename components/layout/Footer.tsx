import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

type Props = { variant?: "full" | "landing"; ctaHref?: string };

export function Footer({ variant = "full", ctaHref = "/lokfuehrer-werden" }: Props) {
  const landing = variant === "landing";
  return (
    <footer className="relative overflow-hidden bg-petrol text-white">
      <div className="rail-pattern pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-page relative py-14 md:py-20">
        <div className={`grid gap-10 ${landing ? "justify-items-center text-center" : "md:grid-cols-[1.3fr_1fr_1fr]"}`}>
          <div className={`flex flex-col gap-5 ${landing ? "items-center" : ""}`}>
            <Logo light />
            <p className="max-w-sm text-white/80">
              {landing ? "Deine Eisenbahnakademie in Gelsenkirchen." : "Ihre Eisenbahnakademie in Gelsenkirchen – Aus- und Weiterbildung für Privatpersonen und Unternehmen."}
            </p>
            <LinkButton href={ctaHref} size="lg" className={landing ? "" : "self-start"}>
              Jetzt bewerben {landing ? <ArrowUp className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
            </LinkButton>
          </div>

          {!landing && (
            <>
              <nav aria-label="Footer-Navigation">
                <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.12em] text-accent">Angebot</h2>
                <ul className="flex flex-col gap-2">
                  {footerLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/85 hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.12em] text-accent">Kontakt</h2>
                <address className="flex flex-col gap-3 not-italic text-white/85">
                  <span className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
                    <span>
                      {site.name}
                      <br />
                      {site.address.street}
                      <br />
                      {site.address.zip} {site.address.city}
                    </span>
                  </span>
                  <a href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
                    <Phone className="size-4" aria-hidden="true" /> {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                    <Mail className="size-4" aria-hidden="true" /> {site.email}
                  </a>
                </address>
                <ul className="mt-5 flex gap-2" aria-label="Social Media">
                  {site.social.map((s) => (
                    <li key={s.name}>
                      <a href={s.href} aria-label={`${s.name} (Platzhalter-Link)`} className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-ink">
                        <SocialIcon name={s.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className={`mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between ${landing ? "items-center text-center" : ""}`}>
          <p>© 2026 {site.name} · {site.address.street}, {site.address.zip} {site.address.city}</p>
          <p className="flex gap-3">
            <Link href="/impressum" className="hover:text-white hover:underline">
              Impressum
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/datenschutz" className="hover:text-white hover:underline">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
