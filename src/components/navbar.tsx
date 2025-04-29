"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LocaleSwitcher from "@/components/locale-switcher";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { getScrollbarWidth } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );

    const isBodyScrollable = () => {
      if (typeof window !== "undefined") {
        return document.body.scrollHeight > window.innerHeight;
      }
      return false;
    };

    if (isMenuOpen) {
      if (isBodyScrollable()) {
        document.body.style.paddingRight = `var(--scrollbar-width)`;
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      const mdBreakpoint = 768;
      if (window.innerWidth >= mdBreakpoint && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const isHomePage = pathname === "/";

    if (isHomePage) {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          window.history.pushState(null, "", `#${targetId}`);
        }
      }, 100);
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <header
      className={`sticky h-16 top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition ${
        hasScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-full items-center m-auto max-w-7xl justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl mx-2">{t("brand")}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("about")}
          </Link>
          <Link
            href="/#services"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("services")}
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("contact")}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2 mx-2">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("toggleMenu")}</span>
        </Button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-background md:hidden">
            <div className="mx-auto w-full flex h-16 items-center justify-between border-b">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl mx-2">{t("brand")}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">{t("closeMenu")}</span>
              </Button>
            </div>

            <div className="w-full bg-background mx-auto px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
              <nav className="flex flex-col gap-6 items-center justify-center mb-8">
                <Link
                  href="/#services"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "services")}
                >
                  {t("services")}
                </Link>
                <Link
                  href="/#about"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  {t("about")}
                </Link>
                <Link
                  href="/#contact"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  {t("contact")}
                </Link>
              </nav>

              <div className="flex items-center justify-center gap-6 mt-auto mb-8">
                <LocaleSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
