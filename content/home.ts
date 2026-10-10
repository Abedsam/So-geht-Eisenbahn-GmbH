// Inhalte der Startseite

export type Station = {
  short: string;
  board: string;
  kicker: string;
  title: string;
  text: string;
  chips?: string[];
  /** Chips als Abfolge mit Pfeilen darstellen */
  sequence?: boolean;
  cta: string;
  href: string;
  img: string;
  alt: string;
  big?: boolean;
};

/** Zugreise: 6 Stationen */
export const stations: Station[] = [
  {
    short: "Ausbildung",
    board: "NÄCHSTER HALT",
    kicker: "Nächster Halt:",
    title: "Deine Ausbildung",
    text: "Der Zug fährt ein. In ca. 12 Monaten wirst du bei uns in Gelsenkirchen zum Triebfahrzeugführer – auch als Quereinsteiger.",
    cta: "Ausbildung entdecken",
    href: "/ausbildungen",
    img: "/assets/naechster-halt.png",
    alt: "Zug fährt an Gleis 1 ein, Anzeige: Nächster Halt Deine Ausbildung",
  },
  {
    short: "12 Monate",
    board: "FAHRPLAN",
    kicker: "12 Monate.",
    title: "Ein neues Berufsziel.",
    text: "Vom ersten Unterrichtstag bis in den Führerstand – mit klarer Route und festen Haltepunkten.",
    chips: ["Theorie", "Praxis", "Prüfung", "Karriere"],
    sequence: true,
    cta: "Lokführer werden",
    href: "/lokfuehrer-werden",
    img: "/assets/zug-kurve.png",
    alt: "Zug in einer Kurve im Sonnenuntergang",
  },
  {
    short: "Weiterbildung",
    board: "ANSCHLUSS",
    kicker: "Nächster Halt:",
    title: "Weiterbildung",
    text: "Schon im Beruf? Halte dein Wissen aktuell – mit Fortbildungsunterricht, Disposition und Eisenbahngrundlagen.",
    cta: "Weiterbildungen entdecken",
    href: "/weiterbildungen",
    img: "/assets/zug-fahrt.png",
    alt: "Moderner Zug in voller Fahrt",
  },
  {
    short: "Technik",
    board: "SIMULATOR",
    kicker: "Technik",
    title: "erleben.",
    text: "Trainiere Störungen, Prüfungsfahrten und Zugbeeinflussung realitätsnah am Führerstand-Simulator.",
    chips: ["Simulator-Training", "PZB", "LZB", "ETCS"],
    cta: "Seminare ansehen",
    href: "/seminare",
    img: "/assets/zug-drehgestell.png",
    alt: "Technikdetail: Drehgestell eines Triebzugs",
  },
  {
    short: "Partner",
    board: "UMSTIEG",
    kicker: "Gemeinsam",
    title: "ans Ziel.",
    text: "Unsere Kooperationspartner aus Personen- und Güterverkehr bieten dir Praxisplätze und echte Jobperspektiven.",
    chips: ["FlixTrain", "Rail Force", "ME-Rail", "SGL"],
    cta: "Partner kennenlernen",
    href: "/kooperationspartner",
    img: "/assets/zug-seite.png",
    alt: "Seitenansicht eines Zuges mit spiegelnden Fenstern",
  },
  {
    short: "Karrierestart",
    board: "ENDSTATION",
    kicker: "Endstation? Nein.",
    title: "Dein Karrierestart.",
    text: "Hier beginnt deine Zukunft im Führerstand – sicher, gefragt und gut bezahlt.",
    cta: "Jetzt Lokführer werden",
    href: "/lokfuehrer-werden",
    img: "/assets/zug-bahnsteig.png",
    alt: "Zug steht im modernen Bahnhof bereit zur Abfahrt",
    big: true,
  },
];

export const reasons = [
  { title: "100 % persönlich", text: "Feste Ansprechpartner vom ersten Anruf bis zur Prüfung – und auf Wunsch tägliche Nachhilfe." },
  { title: "Praxisnah", text: "Dozenten mit über 10 Jahren Betriebserfahrung und wohnortnahe Praxiseinsätze bei unseren Partnern." },
  { title: "Modern lernen", text: "Führerstand-Simulatoren, digitale Boards und Tablets – Lernen wie im echten Betrieb." },
  { title: "Fair & individuell", text: "Kostenfrei mit Bildungsgutschein, flexible Starttermine und Lerntempo, das zu dir passt." },
];

export const trainingFacts = [
  { term: "DAUER", value: "ca. 12 Monate" },
  { term: "THEORIE", value: "ca. 6 Monate" },
  { term: "PRAXIS", value: "ca. 6 Monate" },
  { term: "SPRACHE", value: "ab B1" },
  { term: "STANDORT", value: "Gelsenkirchen" },
  { term: "FÖRDERUNG", value: "möglich", highlight: true },
];

export const fundingSteps = [
  { label: "HALT 01", title: "Ausbildung", text: "Du entscheidest dich für deinen Gleiswechsel." },
  { label: "HALT 02", title: "Bildungsgutschein", text: "Wir unterstützen dich beim Antrag bei deinem Kostenträger." },
  { label: "HALT 03", title: "Förderung", text: "Die Kosten der Ausbildung werden vollständig übernommen." },
  { label: "ZIEL", title: "Karrierestart", text: "Du steigst in den Führerstand – mit sicherer Perspektive." },
];

export const trainings = [
  { title: "Simulator-Training", text: "Zusi-Simulator, PZB, LZB und ETCS Level 2 – realitätsnah trainieren.", href: "/weiterbildungen#simulator", img: "/assets/zug-detail.png", alt: "Scheinwerfer eines modernen Triebzugs" },
  { title: "Fortbildungsunterricht", text: "Regelmäßiger RFU für Triebfahrzeugführer nach Vorgaben deines EVU.", href: "/weiterbildungen#rfu", img: "/assets/zug-innen.png", alt: "Innenraum eines modernen Regionalzugs" },
  { title: "Disposition", text: "Betriebssteuerung, Leitstelle und Personaleinsatz im Bahnbetrieb.", href: "/weiterbildungen#disposition", img: "/assets/zug-kurve.png", alt: "Zug in einer Gleiskurve" },
  { title: "Eisenbahngrundlagen", text: "Der kompakte Einstieg in Technik, Betrieb und Regelwerk.", href: "/weiterbildungen#grundlagen", img: "/assets/zug-seite.png", alt: "Seitenansicht eines Zuges" },
];

export const seminarTeasers = [
  { name: "LZB", text: "Linienförmige Zugbeeinflussung · inkl. CIR-ELKE", href: "/seminare/lzb", img: "/assets/zug-fahrt.png", alt: "Zug in voller Fahrt auf der Schnellfahrstrecke", position: "35% 50%" },
  { name: "ETCS", text: "European Train Control System · Level 2", href: "/seminare/etcs", img: "/assets/zug-drehgestell.png", alt: "Detailansicht Drehgestell und Fahrwerk eines modernen Triebzugs", position: "50% 50%" },
];

// TODO(Kunde): echte Partnerlogos liefern – bis dahin Namen als Platzhalter-Kacheln
export const partnerNames = ["FlixTrain", "SGL", "Rail Force", "ME-Rail", "LZB92", "Powerlines", "MBS", "Mittelweserbahn"];
