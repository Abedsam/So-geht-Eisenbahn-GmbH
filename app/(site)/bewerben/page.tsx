import type { Metadata } from "next";
import Image from "next/image";
import { InfoCta, QuizCta } from "@/components/bewerben/CtaButtons";
import { BewerbenFaq } from "@/components/bewerben/Faq";
import { Quiz } from "@/components/bewerben/Quiz";
import { Testimonials } from "@/components/bewerben/Testimonials";
import { benefits, heroChecks, jobTasks, landingPartners, landingTeam, profile, timeline } from "@/content/bewerben";
import { nextCourseStart } from "@/content/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: { absolute: "Lokführer werden – geförderte Ausbildung in Gelsenkirchen | So geht Eisenbahn" },
  description:
    "Werde Lokführer (m/w/d) in 12 Monaten – 100 % gefördert per Bildungsgutschein, 100 % Jobgarantie, ca. 4.000 € netto. In 2 Minuten bewerben, ohne Unterlagen.",
  alternates: { canonical: "/bewerben" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "So geht Eisenbahn",
    url: "/bewerben",
    title: "Lokführer werden – geförderte Ausbildung in Gelsenkirchen",
    description: "In 2 Minuten bewerben – ohne Unterlagen, unverbindlich.",
    images: [{ url: "/assets/hero-zug.png", width: 1672, height: 941, alt: "Zug von So geht Eisenbahn am Bahnsteig" }],
  },
};

// Seiten-spezifische Keyframes (globals.css bleibt unberührt); reduced-motion schaltet sie global ab
const keyframes = `
@keyframes sge-spin{to{transform:rotate(360deg)}}
@keyframes sge-kenburns{from{transform:scale(1.04)}to{transform:scale(1.16) translate(-1.5%,-1%)}}
@keyframes sge-pulse{0%,100%{box-shadow:0 0 0 0 rgba(22,137,232,.55)}50%{box-shadow:0 0 0 10px rgba(22,137,232,0)}}
`;

const ctaCls = "btn btn-primary border-0 font-sans";

