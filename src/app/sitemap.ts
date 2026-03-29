import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mirret.co.uk",
      lastModified: new Date("2026-03-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://mirret.co.uk/company",
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
