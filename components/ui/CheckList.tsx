import { ArrowRight, Check } from "lucide-react";

type Props = { items: readonly string[]; icon?: "check" | "arrow"; light?: boolean; className?: string };

/** Liste mit orangen Häkchen oder Pfeilen */
export function CheckList({ items, icon = "check", light, className = "" }: Props) {
  const Icon = icon === "check" ? Check : ArrowRight;
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${icon === "check" ? "bg-accent text-ink" : "text-accent-ink"}`}
          >
            <Icon className="size-4" strokeWidth={3} />
          </span>
          <span className={light ? "text-white/90" : "text-ink/85"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
