import Image from "next/image";
import { ArrowRight, ArrowUpRight, GraduationCap, MonitorPlay, TrainFront } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "So geht Eisenbahn – Eisenbahnakademie in Gelsenkirchen",
  description:
    "Aus- und Weiterbildungen im Eisenbahnsektor: Triebfahrzeugführer, Nachschulung Anlage 6/7, ETCS- und LZB-Seminare, Simulatortraining. Gefördert mit Bildungsgutschein.",
  path: "/",
});

const doors = [
  { href: "/ausbildungen", code: "A", color: "#7FC8BE", title: "Ausbildungen", text: "Triebfahrzeugführer und Nachschulung Anlage 6/7 inkl. Prüfung", icon: TrainFront },
  { href: "/weiterbildungen", code: "W", color: "#8DB8D8", title: "Weiterbildungen", text: "Simulator, RFU, Disposition und Eisenbahngrundlagen", icon: MonitorPlay },
  { href: "/seminare", code: "SE", color: "#E8896A", title: "Seminare", text: "LZB inkl. CIR-ELKE und ETCS Level 2 – je 5 Tage", icon: GraduationCap },
];

export default function Home() {
  return (
    <Screen
      tone="ink"
      width="wide"
      backdrop={
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {/* Bild: Teilnehmer im Führerstand-Simulator (Platzhalter) */}
          <Image src="/images/placeholder-hero-simulator.jpg" alt="" fill preload sizes="100vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-petrol-deep via-petrol-deep/85 to-petrol-deep/30" />
        </div>
      }
    >
      <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="flex flex-col gap-[clamp(0.75rem,2.4vh,1.5rem)]">
          <In i={0}>
            <p className="kicker text-white/85">Eisenbahnakademie · Gelsenkirchen</p>
          </In>
          <Words text="Gleiswechsel in Ihre Zukunft." className="text-[clamp(2.2rem,min(8vh,8vw),5.4rem)] font-bold leading-[0.98] text-white" />
          <In i={3} className="hidden sm:block">
            <p className="lead max-w-xl text-white/85">
              Wir sind eine erfahrene und moderne Eisenbahnakademie, die gemeinsam mit ausgewählten Kooperationspartnern Aus- und Weiterbildungen im Eisenbahnsektor für Unternehmen und Privatteilnehmer organisiert.
            </p>
          </In>
          <In i={4} className="flex flex-wrap gap-3">
            <TLink href="/vorteile" className="btn btn-accent">
              Mit uns durchstarten <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
            <TLink href="/ueber-uns" className="btn btn-ghost-light hidden sm:inline-flex">
              Willkommen an Bord
            </TLink>
          </In>
        </div>

        <div className="flex flex-col gap-3">
          {doors.map((d, i) => (
            <In key={d.href} i={i + 3} x>
              <TLink
                href={d.href}
                className="group flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-md sm:gap-4 transition-colors hover:border-white/40 hover:bg-white/[0.12] sm:p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[12px] text-ink sm:size-12" style={{ background: d.color }} aria-hidden="true">
                  <d.icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg font-bold text-white">{d.title}</span>
                  <span className="hidden text-sm text-white/70 sm:block">{d.text}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
              </TLink>
            </In>
          ))}
          <In i={6}>
            <TLink href="/lokfuehrer-werden" className="group flex items-center justify-between gap-3 rounded-[18px] bg-accent p-4 font-bold text-ink transition-colors hover:bg-accent-dark">
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink/85">Kursstart 02.11.26</span>
                Lokführer werden – 4.000 € netto/Monat
              </span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </TLink>
          </In>
        </div>
      </div>
    </Screen>
  );
}
