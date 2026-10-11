import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ausbildungVorteile, nachschulungInfos, tfInhalte, tfVoraussetzungen, wegSteps } from "@/content/ausbildung";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Ausbildungen – Triebfahrzeugführer & Nachschulung Anlage 6/7",
  description:
    "Ausbildung zum Triebfahrzeugführer (m/w/d) in ca. 12 Monaten und Nachschulung nach Anlage 6/7 TfV in Gelsenkirchen. Förderung per Bildungsgutschein möglich.",
  alternates: { canonical: "/ausbildungen" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/ausbildungen",
    siteName: "So geht Eisenbahn",
    title: "Ausbildungen | So geht Eisenbahn",
    description: "Nächster Halt: Deine Ausbildung. Triebfahrzeugführer und Nachschulung Anlage 6/7.",
    images: [{ url: "/assets/naechster-halt.png", width: 1672, height: 941, alt: "Zug am Gleis 1 unter der Anzeigetafel „Nächster Halt: Deine Ausbildung“" }],
  },
};

const num = (i: number) => String(i + 1).padStart(2, "0");
const h2 = "m-0 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]";
const sectionY = "py-[clamp(72px,9vw,120px)]";
const badge = "self-start rounded bg-blue px-3 py-[7px] text-sm font-extrabold text-white";

