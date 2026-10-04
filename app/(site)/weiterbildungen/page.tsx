import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { trainingAreas, trainings } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Weiterbildungen für Eisenbahnunternehmen und Triebfahrzeugführer",
  description: "Simulator-Training im Zusi-Simulator, Fortbildungsunterricht (RFU), Disposition und Eisenbahngrundlagen – praxisnahe Weiterbildungen der So geht Eisenbahn GmbH.",
  path: "/weiterbildungen",
});

export default function Weiterbildungen() {
  return (
    <Screen tone="petrol" width="wide">
      <div className="flex flex-col gap-[clamp(1rem,3.5vh,2.5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <In i={0}>
              <p className="kicker text-white/85">Linie W · Weiterbildungen</p>
            </In>
            <Words text="Weiterbildung für jede Etappe." className="title-xl mt-3 text-white" />
          </div>
          <In i={2} className="hidden flex-wrap gap-2 sm:flex">
            {trainings.map((t) => (
              <TLink key={t.id} href={`/weiterbildungen/${t.id}`} className="rounded-full border border-white/30 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-petrol">
                {t.title.split(" (")[0].replace(" für Triebfahrzeugführer", "")}
              </TLink>
            ))}
          </In>
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {trainingAreas.map((a, i) => (
            <In key={a.title} i={i + 3}>
              <TLink href={a.href} className="group flex h-full flex-row overflow-hidden rounded-[18px] bg-white text-ink md:flex-col">
                <span className="relative w-28 shrink-0 overflow-hidden md:aspect-[16/9] md:w-auto [@media(max-height:760px)]:md:aspect-[3/1]">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 30vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 flex-col gap-1 p-4 md:p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent-ink">{a.audience}</span>
                  <span className="font-heading text-lg font-bold text-petrol md:text-xl">{a.title}</span>
                  <span className="text-sm text-ink/75">{a.text}</span>
                  <ArrowUpRight className="mt-auto hidden size-5 self-end text-petrol transition-transform group-hover:rotate-45 md:block" aria-hidden="true" />
                </span>
              </TLink>
            </In>
          ))}
        </div>
      </div>
    </Screen>
  );
}
