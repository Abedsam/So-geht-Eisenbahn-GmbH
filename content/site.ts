// Stammdaten, Navigation und wiederkehrende Inhalte (Design-Handoff „So geht Eisenbahn“)

export const site = {
  name: "So geht Eisenbahn GmbH",
  shortName: "SGE",
  url: "https://so-geht-eisenbahn.de",
  description:
    "Gleiswechsel in deine Zukunft: Ausbildung zum Lokführer, Weiterbildungen, Simulator-Training und LZB/ETCS-Seminare in Gelsenkirchen. Förderung möglich.",
  phone: "+49 209 8849 4686",
  phoneHref: "tel:+4920988494686",
  email: "hey@so-geht-eisenbahn.de",
  address: {
    street: "Bahnhofstraße 74–76",
    zip: "45879",
    city: "Gelsenkirchen",
    country: "DE",
  },
  social: [
    { name: "YouTube", href: "https://www.youtube.com/@SogehtEisenbahn" },
    { name: "TikTok", href: "https://www.tiktok.com/@so_geht_eisenbahn" },
    { name: "Instagram", href: "https://www.instagram.com/so_geht_eisenbahn/" },
    { name: "Facebook", href: "https://www.facebook.com/people/SGE-So-geht-Eisenbahn-GmbH/61556512314248/" },
  ],
} as const;

export const nextCourseStart = "02.11.26";

/** Laufband oben im Header */
export const ticker = [
  { title: "Kursstart Triebfahrzeugführer (m/w/d):", text: nextCourseStart, cta: "Jetzt bewerben", href: "/bewerben" },
  { title: "Infoveranstaltung", text: "jeden Montag um 15:30 Uhr", cta: "Zur Anmeldung", href: "/kontakt#infoveranstaltung" },
];

export type NavChild = { label: string; desc: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const navigation: NavItem[] = [
  {
    label: "Ausbildungen",
    href: "/ausbildungen",
    children: [
      { label: "Triebfahrzeugführer", desc: "In ca. 12 Monaten zum Lokführer", href: "/ausbildungen#triebfahrzeugfuehrer" },
      { label: "Nachschulung Anlage 6/7", desc: "Kompakt zur fehlenden Qualifikation", href: "/ausbildungen#nachschulung" },
    ],
  },
  {
    label: "Weiterbildungen",
    href: "/weiterbildungen",
    children: [
      { label: "Simulator-Training", desc: "Zusi · PZB · LZB · ETCS Level 2", href: "/weiterbildungen#simulator" },
      { label: "Fortbildungsunterricht", desc: "Regelmäßiger RFU für Tf", href: "/weiterbildungen#rfu" },
      { label: "Disposition", desc: "Leitstelle & Betriebssteuerung", href: "/weiterbildungen#disposition" },
      { label: "Eisenbahngrundlagen", desc: "Der Einstieg ins System Bahn", href: "/weiterbildungen#grundlagen" },
    ],
  },
  {
    label: "Seminare",
    href: "/seminare",
    children: [
      { label: "LZB & CIR-ELKE", desc: "Linienförmige Zugbeeinflussung", href: "/seminare/lzb" },
      { label: "ETCS Level 2", desc: "European Train Control System", href: "/seminare/etcs" },
    ],
  },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kooperationspartner", href: "/kooperationspartner" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Lokführer werden", href: "/lokfuehrer-werden" },
];

export const footerNav = [
  { title: "AUSBILDUNG", label: "Ausbildung", links: [{ label: "Ausbildungen", href: "/ausbildungen" }, { label: "Lokführer werden", href: "/lokfuehrer-werden" }] },
  { title: "WEITERBILDUNG", label: "Weiterbildung", links: [{ label: "Weiterbildungen", href: "/weiterbildungen" }, { label: "Seminare", href: "/seminare" }] },
  {
    title: "UNTERNEHMEN",
    label: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Kooperationspartner", href: "/kooperationspartner" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  { title: "LEGAL", label: "Rechtliches", links: [{ label: "Impressum", href: "/impressum" }, { label: "Datenschutz", href: "/datenschutz" }] },
];

export const funders = ["Agentur für Arbeit", "Jobcenter", "Rentenversicherung", "Bundeswehr", "Berufsgenossenschaften"];
