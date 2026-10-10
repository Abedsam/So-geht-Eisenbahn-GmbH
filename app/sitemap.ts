import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// TODO: weitere Seiten ergänzen, sobald sie umgesetzt sind
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
