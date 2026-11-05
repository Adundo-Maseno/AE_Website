'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'our_work', href: '/our-work' },
  { key: 'our_team', href: '/our-team' },
  { key: 'our_impact', href: '/our-impact' },
  { key: 'resources', href: '/resources' },
]
import LiquidGlass from './liquid-glass'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute w-5 h-[2px] bg-deep-forest rounded-full"
    />
    <motion.span
      animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute w-5 h-[2px] bg-deep-forest rounded-full"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute w-5 h-[2px] bg-deep-forest rounded-full"
    />
  </div>
);

export default function Header() {
  const t = useTranslations('Header')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [clickedPath, setClickedPath] = useState<string | null>(null)
  const pathname = usePathname()

  const [dimensions, setDimensions] = useState({ width: 0, left: 0, height: 0, top: 0 })
  const buttonRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const containerRef = useRef<HTMLElement>(null)

  // Clear the optimistic click state once Next.js has successfully navigated to the new path
  useEffect(() => {
    setClickedPath(null)
  }, [pathname])

  const handleMouseLeave = () => {
    setHoveredPath(null)
  }

  const activePath = clickedPath || pathname

  // Update dimensions whenever active path changes or on mount
  useEffect(() => {
    const updateDimensions = () => {
      const activeItem = navItems.find((item) => activePath === item.href || (activePath.startsWith(item.href) && item.href !== '/'))
      if (!activeItem) return

      const selectedButton = buttonRefs.current.get(activeItem.href)
      const container = containerRef.current

      if (selectedButton && container) {
        setDimensions({
          width: selectedButton.offsetWidth,
          height: selectedButton.offsetHeight,
          left: selectedButton.offsetLeft,
          top: selectedButton.offsetTop,
        })
      }
    }

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions()
    })

    // Update on resize
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [activePath])

  return (
    <>
      {/* Persistent Hamburger Overlay (Stays fixed while navbar slides) */}
      <div className="sticky top-0 z-[100] h-0 w-full pointer-events-none">
        <div className="h-[var(--header-height)] flex justify-center items-center w-full">
          <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('aria_close_menu') : t('aria_open_menu')}
              aria-expanded={isOpen}
              className="lg:hidden pointer-events-auto p-3 text-deep-forest hover:bg-black/5 rounded-full transition-colors flex items-center justify-center min-w-[48px] min-h-[48px]"
            >
              <AnimatedHamburger isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-[80] w-full pointer-events-none">
        <motion.div
          animate={{
            y: isOpen ? '-100%' : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
          className="w-full pointer-events-auto"
        >
          <LiquidGlass
            className="flex justify-center items-center h-[var(--header-height)] w-full"
            blurAmount={0.25}
            elasticity={0}
            displacementScale={100}
            saturation={120}
            cornerRadius={0}
            padding="0"
            overLight={false}
          >
            <header className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => { setClickedPath('/'); }} aria-label="Agri Experience" className="flex items-center group">
                  <Image
                    src="/Newsletters.svg"
                    alt="Agri Experience Logo"
                    width={500}
                    height={240}
                    priority
                    style={{ width: 'auto' }}
                    className="h-[3.5rem] lg:h-[4.5rem] w-auto block transition-transform group-hover:scale-105"
                  />
                </Link>

                {/* Desktop Navigation - AngelList Style Pill */}
                <nav
                  className="hidden lg:flex items-center bg-black/5 rounded-full px-1.5 py-1.5 border border-black/5 relative"
                  onMouseLeave={handleMouseLeave}
                  ref={containerRef as any}
                >
                  {/* Active Pill Highlight */}
                  {activePath && dimensions.width > 0 && (
                    <motion.div
                      layoutId="active-nav-pill"
                      animate={{
                        width: dimensions.width,
                        height: dimensions.height,
                        x: dimensions.left,
                        y: dimensions.top,
                        scaleX: [1, 1.15, 1],
                        opacity: 1,
                      }}
                      className="absolute top-0 left-0 z-0 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        scaleX: { duration: 0.4, ease: "easeInOut" }
                      }}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                      }}
                    />
                  )}

                  {navItems.map((item) => {
                    const isActive = activePath === item.href || (activePath.startsWith(item.href) && item.href !== '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setClickedPath(item.href); }}
                        onMouseEnter={() => setHoveredPath(item.href)}
                        ref={(el) => {
                          if (el) buttonRefs.current.set(item.href, el);
                          else buttonRefs.current.delete(item.href);
                        }}
                        className={`relative px-3 py-1.5 min-[1440px]:px-4 min-[1440px]:py-2 text-[13px] min-[1440px]:text-sm font-medium rounded-full transition-colors duration-150 ${isActive
                          ? 'text-deep-forest z-20'
                          : 'text-charcoal/80 hover:text-deep-forest z-10'
                          }`}
                      >
                        {/* Hover pill — always rendered, toggled via opacity to avoid remount flash */}
                        <motion.div
                          className="absolute inset-0 bg-black/5 rounded-full -z-20 pointer-events-none"
                          animate={{ opacity: hoveredPath === item.href && !isActive ? 1 : 0 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          initial={false}
                        />
                        {t(item.key as any)}
                      </Link>
                    )
                  })}
                </nav>

                <div className="flex items-center gap-4">
                  <Link
                    href="/contact"
                    onClick={() => { setClickedPath('/contact'); }}
                    className="group relative overflow-hidden hidden lg:inline-flex px-4 py-2 min-[1440px]:px-5 min-[1440px]:py-2.5 bg-deep-forest text-white rounded-full text-[13px] min-[1440px]:text-sm font-medium hover:bg-deep-forest/90 transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] shadow-xs hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/60 focus-visible:ring-offset-2"
                  >
                    <RollingText>
                      {t('contact')}
                    </RollingText>
                  </Link>

                  {/* Invisible spacer so layout doesn't shift — the real button is in the sticky layer above */}
                  <div className="lg:hidden w-10 h-10" />
                </div>
              </div>
            </header>

          </LiquidGlass>
        </motion.div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-deep-forest/40 backdrop-blur-sm z-[85] lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white shadow-2xl z-[90] lg:hidden flex flex-col overflow-hidden rounded-none border-l border-white/20"
            >
              {/* Sidebar Header — logo only, vertically aligned to match navbar */}
              <div className="h-[var(--header-height)] flex items-center px-6 shrink-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link href="/" onClick={() => setIsOpen(false)} aria-label="Agri Experience">
                    <Image
                      src="/Newsletters.svg"
                      alt="Agri Experience Logo"
                      width={500}
                      height={240}
                      style={{ width: 'auto' }}
                      className="h-[52px] sm:h-[56px] w-auto block"
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col">
                <nav className="flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setIsOpen(false); }}
                        className={`px-4 py-3.5 text-base font-semibold rounded-2xl transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center justify-between ${isActive
                          ? 'text-deep-forest bg-[#F1F6F3]'
                          : 'text-charcoal/80 hover:text-deep-forest hover:bg-black/5'
                          }`}
                      >
                        {t(item.key as any)}
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-green" />}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-auto pt-8 pb-2">
                  <Link
                    href="/contact"
                    onClick={() => { setIsOpen(false); }}
                    className="group relative overflow-hidden w-full py-4 bg-deep-forest text-white rounded-2xl text-base font-semibold text-center shadow-lg flex items-center justify-center transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-deep-forest/95 active:scale-[0.98]"
                  >
                    <RollingText>
                      {t('contact')}
                    </RollingText>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
