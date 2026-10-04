import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { idealProfile } from "@/content/landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dein optimales Profil für die Ausbildung",
  description: "Mindestens 20 Jahre, Hauptschulabschluss oder Ausbildung, Deutsch B1/B2, Eignungsuntersuchung, Schichtbereitschaft – passt das zu dir?",
  path: "/lokfuehrer-werden/profil",
});

export default function Profil() {
  return (
    <Screen tone="petrol">
      <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-white/85">Passt das zu dir?</p>
          </In>
          <Words text="Dein optimales Profil." className="title-xl text-white" />
          <div className="clip-in relative mt-2 hidden aspect-[4/3] overflow-hidden rounded-[18px] lg:block" style={{ ["--i" as string]: 2 }}>
            {/* Bild: zwei Teilnehmer lernen gemeinsam am Laptop */}
            <Image src="/images/placeholder-teilnehmer-laptop.jpg" alt="Zwei Teilnehmer lernen gemeinsam am Laptop" fill sizes="35vw" className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ul className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
            {idealProfile.map((p, i) => (
              <In as="li" key={p} i={i + 1} x className={`flex items-start gap-3 rounded-[14px] bg-white/10 p-2.5 text-[0.85rem] sm:p-3 text-white backdrop-blur-sm sm:text-[0.95rem] ${i === idealProfile.length - 1 ? "sm:col-span-2" : ""}`}>
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink" aria-hidden="true">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                {p}
              </In>
            ))}
          </ul>
          <In i={9}>
            <TLink href="/lokfuehrer-werden/bewerben" className="btn btn-accent">
              Passt! Jetzt Lokführer werden <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
          </In>
        </div>
      </div>
    </Screen>
  );
}
