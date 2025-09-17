import { defineRouting } from "next-intl/routing";

export const LOCALES = ["no", "en"] as const;
export const DEFAULT_LOCALE = "no" as const;
export const LOCALES_EXLCUDED_DEFAULT = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
);

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
  localePrefix: "as-needed",
  localeDetection: false,
});
