import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function CtaBand({ title, text, cta, href }: { title: string; text?: string; cta: string; href: string }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="reveal relative isolate overflow-hidden rounded-card bg-petrol px-6 py-12 text-center text-white md:px-16 md:py-16">
          <div className="hero-gradient absolute inset-0 -z-10" aria-hidden="true" />
          <div className="rail-pattern absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold text-white md:text-4xl">{title}</h2>
          {text && <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{text}</p>}
          <LinkButton href={href} size="lg" className="mt-8">
            {cta} <ArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
