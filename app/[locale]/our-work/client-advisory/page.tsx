'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ClientAdvisoryPage() {
  const t = useTranslations('ClientAdvisory')
  const locale = useLocale()

  const advisoryServices = [
    {
      title: t('adv_services.0.title'),
      description: t('adv_services.0.description'),
    },
    {
      title: t('adv_services.1.title'),
      description: t('adv_services.1.description'),
    },
    {
      title: t('adv_services.2.title'),
      description: t('adv_services.2.description'),
    },
    {
      title: t('adv_services.3.title'),
      description: t('adv_services.3.description'),
    },
  ]

  const approachPillars = [
    {
      title: t('pillars.0.title'),
      description: t('pillars.0.description'),
    },
    {
      title: t('pillars.1.title'),
      description: t('pillars.1.description'),
    },
    {
      title: t('pillars.2.title'),
      description: t('pillars.2.description'),
    },
  ]

  const regulatoryMilestones = [
    {
      title: t('cs_pillar1_title'),
      desc: t('cs_pillar1_desc'),
    },
    {
      title: t('cs_pillar2_title'),
      desc: t('cs_pillar2_desc'),
    },
    {
      title: t('cs_pillar3_title'),
      desc: t('cs_pillar3_desc'),
    },
    {
      title: t('cs_pillar4_title'),
      desc: t('cs_pillar4_desc'),
    },
  ]

  const defaultProjects = [
    {
      title: 'National Seed Policy & Regulatory Reform Advisory',
      tag: 'Policy Advisory',
      description: 'Guiding ministries of agriculture, donors, and regulatory authorities on seed law revisions, private inspection accreditation, and variety release protocols.',
      image: '/platforms/seed-sector-platform-kenya.png',
      imageType: 'screenshot' as const,
      link: '/contact',
    },
    {
      title: 'Early Generation Seed (EGS) Commercial Financing Models',
      tag: 'Financial Modeling',
      description: 'Advising institutional partners and research institutes on pricing structures, licensing royalties, and revolving fund mechanisms.',
      image: '/team/denis2.jpg',
      imageType: 'photo' as const,
      link: '/contact',
    },
    {
      title: 'Public-Private Commercial Licensing Frameworks',
      tag: 'Commercial Strategy',
      description: 'Structuring commercial licensing agreements between international CGIAR breeders and domestic African seed companies.',
      image: '/team/aline.png',
      imageType: 'photo' as const,
      link: '/contact',
    },
  ]

  const [projectList, setProjectList] = useState(defaultProjects)

  useEffect(() => {
    let isMounted = true
    fetch(`/api/practice-projects?slug=client-advisory&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(
            data.projects.map((p: any) => ({
              title: p.title,
              tag: p.tag || 'Advisory Mandate',
              description: p.description,
              image: p.image || '/platforms/seed-sector-platform-kenya.png',
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
      <main className="bg-white min-h-[100dvh]">
        {/* ─── Hero ─── */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Luxury background accents */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-gold/[0.04] rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-warm-earth/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
                  {t('hero_title1')}
                  <span className="block text-[#435826]">{t('hero_title2')}</span>
                </h1>
                <p className="text-[#435826] font-semibold text-base sm:text-lg tracking-wide">
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
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-[#435826]/20" />
                <div className="lg:pl-10 space-y-4">
                  <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-charcoal/85 leading-relaxed font-normal">
                    {t('hero_desc1')}
                  </p>
                  <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg text-charcoal/85 leading-relaxed font-normal">
                    {t('hero_desc2')}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#435826] text-white rounded-full font-semibold text-sm hover:bg-[#34441B] transition-colors shadow-sm shadow-[#435826]/20"
                    >
                      <RollingText className="gap-2">
                        {t('req_advisory')}
                        <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                      </RollingText>
                    </Link>
                    <Link
                      href="/our-work"
                      className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-[#435826]/30 text-[#435826] rounded-full font-semibold text-sm hover:bg-[#F4F7EE] transition-colors"
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

        {/* ─── Advisory Services Grid ─── */}
        <section className="w-full pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mb-12 lg:mb-16"
            >
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-2"
                style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
                dangerouslySetInnerHTML={{ __html: t('adv_services_title') }}
              />
            </motion.div>

            {/* 2-column staggered layout for premium feel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {advisoryServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`rounded-[32px] border border-mist hover:border-[#435826]/30 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-6 sm:p-8 lg:p-10 group relative overflow-hidden ${
                    idx % 2 === 0 ? 'bg-mist' : 'bg-[#F4F7EE]/40'
                  }`}
                >
                  {/* Subtle olive corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#435826]/[0.04] rounded-bl-[80px] pointer-events-none group-hover:bg-[#435826]/[0.08] transition duration-300" />

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-serif font-bold text-deep-forest group-hover:text-[#435826] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Our Approach — 3 Pillars ─── */}
        <section className="w-full pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2">
                {t('oa_title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {approachPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Vertical olive line on top */}
                  <div className="w-12 h-1 bg-[#435826] rounded-full mb-8 group-hover:w-20 transition-all duration-300" />

                  {/* Step number */}
                  <div className="text-6xl font-data text-[#435826]/15 leading-none mb-4">
                    0{idx + 1}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-deep-forest mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Flagship Advisory Case Study: KEPHIS Regulatory Modernization ─── */}
        <section className="w-full py-16 lg:py-24 bg-[#F4F7EE] border-y border-[#E2E8D8] overflow-hidden">
          <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
            {/* ── Title & Explainer Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4 max-w-4xl"
            >
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-1"
                style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3.5rem)' }}
              >
                {t('cs_title')}
              </h2>

              <div className="space-y-3 text-charcoal/85 font-normal leading-relaxed text-base sm:text-lg lg:text-[17px]">
                <p>{t('cs_desc1')}</p>
                <p>{t('cs_desc2')}</p>
              </div>
            </motion.div>

            {/* ── 4 Strategic Advisory Impact Cards ── */}
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-forest mb-5 px-0.5">
                {t('cs_section_title')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4 xl:gap-5">
                {regulatoryMilestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.06] hover:border-[#435826]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-deep-forest mb-2.5 leading-snug group-hover:text-[#435826] transition-colors">
                        {milestone.title}
                      </h4>

                      <p className="text-xs sm:text-[13.5px] text-charcoal/75 font-light leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 flex items-center justify-start">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-[#435826] text-white rounded-full font-semibold text-sm hover:bg-[#34441B] transition-all shadow-md"
              >
                <RollingText className="gap-2">
                  {t('cs_cta_btn')}
                  <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                </RollingText>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Featured Advisory Projects & Engagements (Dynamic CMS) ─── */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <div className="inline-block px-3 py-1 bg-[#435826]/10 text-[#435826] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Strategic Engagements
              </div>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
              >
                Featured Advisory Mandates
              </h2>
              <p className="text-charcoal/70 max-w-2xl mt-2 text-base">
                Discover our recent high-level advisory assignments with governments, development partners, and commercial seed stakeholders.
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
                  className="group flex flex-col bg-[#FAF9F5] rounded-3xl border border-black/[0.06] overflow-hidden hover:border-[#435826]/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#435826] shadow-sm">
                      {proj.tag}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-deep-forest mb-2 group-hover:text-[#435826] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-charcoal/75 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-black/[0.05]">
                      <Link
                        href={proj.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#435826] hover:text-[#34441B] transition-colors"
                      >
                        <span>Learn More</span>
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
                <filter id="noiseFilterAdvCTA">
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
                  filter="url(#noiseFilterAdvCTA)"
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
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#435826] text-white rounded-full font-semibold hover:bg-[#34441B] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#435826]/20 transition-all"
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
