import { Star } from "lucide-react";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { testimonials } from "@/content/landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Next Stop: Traumjob – das sagen unsere Teilnehmer",
  description: "Vom Anlagenmechaniker, Ingenieur oder KFZ-Mechatroniker zum Lokführer: Video-Erfahrungsberichte unserer Teilnehmer.",
  path: "/lokfuehrer-werden/stimmen",
});

export default function Stimmen() {
  return (
    <Screen tone="light" width="wide" backdrop={<StationNumber n={6} />}>
      <div className="flex flex-col gap-[clamp(1rem,3.5vh,2.5rem)]">
        <div>
          <In i={0}>
            <p className="kicker text-petrol">Erfahrungsberichte</p>
          </In>
          <Words text="Next Stop: Traumjob!" className="title-xl mt-3 text-petrol" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {testimonials.map((t, i) => (
            <In key={t.name} i={i + 2} className="flex flex-col gap-2">
              <VideoPlaceholder poster={t.poster} title={`Erfahrungsbericht von ${t.name}`} duration={t.duration} sizes="(min-width: 1024px) 25vw, 50vw" />
              <div className="flex gap-0.5 text-accent" role="img" aria-label="5 von 5 Sternen">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="font-bold text-ink">{t.name}</p>
              <p className="text-sm text-ink/75">
                Vorher: <span className="font-semibold text-petrol">{t.background}</span>
              </p>
            </In>
          ))}
        </div>
      </div>
    </Screen>
  );
}
