import type { Metadata } from "next";
import { SeminarDetail } from "@/components/weiterbildung/SeminarDetail";
import { lzb } from "@/content/weiterbildung";

export const metadata: Metadata = {
  title: "LZB & CIR-ELKE Seminar",
  description:
    "LZB-Seminar inkl. CIR-ELKE: Bedienung, Betriebsverfahren, Störungen, Unregelmäßigkeiten und Simulatortraining für Triebfahrzeugführer in Gelsenkirchen.",
  alternates: { canonical: "/seminare/lzb" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/seminare/lzb",
    siteName: "So geht Eisenbahn",
    title: "LZB & CIR-ELKE Seminar | So geht Eisenbahn",
    description: "Linienförmige Zugbeeinflussung kompakt – mit Simulatorfahrten.",
    images: [{ url: "/assets/zug-fahrt.png" }],
  },
};

export default function SeminarLzbPage() {
  return <SeminarDetail data={lzb} />;
}
