// Kontaktseite: Anliegen, Feldsets und Texte (Design-Handoff Kontakt.dc.html)

export const contactTypes = ["lokfuehrer", "infoveranstaltung", "allgemein"] as const;
export type ContactType = (typeof contactTypes)[number];
export const defaultContactType: ContactType = "allgemein";

export const isContactType = (v: string): v is ContactType => (contactTypes as readonly string[]).includes(v);

export type FieldKey = "vorname" | "nachname" | "email" | "telefon" | "strasse" | "hausnummer" | "plz" | "stadt" | "nachricht";

export type ContactField = {
  key: FieldKey;
  /** Beschriftung inkl. „*“ bei Pflichtfeldern */
  label: string;
  type: "text" | "email" | "tel" | "area";
  autoComplete?: string;
};

export type ContactTypeConfig = {
  /** Karte oben */
  num: string;
  cardTitle: string;
  cardText: string;
  cardCta: string;
  /** Formular */
  title: string;
  intro: string;
  success: string;
  submit: string;
  fields: ContactField[];
};

const vorname: ContactField = { key: "vorname", label: "Vorname*", type: "text", autoComplete: "given-name" };
const nachname: ContactField = { key: "nachname", label: "Nachname*", type: "text", autoComplete: "family-name" };
const email: ContactField = { key: "email", label: "E-Mail*", type: "email", autoComplete: "email" };

export const contactConfig: Record<ContactType, ContactTypeConfig> = {
  lokfuehrer: {
    num: "01",
    cardTitle: "LOKFÜHRER WERDEN",
    cardText: "In 12 Monaten in den Führerstand – kostenfrei mit Bildungsgutschein.",
    cardCta: "Jetzt anmelden",
    title: "Für die Lokführer-Ausbildung anmelden",
    intro: "Trag deine Daten ein – wir rufen dich an, klären die Voraussetzungen und helfen dir beim Bildungsgutschein.",
    success: "Deine Anmeldung ist da!",
    submit: "Jetzt anmelden",
    fields: [
      vorname,
      nachname,
      email,
      { key: "telefon", label: "Telefon*", type: "tel", autoComplete: "tel" },
      { key: "strasse", label: "Straße*", type: "text", autoComplete: "address-line1" },
      { key: "hausnummer", label: "Hausnummer*", type: "text" },
      { key: "plz", label: "PLZ*", type: "text", autoComplete: "postal-code" },
      { key: "stadt", label: "Stadt*", type: "text", autoComplete: "address-level2" },
    ],
  },
  infoveranstaltung: {
    num: "02",
    cardTitle: "INFOVERANSTALTUNG",
    cardText: "Montags 15:30 Uhr vor Ort: Team, Räume und Simulator kennenlernen.",
    cardCta: "Platz sichern",
    title: "Platz für die Infoveranstaltung sichern",
    intro: "Jeden Montag um 15:30 Uhr in Gelsenkirchen: Lerne Team, Räume und Simulator kennen.",
    success: "Dein Platz ist reserviert!",
    submit: "Platz sichern",
    fields: [vorname, nachname, email, { key: "telefon", label: "Telefon*", type: "tel", autoComplete: "tel" }],
  },
  allgemein: {
    num: "03",
    cardTitle: "ALLGEMEINE FRAGE",
    cardText: "Weiterbildung, Seminar, Kooperation oder etwas ganz anderes.",
    cardCta: "Kontakt aufnehmen",
    title: "Allgemeine Frage",
    intro: "Ob Weiterbildung, Seminar oder Kooperation – schreib uns, wir antworten schnell.",
    success: "Danke für deine Nachricht!",
    submit: "Nachricht senden",
    fields: [
      vorname,
      nachname,
      email,
      { key: "telefon", label: "Telefon", type: "tel", autoComplete: "tel" },
      { key: "nachricht", label: "Nachricht*", type: "area" },
    ],
  },
};

export const infoEventTime = "Jeden Montag, 15:30 Uhr";

export const contactTexts = {
  formError: "Bitte prüfe die markierten Felder.",
  successText: "Wir melden uns innerhalb von 24 Stunden persönlich bei dir.",
  again: "Weitere Anfrage senden",
  sending: "Wird gesendet …",
  required: "* Pflichtfeld",
  errors: {
    required: "Bitte ausfüllen.",
    email: "Bitte gültige E-Mail-Adresse eingeben.",
    phone: "Bitte gültige Telefonnummer eingeben.",
    plz: "Bitte 5-stellige PLZ eingeben.",
    privacy: "Bitte stimme der Datenschutzerklärung zu.",
  },
};

export type ContactValues = Partial<Record<FieldKey, string>>;
export type ContactErrors = Partial<Record<FieldKey | "_privacy", string>>;

/** Validierung exakt wie im Template (Component.validate) */
export function validateContact(type: ContactType, values: ContactValues, privacy: boolean): ContactErrors {
  const e: ContactErrors = {};
  const { errors } = contactTexts;
  for (const { key, label } of contactConfig[type].fields) {
    const val = (values[key] || "").trim();
    const req = label.endsWith("*");
    if (req && !val) e[key] = errors.required;
    else if (key === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) e[key] = errors.email;
    else if (key === "telefon" && val && val.replace(/\D/g, "").length < 6) e[key] = errors.phone;
    else if (key === "plz" && val && !/^\d{5}$/.test(val)) e[key] = errors.plz;
  }
  if (!privacy) e._privacy = errors.privacy;
  return e;
}
