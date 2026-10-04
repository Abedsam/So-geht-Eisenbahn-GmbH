import { ArrowRight, Clock, MapPin } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lernen Sie uns kennen – Rundgang",
  description: "Virtueller Rundgang durch die Räume der So geht Eisenbahn GmbH in Gelsenkirchen: Unterrichtsräume, Führerstand-Simulator und Team.",
  path: "/rundgang",
});

export default function Rundgang() {
  return (
    <Screen tone="petrol" width="wide">
      <div className="grid items-center gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-white/85">Rundgang</p>
          </In>
          <Words text="Lernen Sie uns kennen." className="title-xl text-white" />
          <In i={2}>
            <p className="lead text-white/85">Ein Blick in unsere Räume in Gelsenkirchen: Unterricht, Führerstand-Simulator und das Team, das Sie begleitet.</p>
          </In>
          <In i={3} className="flex flex-col gap-2 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" aria-hidden="true" /> Bahnhofstraße 74–76, Gelsenkirchen
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-accent" aria-hidden="true" /> Infoveranstaltung jeden Montag, 15:30 Uhr
            </span>
          </In>
          <In i={4}>
            <TLink href="/infoveranstaltung" className="btn btn-accent">
              Persönlich vorbeikommen <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
          </In>
        </div>
        <In i={2} x>
          <VideoPlaceholder poster="/images/placeholder-video-rundgang.jpg" title="Videorundgang durch die Räume in Gelsenkirchen" duration="1:54" framed sizes="(min-width: 1024px) 60vw, 100vw" />
        </In>
      </div>
    </Screen>
  );
}
