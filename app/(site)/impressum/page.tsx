import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/about/Legal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der So geht Eisenbahn GmbH, Bahnhofstraße 74–76, 45879 Gelsenkirchen.",
  alternates: { canonical: "/impressum" },
  openGraph: { title: "Impressum | So geht Eisenbahn", url: "/impressum" },
  robots: { index: false, follow: true },
};

// Platzhalter in [eckigen Klammern] vor Veröffentlichung durch den Kunden ersetzen
export default function ImprintPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection title="Angaben gemäß § 5 DDG">
        So geht Eisenbahn GmbH
        <br />
        Bahnhofstraße 74–76
        <br />
        45879 Gelsenkirchen
      </LegalSection>
      <LegalSection title="Kontakt">
        Telefon: <a href="tel:+4920988494686">+49 209 8849 4686</a>
        <br />
        E-Mail: <a href="mailto:hey@so-geht-eisenbahn.de">hey@so-geht-eisenbahn.de</a>
      </LegalSection>
      <LegalSection title="Vertreten durch">[Geschäftsführer eintragen]</LegalSection>
      <LegalSection title="Registereintrag">
        Registergericht: [eintragen]
        <br />
        Registernummer: [eintragen]
      </LegalSection>
      <LegalSection title="Umsatzsteuer-ID">[USt-IdNr. eintragen]</LegalSection>
      <LegalSection title="Anerkennung">
        Anerkannte Stelle des Eisenbahn-Bundesamts für Ausbildung (§14 TfV) und Prüfung (§15 TfV).
      </LegalSection>
    </LegalPage>
  );
}
