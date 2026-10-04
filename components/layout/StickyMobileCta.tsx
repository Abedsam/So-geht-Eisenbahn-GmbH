"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Mobil: fixierter „Jetzt bewerben“-Button, ausgeblendet solange das Quiz sichtbar ist */
export function StickyMobileCta({ targetId = "bewerben" }: { targetId?: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting || window.scrollY < 300), { threshold: 0.15 });
    io.observe(target);
    const onScroll = () => {
      const r = target.getBoundingClientRect();
      setHidden(window.scrollY < 300 || (r.top < window.innerHeight && r.bottom > 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [targetId]);

  // Schwebende Buttons (Barrierefreiheit, Nach oben) weichen der Leiste aus
  useEffect(() => {
    document.documentElement.dataset.stickyCta = hidden ? "off" : "on";
    return () => {
      delete document.documentElement.dataset.stickyCta;
    };
  }, [hidden]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-petrol-100 bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${hidden ? "translate-y-full" : ""}`}
      aria-hidden={hidden}
    >
      <a
        href={`#${targetId}`}
        tabIndex={hidden ? -1 : 0}
        className="flex w-full items-center justify-center gap-2 rounded-btn bg-accent px-5 py-3.5 font-bold text-ink"
      >
        Jetzt bewerben <ArrowUp className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
