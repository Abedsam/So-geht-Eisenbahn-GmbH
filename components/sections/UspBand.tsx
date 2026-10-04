import { HeartHandshake, Scale, Telescope } from "lucide-react";
import { usps } from "@/content/site";

const icons = [HeartHandshake, Telescope, Scale];

/** USP-Band: „100 % persönlich“ · „Wissen aus allen Perspektiven“ · „Fair und individuell“ */
export function UspBand() {
  return (
    <section aria-label="Das zeichnet uns aus" className="bg-petrol-50">
      <div className="container-page grid gap-4 py-12 md:grid-cols-3 md:gap-6 md:py-16">
        {usps.map((u, i) => {
          const Icon = icons[i];
          return (
            <div key={u.title} className="reveal flex items-start gap-4 rounded-card bg-white p-6 shadow-card">
              <span className="grid size-12 shrink-0 place-items-center rounded-card bg-petrol text-accent" aria-hidden="true">
                <Icon className="size-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-bold text-petrol">
                  {u.value} <span className="text-lg">{u.title}</span>
                </p>
                <p className="text-ink/75">{u.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
