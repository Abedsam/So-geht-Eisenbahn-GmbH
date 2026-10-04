"use client";

/** Öffnet den Cookie-Banner erneut, um die Auswahl zu ändern */
export function ConsentSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("sge:open-consent"))}
      className="self-start rounded-btn border border-petrol px-4 py-2.5 font-bold text-petrol hover:bg-petrol hover:text-white"
    >
      Cookie-Einstellungen ändern
    </button>
  );
}
