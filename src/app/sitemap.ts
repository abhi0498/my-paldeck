import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  console.log([
    {
      url: "https://my-paldeck.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]);
  return [
    {
      url: "https://my-paldeck.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...[...Array(100)].map((_, i) => ({
      url: `https://my-paldeck.vercel.app/pal/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
