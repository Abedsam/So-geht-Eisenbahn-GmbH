import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { seminarCards } from "@/content/weiterbildung";

export const metadata: Metadata = {
  title: "Seminare – LZB & ETCS",
  description: "Seminare für Triebfahrzeugführer: LZB inkl. CIR-ELKE und ETCS Level 2 mit Simulator-Training in Gelsenkirchen.",
  alternates: { canonical: "/seminare" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/seminare",
    siteName: "So geht Eisenbahn",
    title: "Seminare | So geht Eisenbahn",
    description: "Wissen für die nächste Strecke: LZB und ETCS.",
    images: [{ url: "/assets/zug-fahrt.png" }],
  },
};

export default function SeminarePage() {
  return (
    <main id="inhalt">
      {/* 01 Hero */}
      <section className="bg-navy pb-[clamp(56px,7vw,96px)] pt-[calc(116px+clamp(64px,8vw,120px))] text-white">
        <div className="container-page flex flex-col gap-6">
          <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
            <Link href="/" className="text-blue-light no-underline hover:text-blue-light">
              START
            </Link>{" "}
            / SEMINARE
          </nav>
          <h1 className="m-0 max-w-[900px] text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">
            Wissen für die nächste Strecke.
          </h1>
          <p className="m-0 max-w-[620px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-on-navy">
            Kompakte Fachseminare zu den Zugbeeinflussungssystemen von heute und morgen – mit Theorie, Praxisfällen und Simulatorfahrten.
          </p>
        </div>
      </section>

      {/* 02 Seminare */}
      <section className="pb-[clamp(72px,9vw,120px)] pt-[clamp(48px,6vw,80px)]">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,480px),1fr))] gap-5">
          {seminarCards.map((s, i) => (
            <article
              key={s.name}
              data-reveal=""
              data-reveal-delay={i ? i * 100 : undefined}
              className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-white"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1060px) 660px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: s.position }}
                />
                <span className="absolute left-5 top-5 rounded bg-navy px-[11px] py-[7px] font-mono text-xs tracking-[.14em] text-white">
                  {s.label}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3.5 p-[clamp(28px,3vw,40px)]">
                <h2 className="m-0 text-[clamp(48px,5vw,72px)] font-extrabold leading-[.9] tracking-[-.03em]">{s.name}</h2>
                <p className="m-0 text-xl font-semibold">{s.subtitle}</p>
                <p className="m-0 flex-1 text-[17px] leading-[1.6] text-muted">{s.text}</p>
                <Link
                  href={s.href}
                  className="mt-2 self-start rounded-btn bg-blue px-[22px] py-[15px] text-base font-bold text-white no-underline transition-colors duration-200 hover:bg-blue-hover hover:text-white"
                >
                  Mehr erfahren →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
