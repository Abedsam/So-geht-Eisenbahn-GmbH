"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStoredValue } from "@/lib/useStoredValue";

export const CONSENT_KEY = "sge-cookie-consent";
export type Consent = "all" | "necessary";
const OPEN_EVENT = "sge:open-consent";

/**
 * Cookie-Banner laut Handoff: „Alle“ / „Nur notwendige“ / Einstellungen mit Marketing-Schalter.
 * TODO(Produktion): geprüftes CMP (z. B. Usercentrics, Cookiebot) einsetzen und Pixel erst nach Consent laden.
 */
export function CookieBanner() {
  const [stored, setStored] = useStoredValue(CONSENT_KEY);
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const reopen = () => {
      setEditing(true);
      setDetails(true);
      try {
        setMarketing(localStorage.getItem(CONSENT_KEY) === "all");
      } catch {
        setMarketing(false);
      }
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = (v: Consent) => {
    setStored(v);
    setEditing(false);
    setDetails(false);
  };

  // `undefined` = noch nicht im Browser gelesen → nichts anzeigen (kein Flackern)
  if (!editing && stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-[120] ml-auto flex max-w-[560px] flex-col gap-3.5 rounded-card border border-line bg-white p-6 shadow-cookie"
    >
      <span className="font-mono text-xs tracking-[.14em] text-blue">DATENSCHUTZ</span>
      <strong id="cookie-title" className="text-[19px] font-extrabold">
        Cookies &amp; Tracking
      </strong>
      <p className="m-0 text-sm leading-relaxed text-muted">
        Wir nutzen technisch notwendige Cookies. Mit deiner Zustimmung verwenden wir zusätzlich Marketing-Tools (z. B. Meta Pixel, Google Ads), um
        unsere Anzeigen zu verbessern. Mehr in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      {details && (
        <>
          <label className="flex items-center justify-between gap-3 rounded-btn bg-bg px-3.5 py-3 text-sm font-semibold">
            Notwendig
            <input type="checkbox" checked disabled className="size-5 accent-blue" />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-btn bg-bg px-3.5 py-3 text-sm font-semibold">
            Marketing (Meta Pixel, Google Ads)
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="size-5 accent-blue" />
          </label>
        </>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save("all")}
          className="min-h-12 flex-[1_1_140px] cursor-pointer rounded-btn border-0 bg-blue p-[13px] text-sm font-bold text-white hover:bg-blue-hover"
        >
          Alle akzeptieren
        </button>
        <button
          type="button"
          onClick={() => save("necessary")}
          className="min-h-12 flex-[1_1_140px] cursor-pointer rounded-btn border-[1.5px] border-navy bg-white p-[13px] text-sm font-bold text-navy hover:bg-navy hover:text-white"
        >
          Nur notwendige
        </button>
        <button
          type="button"
          onClick={() => (details ? save(marketing ? "all" : "necessary") : setDetails(true))}
          className="flex-[1_1_100%] cursor-pointer border-0 bg-transparent p-2 text-sm font-semibold text-blue underline hover:text-blue-hover"
        >
          {details ? "Auswahl speichern" : "Einstellungen anpassen"}
        </button>
      </div>
    </div>
  );
}

/** Footer-Link „Cookie-Einstellungen“ öffnet den Banner erneut */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="cursor-pointer border-0 bg-transparent p-0 text-left font-sans text-base text-white hover:text-blue-light"
    >
      Cookie-Einstellungen
    </button>
  );
}
