import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faqs01 from "@/components/ui/faqs-01";
import { JsonLd } from "@/components/ui/JsonLd";
import { erwartung, kennzahlen, lokfuehrerFaq, requirements, route, testimonials } from "@/content/ausbildung";
import { nextCourseStart } from "@/content/site";
import { asset } from "@/lib/asset";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Lokführer werden – in 12 Monaten zum Triebfahrzeugführer",
  description:
    "Dein Quereinstieg in die Eisenbahnbranche: In 12 Monaten zum Lokführer (m/w/d), kostenfrei mit Bildungsgutschein, 100 % Jobgarantie, ca. 4.000 € netto Einstieg.",
  alternates: { canonical: "/lokfuehrer-werden" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/lokfuehrer-werden",
    siteName: "So geht Eisenbahn",
    title: "In 12 Monaten zum Lokführer | So geht Eisenbahn",
    description: "Dein Quereinstieg in die Eisenbahnbranche – Jetzt anmelden.",
    images: [{ url: "/assets/zug-bahnsteig.png", width: 555, height: 249, alt: "Zug steht frontal im modernen Bahnhof bereit" }],
  },
};

const h2 = "m-0 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]";
const sectionY = "py-[clamp(72px,9vw,120px)]";

export default function LokfuehrerWerdenPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-navy pb-[clamp(64px,8vw,112px)] pt-[calc(116px+clamp(64px,8vw,120px))] text-white">
        <Image
          src={asset("/assets/zug-bahnsteig.png")}
          alt="Zug steht frontal im modernen Bahnhof bereit"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[center_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(7,28,53,.96) 0%, rgba(7,28,53,.8) 45%, rgba(7,28,53,.3) 100%)" }}
        />
        <div className="container-page relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12">
          <div className="flex flex-col gap-6">
            <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
              <Link href="/" className="text-blue-light no-underline hover:text-blue-light">
                START
              </Link>{" "}
              / LOKFÜHRER WERDEN
            </nav>
            <h1 className="m-0 text-[clamp(44px,6vw,84px)] font-extrabold leading-[.96] tracking-[-.03em]">In 12 Monaten zum Lokführer.</h1>
            <p className="m-0 text-[clamp(18px,1.5vw,22px)] leading-normal text-on-navy">Dein Quereinstieg in die Eisenbahnbranche.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/kontakt#lokfuehrer" className="btn btn-primary px-[30px] py-[19px] text-lg">
                Jetzt anmelden →
              </Link>
              <span className="text-[15px] text-on-navy-2">Nächster Start: {nextCourseStart}</span>
            </div>
          </div>
          <ol
            aria-label="Ausbildungsroute"
            className="m-0 flex list-none flex-col rounded-2xl border border-blue-light/25 bg-navy/[.78] p-7 backdrop-blur-[8px]"
          >
            {route.map((r, i) => {
              const first = i === 0;
              const last = i === route.length - 1;
              return (
                <li
                  key={r.label}
                  data-reveal=""
                  data-reveal-delay={i * 150}
                  className={`grid grid-cols-[24px_1fr_auto] items-center gap-4 ${
                    last ? "pb-1 pt-3.5" : "border-b border-dashed border-white/[.14] py-3.5"
                  }`}
                >
                  <span
                    className={`size-3.5 rounded-full ${
                      first ? "border-2 border-blue-light" : last ? "bg-white shadow-[0_0_14px_#1689E8]" : "bg-blue-hover"
                    }`}
                  />
                  <span className={last ? "text-[22px] font-extrabold" : "text-lg font-bold"}>{r.label}</span>
                  <span className={`font-mono text-[13px] ${last ? "text-white" : "text-blue-light"}`}>{r.meta}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 02 Kennzahlen */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6 px-[clamp(20px,3vw,40px)] py-10">
          {kennzahlen.map((k) => (
            <div key={k.label} className="flex flex-col gap-1">
              <span
                data-count={k.count}
                data-suffix={k.suffix}
                className="text-[clamp(40px,4vw,56px)] font-extrabold tracking-[-.03em] text-blue"
              >
                {k.display}
              </span>
              <span className="text-base text-muted">{k.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Das erwartet dich */}
      <section className={sectionY}>
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div data-reveal="" className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={asset("/assets/zug-detail.png")}
              alt="Nahaufnahme der Frontscheinwerfer eines Zuges vor Bergkulisse"
              fill
              sizes="(min-width: 1040px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 data-reveal="" className={h2}>
              Das erwartet dich
            </h2>
            <ol className="m-0 flex list-none flex-col gap-[18px] p-0">
              {erwartung.map((e, i) => (
                <li key={e} data-reveal="" className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="flex size-11 items-center justify-center rounded-btn bg-navy font-mono text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-[1.6]">{e}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 04 Deine Ausbildung */}
      <section className="pb-[clamp(72px,9vw,120px)]">
        <div className="container-page flex flex-col gap-8">
          <h2 data-reveal="" className={h2}>
            Deine Ausbildung
          </h2>
          <div data-reveal="" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-3.5 bg-navy p-[clamp(28px,4vw,48px)] text-white">
              <span className="font-mono text-xs tracking-[.14em] text-blue-light">MONAT 1–6</span>
              <span className="text-[clamp(28px,3vw,40px)] font-extrabold">6 Monate Theorie</span>
              <p className="m-0 text-[17px] leading-[1.6] text-on-navy-2">
                Bei uns in Gelsenkirchen: Betriebsdienst, Signale, Fahrzeugtechnik und Simulator – auf Wunsch mit täglicher Nachhilfe.
              </p>
            </div>
            <div className="flex flex-col gap-3.5 bg-blue p-[clamp(28px,4vw,48px)] text-white">
              <span className="font-mono text-xs tracking-[.14em] text-blue-tint">MONAT 7–12</span>
              <span className="text-[clamp(28px,3vw,40px)] font-extrabold">+ ca. 6 Monate Praxis</span>
              <p className="m-0 text-[17px] leading-[1.6] text-blue-tint">
                Wohnortnah bei unseren Partner-Unternehmen – begleitet von erfahrenen Lokführern bis zur Prüfung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Das bringst du mit / Perspektive */}
      <section className={`${sectionY} border-y border-line bg-white`}>
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-5">
            <h2 data-reveal="" className={h2}>
              Das bringst du mit
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {requirements.map((r) => (
                <li key={r} data-reveal="" className="flex gap-3.5 rounded-[10px] bg-bg px-[18px] py-3.5 text-[17px] leading-[1.55]">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue text-[13px] font-extrabold text-white"
                  >
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h2 data-reveal="" className={h2}>
              Deine Perspektive
            </h2>
            <p data-reveal="" className="m-0 text-lg leading-[1.65] text-muted">
              Nach deinem Abschluss wartet dein neuer Job schon auf dich. Der Schienenverkehr wird ausgebaut, Lokführer werden bundesweit
              gesucht – mit rund 4.000 € netto im Monat, Zulagen, Sozialleistungen und Aufstiegschancen, etwa zum Ausbilder oder
              Disponenten.
            </p>
            <div data-reveal="" className="relative aspect-video overflow-hidden rounded-card">
              <Image
                src={asset("/assets/zug-seite.png")}
                alt="Seitenansicht eines blau-weißen Zuges im Sonnenuntergang"
                fill
                sizes="(min-width: 1040px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 06 Testimonials */}
      <section className={sectionY}>
        <div className="container-page">
          <span data-reveal="" className="kicker mb-3 block">
            NEXT STOP: TRAUMJOB
          </span>
          <h2 data-reveal="" className={`${h2} mb-10`}>
            Das sagen unsere Teilnehmer
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
            {testimonials.map((t) => (
              <article key={t.name} data-reveal="" className="flex flex-col gap-3.5">
                {/* TODO(Kunde): echte Videos einbinden */}
                <div
                  role="img"
                  aria-label={`Video-Platzhalter: ${t.name} erzählt von seiner Ausbildung`}
                  className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card"
                  style={{ background: "repeating-linear-gradient(135deg,#E3EAF1 0 12px,#EDF2F7 12px 24px)" }}
                >
                  <span className="absolute left-3.5 top-3 font-mono text-[11px] text-muted">video: {t.name}</span>
                  <span className="flex size-[60px] items-center justify-center rounded-full bg-blue">
                    <span className="ml-[5px] size-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
                  </span>
                  <span className="absolute bottom-3 right-3.5 rounded bg-navy px-2 py-1 text-xs font-bold text-white">{t.dur}</span>
                </div>
                <blockquote className="m-0 text-[17px] font-semibold leading-normal">„{t.quote}“</blockquote>
                <div className="text-[15px] text-muted">
                  <strong className="text-navy">{t.name}</strong> · {t.role}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 FAQ */}
      <Faqs01
        faqs={lokfuehrerFaq.map((f) => ({ q: f.question, a: f.answer }))}
        defaultValue="item-0"
        className="border-t border-line"
      />
      <JsonLd data={faqJsonLd(lokfuehrerFaq)} />

      {/* 08 Final CTA */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src={asset("/assets/hero-zug.png")} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-7 px-[clamp(20px,3vw,40px)] py-[clamp(96px,12vw,170px)] text-center">
          <h2 data-reveal="" className="m-0 text-balance text-[clamp(42px,6vw,84px)] font-extrabold leading-[.98] tracking-[-.03em]">
            Dein Platz im Führerstand wartet.
          </h2>
          <Link data-reveal="" href="/kontakt#lokfuehrer" className="btn btn-primary px-[34px] py-5 text-[19px]">
            Jetzt Lokführer werden →
          </Link>
        </div>
      </section>
    </main>
  );
}
