'use client'

import { RollingText } from '@/components/ui/rolling-text';
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ScrollAccordion } from '@/components/motion/scroll-accordion'
import ServicesBentoGrid from '@/components/motion/services-bento-grid'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('About')
  return (
    <>
      <main className="bg-white min-h-[100dvh]">
        {/* Editorial Consultancy Masthead */}
        <section className="relative w-full pt-14 lg:pt-24 pb-12 lg:pb-16 overflow-hidden snap-start scroll-mt-20 bg-[#F8F6F0] border-b border-stone-200/80">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/[0.04] rounded-full blur-[110px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16"
            >
              <div className="flex-1 space-y-4">
                <span className="editorial-eyebrow">Firm Profile &amp; Mandate</span>
                <h1
                  className="font-serif text-[#0F1F15] font-bold tracking-tight leading-[1.1]"
                  style={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.8vw, 4.5rem)' }}
                >
                  {t('title')}
                </h1>
              </div>

              <div className="flex-1 relative">
                <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-[1.5px] bg-[#1A4D2E]/20" />
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
                  {t('subtitle')}
                </p>
              </div>
            </motion.div>

            {/* Institutional Credentials Bar */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { label: 'Headquarters', value: 'Nairobi, Kenya (Karen)' },
                { label: 'Geographic Scope', value: '15+ Sub-Saharan African Markets' },
                { label: 'Specialization', value: 'Seed Systems & Agricultural Markets' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/70">
                    {item.label}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-[#0F1F15]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Goal Section replaced with ScrollAccordion */}
        <ScrollAccordion
          title={t('title')}
          visionTitle={t('vision_title')}
          visionDesc={t.rich('vision_desc', { strong: (chunks) => <strong className="font-semibold text-deep-forest">{chunks}</strong> })}
          missionTitle={t('mission_title')}
          missionDesc={t('mission_desc')}
          goalTitle={t('goal_title')}
          goalDesc={t('goal_desc').replace(/<br\s*\/?>/g, '')}
        />

        {/* Editorial Bento Expertise Section */}
        <ServicesBentoGrid />

        {/* Core Values Dossier */}
        <section className="w-full py-16 lg:py-24 bg-white relative border-t border-stone-200/70">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="space-y-10 lg:space-y-14">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <span className="editorial-eyebrow">Institutional Culture</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight pb-1">
                  {t('values_title')}
                </h2>
              </div>

              <div className="relative w-full max-w-5xl mx-auto rounded-[28px] overflow-hidden bg-[#F8F6F0] p-3 sm:p-6 border border-stone-200/80 shadow-sm">
                <div className="rounded-2xl overflow-hidden bg-white">
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
          </div>
        </section>

        {/* Executive CTA */}
        <section className="w-full py-14 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_70%)]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-green">
              Partner With Agri Experience
            </span>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {t('cta_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/contact"
                className="overflow-hidden relative group inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary-green text-white rounded-full font-bold text-sm sm:text-base transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary-green/25"
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
    </>
  )
}
