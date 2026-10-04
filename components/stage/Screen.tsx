import { ViewTransition, type CSSProperties, type ReactNode } from "react";

export type Tone = "petrol" | "light" | "accent" | "ink";

const tones: Record<Tone, string> = {
  petrol: "bg-petrol text-white",
  light: "bg-surface text-ink",
  accent: "bg-accent text-ink",
  ink: "bg-petrol-deep text-white",
};

type Props = {
  tone?: Tone;
  children: ReactNode;
  /** Hintergrund-Ebene (Bild, Muster, Deko) hinter dem Inhalt */
  backdrop?: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
};

const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/**
 * Eine „Station“: füllt den Bildschirm zwischen Kopf- und Fußleiste.
 * Seitenwechsel gleiten je nach Fahrtrichtung (React <ViewTransition>).
 * Nur wenn der Inhalt auf kleinen Bildschirmen nicht passt, scrollt er innerhalb der Station.
 */
export function Screen({ tone = "light", children, backdrop, className = "", width = "default" }: Props) {
  const max = width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-[1400px]" : "max-w-[1240px]";
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <section className={`relative isolate h-full overflow-hidden rounded-[22px] ${tones[tone]}`}>
        {tone === "petrol" && <div className="absolute inset-0 -z-10 bg-gradient-to-b from-petrol-light to-petrol" aria-hidden="true" />}
        {(tone === "petrol" || tone === "ink") && <div className="rails absolute inset-0 -z-10" aria-hidden="true" />}
        {backdrop}
        <div data-scrollable className="h-full overflow-y-auto overscroll-contain [scrollbar-width:thin]">
          <div className={`mx-auto flex min-h-full w-full flex-col justify-center px-4 py-5 sm:px-10 sm:py-9 lg:px-14 ${max} ${className}`}>{children}</div>
        </div>
      </section>
    </ViewTransition>
  );
}

/** Überschrift, deren Wörter nacheinander „einfahren“ */
export function Words({ text, className = "", as: Tag = "h1" }: { text: string; className?: string; as?: "h1" | "h2" | "p" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="word" aria-hidden="true">
          <span style={{ "--w": i } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** Element, das gestaffelt einblendet: `i` = Reihenfolge */
export function In({ i = 0, children, className = "", x = false, as: Tag = "div" }: { i?: number; children: ReactNode; className?: string; x?: boolean; as?: "div" | "li" | "p" }) {
  return (
    <Tag className={`${x ? "in-x" : "in"} ${className}`} style={{ "--i": i } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Große Stationsnummer als Deko */
export function StationNumber({ n, light = false }: { n: number; light?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 200"
      className={`pointer-events-none absolute -right-6 -top-8 h-44 w-auto select-none sm:h-64 lg:h-80 ${light ? "text-white/[0.06]" : "text-petrol/[0.06]"}`}
    >
      <text x="260" y="180" textAnchor="end" fontFamily="var(--font-ubuntu)" fontWeight="700" fontSize="230" fill="currentColor">
        {String(n).padStart(2, "0")}
      </text>
    </svg>
  );
}
