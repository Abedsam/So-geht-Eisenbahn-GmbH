"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { stations, type Station } from "@/content/home";
import { sectionProgress } from "./HomeHero";

const num = (i: number) => `0${i + 1}`;

function Chips({ s }: { s: Station }) {
  if (!s.chips) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {s.chips.map((c, k) => (
        <span key={c} className="flex items-center gap-2">
          <span className="rounded-md border border-blue-light/40 bg-navy/55 px-3 py-2 font-mono text-[13px] text-white">{c}</span>
          {s.sequence && k < s.chips!.length - 1 && (
            <span aria-hidden="true" className="font-bold text-blue-hover">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/** Zugreise ab 900 px: 720vh, sticky, 6 Stationen mit Fahrplan-Linie und Mini-Zug */
function PinnedJourney() {
  const wrap = useRef<HTMLElement>(null);
  const train = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [station, setStation] = useState(0);

  useEffect(() => {
    let p = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current = 0;
    const loop = () => {
      const j = wrap.current;
      // Nur rechnen, wenn die Sektion (fast) sichtbar ist
      if (j && j.offsetParent !== null) {
        p += (sectionProgress(j) - p) * 0.18;
        const st = Math.min(5, Math.floor(p * 6));
        if (st !== current) {
          current = st;
          setStation(st);
        }
        if (train.current) train.current.style.transform = `translateX(${-200 + p * (j.clientWidth + 200)}px)`;
        if (fill.current) fill.current.style.height = `calc((100% - 16px) * ${p.toFixed(4)})`;
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
    <section
      ref={wrap}
      aria-label="Deine Reise in 6 Stationen"
      className="relative hidden h-[720vh] bg-navy min-[900px]:motion-safe:block"
    >
      <div className="sticky top-0 h-svh overflow-hidden text-white">
        {stations.map((s, i) => (
          <Image
            key={s.img}
            src={s.img}
            alt={i === station ? s.alt : ""}
            aria-hidden={i !== station || undefined}
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              opacity: i === station ? 1 : 0,
              transform: i === station ? "scale(1.08)" : "scale(1)",
              transition: "opacity 1s ease, transform 6s ease-out",
            }}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,28,53,.96) 0%, rgba(7,28,53,.82) 38%, rgba(7,28,53,.2) 72%, rgba(7,28,53,.1) 100%), linear-gradient(0deg, rgba(7,28,53,.92) 0%, rgba(7,28,53,0) 28%)",
          }}
        />

        <div className="relative mx-auto grid h-full max-w-page grid-cols-[220px_minmax(0,600px)] items-center gap-[clamp(32px,5vw,80px)] px-[clamp(20px,3vw,40px)] pb-[150px] pt-[150px]">
          <ol aria-label="Fahrplan" className="relative m-0 flex list-none flex-col gap-[30px] py-0 pl-[22px] pr-0">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-0.5 bg-white/[.16]" />
            <span ref={fill} aria-hidden="true" className="absolute left-[5px] top-2 h-0 w-0.5 bg-blue-hover shadow-[0_0_12px_#1689E8]" />
            {stations.map((s, i) => (
              <li key={s.short} aria-current={i === station ? "step" : undefined} className="relative flex flex-col gap-[3px]">
                <span
                  aria-hidden="true"
                  className="absolute left-[-22px] top-1 size-3 rounded-full border-2 transition-all duration-400"
                  style={{
                    background: i <= station ? "#1689E8" : "#071C35",
                    borderColor: i <= station ? "#1689E8" : "rgba(255,255,255,.35)",
                  }}
                />
                <span className="font-mono text-[11px] tracking-[.14em] text-blue-light">HALT {num(i)}</span>
                <span
                  className="text-base font-bold transition-colors duration-400"
                  style={{ color: i === station ? "#fff" : i < station ? "#9FB6CC" : "rgba(255,255,255,.45)" }}
                >
                  {s.short}
                </span>
              </li>
            ))}
          </ol>

          <div className="relative min-h-[440px]">
            {stations.map((s, i) => {
              const on = i === station;
              return (
                <article
                  key={s.short}
                  inert={!on}
                  aria-hidden={!on || undefined}
                  className="absolute inset-0 flex flex-col justify-center gap-[22px]"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "translateY(0)" : i < station ? "translateY(-32px)" : "translateY(32px)",
                    transition: "opacity .6s ease, transform .7s cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="rounded bg-blue px-3 py-[7px] text-sm font-extrabold text-white">Gleis {num(i)}</span>
                    <span className="font-mono text-xs tracking-[.14em] text-blue-light">{s.board}</span>
                  </div>
                  <h2 className="m-0 text-[clamp(40px,5vw,72px)] font-extrabold leading-none tracking-[-.03em]">
                    <span className="mb-2 block text-[.55em] tracking-[-.01em] text-blue-light">{s.kicker}</span>
                    {s.title}
                  </h2>
                  <p className="m-0 max-w-[520px] text-[19px] leading-relaxed text-on-navy">{s.text}</p>
                  <Chips s={s} />
                  <div>
                    <Link href={s.href} className={`btn btn-primary ${s.big ? "px-8 py-5 text-[19px]" : "px-6 py-4 text-base"}`}>
                      {s.cta} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Gleis mit Mini-Zug */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-11 h-10">
          <div className="absolute inset-x-0 bottom-1.5 h-2" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,.22) 0 4px, transparent 4px 22px)" }} />
          <div className="absolute inset-x-0 bottom-3 h-0.5 bg-white/35" />
          <div className="absolute inset-x-0 bottom-1 h-0.5 bg-white/35" />
          <div ref={train} className="absolute bottom-3.5 left-0 h-[26px] w-[180px] will-change-transform" style={{ transform: "translateX(-200px)" }}>
            <div className="absolute inset-0 overflow-hidden rounded-[4px_22px_6px_4px] bg-white shadow-[0_0_24px_rgba(22,137,232,.5)]">
              <div className="absolute left-0 right-[26px] top-1.5 h-[7px]" style={{ background: "repeating-linear-gradient(90deg,#071C35 0 14px,transparent 14px 18px)" }} />
              <div className="absolute inset-x-0 bottom-[5px] h-[3px] bg-blue" />
              <div className="absolute right-1 top-[5px] h-[9px] w-4 rounded-[2px_8px_2px_2px] bg-navy" />
            </div>
            <div className="absolute -right-[3px] bottom-1 h-1 w-1.5 rounded-sm bg-[#FFE9A8] shadow-[0_0_14px_4px_rgba(255,233,168,.7)]" />
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-[100px] right-[clamp(20px,3vw,40px)] font-mono text-xs tracking-[.14em] text-blue-light">
          HALT {num(station)} / 06
        </div>
      </div>
    </section>
  );
}

/** Unter 900 px oder bei reduced-motion: gestapelte Karten */
function StackedJourney() {
  return (
    <section aria-label="Deine Reise in 6 Stationen" className="flex flex-col gap-10 bg-navy px-5 py-[72px] text-white min-[900px]:motion-safe:hidden">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-10">
        {stations.map((s, i) => (
          <article key={s.short} data-reveal="" className="flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px]">
              <Image src={s.img} alt={s.alt} fill sizes="(min-width: 760px) 720px, 100vw" className="object-cover" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="rounded bg-blue px-2.5 py-1.5 text-[13px] font-extrabold">Gleis {num(i)}</span>
              <span className="font-mono text-[11px] tracking-[.14em] text-blue-light">{s.board}</span>
            </div>
            <h2 className="m-0 text-4xl font-extrabold leading-[1.02] tracking-[-.02em]">
              <span className="mb-1.5 block text-xl text-blue-light">{s.kicker}</span>
              {s.title}
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-on-navy">{s.text}</p>
            <Chips s={s} />
            <Link href={s.href} className="btn btn-primary self-start px-[22px] py-[15px]">
              {s.cta} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <>
      <PinnedJourney />
      <StackedJourney />
    </>
  );
}
