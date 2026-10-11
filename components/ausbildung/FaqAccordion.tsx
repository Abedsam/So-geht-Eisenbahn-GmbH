"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/faq";

/** FAQ-Akkordeon: immer nur eine Frage offen (erste standardmäßig offen) */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <>
      {items.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={f.question} className="overflow-hidden rounded-xl border border-line bg-bg">
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-[22px] text-left font-[inherit] text-lg font-bold text-navy"
            >
              <span>{f.question}</span>
              <span
                aria-hidden="true"
                className={`flex size-8 shrink-0 items-center justify-center rounded-btn text-xl text-white transition-transform duration-300 ease-[ease] ${
                  isOpen ? "rotate-45 bg-blue" : "bg-navy"
                }`}
              >
                +
              </span>
            </button>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <p className="m-0 px-6 pb-[22px] text-[17px] leading-[1.65] text-muted">{f.answer}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
