"use client";

import { Mail, Book } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/components/cookie-banner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
  const { showBanner } = useCookieConsent();

  return (
    <footer className="w-full py-8 bg-background border-t">
      <div className="container mx-auto w-4/5 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 gap-2">
            <h3 className="text-lg font-bold">{t("company.name")}</h3>
            <p className="text-sm text-muted-foreground w-3/4">
              {t("company.description")}
            </p>
          </div>

          <div className="space-y-3 md:mx-auto">
            <h3 className="text-lg font-bold">{t("quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:ml-auto">
            <h3 className="text-lg font-bold">{t("connect.title")}</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/haraldvinje"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.github")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubLogoIcon className="h-5 w-5" />
                <span className="sr-only">{t("connect.github")}</span>
              </Link>
              <Link
                href="https://linkedin.com/in/haraldvinje"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.linkedin")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
                <span className="sr-only">{t("connect.linkedin")}</span>
              </Link>
              <Link
                href="mailto:harald@vintech.no"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.email")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">{t("connect.email")}</span>
              </Link>
              <Link
                href="https://tekblogg.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.blog")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Book className="h-5 w-5" />
                <span className="sr-only">{t("connect.blog")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <p>{t("copyright", { year: currentYear })}</p>

          <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50"></div>

          <Link
            href="/privacy-policy"
            className="hover:text-foreground transition-colors"
          >
            {t("privacyPolicyLink")}
          </Link>

          <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50"></div>

          <Button
            onClick={showBanner}
            variant="link"
            className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground hover:no-underline transition-colors"
            aria-label={t("cookieConsentSettings")}
          >
            {t("cookieConsentSettings")}
          </Button>
        </div>
      </div>
    </footer>
  );
}
