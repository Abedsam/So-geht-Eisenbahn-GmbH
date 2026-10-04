import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  text?: ReactNode;
  eyebrow?: string;
  /** Hintergrundbild mit Petrol-Overlay; ohne Bild: Petrol-Verlauf */
  image?: { src: string; alt: string };
  actions?: ReactNode;
  /** Rechte Spalte (z. B. Video oder Liste) */
  aside?: ReactNode;
  size?: "lg" | "md";
  children?: ReactNode;
};

export function Hero({ title, text, eyebrow, image, actions, aside, size = "lg", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-petrol text-white">
      {image ? (
        <>
          <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="-z-20 object-cover" />
          {/* Petrol-Overlay für Lesbarkeit (WCAG AA) */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-petrol via-petrol/85 to-petrol/40" aria-hidden="true" />
        </>
      ) : (
        <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
      )}
      <div className="rail-pattern pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />

      <div className={`container-page grid items-center gap-10 ${aside ? "lg:grid-cols-[1.05fr_1fr] lg:gap-14" : ""} ${size === "lg" ? "py-16 md:py-24 lg:py-28" : "py-14 md:py-20"}`}>
        <div className="flex max-w-2xl flex-col gap-5 animate-rise">
          {eyebrow && <p className="eyebrow text-white/90 before:bg-accent">{eyebrow}</p>}
          <h1 className={`font-bold tracking-tight text-white ${size === "lg" ? "text-4xl md:text-5xl lg:text-[3.4rem]" : "text-4xl md:text-5xl"}`}>{title}</h1>
          {text && <div className="text-lg text-white/90 md:text-xl">{text}</div>}
          {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {aside && <div className="relative animate-rise [animation-delay:120ms]">{aside}</div>}
      </div>
    </section>
  );
}
