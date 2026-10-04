import { Logo } from "@/components/ui/Logo";

/** Reduzierter Header der Landingpage: nur Logo + EBA-Badge, keine Navigation */
export function MinimalHeader() {
  return (
    <header className="bg-white">
      <div className="container-page flex h-[4.5rem] items-center gap-4">
        <Logo />
        <span className="hidden h-9 w-px bg-petrol-100 sm:block" aria-hidden="true" />
        {/* Platzhalter für das Badge „Anerkannte Stelle – Eisenbahn-Bundesamt“ */}
        <span className="ml-auto flex items-center gap-2 rounded-btn border border-petrol-100 px-2.5 py-1.5 text-[0.65rem] leading-tight text-ink/80 sm:ml-0">
          <span className="flex h-6 w-1.5 flex-col overflow-hidden rounded-sm" aria-hidden="true">
            <span className="flex-1 bg-black" />
            <span className="flex-1 bg-red-600" />
            <span className="flex-1 bg-yellow-400" />
          </span>
          <span>
            <strong className="block whitespace-nowrap text-[0.7rem] text-ink">
              <span className="sm:hidden">EBA-anerkannt</span>
              <span className="hidden sm:inline">Eisenbahn-Bundesamt</span>
            </strong>
            <span className="hidden whitespace-nowrap sm:inline">Anerkannte Stelle §§ 14/15 TfV</span>
            <span className="whitespace-nowrap sm:hidden">§§ 14/15 TfV</span>
          </span>
        </span>
      </div>
    </header>
  );
}
