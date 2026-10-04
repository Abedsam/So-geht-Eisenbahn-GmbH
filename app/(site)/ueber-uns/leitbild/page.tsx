import Image from "next/image";
import { In, Screen, StationNumber, Words } from "@/components/stage/Screen";
import { leitbild } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Unser Leitbild",
  description: "Sicherheit, Verantwortungsbewusstsein, Umweltbewusstsein und Chancengleichheit: das Leitbild der So geht Eisenbahn GmbH.",
  path: "/ueber-uns/leitbild",
});

const values = ["Sicherheit", "Verantwortung", "Umweltbewusstsein", "Chancengleichheit"];

export default function Leitbild() {
  return (
    <Screen tone="light" width="wide" backdrop={<StationNumber n={2} />}>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <In i={0}>
            <p className="kicker text-petrol">Leitbild</p>
          </In>
          <Words text="Bis zum Abschluss an Ihrer Seite." className="title-xl text-petrol" />
          <In i={2} className="hidden flex-wrap gap-2 sm:flex">
            {values.map((v) => (
              <span key={v} className="rounded-full bg-petrol px-3 py-1 text-sm font-semibold text-white">
                {v}
              </span>
            ))}
          </In>
          <div className="clip-in relative hidden aspect-[16/9] overflow-hidden rounded-[18px] lg:block [@media(max-height:800px)]:!hidden" style={{ ["--i" as string]: 3 }}>
            <Image src="/images/placeholder-ueber-uns-raeume.jpg" alt="Moderne, AZAV-konforme Schulungsräume" fill sizes="45vw" className="object-cover" />
          </div>
        </div>
        <ol className="flex flex-col gap-2 sm:gap-3">
          {leitbild.map((p, i) => (
            <In as="li" key={p.slice(0, 20)} i={i + 2} x className="flex gap-3 rounded-[14px] bg-white p-3 shadow-card sm:gap-4 sm:p-4">
              <span className="font-heading text-2xl font-bold text-accent-ink" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.85rem] text-ink/85 sm:text-base">{p}</span>
            </In>
          ))}
        </ol>
      </div>
    </Screen>
  );
}
