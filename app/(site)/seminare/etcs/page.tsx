import { SeminarTemplate } from "@/components/sections/SeminarTemplate";
import { getSeminar } from "@/content/seminars";
import { pageMetadata } from "@/lib/seo";

const seminar = getSeminar("etcs");

export const metadata = pageMetadata({
  title: "Seminar ETCS Level 2 für Triebfahrzeugführer",
  description: "5-tägiges ETCS-Seminar inkl. Prüfung und Simulatortraining in Gelsenkirchen: Grundlagen, Betriebsarten, Level 2 und Störungen. 2.100 € inkl. Prüfungsgebühr.",
  path: "/seminare/etcs",
});

export default function EtcsPage() {
  return <SeminarTemplate seminar={seminar} />;
}
