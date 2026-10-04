export type TeamMember = {
  slug: string;
  firstName: string;
  name: string;
  role: string;
  /** Kurztext für die Landingpage (Du-Ansprache) */
  short: string;
  /** Platzhalter-Porträt – durch echtes Foto ersetzen */
  image: string;
};

export const team: TeamMember[] = [
  {
    slug: "kai",
    firstName: "Kai",
    name: "Kai Cornelius",
    role: "Spezialist für innovative Ausbildung, DEKRA-zertifizierter Prüfer für Triebfahrzeugführer",
    short: "Gestaltet als Spezialist für innovative Ausbildung im Eisenbahnwesen deine Zukunft als Lokführer mit.",
    image: "/images/placeholder-team-kai.jpg",
  },
  {
    slug: "kevin",
    firstName: "Kevin",
    name: "Kevin Delling",
    role: "Experte für Bahnbetrieb, Leitstellendisposition und Anreizsystem",
    short: "Nutzt Know-how als Experte im Bahnbetrieb, in der Leitstellendisposition und in Anreizsystemen.",
    image: "/images/placeholder-team-kevin.jpg",
  },
  {
    slug: "jens",
    firstName: "Jens",
    name: "Jens Carstens",
    role: "Dozent, gelernter Eisenbahner",
    short: "Ist Dozent und führt Teilnehmer fachgerecht und zielgerichtet durch ihre Ausbildung.",
    image: "/images/placeholder-team-jens.jpg",
  },
  {
    slug: "markus",
    firstName: "Markus",
    name: "Markus Pusch",
    role: "Dozent, Ausbilder und Prüfer",
    short: "Bringt langjährige Erfahrung als Dozent sowie als Ausbilder und Prüfer mit.",
    image: "/images/placeholder-team-markus.jpg",
  },
  {
    slug: "miriam",
    firstName: "Miriam",
    name: "Miriam Girschofski-Cornelius",
    role: "Leitung Akquise (Personalakquise & B2B)",
    short: "Begeistert zukünftige Lokführer und begleitet dich vom ersten Kontakt bis zum Ausbildungsstart.",
    image: "/images/placeholder-team-miriam.jpg",
  },
  {
    slug: "donjeta",
    firstName: "Donjeta",
    name: "Donjeta Ramic",
    role: "Mitarbeiterin Akquise, Ansprechpartnerin für Bewerber",
    short: "Unterstützt unser Team in der Akquise und ist Ansprechpartnerin für Interessenten und Bewerber.",
    image: "/images/placeholder-team-donjeta.jpg",
  },
  {
    slug: "laura",
    firstName: "Laura",
    name: "Laura König",
    role: "Leitung Ausbildung, gelernte Triebfahrzeugführerin",
    short: "Vermittelt als Dozentin und macht den Unterricht mit Praxiserfahrung verständlich und spannend.",
    image: "/images/placeholder-team-laura.jpg",
  },
];
