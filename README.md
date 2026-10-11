# So geht Eisenbahn GmbH – Website-Redesign

Umsetzung des Design-Handoffs „So geht Eisenbahn – Website-Redesign“ (HTML-Prototypen + `README.md` des Handoffs) für **so-geht-eisenbahn.de**.
Sprache: Deutsch, Du-Ansprache. Bilder aus dem Handoff liegen in [`public/assets`](public/assets).

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · Archivo + JetBrains Mono (`next/font`)

## Schnellstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Produktions-Build
npm start            # Produktions-Server
npm run lint         # ESLint
npm run typecheck    # TypeScript
```

Voraussetzung: Node.js ≥ 20.9. Statischer Export: `npm run build:static` (→ `/out`, ohne `/api`-Routen).

## Vorschau (GitHub Pages)

Jeder Push auf `main` oder `claude/sleepy-davinci-smzr3n` baut die Seite statisch und veröffentlicht sie unter
**https://abedsam.github.io/So-geht-Eisenbahn-GmbH/** (`.github/workflows/pages.yml`).
Einmalig aktivieren: Repo → *Settings* → *Pages* → *Source*: **GitHub Actions**.
Hinweis: GitHub Pages für **private** Repos gibt es nur mit GitHub Pro/Team.

## Stand

| Bereich | Status |
|---|---|
| Header (Laufband, Dropdowns, Mobile-Menü < 1240 px) | ✅ `components/site/Header.tsx` |
| Footer inkl. „Cookie-Einstellungen“ | ✅ `components/site/Footer.tsx` |
| Cookie-Banner (`localStorage["sge-cookie-consent"]` = `all` \| `necessary`) | ✅ `components/site/CookieBanner.tsx` |
| Startseite `/` (Scroll-Hero, Zugreise, alle Sektionen) | ✅ `app/page.tsx`, `components/home/*`, Texte in `content/home.ts` |
| Scroll-Reveal / Zähler (`data-reveal`, `data-reveal-delay`, `data-count`) | ✅ `components/site/RevealObserver.tsx` |
| Ausbildungen, Lokführer werden, Weiterbildungen, Seminare (+ LZB/ETCS), Über uns, Kooperationspartner, Kontakt, Bewerben (Quiz), Danke, Impressum, Datenschutz | ⏳ Platzhalter (`noindex`), folgen nach Vorlage |

## Design-Tokens

In `tailwind.config.ts`: `navy` #071C35, `blue` #005BAA (`blue-hover` #1689E8, `blue-light` #8FC3F5), `bg` #F6F8FA, `line` #E8EDF2, `muted` #4B5B6E,
`on-navy` #DCE8F3, `error` #B42318. Wiederkehrende Klassen in `app/globals.css`: `container-page`, `section-y`, `h2`, `kicker`, `btn btn-primary btn-lg`, `btn-ghost-dark`, `link-underline`, `card-lift`.

## Animationen

- **Hero** (260vh, sticky): Bild-Zoom, Titel blendet mit Blur aus, „Einsteigen, bitte.“ blendet ein, Fortschrittsbalken.
- **Zugreise** (720vh, sticky, ab 900 px): 6 Stationen, Bild-Crossfade, Fahrplan-Linie, Mini-Zug. Unter 900 px oder bei `prefers-reduced-motion` gestapelte Karten.
- **Laufband** im Header per `requestAnimationFrame` (0,05 px/ms, Pause bei Hover/Fokus), **Partner-Marquee** 40 s.
- `prefers-reduced-motion: reduce` schaltet alle Animationen ab.

## Offene Punkte (aus dem Handoff)

- [ ] Logo als SVG beim Kunden anfordern (PNG nur 73×31 px) → `components/site/Logo.tsx`
- [ ] Echte Partnerlogos (zurzeit Namen als Kacheln) → `content/home.ts`
- [ ] Webhook/CRM-Endpoint für Leads und Kontakt
- [ ] Impressum und Datenschutzerklärung rechtlich prüfen
- [ ] Kursdaten LZB/ETCS bestätigen
- [ ] Für Produktion ein geprüftes CMP (z. B. Usercentrics, Cookiebot) einsetzen; Pixel erst nach Consent laden
