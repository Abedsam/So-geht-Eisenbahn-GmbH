"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { quizSteps } from "@/content/landing";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { submitForm } from "@/lib/submit";
import { Field, FormStatus, Honeypot, PrivacyCheckbox, fieldAria } from "./fields";

const TOTAL = quizSteps.length + 1;
type ChoiceName = (typeof quizSteps)[number]["name"];

/** Mehrstufiger Bewerbungs-Funnel der Landingpage (Du-Ansprache) */
export function LeadQuiz() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Letzter Stand, für den der Fokus gesetzt wurde – robust gegen doppelte Effects (Strict Mode)
  const focusedFor = useRef(`${0}-idle`);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { situation: "", german: "", qualification: "", start: "", name: "", phone: "", email: "", zip: "", privacy: false },
  });

  const values = useWatch({ control });

  // Fokus auf die neue Frage setzen (Screenreader & Tastatur), nicht beim ersten Laden
  useEffect(() => {
    const key = `${step}-${status}`;
    if (focusedFor.current === key) return;
    focusedFor.current = key;
    headingRef.current?.focus();
  }, [step, status]);

  const choose = (name: ChoiceName, value: string) => {
    setValue(name, value, { shouldValidate: true });
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  };

  const onSubmit = async (data: LeadInput) => {
    const ok = await submitForm("lead", data, honeypot);
    setStatus(ok ? "success" : "error");
  };

  // Fehlende Auswahl aus früheren Schritten → dorthin springen
  const onInvalid = () => {
    const missing = quizSteps.findIndex((q) => !values[q.name]);
    if (missing >= 0) setStep(missing);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-accent text-ink" aria-hidden="true">
          <Check className="size-8" strokeWidth={3} />
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-petrol outline-none md:text-3xl">
          Danke, {values.name?.split(" ")[0]}! Deine Bewerbung ist da.
        </h3>
        <p className="max-w-md text-ink/80">Wir melden uns in Kürze telefonisch bei dir und besprechen die nächsten Schritte – ganz unverbindlich.</p>
      </div>
    );
  }

  const current = quizSteps[step];

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="relative">
      {/* Fortschritt: 5 Striche, aktive in Orange */}
      <div className="mb-6 flex items-center justify-center gap-2" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} className={`h-1.5 w-10 rounded-full transition-colors duration-300 md:w-14 ${i <= step ? "bg-accent" : "bg-petrol-100"}`} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Schritt {step + 1} von {TOTAL}
      </p>

      {current ? (
        <fieldset key={current.name} className="animate-fade-up">
          <legend className="w-full">
            <h3 ref={headingRef} tabIndex={-1} className="text-center font-sans text-xl font-bold text-ink outline-none md:text-2xl">
              {step + 1}. {current.question}
            </h3>
            <span className="mt-2 block text-center text-ink/70">Bitte wähle eine Option aus:</span>
          </legend>
          <div className={`mt-6 grid gap-3 ${current.options.length === 3 ? "md:grid-cols-3" : "mx-auto max-w-xl md:grid-cols-2"}`}>
            {current.options.map((opt) => {
              const selected = values[current.name] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(current.name, opt)}
                  className={`group flex min-h-20 items-center justify-center gap-2 rounded-card border-2 px-4 py-4 text-center font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-petrol hover:shadow-card ${
                    selected ? "border-petrol bg-petrol text-white" : "border-petrol-100 bg-white text-petrol"
                  }`}
                >
                  {selected && <CircleCheck className="size-5 shrink-0 text-accent" aria-hidden="true" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <fieldset className="animate-fade-up">
          <legend className="w-full">
            <h3 ref={headingRef} tabIndex={-1} className="text-center font-sans text-xl font-bold text-ink outline-none md:text-2xl">
              {TOTAL}. Fast geschafft! Wie erreichen wir dich?
            </h3>
          </legend>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
            <Field id="lead-name" label="Vor- und Nachname" required error={errors.name}>
              <input {...register("name")} {...fieldAria("lead-name", errors.name)} autoComplete="name" className={`field ${errors.name ? "field-error" : ""}`} />
            </Field>
            <Field id="lead-phone" label="Telefonnummer" required error={errors.phone}>
              <input {...register("phone")} {...fieldAria("lead-phone", errors.phone)} type="tel" autoComplete="tel" className={`field ${errors.phone ? "field-error" : ""}`} />
            </Field>
            <Field id="lead-email" label="E-Mail-Adresse" required error={errors.email}>
              <input {...register("email")} {...fieldAria("lead-email", errors.email)} type="email" autoComplete="email" className={`field ${errors.email ? "field-error" : ""}`} />
            </Field>
            <Field id="lead-zip" label="Postleitzahl" required error={errors.zip} hint="Für wohnortnahe Praxiseinsätze">
              <input {...register("zip")} {...fieldAria("lead-zip", errors.zip, true)} inputMode="numeric" autoComplete="postal-code" maxLength={5} className={`field ${errors.zip ? "field-error" : ""}`} />
            </Field>
            <div className="sm:col-span-2">
              <PrivacyCheckbox id="lead-privacy" error={errors.privacy} {...register("privacy")} />
            </div>
            <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            <div className="sm:col-span-2">
              <FormStatus status={status} success={null} error="Das hat leider nicht geklappt. Bitte versuche es erneut oder ruf uns an: +49 209 8849 4686." />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-6 py-4 font-bold text-ink transition-colors hover:bg-accent-dark disabled:opacity-60 sm:col-span-2"
            >
              {isSubmitting ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <Send className="size-5" aria-hidden="true" />}
              Bewerbung unverbindlich absenden
            </button>
          </div>
        </fieldset>
      )}

      {step > 0 && (
        <button type="button" onClick={() => setStep(step - 1)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-petrol hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" /> Zurück
        </button>
      )}
    </form>
  );
}
