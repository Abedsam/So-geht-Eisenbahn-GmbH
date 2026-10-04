import { BadgeCheck, Landmark } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { partners } from "@/content/partners";
import { certificates } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Unsere Kooperationspartner",
  description: "Gemeinsam mit FlixTrain, SGL, Rail Force, ME-Rail, LZB92, Powerlines und MBS sorgen wir für praxisnahe Ausbildung und sichere Arbeitsplätze.",
  path: "/kooperationspartner",
});

export default function Partner() {
  return (
    <Screen tone="light" width="wide">
      <div className="flex flex-col gap-[clamp(0.75rem,3vh,2rem)]">
        <div>
          <In i={0}>
            <p className="kicker text-petrol">Netzwerk</p>
          </In>
          <Words text="Unsere Kooperationspartner." className="title-xl mt-3 text-petrol" />
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {partners.map((p, i) => (
            <In as="li" key={p.slug} i={i + 2} className="group flex flex-col gap-1 rounded-[16px] bg-white p-3 shadow-card transition-shadow hover:shadow-lift sm:p-4">
              {/* Logo-Platzhalter – echte Logos nur mit Freigabe der Partner */}
              <span className="font-heading text-lg font-bold text-petrol" role="img" aria-label={`${p.name} (Logo-Platzhalter)`}>
                {p.name}
              </span>
              <span className="hidden text-sm text-ink/75 sm:block [@media(max-height:760px)]:line-clamp-2">{p.text}</span>
            </In>
          ))}
          <In as="li" i={9} className="flex items-center rounded-[16px] bg-accent p-3 text-sm font-bold text-ink sm:p-4">
            Sie möchten Partner werden? Sprechen Sie uns an.
          </In>
        </ul>
        <In i={10} className="hidden flex-wrap gap-2 md:flex">
          {certificates.map((c, i) => (
            <span key={`${c.title}-${i}`} className="inline-flex items-center gap-2 rounded-full border border-petrol-100 bg-white px-3 py-1.5 text-xs text-ink/80">
              {i === 0 ? <Landmark className="size-4 text-petrol" aria-hidden="true" /> : <BadgeCheck className="size-4 text-petrol" aria-hidden="true" />}
              <strong className="text-ink">{c.title}</strong> {c.text}
            </span>
          ))}
        </In>
      </div>
    </Screen>
  );
}
