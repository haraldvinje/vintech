import { Brain, Cloud, Code, LucideRoute } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Services() {
  const t = useTranslations('Services')

  const services = [
    {
      type: 'development',
      icon: <Code className="text-primary h-8 w-8" />,
      title: t('items.development.title'),
      description: t('items.development.description')
    },
    {
      type: 'cloud',
      icon: <Cloud className="text-primary h-8 w-8" />,
      title: t('items.cloud.title'),
      description: t('items.cloud.description')
    },
    {
      type: 'strategy',
      icon: <LucideRoute className="text-primary h-8 w-8" />,
      title: t('items.strategy.title'),
      description: t('items.strategy.description')
    },
    {
      type: 'machineLearning',
      icon: <Brain className="text-primary h-8 w-8" />,
      title: t('items.machineLearning.title'),
      description: t('items.machineLearning.description')
    }
  ]

  return (
    <section
      id="services"
      className="bg-muted/50 dark:bg-muted/10 w-full scroll-mt-16 py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-verdana text-3xl font-bold tracking-tighter sm:text-5xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('description')}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {services.map((service) => (
            <Card key={service.type} className="flex h-full flex-col">
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
  )
}
