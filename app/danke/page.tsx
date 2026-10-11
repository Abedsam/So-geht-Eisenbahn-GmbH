import type { Metadata } from "next";

// TODO: nach Design-Vorlage (Danke.dc.html) umsetzen
export const metadata: Metadata = { title: "Danke", robots: { index: false, follow: false } };

export default function Page() {
  return <main id="inhalt" className="min-h-svh bg-navy text-white" />;
}
