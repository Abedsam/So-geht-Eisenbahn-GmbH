// Inhalte der Landingpage /lokfuehrer-werden (Du-Ansprache)
import { nextCourseStart } from "./site";

export const landingHero = {
  title: "Werde Lokführer (m/w/d) und verdiene 4.000 € netto/Monat nach der Ausbildung!",
  text: "Starte deine Ausbildung zum Lokführer (m/w/d) bei uns in Gelsenkirchen und werde Teil eines unverzichtbaren Teams, das täglich Tausende Menschen und Güter sicher ans Ziel bringt.",
  video: { poster: "/images/placeholder-video-lokfuehrer.jpg", duration: "3:52", title: "Video: So wirst du Lokführer bei SGE" },
};

export const benefits = [
  {
    icon: "train" as const,
    title: "100 % Jobgarantie – deine sichere Zukunft auf Schienen",
    text: "Nach deiner erfolgreich abgeschlossenen Ausbildung wartet dein neuer Job schon auf dich – garantiert. Der Bedarf an gut ausgebildeten Lokführern wächst stetig, denn der Schienenverkehr wird kontinuierlich ausgebaut.",
  },
  {
    icon: "euro" as const,
    title: "Top-Gehalt und starke Zusatzleistungen",
    text: "Direkt nach der Ausbildung kannst du mit einem Einstiegsgehalt von rund 4.000 € netto im Monat rechnen. Dazu kommen attraktive Zulagen, umfangreiche Sozialleistungen und Aufstiegschancen.",
  },
  {
    icon: "check" as const,
    title: "Kostenfreie Ausbildung dank Bildungsgutschein",
    text: "Mit einem Bildungsgutschein von der Agentur für Arbeit, dem Jobcenter, der Rentenversicherung, der Bundeswehr oder der Berufsgenossenschaft nimmst du kostenfrei teil.",
  },
];

export const jobDescription = {
  lead: `So geht Eisenbahn bildet dich in nur 12 Monaten zum Lokführer (m/w/d) am Standort Gelsenkirchen aus. Du kannst am ${nextCourseStart} oder auch später starten. Ganz egal, ob du schon Erfahrung mitbringst oder als Quereinsteiger durchstarten willst – bei uns bist du herzlich willkommen!`,
  text: "Während deiner Ausbildung bereiten wir dich Schritt für Schritt auf deinen neuen Job als Lokführer vor. Danach übernimmst du verantwortungsvolle und abwechslungsreiche Aufgaben:",
  tasks: [
    "Du steuerst Triebfahrzeuge im Regionalverkehr, bei S-Bahnen oder im Güter- und Fernverkehr.",
    "Du erkennst kleine technische Störungen, beurteilst sie richtig und behebst sie, wenn möglich, direkt selbst.",
    "Du sorgst dafür, dass deine Fahrgäste oder deine Fracht sicher, pünktlich und zuverlässig ihr Ziel erreichen.",
  ],
};

export const trainingExpectations = [
  "In den ersten ~6 Monaten besuchst du den theoretischen Unterricht bei der So geht Eisenbahn GmbH",
  "Danach folgen wohnortnahe Praxiseinsätze für weitere ~6 Monate",
  "Du bekommst eine moderne Ausbildung – mit Simulatoren, digitalen Boards und Tablets",
  "Du qualifizierst dich zum eigenständigen Führen von Lok- und Triebfahrzeugen",
  "Und wenn's mal hakt: Auf Wunsch erhältst du tägliche Nachhilfe",
];

export const idealProfile = [
  "Du bist mindestens 20 Jahre alt",
  "Du hast mindestens einen Hauptschulabschluss oder eine abgeschlossene Berufsausbildung",
  "Du verfügst über gute Deutschkenntnisse auf B1/B2-Niveau",
  "Du bist körperlich und psychisch geeignet (nach Eignungsuntersuchung)",
  "Zuverlässigkeit und die Bereitschaft zum Schichtdienst bringst du mit",
  "Du kannst eine Auskunft aus dem Fahreignungsregister vorlegen",
  "Du bist Quereinsteiger oder arbeitssuchend und möchtest beruflich neu durchstarten",
];

export type Testimonial = { name: string; background: string; poster: string; duration: string };

export const testimonials: Testimonial[] = [
  { name: "Amar", background: "Gelernter Anlagenmechaniker", poster: "/images/placeholder-testimonial-amar.jpg", duration: "2:16" },
  { name: "Daniel", background: "Ehemaliger Management-Mitarbeiter", poster: "/images/placeholder-testimonial-daniel.jpg", duration: "2:28" },
  { name: "Michael", background: "Ehemaliger Maschinenbauingenieur", poster: "/images/placeholder-testimonial-michael.jpg", duration: "2:09" },
  { name: "Can", background: "Gelernter KFZ-Mechatroniker", poster: "/images/placeholder-testimonial-can.jpg", duration: "4:16" },
];

// Bewerbungs-Funnel: Schritte 1–4 als Auswahlfragen, Schritt 5 Kontaktdaten
export const quizSteps = [
  {
    name: "situation",
    question: "Wie ist deine aktuelle berufliche Situation?",
    options: ["Ich bin arbeitssuchend gemeldet", "Ich habe einen Minijob mit Verdienstgrenze", "Ich bin angestellt in Voll- oder Teilzeit"],
  },
  {
    name: "german",
    question: "Sprichst du Deutsch mindestens auf B1/B2-Niveau?",
    options: ["Ja, mindestens B1/B2", "Nein, noch nicht"],
  },
  {
    name: "qualification",
    question: "Bist du mindestens 20 Jahre alt und hast einen Schulabschluss oder eine Berufsausbildung?",
    options: ["Ja, beides trifft zu", "Nur eins davon", "Nein"],
  },
  {
    name: "start",
    question: "Wann möchtest du starten?",
    options: [`Zum nächsten Kursstart am ${nextCourseStart}`, "Später"],
  },
] as const;
