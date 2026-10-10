"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site, ticker } from "@/content/site";
import { Logo } from "./Logo";

// Laufband: 3× die Einträge, dann verdoppelt für eine nahtlose Schleife
const tickerSet = [...ticker, ...ticker, ...ticker];
const tickerLoop = [...tickerSet, ...tickerSet];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let last = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(64, now - last);
      last = now;
      const tr = trackRef.current;
      if (tr) {
        const half = tr.scrollWidth / 2;
        if (!paused.current && half > 0) {
          x -= dt * 0.05;
          if (-x >= half) x += half;
        }
        tr.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      if (document.hidden) timer = setTimeout(tick, 32);
      else raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  const pause = () => (paused.current = true);
  const play = () => (paused.current = false);

  return (
    <div
      role="region"
      aria-label="Aktuelle Termine"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
      className="flex h-10 items-center overflow-hidden border-b border-line bg-white text-navy"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {tickerLoop.map((t, i) => {
          const dup = i >= ticker.length;
          return (
            <span key={i} aria-hidden={dup || undefined} className="flex items-center gap-2 whitespace-nowrap px-10 text-[15px]">
              <span className="size-2 rounded-full bg-blue" />
              <strong className="font-extrabold">{t.title}</strong>
              <span>{t.text}</span>
              <span aria-hidden="true">→</span>
              <Link
                href={t.href}
                tabIndex={dup ? -1 : undefined}
                className="font-extrabold text-blue underline underline-offset-[3px] hover:text-blue-hover"
              >
                {t.cta}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Bei Seitenwechsel Menüs schließen (State während des Renderns anpassen statt im Effect)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setMenu(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[.08] bg-navy/90 backdrop-blur-[14px]">
      <Ticker />
      <nav aria-label="Hauptnavigation" className="mx-auto flex h-[76px] max-w-page items-center justify-between gap-6 px-[clamp(16px,3vw,40px)]">
        <Logo onClick={() => setMenu(false)} />

        <ul className="m-0 hidden list-none items-center gap-[clamp(14px,1.7vw,28px)] p-0 min-[1240px]:flex">
          {navigation.map((it) => {
            const active = isActive(pathname, it.href);
            const expanded = open === it.label && !!it.children;
            return (
              <li
                key={it.href}
                className="relative"
                onMouseEnter={() => setOpen(it.label)}
                onMouseLeave={() => setOpen(null)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
                }}
              >
                <Link
                  href={it.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={it.children ? "true" : undefined}
                  aria-expanded={it.children ? expanded : undefined}
                  onFocus={() => setOpen(it.label)}
                  className={`relative flex h-[76px] items-center gap-[7px] whitespace-nowrap text-[15px] font-semibold no-underline hover:text-white ${
                    active ? "text-white" : "text-white/[.76]"
                  }`}
                >
                  {it.label}
                  {it.children && (
                    <span aria-hidden="true" className="size-1.5 translate-y-[-3px] rotate-45 border-b-[1.5px] border-r-[1.5px] border-current" />
                  )}
                  <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[3px] rounded-t-sm ${active ? "bg-blue-hover" : "bg-transparent"}`} />
                </Link>
                {it.children && (
                  <div className={`absolute left-[-16px] top-full pt-1.5 ${expanded ? "block" : "hidden"}`}>
                    <ul className="m-0 flex min-w-[280px] list-none flex-col rounded-xl bg-white p-2 shadow-menu">
                      {it.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="flex flex-col gap-0.5 rounded-btn px-3.5 py-3 text-navy no-underline hover:bg-bg hover:text-blue"
                          >
                            <span className="text-[15px] font-bold">{c.label}</span>
                            <span className="text-[13px] text-muted">{c.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/lokfuehrer-werden"
            className="hidden items-center gap-2.5 whitespace-nowrap rounded-btn bg-blue px-5 py-3 text-[15px] font-bold text-white no-underline hover:bg-blue-hover hover:text-white min-[520px]:flex"
          >
            Lokführer werden <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            className="flex size-[46px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-btn border border-white/20 bg-transparent text-white min-[1240px]:hidden"
          >
            <span className={`h-0.5 w-5 rounded-[1px] bg-white transition-transform ${menu ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 rounded-[1px] bg-white transition-opacity ${menu ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded-[1px] bg-white transition-[transform,width] ${menu ? "w-5 -translate-y-[7px] -rotate-45" : "w-3.5"}`} />
          </button>
        </div>
      </nav>

      {menu && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-116px)] overflow-y-auto overscroll-contain bg-navy px-[clamp(16px,4vw,32px)] pb-10 pt-4 min-[1240px]:hidden">
          <ul className="m-0 flex list-none flex-col p-0">
            {navigation.map((it, i) => (
              <li key={it.href} className="border-b border-white/10 py-1.5">
                <Link
                  href={it.href}
                  aria-current={isActive(pathname, it.href) ? "page" : undefined}
                  onClick={() => setMenu(false)}
                  className="flex items-center justify-between py-3.5 text-[22px] font-bold text-white no-underline hover:text-blue-light"
                >
                  {it.label} <span className="font-mono text-xs text-blue-light">0{i + 1}</span>
                </Link>
                {it.children && (
                  <ul className="m-0 mb-2.5 flex list-none flex-wrap gap-2 p-0">
                    {it.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setMenu(false)}
                          className="block rounded-full border border-white/[.18] px-3.5 py-[9px] text-sm font-semibold text-on-navy-footer no-underline hover:border-blue-light hover:text-white"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/lokfuehrer-werden"
            onClick={() => setMenu(false)}
            className="btn btn-primary btn-lg mt-7 w-full justify-center min-[520px]:hidden"
          >
            Lokführer werden <span aria-hidden="true">→</span>
          </Link>
          <div className="mt-7 flex flex-col gap-1.5 text-[15px] text-on-navy-footer">
            <a href={site.phoneHref} className="font-bold text-white hover:text-blue-light">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="text-on-navy-footer hover:text-white">
              {site.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
