import { funders } from "./site";

// ---------- Ausbildungen ----------

export const offerList = [
  "100 % Jobgarantie nach erfolgreichem Abschluss",
  "Praxisorientierte und wohnortnahe Ausbildung",
  "Erfahrene, DEKRA-zertifizierte Prüfer",
  "Finanzierung über den Bildungsgutschein",
  "Attraktive Verdienstmöglichkeiten und umfangreiche Sozialleistungen",
];

export type CourseTab = { id: string; label: string; intro?: string; items: string[]; todo?: boolean };

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  image: string;
  imageAlt: string;
  tabs: CourseTab[];
};

export const courses: Course[] = [
  {
    id: "triebfahrzeugfuehrer",
    title: "Triebfahrzeugführer (m/w/d)",
    subtitle: "12-monatige Umschulung",
    description: [
      "Wir organisieren eine umfangreiche 12-monatige Umschulung zum Triebfahrzeugführer über ein Eisenbahnverkehrsunternehmen.",
      "Die Lehrpläne haben wir gemeinsam mit unseren Kooperationspartnern entwickelt. Der Unterricht findet in unseren Räumen in Gelsenkirchen und online statt.",
    ],
    image: "/images/placeholder-teilnehmer-simulator.jpg",
    imageAlt: "Teilnehmer im Führerstand-Simulator",
    tabs: [
      {
        id: "taetigkeiten",
        label: "Tätigkeiten",
        items: [
          "Sicherer Transport von Fahrgästen und Gütern",
          "Steuern von Triebfahrzeugen im Regional-, S-Bahn-, Güter- und Fernverkehr",
          "Technische Störungen erkennen, beurteilen und – wenn möglich – selbst beheben",
        ],
      },
      {
        id: "voraussetzungen",
        label: "Voraussetzungen",
        items: [
          "Mindestens 20 Jahre alt",
          "Mindestens Hauptschulabschluss oder abgeschlossene Berufsausbildung",
          "Deutschkenntnisse auf B1-Niveau",
          "Bestandene medizinische und psychologische Eignungsuntersuchung",
          "Bereitschaft zum Schichtdienst",
          "Auskunft aus dem Fahreignungsregister",
        ],
      },
      {
        id: "zielgruppe",
        label: "Zielgruppe",
        items: [
          "Arbeitsuchende",
          "Quereinsteiger",
          "Menschen aller Nationalitäten ab Deutschniveau B1",
          "Personen über 50 Jahre",
        ],
      },
      {
        id: "finanzierung",
        label: "Finanzierung",
        intro: "Die Umschulung ist über einen Bildungsgutschein förderfähig, zum Beispiel durch:",
        items: [...funders],
      },
    ],
  },
  {
    id: "nachschulung",
    title: "Nachschulung Anlage 6/7 inkl. Prüfung",
    subtitle: "Wiedereinstieg und Abschluss",
    description: [
      "Über unsere Kooperationspartner bieten wir die Nachschulung nach Anlage 6/7 TfV inklusive Prüfung und Praktikum an.",
      "Sie richtet sich an alle, die ihre Ausbildung zum Triebfahrzeugführer nicht abgeschlossen haben oder wieder in den Beruf einsteigen möchten.",
    ],
    image: "/images/placeholder-unterricht.jpg",
    imageAlt: "Teilnehmer im Unterrichtsraum",
    // TODO(Kunde): Inhalte der Tabs für die Nachschulung liefern
    tabs: [
      { id: "inhalte", label: "Inhalte", items: ["Wiederholung Betriebsdienst und Fahrzeugtechnik", "Prüfungsvorbereitung Anlage 6/7 TfV", "Praktikum bei einem Kooperationspartner"], todo: true },
      { id: "voraussetzungen", label: "Voraussetzungen", items: ["Begonnene oder frühere Ausbildung zum Triebfahrzeugführer", "Gültige Eignungsuntersuchung"], todo: true },
      { id: "zielgruppe", label: "Zielgruppe", items: ["Tf ohne abgeschlossene Prüfung", "Wiedereinsteiger in den Beruf"], todo: true },
      { id: "finanzierung", label: "Finanzierung", intro: "Förderung über Bildungsgutschein möglich, zum Beispiel durch:", items: [...funders], todo: true },
    ],
  },
];

