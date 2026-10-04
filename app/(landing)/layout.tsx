import { StageFrame } from "@/components/stage/StageFrame";

/** Landingpage: eigene Linie ohne Netzplan – Fokus auf die Bewerbung */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <StageFrame variant="landing">{children}</StageFrame>;
}
