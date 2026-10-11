import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/about/PageHero";
import { Reviews } from "@/components/about/Reviews";
import { aboutPillars, aboutValues, googleMapsUrl, teamMembers } from "@/content/about-page";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Über uns – Menschen, die Eisenbahn leben",
  description:
    "Lerne das Team von So geht Eisenbahn kennen: DEKRA-zertifizierte Dozenten mit über 10 Jahren Praxis, Mission, Vision und Werte.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/ueber-uns",
    siteName: "So geht Eisenbahn",
    title: "Über uns | So geht Eisenbahn",
    description: "Menschen, die Eisenbahn leben.",
    images: [{ url: "/assets/zug-innen.png", width: 555, height: 276, alt: "Innenraum eines modernen Zuges" }],
  },
};

/** Gemeinsamer H2-Stil dieser Seite (etwas kleiner als .h2) */
const h2 = "m-0 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]";

export default function AboutPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <PageHero
        crumb="ÜBER UNS"
        title="Menschen, die Eisenbahn leben."
        img={asset("/assets/zug-innen.png")}
        alt="Heller Innenraum eines modernen Zuges mit Anzeige So geht Eisenbahn"
      />

      {/* 02 Wer wir sind */}
      <section className="py-[clamp(72px,9vw,120px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
          <div data-reveal="" className="col-span-full flex max-w-[880px] flex-col gap-3.5">
            <h2 className={h2}>Wer wir sind</h2>
            <p className="m-0 text-[19px] leading-[1.7] text-muted">
              So geht Eisenbahn ist ein Bildungsträger aus Gelsenkirchen – gegründet von Eisenbahnern für Eisenbahner. Als anerkannte Stelle
              des Eisenbahn-Bundesamts bilden wir Triebfahrzeugführer aus, prüfen und bilden weiter.
            </p>
          </div>
          {aboutPillars.map((p, i) => (
            <div
              key={p.label}
              data-reveal=""
              data-reveal-delay={i ? i * 80 : undefined}
              className="flex flex-col gap-2.5 border-t-[3px] border-blue pt-5"
            >
              <span className="font-mono text-xs tracking-[.14em] text-blue">{p.label}</span>
              <h3 className="m-0 text-[26px] font-extrabold">{p.title}</h3>
              <p className="m-0 text-[17px] leading-[1.6] text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Werte */}
      <section className="bg-navy py-[clamp(72px,9vw,120px)] text-white">
        <div className="container-page">
          <h2 data-reveal="" className={`${h2} mb-10`}>
            Unsere Werte
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px overflow-hidden rounded-card bg-white/12 p-0">
            {aboutValues.map((v, i) => (
              <li key={v.title} data-reveal="" className="flex flex-col gap-2.5 bg-navy px-7 py-8">
                <span className="font-mono text-xs text-blue-light">0{i + 1}</span>
                <span className="text-2xl font-extrabold">{v.title}</span>
                <span className="text-base leading-[1.55] text-on-navy-2">{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 Team */}
      <section className="py-[clamp(72px,9vw,120px)]">
        <div className="container-page">
          <div data-reveal="" className="mb-12 flex max-w-[760px] flex-col gap-3.5">
            <h2 className={h2}>Das Team</h2>
            <p className="m-0 text-lg leading-[1.65] text-muted">
              DEKRA-zertifizierte Dozenten mit über 10 Jahren Praxis aus allen Bereichen des Eisenbahnwesens.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            {teamMembers.map((m) => (
              <article key={m.name} data-reveal="" className="flex flex-col overflow-hidden rounded-card border border-line bg-white">
                <div className="relative aspect-[259/220] overflow-hidden bg-[#9BB6E3]">
                  <Image
                    src={m.img}
                    alt={`Porträt von ${m.name}`}
                    fill
                    sizes="(min-width: 1360px) 320px, (min-width: 560px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-[22px]">
                  <h3 className="m-0 text-[22px] font-extrabold">{m.name}</h3>
                  <span className="text-sm font-bold text-blue">{m.role}</span>
                  <p className="mt-1 mb-0 text-[15px] leading-[1.55] text-muted">{m.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Google-Bewertungen */}
      <section className="border-y border-line bg-white py-[clamp(72px,9vw,120px)]">
        <div className="container-page flex flex-col gap-10">
          <div data-reveal="" className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3.5">
              <span className="kicker">Google-Bewertungen</span>
              <h2 className={h2}>Das sagen unsere Teilnehmer.</h2>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener"
              aria-label="5,0 von 5 Sternen auf Google Maps – alle Bewertungen ansehen"
              className="flex items-center gap-[18px] rounded-card border border-line bg-bg px-[22px] py-[18px] text-navy no-underline transition-colors duration-200 hover:border-blue hover:text-navy"
            >
              <span className="text-[44px] font-extrabold leading-none tracking-[-.03em]">5,0</span>
              <span className="flex flex-col gap-1">
                <span aria-hidden="true" className="text-[22px] leading-none tracking-[2px] text-star">
                  ★★★★★
                </span>
                <span className="text-sm font-semibold text-muted">auf Google Maps · alle Bewertungen →</span>
              </span>
            </a>
          </div>
          <Reviews />
        </div>
      </section>

      {/* 06 CTA */}
      <section className="px-[clamp(20px,3vw,40px)] pb-[clamp(72px,9vw,120px)]">
        <div
          data-reveal=""
          className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-8 rounded-[20px] bg-blue p-[clamp(40px,6vw,80px)] text-white"
        >
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">Komm vorbei.</h2>
            <p className="m-0 text-lg text-blue-tint">Infoveranstaltung jeden Montag um 15:30 Uhr in Gelsenkirchen.</p>
          </div>
          <Link
            href="/kontakt#infoveranstaltung"
            className="rounded-btn bg-white px-[30px] py-[19px] text-lg font-extrabold text-navy no-underline transition-colors duration-200 hover:bg-navy hover:text-white"
          >
            Lerne uns kennen →
          </Link>
        </div>
      </section>
    </main>
  );
}
