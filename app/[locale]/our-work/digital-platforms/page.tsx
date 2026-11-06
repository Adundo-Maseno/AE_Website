'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { RollingText } from '@/components/ui/rolling-text'
import Image from 'next/image'

export default function DigitalPlatformsPage() {
  const t = useTranslations('DigitalPlatforms')
  const locale = useLocale()

  const defaultPlatforms = [
    {
      title: t('platforms.3.title'),
      description: `${t('platforms.3.description')} ${t('sp_desc')}`,
      image: '/platforms/mbeguchoice.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.3.tag'),
      link: "https://mbeguchoice.com",
    },
    {
      title: t('platforms.0.title'),
      description: t('platforms.0.description'),
      image: '/platforms/africa-crop-variety-catalogue.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.0.tag'),
      link: "https://varietycatalogues.com/about/"
    },
    {
      title: t('platforms.1.title'),
      description: t('platforms.1.description'),
      image: '/platforms/kenya-plant-variety-list.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.1.tag'),
      link: "https://catalogueapi.varietycatalogues.com/"
    },
    {
      title: t('platforms.2.title'),
      description: t('platforms.2.description'),
      image: '/platforms/tanzania-agri-inputs-platform.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.2.tag'),
      link: "https://tanzaniaagri-inputsplatform.com/"
    },
    {
      title: t('platforms.4.title'),
      description: t('platforms.4.description'),
      image: '/platforms/seed-sector-platform-kenya.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.4.tag'),
    },
    {
      title: t('platforms.5.title'),
      description: t('platforms.5.description'),
      image: '/platforms/uganda-agri-inputs-platform.png',
      imageType: 'screenshot' as const,
      tag: t('platforms.5.tag'),
    },
    {
      title: t('platforms.6.title'),
      description: t('platforms.6.description'),
      image: '/m3-logo.svg',
      imageType: 'logo' as const,
      tag: t('platforms.6.tag'),
    },
  ]

  const [platformList, setPlatformList] = useState(defaultPlatforms)

  useEffect(() => {
    setPlatformList(defaultPlatforms)
    fetch(`/api/practice-projects?slug=digital-platforms&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setPlatformList(
            data.projects.map((p: any) => ({
              title: p.title,
              description: p.description,
              image: p.image,
              imageType: p.imageType || 'screenshot',
              tag: p.tag,
              link: p.link || undefined,
            }))
          )
        }
      })
      .catch(() => {})
  }, [locale, t])

  return (
    <>
      <main className="bg-white min-h-[100dvh]" suppressHydrationWarning>
        {/* ─── Hero ─── */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-green/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
              {/* Left: Title */}
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
                  {t('hero_title')}
                </h1>
                <p className="text-primary-green font-semibold text-base sm:text-lg tracking-wide">
                  {t('hero_subtitle')}
                </p>
              </motion.div>

              {/* Right: Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 lg:pt-16 relative"
              >
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-primary-green/20" />
                <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                  {t('hero_desc')}
                </p>
                <div className="lg:pl-10 mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-primary-green text-white rounded-full font-semibold text-sm hover:bg-deep-forest transition-colors"
                  >
                    <RollingText className="gap-2">
                      {t('req_platform')}
                      <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 border border-charcoal/20 text-charcoal rounded-full font-semibold text-sm hover:bg-charcoal/5 transition-colors"
                  >
                    <RollingText className="gap-2">
                      {t('our_work')}
                    </RollingText>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Platform Capabilities — Bento Grid ─── */}
        <section className="w-full pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2" dangerouslySetInnerHTML={{ __html: t('dp_title') }} />
            </motion.div>

            {/* Bento-style grid: first card (MbeguChoice) spans 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platformList.map((platform, idx) => {
                const Icon = ('icon' in platform ? (platform.icon as React.ComponentType<{ size?: number }>) : null)
                const isScreenshot = platform.imageType === 'screenshot' && platform.image
                const isLogo = platform.imageType === 'logo' && platform.image
                const isFirst = idx === 0

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`group rounded-[32px] bg-mist border border-mist hover:border-primary-green/20 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-6 sm:p-8 lg:p-10 flex flex-col ${isFirst ? 'md:col-span-2 md:flex-row md:items-center md:gap-12' : ''
                      }`}
                  >
                    {/* Visual Media Header */}
                    {isScreenshot ? (
                      <div className={isFirst ? "w-full md:w-[420px] lg:w-[480px] flex-shrink-0" : "relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md border border-stone-200/80 bg-white mb-6 transition-all duration-300"}>
                        <div className={isFirst ? "relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md border border-stone-200/80 bg-white transition-all duration-300" : "relative w-full h-full"}>
                          <Image
                            src={platform.image!}
                            alt={platform.title}
                            fill
                            sizes={isFirst ? "(max-width: 768px) 100vw, 480px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"}
                            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      </div>
                    ) : isLogo ? (
                      <div className={isFirst ? "w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm" : "relative w-full h-36 sm:h-44 lg:h-48 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md border border-stone-200/80 bg-white mb-6 flex items-center justify-center p-6 transition-all duration-300"}>
                        <div className="relative w-full h-20 sm:h-24 lg:h-28 flex items-center justify-center">
                          <Image
                            src={platform.image!}
                            alt={platform.title}
                            width={240}
                            height={120}
                            className="max-h-full max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    ) : Icon ? (
                      <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green mb-6">
                        <Icon size={30} />
                      </div>
                    ) : null}

                    {/* Content */}
                    <div className={isFirst ? "mt-6 md:mt-0 flex-1 flex flex-col justify-center" : "flex-1 flex flex-col"}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-serif font-bold text-deep-forest tracking-tight pb-2">
                          {platform.title}
                        </h3>
                        {platform.link && (
                          <a
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-green hover:opacity-80 transition-opacity mt-1 flex-shrink-0"
                            aria-label={`Open ${platform.title}`}
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      <p className="mt-3 text-charcoal/80 font-light leading-relaxed flex-1 text-[14.5px] min-[1440px]:text-base">
                        {platform.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>


        {/* ─── CTA ─── */}
        <section className="w-full">
          <div className="w-full bg-deep-forest py-16 lg:py-20 px-6 relative overflow-hidden">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(58,180,74,0.12),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(36,132,198,0.08),transparent_50%)] pointer-events-none" />

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilterDP">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterDP)" />
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold text-white tracking-tight pb-2 max-w-3xl mx-auto leading-tight" dangerouslySetInnerHTML={{ __html: t('cta_title') }} />
                <p className="text-white/60 font-light text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg max-w-xl mx-auto leading-relaxed">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-white text-deep-forest rounded-full font-semibold text-sm hover:bg-primary-green hover:text-white transition-colors"
                  >
                    <RollingText className="gap-2">
                      {t('cta_btn1')}
                      <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
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
