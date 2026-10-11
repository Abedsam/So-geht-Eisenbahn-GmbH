import { asset } from "@/lib/asset";

// Inhalte der Seite „Über uns“ (Design-Handoff Ueber-uns.dc.html)

export const aboutPillars = [
  { label: "MISSION", title: "Unsere Mission", text: "Menschen sicher, praxisnah und persönlich in den Führerstand bringen." },
  {
    label: "VISION",
    title: "Unsere Vision",
    text: "Die Verkehrswende auf der Schiene mit genügend gut ausgebildetem Personal möglich machen.",
  },
  {
    label: "LEITBILD",
    title: "Unser Leitbild",
    text: "Wir lernen auf Augenhöhe, nehmen jede Frage ernst und messen uns am Erfolg unserer Teilnehmer.",
  },
];

export const aboutValues = [
  { title: "Fachkompetenz", text: "Aktuelles Wissen aus Betrieb, Technik und Regelwerk." },
  { title: "Praxisnähe", text: "Was wir lehren, haben wir selbst gefahren." },
  { title: "Innovation", text: "Simulatoren und digitale Lernmittel als Standard." },
  { title: "Inklusivität", text: "Jeder Hintergrund ist willkommen – auch ohne Bahnerfahrung." },
  { title: "Leidenschaft", text: "Wir lieben Eisenbahn und geben das weiter." },
  { title: "Qualität", text: "Zertifiziert nach DIN EN ISO 9001 und AZAV." },
];

export type TeamMember = { name: string; img: string; width: number; height: number; role: string; text: string };

export const teamMembers: TeamMember[] = [
  {
    name: "Kevin Delling",
    img: asset("/assets/team-kevin.png"),
    width: 259,
    height: 218,
    role: "Geschäftsführer",
    text: "Kümmert sich um operative und strategische Entscheidungen und ist erster Ansprechpartner für unsere Geschäftskunden.",
  },
  {
    name: "Kai Cornelius",
    img: asset("/assets/team-kai.png"),
    width: 259,
    height: 218,
    role: "Spezialist für innovative Ausbildung",
    text: "Herausragender Akteur in der Eisenbahnausbildung, anerkannt für seine Kompetenz als DEKRA-zertifizierter Prüfer für Triebfahrzeugführer.",
  },
  {
    name: "Jens Carstens",
    img: asset("/assets/team-jens.png"),
    width: 259,
    height: 218,
    role: "Dozent",
    text: "Gelernter Eisenbahner, seit vielen Jahren fest in der Branche verankert – mit Expertise und Leidenschaft für die Ausbildung.",
  },
  {
    name: "Markus Pusch",
    img: asset("/assets/team-markus.png"),
    width: 259,
    height: 218,
    role: "Dozent",
    text: "Langjährige Erfahrung als Dozent, Ausbilder und Prüfer. Verbindet Theorie und Praxis optimal miteinander.",
  },
  {
    name: "Laura König",
    img: asset("/assets/team-laura.png"),
    width: 259,
    height: 227,
    role: "Leitung Ausbildung",
    text: "Gelernte Triebfahrzeugführerin mit langjähriger Praxiserfahrung – macht den Unterricht verständlich und spannend.",
  },
  {
    name: "Miriam Girschofski-Cornelius",
    img: asset("/assets/team-miriam.png"),
    width: 259,
    height: 227,
    role: "Leitung Akquise",
    text: "Leiterin für Personalakquise und B2B. Begleitet den Erstkontakt und sorgt für einen strukturierten Einstieg.",
  },
  {
    name: "Donjeta Ramic",
    img: asset("/assets/team-donjeta.png"),
    width: 259,
    height: 227,
    role: "Mitarbeiterin Akquise",
    text: "Unterstützt die Akquise und ist Ansprechpartnerin für Interessenten und Bewerber.",
  },
];

export const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=SGE+So+geht+Eisenbahn+GmbH+Bahnhofstra%C3%9Fe+74+Gelsenkirchen";

export type Review = { name: string; date: string; text: string };

