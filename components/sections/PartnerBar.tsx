import Link from "next/link";
import { partners } from "@/content/partners";

/** Partner-Leiste mit Platzhalter-Kacheln (bewusst keine fremden Logos) */
export function PartnerBar({ title = "Unsere Kooperationspartner", text, link = true }: { title?: string; text?: string; link?: boolean }) {
  return (
    <section aria-labelledby="partner-title" className="py-14 md:py-20">
      <div className="container-page">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 id="partner-title" className="text-2xl font-bold md:text-3xl">
            {title}
          </h2>
          {text && <p className="mt-3 text-ink/75">{text}</p>}
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {partners.map((p) => (
            <li key={p.slug} className="reveal">
              <div className="grid h-20 place-items-center rounded-card border border-dashed border-petrol-100 bg-white px-3 text-center font-heading text-lg font-bold text-petrol/80 transition-colors hover:border-petrol hover:text-petrol">
                {p.name}
                <span className="sr-only"> (Logo-Platzhalter)</span>
              </div>
            </li>
          ))}
        </ul>
        {link && (
          <p className="mt-6 text-center">
            <Link href="/kooperationspartner" className="font-semibold text-petrol underline-offset-4 hover:underline">
              Mehr über unsere Partner →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
