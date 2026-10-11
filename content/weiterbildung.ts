import { asset } from "@/lib/asset";

// Inhalte für /weiterbildungen, /seminare, /seminare/lzb und /seminare/etcs

export type Service = {
  id: "simulator" | "rfu" | "disposition" | "grundlagen";
  title: string;
  img: string;
  alt: string;
  text: string;
  tags?: string[];
  benefits: string[];
  target: string;
  cta: string;
};

/** Weiterbildungen – je eine Sektion mit Anker (#simulator, #rfu, #disposition, #grundlagen) */
export const services: Service[] = [
  {
    id: "simulator",
    title: "Simulator-Training",
    img: asset("/assets/zug-detail.png"),
    alt: "Scheinwerfer eines modernen Triebzugs",
    text: "Realitätsnahes Training am Führerstand-Simulator: Zugbeeinflussung, Störungen und Prüfungsfahrten – reproduzierbar und ohne Betriebsrisiko.",
    tags: ["Zusi", "PZB", "LZB", "ETCS Level 2", "ERTMS", "Prüfungsfahrten", "Überwachungsfahrten", "Individualtraining"],
    benefits: ["Störfälle sicher trainieren", "Prüfungsvorbereitung 1:1", "Flexible Einzeltermine"],
    target: "Triebfahrzeugführer, Auszubildende und EVU, die Personal schulen oder überwachen.",
    cta: "Simulator buchen",
  },
  {
    id: "rfu",
    title: "Fortbildungsunterricht / RFU",
    img: asset("/assets/zug-innen.png"),
    alt: "Innenraum eines modernen Regionalzugs",
    text: "Regelmäßiger Fortbildungsunterricht für Triebfahrzeugführer – aktuell, praxisnah und abgestimmt auf die Vorgaben deines Eisenbahnverkehrsunternehmens.",
    benefits: ["Regelwerksänderungen kompakt", "Nachweis für dein EVU", "Inhouse oder bei uns"],
    target: "Aktive Triebfahrzeugführer und Eisenbahnverkehrsunternehmen.",
    cta: "RFU anfragen",
  },
  {
    id: "disposition",
    title: "Disposition",
    img: asset("/assets/zug-kurve.png"),
    alt: "Zug in einer Gleiskurve bei Sonnenuntergang",
    text: "Betriebssteuerung, Leitstellendisposition und Personaleinsatzplanung – von Praktikern, die selbst jahrelang in der Leitstelle gearbeitet haben.",
    benefits: ["Leitstellenpraxis", "Planungstools verstehen", "Neuer Karriereweg"],
    target: "Eisenbahner, die in Leitstelle oder Disposition wechseln wollen.",
    cta: "Disposition anfragen",
  },
  {
    id: "grundlagen",
    title: "Eisenbahngrundlagen",
    img: asset("/assets/zug-seite.png"),
    alt: "Seitenansicht eines Zuges",
    text: "Der kompakte Einstieg ins System Bahn: Infrastruktur, Fahrzeuge, Betrieb und Regelwerk verständlich erklärt.",
    benefits: ["Kein Vorwissen nötig", "Kompakt in wenigen Tagen", "Ideal vor dem Einstieg"],
    target: "Quereinsteiger, Verwaltung, Dienstleister und alle Neugierigen im Bahnumfeld.",
    cta: "Grundlagen anfragen",
  },
];

/** Hero-Sprunglinks auf /weiterbildungen */
export const serviceJumpLinks = [
  { href: "#simulator", label: "01 Simulator-Training" },
  { href: "#rfu", label: "02 Fortbildungsunterricht" },
  { href: "#disposition", label: "03 Disposition" },
  { href: "#grundlagen", label: "04 Eisenbahngrundlagen" },
];

/** Übersichtskarten auf /seminare */
export const seminarCards = [
  {
    label: "SEMINAR 01",
    name: "LZB",
    subtitle: "Linienförmige Zugbeeinflussung inkl. CIR-ELKE",
    text: "Bedienung, Betriebsverfahren, Störungen und Unregelmäßigkeiten – mit Simulatorfahrten auf LZB-Strecken.",
    href: "/seminare/lzb",
    img: asset("/assets/zug-fahrt.png"),
    alt: "Zug in voller Fahrt auf einer elektrifizierten Strecke",
    position: "35% 50%",
  },
  {
    label: "SEMINAR 02",
    name: "ETCS",
    subtitle: "European Train Control System · Level 2",
    text: "Fahrzeugausrüstung, DMI, Betriebsarten und Systemeingriffe – fit für das europäische Zugsicherungssystem.",
    href: "/seminare/etcs",
    img: asset("/assets/zug-drehgestell.png"),
    alt: "Drehgestell und Fahrwerk eines modernen Triebzugs",
    position: "50% 50%",
  },
];

export type SeminarDetail = {
  /** Kurzname für Brotkrumen (Versalien) */
  crumb: string;
  title: string;
  lead: string;
  cta: string;
  heroImg: string;
  heroAlt: string;
  heroPosition: string;
  whatTitle: string;
  whatText: string;
  /** Mindestbreite der Modulkarten im Raster */
  moduleMin: number;
  modules: { title: string; text: string }[];
  requirements: string;
  audience: string;
  facts: { term: string; value: string }[];
  ctaTitle: string;
};

