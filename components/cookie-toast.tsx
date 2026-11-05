'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function CookieToast() {
  const t = useTranslations('CookieToast')
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      // Expose reset helper in browser console: window.resetCookieConsent()
      if (typeof window !== 'undefined') {
        ;(window as any).resetCookieConsent = () => {
          localStorage.removeItem('cookie_consent')
          setVisible(true)
          console.log('Cookie consent cleared! Toast is now visible.')
        }
      }

      const consent = localStorage.getItem('cookie_consent')
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 400)
        return () => clearTimeout(timer)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const handleConsent = (status: 'granted' | 'denied') => {
    try {
      localStorage.setItem('cookie_consent', status)
    } catch {
      // Ignore
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: status,
      })
    }

    setVisible(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] w-[calc(100%-2rem)] max-w-[420px] rounded-[24px] bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 shadow-[0_20px_50px_-10px_rgba(26,77,46,0.22),0_1px_2px_rgba(255,255,255,0.9)_inset] overflow-hidden"
        >
          {/* Frosted glass top-edge reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          <div className="p-5 sm:p-6 w-full text-deep-forest text-left relative z-10">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-green/15 flex items-center justify-center text-primary-green shrink-0">
                  <Cookie size={18} />
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-deep-forest tracking-tight">
                  {t('title')}
                </h3>
              </div>

              <button
                onClick={() => handleConsent('denied')}
                className="text-charcoal/50 hover:text-charcoal p-1.5 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs sm:text-[13.5px] text-charcoal/85 font-normal leading-relaxed mb-4 pl-0.5">
              {t('desc')}{' '}
              <Link
                href="/privacy"
                className="text-primary-green font-semibold underline underline-offset-2 hover:text-deep-forest transition-colors"
              >
                {t('privacy_policy')}
              </Link>
              .
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={() => handleConsent('denied')}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-charcoal/70 bg-black/5 hover:bg-black/10 active:scale-95 transition-all duration-200"
              >
                {t('decline')}
              </button>
              <button
                onClick={() => handleConsent('granted')}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-primary-green hover:bg-[#1A4D2E] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
