# So geht Eisenbahn – „Lokführer werden“

Moderne, animierte Landingpage für die Ausbildung zum Triebfahrzeugführer (Lokführer) der So geht Eisenbahn GmbH, Gelsenkirchen.

- Reines HTML/CSS/JS – kein Build-Schritt, keine Abhängigkeiten (Schrift: Inter Tight über Google Fonts, mit System-Fallback)
- Design-System „Cockpit twilight over parchment“: Deep Ink `#000d10`, Weiß, Midnight `#0f0f1c`/`#151623`, ein einziger Clay-Akzent `#bc7155`
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

- Das Bewerbungsformular öffnet das E-Mail-Programm mit einer vorbereiteten Nachricht an `hey@so-geht-eisenbahn.de` (kein Server nötig).
- Kurstermine stehen im Abschnitt `#foerderung` in `index.html` und müssen bei neuen Terminen angepasst werden.
- Fotos: Alle Illustrationen sind derzeit SVG. Echte Fotos können z. B. im Abschnitt „Der Beruf“ ergänzt werden.
