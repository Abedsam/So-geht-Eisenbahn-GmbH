import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Ticker } from "@/components/layout/Ticker";
import { TopBar } from "@/components/layout/TopBar";

/** Standard-Layout aller Seiten außer der Landingpage */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Ticker />
      <TopBar />
      <Header />
      <main id="inhalt">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
