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

## Seiten

| Route | Inhalt | Ansprache |
|---|---|---|
| `/` | Startseite: Hero, Einstiegskarten, Vorteile, USP-Band, Video-Rundgang, Weiterbildungsbereiche, Partner, FAQ, CTA | Sie |
| `/lokfuehrer-werden` | **Landingpage** mit Minimal-Header, Video, 5-stufigem Bewerbungs-Funnel, Benefits, Stellenbeschreibung, Profil, Testimonials, Team, FAQ, Sticky-CTA (mobil) | du |
| `/ausbildungen` | Triebfahrzeugführer + Nachschulung Anlage 6/7 mit Tabs | Sie |
| `/weiterbildungen` | Simulator-Training, RFU, Disposition, Eisenbahngrundlagen | Sie |
| `/seminare`, `/seminare/etcs`, `/seminare/lzb` | Übersicht + gemeinsames `SeminarTemplate` mit Anmeldeformular | Sie |
| `/infoveranstaltung` | 4 Infokarten + Anmeldung (nächste Montage werden automatisch berechnet) | Sie |
| `/kooperationspartner` | 7 Partnerkarten (Logo-Platzhalter) | Sie |
| `/ueber-uns` | Mission/Vision/Engagement, Leitbild, Werte, Team, Besonderheiten | Sie |
| `/kontakt` | 3 Formular-Karten, Adresse, Karte (lädt erst nach Einwilligung) | Sie |
| `/impressum`, `/datenschutz` | Platzhalterseiten | Sie |

## Struktur

```
app/
  (site)/           Seiten mit Ticker, Top-Bar, Header, Footer
  (landing)/        Landingpage mit Minimal-Header und Sticky-CTA
  api/              Platzhalter-Endpunkte: lead, contact, seminar-anmeldung
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
components/
  layout/           Ticker, TopBar, Header, Footer, MinimalHeader, BackToTop, CookieBanner, A11yMenu, StickyMobileCta, RevealObserver
  sections/         Hero, UspBand, CertBar, PartnerBar, TeamGrid, TestimonialCard, SeminarTemplate, SplitImage, CtaBand, MapPlaceholder, LegalPage
  forms/            LeadQuiz, ContactForm, SeminarForm, gemeinsame Felder
  ui/               Button, Accordion, Tabs, VideoPlaceholder, CheckList, SectionHeading, Logo, JsonLd
content/            Pflegbare Inhalte: site, team, partners, faq, seminars (inkl. Kurstermine), courses, landing, about
lib/                zod-Schemas, SEO-Metadaten, JSON-LD, Datumslogik, Formular-Versand
public/images/      Platzhalterbilder (placeholder-*.jpg)
scripts/            Platzhalter-Generator, statischer Export
drafts/             Erster HTML-Entwurf der Landingpage (Referenz)
```

Design-Tokens (Farben, Schriften, Radien) stehen in `tailwind.config.ts`; Ubuntu (Überschriften) und Montserrat (Fließtext) werden über `next/font` selbst gehostet.

## Qualität

- **Lighthouse (mobil, Produktions-Build):** alle 13 Seiten ≥ 90 in Performance, Accessibility, Best Practices und SEO (Accessibility/Best Practices/SEO jeweils 100).
- **Barrierefreiheit:** WCAG-AA-Kontraste, sichtbare Fokus-Stile, „Zum Inhalt springen“, tastaturbedienbare Akkordeons (Pfeiltasten), Tabs und Quiz, Fokus-Management im Funnel, Barrierefreiheits-Menü (Schriftgröße, Zeilenabstand), `prefers-reduced-motion`.
- **SEO:** eigene Titel/Beschreibung + Open Graph je Seite, `sitemap.xml`, `robots.txt`, JSON-LD (`EducationalOrganization`, `FAQPage`, `Course` für Seminare, `EducationalOccupationalProgram` mit Gehaltsangabe für die Landingpage).
- **Datenschutz:** Cookie-Banner mit gleichwertigen Buttons „Nur notwendige“ / „Alle akzeptieren“; Google Maps und Videos laden erst nach Einwilligung bzw. Klick.
- **Formulare:** clientseitige und serverseitige Validierung mit denselben zod-Schemas, Pflicht-Checkbox Datenschutz, Honeypot gegen Spam, Erfolgs-/Fehlermeldungen.

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
