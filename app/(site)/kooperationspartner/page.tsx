import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

// TODO: nach Design-Vorlage umsetzen
export const metadata: Metadata = { title: "Kooperationspartner", robots: { index: false, follow: true } };

export default function Page() {
  return <PagePlaceholder kicker="PARTNER" title="Kooperationspartner" />;
}
