import { ArrowRight, Check } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { SplitImage } from "@/components/sections/SplitImage";
import { UspBand } from "@/components/sections/UspBand";
import { LinkButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { trainings } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Weiterbildungen für Eisenbahnunternehmen und Triebfahrzeugführer",
  description:
    "Simulator-Training im Zusi-Simulator, Fortbildungsunterricht (RFU), Disposition und Eisenbahngrundlagen – praxisnahe Weiterbildungen der So geht Eisenbahn GmbH.",
  path: "/weiterbildungen",
});

const offer = [
  "Originalgetreuer Zusi-Simulator in Gelsenkirchen",
  "DEKRA-zertifizierte Prüfer und erfahrene Dozenten",
  "Flexible Termine – vor Ort oder online",
  "Maßgeschneiderte Inhalte für Eisenbahnverkehrsunternehmen",
];

export default function WeiterbildungenPage() {
  return (
    <>
      <Hero
        eyebrow="Weiterbildungen"
        title="Weiterbildungen"
        text="Fachspezifische Kurse für Triebfahrzeugführer und maßgeschneiderte Angebote für Geschäftskunden – vom Simulatortraining bis zur Disposition."
        image={{ src: "/images/placeholder-wb-simulator.jpg", alt: "Zusi-Simulator mit Vectron-Führerstand" }}
        aside={
          <div className="rounded-card bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur-md md:p-8">
            <p className="mb-4 font-heading text-xl font-bold text-white">Unser Angebot</p>
            <CheckList items={offer} light />
          </div>
        }
        actions={
          <LinkButton href="/kontakt" size="lg">
            Angebot anfragen <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
        }
      />

      <nav aria-label="Weiterbildungen auf dieser Seite" className="sticky top-[4.5rem] z-20 border-b border-petrol-100 bg-white/95 backdrop-blur">
        <ul className="container-page flex gap-2 overflow-x-auto py-3">
          {trainings.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="block whitespace-nowrap rounded-full border border-petrol-100 px-4 py-1.5 text-sm font-semibold text-petrol transition-colors hover:border-petrol hover:bg-petrol hover:text-white">
                {t.title.split(" (")[0]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="section">
        <div className="container-page flex flex-col gap-20 md:gap-28">
          {trainings.map((t, i) => (
            <SplitImage key={t.id} id={t.id} image={{ src: t.image, alt: t.imageAlt }} imageSide={i % 2 ? "right" : "left"}>
              <p className="eyebrow">Weiterbildung {String(i + 1).padStart(2, "0")}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{t.title}</h2>
              <p className="text-lg text-ink/80">{t.text}</p>
              {t.points && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.points.map((p) => (
                    <div key={p.title} className="rounded-card bg-surface p-5">
                      <p className="mb-1 flex items-start gap-2 font-bold text-petrol">
                        <Check className="size-5 shrink-0 text-accent-dark" strokeWidth={3} aria-hidden="true" />
                        {p.title}
                      </p>
                      <p className="text-sm text-ink/75">{p.text}</p>
                    </div>
                  ))}
                </div>
              )}
              <LinkButton href="/kontakt" variant="outline-dark" className="self-start">
                Anfrage stellen
              </LinkButton>
            </SplitImage>
          ))}
        </div>
      </div>

      <UspBand />
      <CtaBand title="Sie suchen eine Schulung für Ihr Team?" text="Wir stellen Ihnen ein Angebot zusammen, das zu Ihren Fahrzeugen, Strecken und Abläufen passt." cta="Jetzt Kontakt aufnehmen" href="/kontakt" />
    </>
  );
}
