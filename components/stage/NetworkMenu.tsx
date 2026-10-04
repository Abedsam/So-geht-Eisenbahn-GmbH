"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { direction, siteLines } from "@/content/lines";
import { site } from "@/content/site";

/** Menü als Liniennetzplan: jede Rubrik ist eine Linie mit ihren Stationen */
export function NetworkMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={openRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="netzplan"
        className="group flex items-center gap-2.5 rounded-full border border-white/20 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition-colors hover:border-white"
      >
        <span className="hidden sm:inline">Netzplan</span>
        <span className="grid size-8 place-items-center rounded-full bg-white text-ink" aria-hidden="true">
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M3 6h14M3 14h14" />
            <circle cx="7" cy="6" r="1.6" fill="currentColor" />
            <circle cx="13" cy="14" r="1.6" fill="currentColor" />
          </svg>
        </span>
        <span className="sr-only">Menü öffnen</span>
      </button>

      <div
        id="netzplan"
        role="dialog"
        aria-modal="true"
        aria-label="Netzplan – alle Seiten"
        hidden={!open}
        className="fixed inset-0 z-[70] overflow-y-auto bg-frame text-white [animation:clip-circle_.6s_cubic-bezier(.65,0,.35,1)_both]"
      >
        <div className="rails pointer-events-none fixed inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-10 sm:py-10">
          <div className="flex items-center justify-between">
            <p className="kicker text-white/80">Netzplan · So geht Eisenbahn</p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-white text-ink transition-transform hover:rotate-90"
              aria-label="Menü schließen"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col gap-5 sm:gap-6">
            {siteLines.map((line, li) => (
              <li key={line.id} className="in-x grid gap-3 sm:grid-cols-[17rem_1fr] sm:items-center" style={{ ["--i" as string]: li }}>
                <Link
                  href={line.stations[0].href}
                  transitionTypes={[direction(pathname, line.stations[0].href)]}
                  className="group flex items-center gap-3"
                >
                  <span className="grid h-8 min-w-11 place-items-center rounded-md px-2 font-heading text-sm font-bold text-ink" style={{ background: line.color }}>
                    {line.code}
                  </span>
                  <span className="font-heading text-xl font-bold group-hover:underline sm:text-2xl">{line.label}</span>
                </Link>
                {/* Linie mit Stationen */}
                <ol className="relative flex flex-wrap items-center gap-x-1 gap-y-3 pl-1">
                  <span className="absolute left-0 right-0 top-[11px] hidden h-1 rounded-full opacity-60 sm:block" style={{ background: line.color }} aria-hidden="true" />
                  {line.stations.map((s) => {
                    const current = s.href === pathname;
                    return (
                      <li key={s.href} className="relative">
                        <Link
                          href={s.href}
                          transitionTypes={[direction(pathname, s.href)]}
                          aria-current={current ? "page" : undefined}
                          className={`group relative flex items-center gap-2 rounded-full bg-frame py-0.5 pl-0.5 pr-3 text-sm transition-colors hover:text-accent ${current ? "font-bold text-accent" : "text-white/85"}`}
                        >
                          <span className="block size-5 rounded-full border-[3px] bg-frame transition-transform group-hover:scale-110" style={{ borderColor: line.color, background: current ? line.color : undefined }} />
                          {s.label}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <address className="flex flex-col gap-2 text-sm not-italic text-white/80">
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" aria-hidden="true" /> {site.address.street}, {site.address.zip} {site.address.city}
              </span>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4 text-accent" aria-hidden="true" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-accent" aria-hidden="true" /> {site.email}
              </a>
            </address>
            <Link href="/lokfuehrer-werden" className="btn btn-accent">
              Lokführer werden – in 2 Minuten bewerben
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
