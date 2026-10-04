"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      aria-label="Nach oben"
      tabIndex={visible ? 0 : -1}
      className={`fab fixed bottom-6 right-4 z-30 grid size-12 place-items-center rounded-btn bg-petrol text-white shadow-lift transition-[opacity,transform,bottom] duration-300 hover:bg-petrol-dark md:right-6 ${visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
