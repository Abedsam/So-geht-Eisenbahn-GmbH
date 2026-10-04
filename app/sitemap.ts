import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/lokfuehrer-werden", priority: 1 },
  { path: "/ausbildungen", priority: 0.9 },
  { path: "/weiterbildungen", priority: 0.8 },
  { path: "/seminare", priority: 0.8 },
  { path: "/seminare/etcs", priority: 0.7 },
  { path: "/seminare/lzb", priority: 0.7 },
  { path: "/infoveranstaltung", priority: 0.8 },
  { path: "/kooperationspartner", priority: 0.5 },
  { path: "/ueber-uns", priority: 0.6 },
  { path: "/kontakt", priority: 0.7 },
  { path: "/impressum", priority: 0.1 },
  { path: "/datenschutz", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r.path === "/" ? "" : r.path}`, changeFrequency: "monthly", priority: r.priority }));
}
