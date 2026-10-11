import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  title?: string;
  /** Wert des offenen Eintrags beim Laden, z. B. "item-0" */
  defaultValue?: string;
  className?: string;
};

/** FAQ-Sektion (Vorlage „faqs-01“, an Texte und Markenfarben von So geht Eisenbahn angepasst) */
export default function Faqs01({ faqs, title = "Fragen & Antworten", defaultValue, className }: Props) {
  return (
    <section className={cn("bg-background py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <div data-reveal="" className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-medium tracking-[.14em] text-muted-foreground shadow-sm shadow-black/5">
            <Sparkles className="size-3 text-blue-hover" aria-hidden="true" />
            FAQ
          </span>
          <h2
            className="m-0 text-balance font-extrabold"
            style={{ fontSize: "clamp(1.85rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            {title}
          </h2>
          <p className="m-0 max-w-xl text-balance text-muted-foreground">
            Schnelle Antworten auf die Fragen, die wir am häufigsten hören. Deine ist nicht dabei? Schreib uns an{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-foreground underline-offset-4 hover:text-blue hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12" defaultValue={defaultValue}>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="cursor-pointer gap-4 py-5 text-left text-lg font-bold text-foreground hover:text-blue hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-bg p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background">
              <MessageCircle className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <p className="m-0 text-sm font-medium text-foreground">Noch eine Frage offen?</p>
              <p className="m-0 text-xs text-muted-foreground">Ruf uns an unter {site.phone} – wir beraten dich gern.</p>
            </div>
          </div>
          <Button asChild size="sm" className="gap-2 rounded-full font-bold text-white no-underline hover:bg-blue-hover hover:text-white">
            <Link href="/kontakt#allgemein">
              Frag uns
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
