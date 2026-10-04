import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { TeamRow } from "@/components/stage/TeamRow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Unser Team",
  description: "Leidenschaft für die Eisenbahn und Engagement für Qualität: Lernen Sie die Dozentinnen, Dozenten und Ansprechpartner der So geht Eisenbahn GmbH kennen.",
  path: "/ueber-uns/team",
});

export default function TeamPage() {
  return (
    <Screen tone="light" width="wide" backdrop={<StationNumber n={4} />}>
      <div className="flex flex-col gap-[clamp(1rem,4vh,3rem)]">
        <div className="max-w-3xl">
          <In i={0}>
            <p className="kicker text-petrol">Team</p>
          </In>
          <Words text="Leidenschaft für die Eisenbahn und Engagement für Qualität." className="title mt-2 text-petrol" />
        </div>
        <TeamRow variant="full" dark={false} />
      </div>
    </Screen>
  );
}
