"use client";

import Link from "next/link";
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  type ContactErrors,
  type ContactType,
  type ContactValues,
  type FieldKey,
  contactConfig,
  contactTexts,
  contactTypes,
  infoEventTime,
  validateContact,
} from "@/content/kontakt";
import { site } from "@/content/site";
import { useContactType } from "./useContactType";

const PANEL_ID = "kontakt-formular";
const PRIVACY_NAME = "datenschutz";

const fieldClass =
  "rounded-btn border-[1.5px] bg-bg px-4 py-3.5 font-[inherit] text-base font-normal text-navy focus:border-blue focus:bg-white focus:shadow-[0_0_0_3px_rgba(22,137,232,.25)] focus:outline-none";

const contactInfo = [
  { term: "ADRESSE", value: `${site.address.street}, ${site.address.zip} ${site.address.city}` },
  { term: "TELEFON", value: site.phone, href: site.phoneHref },
  { term: "E-MAIL", value: site.email, href: `mailto:${site.email}` },
  { term: "INFOVERANSTALTUNG", value: infoEventTime },
];

/** Anliegen-Karten (Tabs) + Formular der Kontaktseite (Kontakt.dc.html, Sektionen 02 und 03) */
export function ContactForm() {
  const [type, selectType] = useContactType();
  const [values, setValues] = useState<ContactValues>({});
  const [errors, setErrors] = useState<ContactErrors>({});
  const [privacy, setPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [tried, setTried] = useState(false);

  // Anliegen gewechselt (Karte, Pfeiltasten oder Hash) → Fehler/Erfolg zurücksetzen wie im Template
  const [prevType, setPrevType] = useState(type);
  if (prevType !== type) {
    setPrevType(type);
    setErrors({});
    setSent(false);
    setTried(false);
  }

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<Partial<Record<ContactType, HTMLButtonElement | null>>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const t = contactConfig[type];

  const pick = (k: ContactType) => {
    setErrors({});
    setSent(false);
    setTried(false);
    selectType(k);
    const el = document.getElementById("formular");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = contactTypes.indexOf(type);
    const last = contactTypes.length - 1;
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = contactTypes[map[e.key]];
    selectType(next);
    tabRefs.current[next]?.focus();
  };

  const setValue = (key: FieldKey, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((s) => ({ ...s, [key]: undefined }));
  };

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const errs = validateContact(type, values, privacy);
    const keys = Object.keys(errs);
    if (keys.length) {
      setErrors(errs);
      setTried(true);
      // Erstes fehlerhaftes Feld fokussieren
      const first = t.fields.find((f) => errs[f.key])?.key ?? PRIVACY_NAME;
      const el = formRef.current?.elements.namedItem(first);
      if (el instanceof HTMLElement) el.focus();
      return;
    }
    setSending(true);
    setErrors({});
    // TODO: POST /api/kontakt { type, values }
    timer.current = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  const reset = () => {
    setSent(false);
    setValues({});
    setPrivacy(false);
    setTried(false);
  };

  const hasError = tried && Object.values(errors).some(Boolean);

  return (
    <>
      <section data-screen-label="02 Auswahl" className="mt-[clamp(-120px,-9vw,-80px)]">
        <div
          role="tablist"
          aria-label="Anliegen wählen"
          onKeyDown={onTabKey}
          className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4"
        >
          {contactTypes.map((k) => {
            const c = contactConfig[k];
            const on = k === type;
            return (
              <button
                key={k}
                id={k}
                ref={(el) => {
                  tabRefs.current[k] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={PANEL_ID}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(k)}
                className={`flex cursor-pointer flex-col gap-3.5 rounded-2xl border-2 px-7 py-8 text-left font-[inherit] shadow-[0_24px_48px_-28px_rgba(7,28,53,.4)] transition-transform duration-300 ease-[ease] hover:-translate-y-1 ${
                  on ? "border-blue bg-blue text-white" : "border-line bg-white text-navy"
                }`}
              >
                <span className={`font-mono text-[13px] tracking-[.14em] ${on ? "text-blue-tint" : "text-blue"}`}>{c.num}</span>
                <span className="text-2xl font-extrabold tracking-[.02em]">{c.cardTitle}</span>
                <span className={`text-base leading-[1.55] ${on ? "text-blue-tint" : "text-muted"}`}>{c.cardText}</span>
                <span className={`text-base font-bold ${on ? "text-white" : "text-blue"}`}>
                  {c.cardCta} <span aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="formular" data-screen-label="03 Formular" className="pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
          <aside className="flex flex-col gap-6">
            <h2 className="m-0 text-[clamp(30px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-.03em]">{t.title}</h2>
            <p className="m-0 text-[17px] leading-[1.65] text-muted">{t.intro}</p>
            <dl className="m-0 rounded-card bg-navy px-6 py-2 text-white">
              {contactInfo.map((item, i) => (
                <div
                  key={item.term}
                  className={`flex flex-col gap-1 py-4 ${i < contactInfo.length - 1 ? "border-b border-dashed border-white/15" : ""}`}
                >
                  <dt className="font-mono text-xs tracking-[.14em] text-blue-light">{item.term}</dt>
                  <dd className="m-0 font-semibold">
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-white">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <div id={PANEL_ID} role="tabpanel" aria-labelledby={type} className="rounded-[18px] border border-line bg-white p-[clamp(24px,3.5vw,44px)]">
            {sent ? (
              <div role="status" className="flex flex-col items-start gap-3.5 py-3">
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-full bg-blue text-[28px] font-extrabold text-white"
                >
                  ✓
                </span>
                <h3 ref={successRef} tabIndex={-1} className="m-0 text-[28px] font-extrabold focus:outline-none">
                  {t.success}
                </h3>
                <p className="m-0 text-[17px] leading-[1.6] text-muted">{contactTexts.successText}</p>
                <button type="button" onClick={reset} className="cursor-pointer border-0 bg-transparent p-0 font-[inherit] font-bold text-blue">
                  {contactTexts.again}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={submit}
                noValidate
                aria-label={t.title}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4"
              >
                {hasError && (
                  <div role="alert" className="col-span-full rounded-[10px] bg-error-bg px-4 py-3.5 text-[15px] font-semibold text-[#9B1C1C]">
                    {contactTexts.formError}
                  </div>
                )}
                {t.fields.map((f) => {
                  const id = `kontakt-${f.key}`;
                  const err = errors[f.key];
                  const errId = `${id}-fehler`;
                  const common = {
                    id,
                    name: f.key,
                    value: values[f.key] || "",
                    required: f.label.endsWith("*"),
                    "aria-invalid": err ? true : undefined,
                    "aria-describedby": err ? errId : undefined,
                    className: `${fieldClass} ${err ? "border-error" : "border-line-input"}`,
                  };
                  return (
                    <div
                      key={f.key}
                      className={`flex flex-col gap-[7px] text-sm font-bold ${f.type === "area" ? "col-span-full" : ""}`}
                    >
                      <label htmlFor={id}>{f.label}</label>
                      {f.type === "area" ? (
                        <textarea
                          {...common}
                          rows={5}
                          onChange={(e) => setValue(f.key, e.target.value)}
                          className={`${common.className} resize-y`}
                        />
                      ) : (
                        <input
                          {...common}
                          type={f.type}
                          autoComplete={f.autoComplete || "off"}
                          inputMode={f.key === "plz" || f.key === "hausnummer" ? "numeric" : undefined}
                          onChange={(e) => setValue(f.key, e.target.value)}
                        />
                      )}
                      {err && (
                        <span id={errId} className="text-[13px] font-medium text-error">
                          {err}
                        </span>
                      )}
                    </div>
                  );
                })}
                <div className="col-span-full flex flex-col gap-1.5">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-normal text-muted">
                    <input
                      type="checkbox"
                      name={PRIVACY_NAME}
                      checked={privacy}
                      required
                      aria-invalid={errors._privacy ? true : undefined}
                      aria-describedby={errors._privacy ? "kontakt-datenschutz-fehler" : undefined}
                      onChange={(e) => {
                        const c = e.target.checked;
                        setPrivacy(c);
                        setErrors((s) => ({ ...s, _privacy: undefined }));
                      }}
                      className="m-0 size-5 shrink-0 accent-blue"
                    />
                    <span>
                      Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung meiner Daten zur
                      Bearbeitung meiner Anfrage einverstanden.*
                    </span>
                  </label>
                  {errors._privacy && (
                    <span id="kontakt-datenschutz-fehler" className="text-[13px] font-medium text-error">
                      {errors._privacy}
                    </span>
                  )}
                </div>
                <div className="col-span-full flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[13px] text-muted">{contactTexts.required}</span>
                  <button
                    type="submit"
                    disabled={sending}
                    className="cursor-pointer rounded-btn border-0 bg-blue px-[30px] py-[17px] font-[inherit] text-[17px] font-bold text-white hover:bg-blue-hover"
                  >
                    {sending ? contactTexts.sending : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
