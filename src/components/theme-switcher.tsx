"use client";

import { useTheme } from "next-themes";

import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />
    </div>
  );
}
