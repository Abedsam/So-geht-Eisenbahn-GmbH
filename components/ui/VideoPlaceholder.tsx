"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

type Props = {
  poster: string;
  title: string;
  duration?: string;
  /** Echte Videodatei (z. B. /videos/rundgang.mp4) – wird erst nach Klick geladen */
  src?: string;
  framed?: boolean;
  preload?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Lazy-Video: Zeigt zunächst nur ein Posterbild. Das Video wird erst nach Klick geladen.
 * Solange kein `src` gesetzt ist, erscheint ein Hinweis, dass das Video nachgeliefert wird.
 */
export function VideoPlaceholder({ poster, title, duration, src, framed, preload, sizes = "(min-width: 1024px) 50vw, 100vw", className = "" }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-card bg-petrol-dark ${framed ? "ring-[6px] ring-white shadow-lift" : ""} ${className}`}>
      {active && src ? (
        <video className="absolute inset-0 size-full object-cover" src={src} controls autoPlay playsInline preload="none" title={title} />
      ) : (
        <>
          <Image src={poster} alt="" fill sizes={sizes} preload={preload} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol-deep/60 via-transparent to-transparent" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 grid place-items-center"
            aria-label={`${title} abspielen${duration ? ` (${duration} Minuten)` : ""}`}
          >
            <span className="grid size-16 place-items-center rounded-full bg-accent text-ink shadow-lift transition-transform duration-300 group-hover:scale-110 md:size-20">
              <Play className="ml-1 size-7 fill-current md:size-8" aria-hidden="true" />
            </span>
          </button>
          {duration && (
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-petrol-deep/80 px-3 py-1 text-xs font-semibold text-white">
              ▶ {duration}
            </span>
          )}
          {active && !src && (
            <p role="status" className="absolute inset-x-3 bottom-3 rounded-btn bg-white/95 px-4 py-3 text-center text-sm font-medium text-ink">
              Platzhalter: Das Video wird vom Kunden nachgeliefert.
            </p>
          )}
        </>
      )}
    </div>
  );
}
