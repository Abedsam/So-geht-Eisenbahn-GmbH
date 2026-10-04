import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { In, Screen, Words } from "@/components/stage/Screen";
import { infoEvent } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Infoveranstaltung – jeden Montag um 15:30 Uhr",
  description: "Kostenlose Infoveranstaltung zur Ausbildung zum Lokführer: jeden Montag um 15:30 Uhr in Gelsenkirchen, 30 Minuten bis max. 1 Stunde. Jetzt anmelden.",
  path: "/infoveranstaltung",
});

export default function Infoveranstaltung() {
  return (
    <Screen tone="light" width="wide">
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">Kostenlos & unverbindlich</p>
          </In>
          <Words text="Unsere Infoveranstaltung." className="title-xl text-petrol" />
          <ul className="hidden grid-cols-2 gap-2 sm:grid sm:gap-3">
            {infoEvent.map((e, i) => (
              <In as="li" key={e.label} i={i + 2} className="group relative overflow-hidden rounded-[16px] bg-petrol text-white">
                <span className="relative hidden aspect-[16/7] sm:block [@media(max-height:760px)]:!hidden">
                  <Image src={e.image} alt="" fill loading="eager" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="block p-3">
                  <span className="block font-heading text-sm font-bold text-accent">{e.label}</span>
                  <span className="block text-sm font-semibold sm:text-base">{e.value}</span>
                </span>
              </In>
            ))}
          </ul>
        </div>
        <In i={3} className="rounded-[20px] bg-white p-4 shadow-lift sm:p-6">
          <p className="mb-3 font-heading text-xl font-bold text-petrol">Zur Anmeldung <span className="block text-sm font-normal text-ink/70 sm:hidden">Montags 15:30 Uhr · Gelsenkirchen · kostenlos</span></p>
          <ContactForm topic="infoveranstaltung" />
        </In>
      </div>
    </Screen>
  );
}
