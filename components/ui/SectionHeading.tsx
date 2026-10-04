import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  light?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", as: Tag = "h2", light, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal flex max-w-3xl flex-col gap-4 ${center ? "mx-auto items-center text-center" : ""} ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-white/85" : ""}`}>{eyebrow}</p>}
      <Tag className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] ${light ? "text-white" : ""}`}>{title}</Tag>
      {text && <div className={`text-lg ${light ? "text-white/85" : "text-ink/75"}`}>{text}</div>}
    </div>
  );
}
