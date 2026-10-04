"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "sge:storage";
// Fallback, falls localStorage gesperrt ist (z. B. privates Fenster): Werte gelten dann für die Sitzung
const memory = new Map<string, string>();

function read(key: string): string | null {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/**
 * Liest einen Wert aus localStorage, ohne setState im Effect.
 * Auf dem Server (und beim ersten Hydrieren) ist der Wert `undefined`.
 */
export function useStoredValue(key: string): [string | null | undefined, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => undefined,
  );
  const set = useCallback(
    (v: string) => {
      memory.set(key, v);
      try {
        localStorage.setItem(key, v);
      } catch {
        /* nur im Speicher behalten */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );
  return [value, set];
}

export function parseJson<T>(raw: string | null | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const noop = () => () => {};

/** Heutiges Datum (YYYY-MM-DD) nur im Browser – auf dem Server leer, damit statische Seiten keine veralteten Termine enthalten */
export function useClientToday(): string {
  return useSyncExternalStore(
    noop,
    () => new Date().toDateString(),
    () => "",
  );
}
