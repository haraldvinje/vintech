import "@/app/globals.css";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { LOCALES_EXLCUDED_DEFAULT, routing } from "@/i18n/routing";
import { CookieConsentProvider } from "@/components/cookie-banner";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/sections/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("Metadata");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vintech.no";
  const alternateLanguages = Object.fromEntries(
    LOCALES_EXLCUDED_DEFAULT.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(siteUrl),
    alternates: {
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: new URL(`/${locale}`, siteUrl),
      siteName: "VinTech",
      locale,
      images: [
        {
          url: new URL("/logo-light.png", siteUrl).toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? ""}
      />
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <CookieConsentProvider>
              <main className="min-h-screen flex flex-col mx-auto">
                <Navbar />
                {children}
              </main>
              <Footer />
            </CookieConsentProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
