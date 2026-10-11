import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { nextCourseStart, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { ThankYouHeadline } from "./ThankYouHeadline";

// Die Danke-Seite (Lead-Strecke) nutzt laut Design eine eigene Optik: Montserrat + Petrol/Amber, ohne Site-Header/-Footer
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  title: "Danke für deine Bewerbung",
  description: "Vielen Dank für deine Bewerbung zur Ausbildung als Lokführer (m/w/d). Wir melden uns in Kürze telefonisch bei dir.",
  alternates: { canonical: "/danke" },
  robots: { index: false, follow: true },
};

const steps = [
  { title: "Kennenlerngespräch:", text: "Wir rufen dich an und klären deine Fragen und Voraussetzungen." },
  { title: "Bildungsgutschein:", text: "Wir unterstützen dich beim Antrag bei der Agentur für Arbeit oder dem Jobcenter." },
  { title: "Eignungsuntersuchung:", text: "Medizinischer und psychologischer Check – wir sagen dir genau, wie es abläuft." },
  { title: "Ausbildungsstart:", text: `Am ${nextCourseStart} oder später geht's für dich in Gelsenkirchen los!` },
];

export default function DankePage() {
  return (
    <div className={`${montserrat.className} flex min-h-screen flex-col bg-[#F3F7F8] text-[#1E3A41]`}>
      <header className="bg-[#3E6B75]">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center px-5">
          <Link
            href="/"
            aria-label="So geht Eisenbahn – Startseite"
            className="flex items-center gap-2.5 text-white no-underline hover:text-white"
          >
            <Image src={asset("/assets/logo-sge-weiss.png")} alt="" width={73} height={31} unoptimized className="h-7 w-auto" />
            <span className="text-xs font-bold leading-[1.1] tracking-[.14em]">
              SO GEHT
              <br />
              EISENBAHN
            </span>
          </Link>
        </div>
      </header>

      <main id="inhalt" className="flex-1 px-5 py-[clamp(48px,8vw,96px)]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-7">
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-[clamp(28px,5vw,52px)] text-center shadow-[0_24px_48px_-28px_rgba(30,58,65,.45)]">
            <span
              aria-hidden="true"
              className="flex size-[72px] items-center justify-center rounded-full bg-[#F2A93B] text-4xl font-extrabold text-[#1E3A41]"
            >
              ✓
            </span>
            <ThankYouHeadline className="m-0 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.2]" />
            <p className="m-0 max-w-[540px] text-[17px] leading-[1.65] text-[#4F6B72]">
              Deine Bewerbung ist bei uns angekommen. Wir melden uns <strong className="text-[#1E3A41]">in Kürze telefonisch</strong> bei dir für
              ein kurzes Kennenlerngespräch. 📞
            </p>
          </div>

          <section aria-label="Nächste Schritte" className="flex flex-col gap-3.5">
            <h2 className="m-0 text-2xl font-extrabold">So geht&apos;s weiter 🚆</h2>
            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {steps.map((s, i) => {
                const last = i === steps.length - 1;
                return (
                  <li key={s.title} className="grid grid-cols-[40px_1fr] items-start gap-3.5 rounded-xl bg-white p-[18px]">
                    <span
                      aria-hidden="true"
                      className={`flex size-10 items-center justify-center rounded-full font-extrabold ${
                        last ? "bg-[#F2A93B] text-[#1E3A41]" : "bg-[#3E6B75] text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-base leading-[1.6]">
                      <strong>{s.title}</strong> {s.text}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#3E6B75] p-6 text-white">
            <span className="text-base leading-normal">
              Lust, uns vorher kennenzulernen? <strong>Infoveranstaltung jeden Montag um 15:30 Uhr.</strong>
            </span>
            <a
              href={site.phoneHref}
              className="flex min-h-12 items-center rounded-[10px] bg-[#F2A93B] px-5 py-3.5 font-extrabold text-[#1E3A41] no-underline hover:bg-[#F6BC5F] hover:text-[#1E3A41]"
            >
              📞 Direkt anrufen
            </a>
          </div>

          <Link href="/" className="self-center font-bold text-[#3E6B75] hover:text-[#2C4F57]">
            Zur Startseite
          </Link>
        </div>
      </main>

      <footer className="flex flex-wrap justify-center gap-5 bg-[#2C4F57] px-5 py-6 text-center text-sm text-[#DCE7E9]">
        <span>© 2026 So geht Eisenbahn GmbH</span>
        <Link href="/impressum" className="text-[#DCE7E9] hover:text-[#DCE7E9]">
          Impressum
        </Link>
        <Link href="/datenschutz" className="text-[#DCE7E9] hover:text-[#DCE7E9]">
          Datenschutz
        </Link>
      </footer>
    </div>
  );
}
