'use client'

import { useTranslations } from 'next-intl'
import { useState, createContext, useContext, useSyncExternalStore } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ConsentTypes = {
  full: 'full',
  essential: 'essential'
}

type ConsentStatus = keyof typeof ConsentTypes | null

type CookieConsentContextType = {
  showBanner: () => void
  acceptAll: () => void
  essentialOnly: () => void
  consentStatus: ConsentStatus
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => {
    if (typeof window !== 'undefined') {
      return validateConsent(localStorage.getItem('cookie-consent'))
    }
    return null
  })

  const shouldShowBanner = consentStatus === null && isClient

  const showBanner = () => {
    setConsentStatus(null)
  }

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'full')
    setConsentStatus('full')
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'granted' })
    }
  }

  const essentialOnly = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setConsentStatus('essential')
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', { analytics_storage: 'denied' })
    }
  }

  return (
    <CookieConsentContext.Provider value={{ showBanner, acceptAll, essentialOnly, consentStatus }}>
      {shouldShowBanner && <CookieBanner />}
      {children}
    </CookieConsentContext.Provider>
  )
}

function CookieBanner() {
  const t = useTranslations('Components.CookieBanner')
  const { acceptAll, essentialOnly } = useCookieConsent()

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex-1">
          <h3 className="mb-2 font-bold">{t('title')}</h3>
          <p className="text-muted-foreground text-sm">{t('description')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={acceptAll}>{t('acceptAll')}</Button>
          <Button variant="outline" onClick={essentialOnly}>
            {t('essentialOnly')}
          </Button>
          <Button variant="ghost" size="icon" onClick={essentialOnly} className="md:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function subscribeNoop() {
  return () => {}
}

function isConsentType(val: unknown): val is keyof typeof ConsentTypes {
  return typeof val === 'string' && val in ConsentTypes
}

function validateConsent(val: unknown): ConsentStatus {
  return isConsentType(val) ? val : null
}
