import { LegalPage } from "@/components/sections/LegalPage";
import { ConsentSettingsButton } from "@/components/layout/ConsentSettingsButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Datenschutzerklärung", description: "Datenschutzerklärung der So geht Eisenbahn GmbH.", path: "/datenschutz" });

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortliche Stelle</h2>
      <p>TODO: Name und Kontaktdaten des Verantwortlichen sowie ggf. des Datenschutzbeauftragten.</p>
      <h2>2. Kontakt- und Bewerbungsformulare</h2>
      <p>TODO: Zweck, Rechtsgrundlage und Speicherdauer der über die Formulare übermittelten Daten.</p>
      <h2>3. Cookies und lokale Speicherung</h2>
      <p>
        Diese Website speichert Ihre Cookie-Auswahl und Ihre Einstellungen zur Darstellung (Schriftgröße, Zeilenabstand) lokal in Ihrem Browser. Externe Inhalte wie Karten
        werden erst nach Ihrer Einwilligung geladen. TODO: vollständige Beschreibung.
      </p>
      <ConsentSettingsButton />
      <h2>4. Ihre Rechte</h2>
      <p>TODO: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerderecht.</p>
    </LegalPage>
  );
}
