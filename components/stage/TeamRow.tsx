"use client";

import Image from "next/image";
import { useState } from "react";
import { team } from "@/content/team";

/**
 * Team als Porträt-Reihe: Ein Klick/Tippen (oder Fokus) zeigt die Beschreibung –
 * so passt das ganze Team auf eine Station ohne Scrollen.
 */
export function TeamRow({ variant = "full", dark = true }: { variant?: "short" | "full"; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const m = team[active];
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-3 sm:justify-start sm:gap-4" role="list">
        {team.map((p, i) => (
          <li key={p.slug} className="in" style={{ ["--i" as string]: i + 3 }}>
            <button
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={active === i}
              className="group flex flex-col items-center gap-2"
            >
              <span className={`relative block rounded-full p-1 transition-all duration-300 ${active === i ? "bg-accent" : "bg-transparent"}`}>
                <Image
                  src={p.image}
                  alt=""
                  width={112}
                  height={112}
                  className={`size-[clamp(3.25rem,9vh,6.5rem)] rounded-full object-cover transition-[filter,transform] duration-300 group-hover:scale-105 ${active === i ? "" : "grayscale-[60%]"}`}
                />
              </span>
              <span className={`text-sm font-bold ${dark ? (active === i ? "text-accent" : "text-white/80") : active === i ? "text-petrol" : "text-ink/70"}`}>{p.firstName}</span>
            </button>
          </li>
        ))}
      </ul>
      <div key={m.slug} className={`in max-w-2xl rounded-[18px] p-5 ${dark ? "bg-white/[0.06] text-white" : "bg-white text-ink shadow-card"}`} aria-live="polite">
        <p className={`font-heading text-xl font-bold ${dark ? "text-white" : "text-petrol"}`}>{variant === "full" ? m.name : m.firstName}</p>
        <p className={dark ? "text-white/80" : "text-ink/80"}>{variant === "full" ? m.role : m.short}</p>
      </div>
    </div>
  );
}
