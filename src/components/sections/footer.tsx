import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 bg-background border-t">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{t("company.name")}</h3>
            <p className="text-sm text-muted-foreground w-3/4">
              {t("company.description")}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold">{t("quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold">{t("connect.title")}</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/haraldvinje"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.github")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">{t("connect.github")}</span>
              </Link>
              <Link
                href="https://linkedin.com/in/haraldvinje"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.linkedin")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t("connect.linkedin")}</span>
              </Link>
              <Link
                href="mailto:contact@vintech.no"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("connect.email")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">{t("connect.email")}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}