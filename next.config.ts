import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build erzeugt einen rein statischen Export in /out.
// Achtung: Dann gibt es keine /api-Routen – Formulare brauchen NEXT_PUBLIC_FORM_ENDPOINT.
// NEXT_PUBLIC_BASE_PATH setzt einen Unterpfad (GitHub Pages: /So-geht-Eisenbahn-GmbH).
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: isExport,
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
