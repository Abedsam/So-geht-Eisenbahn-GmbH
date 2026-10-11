import type { Metadata } from "next";
import { ConsentButton } from "@/components/about/ConsentButton";
import { LegalPage, LegalSection } from "@/components/about/Legal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der So geht Eisenbahn GmbH.",
  alternates: { canonical: "/datenschutz" },
  openGraph: { title: "Datenschutz | So geht Eisenbahn", url: "/datenschutz" },
  robots: { index: false, follow: true },
};

// Platzhaltertext aus dem Design – vor Veröffentlichung durch eine rechtlich geprüfte Datenschutzerklärung ersetzen
export default function PrivacyPage() {
  return (
    <LegalPage title="Datenschutz">
      <LegalSection title="1. Verantwortliche Stelle">
        So geht Eisenbahn GmbH, Bahnhofstraße 74–76, 45879 Gelsenkirchen,{" "}
        <a href="mailto:hey@so-geht-eisenbahn.de">hey@so-geht-eisenbahn.de</a>
      </LegalSection>
      <LegalSection title="2. Erhebung beim Besuch der Website">
        Beim Aufruf unserer Website werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, Browser) verarbeitet, um die Seite
        bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).
      </LegalSection>
      <LegalSection title="3. Kontakt- und Anmeldeformulare">
        Angaben aus unseren Formularen verwenden wir ausschließlich zur Bearbeitung deiner Anfrage bzw. Anmeldung (Art. 6 Abs. 1 lit. a und
        b DSGVO). Eine Weitergabe an Dritte erfolgt nur, wenn dies zur Durchführung erforderlich ist.
      </LegalSection>
      <LegalSection title="4. Deine Rechte">
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie
        auf Beschwerde bei einer Aufsichtsbehörde.
      </LegalSection>
      <LegalSection title="5. Speicherdauer">
        Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche
        Aufbewahrungsfristen bestehen.
      </LegalSection>
      <ConsentButton />
      <p className="m-0 text-[15px] text-muted">
        Hinweis: Platzhaltertext – vor Veröffentlichung durch eine rechtlich geprüfte Datenschutzerklärung ersetzen.
      </p>
    </LegalPage>
  );
}
