import Image from "next/image";
import { Compass, Eye, HandHeart } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { mission } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Über uns – Mission, Vision, Engagement",
  description: "DEKRA-zertifizierte Dozenten mit über 10 Jahren Erfahrung in allen Bereichen des Eisenbahnwesens: Das ist die So geht Eisenbahn GmbH.",
  path: "/ueber-uns",
});

const icons = [Compass, Eye, HandHeart];

export default function UeberUns() {
  return (
    <Screen
      tone="ink"
      width="wide"
      backdrop={
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* Bild: SGE-Team am Führerstand-Simulator */}
          <Image src="/images/placeholder-team-simulator.jpg" alt="" fill sizes="100vw" className="object-cover object-top opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol-deep via-petrol-deep/85 to-petrol-deep/40" />
        </div>
      }
    >
      <div className="flex flex-col gap-[clamp(1rem,4vh,3rem)]">
        <div className="max-w-3xl">
          <In i={0}>
            <p className="kicker text-white/85">Linie U · Über uns</p>
          </In>
          <Words text="Wissen aus allen Perspektiven der Eisenbahn." className="title-xl mt-3 text-white" />
          <In i={2} className="hidden sm:block">
            <p className="lead mt-3 text-white/85">
              Was uns besonders macht, ist die praktische Erfahrung unserer DEKRA-zertifizierten Dozenten: über 10 Jahre in allen Bereichen des Eisenbahnwesens – gemeinsam mit unseren Kooperationspartnern.
            </p>
          </In>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-5">
          {mission.map((m, i) => {
            const Icon = icons[i];
            return (
              <In key={m.title} i={i + 3} className="rounded-[16px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-md md:p-6">
                <Icon className="mb-2 size-6 text-accent sm:size-7" aria-hidden="true" />
                <h2 className="font-heading text-sm font-bold text-white sm:text-xl">{m.title}</h2>
                <p className="mt-1 hidden text-sm text-white/80 sm:block">{m.text}</p>
              </In>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
