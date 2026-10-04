"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { useStoredValue } from "@/lib/useStoredValue";

export const CONSENT_KEY = "sge-consent";
export type Consent = { necessary: true; external: boolean; date: string };

/** Cookie-Hinweis: standardmäßig nur notwendige Cookies, „Ablehnen“ gleichwertig zu „Akzeptieren“ */
export function CookieBanner() {
  const [stored, setStored] = useStoredValue(CONSENT_KEY);
  const [reopened, setReopened] = useState(false);

  // „Cookie-Einstellungen ändern“ (Datenschutzseite) öffnet den Banner erneut
  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener("sge:open-consent", reopen);
    return () => window.removeEventListener("sge:open-consent", reopen);
  }, []);

  const save = (external: boolean) => {
    const value: Consent = { necessary: true, external, date: new Date().toISOString() };
    setStored(JSON.stringify(value));
    setReopened(false);
  };

  // `undefined` = noch nicht im Browser gelesen → nichts anzeigen (verhindert Flackern)
  const show = reopened || stored === null;
  if (!show) return null;

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-card border border-petrol-100 bg-white p-5 shadow-lift md:inset-x-6 md:bottom-6 md:p-6">
      <div className="flex items-start gap-4">
        <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-petrol sm:grid" aria-hidden="true">
          <Cookie className="size-5" />
        </span>
        <div className="flex-1">
          <h2 id="cookie-title" className="font-sans text-base font-bold text-ink">
            Ihre Privatsphäre
          </h2>
          <p className="mt-1 text-sm text-ink/80">
            Wir verwenden nur technisch notwendige Cookies. Externe Inhalte wie Videos oder Karten laden wir erst nach Ihrer Zustimmung. Mehr dazu in der{" "}
            <Link href="/datenschutz" className="font-semibold text-petrol underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => save(false)} className="rounded-btn border-2 border-petrol px-4 py-2.5 font-bold text-petrol transition-colors hover:bg-petrol hover:text-white">
              Nur notwendige
            </button>
            <button type="button" onClick={() => save(true)} className="rounded-btn border-2 border-petrol px-4 py-2.5 font-bold text-petrol transition-colors hover:bg-petrol hover:text-white">
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
