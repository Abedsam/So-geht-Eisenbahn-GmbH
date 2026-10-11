// Inhalte der Lead-Landingpage /bewerben (Design-Handoff: Bewerben.dc.html)

export type QuizStepId = "q1" | "q2" | "q3" | "q4" | "q5" | "loading" | "contact" | "reject" | "error";
export type RejectKey = "angestellt" | "sprache";
/** Ziel einer Antwort: nächster Schritt oder Absage */
export type QuizTarget = "q2" | "q3" | "q4" | "loading" | `reject:${RejectKey}`;
export type AnswerKey = "situation" | "bildungsgutschein" | "deutsch" | "abschluss";

export type QuizOption = { label: string; next: QuizTarget };
export type ChoiceQuestion = { n: number; title: string; hint: string; key: AnswerKey; options: QuizOption[] };

export const choiceQuestions: Record<"q1" | "q2" | "q3" | "q5", ChoiceQuestion> = {
  q1: {
    n: 1,
    title: "Wie ist deine aktuelle berufliche Situation?",
    hint: "Bitte wähle eine Option aus:",
    key: "situation",
    options: [
      { label: "Ich bin arbeitssuchend gemeldet", next: "q2" },
      { label: "Ich habe einen Minijob mit Verdienstgrenze", next: "q2" },
      { label: "Ich bin angestellt in Voll- oder Teilzeit", next: "reject:angestellt" },
    ],
  },
  q2: {
    n: 2,
    title: "Wusstest du, dass die Weiterbildung zu 100 % über den Bildungsgutschein finanziert wird?",
    hint: "Die Agentur für Arbeit oder das Jobcenter übernimmt alle Weiterbildungskosten.",
    key: "bildungsgutschein",
    options: [
      { label: "Nein, das wusste ich nicht", next: "q3" },
      { label: "Ja, das ist mir bekannt", next: "q3" },
    ],
  },
  q3: {
    n: 3,
    title: "Auf welchem Sprachniveau ist dein Deutsch?",
    hint: "Bitte wähle eine Option aus:",
    key: "deutsch",
    options: [
      { label: "Anfänger (A1/A2)", next: "reject:sprache" },
      { label: "Fortgeschritten (B1/B2)", next: "q4" },
      { label: "Experte (C1/C2)", next: "q4" },
      { label: "Muttersprache", next: "q4" },
    ],
  },
  q5: {
    n: 5,
    title: "Was ist dein höchster Abschluss?",
    hint: "Bitte wähle eine Option aus:",
    key: "abschluss",
    options: [
      { label: "Hauptschulabschluss", next: "loading" },
      { label: "Mittlere Reife", next: "loading" },
      { label: "Fachhochschulreife", next: "loading" },
      { label: "Ausbildung", next: "loading" },
    ],
  },
};

export const rejectTexts: Record<RejectKey, string> = {
  angestellt:
    "Leider müssen wir dir absagen, da du aktuell arbeitssuchend sein musst, um mit der Ausbildung zum Lokführer (m/w/d) bei uns starten zu können. Wenn du Fragen hast oder unsicher bist, melde dich gerne bei uns.",
  sprache:
    "Leider müssen wir dir absagen, da fortgeschrittene Deutschkenntnisse (mindestens B1/B2) Voraussetzung für die Ausbildung sind. Wenn du Fragen hast, melde dich gerne bei uns.",
};

export const heroChecks = ["Ohne Unterlagen", "In 2 Minuten bewerben", "Unverbindlich"];

export type Benefit = { label: string; count: number; suffix: string; display: string; title: string; text: string; dark?: boolean };

export const benefits: Benefit[] = [
  {
    label: "01 · JOBGARANTIE",
    count: 100,
    suffix: " %",
    display: "100 %",
    title: "Sichere Zukunft auf Schienen",
    text: "Der Schienenverkehr wächst stetig – nach deinem Abschluss wartet dein neuer Job schon auf dich.",
  },
  {
    label: "02 · GEHALT",
    count: 4000,
    suffix: " €",
    display: "4.000 €",
    title: "Netto im Monat – ca.",
    text: "Plus Zulagen, Sozialleistungen und echte Aufstiegschancen.",
  },
  {
    label: "03 · FÖRDERUNG",
    count: 0,
    suffix: " €",
    display: "0 €",
    title: "Kostenfrei mit Bildungsgutschein",
    text: "Agentur für Arbeit, Jobcenter, Rentenversicherung, Bundeswehr oder Berufsgenossenschaft.",
    dark: true,
  },
];

