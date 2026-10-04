"use client";

import { Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type AccordionItem = { title: string; content: ReactNode; badge?: ReactNode };

type Props = { items: AccordionItem[]; defaultOpen?: number | null; variant?: "cards" | "lines"; className?: string };

/** Tastaturbedienbares Akkordeon nach WAI-ARIA (Pfeiltasten, Pos1/Ende) */
export function Accordion({ items, defaultOpen = 0, variant = "cards", className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const map: Record<string, number> = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last };
    if (e.key in map) {
      e.preventDefault();
      buttons.current[map[e.key]]?.focus();
    }
  };

  const cards = variant === "cards";
  return (
    <div className={`flex flex-col ${cards ? "gap-3" : ""} ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.title}
            className={
              cards
                ? `rounded-card bg-white transition-shadow ${isOpen ? "shadow-lift" : "shadow-card"}`
                : "border-b border-petrol-100 first:border-t"
            }
          >
            <h3 className="font-sans text-base">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={`${id}-btn-${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`flex w-full items-center justify-between gap-4 text-left font-semibold text-ink ${cards ? "px-5 py-4 md:px-6 md:py-5" : "py-5"}`}
              >
                <span className="flex flex-wrap items-center gap-2">
                  {item.title}
                  {item.badge}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-8 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300 ${
                    isOpen ? "rotate-45 bg-accent text-ink" : "bg-petrol-50 text-petrol"
                  }`}
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel-${i}`}
              role="region"
              aria-labelledby={`${id}-btn-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              // `inert` blendet zugeklappte Inhalte für Tastatur und Screenreader aus
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className={`text-ink/80 ${cards ? "px-5 pb-5 md:px-6" : "pb-6"}`}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
