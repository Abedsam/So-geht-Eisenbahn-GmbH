import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Screen, Words } from "./Screen";

/** Rechtstexte: einzige Stationen, die bei langem Text innerhalb der Station scrollen dürfen */
export function LegalScreen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Screen tone="light" width="narrow" className="!justify-start">
      <Words text={title} className="title-xl text-petrol" />
      <p className="in mt-5 flex items-start gap-3 rounded-[14px] bg-accent-soft p-4 text-sm text-ink">
        <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <span>
          <strong>TODO:</strong> Platzhalter – der rechtsverbindliche Text wird vom Kunden bzw. dessen Datenschutzbeauftragten geliefert.
        </span>
      </p>
      <div className="in mt-6 flex flex-col gap-4 text-ink/85 [&_h2]:mt-3 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-petrol" style={{ ["--i" as string]: 2 }}>
        {children}
      </div>
    </Screen>
  );
}
