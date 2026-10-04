"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Seminar } from "@/content/seminars";
import { seminarSchema, type SeminarInput } from "@/lib/schemas";
import { submitForm } from "@/lib/submit";
import { Field, FormStatus, Honeypot, PrivacyCheckbox, fieldAria } from "./fields";

/** Anmeldeformular für ETCS-/LZB-Seminare – Kursstarts kommen aus content/seminars.ts */
export function SeminarForm({ seminar }: { seminar: Pick<Seminar, "slug" | "shortTitle" | "dates"> }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const p = `seminar-${seminar.slug}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SeminarInput>({
    resolver: zodResolver(seminarSchema),
    defaultValues: { seminar: seminar.slug, date: seminar.dates.length === 1 ? seminar.dates[0].id : "", name: "", email: "", phone: "", company: "", privacy: false },
  });

  const onSubmit = async (data: SeminarInput) => {
    const ok = await submitForm("seminar-anmeldung", data, honeypot);
    setStatus(ok ? "success" : "error");
    if (ok) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <input type="hidden" {...register("seminar")} />
      <Field id={`${p}-date`} label="Kursstart" required error={errors.date} className="sm:col-span-2">
        <select {...register("date")} {...fieldAria(`${p}-date`, errors.date)} className={`field ${errors.date ? "field-error" : ""}`}>
          <option value="">Bitte wählen</option>
          {seminar.dates.map((d) => (
            <option key={d.id} value={d.id}>
              {seminar.shortTitle}: {d.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id={`${p}-name`} label="Vor- und Nachname" required error={errors.name}>
        <input {...register("name")} {...fieldAria(`${p}-name`, errors.name)} autoComplete="name" className={`field ${errors.name ? "field-error" : ""}`} />
      </Field>
      <Field id={`${p}-company`} label="Unternehmen" error={errors.company}>
        <input {...register("company")} {...fieldAria(`${p}-company`, errors.company)} autoComplete="organization" className="field" />
      </Field>
      <Field id={`${p}-email`} label="E-Mail-Adresse" required error={errors.email}>
        <input {...register("email")} {...fieldAria(`${p}-email`, errors.email)} type="email" autoComplete="email" className={`field ${errors.email ? "field-error" : ""}`} />
      </Field>
      <Field id={`${p}-phone`} label="Telefonnummer" required error={errors.phone}>
        <input {...register("phone")} {...fieldAria(`${p}-phone`, errors.phone)} type="tel" autoComplete="tel" className={`field ${errors.phone ? "field-error" : ""}`} />
      </Field>
      <div className="sm:col-span-2">
        <PrivacyCheckbox id={`${p}-privacy`} error={errors.privacy} {...register("privacy")} />
      </div>
      <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      <div className="sm:col-span-2">
        <FormStatus
          status={status}
          success="Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigung per E-Mail."
          error="Die Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an: +49 209 8849 4686."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-6 py-4 font-bold text-ink transition-colors hover:bg-accent-dark disabled:opacity-60 sm:col-span-2"
      >
        {isSubmitting && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
        Jetzt anmelden
      </button>
    </form>
  );
}
