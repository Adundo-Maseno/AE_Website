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
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function StakeholderConveningsPage() {
  const t = useTranslations('StakeholderConvenings')
  const locale = useLocale()

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

  const defaultProjects = [
    {
      title: 'Regional Seed Regulatory Harmonization Roundtables',
      tag: 'Regional Dialogue',
      description: 'Facilitating high-level diplomatic and technical convenings to align seed certification, variety cataloguing, and cross-border trade standards.',
      image: '/team/moses2.jpg',
      imageType: 'photo' as const,
      link: '/our-work/stakeholder-convenings',
    },
    {
      title: 'International Seed Industry Learning Trips & Study Tours',
      tag: 'Immersive Study Tours',
      description: 'Designing experiential benchmarking missions for African regulators and executives to leading global seed hubs in the Netherlands, South Africa, and Kenya.',
      image: '/team/mulemia2.jpg',
      imageType: 'photo' as const,
      link: '/our-work/stakeholder-convenings',
    },
    {
      title: 'National Seed Trade Association Strategic Assemblies',
      tag: 'Industry Leadership',
      description: 'Convening private seed companies, breeders, and policymakers to establish shared investment priorities and advocacy agendas.',
      image: '/team/claire2.jpg',
      imageType: 'photo' as const,
      link: '/our-work/stakeholder-convenings',
    },
  ]

  const [projectList, setProjectList] = useState(defaultProjects)

  useEffect(() => {
    let isMounted = true
    fetch(`/api/practice-projects?slug=stakeholder-convenings&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(
            data.projects.map((p: any) => ({
              title: p.title,
              tag: p.tag || 'High-Impact Convening',
              description: p.description,
              image: p.image || '/team/moses2.jpg',
              imageType: (p.imageType || 'photo') as any,
              link: p.link || '/contact',
            }))
          )
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [locale])

  return (
    <>
      <main className="bg-white min-h-[100dvh]" suppressHydrationWarning>
        {/* ===== HERO ===== */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Decorative background — connected dots pattern */}
          <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-lighter-dark-green/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-blue/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* Dots/network decorative pattern */}
          <div className="absolute top-32 right-20 pointer-events-none opacity-[0.06] hidden lg:block">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <circle cx="50" cy="50" r="4" fill="#05632a" />
              <circle cx="120" cy="80" r="3" fill="#05632a" />
              <circle cx="200" cy="40" r="5" fill="#05632a" />
              <circle cx="80" cy="180" r="3" fill="#05632a" />
              <circle cx="170" cy="150" r="4" fill="#05632a" />
              <circle cx="250" cy="120" r="3" fill="#05632a" />
              <circle cx="130" cy="240" r="4" fill="#05632a" />
              <circle cx="220" cy="220" r="5" fill="#05632a" />
              <line x1="50" y1="50" x2="120" y2="80" stroke="#05632a" strokeWidth="1" />
              <line x1="120" y1="80" x2="200" y2="40" stroke="#05632a" strokeWidth="1" />
              <line x1="120" y1="80" x2="170" y2="150" stroke="#05632a" strokeWidth="1" />
              <line x1="50" y1="50" x2="80" y2="180" stroke="#05632a" strokeWidth="1" />
              <line x1="170" y1="150" x2="250" y2="120" stroke="#05632a" strokeWidth="1" />
              <line x1="80" y1="180" x2="130" y2="240" stroke="#05632a" strokeWidth="1" />
              <line x1="170" y1="150" x2="220" y2="220" stroke="#05632a" strokeWidth="1" />
              <line x1="130" y1="240" x2="220" y2="220" stroke="#05632a" strokeWidth="1" />
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
                  dangerouslySetInnerHTML={{ __html: t('hero_title') }}
                />
                <p className="text-lighter-dark-green font-semibold text-base sm:text-lg tracking-wide">
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
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-lighter-dark-green/20" />
                <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                  {t('hero_desc')}
                </p>
                <div className="lg:pl-10 mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-lighter-dark-green text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <RollingText className="gap-2">
                      {t('convene_with_us')}
                      <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-lighter-dark-green/20 text-lighter-dark-green rounded-full font-semibold text-sm hover:bg-mist transition-colors"
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

        {/* ===== CONVENING TYPES ===== */}
        <section className="w-full pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mb-12 lg:mb-16"
            >
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-2"
                style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
              >
                {t('ct_title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conveningTypes.map((type, idx) => {
                const IconComponent = type.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group bg-mist rounded-[28px] border border-transparent hover:border-lighter-dark-green/20 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-lighter-dark-green mb-6 group-hover:bg-lighter-dark-green group-hover:text-white transition-colors duration-200">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-deep-forest mb-3">
                        {type.title}
                      </h3>
                      <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base mb-4">
                        {type.description}
                      </p>
                    </div>
                    <div>
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

        {/* ===== FEATURED CONVENINGS & TOURS (Dynamic CMS) ===== */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="inline-block px-3 py-1 bg-lighter-dark-green/10 text-lighter-dark-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Convening Portfolio
              </div>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
              >
                Featured Convenings & Learning Delegations
              </h2>
              <p className="text-charcoal/70 max-w-2xl mt-2 text-base">
                Explore our high-level multilateral forums, international benchmarking study missions, and private-public dialogues.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectList.map((proj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group flex flex-col bg-[#FAF9F5] rounded-3xl border border-black/[0.06] overflow-hidden hover:border-lighter-dark-green/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-lighter-dark-green shadow-sm">
                      {proj.tag}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-deep-forest mb-2 group-hover:text-lighter-dark-green transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-charcoal/75 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-black/[0.05]">
                      <Link
                        href={proj.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-lighter-dark-green hover:text-deep-forest transition-colors"
                      >
                        <span>View Convening Details</span>
                        <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
