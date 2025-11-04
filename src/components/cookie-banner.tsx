"use client";

import { useTranslations } from "next-intl";
import { useState, createContext, useContext } from "react";
import { X } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

const ConsentTypes = {
  full: "full",
  essential: "essential",
};

type ConsentStatus = keyof typeof ConsentTypes | null;

type CookieConsentContextType = {
  showBanner: () => void;
  acceptAll: () => void;
  essentialOnly: () => void;
  consentStatus: ConsentStatus;
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null,
);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [manuallyShown, setManuallyShown] = useState(false);
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => {
    if (typeof window !== "undefined") {
      return validateConsent(localStorage.getItem("cookie-consent"));
    }
    return null;
  });

  const bannerVisible = (!consentStatus && scriptReady) || manuallyShown;

  const showBanner = () => {
    setManuallyShown(true);
  };

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "full");
    setConsentStatus("full");
    setManuallyShown(false);
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const essentialOnly = () => {
    localStorage.setItem("cookie-consent", "essential");
    setConsentStatus("essential");
    setManuallyShown(false);
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", { analytics_storage: "denied" });
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{ showBanner, acceptAll, essentialOnly, consentStatus }}
    >
      <Script id="cookie-consent-script" onReady={() => setScriptReady(true)}>
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

      {bannerVisible && <CookieBanner />}
      {children}
    </CookieConsentContext.Provider>
  );
}

function CookieBanner() {
  const t = useTranslations("Components.CookieBanner");
  const { acceptAll, essentialOnly } = useCookieConsent();

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

function isConsentType(val: unknown): val is keyof typeof ConsentTypes {
  return typeof val === "string" && val in ConsentTypes;
}

function validateConsent(val: unknown): ConsentStatus {
  return isConsentType(val) ? val : null;
}
