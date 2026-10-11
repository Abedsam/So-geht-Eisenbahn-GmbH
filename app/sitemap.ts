import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/ausbildungen",
  "/lokfuehrer-werden",
  "/weiterbildungen",
  "/seminare",
  "/seminare/lzb",
  "/seminare/etcs",
  "/ueber-uns",
  "/kooperationspartner",
  "/kontakt",
  "/bewerben",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
