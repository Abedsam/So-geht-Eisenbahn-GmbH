import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { RevealObserver } from "@/components/site/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-archivo", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "So geht Eisenbahn – Ausbildung & Weiterbildung im Bahnbereich | Gelsenkirchen", template: "%s | So geht Eisenbahn" },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#071C35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `js`-Klasse wird vor dem ersten Paint gesetzt (Reveal-Animationen nur mit JS)
    <html lang="de" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only rounded-btn bg-blue px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]"
        >
          Zum Inhalt springen
        </a>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <RevealObserver />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
