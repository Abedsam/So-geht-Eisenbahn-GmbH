import { BadgeCheck, Euro, TrainFront } from "lucide-react";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { benefits } from "@/content/landing";
import { funders } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Deine Vorteile als Lokführer",
  description: "100 % Jobgarantie, rund 4.000 € netto Einstiegsgehalt und eine kostenfreie Ausbildung dank Bildungsgutschein.",
  path: "/lokfuehrer-werden/vorteile",
});

const big = [
  { value: "100 %", unit: "Jobgarantie", icon: TrainFront },
  { value: "≈ 4.000 €", unit: "netto / Monat", icon: Euro },
  { value: "0 €", unit: "Eigenanteil", icon: BadgeCheck },
];

export default function Vorteile() {
  return (
    <Screen tone="light" backdrop={<StationNumber n={2} />}>
      <div className="flex flex-col gap-[clamp(1rem,3vh,2.5rem)]">
        <div className="max-w-3xl">
          <In i={0}>
            <p className="kicker text-petrol">Deine Vorteile</p>
          </In>
          <Words text="Dein Einsatz zum Lokführer lohnt sich." className="title-xl mt-3 text-petrol" />
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {benefits.map((b, i) => {
            const B = big[i];
            return (
              <In key={b.title} i={i + 2} className="group relative grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 overflow-hidden rounded-[18px] bg-white p-4 shadow-card md:flex md:flex-col md:items-stretch md:gap-3 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift md:p-7">
                <span className="absolute right-0 top-0 h-1.5 w-0 bg-accent transition-[width] duration-500 group-hover:w-full" aria-hidden="true" />
                <div className="row-span-2 flex items-center justify-between md:row-span-1">
                  <p className="font-heading text-[clamp(1.9rem,5vh,3rem)] font-bold leading-none text-petrol">{B.value}</p>
                  <span className="hidden size-12 place-items-center rounded-full bg-accent-soft md:grid text-petrol transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
                    <B.icon className="size-6" />
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-ink md:text-sm">{B.unit}</p>
                <h2 className="col-start-2 font-sans text-sm font-bold text-ink md:text-lg">{b.title}</h2>
                <p className="hidden text-[0.95rem] text-ink/75 md:[@media(min-height:760px)]:block">{b.text}</p>
              </In>
            );
          })}
        </div>
        <In i={6} className="hidden flex-wrap items-center gap-2 text-sm sm:flex">
          <span className="font-semibold text-ink/80">Förderung über:</span>
          {funders.map((f) => (
            <span key={f} className="rounded-full border border-petrol-100 bg-white px-3 py-1 text-ink/85">
              {f}
            </span>
          ))}
          <TLink href="/lokfuehrer-werden/bewerben" className="ml-auto hidden font-bold text-petrol underline-offset-4 hover:underline md:inline">
            Direkt bewerben →
          </TLink>
        </In>
      </div>
    </Screen>
  );
}
