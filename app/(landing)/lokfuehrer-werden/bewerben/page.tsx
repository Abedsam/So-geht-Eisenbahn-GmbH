import { Check } from "lucide-react";
import { LeadQuiz } from "@/components/forms/LeadQuiz";
import { In, Screen, Words } from "@/components/stage/Screen";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Jetzt in 2 Minuten als Lokführer bewerben",
  description: "Ohne Unterlagen, in 2 Minuten, unverbindlich: Bewirb dich jetzt für die Ausbildung zum Lokführer (m/w/d) in Gelsenkirchen.",
  path: "/lokfuehrer-werden/bewerben",
});

export default function Bewerben() {
  return (
    <Screen tone="accent">
      <div className="grid items-center gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-ink/80 before:bg-ink">Endstation: Traumjob</p>
          </In>
          <Words text="In 2 Minuten beworben." className="title-xl text-ink" />
          <ul className="hidden flex-wrap gap-x-5 gap-y-2 sm:flex lg:flex-col">
            {["Ohne Unterlagen", "In 2 Minuten bewerben", "Unverbindlich"].map((t, i) => (
              <In as="li" key={t} i={i + 2} className="flex items-center gap-2 font-semibold text-ink">
                <span className="grid size-6 place-items-center rounded-full bg-ink text-accent" aria-hidden="true">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                {t}
              </In>
            ))}
          </ul>
        </div>
        <In i={2} className="rounded-[20px] bg-white p-4 shadow-lift sm:p-8">
          <LeadQuiz />
        </In>
      </div>
    </Screen>
  );
}
