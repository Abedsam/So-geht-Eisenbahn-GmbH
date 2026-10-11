"use client";

import { useState } from "react";
import { reviews, reviewsInitial } from "@/content/about-page";

const MAX_LENGTH = 260;
const CUT_AT = 250;

/** Kürzt lange Bewertungen am letzten Wortende vor Zeichen 250 */
const shorten = (text: string) => text.slice(0, text.lastIndexOf(" ", CUT_AT)) + " …";

/** Google-Bewertungen: erst 6 sichtbar, lange Texte aufklappbar, „Alle … anzeigen“ */
export function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const visible = showAll ? reviews : reviews.slice(0, reviewsInitial);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {visible.map((r, i) => {
          const id = `${r.name}-${i}`;
          const long = r.text.length > MAX_LENGTH;
          const isOpen = !!open[id];
          return (
            <figure
              key={id}
              data-reveal=""
              className="m-0 flex flex-col gap-4 rounded-card border border-line bg-bg p-7"
            >
              <div className="flex items-center justify-between">
                <span role="img" aria-label="5 von 5 Sternen" className="text-xl tracking-[2px] text-star">
                  ★★★★★
                </span>
                <span className="font-mono text-[11px] tracking-[.12em] text-muted">GOOGLE</span>
              </div>
              <div className="flex flex-1 flex-col items-start gap-2">
                <blockquote id={`review-${i}`} className="m-0 text-[17px] leading-[1.6]">
                  „{long && !isOpen ? shorten(r.text) : r.text}“
                </blockquote>
                {long && (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`review-${i}`}
                    onClick={() => setOpen((s) => ({ ...s, [id]: !isOpen }))}
                    className="cursor-pointer border-0 bg-transparent p-0 font-sans text-[15px] font-bold text-blue"
                  >
                    {isOpen ? "Weniger" : "Weiterlesen"}
                  </button>
                )}
              </div>
              <figcaption className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-blue font-extrabold text-white"
                >
                  {r.name.trim()[0].toUpperCase()}
                </span>
                <span className="flex flex-col">
                  <strong className="text-[15px]">{r.name}</strong>
                  <span className="text-[13px] text-muted">{r.date}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="cursor-pointer self-center rounded-btn border-0 bg-navy px-[26px] py-4 font-sans text-base font-bold text-white transition-colors duration-200 hover:bg-blue"
        >
          Alle {reviews.length} Bewertungen anzeigen
        </button>
      )}
    </>
  );
}
