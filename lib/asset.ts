/** Pfad zu Dateien in /public – mit basePath (z. B. für GitHub Pages unter /So-geht-Eisenbahn-GmbH) */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
