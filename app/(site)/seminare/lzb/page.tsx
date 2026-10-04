import { SeminarTemplate } from "@/components/sections/SeminarTemplate";
import { getSeminar } from "@/content/seminars";
import { pageMetadata } from "@/lib/seo";

const seminar = getSeminar("lzb");

export const metadata = pageMetadata({
  title: "Seminar LZB inkl. CIR-ELKE für Triebfahrzeugführer",
  description: "5-tägiges LZB-Seminar inkl. CIR-ELKE, Prüfung und Simulatortraining in Gelsenkirchen: Ausrüstung, Bedienung, Betriebsverfahren und Störungen. 1.400 € inkl. Prüfungsgebühr.",
  path: "/seminare/lzb",
});

export default function LzbPage() {
  return <SeminarTemplate seminar={seminar} />;
}
