/**
 * Mini-Tracking für die Landingpage (wie im Handoff):
 * immer `dataLayer.push`, Meta Pixel / Google Ads nur bei Consent „all“ und nur, wenn geladen.
 */
type TrackData = Record<string, unknown>;

type TrackWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export type TrackEvent = "quiz_view" | "quiz_step" | "quiz_answer" | "quiz_reject" | "lead_submit" | "lead_error" | "cta_click";

export function track(event: TrackEvent, data: TrackData = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackWindow;
  try {
    (w.dataLayer = w.dataLayer || []).push({ event, ...data });
  } catch {
    /* ignorieren */
  }
  let consent: string | null = null;
  try {
    consent = localStorage.getItem("sge-cookie-consent");
  } catch {
    consent = null;
  }
  if (consent !== "all") return;
  try {
    if (typeof w.fbq === "function") w.fbq("trackCustom", event, data);
  } catch {
    /* ignorieren */
  }
  try {
    if (typeof w.gtag === "function") w.gtag("event", event, data);
  } catch {
    /* ignorieren */
  }
}

/** Scrollt zu einer Sektion, 130 px Abstand für den fixierten Header */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: reduced ? "auto" : "smooth" });
}

/** Alle „Jetzt bewerben“-CTAs: Tracking + zum Quiz scrollen */
export function toQuiz() {
  track("cta_click", {});
  scrollToId("quiz");
}
