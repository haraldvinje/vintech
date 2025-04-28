import en from "@/../messages/en.json";
import formats from "@/i18n/request";
import { routing } from "@/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
    Locale: (typeof routing.locales)[number];
  }
}
