import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'

export default function About() {
  const t = useTranslations('About')

  return (
    <section
      id="about"
      className="bg-background dark:bg-background w-full scroll-mt-16 py-8 md:scroll-mt-0 md:py-16 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(auto,400px)] lg:gap-12 xl:grid-cols-[1fr_minmax(auto,600px)]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="font-verdana text-3xl font-bold tracking-tighter sm:text-5xl">
                {t('title')}
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">{t('description')}</p>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{t('approach.title')}</h3>
                  <p>{t('approach.content')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{t('values.title')}</h3>
                  <p>{t('values.content')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{t('expertise.title')}</h3>
                  <p>{t('expertise.content')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <Image
                src="/logo.svg"
                alt={t('logoAlt')}
                title={t('logoTitle')}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 450px"
                loading="lazy"
              />
            </div>
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <Image
                src="/techs.svg"
                alt={t('techsAlt')}
                title={t('techsTitle')}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 450px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
