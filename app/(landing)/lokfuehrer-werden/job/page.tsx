import Image from "next/image";
import { In, Screen, Words } from "@/components/stage/Screen";
import { jobDescription } from "@/content/landing";
import { nextCourseStart } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dein Job als Lokführer (m/w/d)",
  description: "12 Monate Ausbildung in Gelsenkirchen, Start am 02.11.26 oder später – auch für Quereinsteiger. Das sind deine Aufgaben als Lokführer.",
  path: "/lokfuehrer-werden/job",
});

export default function Job() {
  return (
    <Screen tone="ink">
      <div className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="clip-in relative hidden aspect-[4/5] max-h-[62vh] overflow-hidden rounded-[18px] md:block">
          {/* Bild: Teilnehmer im Führerstand-Simulator */}
          <Image src="/images/placeholder-teilnehmer-simulator.jpg" alt="Teilnehmer im Führerstand-Simulator" fill sizes="45vw" className="object-cover" />
          <span className="absolute bottom-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">Start {nextCourseStart} oder später</span>
        </div>
        <div className="flex flex-col gap-[clamp(0.75rem,2.2vh,1.5rem)]">
          <In i={0}>
            <p className="kicker text-white/80">Stellenbeschreibung</p>
          </In>
          <Words text="Dein Arbeitsplatz hat die beste Aussicht." className="title-xl text-white" />
          <In i={2}>
            <p className="lead max-w-xl text-white/85">
              In nur <strong className="text-accent">12 Monaten</strong> zum Lokführer (m/w/d) in Gelsenkirchen – mit Erfahrung oder als Quereinsteiger. Danach übernimmst du verantwortungsvolle Aufgaben:
            </p>
          </In>
          <ol className="flex flex-col gap-3">
            {jobDescription.tasks.map((t, i) => (
              <In as="li" key={t} i={i + 3} x className="flex items-start gap-4 rounded-[14px] border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-heading font-bold text-ink" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-sm text-white/90 sm:text-base">{t}</span>
              </In>
            ))}
          </ol>
        </div>
      </div>
    </Screen>
  );
}
