import { BookOpen, GraduationCap, LifeBuoy, MapPin, MonitorPlay } from "lucide-react";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "So läuft deine Ausbildung zum Lokführer",
  description: "Ca. 6 Monate Theorie in Gelsenkirchen, ca. 6 Monate wohnortnahe Praxis – mit Simulatoren, digitalen Boards, Tablets und auf Wunsch täglicher Nachhilfe.",
  path: "/lokfuehrer-werden/ausbildung",
});

const phases = [
  { months: "~6 Monate", title: "Theorie bei SGE", text: "Unterricht in Gelsenkirchen – mit Simulator, digitalen Boards und Tablets.", icon: BookOpen },
  { months: "~6 Monate", title: "Praxis vor Ort", text: "Wohnortnahe Praxiseinsätze bei unseren Kooperationspartnern.", icon: MapPin },
];

const extras = [
  { text: "Moderne Ausbildung mit Simulatoren", icon: MonitorPlay },
  { text: "Qualifikation zum eigenständigen Führen von Lok- und Triebfahrzeugen", icon: GraduationCap },
  { text: "Und wenn's mal hakt: auf Wunsch tägliche Nachhilfe", icon: LifeBuoy },
];

export default function Ausbildung() {
  return (
    <Screen tone="light" backdrop={<StationNumber n={4} />}>
      <div className="flex flex-col gap-[clamp(1rem,3.5vh,2.75rem)]">
        <div>
          <In i={0}>
            <p className="kicker text-petrol">Das erwartet dich</p>
          </In>
          <Words text="12 Monate. Zwei Etappen. Ein Ziel." className="title-xl mt-3 text-petrol" />
        </div>

        {/* Fahrplan: zwei Etappen auf einer Strecke */}
        <div className="relative">
          <svg className="absolute left-0 right-0 top-7 hidden h-2 w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#DCE7E9" strokeWidth="2" />
            <line className="draw" pathLength={1} x1="0" y1="1" x2="100" y2="1" stroke="#FAB33F" strokeWidth="2" />
          </svg>
          <ol className="relative grid gap-3 md:grid-cols-3 md:gap-4">
            {phases.map((p, i) => (
              <In as="li" key={p.title} i={i + 2} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 md:flex md:flex-col md:items-start md:gap-3">
                <span className="row-span-3 grid size-12 place-items-center rounded-full border-4 border-surface bg-petrol md:size-14 text-white shadow-card" aria-hidden="true">
                  <p.icon className="size-6" />
                </span>
                <p className="font-heading text-[clamp(1.4rem,4vh,2.4rem)] font-bold leading-none text-accent-ink">{p.months}</p>
                <h2 className="col-start-2 font-heading text-lg font-bold text-petrol md:text-xl">{p.title}</h2>
                <p className="col-start-2 hidden text-ink/75 sm:block">{p.text}</p>
              </In>
            ))}
            <In as="li" i={4} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 md:flex md:flex-col md:items-start md:gap-3">
              <span className="row-span-3 grid size-12 place-items-center rounded-full border-4 border-surface bg-accent md:size-14 text-ink shadow-card" aria-hidden="true">
                <GraduationCap className="size-6" />
              </span>
              <p className="font-heading text-[clamp(1.4rem,4vh,2.4rem)] font-bold leading-none text-accent-ink">Ziel</p>
              <h2 className="col-start-2 font-heading text-lg font-bold text-petrol md:text-xl">Lokführer (m/w/d)</h2>
              <p className="col-start-2 hidden text-ink/75 sm:block">Prüfung bestehen und mit 100 % Jobgarantie durchstarten.</p>
            </In>
          </ol>
        </div>

        <ul className="hidden gap-2 sm:grid sm:grid-cols-3 sm:gap-3">
          {extras.map((e, i) => (
            <In as="li" key={e.text} i={i + 5} className="flex items-center gap-3 rounded-[14px] bg-white p-3 text-sm font-medium text-ink shadow-card">
              <e.icon className="size-5 shrink-0 text-accent-ink" aria-hidden="true" />
              {e.text}
            </In>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
