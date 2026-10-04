import Image from "next/image";
import { ArrowRight, Compass, Eye, HandHeart, Lightbulb, Sparkles, Users, Wrench } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { PartnerBar } from "@/components/sections/PartnerBar";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { UspBand } from "@/components/sections/UspBand";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leitbild, mission, specialOffer, values } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Über uns – Team, Leitbild und Werte",
  description: "DEKRA-zertifizierte Dozenten mit über 10 Jahren Erfahrung in allen Bereichen des Eisenbahnwesens: Lernen Sie das Team der So geht Eisenbahn GmbH kennen.",
  path: "/ueber-uns",
});

const missionIcons = [Compass, Eye, HandHeart];
const valueIcons = [Wrench, Lightbulb, Users, Sparkles];

export default function UeberUnsPage() {
  return (
    <>
      <Hero
        eyebrow="Über uns"
        title="Über uns"
        image={{ src: "/images/placeholder-hero-team-simulator.jpg", alt: "Das SGE-Team am Führerstand-Simulator" }}
        text="Was uns besonders macht, ist die umfangreiche, praktische Erfahrung unserer DEKRA-zertifizierten Dozenten. Mit über 10 Jahren Erfahrung in allen Bereichen des Eisenbahnwesens bieten wir gemeinsam mit unseren Kooperationspartnern ein Lernumfeld, das tiefgreifende Einblicke aus jeder Perspektive der Eisenbahnbranche bietet."
        actions={
          <LinkButton href="#team" size="lg">
            Unser Team kennenlernen <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
        }
      />

      {/* Mission / Vision / Engagement */}
      <section className="section">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {mission.map((m, i) => {
            const Icon = missionIcons[i];
            return (
              <article key={m.title} className="reveal flex flex-col gap-3 rounded-card border border-petrol-100 p-7">
                <Icon className="size-8 text-accent-dark" aria-hidden="true" />
                <h2 className="text-2xl font-bold">{m.title}</h2>
                <p className="text-ink/80">{m.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Leitbild */}
      <section className="section bg-surface">
        <div className="container-page grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image src="/images/placeholder-ueber-uns-raeume.jpg" alt="Moderne, AZAV-konforme Schulungsräume in Gelsenkirchen" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Leitbild" title="Unser Leitbild" />
            {leitbild.map((p) => (
              <p key={p.slice(0, 24)} className="text-ink/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="section">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Werte" title="Unsere Werte" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <article key={v.title} className="reveal flex flex-col gap-3 rounded-card bg-petrol p-6 text-white">
                  <span className="grid size-11 place-items-center rounded-card bg-white/10 text-accent" aria-hidden="true">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-xl font-bold text-white">{v.title}</h3>
                  <p className="text-white/85">{v.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PartnerBar />

      {/* Team */}
      <section id="team" className="section bg-surface">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Team" title="Leidenschaft für die Eisenbahn und Engagement für Qualität" />
          <div className="mt-12">
            <TeamGrid variant="full" />
          </div>
          {/* Platzhalter: Teamfoto in Warnweste */}
          <div className="reveal relative mx-auto mt-14 aspect-[16/9] max-w-4xl overflow-hidden rounded-card shadow-card">
            <Image src="/images/placeholder-team-warnweste.jpg" alt="Das Team der So geht Eisenbahn GmbH in Warnwesten vor einem Zug" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <UspBand />

      {/* Das Besondere */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Unser Unterschied" title="Das Besondere an unserem Ausbildungsangebot" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialOffer.map((s, i) => (
              <li key={s.title} className="reveal flex flex-col gap-2 border-t-4 border-accent pt-5">
                <span className="font-heading text-4xl font-bold text-petrol/25" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-ink/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Lernen Sie uns persönlich kennen" text="Jeden Montag um 15:30 Uhr in Gelsenkirchen – kostenlos und unverbindlich." cta="Zur Infoveranstaltung" href="/infoveranstaltung" />
    </>
  );
}
