"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { choiceQuestions, rejectTexts, type AnswerKey, type QuizStepId, type QuizTarget, type RejectKey } from "@/content/bewerben";
import { site } from "@/content/site";
import { useStoredValue } from "@/lib/useStoredValue";
import { toQuiz, track, scrollToId } from "./track";

type Contact = { name: string; email: string; phone: string };
type ContactKey = keyof Contact;
type Errors = Partial<Record<ContactKey | "privacy", string>>;

const WEBHOOK_URL = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ?? "";

const STEP_NUM: Partial<Record<QuizStepId, number>> = { q1: 1, q2: 2, q3: 3, q4: 4, q5: 5, loading: 5, contact: 6, error: 6 };

const CONTACT_FIELDS: { key: ContactKey; label: string; type: string; ac: string; im?: "tel" | "email" }[] = [
  { key: "name", label: "Vollständiger Name*", type: "text", ac: "name" },
  { key: "email", label: "E-Mail*", type: "email", ac: "email", im: "email" },
  { key: "phone", label: "Telefon / Mobil*", type: "tel", ac: "tel", im: "tel" },
];

const headingCls = "m-0 font-extrabold tracking-[-.02em] focus:outline-none";
const inputBase =
  "w-full rounded-btn border-[1.5px] bg-bg px-4 font-sans text-base font-normal text-navy focus:border-blue focus:bg-white focus:shadow-[0_0_0_3px_rgba(22,137,232,.25)] focus:outline-none focus-visible:outline-none";
const primaryBtn = "flex cursor-pointer items-center gap-2.5 rounded-btn border-0 bg-blue font-sans font-bold text-white hover:bg-blue-hover";

/** Scroll-Status für den Sticky-CTA (ohne setState im Effect) */
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const useScrolledPast = (y: number) =>
  useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > y,
    () => false,
  );

/**
 * Bewerbungs-Quiz (State Machine laut Handoff):
 * q1 → q2 → q3 → q4 (Freitext) → q5 → loading (2 s) → contact → /danke bzw. error.
 * Absagen bei „angestellt“ (q1) und Deutsch A1/A2 (q3).
 */
