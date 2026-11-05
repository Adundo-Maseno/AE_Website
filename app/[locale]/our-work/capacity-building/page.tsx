'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  BookOpen,
  GraduationCap,
  Users,
  Radio,
  Sprout,
  ArrowRight,
  Target,
  Download,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function CapacityBuildingPage() {
  const t = useTranslations('CapacityBuilding')

  const trainingPrograms = [
    {
      title: t('tp.0.title'),
      description: t('tp.0.description'),
      detail: t('tp.0.detail'),
      icon: BookOpen,
    },
    {
      title: t('tp.1.title'),
      description: t('tp.1.description'),
      detail: t('tp.1.detail'),
      icon: GraduationCap,
    },
    {
      title: t('tp.2.title'),
      description: t('tp.2.description'),
      detail: t('tp.2.detail'),
      icon: Sprout,
    },
    {
      title: t('tp.3.title'),
      description: t('tp.3.description'),
      detail: t('tp.3.detail'),
      icon: Target,
    },
    {
      title: t('tp.4.title'),
      description: t('tp.4.description'),
      detail: t('tp.4.detail'),
      icon: Users,
    },
    {
      title: t('tp.5.title'),
      description: t('tp.5.description'),
      detail: t('tp.5.detail'),
      icon: Radio,
    },
  ]

  return (
    <>
      <main className="bg-white min-h-[100dvh]">
        {/* ===== HERO ===== */}
        <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-charcoal/[0.03] rounded-full blur-[120px] -translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-green/[0.04] rounded-full blur-[100px] translate-y-1/3 translate-x-1/4 pointer-events-none" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #1c2b22 1px, transparent 1px), linear-gradient(to bottom, #1c2b22 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
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
                  {t('hero_title1')}
                  <br />
                  <span className="text-[#9A3412]/80">{t('hero_title2')}</span>
                </h1>
                <p className="text-[#9A3412] font-semibold text-base sm:text-lg tracking-wide">
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
                <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-[#9A3412]/20" />
                <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                  {t('hero_desc')}
                </p>
                <div className="lg:pl-10 mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#9A3412] text-white rounded-full font-semibold text-sm hover:bg-[#7C2D12] transition-colors shadow-sm shadow-[#9A3412]/20"
                  >
<RollingText className="gap-2">
                    {t('start_conversation')}
                    <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                  </RollingText>
</Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-[#9A3412]/30 text-[#9A3412] rounded-full font-semibold text-sm hover:bg-[#FAF0E9] transition-colors"
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

        {/* ===== INTRO / OVERVIEW ===== */}
        <section className="w-full py-20 bg-mist/50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2 mb-8">
                {t('phil_title')}
              </h2>
              <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg text-charcoal/80 font-light leading-relaxed">
                {t('phil_desc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== TRAINING PROGRAMS GRID ===== */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2 mb-6">
                {t('tp_title')}
              </h2>
              <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg text-charcoal/70 font-light max-w-2xl mx-auto">
                {t('tp_desc')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingPrograms.map((program, idx) => {
                const Icon = program.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group rounded-[32px] bg-mist border border-mist hover:border-[#9A3412]/30 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-6 sm:p-8 lg:p-10 flex flex-col"
                  >
                    {/* Icon with number badge */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#9A3412]/10 border border-[#9A3412]/20 flex items-center justify-center text-[#9A3412] group-hover:bg-[#9A3412] group-hover:text-white transition duration-200">
                        <Icon size={24} />
                      </div>
                      <span className="font-data text-4xl text-[#9A3412]/15 group-hover:text-[#9A3412]/25 transition-colors leading-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-deep-forest mb-3 tracking-tight pb-2">
                      {program.title}
                    </h3>
                    <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base mb-4 flex-1">
                      {program.description}
                    </p>
                    <p className="text-charcoal/50 text-sm font-light italic border-t border-charcoal/5 pt-4">
                      {program.detail}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== TOOLBOX HIGHLIGHT ===== */}
        <section className="w-full py-16 lg:py-24 bg-mist/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left — Narrative details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6"
              >
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2 leading-tight">
                  {t('th_title')}
                </h2>
                <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-xl text-charcoal/80 font-light leading-relaxed">
                  {t('th_desc')}
                </p>
              </motion.div>

              {/* Right — Featured Resource Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-6"
              >
                <div className="relative rounded-[32px] bg-gradient-to-br from-charcoal via-deep-forest to-charcoal p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-2xl border border-white/10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-stretch">
                  {/* Decorative background texture & glows */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-blue/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Book Cover Image */}
                  <div className="relative w-44 sm:w-48 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                    <Image
                      src="/images/african-seed-company-toolbox-cover.jpg"
                      alt="The African Seed Company Toolbox Cover - Gates Foundation Agricultural Development, 2009"
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 176px, 192px"
                    />
                  </div>

                  {/* Card Content & Details */}
                  <div className="flex flex-col justify-between flex-1 relative z-10 space-y-4 text-center sm:text-left">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight mb-2">
                        {t('fr_title')}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base lg:text-[14.5px] min-[1440px]:text-base font-normal leading-relaxed">
                        {t('fr_subtitle')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/15">
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                        {t('fr_author_label')}
                      </p>
                      <p className="text-white font-medium text-sm sm:text-base mb-4">
                        {t('fr_author_name')}{' '}
                        <span className="text-white/70 font-normal">
                          {t('fr_author_desc')}
                        </span>
                      </p>

                      <a
                        href="/resources/The-African-Seed-Company-Toolbox-52-Tools-Every-Seed-Company-Manager-Should-Know-How-to-Use-ENGLISH.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-green hover:bg-primary-green/90 text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 w-full sm:w-auto"
                      >
                        <Download size={14} />
                        <span>Download Resource</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
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
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseCTA_CB">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseCTA_CB)" />
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
                <h2 className="text-2xl sm:text-3xl lg:text-6xl font-serif font-bold text-white tracking-tight pb-2 max-w-3xl mx-auto leading-tight">
                  {t('cta_title')}
                </h2>
                <p className="text-white/60 font-light text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg max-w-xl mx-auto leading-relaxed">
                  {t('cta_desc')}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#9A3412] text-white rounded-full font-semibold text-sm hover:bg-[#7C2D12] transition-colors shadow-lg shadow-[#9A3412]/20"
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
