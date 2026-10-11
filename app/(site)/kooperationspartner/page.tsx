import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/about/PageHero";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Kooperationspartner – Gemeinsam auf Erfolgskurs",
  description:
    "Unsere Kooperationspartner aus Personen- und Güterverkehr bieten Praxisplätze und Jobperspektiven für angehende Lokführer.",
  alternates: { canonical: "/kooperationspartner" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/kooperationspartner",
    siteName: "So geht Eisenbahn",
    title: "Kooperationspartner | So geht Eisenbahn",
    description: "Gemeinsam auf Erfolgskurs.",
    images: [{ url: "/assets/zug-seite.png", width: 566, height: 276, alt: "Seitenansicht eines blau-weißen Zuges" }],
  },
};

const partners = [
  { name: "FlixTrain", type: "ÜBERNAHME", text: "Fernverkehrsanbieter mit wachsendem Netz in Deutschland." },
  { name: "SGL", type: "PRAXIS", text: "Personaldienstleister für Triebfahrzeugführer im Güterverkehr." },
  { name: "Rail Force", type: "PRAXIS", text: "Eisenbahnpersonal und Dienstleistungen für EVU." },
  { name: "ME-Rail", type: "ÜBERNAHME", text: "Eisenbahnverkehrsunternehmen im Güterverkehr." },
  { name: "LZB92", type: "WEITERBILDUNG", text: "Fachpartner für Zugbeeinflussung und Schulung." },
  { name: "Powerlines", type: "PRAXIS", text: "Güterverkehrsunternehmen mit europaweiten Verbindungen." },
  { name: "MBS", type: "PRAXIS", text: "Bahnservice und Personaldienstleistungen." },
  { name: "Mittelweserbahn", type: "ÜBERNAHME", text: "Privates Eisenbahnverkehrsunternehmen im Güterverkehr." },
];

export default function PartnersPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <PageHero
        crumb="KOOPERATIONSPARTNER"
        title="Gemeinsam auf Erfolgskurs."
        lead="Starke Eisenbahnunternehmen an unserer Seite – für Praxisplätze, Übernahme und Weiterbildung."
        img={asset("/assets/zug-seite.png")}
        alt="Seitenansicht eines blau-weißen Zuges mit spiegelnden Fenstern"
      />

      {/* 02 Partner */}
      <section className="py-[clamp(72px,9vw,120px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {partners.map((p) => (
            <article key={p.name} data-reveal="" className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6">
              {/* TODO: echte Partnerlogos einsetzen */}
              <div
                role="img"
                aria-label={`Logo-Platzhalter ${p.name}`}
                className="flex h-24 items-center justify-center rounded-[10px] border border-dashed border-[#C9D4DF] bg-bg text-2xl font-extrabold text-navy-500"
              >
                {p.name}
              </div>
              <div className="flex items-center justify-between gap-2.5">
                <h2 className="m-0 text-[21px] font-extrabold">{p.name}</h2>
                <span className="whitespace-nowrap rounded bg-blue-tint px-2 py-[5px] font-mono text-[11px] tracking-[.1em] text-blue">
                  {p.type}
                </span>
              </div>
              <p className="m-0 text-base leading-[1.55] text-muted">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 03 CTA */}
      <section className="px-[clamp(20px,3vw,40px)] pb-[clamp(72px,9vw,120px)]">
        <div
          data-reveal=""
          className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-8 rounded-[20px] bg-navy p-[clamp(40px,6vw,80px)] text-white"
        >
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">
              Sie suchen Triebfahrzeugführer?
            </h2>
            <p className="m-0 text-lg text-on-navy-2">Bieten Sie Praxisplätze an und sichern Sie sich qualifizierten Nachwuchs.</p>
          </div>
          <Link
            href="/kontakt"
            className="rounded-btn bg-blue px-[30px] py-[19px] text-lg font-extrabold text-white no-underline transition-colors duration-200 hover:bg-blue-hover hover:text-white"
          >
            Kooperationspartner werden →
          </Link>
        </div>
      </section>
    </main>
  );
}
