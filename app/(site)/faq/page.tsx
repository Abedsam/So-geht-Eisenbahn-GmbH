import { ArrowRight, Phone } from "lucide-react";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { TLink } from "@/components/stage/TLink";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { homeFaq } from "@/content/faq";
import { site } from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Häufige Fragen zu Förderung und Eignung",
  description: "Bildungsgutschein, Förderung, Eignungstest, medizinische und psychologische Tauglichkeit – Antworten auf die häufigsten Fragen.",
  path: "/faq",
});

export default function Faq() {
  return (
    <Screen tone="light" backdrop={<StationNumber n={4} />}>
      <JsonLd data={faqJsonLd(homeFaq)} />
      <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">FAQ</p>
          </In>
          <Words text="Förderung & Eignung." className="title-xl text-petrol" />
          <In i={2} className="hidden flex-col gap-4 rounded-[18px] bg-petrol p-5 text-white sm:flex">
            <p className="font-heading text-lg font-bold">Haben wir Ihr Interesse geweckt?</p>
            <p className="text-sm text-white/85">Wir beraten Sie persönlich und unverbindlich – auch zum Bildungsgutschein.</p>
            <div className="flex flex-wrap gap-2">
              <TLink href="/kontakt" className="btn btn-accent">
                Jetzt durchstarten <ArrowRight className="size-4" aria-hidden="true" />
              </TLink>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                <Phone className="size-4" aria-hidden="true" /> Anrufen
              </a>
            </div>
          </In>
        </div>
        <In i={2}>
          <Accordion
            defaultOpen={null}
            items={homeFaq.map((f) => ({
              title: f.question,
              content: <p>{f.answer}</p>,
              // TODO(Kunde): Antworten freigeben, danach `todo` in content/faq.ts entfernen
              badge: f.todo ? <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-ink/80">Entwurf</span> : undefined,
            }))}
          />
        </In>
      </div>
    </Screen>
  );
}
