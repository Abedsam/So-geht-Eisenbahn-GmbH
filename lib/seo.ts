import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = { title: string; description: string; path: string; image?: string; noIndex?: boolean };

/** Einheitliche Metadaten inkl. Open Graph für jede Seite */
export function pageMetadata({ title, description, path, image = "/images/placeholder-og-default.jpg", noIndex }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
