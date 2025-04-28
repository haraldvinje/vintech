import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "no",
  locales: ["no", "en"],
  localePrefix: "as-needed",
  localeDetection: false,
});
