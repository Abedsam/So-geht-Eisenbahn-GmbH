import type { Metadata } from "next";
import { SeminarDetail } from "@/components/weiterbildung/SeminarDetail";
import { etcs } from "@/content/weiterbildung";

export const metadata: Metadata = {
  title: "ETCS Level 2 Seminar",
  description:
    "ETCS Level 2 Seminar: Fahrzeugausrüstung, DMI, Regelbetrieb, Zugüberwachung, Systemeingriffe, Störungen und Simulatortraining in Gelsenkirchen.",
  alternates: { canonical: "/seminare/etcs" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/seminare/etcs",
    siteName: "So geht Eisenbahn",
    title: "ETCS Level 2 Seminar | So geht Eisenbahn",
    description: "European Train Control System kompakt – mit Simulatorfahrten.",
    images: [{ url: "/assets/zug-drehgestell.png" }],
  },
};

export default function SeminarEtcsPage() {
  return <SeminarDetail data={etcs} />;
}
