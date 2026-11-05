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
    <>      <main className="bg-white min-h-[100dvh]">

        {/* Editorial Hero */}
        <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden snap-start scroll-mt-20 bg-mist">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2">
                {t('title')}
              </h1>
              <p className="text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed font-light">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* <OfficePlantsGallery showMissionVision /> */}
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


        {/* Core Values Grid */}
        <section className="w-full py-16 lg:py-16 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2">{t('values_title')}</h2>
              </div>
              
              <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden">
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

        {/* CTA */}
        <section className="w-full py-10 lg:py-20 bg-mist">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-10">
            <h2 className="text-deep-forest text-2xl sm:text-3xl lg:text-5xl font-serif">{t('cta_title')}</h2>
            <p className="text-lg lg:text-2xl text-charcoal/80 font-light leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2 sm:pt-6">
              <Link href="/contact" className="overflow-hidden relative group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-deep-forest text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-deep-forest/20">
<RollingText className="gap-1.5 sm:gap-2">
                {t('get_in_touch')}
                <ArrowRight size={18} className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
              </RollingText>
</Link>
            </div>
          </div>
        </section>
      </main>    </>
  )
}
