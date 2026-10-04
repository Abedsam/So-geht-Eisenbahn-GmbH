import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { In, Screen, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { trainings } from "@/content/courses";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return trainings.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/weiterbildungen/[slug]">) {
  const { slug } = await params;
  const t = trainings.find((x) => x.id === slug);
  if (!t) return {};
  return pageMetadata({ title: t.title, description: t.text, path: `/weiterbildungen/${t.id}` });
}

export default async function Training({ params }: PageProps<"/weiterbildungen/[slug]">) {
  const { slug } = await params;
  const index = trainings.findIndex((x) => x.id === slug);
  if (index === -1) notFound();
  const t = trainings[index];
  const dark = index % 2 === 0;

  return (
    <Screen tone={dark ? "ink" : "light"} width="wide">
      <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-14">
        <div className={`clip-in relative hidden aspect-[4/3] max-h-[62vh] overflow-hidden rounded-[18px] md:block ${dark ? "" : "md:order-2"}`}>
          <Image src={t.image} alt={t.imageAlt} fill sizes="45vw" className="object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">Weiterbildung {String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className={`kicker ${dark ? "text-white/80" : "text-petrol"}`}>Weiterbildung {index + 1} / {trainings.length}</p>
          </In>
          <Words text={t.title} className={`title-xl ${dark ? "text-white" : "text-petrol"}`} />
          <In i={2}>
            <p className={`lead ${dark ? "text-white/85" : "text-ink/80"}`}>{t.text}</p>
          </In>
          {t.points && (
            <div className="grid gap-3 sm:grid-cols-2">
              {t.points.map((p, i) => (
                <In key={p.title} i={i + 3} className={`rounded-[14px] p-4 ${dark ? "bg-white/[0.07]" : "bg-white shadow-card"}`}>
                  <p className={`mb-1 flex items-start gap-2 font-bold ${dark ? "text-white" : "text-petrol"}`}>
                    <Check className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
                    {p.title}
                  </p>
                  <p className={`text-sm ${dark ? "text-white/75" : "text-ink/75"}`}>{p.text}</p>
                </In>
              ))}
            </div>
          )}
          <In i={5}>
            <TLink href="/kontakt" className="btn btn-accent">
              Anfrage stellen <ArrowRight className="size-4" aria-hidden="true" />
            </TLink>
          </In>
        </div>
      </div>
    </Screen>
  );
}
