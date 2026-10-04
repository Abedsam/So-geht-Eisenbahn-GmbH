import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/content/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Unsere Kooperationspartner",
  description: "Gemeinsam mit FlixTrain, SGL, Rail Force, ME-Rail, LZB92, Powerlines und MBS sorgen wir für praxisnahe Ausbildung und sichere Arbeitsplätze.",
  path: "/kooperationspartner",
});

export default function KooperationspartnerPage() {
  return (
    <>
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Netzwerk"
            title="Unsere Kooperationspartner"
            text="Starke Partner aus der Eisenbahnbranche ermöglichen betriebliche Lernphasen, Praxiseinsätze und den direkten Weg in den Job."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {partners.map((p) => (
              <li key={p.slug} className="reveal flex flex-col gap-4 rounded-card bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
                {/* Logo-Platzhalter – echtes Logo nur mit Freigabe des Partners einbinden */}
                <div className="grid h-24 place-items-center rounded-btn border border-dashed border-petrol-100 bg-surface font-heading text-2xl font-bold text-petrol" role="img" aria-label={`Logo-Platzhalter ${p.name}`}>
                  {p.name}
                </div>
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="text-ink/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Sie möchten Kooperationspartner werden?" text="Wir freuen uns über Eisenbahnverkehrsunternehmen und Dienstleister, die mit uns Fachkräfte für die Schiene gewinnen möchten." cta="Kontakt aufnehmen" href="/kontakt" />
    </>
  );
}
