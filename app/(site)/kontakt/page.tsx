import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { In, Screen, Words } from "@/components/stage/Screen";
import { Tabs } from "@/components/ui/Tabs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt – Infoveranstaltung, Fragen, Bewerbung",
  description: "Kontaktieren Sie die So geht Eisenbahn GmbH in Gelsenkirchen: Anmeldung zur Infoveranstaltung, allgemeine Fragen oder Bewerbung als Lokführer (m/w/d).",
  path: "/kontakt",
});

const forms = [
  { id: "info", label: "Infoveranstaltung", topic: "infoveranstaltung" as const, text: "Jeden Montag um 15:30 Uhr in Gelsenkirchen. Wir kontaktieren Sie nach Ihrer Anmeldung." },
  { id: "fragen", label: "Allgemeine Fragen", topic: "allgemein" as const, text: "Für alle anderen Anliegen – wir melden uns schnellstmöglich." },
  { id: "lokfuehrer", label: "Lokführer werden", topic: "lokfuehrer" as const, text: "In 12 Monaten zum Lokführer (m/w/d) – danach rund 4.000 € netto im Monat." },
];

export default function Kontakt() {
  return (
    <Screen tone="light" width="wide">
      <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">Kontakt</p>
          </In>
          <Words text="Machen Sie den ersten Schritt." className="title-xl text-petrol" />
          <In i={2} className="hidden sm:block">
            <address className="flex flex-col gap-2 not-italic text-ink/85">
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-accent-ink" aria-hidden="true" /> {site.address.street}, {site.address.zip} {site.address.city}
              </span>
              <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-petrol hover:underline">
                <Phone className="size-4 text-accent-ink" aria-hidden="true" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 font-semibold text-petrol hover:underline">
                <Mail className="size-4 text-accent-ink" aria-hidden="true" /> {site.email}
              </a>
            </address>
          </In>
          <In i={3} className="hidden lg:block [@media(max-height:800px)]:!hidden">
            <MapPlaceholder />
          </In>
        </div>
        <In i={2} className="rounded-[20px] bg-white p-4 shadow-lift sm:p-6">
          <Tabs
            label="Kontaktformulare"
            items={forms.map((f) => ({
              id: f.id,
              label: f.label,
              content: (
                <div className="flex flex-col gap-3">
                  <p className="hidden text-sm text-ink/75 sm:block">{f.text}</p>
                  <ContactForm topic={f.topic} />
                </div>
              ),
            }))}
          />
        </In>
      </div>
    </Screen>
  );
}
