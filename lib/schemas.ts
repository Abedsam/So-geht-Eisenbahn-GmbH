import { z } from "zod";

// Gemeinsame Validierung für Client (react-hook-form) und Server (/api/*)

const name = z.string().trim().min(2, { error: "Bitte gib deinen vollständigen Namen an." });
const email = z.email({ error: "Bitte gib eine gültige E-Mail-Adresse an." });
const phone = z
  .string()
  .trim()
  .min(6, { error: "Bitte gib eine gültige Telefonnummer an." })
  .regex(/^[+()\d\s/-]+$/, { error: "Die Telefonnummer darf nur Ziffern, Leerzeichen und + ( ) / - enthalten." });
// boolean + refine statt literal(true), damit die Checkbox mit `false` starten kann
const privacy = z.boolean().refine((v) => v, { error: "Bitte stimme der Datenschutzerklärung zu." });

/** Landingpage-Funnel (Du-Ansprache) */
export const leadSchema = z.object({
  situation: z.string().min(1, { error: "Bitte wähle eine Option aus." }),
  german: z.string().min(1, { error: "Bitte wähle eine Option aus." }),
  qualification: z.string().min(1, { error: "Bitte wähle eine Option aus." }),
  start: z.string().min(1, { error: "Bitte wähle eine Option aus." }),
  name,
  phone,
  email,
  zip: z.string().trim().regex(/^\d{5}$/, { error: "Bitte gib eine fünfstellige Postleitzahl an." }),
  privacy,
});
export type LeadInput = z.infer<typeof leadSchema>;

// Ab hier Sie-Ansprache
const nameSie = z.string().trim().min(2, { error: "Bitte geben Sie Ihren vollständigen Namen an." });
const emailSie = z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." });
const phoneSie = z
  .string()
  .trim()
  .min(6, { error: "Bitte geben Sie eine gültige Telefonnummer an." })
  .regex(/^[+()\d\s/-]+$/, { error: "Bitte nur Ziffern, Leerzeichen und + ( ) / - verwenden." });
const privacySie = z.boolean().refine((v) => v, { error: "Bitte stimmen Sie der Datenschutzerklärung zu." });

export const contactTopics = ["infoveranstaltung", "allgemein", "lokfuehrer"] as const;

export const contactSchema = z
  .object({
    topic: z.enum(contactTopics),
    name: nameSie,
    email: emailSie,
    phone: phoneSie.or(z.literal("")),
    date: z.string(),
    message: z.string().trim().max(2000, { error: "Bitte maximal 2.000 Zeichen." }),
    privacy: privacySie,
  })
  .superRefine((v, ctx) => {
    if (v.topic === "infoveranstaltung" && !v.date) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "Bitte wählen Sie einen Termin." });
    }
    if (v.topic !== "allgemein" && !v.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Bitte geben Sie Ihre Telefonnummer an." });
    }
    if (v.topic === "allgemein" && v.message.length < 5) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Bitte schreiben Sie uns kurz Ihr Anliegen." });
    }
  });
export type ContactInput = z.infer<typeof contactSchema>;

export const seminarSchema = z.object({
  seminar: z.enum(["etcs", "lzb"]),
  date: z.string().min(1, { error: "Bitte wählen Sie einen Kursstart." }),
  name: nameSie,
  email: emailSie,
  phone: phoneSie,
  company: z.string().trim().max(200),
  privacy: privacySie,
});
export type SeminarInput = z.infer<typeof seminarSchema>;
