"use client";

import { Languages } from "lucide-react";
import { Locale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALE_TO_DISPLAY_NAME: Record<Locale, string> = {
  no: "Norsk",
  en: "English",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const t = useTranslations("Components.LocaleSwitcher");

  const getDisplayName = (locale: Locale) => {
    return LOCALE_TO_DISPLAY_NAME[locale] || locale;
  };

  const onSelect = (locale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale },
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={isPending}
          size="icon"
          aria-label={t("switchLanguage")}
        >
          <Languages className="mx-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">
          {t("value")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            className={locale === l ? "bg-accent" : ""}
            onClick={() => {
              onSelect(l);
            }}
          >
            {getDisplayName(l)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
