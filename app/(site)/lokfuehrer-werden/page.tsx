import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

// TODO: nach Design-Vorlage umsetzen
export const metadata: Metadata = { title: "Lokführer werden", robots: { index: false, follow: true } };

export default function Page() {
  return <PagePlaceholder kicker="QUEREINSTIEG" title="Lokführer werden" />;
}
