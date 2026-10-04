"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import type { FieldError } from "react-hook-form";

type FieldProps = { id: string; label: string; error?: FieldError; required?: boolean; hint?: string; children: ReactNode; className?: string };

/** Beschriftung, Pflicht-Kennzeichnung und Fehlermeldung für ein Formularfeld */
export function Field({ id, label, error, required, hint, children, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? <span aria-hidden="true" className="text-accent-ink"> *</span> : <span className="font-normal text-ink/75"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink/75">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  );
}

/** ARIA-Attribute für ein Eingabefeld passend zu <Field> */
export function fieldAria(id: string, error?: FieldError, hint?: boolean) {
  const describedBy = [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  return { id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy } as const;
}

type PrivacyProps = { id: string; error?: FieldError } & Omit<ComponentProps<"input">, "id" | "type">;

/** Pflicht-Checkbox Datenschutz */
export function PrivacyCheckbox({ id, error, ...rest }: PrivacyProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
        <input id={id} type="checkbox" className="mt-0.5 size-5 shrink-0 accent-petrol" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest} />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="font-semibold text-petrol underline" target="_blank">
            Datenschutzerklärung
          </Link>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
          <span aria-hidden="true" className="text-accent-ink"> *</span>
        </span>
      </label>
      {error?.message && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  );
}

/** Erfolgs- oder Fehlermeldung nach dem Absenden */
export function FormStatus({ status, success, error }: { status: "idle" | "success" | "error"; success: ReactNode; error: ReactNode }) {
  if (status === "idle") return null;
  const ok = status === "success";
  return (
    <div role={ok ? "status" : "alert"} className={`flex items-start gap-3 rounded-btn p-4 text-sm ${ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
      {ok ? <CircleCheck className="size-5 shrink-0" aria-hidden="true" /> : <CircleAlert className="size-5 shrink-0" aria-hidden="true" />}
      <div>{ok ? success : error}</div>
    </div>
  );
}

/** Unsichtbares Honeypot-Feld gegen Spam-Bots */
export function Honeypot(props: ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
