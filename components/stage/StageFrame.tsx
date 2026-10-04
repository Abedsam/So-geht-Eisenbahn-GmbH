import type { ReactNode } from "react";
import { LineBar } from "./LineBar";
import { StageNavigator } from "./StageNavigator";
import { StageTop } from "./StageTop";

/** Rahmen wie ein Führerstand-Display: Kopfleiste, Station (Vollbild), Linie */
export function StageFrame({ variant, children }: { variant: "site" | "landing"; children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col bg-frame">
      <StageTop variant={variant} />
      <main id="inhalt" className="relative min-h-0 flex-1 px-2 sm:px-3">
        {children}
      </main>
      <LineBar />
      <StageNavigator />
    </div>
  );
}
