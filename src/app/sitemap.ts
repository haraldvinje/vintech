import type { MetadataRoute } from "next";
import { LOCALES_EXLCUDED_DEFAULT } from "@/i18n/routing";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vintech.no";

  const routes: SitemapRoute[] = [
    {
      path: "",
      priority: 1,
      changeFrequency: "daily",
    },
    {
      path: "privacy-policy",
      priority: 0.5,
      changeFrequency: "monthly",
    },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}/${path}`,
    lastModified: new Date(),
    alternates: {
      languages: getAlternateLanguagesForPath(siteUrl, path),
    },
    priority,
    changeFrequency,
  }));
}

function getAlternateLanguagesForPath(siteUrl: string, path: string) {
  const alternateLanguages = Object.fromEntries(
    LOCALES_EXLCUDED_DEFAULT.map((locale) => [
      locale,
      `${siteUrl}/${locale}/${path}`,
    ])
  );

  return alternateLanguages;
}
