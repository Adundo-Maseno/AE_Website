'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import {
  Tractor,
  Target,
  Users,
  ClipboardList,
  MapPin,
  Sprout,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Shield,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ProjectImplementationPage() {
  const t = useTranslations('ProjectImplementation')
  const locale = useLocale()

  const implementationAreas = [
    {
      icon: Sprout,
      title: t('areas.0.title'),
      points: [
        t('areas.0.points.0'),
        t('areas.0.points.1'),
        t('areas.0.points.2'),
      ],
    },
    {
      icon: MapPin,
      title: t('areas.1.title'),
      points: [
        t('areas.1.points.0'),
        t('areas.1.points.1'),
        t('areas.1.points.2'),
      ],
    },
    {
      icon: Handshake,
      title: t('areas.2.title'),
      points: [
        t('areas.2.points.0'),
        t('areas.2.points.1'),
        t('areas.2.points.2'),
      ],
    },
    {
      icon: Shield,
      title: t('areas.3.title'),
      points: [
        t('areas.3.points.0'),
        t('areas.3.points.1'),
        t('areas.3.points.2'),
      ],
    },
    {
      icon: ClipboardList,
      title: t('areas.4.title'),
      points: [
        t('areas.4.points.0'),
        t('areas.4.points.1'),
        t('areas.4.points.2'),
      ],
    },
    {
      icon: Target,
      title: t('areas.5.title'),
      points: [
        t('areas.5.points.0'),
        t('areas.5.points.1'),
        t('areas.5.points.2'),
      ],
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: t('processSteps.0.title'),
      description: t('processSteps.0.description'),
      icon: Target,
    },
    {
      step: '02',
      title: t('processSteps.1.title'),
      description: t('processSteps.1.description'),
      icon: Users,
    },
    {
      step: '03',
      title: t('processSteps.2.title'),
      description: t('processSteps.2.description'),
      icon: Tractor,
    },
    {
      step: '04',
      title: t('processSteps.3.title'),
      description: t('processSteps.3.description'),
      icon: ClipboardList,
    },
  ]

  const defaultProjects = [
    {
      title: 'The African Seed Access Index (TASAI) Rollout',
      tag: 'Multi-Country Implementation',
      description: 'Designed and implemented pilot field methodologies measuring seed industry vibrancy and regulatory efficiency across target African countries.',
      image: '/platforms/africa-crop-variety-catalogue.png',
      imageType: 'screenshot' as const,
      link: '/our-work/project-implementation',
    },
    {
      title: 'National Scratch-Off Seed Labeling Implementation',
      tag: 'Regulatory Field Ops',
      description: 'Field-level technical implementation of tamper-proof security labels in Kenya, establishing an operational verification pipeline.',
      image: '/m3-logo.svg',
      imageType: 'logo' as const,
      link: '/resources/Case-Study-Scratch-Off-Labels-for-Certified-Seed-in-Kenya.pdf',
    },
    {
      title: 'Crop Variety Performance Trials & Field Days',
      tag: 'Field Demonstrations',
      description: 'Multi-location farmer demonstration plots comparing newly released climate-smart hybrids against legacy cultivars.',
      image: '/platforms/tanzania-agri-inputs-platform.png',
      imageType: 'screenshot' as const,
      link: '/our-work/project-implementation',
    },
  ]

  const [projectList, setProjectList] = useState(defaultProjects)

  useEffect(() => {
    let isMounted = true
    fetch(`/api/practice-projects?slug=project-implementation&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(
            data.projects.map((p: any) => ({
              title: p.title,
              tag: p.tag || 'Field Implementation',
              description: p.description,
              image: p.image || '/platforms/africa-crop-variety-catalogue.png',
              imageType: (p.imageType || 'screenshot') as any,
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
        {/* ─── Hero ─── */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-green/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

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
                  dangerouslySetInnerHTML={{ __html: t('hero_title') }}
                />
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
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-primary-green text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <RollingText className="gap-2">
                      {t('req_impl')}
                      <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-charcoal/20 text-deep-forest rounded-full font-semibold text-sm hover:bg-mist transition-colors"
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

        {/* ─── Implementation Areas Grid ─── */}
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
                {t('areas_title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {implementationAreas.map((area, idx) => {
                const IconComponent = area.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group bg-mist rounded-[28px] border border-transparent hover:border-primary-green/20 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-green mb-6 group-hover:bg-primary-green group-hover:text-white transition-colors duration-200">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-deep-forest mb-4">
                        {area.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 border-t border-charcoal/5 pt-4">
                      {area.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2 text-charcoal/70 text-sm font-light"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-primary-green mt-1 shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Flagship Implementation Case Study: Tanzania Seed Systems Transformation ─── */}
        <section className="w-full py-16 lg:py-24 bg-[#F4F8F0] border-y border-[#E0EAD8] overflow-hidden">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
            {/* ── Title & Explainer Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 max-w-4xl"
            >
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-1"
                style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3.5rem)' }}
              >
                {t('cs_title')}
              </h2>

              <div className="space-y-4 text-charcoal/85 font-normal leading-relaxed text-base sm:text-lg lg:text-[17px]">
                <p>{t('cs_desc1')}</p>
                <p>{t('cs_desc2')}</p>
              </div>

              {/* Bottom Action */}
              <div className="pt-2 flex items-center justify-start">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-primary-green text-white rounded-full font-semibold text-sm hover:bg-primary-green/90 transition-all shadow-md"
                >
                  <RollingText className="gap-2">
                    {t('cs_cta_btn')}
                    <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                  </RollingText>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Featured Field Projects & Operations (Dynamic CMS) ─── */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="inline-block px-3 py-1 bg-primary-green/10 text-primary-green text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Execution & Operations
              </div>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
              >
                Featured Implementation Projects
              </h2>
              <p className="text-charcoal/70 max-w-2xl mt-2 text-base">
                Operational rollouts, multi-country seed index surveys, and verified traceability pilots executed directly in the field.
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
                  className="group flex flex-col bg-[#FAF9F5] rounded-3xl border border-black/[0.06] overflow-hidden hover:border-primary-green/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-green shadow-sm">
                      {proj.tag}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-deep-forest mb-2 group-hover:text-primary-green transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-charcoal/75 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-black/[0.05]">
                      <Link
                        href={proj.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-green hover:text-deep-forest transition-colors"
                      >
                        <span>View Engagement</span>
                        <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="w-full">
          <div className="w-full bg-deep-forest overflow-hidden relative">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(58,180,74,0.08),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(36,132,198,0.05),transparent_50%)] pointer-events-none" />

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilterCTA">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#noiseFilterCTA)"
                />
              </svg>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white tracking-tight pb-2 mb-6" dangerouslySetInnerHTML={{ __html: t('cta_title') }} />
                <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg text-white/60 font-light leading-relaxed mb-10 max-w-xl mx-auto">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-primary-green text-white rounded-full font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-green/20 transition-all"
                  >
                    <RollingText className="gap-2">
                      {t('cta_btn1')}
                      <ArrowRight size={18} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all"
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
