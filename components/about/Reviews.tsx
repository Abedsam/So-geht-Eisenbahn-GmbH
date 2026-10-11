import { reviews, type Review } from "@/content/about-page";

// Zwei Reihen, die gegenläufig durchlaufen
const half = Math.ceil(reviews.length / 2);
const rows = [reviews.slice(0, half), reviews.slice(half)];

/** Sekunden pro Durchlauf – ca. 45 px pro Sekunde bei 376 px Kartenbreite inkl. Abstand */
const durationFor = (count: number) => `${Math.round((count * 376) / 45)}s`;

function ReviewCard({ r, hidden }: { r: Review; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="w-[360px] shrink-0">
      <figure className="m-0 flex h-full flex-col gap-4 rounded-card border border-line bg-bg p-6">
        <div className="flex items-center justify-between">
          <span role="img" aria-label="5 von 5 Sternen" className="text-lg tracking-[2px] text-star">
            ★★★★★
          </span>
          <span className="font-mono text-[11px] tracking-[.12em] text-muted">GOOGLE</span>
        </div>
        {/* Langer Text wird optisch auf 5 Zeilen gekürzt, bleibt aber vollständig für Screenreader */}
        <blockquote className="m-0 line-clamp-5 flex-1 text-base leading-[1.6]">„{r.text}“</blockquote>
        <figcaption className="flex items-center gap-3">
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue font-extrabold text-white">
            {r.name.trim()[0].toUpperCase()}
          </span>
          <span className="flex flex-col">
            <strong className="text-[15px]">{r.name}</strong>
            <span className="text-[13px] text-muted">{r.date}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Google-Bewertungen als durchlaufendes Band (pausiert bei Hover, ohne Animation bei „Bewegung reduzieren“) */
export function Reviews() {
  return (
    <div className="marquee-mask flex flex-col gap-4">
      {rows.map((row, ri) => (
        <div key={ri} className="group overflow-hidden motion-reduce:overflow-x-auto">
          <ul
            aria-label={ri === 0 ? `${reviews.length} Google-Bewertungen` : undefined}
            className="m-0 flex w-max animate-marquee list-none items-stretch gap-4 p-0 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: durationFor(row.length), animationDirection: ri === 1 ? "reverse" : "normal" }}
          >
            {row.map((r, i) => (
              <ReviewCard key={`a-${i}`} r={r} />
            ))}
            {/* Kopie für die nahtlose Schleife */}
            {row.map((r, i) => (
              <ReviewCard key={`b-${i}`} r={r} hidden />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
