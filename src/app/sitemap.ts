import type { MetadataRoute } from "next";
import { LOCALES_EXLCUDED_DEFAULT } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vintech.no";

  const alternateLanguages = Object.fromEntries(
    LOCALES_EXLCUDED_DEFAULT.map((locale) => [locale, `${siteUrl}/${locale}`])
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      alternates: {
        languages: alternateLanguages,
      },
    },
  ];
}
