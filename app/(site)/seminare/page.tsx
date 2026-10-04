import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Euro } from "lucide-react";
import { CertBar } from "@/components/sections/CertBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSeminar } from "@/content/seminars";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Seminare für Triebfahrzeugführer: LZB & ETCS",
  description: "5-tägige Seminare für Triebfahrzeugführer: Linienförmige Zugbeeinflussung (LZB) inkl. CIR-ELKE und ETCS Level 2 – mit Simulatortraining in Gelsenkirchen.",
  path: "/seminare",
});

export default function SeminarePage() {
  // Reihenfolge wie im Original: LZB zuerst
  const list = (["lzb", "etcs"] as const).map(getSeminar);
  return (
    <>
      <section className="section bg-surface pb-10 md:pb-12">
        <div className="container-page">
          <SectionHeading as="h1" align="center" eyebrow="Seminare" title="Seminare für Triebfahrzeugführer" text="Kompakte Weiterbildungen zu Zugbeeinflussungssystemen – Theorie online oder in Präsenz, Praxis an unserem Simulator in Gelsenkirchen." />
        </div>
      </section>
      <section className="pb-16 md:pb-24 bg-surface">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {list.map((s, i) => (
            <Link key={s.slug} href={`/seminare/${s.slug}`} className="reveal group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-lift">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={s.cardImage} alt={s.heroAlt} fill loading="eager" fetchPriority={i === 0 ? "high" : "auto"} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                <h2 className="text-2xl font-bold">{s.title}</h2>
                <p className="flex-1 text-ink/80">{s.teaser}</p>
                <ul className="flex flex-wrap gap-2 text-sm">
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-petrol-50 px-3 py-1 font-semibold text-petrol">
                    <Clock className="size-4" aria-hidden="true" /> {s.durationDays} Tage inkl. Prüfung
                  </li>
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-petrol-50 px-3 py-1 font-semibold text-petrol">
                    <Euro className="size-4" aria-hidden="true" /> {s.priceEur.toLocaleString("de-DE")} €
                  </li>
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 font-semibold text-ink">
                    <CalendarDays className="size-4" aria-hidden="true" /> {s.dates[0]?.label}
                  </li>
                </ul>
                <span className="inline-flex items-center gap-1.5 font-bold text-petrol">
                  Mehr erfahren <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CertBar />
    </>
  );
}
