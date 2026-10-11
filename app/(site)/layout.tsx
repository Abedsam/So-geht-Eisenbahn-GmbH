import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

/** Alle regulären Seiten: fixierter Header + Footer (die Danke-Seite hat ein eigenes Layout) */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
