"use client";

import { Accessibility, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { parseJson, useStoredValue } from "@/lib/useStoredValue";

const KEY = "sge-a11y";
type Prefs = { fontsize: "md" | "lg" | "xl"; spacing: "normal" | "wide" };
const defaults: Prefs = { fontsize: "md", spacing: "normal" };

function apply(p: Prefs) {
  const root = document.documentElement;
  root.dataset.fontsize = p.fontsize;
  root.dataset.spacing = p.spacing;
}

/** Barrierefreiheits-Button (unten links): Schriftgröße und Zeilenabstand */
export function A11yMenu() {
  const [open, setOpen] = useState(false);
  const [stored, setStored] = useStoredValue(KEY);
  const prefs: Prefs = { ...defaults, ...parseJson<Partial<Prefs>>(stored) };

  // Einstellungen auf <html> übertragen (externes System → Effect ist hier richtig)
  const { fontsize, spacing } = prefs;
  useEffect(() => {
    apply({ fontsize, spacing });
  }, [fontsize, spacing]);

  const update = (p: Prefs) => setStored(JSON.stringify(p));

  const sizes: { value: Prefs["fontsize"]; label: string; aria: string }[] = [
    { value: "md", label: "A", aria: "Normale Schriftgröße" },
    { value: "lg", label: "A+", aria: "Große Schrift" },
    { value: "xl", label: "A++", aria: "Sehr große Schrift" },
  ];

  return (
    <div className="fab fixed bottom-6 left-4 z-30 md:left-6">
      {open && (
        <div id="a11y-panel" role="group" aria-label="Darstellung anpassen" className="absolute bottom-16 left-0 w-64 rounded-card border border-petrol-100 bg-white p-4 shadow-lift">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-bold text-ink">Darstellung</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Schließen" className="grid size-8 place-items-center rounded-full hover:bg-petrol-50">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mb-2 text-sm text-ink/70">Schriftgröße</p>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={prefs.fontsize === s.value}
                aria-label={s.aria}
                onClick={() => update({ ...prefs, fontsize: s.value })}
                className={`rounded-btn border px-2 py-2 font-bold ${prefs.fontsize === s.value ? "border-petrol bg-petrol text-white" : "border-petrol-100 text-petrol hover:bg-petrol-50"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label className="mb-4 flex cursor-pointer items-center justify-between gap-3 text-sm">
            <span>Größerer Zeilenabstand</span>
            <input
              type="checkbox"
              className="size-5 accent-petrol"
              checked={prefs.spacing === "wide"}
              onChange={(e) => update({ ...prefs, spacing: e.target.checked ? "wide" : "normal" })}
            />
          </label>
          <button type="button" onClick={() => update(defaults)} className="inline-flex items-center gap-2 text-sm font-semibold text-petrol hover:underline">
            <RotateCcw className="size-4" aria-hidden="true" /> Zurücksetzen
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Barrierefreiheit: Darstellung anpassen"
        className="grid size-12 place-items-center rounded-full bg-ink text-white shadow-lift transition-transform hover:scale-105"
      >
        <Accessibility className="size-6" aria-hidden="true" />
      </button>
    </div>
  );
}
