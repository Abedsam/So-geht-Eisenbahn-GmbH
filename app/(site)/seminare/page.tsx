import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

// TODO: nach Design-Vorlage umsetzen
export const metadata: Metadata = { title: "Seminare", robots: { index: false, follow: true } };

export default function Page() {
  return <PagePlaceholder kicker="SEMINARE" title="Seminare" />;
}
