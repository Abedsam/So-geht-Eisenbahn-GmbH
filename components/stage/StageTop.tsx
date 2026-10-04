"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { A11yMenu } from "@/components/layout/A11yMenu";
import { Logo } from "@/components/ui/Logo";
import { locate } from "@/content/lines";
import { nextCourseStart, site } from "@/content/site";
import { NetworkMenu } from "./NetworkMenu";

/** Kopfleiste: Logo, aktuelle Linie, Kontakt, Netzplan */
export function StageTop({ variant }: { variant: "site" | "landing" }) {
  const pos = locate(usePathname());
  const landing = variant === "landing";

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center gap-3 px-3 text-white sm:gap-4 sm:px-5" style={{ viewTransitionName: "stage-top" }}>
      <Logo light />

      {pos && (
        <p className="hidden items-center gap-2 rounded-full bg-white/[0.07] py-1 pl-1 pr-3 text-sm md:flex">
          <span className="grid h-6 min-w-8 place-items-center rounded-full px-2 font-heading text-xs font-bold text-ink" style={{ background: pos.line.color }}>
            {pos.line.code}
          </span>
          <span className="text-white/90">{pos.line.label}</span>
          <span className="text-white/45">
            · {pos.index + 1}/{pos.line.stations.length}
          </span>
        </p>
      )}

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {landing ? (
          // Platzhalter-Badge „Anerkannte Stelle – Eisenbahn-Bundesamt“
          <span className="hidden items-center gap-2 rounded-lg border border-white/20 px-2.5 py-1.5 text-[0.65rem] leading-tight text-white/80 sm:flex">
            <span className="flex h-6 w-1.5 flex-col overflow-hidden rounded-sm" aria-hidden="true">
              <span className="flex-1 bg-black" />
              <span className="flex-1 bg-red-600" />
              <span className="flex-1 bg-yellow-400" />
            </span>
            <span>
              <strong className="block text-[0.7rem] text-white">Eisenbahn-Bundesamt</strong>
              Anerkannte Stelle §§ 14/15 TfV
            </span>
          </span>
        ) : (
          <span className="hidden items-center gap-2 rounded-full border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent lg:flex">
            <span className="pulse size-2 rounded-full bg-accent" aria-hidden="true" />
            Kursstart {nextCourseStart}
          </span>
        )}
        <a href={site.phoneHref} className="hidden size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-white sm:grid" aria-label={`Anrufen: ${site.phone}`}>
          <Phone className="size-4" aria-hidden="true" />
        </a>
        <A11yMenu />
        {landing ? (
          <Link href="/lokfuehrer-werden/bewerben" transitionTypes={["nav-forward"]} className="btn btn-accent px-4 py-2 text-sm">
            Jetzt bewerben
          </Link>
        ) : (
          <>
            <Link href="/lokfuehrer-werden" className="btn btn-accent hidden px-4 py-2 text-sm sm:inline-flex">
              Lokführer werden
            </Link>
            <NetworkMenu />
          </>
        )}
      </div>
    </header>
  );
}
