import Image from "next/image";
import Link from "next/link";
import type { SeminarDetail as SeminarDetailData } from "@/content/weiterbildung";

const num = (i: number) => `0${i + 1}`;

/** Vollständige Klassennamen, damit Tailwind sie findet */
const moduleGrid: Record<number, string> = {
  280: "grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]",
  300: "grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]",
};

/** Seminar-Detailseite (LZB, ETCS) – Aufbau aus Seminar-LZB.dc.html / Seminar-ETCS.dc.html */
export function SeminarDetail({ data }: { data: SeminarDetailData }) {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <section className="relative overflow-hidden bg-navy pb-[clamp(72px,9vw,128px)] pt-[calc(116px+clamp(72px,9vw,140px))] text-white">
        <Image
          src={data.heroImg}
          alt={data.heroAlt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
          style={{ objectPosition: data.heroPosition }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(7,28,53,.96) 0%, rgba(7,28,53,.75) 50%, rgba(7,28,53,.3) 100%)" }}
        />
        <div className="container-page relative flex flex-col gap-6">
          <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
            <Link href="/" className="text-blue-light no-underline hover:text-blue-light">
              START
            </Link>{" "}
            /{" "}
            <Link href="/seminare" className="text-blue-light no-underline hover:text-blue-light">
              SEMINARE
            </Link>{" "}
            / {data.crumb}
          </nav>
          <h1 className="m-0 text-[clamp(52px,7.4vw,108px)] font-extrabold leading-[.92] tracking-[-.03em]">{data.title}</h1>
          <p className="m-0 max-w-[600px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-on-navy">{data.lead}</p>
          <Link
            href="/kontakt"
            className="self-start rounded-btn bg-blue px-[26px] py-[17px] text-[17px] font-bold text-white no-underline transition-colors duration-200 hover:bg-blue-hover hover:text-white"
          >
            {data.cta} →
          </Link>
        </div>
      </section>

      {/* 02 Was ist … */}
      <section className="py-[clamp(72px,9vw,120px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(32px,5vw,72px)]">
          <h2 data-reveal="" className="m-0 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">
            {data.whatTitle}
          </h2>
          <p data-reveal="" className="m-0 text-[19px] leading-[1.7] text-muted">
            {data.whatText}
          </p>
        </div>
      </section>

      {/* 03 Inhalte */}
      <section className="border-y border-line bg-white py-[clamp(72px,9vw,120px)]">
        <div className="container-page">
          <h2 data-reveal="" className="m-0 mb-10 text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">
            Seminarinhalte
          </h2>
          <ol className={`m-0 grid list-none gap-4 p-0 ${moduleGrid[data.moduleMin] ?? moduleGrid[300]}`}>
            {data.modules.map((m, i) => (
              <li key={m.title} data-reveal="" className="flex flex-col gap-3 rounded-card border border-line bg-bg p-7">
                <span className="font-mono text-xs tracking-[.14em] text-blue">MODUL {num(i)}</span>
                <h3 className="m-0 text-[22px] font-extrabold">{m.title}</h3>
                <p className="m-0 text-base leading-[1.6] text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 Kursinfos */}
      <section className="py-[clamp(72px,9vw,120px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-7">
            <div data-reveal="" className="flex flex-col gap-2.5">
              <h2 className="m-0 text-[clamp(28px,3vw,38px)] font-extrabold tracking-[-.02em]">Voraussetzungen</h2>
              <p className="m-0 text-[17px] leading-[1.65] text-muted">{data.requirements}</p>
            </div>
            <div data-reveal="" className="flex flex-col gap-2.5">
              <h2 className="m-0 text-[clamp(28px,3vw,38px)] font-extrabold tracking-[-.02em]">Zielgruppe</h2>
              <p className="m-0 text-[17px] leading-[1.65] text-muted">{data.audience}</p>
            </div>
          </div>
          <dl data-reveal="" aria-label="Kursinformationen" className="m-0 rounded-2xl bg-navy px-7 py-3 text-white">
            {data.facts.map((f, i) => (
              <div
                key={f.term}
                className={`flex justify-between gap-4 py-[18px] ${i < data.facts.length - 1 ? "border-b border-dashed border-white/15" : ""}`}
              >
                <dt className="font-mono text-xs tracking-[.14em] text-blue-light">{f.term}</dt>
                <dd className="m-0 text-right font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 05 CTA */}
      <section className="px-[clamp(20px,3vw,40px)] pb-[clamp(72px,9vw,120px)]">
        <div
          data-reveal=""
          className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-8 rounded-[20px] bg-blue p-[clamp(40px,6vw,80px)] text-white"
        >
          <h2 className="m-0 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.04] tracking-[-.03em]">{data.ctaTitle}</h2>
          <Link
            href="/kontakt"
            className="rounded-btn bg-white px-[30px] py-[19px] text-lg font-extrabold text-navy no-underline transition-colors duration-200 hover:bg-navy hover:text-white"
          >
            {data.cta} →
          </Link>
        </div>
      </section>
    </main>
  );
}