export default function BewerbenPage() {
  return (
    <main id="inhalt">
      <style>{keyframes}</style>

      {/* 01 Hero */}
      <section aria-label="Werde Lokführer" className="relative flex min-h-[min(100vh,920px)] items-center overflow-hidden bg-navy text-white">
        <Image
          src={asset("/assets/hero-zug.png")}
          alt="Moderner blau-weißer Zug von So geht Eisenbahn fährt im Abendlicht in den Bahnhof ein"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[28%_50%] animate-[sge-kenburns_18s_ease-out_both] motion-reduce:animate-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(7,28,53,.94) 0%, rgba(7,28,53,.72) 40%, rgba(7,28,53,.25) 72%, rgba(7,28,53,.1) 100%), linear-gradient(180deg, rgba(7,28,53,.6) 0%, rgba(7,28,53,0) 26%, rgba(7,28,53,0) 70%, rgba(7,28,53,.85) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 min-[900px]:hidden"
          style={{ background: "linear-gradient(0deg, rgba(7,28,53,.96) 0%, rgba(7,28,53,.7) 55%, rgba(7,28,53,.35) 100%)" }}
        />
        <div className="relative mx-auto flex w-full max-w-page justify-end px-[clamp(20px,6vw,96px)] pb-[clamp(72px,9vw,120px)] pt-[calc(116px+clamp(40px,6vw,80px))]">
          <div className="flex max-w-[660px] flex-col gap-6">
            <div
              data-reveal=""
              className="flex items-center gap-3 self-start rounded-md border border-blue-light/35 bg-navy/70 px-3 py-2 font-mono text-xs tracking-[.12em] text-blue-light"
            >
              <span className="size-2 shrink-0 rounded-full bg-blue-hover animate-[sge-pulse_2s_ease-in-out_infinite]" />
              ABFAHRT {nextCourseStart} · GLEIS 1 · GELSENKIRCHEN
            </div>
            <h1 data-reveal="" data-reveal-delay="80" className="m-0 text-[clamp(36px,5.2vw,72px)] font-extrabold leading-[1.02] tracking-[-.03em]">
              Werde Lokführer (m/w/d) und verdiene <span className="text-blue-light">4.000&nbsp;€ netto/Monat</span> nach der Ausbildung!
            </h1>
            <p data-reveal="" data-reveal-delay="160" className="m-0 text-[clamp(17px,1.4vw,20px)] leading-relaxed text-on-navy">
              Starte deine Ausbildung zum Lokführer (m/w/d) bei uns in Gelsenkirchen und werde Teil eines unverzichtbaren Teams, das täglich Tausende
              Menschen und Güter sicher ans Ziel bringt.
            </p>
            <div data-reveal="" data-reveal-delay="240" className="flex flex-wrap gap-3">
              <QuizCta className={`${ctaCls} btn-lg`}>
                Jetzt bewerben <span aria-hidden="true">→</span>
              </QuizCta>
              <InfoCta className="btn btn-ghost-dark btn-lg font-sans hover:transform-none">Mehr erfahren</InfoCta>
            </div>
            <ul data-reveal="" data-reveal-delay="320" className="m-0 mt-1 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0 text-[15px] font-semibold">
              {heroChecks.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span aria-hidden="true" className="font-extrabold text-blue-light">
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-xs tracking-[.3em] text-white/75"
        >
          <span>SCROLLEN</span>
          <span className="h-[26px] w-[1.5px] animate-hint bg-current" />
        </div>
      </section>

      {/* 02 Bewerbungs-Quiz */}
      <section id="quiz" aria-label="Bewerbungs-Quiz" className="relative px-4 pb-[clamp(64px,8vw,104px)]">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[120px] bg-navy" />
        <Quiz />
      </section>

      {/* 03 Vorteile */}
      <section id="info" className="pb-[clamp(80px,10vw,140px)] pt-[clamp(48px,6vw,80px)]">
        <div className="container-page">
          <div data-reveal="" className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 max-w-[720px]">Dein Einsatz zum Lokführer lohnt sich.</h2>
            <p className="m-0 max-w-[420px] text-lg leading-relaxed text-muted">
              Sicherer Job, starkes Gehalt – und die Ausbildung kostet dich keinen Cent.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {benefits.map((b, i) => (
              <div key={b.label} data-reveal="" data-reveal-delay={i * 100}>
                <article
                  className={`flex h-full flex-col gap-4 rounded-card px-[30px] py-[34px] ${
                    b.dark
                      ? "bg-navy text-white transition-[transform,box-shadow] duration-[350ms] ease-[ease] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(7,28,53,.5)]"
                      : "card-lift border border-line bg-white"
                  }`}
                >
                  <span className={`font-mono text-[13px] ${b.dark ? "text-blue-light" : "text-blue"}`}>{b.label}</span>
                  <span
                    data-count={b.count}
                    data-suffix={b.suffix}
                    className={`text-[clamp(48px,5vw,64px)] font-extrabold leading-none tracking-[-.03em] ${b.dark ? "text-blue-light" : "text-blue"}`}
                  >
                    {b.display}
                  </span>
                  <h3 className="m-0 text-2xl font-extrabold tracking-[-.01em]">{b.title}</h3>
                  <p className={`m-0 text-[17px] leading-relaxed ${b.dark ? "text-on-navy-2" : "text-muted"}`}>{b.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Stellenbeschreibung */}
      <section className="section-y overflow-hidden bg-navy text-white">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-[22px]">
            <span data-reveal="" className="font-mono text-[13px] tracking-[.16em] text-blue-light">
              STELLENBESCHREIBUNG
            </span>
            <h2 data-reveal="" className="h2">
              In 12 Monaten in den Führerstand.
            </h2>
            <p data-reveal="" className="m-0 text-lg leading-[1.65] text-on-navy">
              So geht Eisenbahn bildet dich in nur 12 Monaten zum Lokführer (m/w/d) in Gelsenkirchen aus. Start am {nextCourseStart} oder später.
              Quereinsteiger willkommen.
            </p>
            <ol className="m-0 flex list-none flex-col gap-3 p-0">
              {jobTasks.map((t, i) => (
                <li
                  key={t}
                  data-reveal=""
                  data-reveal-delay={i * 100}
                  className="grid grid-cols-[44px_1fr] items-center gap-4 rounded-xl border border-blue-light/20 bg-white/[.04] p-4"
                >
                  <span className="flex size-11 items-center justify-center rounded-btn bg-blue font-mono">{`0${i + 1}`}</span>
                  <span className="text-[17px] leading-[1.55]">{t}</span>
                </li>
              ))}
            </ol>
            <QuizCta data-reveal="" className={`${ctaCls} min-h-14 self-start px-[26px] py-[17px] text-[17px] hover:transform-none`}>
              Jetzt in 2 Minuten bewerben <span aria-hidden="true">↑</span>
            </QuizCta>
          </div>
          <div data-reveal="" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={asset("/assets/naechster-halt.png")}
              alt="Zug an Gleis 1 mit Anzeigetafel: Nächster Halt – Deine Ausbildung"
              fill
              sizes="(min-width: 1040px) 640px, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-[ease] group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 05 Ausbildung / Fahrplan */}
      <section className="section-y border-b border-line bg-white">
        <div className="container-page flex flex-col gap-14">
          <div data-reveal="" className="flex flex-col gap-3.5">
            <span className="kicker">FAHRPLAN</span>
            <h2 className="h2">Das erwartet dich in deiner Ausbildung.</h2>
          </div>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-y-8 p-0">
            {timeline.map((t, i) => {
              const last = i === timeline.length - 1;
              return (
                <li key={t.title} data-reveal="" data-reveal-delay={i * 100} className="flex flex-col gap-3.5 pr-5">
                  <div className="flex items-center">
                    <span className={`size-5 shrink-0 rounded-full shadow-[0_0_0_6px_#E3EEF8] ${last ? "bg-blue-hover" : "bg-blue"}`} />
                    <span className={`h-[3px] flex-1 ${last ? "bg-transparent" : "bg-blue"}`} />
                  </div>
                  <span className="font-mono text-xs text-blue">{t.tag}</span>
                  <span className="text-[22px] font-extrabold leading-[1.2]">{t.title}</span>
                  <span className="text-base leading-[1.55] text-muted">{t.text}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 06 Profil */}
      <section className="section-y">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div data-reveal="" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={asset("/assets/zug-detail.png")}
              alt="Frontscheinwerfer eines modernen Zuges vor Bergkulisse"
              fill
              sizes="(min-width: 1040px) 640px, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-[ease] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col gap-[22px]">
            <span data-reveal="" className="kicker">
              VORAUSSETZUNGEN
            </span>
            <h2 data-reveal="" className="h2">
              Dein optimales Profil.
            </h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {profile.map((p) => (
                <li
                  key={p}
                  data-reveal=""
                  className="flex items-start gap-3.5 rounded-[10px] border border-line bg-white px-[18px] py-3.5 text-[17px] leading-[1.55]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-blue text-[13px] font-extrabold text-white"
                  >
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <QuizCta data-reveal="" className={`${ctaCls} min-h-14 self-start px-[26px] py-[17px] text-[17px] hover:transform-none`}>
              Jetzt Lokführer werden <span aria-hidden="true">↑</span>
            </QuizCta>
          </div>
        </div>
      </section>

      {/* 07 Testimonials */}
      <Testimonials />

      {/* 08 Team */}
      <section className="section-y">
        <div className="container-page">
          <div data-reveal="" className="mb-12 flex max-w-[760px] flex-col gap-3.5">
            <span className="kicker">DEIN TEAM</span>
            <h2 className="h2">Deine Begleiter in der Ausbildung.</h2>
            <p className="m-0 text-lg leading-[1.65] text-muted">DEKRA-zertifizierte Dozenten mit über 10 Jahren Praxiserfahrung aus dem Eisenbahnwesen.</p>
          </div>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-x-5 gap-y-8 p-0">
            {landingTeam.map((m) => (
              <li key={m.name} data-reveal="" className="flex flex-col items-center gap-2.5 text-center">
                <Image
                  src={asset(m.img)}
                  alt={`Porträt von ${m.name}`}
                  width={132}
                  height={132}
                  sizes="132px"
                  className="size-[132px] rounded-full border-4 border-white bg-[#9BB6E3] object-cover object-top shadow-[0_14px_30px_-14px_rgba(7,28,53,.45)] transition-transform duration-[350ms] ease-[ease] hover:scale-[1.06]"
                />
                <strong className="text-[19px] font-extrabold">{m.name}</strong>
                <span className="text-sm leading-normal text-muted">{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 Partner */}
      <section className="overflow-hidden border-y border-line bg-white py-[clamp(64px,8vw,104px)]">
        <h2
          data-reveal=""
          className="mx-auto mb-9 mt-0 max-w-page px-[clamp(20px,3vw,40px)] text-[clamp(28px,3.2vw,40px)] font-extrabold tracking-[-.03em]"
        >
          Unsere Kooperationspartner.
        </h2>
        <div className="marquee-mask">
          <ul aria-label="Kooperationspartner" className="m-0 flex w-max animate-marquee list-none gap-4 p-0">
            {[...landingPartners, ...landingPartners].map((p, i) => (
              <li
                key={i}
                aria-hidden={i >= landingPartners.length || undefined}
                className="flex h-24 w-[220px] shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-[22px] font-extrabold tracking-[-.01em] text-navy-500"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 FAQ */}
      <section className="section-y">
        <div className="mx-auto flex max-w-[960px] flex-col gap-3 px-[clamp(20px,3vw,40px)]">
          <h2 data-reveal="" className="h2 mb-6">
            Fragen und Antworten.
          </h2>
          <BewerbenFaq />
        </div>
      </section>

      {/* 11 Final CTA */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={asset("/assets/zug-bahnsteig.png")} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover opacity-35" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(7,28,53,.55) 0%, rgba(7,28,53,.95) 70%)" }}
        />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-7 px-[clamp(20px,3vw,40px)] py-[clamp(100px,12vw,170px)] text-center">
          <span data-reveal="" className="font-mono text-[13px] tracking-[.16em] text-blue-light">
            LETZTER AUFRUF · GLEIS 1
          </span>
          <h2 data-reveal="" className="m-0 text-[clamp(42px,6vw,84px)] font-extrabold leading-[.98] tracking-[-.03em]">
            Dein Platz im Führerstand wartet.
          </h2>
          <QuizCta data-reveal="" className={`${ctaCls} min-h-[60px] px-[34px] py-5 text-[19px] hover:transform-none`}>
            Jetzt in 2 Minuten bewerben <span aria-hidden="true">↑</span>
          </QuizCta>
        </div>
      </section>
    </main>
  );
}
