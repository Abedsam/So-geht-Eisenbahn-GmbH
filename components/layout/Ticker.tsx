import Link from "next/link";
import { ticker } from "@/content/site";

/** Endlos laufendes Info-Band ganz oben (pausiert bei Hover/Fokus, statisch bei reduzierter Bewegung) */
export function Ticker() {
  const items = [...ticker, ...ticker, ...ticker];
  return (
    <div className="group relative overflow-hidden bg-accent text-ink" role="region" aria-label="Aktuelle Hinweise">
      <ul className="flex w-max animate-marquee py-2 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {[...items, ...items].map((t, i) => (
          <li key={i} className="flex items-center whitespace-nowrap px-6 text-sm" aria-hidden={i >= ticker.length ? true : undefined}>
            <span className="mr-2" aria-hidden="true">
              {t.icon}
            </span>
            <span className="font-semibold">{t.text}</span>
            <Link href={t.href} className="ml-2 font-bold underline-offset-2 hover:underline" tabIndex={i >= ticker.length ? -1 : undefined}>
              → {t.cta}
            </Link>
            <span className="ml-12 size-1.5 rounded-full bg-ink/40" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
