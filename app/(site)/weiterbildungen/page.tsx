import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serviceJumpLinks, services } from "@/content/weiterbildung";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Weiterbildungen – Simulator, RFU, Disposition & Grundlagen",
  description:
    "Weiterbildungen für Eisenbahner: Simulator-Training (Zusi, PZB, LZB, ETCS Level 2), Fortbildungsunterricht, Disposition und Eisenbahngrundlagen in Gelsenkirchen.",
  alternates: { canonical: "/weiterbildungen" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/weiterbildungen",
    siteName: "So geht Eisenbahn",
    title: "Weiterbildungen | So geht Eisenbahn",
    description: "Wissen, das dich weiterbringt.",
    images: [{ url: "/assets/zug-fahrt.png" }],
  },
};

const num = (i: number) => `0${i + 1}`;

export default function WeiterbildungenPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-navy pb-[clamp(72px,9vw,128px)] pt-[calc(116px+clamp(72px,9vw,140px))] text-white">
        <Image
          src={asset("/assets/zug-fahrt.png")}
          alt="Moderner Triebzug in voller Fahrt"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[40%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(7,28,53,.95) 0%, rgba(7,28,53,.72) 50%, rgba(7,28,53,.25) 100%)" }}
        />
        <div className="container-page relative flex flex-col gap-6">
          <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
            <Link href="/" className="text-blue-light no-underline hover:text-blue-light">
              START
            </Link>{" "}
            / WEITERBILDUNGEN
          </nav>
          <h1 className="m-0 max-w-[900px] text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">
            Wissen, das dich weiterbringt.
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {serviceJumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/30 px-4 py-[11px] text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:border-blue hover:bg-blue hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02–05 Weiterbildungen */}
      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`border-b border-line py-[clamp(72px,9vw,120px)] ${i % 2 ? "bg-white" : "bg-bg"}`}>
          <div className={`container-page flex flex-wrap items-center gap-[clamp(32px,5vw,72px)] ${i % 2 ? "flex-row-reverse" : "flex-row"}`}>
            <div data-reveal="" className="relative aspect-[4/3] min-w-0 flex-[1_1_440px] overflow-hidden rounded-2xl">
              <Image src={s.img} alt={s.alt} fill sizes="(min-width: 1000px) 640px, 100vw" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
              <span data-reveal="" className="font-mono text-[13px] tracking-[.16em] text-blue">
                {num(i)}
              </span>
              <h2 data-reveal="" className="m-0 text-[clamp(32px,3.6vw,48px)] font-extrabold leading-[1.04] tracking-[-.03em]">
                {s.title}
              </h2>
              <p data-reveal="" className="m-0 text-lg leading-[1.65] text-muted">
                {s.text}
              </p>
              {s.tags && (
                <div data-reveal="" className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-md bg-navy px-3 py-2 font-mono text-[13px] text-white">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div data-reveal="" className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[.14em] text-blue">DEINE VORTEILE</span>
                  <ul className="m-0 flex list-disc flex-col gap-1.5 pl-[18px] text-base leading-[1.5]">
                    {s.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs tracking-[.14em] text-blue">ZIELGRUPPE</span>
                  <p className="m-0 text-base leading-[1.55]">{s.target}</p>
                </div>
              </div>
              <Link
                data-reveal=""
                href="/kontakt"
                className="self-start rounded-btn bg-blue px-[22px] py-[15px] text-base font-bold text-white no-underline transition-colors duration-200 hover:bg-blue-hover hover:text-white"
              >
                {s.cta} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* 06 CTA */}
      <section className="px-[clamp(20px,3vw,40px)] py-[clamp(72px,9vw,120px)]">
        <div
          data-reveal=""
          className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-8 rounded-[20px] bg-navy p-[clamp(40px,6vw,80px)] text-white"
        >
          <div className="flex flex-col gap-3">
            <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">Training für dein Team?</h2>
            <p className="m-0 text-lg text-on-navy-2">Wir stellen Inhalte und Termine individuell für dein EVU zusammen.</p>
          </div>
          <Link
            href="/kontakt"
            className="rounded-btn bg-blue px-[30px] py-[19px] text-lg font-extrabold text-white no-underline transition-colors duration-200 hover:bg-blue-hover hover:text-white"
          >
            Weiterbildung anfragen →
          </Link>
        </div>
      </section>
    </main>
  );
}
