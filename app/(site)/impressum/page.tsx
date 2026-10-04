import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Impressum", description: "Impressum der So geht Eisenbahn GmbH, Gelsenkirchen.", path: "/impressum" });

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.name}
        <br />
        {site.address.street}
        <br />
        {site.address.zip} {site.address.city}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: {site.phone}
        <br />
        E-Mail: {site.email}
      </p>
      <h2>Vertreten durch</h2>
      <p>TODO: Geschäftsführung</p>
      <h2>Registereintrag</h2>
      <p>TODO: Registergericht und Registernummer</p>
      <h2>Umsatzsteuer-ID</h2>
      <p>TODO: USt-IdNr.</p>
    </LegalPage>
  );
}
