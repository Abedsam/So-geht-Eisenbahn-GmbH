"use client";

import { useEffect, useSyncExternalStore } from "react";

const NAME_KEY = "sge-lead-name";
const noop = () => () => {};

function readName(): string {
  try {
    return sessionStorage.getItem(NAME_KEY) || "";
  } catch {
    return "";
  }
}

/** Überschrift: auf dem Server generisch, im Browser mit Vornamen aus sessionStorage (vom Bewerbungs-Quiz gesetzt) */
export function ThankYouHeadline({ className }: { className?: string }) {
  const name = useSyncExternalStore(noop, readName, () => "");

  useEffect(() => {
    try {
      const w = window as Window & { dataLayer?: unknown[] };
      (w.dataLayer = w.dataLayer || []).push({ event: "lead_thankyou" });
    } catch {
      /* Tracking optional */
    }
  }, []);

  return <h1 className={className}>{name ? `Danke, ${name}! 🎉` : "Vielen Dank! 🎉"}</h1>;
}
