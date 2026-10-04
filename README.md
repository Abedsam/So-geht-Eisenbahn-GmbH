# So geht Eisenbahn GmbH – Redesign-Entwurf

Moderner, schneller und vollständig responsiver Entwurf für die Website der **So geht Eisenbahn GmbH (SGE)**, Eisenbahnakademie in Gelsenkirchen.
Inhalte sind sinngemäß von [so-geht-eisenbahn.de](https://so-geht-eisenbahn.de) übernommen; Screenshots der aktuellen Seite liegen in [`/reference`](reference).

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · lucide-react · react-hook-form + zod · CSS-Animationen (keine UI-Library)

## Schnellstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktions-Build
npm start            # Produktions-Server
npm run lint         # ESLint
npm run typecheck    # TypeScript
```

Voraussetzung: Node.js ≥ 20.9.

### Statischer Export

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formulare.example.de npm run build:static   # → /out
```

Ein statischer Export kann keine POST-API-Routen enthalten. `scripts/build-static.mjs` legt `app/api` für den Build kurz beiseite;
die Formulare senden dann an `NEXT_PUBLIC_FORM_ENDPOINT/<lead|contact|seminar-anmeldung>`.

## Konzept „Die Linie“

Die Website wird **nicht gescrollt**: Jede Seite ist eine **Station** im Vollbild. Inhalte sind auf Stationen einer Linie verteilt –
wie in einem Liniennetzplan. Die Fußleiste zeigt die aktuelle Linie mit allen Stationen; ein kleiner Zug fährt beim Wechsel zur neuen Station.

- **Weiterfahren:** Button „Nächster Halt“, Mausrad/Trackpad, Pfeiltasten, Bild↑/↓, Wischen (links/rechts oder hoch/runter) auf Mobilgeräten
- **Seitenwechsel:** animiert mit React `<ViewTransition>` (Next.js 16) – vorwärts fährt die neue Station von rechts ein, zurück von links
- **Menü „Netzplan“:** alle Rubriken als farbige Linien mit ihren Stationen
- Inhalte jeder Station blenden gestaffelt ein, Überschriften „fahren“ Wort für Wort ein, auf der Startseite der Landingpage fährt ein Zug ein
- Passt eine Station auf sehr kleinen Bildschirmen nicht vollständig (z. B. Formulare), scrollt nur der Inhalt *innerhalb* der Station; erst am Rand geht es zur nächsten Station
- `prefers-reduced-motion` schaltet alle Bewegungen ab

Die Linien und Stationen sind in [`content/lines.ts`](content/lines.ts) gepflegt (Reihenfolge = Fahrtrichtung).

## Linien und Stationen

| Linie | Stationen | Ansprache |
|---|---|---|
| **L1 Lokführer werden** (Landingpage, eigener Rahmen ohne Netzplan) | Start · Vorteile · Dein Job · Ausbildung · Profil · Stimmen · Team · FAQ · Bewerben (5-Schritt-Funnel) | du |
| **S Start** | `/` · `/vorteile` · `/rundgang` · `/faq` | Sie |
| **A Ausbildungen** | Übersicht · Triebfahrzeugführer · Nachschulung Anlage 6/7 (Tabs) | Sie |
| **W Weiterbildungen** | Übersicht · Simulator · RFU · Disposition · Grundlagen | Sie |
| **SE Seminare** | Übersicht · LZB · ETCS (je eine Station mit Tabs: Inhalte / Das sollten Sie wissen / Anmeldung) | Sie |
| **I Infoveranstaltung** | Infokarten + Anmeldung (nächste Montage automatisch) | Sie |
| **U Über uns** | Über uns · Leitbild · Werte · Team · Kooperationspartner | Sie |
| **K Kontakt** | 3 Formulare in Tabs, Adresse, Karte nach Einwilligung | Sie |
| **R Rechtliches** | Impressum · Datenschutz (Platzhalter) | Sie |

## Qualität

- **Lighthouse (mobil, Produktions-Build):** Performance 93–99, Accessibility, Best Practices und SEO jeweils 100 (Stichprobe über alle Linien).
- **Barrierefreiheit:** WCAG-AA-Kontraste, sichtbare Fokus-Stile, „Zum Inhalt springen“, tastaturbedienbare Navigation (Pfeiltasten), Akkordeons, Tabs und Quiz, Fokus-Management im Funnel, Barrierefreiheits-Menü (Schriftgröße, Zeilenabstand), reduzierte Bewegung.
- **SEO:** jede Station ist eine eigene URL mit Titel/Beschreibung + Open Graph, `sitemap.xml` (aus dem Liniennetz erzeugt), `robots.txt`, JSON-LD (`EducationalOrganization`, `FAQPage`, `Course`, `EducationalOccupationalProgram`).
- **Datenschutz:** Cookie-Banner mit gleichwertigen Buttons; Karte und Videos laden erst nach Einwilligung bzw. Klick.
- **Formulare:** gleiche zod-Schemas im Browser und in `/api/*`, Pflicht-Checkbox Datenschutz, Honeypot, Erfolgs-/Fehlermeldungen.

## TODOs für den Livegang

**Inhalte (Kunde)**
- [ ] Startseiten-FAQ (Bildungsgutschein, Förderung, Eignungstests) prüfen und freigeben → `content/faq.ts` (`todo: true` entfernen)
- [ ] Inhalte der Tabs „Nachschulung Anlage 6/7“ liefern → `content/courses.ts`
- [ ] Texte Mission, Vision, Engagement, Werte, „Das Besondere“ prüfen (sinngemäß formuliert) → `content/about.ts`
- [ ] Texte Weiterbildungen (Disposition, Eisenbahngrundlagen, Unterpunkte Simulator/RFU) prüfen → `content/courses.ts`
- [ ] Impressum und Datenschutzerklärung (rechtsverbindliche Texte) → `app/(site)/impressum`, `app/(site)/datenschutz`
- [ ] Social-Media-Links eintragen → `content/site.ts`
- [ ] Kurstermine aktuell halten → `content/site.ts` (`nextCourseStart`) und `content/seminars.ts` (`dates`)

**Bilder, Videos, Logos**
- [ ] Echte Fotos statt `public/images/placeholder-*.jpg` (gleiche Dateinamen oder Pfade in `content/*` anpassen). Teamporträts und vier Fotos stammen vorläufig in niedriger Auflösung aus der alten Website.
- [ ] Videos liefern (Landingpage 3:52, Rundgang 1:54, 4 Testimonials) und als `src` an `VideoPlaceholder` übergeben
- [ ] SGE-Logo als SVG → `components/ui/Logo.tsx` und `app/icon.svg`
- [ ] Siegel Eisenbahn-Bundesamt, ISO 9001 (ZertPunkt), AZAV → `components/sections/CertBar.tsx`, `MinimalHeader.tsx`
- [ ] Partner-Logos nur mit Freigabe der Partner → `content/partners.ts`, `PartnerBar.tsx`
- [ ] Open-Graph-Bild (1200×630) → `public/images/placeholder-og-default.jpg`

**Technik**
- [ ] Formular-Backend anbinden (CRM, E-Mail-Versand oder Datenbank) → `lib/api.ts` bzw. `NEXT_PUBLIC_FORM_ENDPOINT`
- [ ] Rate-Limiting/Captcha für Formulare (Honeypot ist vorhanden)
- [ ] Datenschutzkonforme Web-Analyse nur nach Einwilligung (Consent-Status: `localStorage["sge-consent"]`)
- [ ] Domain in `content/site.ts` (`url`) prüfen – wird für Canonical-URLs, Sitemap und JSON-LD verwendet

## Platzhalterbilder neu erzeugen

```bash
pip install pillow
python3 scripts/generate-placeholders.py
```