export default function AusbildungenPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-navy pb-[clamp(72px,9vw,128px)] pt-[calc(116px+clamp(72px,9vw,140px))] text-white">
        <Image
          src={asset("/assets/naechster-halt.png")}
          alt="Zug am Gleis 1 unter einer Anzeigetafel mit der Aufschrift Nächster Halt: Deine Ausbildung"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[center_40%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(7,28,53,.95) 0%, rgba(7,28,53,.75) 45%, rgba(7,28,53,.15) 80%)" }}
        />
        <div className="container-page relative flex flex-col gap-6">
          <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
            <Link href="/" className="text-blue-light no-underline hover:text-blue-light">
              START
            </Link>{" "}
            / AUSBILDUNGEN
          </nav>
          <h1 className="m-0 max-w-[820px] text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">
            <span className="mb-2.5 block text-[.5em] tracking-[-.01em] text-blue-light">Nächster Halt:</span>
            Deine Ausbildung.
          </h1>
          <p className="m-0 max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-on-navy">
            Anerkannte Ausbildung nach §14 TfV – praxisnah, persönlich betreut und mit starken Partnern für deinen Einstieg.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#triebfahrzeugfuehrer" className="btn btn-primary px-[26px] py-[17px] text-[17px]">
              Triebfahrzeugführer
            </a>
            <a href="#nachschulung" className="btn btn-ghost-dark px-[26px] py-[17px] text-[17px]">
              Nachschulung Anlage 6/7
            </a>
          </div>
        </div>
      </section>

      {/* 02 Vorteile */}
      <section className={sectionY}>
        <div className="container-page">
          <h2 data-reveal="" className={`${h2} mb-12`}>
            Darum mit uns auf die Schiene.
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4 p-0">
            {ausbildungVorteile.map((v, i) => (
              <li
                key={v.title}
                data-reveal=""
                data-reveal-delay={i ? i * 60 : undefined}
                className="flex flex-col gap-3 rounded-card border border-line bg-white px-6 py-7"
              >
                <span className="font-mono text-xs text-blue">{num(i)}</span>
                <span className="text-[21px] font-extrabold">{v.title}</span>
                <span className="text-base leading-[1.55] text-muted">{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Triebfahrzeugführer */}
      <section id="triebfahrzeugfuehrer" className={`${sectionY} border-y border-line bg-white`}>
        <div className="container-page flex flex-col gap-14">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
            <div className="flex flex-col gap-5">
              <span data-reveal="" className={badge}>
                Programm 01
              </span>
              <h2 data-reveal="" className={h2}>
                Triebfahrzeugführer (m/w/d)
              </h2>
              <p data-reveal="" className="m-0 text-lg leading-[1.65] text-muted">
                In ca. 12 Monaten qualifizierst du dich zum eigenständigen Führen von Lok- und Triebfahrzeugen. Rund 6 Monate Theorie
                bei uns in Gelsenkirchen, danach rund 6 Monate wohnortnahe Praxis – abgeschlossen mit der Prüfung nach §15 TfV.
              </p>
              <ul data-reveal="" className="m-0 flex list-none flex-col gap-2.5 p-0 text-[17px]">
                {tfInhalte.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="font-extrabold text-blue">
                      →
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="" className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={asset("/assets/zug-kurve.png")}
                alt="Zug fährt durch eine Kurve im Abendlicht"
                fill
                sizes="(min-width: 1040px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 data-reveal="" className="m-0 text-[clamp(24px,2.4vw,32px)] font-extrabold">
              Voraussetzungen
            </h3>
            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-px overflow-hidden rounded-card border border-line bg-line">
              {tfVoraussetzungen.map((v) => (
                <div key={v.term} data-reveal="" className="flex flex-col gap-2 bg-bg px-6 py-[26px]">
                  <dt className="font-mono text-xs tracking-[.14em] text-blue">{v.term}</dt>
                  <dd className="m-0 text-lg font-bold">{v.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 04 Dein Weg */}
      <section className={`${sectionY} bg-navy text-white`}>
        <div className="container-page flex flex-col gap-14">
          <h2 data-reveal="" className={h2}>
            Dein Weg zum Lokführer
          </h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-0 gap-y-8 p-0">
            {wegSteps.map((s, i) => {
              const last = i === wegSteps.length - 1;
              return (
                <li
                  key={s.title}
                  data-reveal=""
                  data-reveal-delay={i * 80}
                  className={`flex flex-col gap-3.5 ${last ? "" : "pr-4"}`}
                >
                  <div className="flex items-center">
                    <span
                      className={`size-[18px] shrink-0 rounded-full ${last ? "bg-white shadow-[0_0_16px_#1689E8]" : "bg-blue-hover"}`}
                    />
                    {!last && <span className="h-0.5 flex-1 bg-blue-light/40" />}
                  </div>
                  <span className="font-mono text-xs text-blue-light">STEP {num(i)}</span>
                  <span className="text-[22px] font-extrabold">{s.title}</span>
                  <span className="text-[15px] leading-[1.55] text-on-navy-2">{s.text}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 05 Nachschulung */}
      <section id="nachschulung" className={sectionY}>
        <div className="container-page flex flex-col gap-10">
          <div className="flex max-w-[820px] flex-col gap-5">
            <span data-reveal="" className={badge}>
              Programm 02
            </span>
            <h2 data-reveal="" className={h2}>
              Nachschulung Anlage 6/7
            </h2>
            <p data-reveal="" className="m-0 text-lg leading-[1.65] text-muted">
              Du hast deine Ausbildung bereits absolviert, dir fehlen aber Inhalte nach Anlage 6 oder 7 TfV? Wir schließen die Lücke
              kompakt und gezielt – für die vollständige Anerkennung deines Triebfahrzeugführerscheins.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {nachschulungInfos.map((n) => (
              <div key={n.label} data-reveal="" className="flex flex-col gap-2.5 rounded-card border border-line bg-white p-7">
                <span className="font-mono text-xs tracking-[.14em] text-blue">{n.label}</span>
                <p className="m-0 text-[17px] leading-[1.6]">{n.text}</p>
              </div>
            ))}
            <div data-reveal="" className="flex flex-col justify-between gap-5 rounded-card bg-navy p-7 text-white">
              <span className="text-[22px] font-extrabold leading-[1.25]">Unsicher, welche Module dir fehlen?</span>
              <Link href="/kontakt" className="btn btn-primary self-start px-5 py-3.5">
                Unterlagen prüfen lassen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 06 CTA */}
      <section className="px-[clamp(20px,3vw,40px)] pb-[clamp(72px,9vw,120px)]">
        <div
          data-reveal=""
          className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-8 rounded-[20px] bg-blue p-[clamp(40px,6vw,80px)] text-white"
        >
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">
              Welche Ausbildung passt zu dir?
            </h2>
            <p className="m-0 text-lg text-blue-tint">Wir beraten dich kostenlos und unverbindlich.</p>
          </div>
          <Link href="/kontakt" className="btn bg-white px-[30px] py-[19px] text-lg font-extrabold text-navy hover:bg-navy hover:text-white">
            Jetzt beraten lassen →
          </Link>
        </div>
      </section>
    </main>
  );
}
