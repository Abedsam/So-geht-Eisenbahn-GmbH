# So geht Eisenbahn – „Lokführer werden“

Moderne, animierte Landingpage für die Ausbildung zum Triebfahrzeugführer (Lokführer) der So geht Eisenbahn GmbH, Gelsenkirchen.

- Reines HTML/CSS/JS – kein Build-Schritt, keine Abhängigkeiten (Schrift: Inter Tight über Google Fonts, mit System-Fallback)
- Farbwelt der bestehenden SGE-Seite, modernisiert: Petrol `#3f6977`, dunkles Petrol `#1f414c`, Signal-Amber `#fdb443` für Buttons
- Inhalte und Fotos aus der bisherigen Seite (Simulator, Team, Dozenten, Unterricht)
- Schnellbewerbung mit 5 Fragen (öffnet eine vorbereitete E-Mail)
- Animationen: Buchstaben-Intro, einfahrender Zug (SVG) mit drehenden Rädern, Scroll-Parallax, „Streckenverlauf“ mit fahrender Lok im Ablauf, Zähler, Reveal-on-Scroll, Ticker, magnetische Buttons
- Barrierearm: semantisches HTML, Tastaturbedienung, `prefers-reduced-motion` wird respektiert

## Lokal ansehen

```bash
npx serve .
# oder einfach index.html im Browser öffnen
```

## Struktur

```
index.html            Seite
assets/css/styles.css Design-Tokens, Layout, Animationen
assets/js/main.js     Interaktionen (Scroll, Menü, Zähler, Formular)
assets/img/           Favicon
```

## Hinweise

- Die Schnellbewerbung öffnet das E-Mail-Programm mit einer vorbereiteten Nachricht an `hey@so-geht-eisenbahn.de` (kein Server nötig). Für echte Leads später an ein CRM/Formular-Backend anbinden.
- Kurstermine stehen im Abschnitt `#foerderung` in `index.html` und müssen bei neuen Terminen angepasst werden.
- Fotos in `assets/img/` stammen aus Screenshots der alten Seite – für den Livegang durch die Original-Bilddateien in voller Auflösung ersetzen.
