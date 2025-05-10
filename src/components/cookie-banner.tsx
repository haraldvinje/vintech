"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [scriptReady, setScriptReady] = useState(false);

  return (
    <>
      <Script onReady={() => setScriptReady(true)} id="cookie-consent-default-no-consent">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}

         gtag('consent', 'default', {
           'ad_storage': 'denied',
           'ad_user_data': 'denied',
           'ad_personalization': 'denied',
           'analytics_storage': 'denied'
         });
        `}
      </Script>
      {scriptReady ? <CookieBannerComponent /> : null}
    </>
  );
}

function CookieBannerComponent() {
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
    if (gtag) {
      gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const essentialOnly = () => {
    localStorage.setItem("cookie-consent", "essential");
    setShowBanner(false);
    if (gtag) {
      gtag("consent", "update", { analytics_storage: "denied" });
    }
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
          <Button onClick={acceptAll}>{t("acceptAll")}</Button>
          <Button variant="outline" onClick={essentialOnly}>
            {t("essentialOnly")}
          </Button>
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