// ---------- Weiterbildungen ----------

export type TrainingBlock = {
  id: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  points?: { title: string; text: string }[];
};

export const trainings: TrainingBlock[] = [
  {
    id: "simulator",
    title: "Simulator-Training",
    text: "Unser Zusi-Bahnsimulator bietet originalgetreue Führerstände, zum Beispiel der Siemens Vectron BR 193, und bildet auch Dualmode-Fahrzeuge ab. Er steht Eisenbahnverkehrsunternehmen und Privatpersonen offen.",
    image: "/images/placeholder-wb-simulator.jpg",
    imageAlt: "Zusi-Simulator mit originalgetreuem Vectron-Führerstand",
    points: [
      { title: "Einsatzspektrum des Simulators", text: "Von der Streckenkunde über Störungsszenarien bis zum Training neuer Zugbeeinflussungssysteme." },
      { title: "Gut gerüstet für den Strecken-Alltag", text: "Realitätsnahe Fahrten ohne Risiko – ideal zur Vorbereitung und Auffrischung." },
    ],
  },
  {
    id: "rfu",
    title: "Fortbildungsunterricht (RFU) für Triebfahrzeugführer",
    text: "DEKRA-zertifizierte Prüfer halten Ihr Personal auf dem aktuellen Stand der Vorschriften und trainieren den sicheren Umgang mit Unregelmäßigkeiten und Störfällen.",
    image: "/images/placeholder-wb-rfu.jpg",
    imageAlt: "Fortbildungsunterricht für Triebfahrzeugführer",
    points: [
      { title: "Für jeden Bedarf", text: "Inhalte passend zu Ihren Fahrzeugen, Strecken und Betriebsverfahren." },
      { title: "Flexible Termine", text: "Schulungen nach Absprache – bei uns in Gelsenkirchen oder online." },
    ],
  },
  {
    id: "disposition",
    title: "Disposition",
    text: "Wir beraten zum Anreizsystem und zur Verspätungskodierung der DB InfraGO AG, unterstützen bei der Optimierung der Trassengebühren-Abrechnung und bilden Leitstellenpersonal fort.",
    image: "/images/placeholder-wb-disposition.jpg",
    imageAlt: "Leitstelle mit Dispositionsbildschirmen",
  },
  {
    id: "grundlagen",
    title: "Eisenbahngrundlagen",
    text: "Schulungen für branchenfremde Mitarbeitende, zum Beispiel im Leitstellenmanagement oder in der Verwaltung – damit alle die Sprache der Eisenbahn verstehen.",
    image: "/images/placeholder-wb-grundlagen.jpg",
    imageAlt: "Eisenbahngrundlagen-Schulung im Seminarraum",
  },
];

// ---------- Startseite: Weiterbildungsbereiche ----------

export const trainingAreas = [
  { audience: "Für Teilnehmer", title: "Schulung ETCS Level 2", text: "Einwöchige Schulung zum europäischen Zugbeeinflussungssystem.", image: "/images/placeholder-wb-teilnehmer.jpg", href: "/seminare/etcs" },
  { audience: "Für Absolventen", title: "Prüfungsvorbereitung", text: "Anlage 5 sowie Anlage 6/7 – Dauer 2 bis 4 Wochen.", image: "/images/placeholder-wb-absolventen.jpg", href: "/ausbildungen#nachschulung" },
  { audience: "Für Unternehmen", title: "Maßgeschneiderte Schulungen", text: "Simulatortraining, Weiterbildung für Disponenten, Consulting und vieles mehr.", image: "/images/placeholder-wb-unternehmen.jpg", href: "/weiterbildungen" },
];
