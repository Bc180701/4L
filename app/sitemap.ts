import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url
    ? ["", "/mentions-legales", "/confidentialite"].map((path) => ({
        url: site.url + path,
        changeFrequency: path ? "yearly" : "monthly",
        priority: path ? 0.3 : 1,
      }))
    : [];
}