/** Google-Bewertungen (alle 5 Sterne) */
export const reviews: Review[] = (
  [
    [
      "Joe Mac",
      "vor 6 Monaten",
      "Absolut empfehlenswert – Professionelle Ausbildung mit Jobgarantie! Ich habe bei So geht Eisenbahn die Umschulung zum Triebfahrzeugführer absolviert und bin begeistert! Die 12-monatige Ausbildung war hervorragend strukturiert, mit einer perfekten Mischung aus theoretischem Unterricht in den modernen Räumlichkeiten in Gelsenkirchen und praxisnahen Online-Modulen. Die Dozenten sind echte Profis mit jahrelanger Erfahrung in der Eisenbahnbranche. Besonders toll finde ich die praxisorientierte Vorbereitung, inklusive Simulator-Training, das super realistisch ist. Und das Highlight: Die versprochene 100%ige Jobgarantie hat gehalten – direkt nach dem Abschluss habe ich einen unbefristeten Vertrag bei einem Partnerunternehmen bekommen.",
    ],
    [
      "Daniel Esch",
      "vor 2 Jahren",
      "Die Dozenten geben ihr Übriges dazu, ein Mix aus überragender Praxiserfahrung gepaart mit der nötigen Richtlinien- und Verordnungs-Besessenheit. So geht Eisenbahn ist hier tatsächlich Programm! Angefangen von den optisch sehr schön gestalteten Räumlichkeiten bis hin zur ständigen Adaption der technischen Hilfsmittel. Ich selbst hatte mich erdreistet, freitags eine zusätzliche Simulation zu verlangen. Ohne mit der Wimper zu zucken wurde sich hier Zeit genommen. Das hier ist die Formel 1 der Triebfahrzeugführer-Schulen.",
    ],
    [
      "Furkan Klc",
      "vor 9 Monaten",
      "Bevor ich die Ausbildung zum Triebfahrzeugführer bei der SGE anfing, dachte ich, es würde sehr anstrengend und trocken werden, aber dem war nicht so. Die Ausbildungsstätte ist modern und flexibel – das zeichnet sie besonders aus. Man fühlt sich hier einfach sehr wohl.",
    ],
    [
      "Nourdin Magrez",
      "vor einem Jahr",
      "Ein tolles Ausbildungszentrum, super modern und schön eingerichtet. Wir arbeiten in kleinen Gruppen, sodass sich die Dozenten um jeden angehenden Triebfahrzeugführer kümmern können. Man lernt jeden Tag was Neues.",
    ],
    ["Bilal Hajji", "vor 3 Monaten", "Tolles Ausbildungszentrum, freundliche Ausbilder und gute Vorbereitung auf die Prüfung. Sehr empfehlenswert."],
    [
      "Jack M",
      "vor einem Jahr",
      "Dozenten, die wissen, was sie tun, und sich um den Einzelnen kümmern. Sie können dir wirklich helfen, ein Triebfahrzeugführer zu werden. Nachdem ich gesehen habe, wie andere Schulen sind, kann ich die SGE nur empfehlen.",
    ],
    [
      "geheimnisman",
      "vor einem Jahr",
      "Über die gesamte Ausbildungsdauer ist man hier keine Zahl. Es wird auf jeden individuell eingegangen und vielfältige Chancen geboten. Gestern habe ich die Umschulung bestanden – dank der Hilfe der Dozenten und Geschäftsführer.",
    ],
    [
      "DC Cars",
      "vor einem Jahr",
      "Die gesamte Ausbildungszeit über habe ich mich bestens unterstützt gefühlt. Die Lehrkräfte nehmen sich Zeit für individuelle Fragen und fördern sowohl fachliche als auch persönliche Stärken. Besonders schätze ich die enge Verknüpfung von Theorie und Praxis.",
    ],
    [
      "Jan Hans",
      "vor 2 Jahren",
      "Der Bahn-Simulator ist wirklich toll. Die Steuerung fühlt sich sehr realistisch an. Man hat das Gefühl, wirklich selbst am Steuer zu sitzen.",
    ],
    [
      "w202e39s204",
      "vor einem Jahr",
      "Die Schulung war hervorragend organisiert und inhaltlich äußerst fundiert. Die Dozenten haben ihr Fachwissen praxisnah und verständlich vermittelt. Eine klare Empfehlung für alle, die sich professionell im Eisenbahnbereich weiterbilden möchten!",
    ],
    [
      "Mustafa Kan",
      "vor einem Jahr",
      "Mit viel Leidenschaft und Fachkompetenz haben die Ausbilder ihr Wissen weitergegeben und dabei die Faszination für die Welt der Eisenbahn spürbar gemacht. Jede Einheit war spannend, motivierend und praxisnah gestaltet.",
    ],
    [
      "Halid Siala",
      "vor einem Jahr",
      "Habe die Ausbildung schon fast fertig und fühle mich hier bei der SGE sehr gut aufgehoben. Dozenten mega korrekt und sehr hilfreich, perfektes Klima, was Lernen betrifft.",
    ],
    [
      "Amar Siala",
      "vor 2 Jahren",
      "Die Dozenten waren sehr kompetent und konnten komplexe Inhalte verständlich vermitteln. Besonders hervorzuheben sind die praktischen Übungen und Simulationen, die das theoretische Wissen effektiv festigten.",
    ],
    [
      "Nikos A.",
      "vor 2 Jahren",
      "Schöne Büro- und Schulungsräume. Die Dozenten, Mitarbeiter in der Verwaltung und auch die Geschäftsführung sind sehr kompetent und sympathisch.",
    ],
    [
      "Patrick",
      "vor 2 Jahren",
      "Ich hab dort eine super Ausbildung genießen dürfen. Alle sind sehr verständnisvoll und nett. Top Personal arbeitet dort, danke für die schöne Zeit.",
    ],
    [
      "Umut Can",
      "vor einem Jahr",
      "Die Eisenbahn-Schulung überzeugte durch eine professionelle Organisation, kompetente Referenten und praxisnahe Inhalte. Ich fühle mich bestens vorbereitet.",
    ],
    [
      "Hamza El-said",
      "vor einem Jahr",
      "Ich bin gerade in der Ausbildung. Ich fühle mich bestens aufgehoben, sowohl persönlich als auch fachlich.",
    ],
    [
      "Jessica Siblini",
      "vor einem Jahr",
      "Gute Schulung, nette Dozenten, die sich auch bei Nichtverstehen des Lernstoffs Zeit zum Erklären nehmen. Kann ich nur weiterempfehlen.",
    ],
    [
      "Osman Yardim",
      "vor einem Jahr",
      "Kompetent, familiär, jederzeit hilfsbereit, verständnisvoll – und eine sehr gute Lernplattform wird zur Verfügung gestellt. Großes Dankeschön an unsere Lehrer.",
    ],
    [
      "alexander wiemann",
      "vor 2 Jahren",
      "Sehr gute Bildungseinrichtung, die mir für das erfolgreiche Ergebnis meiner Weiterbildung zum Tf sehr weitergeholfen hat. Ich würde diesen Schritt jederzeit wieder gehen.",
    ],
    [
      "Gasi Yasin",
      "vor einem Jahr",
      "Bin seit über sieben Monaten dabei, bin sehr zufrieden. Gute Lernmöglichkeiten über Handy oder Laptop, sehr korrekte Dozenten.",
    ],
    [
      "Ugurkan Gültekin",
      "vor einem Jahr",
      "Super Laden! Super System! Null negative Erfahrungen gesammelt, Dozenten sind super nett und hilfsbereit.",
    ],
    ["Alex Schütz", "vor einem Jahr", "Bester Laden mit sehr kompetenten Dozenten und Geschäftsführern."],
    ["Paula", "vor einem Jahr", "Tolles Team, kompetente Dozenten! Sehr empfehlenswert."],
    ["Semih Celik", "vor einem Jahr", "Die Ausbildungsstätte ist sehr zu empfehlen. Hat alles super geklappt!"],
    ["Daniel Peitz", "vor einem Jahr", "Top Ausbildungsstätte."],
  ] as const
).map(([name, date, text]) => ({ name, date, text }));

/** Anzahl Bewertungen, die anfangs sichtbar sind */
export const reviewsInitial = 6;
