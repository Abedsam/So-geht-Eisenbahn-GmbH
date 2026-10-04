"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { locate } from "@/content/lines";

const LOCK_MS = 900;

/**
 * Seitenwechsel statt Scrollen:
 * Mausrad / Trackpad, Pfeiltasten, Bild-auf/ab und Wischgesten führen zur nächsten bzw. vorherigen Station.
 * Kann eine Station auf kleinen Bildschirmen intern scrollen, wird zuerst bis zum Rand gescrollt.
 */
export function StageNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const locked = useRef(false);
  const wheelSum = useRef(0);

  useEffect(() => {
    const pos = locate(pathname);
    if (!pos) return;
    if (pos.next) router.prefetch(pos.next.href);
    if (pos.prev) router.prefetch(pos.prev.href);

    const go = (dir: 1 | -1) => {
      const target = dir === 1 ? pos.next : pos.prev;
      if (!target || locked.current) return;
      locked.current = true;
      router.push(target.href, { transitionTypes: [dir === 1 ? "nav-forward" : "nav-back"] });
      window.setTimeout(() => (locked.current = false), LOCK_MS);
    };

    // Kann der Bereich unter dem Zeiger noch in diese Richtung scrollen?
    const canScroll = (el: EventTarget | null, dir: 1 | -1) => {
      for (let n = el as HTMLElement | null; n && n !== document.body; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 2) {
          return dir === 1 ? n.scrollTop + n.clientHeight < n.scrollHeight - 2 : n.scrollTop > 2;
        }
      }
      return false;
    };

    const blocked = () => document.querySelector("#netzplan:not([hidden]), [role='dialog'][aria-modal='true']:not([hidden])");

    const onWheel = (e: WheelEvent) => {
      if (blocked() || e.ctrlKey) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (canScroll(e.target, dir)) return;
      wheelSum.current += e.deltaY;
      if (Math.abs(wheelSum.current) > 60) {
        wheelSum.current = 0;
        go(dir);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (blocked() || e.altKey || e.ctrlKey || e.metaKey) return;
      if (t.closest("input, textarea, select, [contenteditable], [data-keys]")) return;
      if (["ArrowRight", "PageDown"].includes(e.key) || (e.key === "ArrowDown" && !canScroll(t, 1))) {
        e.preventDefault();
        go(1);
      } else if (["ArrowLeft", "PageUp"].includes(e.key) || (e.key === "ArrowUp" && !canScroll(t, -1))) {
        e.preventDefault();
        go(-1);
      }
    };

    let start: { x: number; y: number; t: EventTarget | null } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: e.target };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!start || blocked()) return;
      const dx = e.changedTouches[0].clientX - start.x;
      const dy = e.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if ((start.t as HTMLElement | null)?.closest("[data-keys], input, textarea, select")) return;
        go(dx < 0 ? 1 : -1);
      } else if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx) * 1.4) {
        const dir: 1 | -1 = dy < 0 ? 1 : -1;
        if (!canScroll(start.t, dir)) go(dir);
      }
      start = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname, router]);

  return null;
}
