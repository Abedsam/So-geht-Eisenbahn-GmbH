import Image from "next/image";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { Accordion } from "@/components/ui/Accordion";
import { homeAdvantages } from "@/content/about";
import { usps } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ihre Vorteile mit SGE",
  description: "Praxiswissen aus erster Hand, persönliche Betreuung, moderne Lernmethoden, faire Bedingungen und geprüfte Qualität.",
  path: "/vorteile",
});

export default function Vorteile() {
  return (
    <Screen tone="light" backdrop={<StationNumber n={2} />}>
      <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">Warum SGE</p>
          </In>
          <Words text="Ihre Vorteile mit SGE." className="title-xl text-petrol" />
          <div className="clip-in relative hidden aspect-[4/3] overflow-hidden rounded-[18px] lg:block [@media(max-height:760px)]:!hidden" style={{ ["--i" as string]: 2 }}>
            {/* Bild: Dozent erklärt Teilnehmern den Simulator */}
            <Image src="/images/placeholder-start-vorteile.jpg" alt="Dozent erklärt Teilnehmern den Führerstand-Simulator" fill sizes="35vw" className="object-cover" />
            <span className="absolute right-3 top-3 rounded-[12px] bg-white/95 px-3 py-2 font-heading text-xl font-bold text-petrol">10+ Jahre Praxis</span>
          </div>
          <ul className="hidden grid-cols-3 gap-2 sm:grid">
            {usps.map((u, i) => (
              <In as="li" key={u.title} i={i + 3} className="rounded-[14px] bg-petrol p-3 text-white">
                <p className="font-heading text-xl font-bold text-accent sm:text-2xl">{u.value}</p>
                <p className="text-xs leading-snug text-white/85">{u.title}</p>
              </In>
            ))}
          </ul>
        </div>
        <In i={2}>
          <Accordion items={homeAdvantages.map((a) => ({ title: a.title, content: <p>{a.text}</p> }))} />
        </In>
      </div>
    </Screen>
  );
}
