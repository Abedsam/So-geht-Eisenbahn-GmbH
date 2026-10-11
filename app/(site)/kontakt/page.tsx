import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/kontakt/ContactForm";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata({
  title: "Kontakt – Wie können wir dir helfen?",
  description:
    "Kontakt zu So geht Eisenbahn in Gelsenkirchen: Für die Lokführer-Ausbildung anmelden, Platz für die Infoveranstaltung sichern oder allgemeine Fragen stellen.",
  path: "/kontakt",
});

export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, title: "Kontakt | So geht Eisenbahn", description: "Wie können wir dir helfen?" },
};

export default function KontaktPage() {
  return (
    <main id="inhalt">
      {/* 01 Hero – oben Platz für den fixierten Header (116 px) */}
      <section data-screen-label="01 Hero" className="bg-navy pb-[clamp(120px,12vw,180px)] pt-[calc(116px+clamp(64px,8vw,112px))] text-white">
        <div className="container-page flex flex-col gap-6">
          <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
            <Link href="/" className="text-blue-light no-underline">
              START
            </Link>{" "}
            / <span aria-current="page">KONTAKT</span>
          </nav>
          <h1 className="m-0 text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">Wie können wir dir helfen?</h1>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
