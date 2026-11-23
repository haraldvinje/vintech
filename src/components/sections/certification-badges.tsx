import Image from 'next/image'
import { useTranslations } from 'next-intl'
import solutionsArchitect from '@/../public/certifications/aws-solutions-architect-professional.png'
import machineLearning from '@/../public/certifications/aws-machine-learning-specialty.png'

const badges = [
  {
    key: 'solutionsArchitect',
    image: solutionsArchitect,
    url: 'https://www.credly.com/badges/635b5c93-2687-4fdb-bfce-9ce34e0135ed'
  },
  {
    key: 'machineLearning',
    image: machineLearning,
    url: 'https://www.credly.com/badges/ec33816d-9fc2-4bd8-86a5-5fc22232f0d6'
  }
] as const

export default function CertificationBadges() {
  const t = useTranslations('About.certifications')

  return (
    <div className="mt-4">
      <h4 className="mb-2 font-semibold">{t('title')}</h4>
      <ul className="flex flex-wrap gap-4">
        {badges.map(({ key, image, url }) => (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-ring block rounded-md focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image src={image} alt={t(`${key}.alt`)} width={96} height={96} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
