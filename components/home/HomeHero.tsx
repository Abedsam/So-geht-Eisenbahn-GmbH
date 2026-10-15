"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { nextCourseStart } from "@/content/site";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Fortschritt (0–1) beim Durchscrollen einer Sektion mit Sticky-Inhalt */
export function sectionProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const t = r.height - window.innerHeight;
  return t > 0 ? clamp(-r.top / t, 0, 1) : 0;
}

/**
 * Scroll-Hero: 260vh hoch, Inhalt sticky. Bild zoomt, Titel verschwimmt,
 * Tagline „Einsteigen, bitte.“ erscheint, Fortschrittsbalken unten.
 */
export function HomeHero() {
  const wrap = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let p = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const loop = () => {
      if (wrap.current) {
        p += (sectionProgress(wrap.current) - p) * 0.16;
        if (img.current) img.current.style.transform = `scale(${1.02 + p * 0.22}) translateY(${p * -2}%)`;
        const ti = title.current;
        if (ti) {
          const t = 1 - clamp(p / 0.35, 0, 1);
          ti.style.opacity = String(t);
          ti.style.transform = `translateY(${(1 - t) * -28}px) scale(${0.96 + t * 0.04})`;
          ti.style.filter = t > 0.995 ? "" : `blur(${(1 - t) * 10}px)`;
          ti.style.pointerEvents = t < 0.5 ? "none" : "";
          ti.style.visibility = t < 0.01 ? "hidden" : "";
        }
        const tg = tag.current;
        if (tg) {
          const t = clamp((p - 0.55) / 0.3, 0, 1);
          tg.style.opacity = String(t);
          tg.style.transform = `translateY(${(1 - t) * 22}px)`;
          tg.style.filter = t > 0.995 ? "" : `blur(${(1 - t) * 8}px)`;
        }
        if (hint.current) hint.current.style.opacity = p > 0.01 ? "0" : "1";
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      }
      if (document.hidden) timer = setTimeout(loop, 32);
      else raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={wrap} aria-label="Gleiswechsel in deine Zukunft" className="relative h-[260vh] bg-navy motion-reduce:h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Image
          ref={img}
          src={asset("/assets/hero-zug.png")}
          alt="Moderner blau-weißer Zug von So geht Eisenbahn fährt im Abendlicht an einem Bahnsteig ein"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="origin-[28%_58%] object-cover object-[28%_50%] will-change-transform"
          style={{ transform: "scale(1.02)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(7,28,53,.9) 0%, rgba(7,28,53,.62) 34%, rgba(7,28,53,.08) 64%, rgba(7,28,53,0) 100%), linear-gradient(180deg, rgba(7,28,53,.55) 0%, rgba(7,28,53,0) 22%, rgba(7,28,53,0) 70%, rgba(7,28,53,.7) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 min-[900px]:hidden"
          style={{ background: "linear-gradient(0deg, rgba(7,28,53,.95) 0%, rgba(7,28,53,.6) 50%, rgba(7,28,53,.2) 100%)" }}
        />

        <div
          ref={title}
          className="absolute inset-0 flex items-center justify-end px-[clamp(20px,6vw,96px)] pb-[120px] pt-[150px] will-change-[transform,filter,opacity]"
        >
          <div className="flex max-w-[640px] flex-col gap-[26px] text-white">
            <div className="flex items-center gap-3 self-start rounded-md border border-blue-light/35 bg-navy/70 px-3 py-2 font-mono text-xs tracking-[.12em] text-blue-light">
              <span className="size-2 shrink-0 rounded-full bg-blue-hover shadow-[0_0_10px_#1689E8]" />
              ABFAHRT {nextCourseStart} · GLEIS 1 · GELSENKIRCHEN
            </div>
            <h1 className="m-0 text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[.96] tracking-[-.03em]">Gleiswechsel in deine Zukunft.</h1>
            <p className="m-0 max-w-[540px] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-on-navy">
              Starte deine Karriere in der Eisenbahnbranche – mit praxisnaher Ausbildung, persönlicher Betreuung und starken Partnern.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/lokfuehrer-werden" className="btn btn-primary btn-lg">
                Lokführer werden <span aria-hidden="true">→</span>
              </Link>
              <Link href="/ausbildungen" className="btn btn-ghost-dark btn-lg">
                Ausbildungen entdecken
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={tag}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end px-[clamp(20px,6vw,96px)] opacity-0"
        >
          <div className="flex max-w-[640px] flex-col gap-3.5 text-white">
            <span className="font-mono text-[13px] tracking-[.16em] text-blue-light">TÜREN SCHLIESSEN SELBSTTÄTIG</span>
            <span className="text-[clamp(40px,5.4vw,80px)] font-extrabold leading-none tracking-[-.03em]">Einsteigen, bitte.</span>
            <span className="text-[clamp(18px,1.6vw,22px)] leading-normal text-on-navy">Deine Fahrt in die Eisenbahnbranche beginnt jetzt.</span>
          </div>
        </div>

        <div
          ref={hint}
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-xs tracking-[.3em] text-white/80 transition-opacity duration-400 motion-reduce:hidden"
        >
          <span className="h-7 w-[1.5px] animate-hint bg-current" />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/[.12]">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue to-blue-hover" />
        </div>
      </div>
    </section>
  );
}
