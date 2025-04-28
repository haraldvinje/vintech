"use client";

import LocaleSwitcher from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky h-16 top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition ${
        hasScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-full w-full items-center m-auto justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl mx-2">{t("brand")}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("about")}
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("services")}
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            {t("contact")}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
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
            <div className="container mx-auto flex h-16 items-center justify-between border-b">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-verdana font-bold text-xl">{t("brand")}</span>
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

            <div className="container bg-background mx-auto px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
              <nav className="flex flex-col gap-6 items-center justify-center mb-8">
                <Link
                  href="#services"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("services")}
                </Link>
                <Link
                  href="#about"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("about")}
                </Link>
                <Link
                  href="#contact"
                  className="text-xl font-medium hover:underline underline-offset-4"
                  onClick={() => setIsMenuOpen(false)}
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