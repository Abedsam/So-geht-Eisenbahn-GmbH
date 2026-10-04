import type { MetadataRoute } from "next";
import { landingLine, siteLines } from "@/content/lines";
import { site } from "@/content/site";

export const dynamic = "force-static";

const routes = [landingLine, ...siteLines].flatMap((l) => l.stations.map((st) => st.href));

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" || path === "/lokfuehrer-werden" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
