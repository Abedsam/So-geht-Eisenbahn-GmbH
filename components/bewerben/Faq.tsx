"use client";

import { useId, useState } from "react";
import { bewerbenFaq } from "@/content/bewerben";

/** Akkordeon „Fragen und Antworten“ – erste Frage ist offen */
export function BewerbenFaq() {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <>
      {bewerbenFaq.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={f.q} data-reveal="" className="overflow-hidden rounded-xl border border-line bg-white">
            <h3 className="m-0 text-lg font-bold">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-[22px] text-left font-sans text-lg font-bold text-navy"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`flex size-8 shrink-0 items-center justify-center rounded-btn text-xl text-white transition-[transform,background-color] duration-300 ${
                    isOpen ? "rotate-45 bg-blue" : "bg-navy"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={btnId}>
                <p className="m-0 px-6 pb-[22px] text-[17px] leading-[1.65] text-muted">{f.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
