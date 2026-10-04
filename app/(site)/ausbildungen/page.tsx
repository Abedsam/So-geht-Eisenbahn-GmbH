import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { courses, offerList } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ausbildungen: Triebfahrzeugführer & Nachschulung Anlage 6/7",
  description: "12-monatige Umschulung zum Triebfahrzeugführer (m/w/d) und Nachschulung nach Anlage 6/7 TfV inkl. Prüfung – mit 100 % Jobgarantie, gefördert über den Bildungsgutschein.",
  path: "/ausbildungen",
});

export default function Ausbildungen() {
  return (
    <Screen
      tone="ink"
      width="wide"
      backdrop={
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* Bild: Regionalzug auf freier Strecke */}
          <Image src="/images/placeholder-hero-zug.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-petrol-deep via-petrol-deep/90 to-petrol-deep/40" />
        </div>
      }
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-white/85">Linie A · Ausbildungen</p>
          </In>
          <Words text="Ausbildungen mit Jobgarantie." className="title-xl text-white" />
          <ul className="flex flex-col gap-2">
            {offerList.map((o, i) => (
              <In as="li" key={o} i={i + 2} x className="flex items-start gap-3 text-sm text-white/90 sm:text-base">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-ink" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {o}
              </In>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {courses.map((c, i) => (
            <In key={c.id} i={i + 3}>
              <TLink href={`/ausbildungen/${c.id}`} className="group relative flex h-full min-h-28 items-end overflow-hidden rounded-[18px] bg-petrol p-5 text-white sm:min-h-44 lg:min-h-[clamp(8rem,22vh,13rem)]">
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover opacity-35 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-50" />
                <span className="relative flex w-full items-end justify-between gap-3">
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-accent">{c.subtitle}</span>
                    <span className="block font-heading text-xl font-bold sm:text-2xl">{c.title}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45" aria-hidden="true">
                    <ArrowUpRight className="size-5" />
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
