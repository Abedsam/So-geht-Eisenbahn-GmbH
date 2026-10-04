// Liniennetz: Jede Seite ist eine „Station“ (Vollbild, kein Scrollen).
// Reihenfolge = Fahrtrichtung für „Nächster Halt“, Pfeiltasten, Mausrad und Wischen.

export type Station = { href: string; label: string };
export type Line = { id: string; code: string; label: string; color: string; stations: Station[] };

export const landingLine: Line = {
  id: "lokfuehrer",
    color: "#FAB33F",
  code: "L1",
  label: "Lokführer werden",
  stations: [
    { href: "/lokfuehrer-werden", label: "Start" },
    { href: "/lokfuehrer-werden/vorteile", label: "Vorteile" },
    { href: "/lokfuehrer-werden/job", label: "Dein Job" },
    { href: "/lokfuehrer-werden/ausbildung", label: "Ausbildung" },
    { href: "/lokfuehrer-werden/profil", label: "Profil" },
    { href: "/lokfuehrer-werden/stimmen", label: "Stimmen" },
    { href: "/lokfuehrer-werden/team", label: "Team" },
    { href: "/lokfuehrer-werden/faq", label: "FAQ" },
    { href: "/lokfuehrer-werden/bewerben", label: "Bewerben" },
  ],
};

export const siteLines: Line[] = [
  {
    id: "start",
    color: "#FAB33F",
    code: "S",
    label: "Start",
    stations: [
      { href: "/", label: "Start" },
      { href: "/vorteile", label: "Vorteile" },
      { href: "/rundgang", label: "Rundgang" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    id: "ausbildungen",
    color: "#7FC8BE",
    code: "A",
    label: "Ausbildungen",
    stations: [
      { href: "/ausbildungen", label: "Übersicht" },
      { href: "/ausbildungen/triebfahrzeugfuehrer", label: "Triebfahrzeugführer" },
      { href: "/ausbildungen/nachschulung", label: "Nachschulung" },
    ],
  },
  {
    id: "weiterbildungen",
    color: "#8DB8D8",
    code: "W",
    label: "Weiterbildungen",
    stations: [
      { href: "/weiterbildungen", label: "Übersicht" },
      { href: "/weiterbildungen/simulator", label: "Simulator" },
      { href: "/weiterbildungen/rfu", label: "RFU" },
      { href: "/weiterbildungen/disposition", label: "Disposition" },
      { href: "/weiterbildungen/grundlagen", label: "Grundlagen" },
    ],
  },
  {
    id: "seminare",
    color: "#E8896A",
    code: "SE",
    label: "Seminare",
    stations: [
      { href: "/seminare", label: "Übersicht" },
      { href: "/seminare/lzb", label: "LZB" },
      { href: "/seminare/etcs", label: "ETCS" },
    ],
  },
  {
    id: "info",
    color: "#E8C79A",
    code: "I",
    label: "Infoveranstaltung",
    stations: [{ href: "/infoveranstaltung", label: "Infoveranstaltung" }],
  },
  {
    id: "ueber-uns",
    color: "#B9A6D6",
    code: "U",
    label: "Über uns",
    stations: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/ueber-uns/leitbild", label: "Leitbild" },
      { href: "/ueber-uns/werte", label: "Werte" },
      { href: "/ueber-uns/team", label: "Team" },
      { href: "/kooperationspartner", label: "Partner" },
    ],
  },
  {
    id: "kontakt",
    color: "#9FD08A",
    code: "K",
    label: "Kontakt",
    stations: [{ href: "/kontakt", label: "Kontakt" }],
  },
  {
    id: "service",
    color: "#AEBBC0",
    code: "R",
    label: "Rechtliches",
    stations: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export type Position = {
  line: Line;
  index: number;
  prev?: Station;
  next?: Station;
  /** Linie des nächsten Halts, falls ein Umstieg nötig ist */
  nextLine?: Line;
};

/** Ermittelt Linie, Position und Nachbarstationen zu einem Pfad */
export function locate(pathname: string): Position | null {
  const path = pathname.replace(/\/$/, "") || "/";
  const network = [landingLine, ...siteLines];
  for (const line of network) {
    const index = line.stations.findIndex((s) => s.href === path);
    if (index === -1) continue;
    // Landingpage ist eine eigene Strecke, das restliche Netz fährt durchgehend
    const route = line === landingLine ? [landingLine] : siteLines;
    const flat = route.flatMap((l) => l.stations.map((s) => ({ s, l })));
    const pos = flat.findIndex((x) => x.s.href === path);
    const nextEntry = flat[pos + 1];
    return {
      line,
      index,
      prev: flat[pos - 1]?.s,
      next: nextEntry?.s,
      nextLine: nextEntry && nextEntry.l !== line ? nextEntry.l : undefined,
    };
  }
  return null;
}

const order = [landingLine, ...siteLines].flatMap((l) => l.stations.map((s) => s.href));

/** Fahrtrichtung zwischen zwei Stationen – steuert die Richtung der Seitenanimation */
export function direction(from: string, to: string): "nav-forward" | "nav-back" {
  const a = order.indexOf(from.replace(/\/$/, "") || "/");
  const b = order.indexOf(to.split("#")[0].replace(/\/$/, "") || "/");
  return a !== -1 && b !== -1 && b < a ? "nav-back" : "nav-forward";
}
