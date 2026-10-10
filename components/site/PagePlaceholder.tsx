import Link from "next/link";

/** Platzhalter für Seiten, die im nächsten Schritt nach Design-Vorlage umgesetzt werden */
export function PagePlaceholder({ kicker, title }: { kicker: string; title: string }) {
  return (
    <main id="inhalt" className="bg-navy pt-[116px] text-white">
      <div className="container-page flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
        <span className="font-mono text-[13px] tracking-[.16em] text-blue-light">{kicker}</span>
        <h1 className="m-0 text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">{title}</h1>
        <p className="m-0 max-w-[560px] text-lg leading-relaxed text-on-navy">
          Diese Seite wird gerade gebaut. Bis dahin erreichst du uns direkt – wir beraten dich gern.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary btn-lg">
            Zur Startseite <span aria-hidden="true">→</span>
          </Link>
          <a href="tel:+4920988494686" className="btn btn-ghost-dark btn-lg">
            +49 209 8849 4686
          </a>
        </div>
      </div>
    </main>
  );
}
