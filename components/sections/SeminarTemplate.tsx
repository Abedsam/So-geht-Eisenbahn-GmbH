import { ArrowDown, ArrowRight, CalendarDays, Clock, Euro, MapPin, Target, UserCheck } from "lucide-react";
import { SeminarForm } from "@/components/forms/SeminarForm";
import { CertBar } from "@/components/sections/CertBar";
import { Hero } from "@/components/sections/Hero";
import { buttonClass } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Seminar } from "@/content/seminars";
import { courseJsonLd } from "@/lib/jsonld";

const factIcons = [UserCheck, Target, CalendarDays, Clock, Euro, MapPin];

/** Gemeinsames Template für /seminare/etcs und /seminare/lzb */
export function SeminarTemplate({ seminar }: { seminar: Seminar }) {
  return (
    <>
      <JsonLd data={courseJsonLd(seminar)} />
      <Hero
        eyebrow="Seminar für Triebfahrzeugführer"
        title={seminar.title}
        image={{ src: seminar.heroImage, alt: seminar.heroAlt }}
        text={
          <div className="flex flex-col gap-4 text-base md:text-lg">
            {seminar.intro.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        }
        actions={
          <>
            <a href="#anmeldung" className={buttonClass("primary", "lg")}>
              Direkt anmelden <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a href="#inhalte" className={buttonClass("outline-light", "lg")}>
              Mehr erfahren
            </a>
          </>
        }
      />

      {/* Inhalte */}
      <section id="inhalte" className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Inhalte der Weiterbildung" title={`Das lernen Sie im ${seminar.shortTitle}-Seminar`} />
          <div className={`mt-10 grid gap-5 ${seminar.contentGroups.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {seminar.contentGroups.map((g, i) => (
              <article key={g.title} className="reveal flex flex-col gap-5 rounded-card border border-petrol-100 bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-petrol font-heading font-bold text-white" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold">{g.title}</h3>
                </div>
                <CheckList items={g.items} icon="arrow" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Das sollten Sie wissen */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Auf einen Blick" title="Das sollten Sie wissen" />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seminar.facts.map((f, i) => {
              const Icon = factIcons[i] ?? ArrowRight;
              return (
                <div key={f.label} className="reveal min-w-0 rounded-card bg-white p-5 shadow-card sm:p-6">
                  <dt className="flex items-center gap-3 font-heading text-lg font-bold text-petrol">
                    <span className="grid size-11 shrink-0 place-items-center rounded-card bg-accent-soft" aria-hidden="true">
                      <Icon className="size-5" />
                    </span>
                    {f.label}
                  </dt>
                  <dd className="mt-3 hyphens-auto text-ink/80 [overflow-wrap:anywhere]">{f.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <CertBar />

      {/* Anmeldung */}
      <section id="anmeldung" className="section bg-petrol-50">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Anmeldung" title={`Jetzt zum ${seminar.shortTitle}-Seminar anmelden`} />
            <p className="text-ink/80">
              5 Tage inklusive Prüfung, {seminar.priceEur.toLocaleString("de-DE")} € pro Teilnehmer inklusive Prüfungsgebühr. Nach Ihrer Anmeldung erhalten Sie alle Details per E-Mail.
            </p>
            <ul className="flex flex-col gap-2">
              {seminar.dates.map((d) => (
                <li key={d.id} className="inline-flex items-center gap-2 font-semibold text-petrol">
                  <CalendarDays className="size-5 text-accent-dark" aria-hidden="true" /> Kursstart {d.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-white p-6 shadow-lift md:p-8">
            <SeminarForm seminar={seminar} />
          </div>
        </div>
      </section>
    </>
  );
}
