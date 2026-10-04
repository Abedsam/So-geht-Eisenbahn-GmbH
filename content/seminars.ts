// Seminare für Triebfahrzeugführer – ein Datensatz pro Seminar, gerendert über <SeminarTemplate>

export type SeminarDate = { id: string; label: string; start: string; end: string };

export type Seminar = {
  slug: "etcs" | "lzb";
  title: string;
  shortTitle: string;
  teaser: string;
  heroImage: string;
  heroAlt: string;
  cardImage: string;
  intro: [string, string];
  contentGroups: { title: string; items: string[] }[];
  facts: { label: string; value: string }[];
  priceEur: number;
  durationDays: number;
  dates: SeminarDate[];
};

const commonFacts = {
  requirements: "Triebfahrzeugführerschein Klasse B oder Klasse 3 nach VDV – auch während der Ausbildung möglich",
  audience: "Triebfahrzeugführer, Tf in Ausbildung sowie Eisenbahnverkehrsunternehmen, die ihr Personal qualifizieren möchten",
  duration: "5 Tage inkl. Prüfung",
  schedule: "Vollzeit, 8 Unterrichtseinheiten pro Tag",
  location: "Theorie online und/oder in Präsenz, Simulatortraining in Gelsenkirchen",
};

export const seminars: Seminar[] = [
  {
    slug: "etcs",
    title: "European Train Control System (ETCS)",
    shortTitle: "ETCS",
    teaser:
      "ETCS-Seminare vermitteln Triebfahrzeugführern das Wissen zur sicheren Bedienung des europäischen Zugbeeinflussungssystems – inklusive Simulatortraining.",
    heroImage: "/images/placeholder-hero-seminar-etcs.jpg",
    heroAlt: "Führerstand mit ETCS-Anzeige im Simulator",
    cardImage: "/images/placeholder-seminar-etcs.jpg",
    intro: [
      "In dieser Weiterbildung erwerben Sie fundierte Kenntnisse über das European Train Control System (ETCS) mit Schwerpunkt auf Level 2. Sie verstehen Aufbau, Wirkungsweise und Betriebsarten und wenden das System sicher im Regelbetrieb an.",
      "Darüber hinaus werden Sie gezielt auf Abweichungen, Unregelmäßigkeiten und Störungen vorbereitet. Das Simulatortraining stärkt Ihre Handlungssicherheit und unterstützt ein souveränes Handeln im realen Fahrbetrieb.",
    ],
    contentGroups: [
      {
        title: "Theorie (online und/oder Präsenz)",
        items: [
          "Grundlagen von ETCS",
          "Einordnung in das europäische Leitsystem",
          "Wirkungsweise",
          "Betriebsarten",
          "Streckenseitige und fahrzeugseitige Einrichtungen",
          "Anzeigen im Führerraum",
        ],
      },
      {
        title: "ETCS Level 2",
        items: [
          "Vorbereitung der Fahrt",
          "Regelfahrten",
          "Überwachung und Systemeingriffe",
          "Abweichungen vom Regelbetrieb",
          "Unregelmäßigkeiten",
          "Störungen",
        ],
      },
      {
        title: "Praxis (Simulatortraining)",
        items: ["Regelbetrieb", "Störungen", "Realitätsnahe Szenarien", "Sicheres Entscheiden"],
      },
    ],
    facts: [
      { label: "Voraussetzungen", value: commonFacts.requirements },
      { label: "Zielgruppe", value: commonFacts.audience },
      { label: "Dauer", value: commonFacts.duration },
      { label: "Vollzeit", value: commonFacts.schedule },
      { label: "Gesamtkosten", value: "2.100 € pro Teilnehmer inkl. Prüfungsgebühr" },
      { label: "Standort", value: commonFacts.location },
    ],
    priceEur: 2100,
    durationDays: 5,
    dates: [{ id: "etcs-2026-06", label: "01.06.–05.06.2026", start: "2026-06-01", end: "2026-06-05" }],
  },
  {
    slug: "lzb",
    title: "Linienförmige Zugbeeinflussung (LZB) inkl. CIR-ELKE",
    shortTitle: "LZB inkl. CIR-ELKE",
    teaser:
      "Ein LZB-Seminar ist eine Weiterbildung für Triebfahrzeugführer zur sicheren Bedienung des Zugsicherungssystems, oft inklusive Simulatortraining.",
    heroImage: "/images/placeholder-hero-seminar-lzb.jpg",
    heroAlt: "Teilnehmer im LZB-Simulatortraining",
    cardImage: "/images/placeholder-seminar-lzb.jpg",
    intro: [
      "In dieser Weiterbildung erwerben Sie umfassende Kenntnisse zur Linienförmigen Zugbeeinflussung einschließlich der erweiterten Funktionen nach CIR-ELKE. Sie verstehen den technischen Aufbau, die Wirkungsweise und die betrieblichen Abläufe der LZB und sind in der Lage, diese sicher im Regelbetrieb anzuwenden.",
      "Darüber hinaus werden Sie gezielt auf Abweichungen, Unregelmäßigkeiten und Störungen vorbereitet. Das Simulatortraining stärkt Ihre Handlungssicherheit und unterstützt ein souveränes Handeln im realen Fahrbetrieb.",
    ],
    contentGroups: [
      {
        title: "Theorie (online und/oder Präsenz)",
        items: [
          "Grundlagen der LZB",
          "Streckenseitige Ausrüstung",
          "Fahrzeugseitige Ausrüstung",
          "Bedienung",
          "Anzeigen und Führungsgrößen",
          "CIR-ELKE",
          "Betriebsverfahren",
          "Störungen",
        ],
      },
      {
        title: "Praxis (Simulatortraining)",
        items: ["Regelbetrieb", "Störbetrieb", "LZB- und CIR-ELKE-Szenarien", "Handeln bei Störungen"],
      },
    ],
    facts: [
      { label: "Voraussetzungen", value: commonFacts.requirements },
      { label: "Zielgruppe", value: commonFacts.audience },
      { label: "Dauer", value: commonFacts.duration },
      { label: "Vollzeit", value: commonFacts.schedule },
      { label: "Gesamtkosten", value: "1.400 € pro Teilnehmer inkl. Prüfungsgebühr" },
      { label: "Standort", value: commonFacts.location },
    ],
    priceEur: 1400,
    durationDays: 5,
    dates: [{ id: "lzb-2026-06", label: "08.06.–12.06.2026", start: "2026-06-08", end: "2026-06-12" }],
  },
];

export const getSeminar = (slug: Seminar["slug"]) => {
  const s = seminars.find((x) => x.slug === slug);
  if (!s) throw new Error(`Seminar ${slug} nicht gefunden`);
  return s;
};
