import Link from "next/link";

/** Platzhalter-Logo „SGE – So geht Eisenbahn“ – durch das echte Logo (SVG) ersetzen */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const color = light ? "text-white" : "text-petrol";
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${color} ${className}`} aria-label="So geht Eisenbahn – zur Startseite">
      <svg viewBox="0 0 48 28" className="h-7 w-12 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true">
        <path d="M14 2h32l-6 7H8l6-7Z" fill="currentColor" />
        <path d="M8 11h30l-5 6H3l5-6Z" fill="currentColor" opacity=".8" />
        <path d="M3 19h28l-5 7H0l3-7Z" fill="currentColor" opacity=".6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-2xl font-bold tracking-tight">SGE</span>
        <span className="mt-1 hidden whitespace-nowrap min-[400px]:block text-[0.55rem] font-semibold uppercase tracking-[0.22em] opacity-90 sm:tracking-[0.28em]">So geht Eisenbahn</span>
      </span>
    </Link>
  );
}
