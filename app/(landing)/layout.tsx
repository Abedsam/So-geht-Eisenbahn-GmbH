import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";

/** Reines Landingpage-Layout: keine Navigation, Fokus auf die Bewerbung */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinimalHeader />
      <main id="inhalt">{children}</main>
      <Footer variant="landing" ctaHref="#bewerben" />
      <StickyMobileCta />
      <BackToTop />
    </>
  );
}
