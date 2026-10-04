"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { CONSENT_KEY, type Consent } from "@/components/layout/CookieBanner";
import { site } from "@/content/site";
import { parseJson, useStoredValue } from "@/lib/useStoredValue";

const query = encodeURIComponent(`${site.address.street}, ${site.address.zip} ${site.address.city}`);

/**
 * Karten-Platzhalter: Google Maps wird erst nach Einwilligung geladen
 * (Cookie-Banner „Alle akzeptieren“ oder Klick auf „Karte laden“).
 */
export function MapPlaceholder() {
  const [stored] = useStoredValue(CONSENT_KEY);
  const [manual, setManual] = useState(false);
  const load = manual || Boolean(parseJson<Consent>(stored)?.external);

  if (load) {
    return (
      <iframe
        title="Karte: So geht Eisenbahn GmbH, Gelsenkirchen"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="min-h-80 w-full rounded-card border-0 shadow-card"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-card bg-petrol-50 p-6 text-center">
      {/* Stilisierte Kartenfläche */}
      <svg className="absolute inset-0 size-full text-petrol/15" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 400 300">
        <path d="M0 80 L400 40 M0 200 L400 240 M120 0 L80 300 M300 0 L340 300" stroke="currentColor" strokeWidth="14" fill="none" />
        <path d="M0 140 C120 120 260 180 400 150" stroke="currentColor" strokeWidth="6" strokeDasharray="14 10" fill="none" />
      </svg>
      <div className="relative flex max-w-sm flex-col items-center gap-3">
        <span className="grid size-14 place-items-center rounded-full bg-petrol text-accent shadow-lift" aria-hidden="true">
          <MapPin className="size-7" />
        </span>
        <p className="font-semibold text-ink">
          {site.address.street}, {site.address.zip} {site.address.city}
        </p>
        <p className="text-sm text-ink/75">Beim Laden der Karte werden Daten an Google übertragen.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setManual(true)} className="rounded-btn bg-petrol px-4 py-2.5 font-bold text-white hover:bg-petrol-dark">
            Karte laden
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-btn border border-petrol px-4 py-2.5 font-bold text-petrol hover:bg-white"
          >
            Route planen <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
