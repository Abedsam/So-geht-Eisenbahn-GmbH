import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="inhalt" className="bg-navy pt-[116px] text-white">
        <div className="container-page flex min-h-[70svh] flex-col items-start justify-center gap-6 py-24">
          <span className="font-mono text-[13px] tracking-[.16em] text-blue-light">
            FEHLER 404 · KEIN HALT
          </span>
          <h1 className="m-0 text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">
            Hier hält leider kein Zug.
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-on-navy">
            Diese Seite gibt es nicht. Steig hier wieder ein:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary btn-lg">
              Zur Startseite <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/lokfuehrer-werden"
              className="btn btn-ghost-dark btn-lg"
            >
              Lokführer werden
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
