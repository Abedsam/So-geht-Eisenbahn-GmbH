"use client";

import { scrollToId, toQuiz } from "./track";

type Props = { className?: string; children: React.ReactNode } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

/** Button, der zum Bewerbungs-Quiz scrollt (mit `cta_click`-Tracking) */
export function QuizCta({ className = "", children, ...rest }: Props) {
  return (
    <button type="button" onClick={toQuiz} className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
}

/** „Mehr erfahren“ im Hero → Vorteile-Sektion */
export function InfoCta({ className = "", children, ...rest }: Props) {
  return (
    <button type="button" onClick={() => scrollToId("info")} className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
}
