import type { Metadata, Viewport } from "next";
import { Montserrat, Ubuntu } from "next/font/google";
import { A11yMenu } from "@/components/layout/A11yMenu";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-ubuntu", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Eisenbahnakademie in Gelsenkirchen`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#406976",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${ubuntu.variable} ${montserrat.variable}`}>
      <body>
        <a href="#inhalt" className="sr-only z-[60] rounded-btn bg-accent px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Zum Inhalt springen
        </a>
        {children}
        <RevealObserver />
        <A11yMenu />
        <CookieBanner />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
