// Allgemeine Stammdaten, Navigation und wiederkehrende Inhalte

export const site = {
  name: "So geht Eisenbahn GmbH",
  shortName: "SGE",
  url: "https://so-geht-eisenbahn.de",
  description:
    "Erfahrene, moderne Eisenbahnakademie in Gelsenkirchen: Aus- und Weiterbildungen im Eisenbahnsektor für Unternehmen und Privatteilnehmer.",
  phone: "+49 209 8849 4686",
  phoneHref: "tel:+4920988494686",
  email: "hey@so-geht-eisenbahn.de",
  address: {
    street: "Bahnhofstraße 74–76",
    zip: "45879",
    city: "Gelsenkirchen",
    country: "DE",
  },
  // TODO(Kunde): echte Profil-URLs eintragen
  social: [
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "TikTok", href: "#", icon: "tiktok" },
    { name: "YouTube", href: "#", icon: "youtube" },
  ],
} as const;

export const nextCourseStart = "02.11.26";

export const ticker = [
  { icon: "🚆", text: `Kursstart Triebfahrzeugführer (m/w/d): ${nextCourseStart}`, cta: "Jetzt bewerben", href: "/lokfuehrer-werden" },
  { icon: "ℹ️", text: "Infoveranstaltung jeden Montag um 15:30 Uhr", cta: "Zur Anmeldung", href: "/infoveranstaltung" },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

export const navigation: NavItem[] = [
  {
    label: "Ausbildungen",
    href: "/ausbildungen",
    children: [
      { label: "Triebfahrzeugführer (m/w/d)", href: "/ausbildungen#triebfahrzeugfuehrer", description: "12-monatige Umschulung" },
      { label: "Nachschulung Anlage 6/7", href: "/ausbildungen#nachschulung", description: "inkl. Prüfung" },
      { label: "Lokführer werden", href: "/lokfuehrer-werden", description: "In 2 Minuten bewerben" },
    ],
  },
  {
    label: "Weiterbildungen",
    href: "/weiterbildungen",
    children: [
      { label: "Simulator-Training", href: "/weiterbildungen#simulator" },
      { label: "Fortbildungsunterricht (RFU)", href: "/weiterbildungen#rfu" },
      { label: "Disposition", href: "/weiterbildungen#disposition" },
      { label: "Eisenbahngrundlagen", href: "/weiterbildungen#grundlagen" },
    ],
  },
  {
    label: "Seminare",
    href: "/seminare",
    children: [
      { label: "LZB inkl. CIR-ELKE", href: "/seminare/lzb" },
      { label: "ETCS", href: "/seminare/etcs" },
    ],
  },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerLinks = [
  { label: "Ausbildungen", href: "/ausbildungen" },
  { label: "Weiterbildungen", href: "/weiterbildungen" },
  { label: "Seminare", href: "/seminare" },
  { label: "Infoveranstaltung", href: "/infoveranstaltung" },
  { label: "Kooperationspartner", href: "/kooperationspartner" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const usps = [
  { value: "100 %", title: "persönlich", text: "Ihr Partner auf dem Weg zum Erfolg" },
  { value: "360°", title: "Wissen aus allen Perspektiven", text: "Aus der Welt der Eisenbahn" },
  { value: "1:1", title: "Fair und individuell", text: "Ausbildung, die zu Ihnen passt" },
];

export const certificates = [
  { title: "Eisenbahn-Bundesamt", text: "Anerkannte Stelle für die Ausbildung (§ 14 TfV) und die Prüfung (§ 15 TfV)" },
  { title: "DIN EN ISO 9001:2015", text: "Zertifiziertes Qualitätsmanagement" },
  { title: "AZAV", text: "Trägerzulassung" },
  { title: "AZAV", text: "Maßnahmenzulassung" },
];

export const funders = ["Agentur für Arbeit", "Jobcenter", "Rentenversicherung", "Bundeswehr", "Berufsgenossenschaft"];
