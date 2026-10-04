import Image from "next/image";
import { team } from "@/content/team";

/** Team-Porträts: `short` (Landingpage, Du) oder `full` (Über uns, mit Rolle) */
export function TeamGrid({ variant = "full" }: { variant?: "short" | "full" }) {
  const short = variant === "short";
  return (
    <ul className={`grid gap-x-5 gap-y-10 ${short ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
      {team.map((m) => (
        <li key={m.slug} className="reveal group flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Image
              src={m.image}
              alt={`Porträt von ${short ? m.firstName : m.name} (Platzhalter)`}
              width={short ? 128 : 160}
              height={short ? 128 : 160}
              sizes={short ? "128px" : "160px"}
              className={`rounded-full object-cover ring-4 ring-white shadow-card transition-transform duration-300 group-hover:-translate-y-1 ${short ? "size-28" : "size-36"}`}
            />
            <span className="absolute -bottom-1 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-accent transition-[width] duration-300 group-hover:w-16" aria-hidden="true" />
          </div>
          <h3 className="font-heading text-lg font-bold text-petrol">{short ? m.firstName : m.name}</h3>
          <p className="mt-1 text-sm text-ink/75">{short ? m.short : m.role}</p>
        </li>
      ))}
    </ul>
  );
}
