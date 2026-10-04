import { In, Screen, Words } from "@/components/stage/Screen";
import { TeamRow } from "@/components/stage/TeamRow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Deine Begleiter in der Ausbildung",
  description: "DEKRA-zertifizierte Dozenten mit über 10 Jahren Praxiserfahrung in allen Bereichen des Eisenbahnwesens.",
  path: "/lokfuehrer-werden/team",
});

export default function Team() {
  return (
    <Screen tone="ink" width="wide">
      <div className="flex flex-col gap-[clamp(1rem,4vh,3rem)]">
        <div className="max-w-3xl">
          <In i={0}>
            <p className="kicker text-white/80">Dein Team</p>
          </In>
          <Words text="Deine Begleiter in der Ausbildung." className="title-xl mt-3 text-white" />
          <In i={2}>
            <p className="lead mt-3 hidden text-white/80 sm:block">DEKRA-zertifizierte Dozenten mit über 10 Jahren Praxis in allen Bereichen des Eisenbahnwesens – lebendig, praxisnah und richtig spannend.</p>
          </In>
        </div>
        <TeamRow variant="short" />
      </div>
    </Screen>
  );
}
