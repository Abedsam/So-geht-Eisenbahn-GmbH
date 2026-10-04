import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { infoEvent } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Infoveranstaltung – jeden Montag um 15:30 Uhr",
  description: "Kostenlose Infoveranstaltung zur Ausbildung zum Lokführer: jeden Montag um 15:30 Uhr in Gelsenkirchen, 30 Minuten bis max. 1 Stunde. Jetzt anmelden.",
  path: "/infoveranstaltung",
});

export default function InfoveranstaltungPage() {
  return (
    <>
      <section className="section bg-surface">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Kostenlos & unverbindlich"
            title="Unsere Infoveranstaltung"
            text="Lernen Sie uns, unsere Räume und die Ausbildung zum Triebfahrzeugführer persönlich kennen – und stellen Sie all Ihre Fragen."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {infoEvent.map((e, i) => (
              <li key={e.label} className="reveal group overflow-hidden rounded-card bg-white shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={e.image} alt={e.alt} fill loading="eager" fetchPriority={i === 0 ? "high" : "auto"} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="font-heading text-lg font-bold text-petrol">{e.label}</p>
                  <p className="text-ink/80">{e.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="anmeldung" className="section">
        <div className="container-page grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Anmeldung"
              title="Zur Anmeldung"
              text="Sie möchten sich für unsere Infoveranstaltung anmelden? Nutzen Sie einfach unser Formular und sichern Sie sich Ihren Platz. Wir bestätigen Ihre Anmeldung schnellstmöglich und senden Ihnen alle weiteren Informationen zu."
            />
            <div className="rounded-card border border-petrol-100 bg-white p-6 shadow-card md:p-8">
              <ContactForm topic="infoveranstaltung" />
            </div>
          </div>
          <div className="reveal relative hidden min-h-96 overflow-hidden rounded-card shadow-card lg:block">
            <Image src="/images/placeholder-info-anmeldung.jpg" alt="Zug am Bahnsteig in Gelsenkirchen" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