// TODO(Kunde): Kursdaten (Dauer, Format) bestätigen
const facts = [
  { term: "DAUER", value: "nach Absprache" },
  { term: "ORT", value: "Gelsenkirchen oder Inhouse" },
  { term: "FORMAT", value: "Theorie + Simulator" },
  { term: "ABSCHLUSS", value: "Teilnahmebescheinigung" },
];

export const lzb: SeminarDetail = {
  crumb: "LZB",
  title: "LZB & CIR-ELKE",
  lead: "Linienförmige Zugbeeinflussung sicher beherrschen – von der Bedienung bis zur Störung, mit Simulatorfahrten auf LZB-Strecken.",
  cta: "LZB Seminar anfragen",
  heroImg: asset("/assets/zug-fahrt.png"),
  heroAlt: "Zug in voller Fahrt auf einer Schnellfahrstrecke",
  heroPosition: "35% 50%",
  whatTitle: "Was ist LZB?",
  whatText:
    "Die Linienförmige Zugbeeinflussung überträgt Führungsgrößen wie Soll-Geschwindigkeit und Zielentfernung kontinuierlich über einen Linienleiter im Gleis an das Fahrzeug. Sie ermöglicht Geschwindigkeiten über 160 km/h und dichte Zugfolgen. CIR-ELKE erweitert die LZB um zusätzliche Blockabschnitte für noch mehr Streckenkapazität.",
  moduleMin: 300,
  modules: [
    { title: "Systemgrundlagen", text: "Aufbau der LZB, Linienleiter, Führungsgrößen und Anzeigen im Führerstand." },
    { title: "Betriebsverfahren", text: "Fahren unter LZB-Führung, Übergänge zu PZB, Ein- und Ausfahrt aus LZB-Bereichen." },
    { title: "CIR-ELKE", text: "Zusätzliche Teilblockabschnitte, Besonderheiten und Bedienung." },
    { title: "Störungen", text: "Typische Fahrzeug- und Streckenstörungen erkennen und richtig handeln." },
    { title: "Betriebliche Unregelmäßigkeiten", text: "Ersatzsignale, Befehle und Kommunikation mit dem Fahrdienstleiter." },
    { title: "Simulatortraining", text: "Realitätsnahe Fahrten mit eingespielten Störfällen am Führerstand-Simulator." },
  ],
  requirements: "Gültiger Triebfahrzeugführerschein, PZB-Kenntnisse und gültige Tauglichkeit.",
  audience: "Triebfahrzeugführer im Personen- und Güterverkehr, die auf LZB-ausgerüsteten Strecken fahren oder fahren werden.",
  facts,
  ctaTitle: "Bereit für die LZB-Strecke?",
};

export const etcs: SeminarDetail = {
  crumb: "ETCS",
  title: "ETCS Level 2",
  lead: "Das europäische Zugsicherungssystem verstehen und sicher bedienen – mit Theorie, Praxisfällen und Simulatorfahrten.",
  cta: "ETCS Seminar anfragen",
  heroImg: asset("/assets/zug-drehgestell.png"),
  heroAlt: "Drehgestell eines modernen Triebzugs im Gegenlicht",
  heroPosition: "50% 50%",
  whatTitle: "Was ist ETCS?",
  whatText:
    "Das European Train Control System ist das einheitliche Zugsicherungssystem Europas. In Level 2 erhält das Fahrzeug Fahrterlaubnisse per Funk (GSM-R) von der Streckenzentrale; Balisen dienen der Ortung. Klassische Signale können entfallen – der Führerstand wird zur zentralen Informationsquelle.",
  moduleMin: 280,
  modules: [
    { title: "Fahrzeugausrüstung", text: "EVC, Balisenantenne, Odometrie, GSM-R und ihr Zusammenspiel." },
    { title: "Führerstandsanzeigen", text: "Aufbau und Bedienung des Driver Machine Interface (DMI)." },
    { title: "Regelbetrieb", text: "Start of Mission, Betriebsarten und Fahren in Full Supervision." },
    { title: "Zugüberwachung", text: "Bremskurven, Geschwindigkeitsüberwachung und Fahrterlaubnisse." },
    { title: "Systemeingriffe", text: "Warnungen, Betriebs- und Zwangsbremsungen richtig einordnen." },
    { title: "Störungen", text: "Funkausfall, Balisenfehler und Fahrzeugstörungen bewältigen." },
    { title: "Betriebliche Unregelmäßigkeiten", text: "Staff Responsible, Override und Kommunikation mit dem Fdl." },
    { title: "Simulatortraining", text: "ETCS-Level-2-Fahrten mit eingespielten Störfällen." },
  ],
  requirements: "Gültiger Triebfahrzeugführerschein, Grundkenntnisse PZB/LZB und gültige Tauglichkeit.",
  audience: "Triebfahrzeugführer und EVU, die auf ETCS-Strecken oder mit ETCS-Fahrzeugen eingesetzt werden.",
  facts,
  ctaTitle: "Fit für ETCS?",
};
