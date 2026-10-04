import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main id="inhalt" className="rails grid h-dvh place-items-center bg-frame px-4 text-center text-white">
      <div className="flex flex-col items-center gap-6">
        <Logo light />
        <p className="in font-heading text-8xl font-bold text-accent">404</p>
        <h1 className="in text-3xl font-bold md:text-4xl" style={{ ["--i" as string]: 1 }}>
          Hier hält leider kein Zug.
        </h1>
        <p className="in max-w-md text-white/85" style={{ ["--i" as string]: 2 }}>
          Diese Station gibt es nicht. Steigen Sie hier wieder ein:
        </p>
        <div className="in flex flex-wrap justify-center gap-3" style={{ ["--i" as string]: 3 }}>
          <Link href="/" className="btn btn-accent">
            Zur Startseite
          </Link>
          <Link href="/lokfuehrer-werden" className="btn btn-ghost-light">
            Lokführer werden
          </Link>
        </div>
      </div>
    </main>
  );
}
