import Image from "next/image";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { CertBar } from "@/components/sections/CertBar";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { LinkButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Tabs } from "@/components/ui/Tabs";
import { courses, offerList } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ausbildungen: Triebfahrzeugführer & Nachschulung Anlage 6/7",
  description:
    "12-monatige Umschulung zum Triebfahrzeugführer (m/w/d) und Nachschulung nach Anlage 6/7 TfV inkl. Prüfung – mit 100 % Jobgarantie, gefördert über den Bildungsgutschein.",
  path: "/ausbildungen",
});

export default function AusbildungenPage() {
  return (
    <>
      <Hero
        eyebrow="Ausbildungen"
        title="Ausbildungen"
        image={{ src: "/images/placeholder-hero-zug.jpg", alt: "Regionalzug auf freier Strecke" }}
        aside={
          <div className="rounded-card bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur-md md:p-8">
            <p className="mb-4 font-heading text-xl font-bold text-white">Unser Angebot</p>
            <CheckList items={offerList} light />
          </div>
        }
        text="Vom Quereinstieg bis zur Prüfung: Wir bilden Triebfahrzeugführer praxisnah aus und begleiten Sie persönlich bis zum Jobstart."
        actions={
          <LinkButton href="/lokfuehrer-werden" size="lg">
            Jetzt bewerben <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
        }
      />

      {courses.map((c, i) => (
        <section key={c.id} id={c.id} className={`section ${i % 2 ? "bg-surface" : ""}`} aria-labelledby={`${c.id}-title`}>
          <div className="container-page grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className={`reveal flex min-w-0 flex-col gap-5 lg:sticky lg:top-28 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-5">
              <p className="eyebrow">{c.subtitle}</p>
              <h2 id={`${c.id}-title`} className="text-3xl font-bold md:text-4xl">
                {c.title}
              </h2>
              {c.description.map((d) => (
                <p key={d.slice(0, 24)} className="text-lg text-ink/80">
                  {d}
                </p>
              ))}
              <div className="mt-2">
                <Tabs
                  label={`Details zu ${c.title}`}
                  items={c.tabs.map((t) => ({
                    id: t.id,
                    label: t.label,
                    content: (
                      <div className="flex flex-col gap-4">
                        {t.todo && (
                          <p className="inline-flex items-center gap-2 self-start rounded-btn bg-accent-soft px-3 py-1.5 text-sm font-semibold text-ink">
                            <TriangleAlert className="size-4" aria-hidden="true" /> Entwurf – Inhalte vom Kunden zu bestätigen
                          </p>
                        )}
                        {t.intro && <p className="text-ink/80">{t.intro}</p>}
                        <CheckList items={t.items} />
                      </div>
                    ),
                  }))}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <LinkButton href={c.id === "triebfahrzeugfuehrer" ? "/lokfuehrer-werden" : "/kontakt"}>
                  {c.id === "triebfahrzeugfuehrer" ? "In 2 Minuten bewerben" : "Beratung anfragen"} <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href="/infoveranstaltung" variant="outline-dark">
                  Zur Infoveranstaltung
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CertBar />
      <CtaBand title="Sie möchten wissen, welche Ausbildung zu Ihnen passt?" text="Besuchen Sie unsere kostenlose Infoveranstaltung – jeden Montag um 15:30 Uhr in Gelsenkirchen." cta="Zur Infoveranstaltung" href="/infoveranstaltung" />
    </>
  );
}
