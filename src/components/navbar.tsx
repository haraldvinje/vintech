'use client'

import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import LocaleSwitcher from '@/components/locale-switcher'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { getScrollbarWidth } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const t = useTranslations('Navbar')

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth()
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)

    const isBodyScrollable = () => {
      if (typeof window !== 'undefined') {
        return document.body.scrollHeight > window.innerHeight
      }
      return false
    }

    if (isMenuOpen) {
      if (isBodyScrollable()) {
        document.body.style.paddingRight = `var(--scrollbar-width)`
      }
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      const mdBreakpoint = 768
      if (window.innerWidth >= mdBreakpoint && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

    const isHomePage = pathname === '/'

    if (isHomePage) {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })

          window.history.pushState(null, '', `#${targetId}`)
        }
      }, 100)
    } else {
      router.push(`/#${targetId}`)
    }
  }

  const desktopLinkStyle = 'text-sm font-medium hover:underline underline-offset-4'
  const mobileLinkStyle = 'text-xl font-medium hover:underline underline-offset-4'

  return (
    <header
      className={`bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full backdrop-blur transition ${
        hasScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container m-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex w-1/4 items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="mx-2 text-xl font-bold">{t('brand')}</span>
          </Link>
        </div>

        <div className="flex w-1/2 items-center justify-center gap-2 md:hidden">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>

        <nav className="hidden w-1/2 items-center justify-center gap-6 md:flex">
          <Link href="/#about" className={desktopLinkStyle}>
            {t('about')}
          </Link>
          <Link href="/#services" className={desktopLinkStyle}>
            {t('services')}
          </Link>
          <Link href="/#contact" className={desktopLinkStyle}>
            {t('contact')}
          </Link>
        </nav>
        <div className="mx-2 hidden w-1/4 items-center justify-end gap-2 md:flex">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <div className="flex w-1/4 items-center justify-end gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">{t('toggleMenu')}</span>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="bg-background fixed inset-0 z-[100] md:hidden">
            <div className="mx-auto flex h-16 w-full items-center justify-between">
              <Link
                href="/"
                className="flex w-1/4 items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mx-2 text-xl font-bold">{t('brand')}</span>
              </Link>

              <div className="flex w-1/2 items-center justify-center gap-2 md:hidden">
                <LocaleSwitcher />
                <ThemeSwitcher />
              </div>
              <div className="flex w-1/4 justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">{t('closeMenu')}</span>
                </Button>
              </div>
            </div>

            <div className="bg-background mx-auto flex h-[calc(100vh-4rem)] w-full flex-col px-4 py-8">
              <nav className="mb-8 flex flex-col items-center justify-center gap-6">
                <Link
                  href="/#services"
                  className={mobileLinkStyle}
                  onClick={(e) => handleNavClick(e, 'services')}
                >
                  {t('services')}
                </Link>
                <Link
                  href="/#about"
                  className={mobileLinkStyle}
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  {t('about')}
                </Link>
                <Link
                  href="/#contact"
                  className={mobileLinkStyle}
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  {t('contact')}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
