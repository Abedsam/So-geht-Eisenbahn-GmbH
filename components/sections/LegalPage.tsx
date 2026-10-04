import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

/** Rahmen für Impressum und Datenschutz (Inhalte folgen vom Kunden) */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-6 flex items-start gap-3 rounded-card bg-accent-soft p-4 text-ink">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>
            <strong>TODO:</strong> Platzhalterseite – der rechtsverbindliche Text wird vom Kunden bzw. dessen Datenschutzbeauftragten geliefert.
          </span>
        </p>
        <div className="mt-10 flex flex-col gap-6 text-ink/85 [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold">{children}</div>
      </div>
    </section>
  );
}
