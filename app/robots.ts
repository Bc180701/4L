import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.url
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(site.url ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
