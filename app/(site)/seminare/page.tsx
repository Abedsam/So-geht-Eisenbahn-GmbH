import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock, Euro } from "lucide-react";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { getSeminar } from "@/content/seminars";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Seminare für Triebfahrzeugführer: LZB & ETCS",
  description: "5-tägige Seminare für Triebfahrzeugführer: Linienförmige Zugbeeinflussung (LZB) inkl. CIR-ELKE und ETCS Level 2 – mit Simulatortraining in Gelsenkirchen.",
  path: "/seminare",
});

export default function Seminare() {
  const list = (["lzb", "etcs"] as const).map((s) => getSeminar(s));
  return (
    <Screen tone="light" width="wide" backdrop={<StationNumber n={5} />}>
      <div className="flex flex-col gap-[clamp(1rem,3.5vh,2.5rem)]">
        <div>
          <In i={0}>
            <p className="kicker text-petrol">Linie SE · Seminare</p>
          </In>
          <Words text="Seminare für Triebfahrzeugführer." className="title-xl mt-3 text-petrol" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {list.map((s, i) => (
            <In key={s.slug} i={i + 2}>
              <TLink href={`/seminare/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-card transition-shadow hover:shadow-lift">
                <span className="relative hidden aspect-[21/9] overflow-hidden sm:block [@media(max-height:760px)]:!hidden">
                  <Image src={s.cardImage} alt="" fill loading="eager" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-heading text-xl font-bold text-petrol md:text-2xl">{s.title}</span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-ink transition-transform group-hover:rotate-45" aria-hidden="true">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </span>
                  <span className="hidden text-ink/75 sm:block">{s.teaser}</span>
                  <span className="mt-auto flex flex-wrap gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-petrol-50 px-3 py-1 font-semibold text-petrol">
                      <Clock className="size-4" aria-hidden="true" /> {s.durationDays} Tage
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-petrol-50 px-3 py-1 font-semibold text-petrol">
                      <Euro className="size-4" aria-hidden="true" /> {s.priceEur.toLocaleString("de-DE")} €
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 font-semibold text-ink">
                      <CalendarDays className="size-4" aria-hidden="true" /> {s.dates[0]?.label}
                    </span>
                  </span>
                </span>
              </TLink>
            </In>
          ))}
        </div>
      </div>
    </Screen>
  );
}
