import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { Journey } from "@/components/home/Journey";
import { fundingSteps, partnerNames, reasons, seminarTeasers, trainingFacts, trainings } from "@/content/home";
import { funders } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "So geht Eisenbahn – Ausbildung & Weiterbildung im Bahnbereich | Gelsenkirchen" },
  description:
    "Gleiswechsel in deine Zukunft: Ausbildung zum Lokführer, Weiterbildungen, Simulator-Training und LZB/ETCS-Seminare in Gelsenkirchen. Förderung möglich.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "So geht Eisenbahn",
    title: "So geht Eisenbahn – Gleiswechsel in deine Zukunft",
    description: "Praxisnahe Ausbildung, persönliche Betreuung und starke Partner in der Eisenbahnbranche.",
    images: [{ url: "/assets/hero-zug.png", width: 1672, height: 941, alt: "Zug von So geht Eisenbahn am Bahnsteig" }],
  },
};

/** Kleines Signal-Symbol (zwei Lichter) für die USP-Karten */
function SignalIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[3px] rounded-md bg-navy p-[5px]">
      <span className="size-2 rounded-full bg-blue-hover" />
      <span className="size-2 rounded-full bg-navy-500" />
    </span>
  );
}

const num = (i: number) => `0${i + 1}`;

export default function HomePage() {
  return (
    <main id="inhalt">
      <HomeHero />
      <Journey />

      {/* 03 Warum SGE */}
      <section className="section-y">
        <div className="container-page">
          <div data-reveal="" className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 max-w-[720px]">Warum So geht Eisenbahn?</h2>
            <p className="m-0 max-w-[440px] text-lg leading-relaxed text-muted">
              Kleine Gruppen, echte Praktiker als Dozenten und ein Team, das dich bis zum ersten Arbeitstag begleitet.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {reasons.map((r, i) => (
              <div key={r.title} data-reveal="" data-reveal-delay={i * 80}>
                <article className="card-lift flex h-full flex-col gap-[18px] rounded-card border border-line bg-white px-7 py-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] font-medium text-blue">{num(i)}</span>
                    <SignalIcon />
                  </div>
                  <h3 className="m-0 text-[28px] font-extrabold tracking-[-.02em]">{r.title}</h3>
                  <p className="m-0 text-[17px] leading-relaxed text-muted">{r.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Ausbildung */}
      <section className="pb-[clamp(80px,10vw,140px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
          <div data-reveal="" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/assets/naechster-halt.png"
              alt="Zug am Gleis 1 mit Anzeigetafel: Nächster Halt – Deine Ausbildung"
              fill
              sizes="(min-width: 1040px) 640px, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col gap-6">
            <span data-reveal="" className="kicker">
              Ausbildung
            </span>
            <h2 data-reveal="" className="h2">
              Deine Karriere beginnt hier.
            </h2>
            <h3 data-reveal="" className="m-0 text-[clamp(22px,2vw,28px)] font-bold text-blue">
              Triebfahrzeugführer (m/w/d)
            </h3>
            <dl data-reveal="" className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 rounded-card bg-navy px-6 py-2 text-white">
              {trainingFacts.map((f, i) => (
                <div
                  key={f.term}
                  className={`flex items-baseline justify-between gap-3 py-4 ${i < trainingFacts.length - 2 ? "border-b border-dashed border-white/15" : ""}`}
                >
                  <dt className="font-mono text-xs tracking-[.14em] text-blue-light">{f.term}</dt>
                  <dd className={`m-0 text-[17px] font-bold ${f.highlight ? "text-blue-light" : ""}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <Link data-reveal="" href="/ausbildungen" className="btn btn-primary self-start px-[26px] py-[17px] text-[17px]">
              Ausbildung ansehen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 05 Förderung */}
      <section className="section-y border-y border-line bg-white">
        <div className="container-page flex flex-col gap-14">
          <div data-reveal="" className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 max-w-[760px]">Deine Ausbildung kann gefördert werden.</h2>
            <Link href="/kontakt" className="link-underline">
              Fördermöglichkeiten entdecken →
            </Link>
          </div>
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-y-10 p-0">
            {fundingSteps.map((s, i) => {
              const last = i === fundingSteps.length - 1;
              return (
                <li key={s.title} data-reveal="" data-reveal-delay={i * 120} className={`flex flex-col gap-3.5 ${last ? "" : "pr-5"}`}>
                  <div className="flex items-center">
                    <span
                      className={`size-5 shrink-0 rounded-full ${
                        last ? "bg-blue-hover shadow-[0_0_0_6px_#E3EEF8,0_0_18px_#1689E8]" : "bg-blue shadow-[0_0_0_6px_#E3EEF8]"
                      }`}
                    />
                    {!last && <span className="h-[3px] flex-1 bg-blue" />}
                  </div>
                  <span className="font-mono text-xs text-blue">{s.label}</span>
                  <span className="text-2xl font-extrabold">{s.title}</span>
                  <span className="text-base leading-[1.55] text-muted">{s.text}</span>
                </li>
              );
            })}
          </ol>
          <div data-reveal="" className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1.5 text-[15px] font-semibold text-muted">Mögliche Kostenträger:</span>
            {funders.map((f) => (
              <span key={f} className="rounded-full border border-line bg-bg px-4 py-2.5 text-[15px] font-semibold">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Weiterbildung */}
      <section className="section-y">
        <div className="container-page">
          <div data-reveal="" className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3.5">
              <span className="kicker">Weiterbildung</span>
              <h2 className="h2">Bleib auf Kurs.</h2>
            </div>
            <Link href="/weiterbildungen" className="btn bg-navy px-[22px] py-[15px] text-base text-white hover:bg-blue hover:text-white">
              Alle Weiterbildungen →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {trainings.map((t, i) => (
              <div key={t.title} data-reveal="" data-reveal-delay={i * 80}>
                <Link
                  href={t.href}
                  className="card-lift flex h-full flex-col overflow-hidden rounded-card border border-line bg-white text-navy no-underline hover:text-navy"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={t.img} alt={t.alt} fill sizes="(min-width: 1360px) 320px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <span className="font-mono text-xs text-blue">{num(i)}</span>
                    <h3 className="m-0 text-2xl font-extrabold tracking-[-.01em]">{t.title}</h3>
                    <p className="m-0 flex-1 text-base leading-[1.55] text-muted">{t.text}</p>
                    <span className="text-[15px] font-bold text-blue">Mehr erfahren →</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Seminare */}
      <section className="pb-[clamp(80px,10vw,140px)]">
        <div className="container-page flex flex-col gap-10">
          <h2 data-reveal="" className="h2">
            Wissen für die nächste Strecke.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-4">
            {seminarTeasers.map((s, i) => (
              <div key={s.name} data-reveal="" data-reveal-delay={i * 100}>
                <Link href={s.href} className="group relative flex min-h-[460px] overflow-hidden rounded-2xl text-white no-underline hover:text-white">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1000px) 640px, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: s.position }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(0deg, rgba(7,28,53,.95) 0%, rgba(7,28,53,.35) 55%, rgba(7,28,53,.1) 100%)" }}
                  />
                  <div className="relative mt-auto flex flex-col gap-2.5 p-9">
                    <span className="self-start rounded bg-blue px-2.5 py-1.5 font-mono text-xs tracking-[.14em]">SEMINAR</span>
                    <span className="text-[clamp(56px,6vw,88px)] font-extrabold leading-[.9] tracking-[-.03em]">{s.name}</span>
                    <span className="text-[19px] text-on-navy">{s.text}</span>
                    <span className="mt-2 font-bold">Seminar ansehen →</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Partner */}
      <section className="overflow-hidden border-t border-line bg-white py-[clamp(72px,8vw,112px)]">
        <div data-reveal="" className="container-page mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">Gemeinsam auf Erfolgskurs.</h2>
          <Link href="/kooperationspartner" className="link-underline">
            Unsere Partner →
          </Link>
        </div>
        <div className="marquee-mask relative">
          <ul aria-label="Kooperationspartner" className="m-0 flex w-max animate-marquee list-none gap-4 p-0 hover:[animation-play-state:paused]">
            {[...partnerNames, ...partnerNames].map((p, i) => (
              <li
                key={i}
                aria-hidden={i >= partnerNames.length || undefined}
                className="flex h-24 w-[220px] shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-[22px] font-extrabold tracking-[-.01em] text-navy-500"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 Final CTA */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src="/assets/zug-bahnsteig.png" alt="" fill sizes="100vw" className="object-cover opacity-35" />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(7,28,53,.55) 0%, rgba(7,28,53,.95) 70%)" }} />
        <div className="relative mx-auto flex max-w-[1000px] flex-col items-center gap-7 px-[clamp(20px,3vw,40px)] py-[clamp(100px,12vw,180px)] text-center">
          <span data-reveal="" className="font-mono text-[13px] tracking-[.16em] text-blue-light">
            LETZTER AUFRUF · GLEIS 1
          </span>
          <h2 data-reveal="" className="m-0 text-[clamp(44px,6vw,88px)] font-extrabold leading-[.98] tracking-[-.03em]">
            Bereit für deinen Gleiswechsel?
          </h2>
          <p data-reveal="" className="m-0 text-xl text-on-navy">
            Deine Zukunft auf der Schiene beginnt hier.
          </p>
          <Link data-reveal="" href="/lokfuehrer-werden" className="btn btn-primary px-[34px] py-5 text-[19px]">
            Jetzt Lokführer werden <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
