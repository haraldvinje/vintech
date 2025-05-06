import type { MetadataRoute } from "next";
import { LOCALES_EXLCUDED_DEFAULT } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vintech.no";

  const routes = ["", "privacy-policy"]

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    alternates: {
      languages: getAlternateLanguagesForPath(siteUrl, route),
    },
  }))
}


function getAlternateLanguagesForPath(siteUrl: string, path: string) {
  const alternateLanguages = Object.fromEntries(
    LOCALES_EXLCUDED_DEFAULT.map((locale) => [locale, `${siteUrl}/${locale}/${path}`])
  );

  return alternateLanguages
}
