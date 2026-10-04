import { site } from "@/content/site";
import type { Faq } from "@/content/faq";
import type { Seminar } from "@/content/seminars";

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  postalCode: site.address.zip,
  addressLocality: site.address.city,
  addressCountry: site.address.country,
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address,
};

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function courseJsonLd(s: Seminar) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Seminar ${s.title}`,
    description: s.teaser,
    provider: { "@id": `${site.url}/#organization`, "@type": "EducationalOrganization", name: site.name },
    offers: { "@type": "Offer", price: s.priceEur, priceCurrency: "EUR", category: "Paid" },
    hasCourseInstance: s.dates.map((d) => ({
      "@type": "CourseInstance",
      courseMode: "Blended",
      startDate: d.start,
      endDate: d.end,
      location: { "@type": "Place", name: site.name, address },
    })),
  };
}

/** Ausbildungsprogramm mit Gehaltsangabe – das passende schema.org-Gegenstück zu einer „Stellenanzeige“ für eine Umschulung */
export const lokfuehrerProgramJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: "Ausbildung zum Lokführer / Triebfahrzeugführer (m/w/d)",
  description:
    "12-monatige Ausbildung zum Lokführer in Gelsenkirchen: ca. 6 Monate Theorie, ca. 6 Monate wohnortnahe Praxis, kostenfrei mit Bildungsgutschein, 100 % Jobgarantie.",
  provider: { "@id": `${site.url}/#organization`, "@type": "EducationalOrganization", name: site.name },
  occupationalCategory: "Triebfahrzeugführer/in (Eisenbahn)",
  timeToComplete: "P12M",
  educationalProgramMode: "full-time",
  programPrerequisites: "Mindestens 20 Jahre, Hauptschulabschluss oder Berufsausbildung, Deutsch B1/B2",
  financialAidEligible: "Bildungsgutschein (Agentur für Arbeit, Jobcenter, Rentenversicherung, Bundeswehr, Berufsgenossenschaft)",
  offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", description: "Kostenfrei mit Bildungsgutschein" },
  occupationalCredentialAwarded: "Triebfahrzeugführerschein nach TfV",
  salaryUponCompletion: {
    "@type": "MonetaryAmountDistribution",
    name: "Einstiegsgehalt (netto, ca.)",
    currency: "EUR",
    duration: "P1M",
    median: 4000,
  },
  location: { "@type": "Place", name: site.name, address },
};
