"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { nextMondays } from "@/lib/dates";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { submitForm } from "@/lib/submit";
import { useClientToday } from "@/lib/useStoredValue";
import { Field, FormStatus, Honeypot, PrivacyCheckbox, fieldAria } from "./fields";

type Topic = ContactInput["topic"];

const config: Record<Topic, { submit: string; success: string; phoneRequired: boolean; message: "none" | "optional" | "required" }> = {
  infoveranstaltung: {
    submit: "Jetzt eintragen",
    success: "Vielen Dank! Wir bestätigen Ihre Anmeldung zur Infoveranstaltung schnellstmöglich und senden Ihnen alle weiteren Informationen.",
    phoneRequired: true,
    message: "none",
  },
  allgemein: {
    submit: "Nachricht senden",
    success: "Vielen Dank für Ihre Nachricht! Wir melden uns so bald wie möglich bei Ihnen.",
    phoneRequired: false,
    message: "required",
  },
  lokfuehrer: {
    submit: "Jetzt anmelden",
    success: "Vielen Dank für Ihr Interesse! Wir melden uns in Kürze, um alles Weitere zu besprechen.",
    phoneRequired: true,
    message: "optional",
  },
};

/** Wiederverwendbares Kontaktformular (Sie-Ansprache) */
export function ContactForm({ topic, compact = false }: { topic: Topic; compact?: boolean }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const c = config[topic];
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  // Termine erst im Browser berechnen, damit sie immer aktuell sind (auch bei statischem Build)
  const today = useClientToday();
  const mondays = useMemo(() => (today && topic === "infoveranstaltung" ? nextMondays(6) : []), [today, topic]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic, name: "", email: "", phone: "", date: "", message: "", privacy: false },
  });

  const onSubmit = async (data: ContactInput) => {
    const ok = await submitForm("contact", data, honeypot);
    setStatus(ok ? "success" : "error");
    if (ok) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-4">
      <input type="hidden" {...register("topic")} />
      <Field id={id("name")} label="Vor- und Nachname" required error={errors.name}>
        <input {...register("name")} {...fieldAria(id("name"), errors.name)} autoComplete="name" className={`field ${errors.name ? "field-error" : ""}`} />
      </Field>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field id={id("email")} label="E-Mail-Adresse" required error={errors.email}>
          <input {...register("email")} {...fieldAria(id("email"), errors.email)} type="email" autoComplete="email" className={`field ${errors.email ? "field-error" : ""}`} />
        </Field>
        <Field id={id("phone")} label="Telefonnummer" required={c.phoneRequired} error={errors.phone}>
          <input
            {...register("phone")}
            {...fieldAria(id("phone"), errors.phone)}
            type="tel"
            autoComplete="tel"
            className={`field ${errors.phone ? "field-error" : ""}`}
          />
        </Field>
      </div>

      {topic === "infoveranstaltung" && (
        <Field id={id("date")} label="Wunschtermin" required error={errors.date}>
          <select {...register("date")} {...fieldAria(id("date"), errors.date)} className={`field ${errors.date ? "field-error" : ""}`}>
            <option value="">{mondays.length ? "Bitte wählen" : "Termine werden geladen …"}</option>
            {mondays.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </Field>
      )}

      {c.message !== "none" && (
        <Field id={id("message")} label="Ihre Nachricht" required={c.message === "required"} error={errors.message}>
          <textarea {...register("message")} {...fieldAria(id("message"), errors.message)} rows={compact ? 3 : 5} className={`field resize-y ${errors.message ? "field-error" : ""}`} />
        </Field>
      )}

      <PrivacyCheckbox id={id("privacy")} error={errors.privacy} {...register("privacy")} />
      <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      <FormStatus status={status} success={c.success} error="Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an: +49 209 8849 4686." />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-btn bg-accent px-6 py-3.5 font-bold text-ink transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {isSubmitting && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
        {c.submit}
      </button>
    </form>
  );
}
