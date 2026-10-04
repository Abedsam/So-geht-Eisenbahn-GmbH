import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Rocket, TrainFront } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { PartnerBar } from "@/components/sections/PartnerBar";
import { UspBand } from "@/components/sections/UspBand";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { homeAdvantages, homeIntroCards } from "@/content/about";
import { trainingAreas } from "@/content/courses";
import { homeFaq } from "@/content/faq";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "So geht Eisenbahn – Eisenbahnakademie in Gelsenkirchen",
  description:
    "Aus- und Weiterbildungen im Eisenbahnsektor: Triebfahrzeugführer, Nachschulung Anlage 6/7, ETCS- und LZB-Seminare, Simulatortraining. Gefördert mit Bildungsgutschein.",
  path: "/",
});

const cardIcons = [Rocket, TrainFront, GraduationCap];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaq)} />

      <Hero
        eyebrow="Eisenbahnakademie in Gelsenkirchen"
        title="Gleiswechsel in Ihre Zukunft"
        image={{ src: "/images/placeholder-hero-simulator.jpg", alt: "Teilnehmer im Führerstand-Simulator" }}
        text="Wir sind eine erfahrene und moderne Eisenbahnakademie, die gemeinsam mit ausgewählten Kooperationspartnern die Aus- und Weiterbildungen im Eisenbahnsektor für Unternehmen und Privatteilnehmer organisiert."
        actions={
          <>
            <LinkButton href="/ausbildungen" size="lg">
              Mit uns durchstarten <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/lokfuehrer-werden" variant="outline-light" size="lg">
              Lokführer werden
            </LinkButton>
          </>
        }
      />

      {/* Drei Einstiegskarten – leicht in den Hero geschoben */}
      <section aria-label="Unser Angebot" className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page grid gap-4 md:grid-cols-3 md:gap-5">
          {homeIntroCards.map((c, i) => {
            const Icon = cardIcons[i];
            return (
              <Link
                key={c.title}
                href={c.href}
                className="reveal group flex flex-col gap-3 rounded-card bg-white p-6 shadow-lift ring-1 ring-petrol-100 transition-transform duration-300 hover:-translate-y-1 md:p-7"
              >
                <span className="grid size-12 place-items-center rounded-card bg-accent-soft text-petrol transition-colors group-hover:bg-accent" aria-hidden="true">
                  <Icon className="size-6" />
                </span>
                <h2 className="text-xl font-bold">{c.title}</h2>
                <p className="flex-1 text-ink/75">{c.text}</p>
                <span className="inline-flex items-center gap-1.5 font-bold text-petrol">
                  {c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Vorteile */}
      <section className="section">
        <div className="container-page grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
            {/* Bild: Dozent erklärt Teilnehmern den Simulator */}
            <Image src="/images/placeholder-start-vorteile.jpg" alt="Dozent erklärt Teilnehmern den Führerstand-Simulator" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute right-4 top-4 rounded-card bg-white/95 p-4 shadow-card backdrop-blur">
              <p className="font-heading text-3xl font-bold text-petrol">10+ Jahre</p>
              <p className="text-sm text-ink/75">Praxiserfahrung unserer Dozenten</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Warum SGE" title="Ihre Vorteile mit SGE" />
            <Accordion items={homeAdvantages.map((a) => ({ title: a.title, content: <p>{a.text}</p> }))} />
          </div>
        </div>
      </section>

      <UspBand />

      {/* Video-Rundgang */}
      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Rundgang"
            title="Lernen Sie uns kennen"
            text={
              <>
                <p>Machen Sie einen virtuellen Rundgang durch unsere Räume in Gelsenkirchen: Unterrichtsräume, Führerstand-Simulator und das Team, das Sie auf Ihrem Weg begleitet.</p>
                <LinkButton href="/infoveranstaltung" variant="outline-dark" className="mt-6">
                  Persönlich vorbeikommen
                </LinkButton>
              </>
            }
          />
          <div className="reveal">
            <VideoPlaceholder poster="/images/placeholder-video-rundgang.jpg" title="Videorundgang durch die Räume in Gelsenkirchen" duration="1:54" />
          </div>
        </div>
      </section>

      {/* Weiterbildungsbereiche */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Weiterbildungen" title="Die Weiterbildungen umfassen folgende Bereiche" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trainingAreas.map((a) => (
              <Link key={a.title} href={a.href} className="reveal group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-lift">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">{a.audience}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="text-xl font-bold">{a.title}</h3>
                  <p className="flex-1 text-ink/75">{a.text}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-bold text-petrol">
                    Mehr erfahren <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartnerBar
        title="Unsere Eisenbahn-Partner"
        text="Gemeinsam mit einem Netzwerk aus Eisenbahnverkehrsunternehmen und Dienstleistern sorgen wir für eine praxisnahe Ausbildung – und für einen sicheren Arbeitsplatz nach dem Abschluss."
      />

      {/* FAQ */}
      <section className="section bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Häufige Fragen zu Förderung und Eignung"
            text="Sie haben eine andere Frage? Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gern persönlich."
          />
          <Accordion
            defaultOpen={null}
            items={homeFaq.map((f) => ({
              title: f.question,
              content: <p>{f.answer}</p>,
              // TODO(Kunde): Antwort freigeben – danach `todo` in content/faq.ts entfernen
              badge: f.todo ? <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-ink/80">Entwurf</span> : undefined,
            }))}
          />
        </div>
      </section>

      <CtaBand
        title="Haben wir Ihr Interesse an einer Aus- oder Weiterbildung in der Eisenbahnbranche geweckt?"
        text="Wir beraten Sie persönlich und unverbindlich – auch zur Förderung über den Bildungsgutschein."
        cta="Jetzt mit uns durchstarten"
        href="/kontakt"
      />
    </>
  );
}
