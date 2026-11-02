"use client";

import { useTheme } from "next-themes";

import { Moon } from "lucide-react";
import { useEffectEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const t = useTranslations("Components.ThemeSwitcher");

  const setToMounted = useEffectEvent(() => {
    if (!mounted) {
      setMounted(true);
    }
  });

  useEffect(() => {
    // Mount detection to avoid hydration mismatch with next-themes; the
    // synchronous setState here is intentional and runs once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToMounted();
  }, []);

  if (!mounted) {
    return (
      <div className="flex space-x-2 opacity-0">
        <Moon className="mr-2 h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Moon className="mr-2 h-4 w-4 text-muted-foreground" />
      <Switch
        id="theme-switcher"
        aria-label={t("switchTheme")}
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />
    </div>
  );
}
