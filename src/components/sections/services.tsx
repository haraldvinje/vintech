import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cloud, Code, LucideRoute } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: t("items.development.title"),
      description: t("items.development.description"),
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: t("items.cloud.title"),
      description: t("items.cloud.description"),
    },
    {
      icon: <LucideRoute className="h-8 w-8 text-primary" />,
      title: t("items.strategy.title"),
      description: t("items.strategy.description"),
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: t("items.machineLearning.title"),
      description: t("items.machineLearning.description"),
    }
  ];

  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10 scroll-mt-16"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-verdana">
              {t("title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8 mt-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}