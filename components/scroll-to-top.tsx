'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { isLanguageSwitching } from '@/components/language-switch-provider'

export default function ScrollToTop() {
  const pathname = usePathname()
  const isPopStateRef = useRef(false)
  const currentPathRef = useRef(pathname)

  useEffect(() => {
    // Disable browser's automatic uncoordinated scroll restoration
    // so it doesn't fight React/GSAP mounting lifecycle
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handlePopState = () => {
      isPopStateRef.current = true
    }

    const saveScroll = () => {
      if (typeof window !== 'undefined' && window.location) {
        const key = `scroll_pos_${window.location.pathname}`
        sessionStorage.setItem(key, String(window.scrollY))
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', saveScroll)

    // Debounced scroll listener to continuously keep the latest position saved
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(saveScroll, 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', saveScroll)
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    // If language switch is in progress, LanguageSwitchProvider handles scroll
    if (isLanguageSwitching) return

    // Save previous path scroll before switching
    if (currentPathRef.current && currentPathRef.current !== pathname) {
      sessionStorage.setItem(`scroll_pos_${currentPathRef.current}`, String(window.scrollY))
    }
    currentPathRef.current = pathname

    if (isPopStateRef.current) {
      // User navigated BACK or FORWARD: restore exact position where they left off
      isPopStateRef.current = false
      const saved = sessionStorage.getItem(`scroll_pos_${pathname}`)
      if (saved !== null) {
        const targetY = parseFloat(saved)

        // Restore immediately
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })

        // Re-apply across animation frames to prevent GSAP or async content from pushing scroll to random spot
        const frameId = requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })
        })

        const t1 = setTimeout(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })
          // If GSAP ScrollTrigger exists, refresh its calculations at the restored position
          if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
            (window as any).ScrollTrigger.refresh()
          }
        }, 50)

        const t2 = setTimeout(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })
        }, 150)

        return () => {
          cancelAnimationFrame(frameId)
          clearTimeout(t1)
          clearTimeout(t2)
        }
      }
    } else {
      // User clicked a normal link (PUSH navigation): scroll cleanly to top
      if (typeof window !== 'undefined' && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
  }, [pathname])

  return null
}
