import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function TopBar() {
  return (
    <div className="hidden border-b border-petrol-100 bg-white text-sm md:block">
      <div className="container-page flex h-10 items-center justify-between">
        <ul className="flex items-center gap-1" aria-label="Social Media">
          {site.social.map((s) => (
            <li key={s.name}>
              <a href={s.href} className="grid size-8 place-items-center rounded-full text-petrol transition-colors hover:bg-petrol-50" aria-label={`${s.name} (Platzhalter-Link)`}>
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
        <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold text-petrol hover:underline">
          <Phone className="size-4" aria-hidden="true" />
          {site.phone}
        </a>
      </div>
    </div>
  );
}
