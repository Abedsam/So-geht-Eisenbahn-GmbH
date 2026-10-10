"use client";

import { useEffect } from "react";

const EASE_DURATION = 1400;

function formatCount(el: HTMLElement, value: number) {
  const pre = el.dataset.prefix ?? "";
  const suf = el.dataset.suffix ?? "";
  return pre + Math.round(value).toLocaleString("de-DE") + suf;
}

/** Zählt `data-count` in 1,4 s (easeOutCubic) hoch */
function runCount(el: HTMLElement, reduced: boolean) {
  const to = parseFloat(el.dataset.count ?? "0");
  if (reduced) {
    el.textContent = formatCount(el, to);
    return;
  }
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / EASE_DURATION);
    el.textContent = formatCount(el, to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Globale Scroll-Reveals (wie site.js im Design):
 * `data-reveal` blendet ein, `data-reveal-delay` verzögert (ms), `data-count` zählt hoch.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute("data-reveal")) el.classList.add("is-in");
          if (el.hasAttribute("data-count")) runCount(el, reduced);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const prep = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      io.observe(el);
    };

    let queued = 0;
    const scan = () => {
      queued = 0;
      document.querySelectorAll<HTMLElement>("[data-reveal],[data-count]").forEach(prep);
    };
    const queue = () => {
      if (!queued) queued = requestAnimationFrame(scan);
    };
    scan();
    const mo = new MutationObserver(queue);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
