import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Euro, MapPin } from "lucide-react";
import { SeminarForm } from "@/components/forms/SeminarForm";
import { In, Screen, Words } from "@/components/stage/Screen";
import { CheckList } from "@/components/ui/CheckList";
import { JsonLd } from "@/components/ui/JsonLd";
import { Tabs } from "@/components/ui/Tabs";
import { seminars } from "@/content/seminars";
import { courseJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return seminars.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/seminare/[slug]">) {
  const { slug } = await params;
  const s = seminars.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({
    title: `Seminar ${s.shortTitle} für Triebfahrzeugführer`,
    description: `${s.teaser} 5 Tage inkl. Prüfung, ${s.priceEur.toLocaleString("de-DE")} € inkl. Prüfungsgebühr.`,
    path: `/seminare/${s.slug}`,
  });
}

/** Gemeinsames Seminar-Template (ETCS / LZB): alles auf einer Station, gegliedert in Tabs */
export default async function SeminarPage({ params }: PageProps<"/seminare/[slug]">) {
  const { slug } = await params;
  const s = seminars.find((x) => x.slug === slug);
  if (!s) notFound();

  const quick = [
    { icon: Clock, text: `${s.durationDays} Tage inkl. Prüfung` },
    { icon: Euro, text: `${s.priceEur.toLocaleString("de-DE")} € inkl. Prüfungsgebühr` },
    { icon: CalendarDays, text: s.dates.map((d) => d.label).join(", ") },
    { icon: MapPin, text: "Simulator in Gelsenkirchen" },
  ];

  return (
    <Screen
      tone="ink"
      width="wide"
      backdrop={
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image src={s.heroImage} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-petrol-deep via-petrol-deep/95 to-petrol-deep/70" />
        </div>
      }
    >
      <JsonLd data={courseJsonLd(s)} />
      <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-white/80">Seminar für Triebfahrzeugführer</p>
          </In>
          <Words text={s.title} className="title text-white" />
          <In i={2} className="hidden sm:block [@media(max-height:760px)]:!hidden">
            <p className="lead text-white/85">{s.intro[0]}</p>
          </In>
          <ul className="hidden grid-cols-2 gap-2 sm:grid">
            {quick.map((q, i) => (
              <In as="li" key={q.text} i={i + 3} className="flex items-center gap-2 rounded-[12px] bg-white/[0.07] p-2.5 text-xs text-white/90 sm:text-sm">
                <q.icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {q.text}
              </In>
            ))}
          </ul>
        </div>
        <In i={3} className="rounded-[20px] bg-white p-4 text-ink shadow-lift sm:p-6">
          <Tabs
            label={`Seminar ${s.shortTitle}`}
            items={[
              {
                id: "inhalte",
                label: "Inhalte",
                content: (
                  <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${s.contentGroups.length === 3 ? "sm:grid-cols-3" : ""}`}>
                    {s.contentGroups.map((g) => (
                      <div key={g.title}>
                        <p className="mb-2 font-heading font-bold text-petrol">{g.title}</p>
                        <CheckList items={g.items} icon="arrow" className="gap-1.5 text-xs sm:gap-2 sm:text-sm [&_li]:gap-1.5" />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                id: "wissen",
                label: "Das sollten Sie wissen",
                content: (
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {s.facts.map((f) => (
                      <div key={f.label} className="rounded-[12px] bg-surface p-3">
                        <dt className="font-heading font-bold text-petrol">{f.label}</dt>
                        <dd className="text-sm text-ink/80">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              { id: "anmeldung", label: "Anmeldung", content: <SeminarForm seminar={s} /> },
            ]}
          />
        </In>
      </div>
    </Screen>
  );
}