export const jobTasks = [
  "Du steuerst Triebfahrzeuge im Regional-, S-Bahn-, Güter- oder Fernverkehr.",
  "Du erkennst technische Störungen und behebst sie, wenn möglich, selbst.",
  "Du bringst Fahrgäste oder Fracht sicher und pünktlich ans Ziel.",
];

export const timeline = [
  { tag: "HALT 01 · MONAT 1–6", title: "Theorie", text: "Ca. 6 Monate Unterricht bei So geht Eisenbahn in Gelsenkirchen." },
  { tag: "HALT 02 · MONAT 7–12", title: "Praxis", text: "Danach ca. 6 Monate wohnortnah bei unseren Partnern." },
  { tag: "HALT 03 · DURCHGEHEND", title: "Modern lernen", text: "Simulatoren, digitale Boards und Tablets." },
  { tag: "HALT 04 · EXTRA", title: "Nachhilfe", text: "Auf Wunsch täglich – damit niemand zurückbleibt." },
  { tag: "ZIEL", title: "Lokführer", text: "Qualifiziert zum eigenständigen Führen von Lok- und Triebfahrzeugen." },
];

export const profile = [
  "Mindestens 20 Jahre alt",
  "Mindestens Hauptschulabschluss oder abgeschlossene Ausbildung",
  "Deutsch auf B1/B2-Niveau",
  "Körperlich und psychisch geeignet (Eignungsuntersuchung)",
  "Zuverlässig und bereit für Schichtdienst",
  "Auskunft aus dem Fahreignungsregister",
  "Quereinsteiger oder arbeitssuchend",
];

// TODO(Kunde): echte Testimonial-Videos einbinden (aktuell gestreifte Platzhalter)
export const testimonials = [
  { name: "Amar", role: "Vorher: Anlagenmechaniker", dur: "2:16" },
  { name: "Daniel", role: "Vorher: Management", dur: "2:28" },
  { name: "Michael", role: "Vorher: Maschinenbauingenieur", dur: "2:09" },
  { name: "Can", role: "Vorher: KFZ-Mechatroniker", dur: "4:16" },
  { name: "Furkan", role: "Vorher: Quereinsteiger", dur: "1:48" },
];

export const landingTeam = [
  { name: "Kevin", img: "/assets/team-kevin.png", text: "Geschäftsführer und Ansprechpartner für Geschäftskunden." },
  { name: "Kai", img: "/assets/team-kai.png", text: "DEKRA-zertifizierter Prüfer für Triebfahrzeugführer." },
  { name: "Jens", img: "/assets/team-jens.png", text: "Dozent und gelernter Eisenbahner." },
  { name: "Markus", img: "/assets/team-markus.png", text: "Dozent, Ausbilder und Prüfer." },
  { name: "Laura", img: "/assets/team-laura.png", text: "Leitung Ausbildung, gelernte Lokführerin." },
  { name: "Miriam", img: "/assets/team-miriam.png", text: "Begleitet dich vom ersten Kontakt an." },
  { name: "Donjeta", img: "/assets/team-donjeta.png", text: "Ansprechpartnerin für Bewerber." },
];

export const landingPartners = ["FlixTrain", "SGL", "Rail Force", "ME-Rail", "LZB92", "Powerlines", "MBS", "Mittelweserbahn"];

export const bewerbenFaq = [
  {
    q: "Wo findet die Ausbildung statt?",
    a: "Der theoretische Teil findet bei uns in der Bahnhofstraße 74–76, 45879 Gelsenkirchen statt. Die Praxisphase absolvierst du wohnortnah.",
  },
  {
    q: "Wie lange dauert die Ausbildung?",
    a: "Die Ausbildung dauert 12 Monate – ca. 6 Monate Theorie und ca. 6 Monate Praxis. Danach stehen dir viele Aufstiegsmöglichkeiten offen.",
  },
  {
    q: "Wo liegen die Gehaltsaussichten?",
    a: "Das Einstiegsgehalt liegt bei rund 4.000 € netto im Monat – zuzüglich Zulagen und Sozialleistungen.",
  },
  {
    q: "Bekomme ich ein Ausbildungsgehalt?",
    a: "Nein. Du erhältst aber während der Ausbildung weiterhin dein Arbeitslosengeld bzw. die Leistungen deines Kostenträgers.",
  },
];
