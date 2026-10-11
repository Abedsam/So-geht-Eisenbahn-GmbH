"use client";

/** Öffnet den Cookie-Banner erneut (Event wird in components/site/CookieBanner.tsx verarbeitet) */
export function ConsentButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("sge:open-consent"))}
      className="cursor-pointer self-start border-0 border-b-2 border-solid border-blue bg-transparent p-0 pb-1 font-sans text-[17px] font-bold text-blue transition-colors duration-200 hover:border-blue-hover hover:text-blue-hover"
    >
      Cookie-Einstellungen ändern
    </button>
  );
}
