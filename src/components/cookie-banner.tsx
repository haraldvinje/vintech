"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CookieBanner() {
  const t = useTranslations("Components.CookieBanner");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "full");
    setShowBanner(false);
    window.gtag("consent", "update", { analytics_storage: "granted" });
  };

  const essentialOnly = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowBanner(false);
    window.gtag("consent", "update", { analytics_storage: "denied" });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold mb-2">{t("title")}</h3>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={essentialOnly}>
            {t("essentialOnly")}
          </Button>
          <Button onClick={acceptAll}>{t("acceptAll")}</Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={essentialOnly}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}