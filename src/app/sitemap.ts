import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Explicitly use the production domain - ensure it matches your Google Search Console property
  // All URLs in sitemap must be from the same domain as the sitemap file location
  const baseUrl = "https://supratikch.com";

  // Google Search Console sitemap requirements:
  // 1. All URLs must be from the same domain as sitemap location
  // 2. URLs must be absolute (include https://)
  // 3. No hash fragments (#) allowed
  // 4. For single-page apps, only include the main page URL
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
