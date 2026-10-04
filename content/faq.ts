export type Faq = { question: string; answer: string; /** true = Antwort muss vom Kunden freigegeben werden */ todo?: boolean };

// TODO(Kunde): Antworten der Startseiten-FAQ prüfen und freigeben
export const homeFaq: Faq[] = [
  {
    question: "Was ist ein Bildungsgutschein?",
    answer:
      "Ein Bildungsgutschein ist eine Förderzusage der Agentur für Arbeit oder des Jobcenters. Er übernimmt die Kosten einer zugelassenen Weiterbildung, zum Beispiel Lehrgangs-, Prüfungs- und ggf. Fahrtkosten.",
    todo: true,
  },
  {
    question: "Wie bekomme ich die Förderung?",
    answer:
      "Sprechen Sie Ihre Ansprechperson bei der Agentur für Arbeit oder dem Jobcenter an. Wir stellen Ihnen gern ein Maßnahmenangebot mit allen nötigen Angaben aus, das Sie zum Termin mitnehmen können.",
    todo: true,
  },
  {
    question: "Muss ich selbst etwas dafür tun?",
    answer:
      "Sie vereinbaren einen Beratungstermin bei Ihrem Kostenträger und reichen unser Angebot ein. Bei allen weiteren Schritten unterstützen wir Sie persönlich.",
    todo: true,
  },
  {
    question: "Muss ich einen Eignungstest machen?",
    answer:
      "Ja. Für die Tätigkeit als Triebfahrzeugführer sind eine medizinische und eine psychologische Tauglichkeitsuntersuchung gesetzlich vorgeschrieben. Wir helfen Ihnen bei der Terminvereinbarung.",
    todo: true,
  },
  {
    question: "Was erwartet mich beim medizinischen Tauglichkeitstest?",
    answer:
      "Ein Arzt prüft unter anderem Seh- und Hörvermögen, Farbsehen sowie Ihren allgemeinen Gesundheitszustand. Die Untersuchung dauert in der Regel wenige Stunden.",
    todo: true,
  },
  {
    question: "Was erwartet mich beim psychologischen Tauglichkeitstest?",
    answer:
      "Am Computer werden Konzentration, Reaktionsvermögen, Aufmerksamkeit und Belastbarkeit getestet. Vorkenntnisse sind nicht nötig; ausgeruht anzutreten hilft am meisten.",
    todo: true,
  },
];

export const landingFaq: Faq[] = [
  {
    question: "Wo findet die Ausbildung statt?",
    answer: "Der theoretische Unterricht findet bei uns in der Bahnhofstraße 74–76, 45879 Gelsenkirchen statt. Die Praxiseinsätze sind wohnortnah.",
  },
  {
    question: "Wie lange dauert die Ausbildung?",
    answer: "Die Ausbildung dauert 12 Monate. Danach stehen dir diverse Aufstiegsmöglichkeiten offen.",
  },
  {
    question: "Wo liegen die Gehaltsaussichten von Lokführern (m/w/d)?",
    answer: "Direkt nach der Ausbildung kannst du mit einem Einstiegsgehalt von rund 4.000 € netto im Monat rechnen – plus Zulagen und Sozialleistungen.",
  },
  {
    question: "Bekomme ich ein Ausbildungsgehalt?",
    answer: "Nein, aber du erhältst während der Ausbildung weiterhin dein Arbeitslosengeld von der Agentur für Arbeit.",
  },
];
