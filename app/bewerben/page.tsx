import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

// TODO: nach Design-Vorlage umsetzen
export const metadata: Metadata = { title: "Jetzt bewerben", robots: { index: false, follow: true } };

export default function Page() {
  return <PagePlaceholder kicker="BEWERBUNG" title="Jetzt bewerben" />;
}
