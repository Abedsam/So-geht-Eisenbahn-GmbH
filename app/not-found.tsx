import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="inhalt" className="hero-gradient grid min-h-screen place-items-center px-4 text-center text-white">
      <div className="flex flex-col items-center gap-6">
        <Logo light />
        <p className="font-heading text-7xl font-bold text-accent">404</p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">Hier fährt leider kein Zug.</h1>
        <p className="max-w-md text-white/85">Die Seite wurde nicht gefunden. Vielleicht hilft Ihnen einer dieser Wege weiter:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("primary", "lg")}>
            Zur Startseite
          </Link>
          <Link href="/lokfuehrer-werden" className={buttonClass("outline-light", "lg")}>
            Lokführer werden
          </Link>
        </div>
      </div>
    </main>
  );
}
