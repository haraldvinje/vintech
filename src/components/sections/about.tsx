import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      className="w-full py-8 md:py-16 lg:py-32 bg-background dark:bg-background md:scroll-mt-0 scroll-mt-16"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(auto,400px)] lg:gap-12 xl:grid-cols-[1fr_minmax(auto,600px)]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-verdana">
                {t("title")}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t("description")}
              </p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("approach.title")}
                  </h3>
                  <p>{t("approach.content")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("values.title")}
                  </h3>
                  <p>{t("values.content")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("expertise.title")}
                  </h3>
                  <p>{t("expertise.content")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <Image
                src="/logo.svg?height=500&width=500"
                alt={t("logoAlt")}
                title={t("logoTitle")}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <Image
                src="/techs.svg?height=500&width=500"
                alt={t("techsAlt")}
                title={t("techsTitle")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
