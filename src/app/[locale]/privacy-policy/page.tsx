import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALES_EXLCUDED_DEFAULT,
  routing,
} from "@/i18n/routing";

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
  const routeName = "privacy-policy";

  const alternateLanguages = Object.fromEntries(
    LOCALES_EXLCUDED_DEFAULT.map((locale) => [
      locale,
      `${siteUrl}/${locale}/${routeName}`,
    ]),
  );

  const resultLocale = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  const urlWithPath = new URL(`${siteUrl}${resultLocale}/${routeName}`);

  return {
    title: t("privacyPolicyPageTitle"),
    description: t("privacyPolicyPageDescription"),
    metadataBase: urlWithPath,
    alternates: {
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("privacyPolicyPageTitle"),
      description: t("privacyPolicyPageDescription"),
      url: urlWithPath,
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

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");

  return (
    <div className="container py-12 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 font-verdana">
        {t("title")}
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">
          {t("lastUpdated")}: {t("updateDate")}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("introduction.title")}
          </h2>
          <p>{t("introduction.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("dataCollection.title")}
          </h2>
          <p>{t("dataCollection.intro")}</p>

          <h3 className="text-xl font-medium mt-6 mb-3">
            {t("dataCollection.contactForm.title")}
          </h3>
          <p>{t("dataCollection.contactForm.content")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("dataCollection.contactForm.items.name")}</li>
            <li>{t("dataCollection.contactForm.items.email")}</li>
            <li>{t("dataCollection.contactForm.items.subject")}</li>
            <li>{t("dataCollection.contactForm.items.message")}</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            {t("dataCollection.analytics.title")}
          </h3>
          <p>{t("dataCollection.analytics.content")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("dataCollection.analytics.items.device")}</li>
            <li>{t("dataCollection.analytics.items.browser")}</li>
            <li>{t("dataCollection.analytics.items.referrer")}</li>
            <li>{t("dataCollection.analytics.items.duration")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("dataUse.title")}</h2>
          <p>{t("dataUse.content")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("dataUse.items.communication")}</li>
            <li>{t("dataUse.items.improvement")}</li>
            <li>{t("dataUse.items.analytics")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("thirdParties.title")}
          </h2>
          <p>{t("thirdParties.intro")}</p>

          <h3 className="text-xl font-medium mt-6 mb-3">
            {t("thirdParties.vercel.title")}
          </h3>
          <p>{t("thirdParties.vercel.content")}</p>
          <p>
            <Link
              href="https://vercel.com/legal/privacy-policy"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("thirdParties.vercel.link")}
            </Link>
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">
            {t("thirdParties.google.title")}
          </h3>
          <p>{t("thirdParties.google.content")}</p>
          <p>
            <Link
              href="https://policies.google.com/privacy"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("thirdParties.google.link")}
            </Link>
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">
            {t("thirdParties.resend.title")}
          </h3>
          <p>{t("thirdParties.resend.content")}</p>
          <p>
            <Link
              href="https://resend.com/legal/privacy-policy"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("thirdParties.resend.link")}
            </Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("cookies.title")}</h2>
          <p>{t("cookies.content")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("cookies.items.necessary")}</li>
            <li>{t("cookies.items.analytics")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("userRights.title")}
          </h2>
          <p>{t("userRights.content")}</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>{t("userRights.items.access")}</li>
            <li>{t("userRights.items.rectification")}</li>
            <li>{t("userRights.items.erasure")}</li>
            <li>{t("userRights.items.restriction")}</li>
            <li>{t("userRights.items.objection")}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("retention.title")}
          </h2>
          <p>{t("retention.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("changes.title")}</h2>
          <p>{t("changes.content")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
          <p>{t("contact.content")}</p>
          <p className="mt-4">
            <strong>Email:</strong>{" "}
            <Link href="mailto:harald@vintech.no" className="text-primary">
              harald@vintech.no
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
