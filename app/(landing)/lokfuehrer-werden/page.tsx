import { Caveat } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { In, Screen } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { Train } from "@/components/stage/Train";
import { JsonLd } from "@/components/ui/JsonLd";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { landingHero } from "@/content/landing";
import { lokfuehrerProgramJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

// Höhe des einfahrenden Zugs am unteren Rand
const TRAIN_H = "clamp(80px, 18vh, 190px)";

const caveat = Caveat({ subsets: ["latin"], weight: "700", display: "swap" });

export const metadata = pageMetadata({
  title: "Lokführer werden – 4.000 € netto nach 12 Monaten",
  description:
    "Werde Lokführer (m/w/d) in Gelsenkirchen: 12 Monate Ausbildung, kostenfrei mit Bildungsgutschein, 100 % Jobgarantie und rund 4.000 € netto im Monat. Jetzt in 2 Minuten bewerben.",
  path: "/lokfuehrer-werden",
});

export default function LokfuehrerStart() {
  return (
    <Screen
      tone="petrol"
      backdrop={
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0" style={{ height: TRAIN_H }} aria-hidden="true">
          <Train className="absolute bottom-0 right-0 h-full w-auto max-w-none" />
        </div>
      }
    >
      <JsonLd data={lokfuehrerProgramJsonLd} />
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14" style={{ paddingBottom: `calc(${TRAIN_H} - 1.5rem)` }}>
        <div className="flex flex-col gap-[clamp(0.75rem,2vh,1.25rem)]">
          <In i={0}>
            <p className="kicker text-white/85">Quereinstieg · Gelsenkirchen</p>
          </In>
          <h1 className="text-[clamp(1.75rem,min(5.2vh,6vw),3.3rem)] font-bold leading-[1.05] text-white">
            <span className="word">
              <span style={{ ["--w" as string]: 0 }}>Werde Lokführer (m/w/d)</span>
            </span>{" "}
            <span className="word">
              <span style={{ ["--w" as string]: 1 }}>und verdiene</span>
            </span>{" "}
            <span className="word">
              <span style={{ ["--w" as string]: 2 }} className="text-accent">
                4.000 € netto/Monat
              </span>
            </span>{" "}
            <span className="word">
              <span style={{ ["--w" as string]: 3 }}>nach der Ausbildung!</span>
            </span>
          </h1>
          <In i={3}>
            <p className="max-w-xl text-[clamp(0.95rem,2vh,1.125rem)] text-white/90">{landingHero.text}</p>
          </In>
          <In i={4} className="flex flex-wrap gap-3">
            <TLink href="/lokfuehrer-werden/bewerben" className="btn btn-accent">
              Jetzt bewerben <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
            <TLink href="/lokfuehrer-werden/vorteile" className="btn btn-ghost-light">
              Mehr erfahren
            </TLink>
          </In>
        </div>
        <In i={3} x className="relative hidden sm:block">
          <VideoPlaceholder poster={landingHero.video.poster} title={landingHero.video.title} duration={landingHero.video.duration} framed preload />
          <p className={`${caveat.className} float pointer-events-none absolute -bottom-12 right-4 flex rotate-[-5deg] items-center gap-2 text-3xl text-white xl:text-4xl`} aria-hidden="true">
            <svg viewBox="0 0 60 44" className="h-9 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M56 38C34 38 16 28 10 6" />
              <path d="M3 14l7-9 8 8" />
            </svg>
            Video unbedingt anschauen!
          </p>
        </In>
      </div>
    </Screen>
  );
}
