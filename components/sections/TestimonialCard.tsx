import { Star } from "lucide-react";
import type { Testimonial } from "@/content/landing";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="reveal flex flex-col gap-3">
      <VideoPlaceholder poster={t.poster} title={`Erfahrungsbericht von ${t.name}`} duration={t.duration} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex gap-0.5 text-accent" role="img" aria-label="5 von 5 Sternen">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-5 fill-current" aria-hidden="true" />
        ))}
      </div>
      <div>
        <h3 className="font-sans text-base font-bold text-ink">{t.name}, Teilnehmer</h3>
        <p className="text-sm text-ink/70">{t.background}</p>
      </div>
    </article>
  );
}
