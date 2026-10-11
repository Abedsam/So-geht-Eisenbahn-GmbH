import type { Faq } from "@/content/faq";

/* ───────────── /ausbildungen ───────────── */

export const ausbildungVorteile = [
  { title: "Jobperspektiven", text: "Lokführer werden bundesweit dringend gesucht." },
  { title: "Praxisorientiert", text: "Simulator, Fahrzeugkunde und Einsätze im echten Betrieb." },
  { title: "Erfahrene Prüfer & Dozenten", text: "DEKRA-zertifiziert, mit über 10 Jahren Betriebserfahrung." },
  { title: "Förderung möglich", text: "Kostenfrei mit Bildungsgutschein – wir helfen beim Antrag." },
  { title: "Persönliche Betreuung", text: "Kleine Gruppen und feste Ansprechpartner." },
];

export const tfInhalte = [
  "Theorie: Betrieb, Signale, Fahrzeugtechnik, Regelwerk",
  "Praxis: Begleitfahrten und Einsätze bei Partner-EVU",
  "Prüfungen: Theorie, Praxis und Fahrzeugkunde",
  "Karriere: Regional-, S-Bahn-, Güter- oder Fernverkehr",
];

export const tfVoraussetzungen = [
  { term: "MINDESTALTER", value: "20 Jahre" },
  { term: "SCHULABSCHLUSS", value: "Hauptschulabschluss oder abgeschlossene Berufsausbildung" },
  { term: "DEUTSCHKENNTNISSE", value: "mindestens B1, ideal B2" },
  { term: "MEDIZINISCHE EIGNUNG", value: "Tauglichkeitsuntersuchung nach TfV" },
  { term: "PSYCHOLOGISCHE EIGNUNG", value: "Psychologischer Eignungstest" },
  { term: "SCHICHTBEREITSCHAFT", value: "Bereitschaft zu Schicht- und Wochenenddienst" },
];

export const wegSteps = [
  { title: "Informieren", text: "Infoveranstaltung oder Beratungsgespräch." },
  { title: "Eignung prüfen", text: "Medizinische und psychologische Untersuchung." },
  { title: "Ausbildung starten", text: "Rund 6 Monate Theorie in Gelsenkirchen." },
  { title: "Praxis absolvieren", text: "Rund 6 Monate wohnortnah im Betrieb." },
  { title: "Prüfung", text: "Abschluss bei der anerkannten Prüfstelle." },
  { title: "Karriere starten", text: "Dein erster Dienst im Führerstand." },
];

export const nachschulungInfos = [
  {
    label: "INHALTE",
    text: "Fehlende Module aus Betriebsdienst, Fahrzeugtechnik und Infrastruktur – individuell nach deinem Stand.",
  },
  { label: "PRAXIS", text: "Simulatorfahrten und praktische Anteile, abgestimmt auf die geforderten Nachweise." },
  { label: "VORAUSSETZUNGEN", text: "Abgeschlossene Tf-Ausbildung bzw. Teilqualifikation sowie gültige Tauglichkeit." },
  { label: "ZIELGRUPPE", text: "Triebfahrzeugführer mit Qualifikationslücke, Rückkehrer und Umsteiger aus dem Ausland." },
  { label: "FÖRDERUNG", text: "Je nach Situation über Bildungsgutschein oder deinen Arbeitgeber förderfähig." },
];

/* ───────────── /lokfuehrer-werden ───────────── */

export const route = [
  { label: "START", meta: "Monat 0" },
  { label: "Theorie", meta: "Monat 1–6" },
  { label: "Praxis", meta: "Monat 7–12" },
  { label: "Prüfung", meta: "§15 TfV" },
  { label: "LOKFÜHRER", meta: "Ziel" },
];

export const kennzahlen = [
  { count: 4000, suffix: " €", display: "4.000 €", label: "netto/Monat Einstieg – ca." },
  { count: 100, suffix: " %", display: "100 %", label: "Jobgarantie nach Abschluss" },
  { count: 0, suffix: " €", display: "0 €", label: "Kosten mit Bildungsgutschein" },
];

export const erwartung = [
  "Du steuerst Triebfahrzeuge im Regionalverkehr, bei S-Bahnen oder im Güter- und Fernverkehr.",
  "Du erkennst technische Störungen, beurteilst sie richtig und behebst sie, wenn möglich, selbst.",
  "Du bringst Fahrgäste oder Fracht sicher, pünktlich und zuverlässig ans Ziel.",
];

export const requirements = [
  "Mindestens 20 Jahre alt",
  "Hauptschulabschluss oder abgeschlossene Berufsausbildung",
  "Gute Deutschkenntnisse (B1/B2)",
  "Körperliche und psychische Eignung",
  "Zuverlässig und bereit zum Schichtdienst",
  "Auskunft aus dem Fahreignungsregister",
  "Quereinsteiger oder arbeitssuchend – Neustart willkommen",
];

// TODO(Kunde): Videos der Teilnehmer einbinden (derzeit Platzhalter wie im Design)
export const testimonials = [
  { name: "Amar", role: "Gelernter Anlagenmechaniker", dur: "2:16", quote: "Ich wollte etwas mit Zukunft – jetzt sitze ich vorne." },
  { name: "Daniel", role: "Ehem. Management", dur: "2:28", quote: "Kleine Gruppen, echte Praktiker. Genau das hat mir geholfen." },
  { name: "Michael", role: "Ehem. Maschinenbauingenieur", dur: "2:09", quote: "Der Simulator bereitet dich auf jede Situation vor." },
  { name: "Can", role: "Gelernter KFZ-Mechatroniker", dur: "4:16", quote: "Vom ersten Anruf an hatte ich feste Ansprechpartner." },
];

export const lokfuehrerFaq: Faq[] = [
  {
    question: "Wo findet die Ausbildung statt?",
    answer:
      "Der theoretische Teil findet in der Bahnhofstraße 74–76, 45879 Gelsenkirchen statt. Die Praxisphase absolvierst du wohnortnah bei unseren Partnern.",
  },
  {
    question: "Wie lange dauert die Ausbildung?",
    answer: "Rund 12 Monate: ca. 6 Monate Theorie und ca. 6 Monate Praxis, abgeschlossen mit der Prüfung nach §15 TfV.",
  },
  {
    question: "Was kostet die Ausbildung?",
    answer:
      "Mit Bildungsgutschein der Agentur für Arbeit, des Jobcenters oder eines anderen Kostenträgers ist sie für dich kostenfrei. Wir helfen beim Antrag.",
  },
  {
    question: "Bekomme ich ein Ausbildungsgehalt?",
    answer: "Nein, du erhältst während der Ausbildung aber weiterhin Leistungen deines Kostenträgers, z. B. Arbeitslosengeld.",
  },
  {
    question: "Wie viel verdiene ich danach?",
    answer: "Das Einstiegsgehalt liegt bei rund 4.000 € netto im Monat – zuzüglich Zulagen und Sozialleistungen.",
  },
  {
    question: "Kann ich als Quereinsteiger starten?",
    answer: "Ja. Du brauchst keine Vorerfahrung im Bahnbereich – nur die Grundvoraussetzungen und Lust auf Verantwortung.",
  },
];
