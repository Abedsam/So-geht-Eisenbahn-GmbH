import { StageFrame } from "@/components/stage/StageFrame";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <StageFrame variant="site">{children}</StageFrame>;
}