export function Quiz() {
  const router = useRouter();
  const uid = useId();
  const [step, setStep] = useState<QuizStepId>("q1");
  const [history, setHistory] = useState<QuizStepId[]>([]);
  const [answers, setAnswers] = useState<Partial<Record<AnswerKey, string>>>({});
  const [lastJob, setLastJob] = useState("");
  const [lastJobError, setLastJobError] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [privacy, setPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const [rejectKey, setRejectKey] = useState<RejectKey | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevStep = useRef<QuizStepId>(step);

  const [consent] = useStoredValue("sge-cookie-consent");
  const scrolled = useScrolledPast(600);

  useEffect(() => {
    track("quiz_view", { step: "q1" });
    return () => clearTimeout(loadingTimer.current);
  }, []);

  // Schrittwechsel: Slide-in (420 ms) + Fokus auf die neue Überschrift
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    const body = bodyRef.current;
    if (!body) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && typeof body.animate === "function") {
      body.animate([{ opacity: 0, transform: "translateX(24px)" }, { opacity: 1, transform: "none" }], {
        duration: 420,
        easing: "cubic-bezier(.2,.7,.2,1)",
      });
    }
    body.querySelector<HTMLElement>("[data-quiz-focus]")?.focus({ preventScroll: true });
  }, [step]);

  const go = (next: QuizTarget | "q5") => {
    setHistory((h) => h.concat(step));
    if (next.startsWith("reject:")) {
      const k = next.slice(7) as RejectKey;
      setRejectKey(k);
      setStep("reject");
      track("quiz_reject", { reason: k });
      return;
    }
    const target = next as QuizStepId;
    setStep(target);
    track("quiz_step", { step: target });
    if (target === "loading") {
      clearTimeout(loadingTimer.current);
      loadingTimer.current = setTimeout(() => {
        setStep("contact");
        track("quiz_step", { step: "contact" });
      }, 2000);
    }
    scrollToId("quiz");
  };

  const back = () => {
    clearTimeout(loadingTimer.current);
    const h = history.slice();
    let prev = h.pop();
    while (prev === "loading" && h.length) prev = h.pop();
    setHistory(h);
    setStep(prev && prev !== "loading" ? prev : "q1");
    setErrors({});
  };

  const retry = () => {
    // Fehler-Screen hat „contact“ in die Historie gelegt – beim erneuten Versuch wieder entfernen
    setHistory((h) => (h[h.length - 1] === "contact" ? h.slice(0, -1) : h));
    setStep("contact");
  };

  const submitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastJob.trim().length < 2) {
      setLastJobError("Bitte fülle dieses Feld aus.");
      return;
    }
    track("quiz_answer", { question: "zuletzt" });
    go("q5");
  };

  const submitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: Errors = {};
    if (contact.name.trim().split(/\s+/).length < 2) err.name = "Bitte gib deinen vollständigen Namen (Vor- und Nachname) an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) err.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (contact.phone.replace(/\D/g, "").length < 6) err.phone = "Bitte gib eine gültige Telefonnummer an.";
    if (!privacy) err.privacy = "Bitte bestätige die Datenschutzerklärung.";
    if (Object.keys(err).length) {
      setErrors(err);
      // Fokus auf das erste fehlerhafte Feld
      const first = (["name", "email", "phone", "privacy"] as const).find((k) => err[k]);
      if (first) e.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setSending(true);
    setErrors({});
    const body = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      answers,
      ...(lastJob.trim() ? { lastJob: lastJob.trim() } : {}),
      source: "landingpage-bewerben",
      ts: new Date().toISOString(),
    };
    try {
      if (WEBHOOK_URL) {
        const r = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!r.ok) throw new Error("HTTP " + r.status);
      } else {
        // Demo-Modus (kein Webhook konfiguriert): Erfolg simulieren
        await new Promise((r) => setTimeout(r, 700));
        if (!navigator.onLine) throw new Error("offline");
      }
      track("lead_submit", { abschluss: answers.abschluss });
      try {
        sessionStorage.setItem("sge-lead-name", body.name.split(/\s+/)[0]);
      } catch {
        /* ignorieren */
      }
      router.push("/danke");
    } catch {
      setSending(false);
      setHistory((h) => h.concat("contact"));
      setStep("error");
      track("lead_error", {});
    }
  };

  const q = step === "q1" || step === "q2" || step === "q3" || step === "q5" ? choiceQuestions[step] : null;
  const stepNum = STEP_NUM[step] ?? 0;
  const rejectedAt = step === "reject" ? (STEP_NUM[history[history.length - 1]] ?? 1) : 0;
  const progressLabel = stepNum >= 6 ? "Letzter Schritt" : `Frage ${stepNum || rejectedAt} von 5`;
  const showBack = history.length > 0 && step !== "q1" && step !== "loading";
  const consentPending = consent === null || consent === undefined;
  const showSticky = scrolled && !consentPending && step !== "contact";

  const headingId = `${uid}-heading`;
  const errId = (k: string) => `${uid}-err-${k}`;

  return (
    <>
      <div
        data-reveal=""
        className="relative mx-auto max-w-[860px] overflow-hidden rounded-[18px] border border-line bg-white shadow-quiz"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 bg-navy px-[clamp(22px,4vw,40px)] py-4 text-white">
          <span className="flex items-center gap-2.5">
            <span className="rounded bg-blue px-2.5 py-1.5 text-[13px] font-extrabold">Gleis 1</span>
            <span className="font-mono text-xs tracking-[.14em] text-blue-light">BEWERBUNG IN 2 MINUTEN</span>
          </span>
          <span className="font-mono text-xs tracking-[.12em] text-on-navy-2">{progressLabel}</span>
        </div>

        <div className="p-[clamp(22px,4vw,44px)]">
          {stepNum > 0 && (
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={Math.min(5, stepNum)}
              aria-label="Fortschritt"
              className="mb-[30px] grid grid-cols-5 gap-1.5"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-[3px] transition-[background-color,box-shadow] duration-[400ms] ease-[ease]"
                  style={{
                    background: i <= stepNum ? "#1689E8" : "#E8EDF2",
                    boxShadow: i === stepNum ? "0 0 12px rgba(22,137,232,.7)" : "none",
                  }}
                />
              ))}
            </div>
          )}

          <div ref={bodyRef} data-quiz="body">
            {q && (
              <>
                <div className="mb-6 flex flex-col gap-2">
                  <h2 id={headingId} data-quiz-focus="" tabIndex={-1} className={`${headingCls} text-[clamp(23px,3vw,32px)] leading-[1.15]`}>
                    {q.title}
                  </h2>
                  <p className="m-0 text-base text-muted">{q.hint}</p>
                </div>
                <div role="group" aria-labelledby={headingId} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3">
                  {q.options.map((o, idx) => {
                    const sel = answers[q.key] === o.label;
                    return (
                      <button
                        key={o.label}
                        type="button"
                        aria-pressed={sel}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [q.key]: o.label }));
                          track("quiz_answer", { question: q.key, answer: o.label });
                          go(o.next);
                        }}
                        className={`flex min-h-[76px] cursor-pointer items-center gap-3.5 rounded-xl border-2 p-[18px] text-left font-sans text-base font-bold leading-[1.4] text-navy [transition:border-color_.2s_ease,background-color_.2s_ease,transform_.25s_ease,box-shadow_.25s_ease] hover:-translate-y-[3px] hover:border-blue hover:bg-[#F0F6FC] hover:shadow-[0_16px_32px_-20px_rgba(7,28,53,.45)] ${
                          sel ? "border-blue bg-[#EAF3FC]" : "border-line bg-white"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex size-9 shrink-0 items-center justify-center rounded-btn font-mono text-sm text-white ${sel ? "bg-blue" : "bg-navy"}`}
                        >
                          {"ABCD"[idx]}
                        </span>
                        <span>{o.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === "q4" && (
              <form onSubmit={submitText} noValidate className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-2">
                  <h2 data-quiz-focus="" tabIndex={-1} className={`${headingCls} text-[clamp(23px,3vw,32px)] leading-[1.15]`}>
                    Was hast du zuletzt gemacht?
                  </h2>
                  <p className="m-0 text-base text-muted">Zum Beispiel deinen letzten Job oder deine Ausbildung.</p>
                </div>
                <div className="flex flex-col gap-[7px] text-sm font-bold">
                  <label htmlFor={`${uid}-lastjob`}>Deine Antwort*</label>
                  <textarea
                    id={`${uid}-lastjob`}
                    value={lastJob}
                    onChange={(e) => {
                      setLastJob(e.target.value);
                      setLastJobError(null);
                    }}
                    rows={3}
                    required
                    placeholder="z. B. Lagerist, KFZ-Mechatroniker, Verkäuferin …"
                    aria-invalid={lastJobError ? true : undefined}
                    aria-describedby={lastJobError ? errId("lastjob") : undefined}
                    className={`${inputBase} resize-y py-3.5 ${lastJobError ? "border-error" : "border-line-input"}`}
                  />
                  {lastJobError && (
                    <span id={errId("lastjob")} className="text-[13px] font-medium text-error">
                      {lastJobError}
                    </span>
                  )}
                </div>
                <button type="submit" className={`${primaryBtn} min-h-[54px] self-start px-[30px] py-4 text-base`}>
                  Weiter <span aria-hidden="true">→</span>
                </button>
              </form>
            )}

            {step === "loading" && (
              <div role="status" aria-live="polite" className="flex flex-col items-center gap-5 py-12">
                <span
                  aria-hidden="true"
                  className="size-[60px] rounded-full border-[5px] border-line border-t-blue-hover animate-[sge-spin_.9s_linear_infinite]"
                />
                <p data-quiz-focus="" tabIndex={-1} className="m-0 text-[19px] font-bold focus:outline-none">
                  Deine Angaben werden überprüft…
                </p>
                <span className="font-mono text-xs tracking-[.14em] text-blue">SIGNAL WIRD GESTELLT</span>
              </div>
            )}

            {step === "contact" && (
              <form onSubmit={submitContact} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-xs tracking-[.14em] text-blue">LETZTER HALT VOR DEINEM ZIEL</span>
                  <h2 data-quiz-focus="" tabIndex={-1} className={`${headingCls} text-[clamp(26px,3.4vw,36px)] leading-[1.1]`}>
                    Du hast es fast geschafft!
                  </h2>
                  <p className="m-0 text-base leading-relaxed text-muted">
                    Wir freuen uns, dass du Interesse an unserer Ausbildung zum Lokführer (m/w/d) hast. Eine sehr gute Wahl! Hinterlasse uns jetzt deine
                    Kontaktdaten, damit wir uns telefonisch für ein kurzes Kennenlerngespräch bei dir melden können.
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3.5">
                  {CONTACT_FIELDS.map((f) => {
                    const error = errors[f.key];
                    const id = `${uid}-${f.key}`;
                    return (
                      <div key={f.key} className="flex flex-col gap-[7px] text-sm font-bold">
                        <label htmlFor={id}>{f.label}</label>
                        <input
                          id={id}
                          data-field={f.key}
                          name={f.key}
                          type={f.type}
                          autoComplete={f.ac}
                          inputMode={f.im}
                          required
                          value={contact[f.key]}
                          onChange={(e) => {
                            const v = e.target.value;
                            setContact((c) => ({ ...c, [f.key]: v }));
                            setErrors((er) => ({ ...er, [f.key]: undefined }));
                          }}
                          aria-invalid={error ? true : undefined}
                          aria-describedby={error ? errId(f.key) : undefined}
                          className={`${inputBase} min-h-[52px] py-[15px] ${error ? "border-error" : "border-line-input"}`}
                        />
                        {error && (
                          <span id={errId(f.key)} className="text-[13px] font-medium text-error">
                            {error}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-normal text-muted">
                    <input
                      type="checkbox"
                      data-field="privacy"
                      checked={privacy}
                      required
                      onChange={(e) => {
                        setPrivacy(e.target.checked);
                        setErrors((er) => ({ ...er, privacy: undefined }));
                      }}
                      aria-invalid={errors.privacy ? true : undefined}
                      aria-describedby={errors.privacy ? errId("privacy") : undefined}
                      className="m-0 size-[22px] shrink-0 accent-blue"
                    />
                    <span>
                      Hiermit bestätige ich, dass ich die{" "}
                      <Link href="/datenschutz" target="_blank" rel="noopener">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen habe und mit der Verarbeitung meiner Daten zur Kontaktaufnahme einverstanden bin.*
                    </span>
                  </label>
                  {errors.privacy && (
                    <span id={errId("privacy")} className="text-[13px] font-medium text-error">
                      {errors.privacy}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending || undefined}
                  className={`${primaryBtn} min-h-14 justify-center p-[18px] text-[17px] disabled:cursor-wait`}
                >
                  {sending ? "Wird gesendet …" : "Jetzt senden"} <span aria-hidden="true">→</span>
                </button>
              </form>
            )}

            {step === "reject" && (
              <div className="flex flex-col gap-4 py-2">
                <span className="self-start rounded bg-error-bg px-2.5 py-1.5 font-mono text-xs tracking-[.14em] text-error">HALT · KEINE WEITERFAHRT</span>
                <h2 data-quiz-focus="" tabIndex={-1} className={`${headingCls} text-[clamp(26px,3.4vw,36px)]`}>
                  Schade!
                </h2>
                <p className="m-0 max-w-[600px] text-[17px] leading-[1.65] text-muted">{rejectKey ? rejectTexts[rejectKey] : ""}</p>
                <div className="mt-1.5 flex flex-wrap gap-2.5">
                  <a
                    href={site.phoneHref}
                    className="flex min-h-[52px] items-center rounded-btn bg-blue px-[22px] py-[15px] font-bold text-white no-underline hover:bg-blue-hover hover:text-white"
                  >
                    Anrufen: {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-[52px] items-center rounded-btn border-[1.5px] border-navy bg-white px-[22px] py-[15px] font-bold text-navy no-underline hover:bg-navy hover:text-white"
                  >
                    E-Mail schreiben
                  </a>
                </div>
              </div>
            )}

            {step === "error" && (
              <div role="alert" className="flex flex-col gap-4 py-2">
                <span className="self-start rounded bg-error-bg px-2.5 py-1.5 font-mono text-xs tracking-[.14em] text-error">STÖRUNG</span>
                <p data-quiz-focus="" tabIndex={-1} className="m-0 max-w-[560px] text-lg font-semibold leading-relaxed focus:outline-none">
                  Sorry, deine Anfrage konnte nicht gesendet werden. Bitte prüfe deine Internetverbindung.
                </p>
                <button type="button" onClick={retry} className={`${primaryBtn} min-h-[52px] self-start px-[26px] py-[15px] text-base`}>
                  Erneut versuchen
                </button>
              </div>
            )}
          </div>

          {showBack && (
            <div className="mt-[22px] border-t border-dashed border-line pt-[18px]">
              <button
                type="button"
                onClick={back}
                className="min-h-11 cursor-pointer border-0 bg-transparent px-0 py-2 font-sans text-[15px] font-bold text-blue hover:text-blue-hover"
              >
                ← Zurück
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky-CTA (nur < 760 px, nach dem Scrollen, nicht bei offenem Cookie-Banner und nicht im Kontakt-Schritt) */}
      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-navy/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[10px] min-[760px]:hidden">
          <button
            type="button"
            onClick={toQuiz}
            className="min-h-[54px] w-full cursor-pointer rounded-btn border-0 bg-blue p-4 font-sans text-base font-bold text-white"
          >
            Jetzt in 2 Minuten bewerben
          </button>
        </div>
      )}
    </>
  );
}
