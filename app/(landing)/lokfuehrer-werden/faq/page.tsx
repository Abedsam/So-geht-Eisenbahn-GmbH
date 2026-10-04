import Image from "next/image";
import { In, Screen, Words } from "@/components/stage/Screen";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { landingFaq } from "@/content/faq";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fragen und Antworten zur Lokführer-Ausbildung",
  description: "Wo findet die Ausbildung statt, wie lange dauert sie, was verdienst du und bekommst du ein Ausbildungsgehalt? Die Antworten.",
  path: "/lokfuehrer-werden/faq",
});

export default function Faq() {
  return (
    <Screen tone="light">
      <JsonLd data={faqJsonLd(landingFaq)} />
      <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">FAQ</p>
          </In>
          <Words text="Fragen und Antworten." className="title-xl text-petrol" />
          <div className="clip-in relative hidden aspect-[4/3] overflow-hidden rounded-[18px] lg:block" style={{ ["--i" as string]: 2 }}>
            {/* Bild: Teilnehmer im Unterrichtsraum */}
            <Image src="/images/placeholder-unterricht.jpg" alt="Teilnehmer im Unterrichtsraum in Gelsenkirchen" fill sizes="35vw" className="object-cover" />
          </div>
        </div>
        <In i={2}>
          <Accordion items={landingFaq.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
        </In>
      </div>
    </Screen>
  );
}
