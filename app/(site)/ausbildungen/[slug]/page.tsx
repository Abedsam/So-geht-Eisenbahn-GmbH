import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { CheckList } from "@/components/ui/CheckList";
import { Tabs } from "@/components/ui/Tabs";
import { courses } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/ausbildungen/[slug]">) {
  const { slug } = await params;
  const c = courses.find((x) => x.id === slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.description.join(" "), path: `/ausbildungen/${c.id}` });
}

export default async function Course({ params }: PageProps<"/ausbildungen/[slug]">) {
  const { slug } = await params;
  const c = courses.find((x) => x.id === slug);
  if (!c) notFound();
  const tf = c.id === "triebfahrzeugfuehrer";

  return (
    <Screen tone="light" width="wide">
      <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">{c.subtitle}</p>
          </In>
          <Words text={c.title} className="title-xl text-petrol" />
          {c.description.map((d, i) => (
            <In key={d.slice(0, 20)} i={i + 2}>
              <p className="lead text-ink/80">{d}</p>
            </In>
          ))}
          <div className="clip-in relative hidden aspect-[16/9] overflow-hidden rounded-[18px] lg:block [@media(max-height:980px)]:!hidden" style={{ ["--i" as string]: 3 }}>
            <Image src={c.image} alt={c.imageAlt} fill sizes="40vw" className="object-cover" />
          </div>
          <In i={4} className="flex flex-wrap gap-2">
            <TLink href={tf ? "/lokfuehrer-werden" : "/kontakt"} className="btn btn-accent">
              {tf ? "In 2 Minuten bewerben" : "Beratung anfragen"} <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
            <TLink href="/infoveranstaltung" className="btn btn-ghost-dark">
              Infoveranstaltung
            </TLink>
          </In>
        </div>
        <In i={3} className="rounded-[20px] bg-white p-4 shadow-card sm:p-6">
          <Tabs
            label={`Details zu ${c.title}`}
            items={c.tabs.map((t) => ({
              id: t.id,
              label: t.label,
              content: (
                <div className="flex flex-col gap-4">
                  {t.todo && (
                    <p className="inline-flex items-center gap-2 self-start rounded-btn bg-accent-soft px-3 py-1.5 text-sm font-semibold text-ink">
                      <TriangleAlert className="size-4" aria-hidden="true" /> Entwurf – vom Kunden zu bestätigen
                    </p>
                  )}
                  {t.intro && <p className="text-ink/80">{t.intro}</p>}
                  <CheckList items={t.items} />
                </div>
              ),
            }))}
          />
        </In>
      </div>
    </Screen>
  );
}
