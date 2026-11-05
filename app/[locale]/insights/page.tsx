'use client'
import { RollingText } from '@/components/ui/rolling-text';

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function InsightsPage() {
  const t = useTranslations('Insights')
  const insights = [
    {
      title: t('i1_title'),
      summary: t('i1_summary'),
      link: 'http://www.seedsectorplatformkenya.com/',
    },
    {
      title: t('i2_title'),
      summary: t('i2_summary'),
    },
    {
      title: t('i3_title'),
      summary: t('i3_summary'),
    },
  ]

  return (
    <>      <main className="bg-white min-h-[100dvh]">
        {/* Hero */}
        <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden border-b border-mist">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--mist)_0%,transparent_50%)] opacity-50"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-4 lg:space-y-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif font-bold text-deep-forest tracking-tight pb-1"
              style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-charcoal/85 max-w-2xl mx-auto font-normal leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Insights */}
        <section className="w-full py-12 lg:py-16 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {insights.map((item, idx) => (
                <motion.article
                  key={`${item.title}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-[24px] lg:rounded-[28px] overflow-hidden bg-mist border border-mist hover:border-primary-green/20 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200"
                >
                  <div className="p-6 lg:p-8 space-y-5 flex flex-col h-full justify-between">
                    <div className="flex-1 space-y-3">
                      <h3
                        className="font-serif font-bold text-deep-forest leading-snug"
                        style={{ fontSize: 'clamp(1.15rem, 1.05rem + 0.3vw, 1.35rem)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-charcoal/85 font-normal leading-relaxed text-[14.5px] min-[1440px]:text-base">
                        {item.summary}
                      </p>
                    </div>
                    {item.link && (
                      <div className="pt-4 border-t border-primary-green/10">
                        <a
                          href={item.link}
                          className="group inline-flex items-center gap-1.5 text-primary-green font-bold text-sm hover:text-deep-forest transition-colors"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t('visit_resource')}{' '}
                          <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-10 lg:py-16 bg-mist border-t border-mist">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 lg:space-y-6">
            <h2
              className="font-serif font-bold text-deep-forest"
              style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
            >
              {t('cta_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 font-normal leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <Link
                href="/resources"
                className="overflow-hidden relative group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-deep-forest text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-deep-forest/20 shadow-md"
              >
<RollingText className="gap-1.5 sm:gap-2">
                {t('view_results')}
                <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
              </RollingText>
</Link>
            </div>
          </div>
        </section>
      </main>    </>
  )
}
