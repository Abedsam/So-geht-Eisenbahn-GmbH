import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { UspBand } from "@/components/sections/UspBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt – Infoveranstaltung, Fragen, Bewerbung",
  description: "Kontaktieren Sie die So geht Eisenbahn GmbH in Gelsenkirchen: Anmeldung zur Infoveranstaltung, allgemeine Fragen oder Bewerbung als Lokführer (m/w/d).",
  path: "/kontakt",
});

const cards = [
  {
    topic: "infoveranstaltung" as const,
    title: "Infoveranstaltung",
    text: "Die Infoveranstaltung findet jeden Montag um 15:30 Uhr bei uns am Standort in Gelsenkirchen statt. Wir kontaktieren Sie, nachdem Sie sich eingetragen haben.",
    image: "/images/placeholder-kontakt-info.jpg",
    alt: "Infoveranstaltung im Unterrichtsraum",
  },
  {
    topic: "allgemein" as const,
    title: "Allgemeine Fragen",
    text: "Bei allgemeinen Fragen oder sonstigen Anliegen erreichen Sie uns über das nachstehende Kontaktformular.",
    image: "/images/placeholder-kontakt-fragen.jpg",
    alt: "Team vor dem Führerstand-Simulator",
  },
  {
    topic: "lokfuehrer" as const,
    title: "Lokführer (m/w/d) werden",
    text: "Wir bilden Sie in nur 12 Monaten zum Lokführer (m/w/d) in Gelsenkirchen aus. Melden Sie sich unverbindlich an – nach der Ausbildung verdienen Sie rund 4.000 € netto im Monat.",
    image: "/images/placeholder-kontakt-lokfuehrer.jpg",
    alt: "Teilnehmer und Dozent am Simulator",
  },
];

export default function KontaktPage() {
  return (
    <>
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading as="h1" align="center" eyebrow="Kontakt" title="Machen Sie den ersten Schritt und kontaktieren Sie uns" />
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {cards.map((c, i) => (
              <article key={c.topic} className="reveal flex flex-col overflow-hidden rounded-card bg-white shadow-card" aria-labelledby={`card-${c.topic}`}>
                <div className="relative aspect-[3/2]">
                  <Image src={c.image} alt={c.alt} fill loading="eager" fetchPriority={i === 0 ? "high" : "auto"} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <h2 id={`card-${c.topic}`} className="text-2xl font-bold">
                    {c.title}
                  </h2>
                  <p className="text-ink/80">{c.text}</p>
                  <ContactForm topic={c.topic} compact />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-6 rounded-card bg-petrol p-8 text-white">
            <h2 className="text-2xl font-bold text-white">So finden Sie uns</h2>
            <address className="flex flex-col gap-5 not-italic">
              <span className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </span>
              </span>
              <a href={site.phoneHref} className="flex items-center gap-3 font-semibold hover:underline">
                <Phone className="size-5 text-accent" aria-hidden="true" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-semibold hover:underline">
                <Mail className="size-5 text-accent" aria-hidden="true" /> {site.email}
              </a>
            </address>
          </div>
          <MapPlaceholder />
        </div>
      </section>

      <UspBand />
    </>
  );
}
