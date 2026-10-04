import { Lightbulb, Sparkles, Users, Wrench } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { specialOffer, values } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Unsere Werte",
  description: "Fachkompetenz und Praxisnähe, Innovation, Inklusivität und Leidenschaft – und was unser Ausbildungsangebot besonders macht.",
  path: "/ueber-uns/werte",
});

const icons = [Wrench, Lightbulb, Users, Sparkles];

export default function Werte() {
  return (
    <Screen tone="petrol" width="wide">
      <div className="flex flex-col gap-[clamp(1rem,3.5vh,2.5rem)]">
        <div>
          <In i={0}>
            <p className="kicker text-white/85">Werte</p>
          </In>
          <Words text="Wofür wir stehen." className="title-xl mt-3 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {values.map((v, i) => {
            const Icon = icons[i];
            return (
              <In key={v.title} i={i + 2} className="group rounded-[18px] bg-white p-4 text-ink transition-transform duration-300 hover:-translate-y-1 md:p-5">
                <span className="mb-3 grid size-11 place-items-center rounded-[12px] bg-petrol text-accent transition-transform duration-500 group-hover:rotate-6" aria-hidden="true">
                  <Icon className="size-6" />
                </span>
                <h2 className="font-heading text-base font-bold text-petrol md:text-lg">{v.title}</h2>
                <p className="mt-1 hidden text-sm text-ink/75 sm:block">{v.text}</p>
              </In>
            );
          })}
        </div>
        <In i={6} className="rounded-[18px] border border-white/20 p-4 md:p-5 [@media(max-height:760px)]:hidden">
          <p className="mb-3 font-heading text-lg font-bold text-white">Das Besondere an unserem Ausbildungsangebot</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {specialOffer.map((s) => (
              <li key={s.title} className="text-sm text-white/85">
                <strong className="block text-accent">{s.title}</strong>
                <span className="hidden sm:inline">{s.text}</span>
              </li>
            ))}
          </ul>
        </In>
      </div>
    </Screen>
  );
}
