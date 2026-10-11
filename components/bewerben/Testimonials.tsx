"use client";

import { useRef } from "react";
import { testimonials } from "@/content/bewerben";

/** „Das sagen unsere Teilnehmer.“ – horizontaler Slider mit Pfeil-Buttons (Video-Platzhalter) */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slide = (dir: 1 | -1) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollBy({ left: dir * 316, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="testimonials-title" className="section-y border-t border-line bg-white">
      <div data-reveal="" className="mx-auto mb-10 flex max-w-page flex-wrap items-end justify-between gap-5 px-[clamp(20px,3vw,40px)]">
        <div className="flex flex-col gap-3.5">
          <span className="kicker">NEXT STOP: TRAUMJOB</span>
          <h2 id="testimonials-title" className="h2">
            Das sagen unsere Teilnehmer.
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Vorherige"
            className="size-[52px] cursor-pointer rounded-full border-[1.5px] border-navy bg-white text-lg font-extrabold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Nächste"
            className="size-[52px] cursor-pointer rounded-full border-0 bg-blue text-lg font-extrabold text-white transition-colors hover:bg-blue-hover"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(20px,calc((100%_-_1280px)_/_2))] pb-4 pt-1 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <article key={t.name} className="flex flex-[0_0_min(78vw,300px)] snap-start flex-col gap-3.5">
            <div
              role="img"
              aria-label={`Video-Platzhalter: ${t.name}`}
              className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card transition-transform duration-[350ms] ease-[ease] hover:-translate-y-1.5"
              style={{ background: "repeating-linear-gradient(135deg,#E3EAF1 0 12px,#EDF2F7 12px 24px)" }}
            >
              <span className="absolute left-3.5 top-3 font-mono text-[11px] text-muted">video: {t.name}</span>
              <span className="flex size-16 items-center justify-center rounded-full bg-blue animate-[sge-pulse_2.4s_ease-in-out_infinite]">
                <span className="ml-[5px] size-0 border-y-[12px] border-l-[19px] border-y-transparent border-l-white" />
              </span>
              <span className="absolute bottom-3 right-3.5 rounded bg-navy px-2 py-1 text-xs font-bold text-white">{t.dur}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-[17px]">{t.name}, Teilnehmer</strong>
              <span className="text-[15px] text-muted">{t.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
