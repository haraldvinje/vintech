import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import harald from "@/../public/harald.png";

export default function Hero() {
  const t = useTranslations("Hero");
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background dark:bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-verdana">
                {t("title")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t("description")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#contact">
                <Button size="lg">{t("contact")}</Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline">
                  {t("explore")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <Image
                className="rounded-md transition-opacity duration-500 ease-in-out"
                width={600}
                src={harald}
                placeholder="blur"
                blurDataURL={harald.blurDataURL}
                alt={t("imageAlt")}
                title={t("imageTitle")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}