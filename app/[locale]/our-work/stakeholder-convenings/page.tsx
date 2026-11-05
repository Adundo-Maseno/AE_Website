'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import {
  Users,
  MessageCircle,
  Plane,
  Handshake,
  ArrowRight,
  Calendar,
  Compass,
  Award,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function StakeholderConveningsPage() {
  const t = useTranslations('StakeholderConvenings')

  const conveningTypes = [
    {
      title: t('conveningTypes.0.title'),
      description: t('conveningTypes.0.description'),
      detail: t('conveningTypes.0.detail'),
      icon: MessageCircle,
    },
    {
      title: t('conveningTypes.1.title'),
      description: t('conveningTypes.1.description'),
      detail: t('conveningTypes.1.detail'),
      icon: Plane,
    },
    {
      title: t('conveningTypes.2.title'),
      description: t('conveningTypes.2.description'),
      detail: t('conveningTypes.2.detail'),
      icon: Users,
    },
    {
      title: t('conveningTypes.3.title'),
      description: t('conveningTypes.3.description'),
      detail: t('conveningTypes.3.detail'),
      icon: Award,
    },
    {
      title: t('conveningTypes.4.title'),
      description: t('conveningTypes.4.description'),
      detail: t('conveningTypes.4.detail'),
      icon: Handshake,
    },
    {
      title: t('conveningTypes.5.title'),
      description: t('conveningTypes.5.description'),
      detail: t('conveningTypes.5.detail'),
      icon: Calendar,
    },
  ]

  const whyConveningsMatter = [
    {
      title: t('whyConveningsMatter.0.title'),
      description: t('whyConveningsMatter.0.description'),
      icon: Compass,
      accent: 'from-lighter-dark-green/10 to-transparent',
    },
    {
      title: t('whyConveningsMatter.1.title'),
      description: t('whyConveningsMatter.1.description'),
      icon: MessageCircle,
      accent: 'from-primary-blue/10 to-transparent',
    },
    {
      title: t('whyConveningsMatter.2.title'),
      description: t('whyConveningsMatter.2.description'),
      icon: Handshake,
      accent: 'from-accent-gold/10 to-transparent',
    },
  ]

  const regions = [
    { name: t('regions.0.name'), countries: t('regions.0.countries') },
    { name: t('regions.1.name'), countries: t('regions.1.countries') },
    { name: t('regions.2.name'), countries: t('regions.2.countries') },
    { name: t('regions.3.name'), countries: t('regions.3.countries') },
  ]

  return (
    <>
      <main className="bg-white min-h-[100dvh]">
        {/* ===== HERO ===== */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Decorative background — connected dots pattern */}
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-lighter-dark-green/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-blue/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* Dots/network decorative pattern */}
          <div className="absolute top-32 right-20 pointer-events-none opacity-[0.06] hidden lg:block">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <circle cx="50" cy="50" r="4" fill="#05632a" />
              <circle cx="150" cy="30" r="4" fill="#05632a" />
              <circle cx="250" cy="80" r="4" fill="#05632a" />
              <circle cx="100" cy="150" r="4" fill="#05632a" />
              <circle cx="200" cy="180" r="4" fill="#05632a" />
              <circle cx="50" cy="250" r="4" fill="#05632a" />
              <circle cx="250" cy="250" r="4" fill="#05632a" />
              <line x1="50" y1="50" x2="150" y2="30" stroke="#05632a" strokeWidth="1" />
              <line x1="150" y1="30" x2="250" y2="80" stroke="#05632a" strokeWidth="1" />
              <line x1="50" y1="50" x2="100" y2="150" stroke="#05632a" strokeWidth="1" />
              <line x1="100" y1="150" x2="200" y2="180" stroke="#05632a" strokeWidth="1" />
              <line x1="200" y1="180" x2="250" y2="250" stroke="#05632a" strokeWidth="1" />
              <line x1="50" y1="250" x2="100" y2="150" stroke="#05632a" strokeWidth="1" />
              <line x1="150" y1="30" x2="200" y2="180" stroke="#05632a" strokeWidth="1" />
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-4 lg:space-y-6"
              >
                <h1
                  className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                  style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                >
                  {t('hero_title1')},
                  <br />
                  <span className="text-teal-800/80">{t('hero_title2')}.</span>
                </h1>
                <p className="text-teal-800 font-semibold text-base sm:text-lg tracking-wide">
                  {t('hero_subtitle')}
                </p>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 lg:pt-16 relative"
              >
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-teal-800/20" />
                <div className="lg:pl-10 space-y-4">
                  <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal">
                    {t('hero_desc1')}
                  </p>
                  <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal">
                    {t('hero_desc2')}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-teal-700 text-white rounded-full font-semibold text-sm hover:bg-teal-800 transition-colors shadow-sm shadow-teal-700/20"
                    >
                      <RollingText className="gap-2">
                        {t('req_convening')}
                        <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                      </RollingText>
                    </Link>
                    <Link
                      href="/our-work"
                      className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-teal-700/30 text-teal-800 rounded-full font-semibold text-sm hover:bg-teal-50 transition-colors"
                    >
                      <RollingText className="gap-2">
                        {t('our_work')}
                      </RollingText>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ===== CONVENING TYPES GRID ===== */}
        <section className="w-full py-16">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2 mb-6">
                {t('ct_title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {conveningTypes.map((type, idx) => {
                const Icon = type.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group rounded-[32px] bg-mist border border-mist hover:border-lighter-dark-green/20 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-8 lg:p-10 flex flex-col relative overflow-hidden"
                  >
                    {/* Subtle gradient accent on hover */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-lighter-dark-green/[0.04] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Icon row */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-full bg-lighter-dark-green/[0.07] border border-lighter-dark-green/10 flex items-center justify-center text-lighter-dark-green group-hover:bg-lighter-dark-green group-hover:text-white transition duration-200">
                          <Icon size={24} />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-lighter-dark-green/[0.04] flex items-center justify-center">
                          <ArrowRight
                            size={16}
                            className="text-lighter-dark-green/30 group-hover:text-lighter-dark-green transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out"
                          />
                        </div>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-deep-forest mb-3 tracking-tight pb-2">
                        {type.title}
                      </h3>
                      <p className="text-charcoal/75 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base mb-4 flex-1">
                        {type.description}
                      </p>
                      <p className="text-lighter-dark-green/60 text-sm font-light italic border-t border-lighter-dark-green/[0.08] pt-4">
                        {type.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>




        {/* ===== FLAGSHIP EVENT ===== */}
        <section className="w-full py-20 bg-mist">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-deep-forest rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
            >
              {/* Background accents */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-green/[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-lighter-dark-green/[0.1] rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              <div className="flex-1 relative z-10 space-y-6">
                <h3 className="text-3xl lg:text-5xl font-serif font-bold text-white tracking-tight pb-2 leading-tight">
                  {t('sp_title')}
                </h3>
                <p className="text-white/60 font-light text-lg italic">
                  {t('sp_subtitle')}
                </p>
              </div>

              <div className="flex-1 relative z-10 space-y-6 border-l border-white/[0.08] pl-0 lg:pl-12">
                <p className="text-white/80 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                  {t('sp_desc1')}
                </p>
                <p className="text-white/60 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                  {t('sp_desc2')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="w-full relative overflow-hidden">
          <div className="bg-deep-forest py-16 lg:py-20 relative">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,180,74,0.12),_transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(28,43,34,0.4),_transparent_60%)] pointer-events-none" />

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%">
                <filter id="noiseCTA_SC">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseCTA_SC)" />
              </svg>
            </div>

            {/* Decorative connection dots */}
            <div className="absolute top-12 left-12 pointer-events-none opacity-[0.08] hidden lg:block">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="10" cy="10" r="3" fill="white" />
                <circle cx="60" cy="30" r="3" fill="white" />
                <circle cx="110" cy="10" r="3" fill="white" />
                <circle cx="30" cy="80" r="3" fill="white" />
                <circle cx="90" cy="100" r="3" fill="white" />
                <line x1="10" y1="10" x2="60" y2="30" stroke="white" strokeWidth="1" />
                <line x1="60" y1="30" x2="110" y2="10" stroke="white" strokeWidth="1" />
                <line x1="10" y1="10" x2="30" y2="80" stroke="white" strokeWidth="1" />
                <line x1="60" y1="30" x2="90" y2="100" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white tracking-tight pb-2 max-w-3xl mx-auto leading-tight" dangerouslySetInnerHTML={{ __html: t('cta_title') }} />
                <p className="text-white/60 font-light text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg max-w-xl mx-auto leading-relaxed">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-white text-deep-forest rounded-full font-semibold text-sm hover:bg-primary-green hover:text-white transition-colors"
                  >
                    <RollingText className="gap-2">
                      {t('cta_btn1')}
                      <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    <RollingText className="gap-2">
                      {t('cta_btn2')}
                    </RollingText>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
