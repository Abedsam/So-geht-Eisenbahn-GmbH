import { BadgeCheck, Landmark } from "lucide-react";
import { certificates } from "@/content/site";

/** Zertifikats-Leiste (Platzhalter-Badges – durch echte Siegel ersetzen) */
export function CertBar({ title = "Geprüfte Qualität" }: { title?: string }) {
  return (
    <section aria-label={title} className="py-12 md:py-16">
      <div className="container-page">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink/75">{title}</p>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {certificates.map((c, i) => (
            <li key={`${c.title}-${i}`} className="reveal flex min-w-0 items-center gap-3 rounded-card border border-petrol-100 bg-white p-3 sm:p-4">
              <span className="hidden size-11 shrink-0 sm:grid place-items-center rounded-full bg-petrol-50 text-petrol" aria-hidden="true">
                {i === 0 ? <Landmark className="size-5" /> : <BadgeCheck className="size-5" />}
              </span>
              <span className="min-w-0 hyphens-auto text-sm leading-snug [overflow-wrap:anywhere]">
                <strong className="block text-ink">{c.title}</strong>
                <span className="text-ink/70">{c.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
