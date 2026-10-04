import Image from "next/image";
import { Caveat } from "next/font/google";
import { ArrowDown, ArrowUp, BadgeCheck, Check, Euro, TrainFront } from "lucide-react";
import { LeadQuiz } from "@/components/forms/LeadQuiz";
import { CertBar } from "@/components/sections/CertBar";
import { Hero } from "@/components/sections/Hero";
import { PartnerBar } from "@/components/sections/PartnerBar";
import { SplitImage } from "@/components/sections/SplitImage";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { Accordion } from "@/components/ui/Accordion";
import { buttonClass } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlaceholder } from "@/components/ui/VideoPlaceholder";
import { landingFaq } from "@/content/faq";
import { benefits, idealProfile, jobDescription, landingHero, testimonials, trainingExpectations } from "@/content/landing";
import { faqJsonLd, lokfuehrerProgramJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const caveat = Caveat({ subsets: ["latin"], weight: "700", display: "swap" });

export const metadata = pageMetadata({
  title: "Lokführer werden – 4.000 € netto nach 12 Monaten",
  description:
    "Werde Lokführer (m/w/d) in Gelsenkirchen: 12 Monate Ausbildung, kostenfrei mit Bildungsgutschein, 100 % Jobgarantie und rund 4.000 € netto im Monat. Jetzt in 2 Minuten bewerben.",
  path: "/lokfuehrer-werden",
});

const benefitIcons = { train: TrainFront, euro: Euro, check: BadgeCheck };

export default function LokfuehrerWerdenPage() {
  return (
    <>
      <JsonLd data={lokfuehrerProgramJsonLd} />
      <JsonLd data={faqJsonLd(landingFaq)} />

      {/* ---------- Hero ---------- */}
      <Hero
        title={landingHero.title}
        text={landingHero.text}
        actions={
          <>
            <a href="#bewerben" className={buttonClass("primary", "lg")}>
              Jetzt bewerben
            </a>
            <a href="#vorteile" className={buttonClass("outline-light", "lg")}>
              Mehr erfahren
            </a>
          </>
        }
        aside={
          <div className="relative pb-14 md:pb-0">
            <VideoPlaceholder poster={landingHero.video.poster} title={landingHero.video.title} duration={landingHero.video.duration} framed preload />
            {/* Handschriftlicher Hinweis wie im Original */}
            <p
              className={`${caveat.className} pointer-events-none absolute -bottom-2 right-2 flex rotate-[-6deg] items-center gap-2 text-3xl leading-none text-white md:-bottom-14 md:right-6 md:text-4xl`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 60 44" className="h-9 w-12 text-accent" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M56 38C34 38 16 28 10 6" />
                <path d="M3 14l7-9 8 8" />
              </svg>
              Video unbedingt anschauen!
            </p>
          </div>
        }
      >
        <a href="#bewerben" className="mt-4 hidden w-fit animate-bounce text-accent md:block" aria-label="Zur Bewerbung">
          <ArrowDown className="size-8" aria-hidden="true" />
        </a>
      </Hero>

      {/* ---------- Bewerbungs-Funnel ---------- */}
      <section id="bewerben" aria-labelledby="bewerben-title" className="relative bg-petrol pb-14 md:pb-20">
        <div className="container-page">
          <h2 id="bewerben-title" className="sr-only">
            In 2 Minuten bewerben
          </h2>
          <div className="mx-auto max-w-4xl rounded-card bg-white p-5 shadow-lift sm:p-8 md:p-10">
            <LeadQuiz />
          </div>
          <ul className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-between gap-3 text-white sm:flex-row">
            {["Ohne Unterlagen", "In 2 Minuten bewerben", "Unverbindlich"].map((t) => (
              <li key={t} className="flex items-center gap-2 font-medium">
                <Check className="size-5 text-accent" strokeWidth={3} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Vorteile ---------- */}
      <section id="vorteile" className="section bg-surface">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Deine Vorteile" title="Dein Einsatz zum Lokführer lohnt sich" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((b) => {
              const Icon = benefitIcons[b.icon];
              return (
                <article key={b.title} className="reveal group flex flex-col gap-4 rounded-card bg-white p-7 shadow-card transition-shadow hover:shadow-lift">
                  <span className="grid size-14 place-items-center rounded-card bg-petrol text-accent transition-transform duration-300 group-hover:-rotate-6" aria-hidden="true">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="text-xl font-bold">{b.title}</h3>
                  <p className="text-ink/80">{b.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CertBar title="Anerkannt und zertifiziert" />

      {/* ---------- Stellenbeschreibung ---------- */}
      <section className="section pt-4 md:pt-8">
        <div className="container-page">
          <SplitImage image={{ src: "/images/placeholder-teilnehmer-simulator.jpg", alt: "Teilnehmer im Führerstand-Simulator der So geht Eisenbahn GmbH" }} imageSide="right">
            <p className="eyebrow">Stellenbeschreibung</p>
            <h2 className="text-3xl font-bold md:text-4xl">Dein neuer Job: Lokführer (m/w/d)</h2>
            <p className="font-semibold text-ink">{jobDescription.lead}</p>
            <p className="text-ink/80">{jobDescription.text}</p>
            <ol className="flex flex-col gap-3">
              {jobDescription.tasks.map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-bold text-ink" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-ink/85">{t}</span>
                </li>
              ))}
            </ol>
            <a href="#bewerben" className={buttonClass("primary", "lg", "self-start")}>
              Jetzt in 2 Minuten bewerben <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </SplitImage>
        </div>
      </section>

      {/* ---------- Ausbildung & Profil ---------- */}
      <section className="section bg-surface">
        <div className="container-page flex flex-col gap-16 md:gap-24">
          <SplitImage image={{ src: "/images/placeholder-team-simulator.jpg", alt: "Das SGE-Team am Führerstand-Simulator" }}>
            <h2 className="text-3xl font-bold md:text-4xl">Das erwartet dich in deiner Ausbildung</h2>
            <CheckList items={trainingExpectations} icon="arrow" />
          </SplitImage>

          <SplitImage image={{ src: "/images/placeholder-teilnehmer-laptop.jpg", alt: "Zwei Teilnehmer lernen gemeinsam am Laptop" }}>
            <h2 className="text-3xl font-bold md:text-4xl">Dein optimales Profil für die Ausbildung</h2>
            <CheckList items={idealProfile} />
            <a href="#bewerben" className={buttonClass("primary", "lg", "self-start")}>
              Jetzt Lokführer werden <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </SplitImage>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Erfahrungsberichte" title="Next Stop: Traumjob! Das sagen unsere Teilnehmer" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Dein Team"
            title="Deine Begleiter in der Ausbildung"
            text="Deine DEKRA-zertifizierten Dozenten bringen jede Menge Praxiserfahrung mit – über 10 Jahre in allen Bereichen des Eisenbahnwesens. So wird dein Unterricht lebendig, praxisnah und richtig spannend."
          />
          <div className="mt-12">
            <TeamGrid variant="short" />
          </div>
        </div>
      </section>

      <PartnerBar link={false} />

      {/* ---------- FAQ ---------- */}
      <section className="section bg-surface">
        <div className="container-page grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-card shadow-card md:sticky md:top-8 md:aspect-[4/5]">
            <Image src="/images/placeholder-unterricht.jpg" alt="Teilnehmer im Unterrichtsraum in Gelsenkirchen" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="FAQ" title="Fragen und Antworten" text="Wir haben die häufigsten Fragen für dich zusammengestellt:" />
            <Accordion items={landingFaq.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
            <a href="#bewerben" className={buttonClass("primary", "lg", "self-start")}>
              Jetzt bewerben <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
