"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { locate } from "@/content/lines";

/** Fußleiste: die aktuelle Linie mit allen Stationen, Zug-Markierung und Vor/Zurück */
export function LineBar() {
  const pos = locate(usePathname());
  if (!pos) return <div className="h-3" />;
  const { line, index, prev, next, nextLine } = pos;
  const stations = line.stations;
  const progress = stations.length > 1 ? index / (stations.length - 1) : 1;

  return (
    <nav aria-label={`Linie ${line.label}`} className="relative z-20 flex h-[4.75rem] shrink-0 items-center gap-3 px-3 text-white sm:gap-5 sm:px-5" style={{ viewTransitionName: "stage-bottom" }}>
      {prev ? (
        <Link
          href={prev.href}
          transitionTypes={["nav-back"]}
          className="group grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-ink"
          aria-label={`Zurück zu: ${prev.label}`}
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : (
        <span className="size-11 shrink-0" aria-hidden="true" />
      )}

      {/* Strecke */}
      <div className="relative min-w-0 flex-1">
        <div className="relative mx-2 h-1 rounded-full bg-white/15 sm:mx-4">
          <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700" style={{ width: `${progress * 100}%`, background: line.color }} />
        </div>
        <ol className="absolute inset-x-0 -top-[7px] mx-2 flex justify-between sm:mx-4">
          {stations.map((s, i) => {
            const current = i === index;
            return (
              <li key={s.href} className="relative flex justify-center" style={{ width: 0 }}>
                <Link
                  href={s.href}
                  transitionTypes={[i < index ? "nav-back" : "nav-forward"]}
                  aria-current={current ? "page" : undefined}
                  aria-label={`Station ${i + 1}: ${s.label}`}
                  className="group relative flex flex-col items-center"
                >
                  <span
                    className={`block size-[18px] rounded-full border-[3px] transition-transform group-hover:scale-125 ${current ? "scale-110 bg-white" : i < index ? "bg-white" : "bg-frame"}`}
                    style={{ borderColor: i <= index ? line.color : "rgba(255,255,255,.35)" }}
                  />
                  <span
                    className={`absolute top-6 whitespace-nowrap text-[0.7rem] font-semibold tracking-wide transition-colors ${
                      current ? "text-white" : "hidden text-white/50 group-hover:text-white md:block"
                    }`}
                  >
                    {s.label}
                  </span>
                  {current && (
                    // Zug-Markierung: gleitet beim Seitenwechsel zur neuen Station
                    <span className="absolute -top-8" style={{ viewTransitionName: "train-marker" }} aria-hidden="true">
                      <svg viewBox="0 0 40 24" className="h-5 w-8 drop-shadow">
                        <path d="M3 6a4 4 0 0 1 4-4h20c5 0 8 3 10 8l1 5a3 3 0 0 1-3 3H5a2 2 0 0 1-2-2Z" fill={line.color} />
                        <rect x="8" y="6" width="6" height="5" rx="1" fill="#13232A" />
                        <rect x="17" y="6" width="6" height="5" rx="1" fill="#13232A" />
                        <path d="M28 6h3c2 0 3.5 2 4.3 5H28Z" fill="#13232A" />
                        <circle cx="10" cy="20" r="2.4" fill="#fff" />
                        <circle cx="28" cy="20" r="2.4" fill="#fff" />
                      </svg>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {next ? (
        <Link
          href={next.href}
          transitionTypes={["nav-forward"]}
          className="group flex shrink-0 items-center gap-3 rounded-full bg-accent py-2 pl-4 pr-2 font-bold text-ink transition-colors hover:bg-accent-dark sm:pl-5"
          aria-label={`Nächster Halt: ${next.label}`}
        >
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/85">{nextLine ? `Umstieg · ${nextLine.label}` : "Nächster Halt"}</span>
            <span className="max-w-40 truncate text-sm">{next.label}</span>
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-ink text-accent transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      ) : (
        <span className="w-11 shrink-0" aria-hidden="true" />
      )}
    </nav>
  );
}
