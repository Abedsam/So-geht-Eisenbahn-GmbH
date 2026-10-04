"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Dezente Einblend-Animation für `.reveal`-Elemente.
 * Alles, was beim Laden schon sichtbar ist, bleibt sofort sichtbar (kein Flackern, gute LCP/Kontraste);
 * nur Inhalte weiter unten blenden beim Scrollen ein. Ohne JS oder bei reduzierter Bewegung: keine Animation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    const vh = window.innerHeight;
    for (const el of elements) {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-visible");
    }
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    elements.filter((el) => !el.classList.contains("is-visible")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
