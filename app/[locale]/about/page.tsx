'use client'

import { RollingText } from '@/components/ui/rolling-text'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ScrollAccordion } from '@/components/motion/scroll-accordion'
import ServicesBentoGrid from '@/components/motion/services-bento-grid'
import { useTranslations, useLocale } from 'next-intl'
import { DynamicCustomSections } from '@/components/cms/dynamic-custom-sections'

export default function AboutPage() {
  const t = useTranslations('About')
  const locale = useLocale()
  return (
    <main className="bg-white min-h-[100dvh]">
      {/* Masthead */}
      <section className="relative w-full pt-14 lg:pt-24 pb-12 lg:pb-16 overflow-hidden snap-start scroll-mt-20 bg-[#F8F6F0] border-b border-stone-200/80">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16"
          >
            <div className="flex-1">
              <h1
                className="font-serif text-[#0F1F15] font-bold tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.8vw, 4.5rem)' }}
              >
                {t('title')}
              </h1>
            </div>

            <div className="flex-1 relative">
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-stone-300" />
              <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] leading-[1.6] font-normal lg:pl-10">
                {t('subtitle')}
              </p>
            </div>
          </motion.div>

          {/* Institutional Facts Row */}
          <dl className="mt-10 pt-6 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div>
              <dt className="text-xs font-medium text-[#46584D] mb-1">Headquarters</dt>
              <dd className="font-serif text-base sm:text-lg font-bold text-[#0F1F15]">Nairobi, Kenya (Karen)</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-[#46584D] mb-1">Geographic footprint</dt>
              <dd className="font-serif text-base sm:text-lg font-bold text-[#0F1F15] tabular-nums">20+ Sub-Saharan African markets</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-[#46584D] mb-1">Core mandate</dt>
              <dd className="font-serif text-base sm:text-lg font-bold text-[#0F1F15]">Seed systems &amp; agricultural markets</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Mission, Vision, Goal Section */}
      <ScrollAccordion
        title={t('title')}
        visionTitle={t('vision_title')}
        visionDesc={t.rich('vision_desc', { strong: (chunks) => <strong className="font-semibold text-[#0F1F15]">{chunks}</strong> })}
        missionTitle={t('mission_title')}
        missionDesc={t('mission_desc')}
        goalTitle={t('goal_title')}
        goalDesc={t('goal_desc').replace(/<br\s*\/?>/g, '')}
      />

      {/* Expertise Section */}
      <ServicesBentoGrid />

      {/* Core Values */}
      <section className="w-full py-16 lg:py-24 bg-white relative border-t border-stone-200/70">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="space-y-10 lg:space-y-14">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight">
                {t('values_title')}
              </h2>
            </div>

            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-stone-200/80">
              <Image
                src="/our-values.png"
                alt="Our Core Values"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic CMS Sections for About */}
      <DynamicCustomSections page="about" locale={locale} />

      {/* Executive CTA */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-[#2A4735]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-7">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#D5E0D9] font-normal leading-[1.65] tracking-[0.01em] max-w-2xl mx-auto">
            {t('cta_desc')}
          </p>
          <div className="flex flex-row flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/contact"
              className="overflow-hidden relative group inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary-green text-[#0F1F15] rounded-full font-bold text-sm sm:text-base transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#45c456] active:scale-[0.98]"
            >
              <RollingText className="gap-2">
                {t('get_in_touch')}
                <ArrowRight size={18} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
              </RollingText>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
