import "@/app/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { CookieConsentProvider } from "@/components/cookie-banner";
import Navbar from "@/components/navbar";
import Footer from "@/components/sections/footer";
import { Toaster } from "@/components/ui/sonner";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { DEFAULT_LOCALE, routing } from "@/i18n/routing";

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
  const keywords = (t.raw("keywords") as string[] | undefined) ?? [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vintech.no";
  const localePath = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const canonicalUrl = siteUrl + localePath;

  const alternateLanguages = Object.fromEntries(
    routing.locales.map((loc) => {
      const path = loc === DEFAULT_LOCALE ? "" : `/${loc}`;
      return [loc, `${siteUrl}${path}`];
    })
  );

  return {
    title: t("title"),
    description: t("description"),
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: new URL(canonicalUrl),
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
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
      {/* Must run before GTM so tags never see an unset consent state */}
      <Script id="consent-default" strategy="beforeInteractive">
        {CONSENT_DEFAULT_SCRIPT}
      </Script>
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
