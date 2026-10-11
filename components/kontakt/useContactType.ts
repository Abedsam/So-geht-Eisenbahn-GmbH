"use client";

import { useSyncExternalStore } from "react";
import { type ContactType, defaultContactType, isContactType } from "@/content/kontakt";

/*
 * Gewähltes Anliegen = Hash der URL (#lokfuehrer, #infoveranstaltung, #allgemein).
 * Next.js navigiert per history.pushState – dabei feuert kein `hashchange`. Deshalb werden
 * Klicks auf Links zu dieser Seite mit Anliegen-Hash (z. B. aus dem Header-Laufband) zusätzlich
 * abgefangen und als „override“ gemerkt, bis der Browser wieder navigiert (hashchange/popstate).
 */

let override: ContactType | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const trimSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

function fromHash(): ContactType | null {
  const h = decodeURIComponent(window.location.hash.slice(1));
  return isContactType(h) ? h : null;
}

function onNavigate() {
  override = null;
  emit();
}

function onClick(e: MouseEvent) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!a || (a.target && a.target !== "_self")) return;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin || trimSlash(url.pathname) !== trimSlash(window.location.pathname)) return;
  const h = decodeURIComponent(url.hash.slice(1));
  if (!isContactType(h)) return;
  override = h;
  emit();
}

function subscribe(callback: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("hashchange", onNavigate);
    window.addEventListener("popstate", onNavigate);
    document.addEventListener("click", onClick, true);
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      window.removeEventListener("hashchange", onNavigate);
      window.removeEventListener("popstate", onNavigate);
      document.removeEventListener("click", onClick, true);
      override = null;
    }
  };
}

const getSnapshot = (): ContactType => override ?? fromHash() ?? defaultContactType;
const getServerSnapshot = (): ContactType => defaultContactType;

/** Anliegen per Hash lesen; auf dem Server (und beim Hydrieren) immer „allgemein“ wie im Template */
export function useContactType(): [ContactType, (type: ContactType) => void] {
  const type = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const select = (next: ContactType) => {
    override = next;
    window.history.replaceState(null, "", `#${next}`);
    emit();
  };
  return [type, select];
}
