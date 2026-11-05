'use client'

import InteractiveMap from '@/components/interactive-map'
import ImpactAlignment from '@/components/motion/impact-alignment'
import { motion } from 'framer-motion'
import { Heart, Globe, Leaf, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

export default function OurImpactPage() {
  const t = useTranslations('OurImpact')
  const impactAreas = [
    {
      icon: Leaf,
      title: 'Social Impact',
      description: 'Improve smallholder farmer and seed producer productivity.',
      highlights: [
        'Focus on practical, field-based solutions',
        'Improve access to high quality seed',
        'Support sustainable livelihood gains',
      ],
    },
    {
      icon: Heart,
      title: 'Capacity Development',
      description: 'Build local talent among permanent seed sector stakeholders.',
      highlights: [
        'Strengthen local institutions and service providers',
        'Equip leaders and technical teams',
        'Invest in long-term sector capability',
      ],
    },
    {
      icon: Globe,
      title: 'Organizational Strength',
      description: 'Maintain the financial stability needed to sustain our work.',
      highlights: [
        'Deliver high-quality, experience-based analysis',
        'Provide actionable recommendations',
        'Support implementation with partners',
      ],
    },
  ]

  return (
    <>
      <main className="bg-white min-h-[100dvh]">
        <InteractiveMap />

        {/* Strategic Impact Pillars (3-Column Consultancy Framework) */}
        <section className="w-full py-14 sm:py-18 lg:py-24 bg-[#F8F6F0] border-t border-b border-stone-200/80 relative overflow-hidden">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-14 gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="editorial-eyebrow">Theory of Change</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-tight">
                  Three Pillars of Lasting Sector Impact
                </h2>
              </div>
              <p className="text-base sm:text-lg text-charcoal/80 max-w-md leading-relaxed">
                Every advisory mandate and field intervention is structured around measurable productivity, institutional capability, and long-term market resilience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
              {impactAreas.map((area, idx) => {
                const Icon = area.icon
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="consultancy-card p-6 sm:p-7 lg:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A4D2E]/75 tabular-nums">
                          Pillar // 0{idx + 1}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#F8F6F0] border border-stone-200/80 flex items-center justify-center text-[#1A4D2E]">
                          <Icon size={17} />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1F15] mb-2.5">
                        {area.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-charcoal/85 leading-relaxed mb-5">
                        {area.description}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-stone-100">
                      {area.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-charcoal/80 font-medium leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-green mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Impact Alignment */}
        <ImpactAlignment />

        {/* Executive CTA */}
        <section className="w-full py-14 sm:py-20 lg:py-24 bg-[#0F1F15] text-white overflow-hidden relative border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--primary-green)_0%,transparent_50%)] opacity-15 pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-green">
              Evidence-Driven Seed Systems Transformation
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 1.35rem + 2.1vw, 3.25rem)' }}
            >
              {t('cta_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed max-w-3xl mx-auto">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-3.5 sm:gap-5 justify-center pt-2">
              <Link
                href="/our-work"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-primary-green text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-green/25"
              >
                <RollingText className="gap-2">
                  {t('work_with_us')}
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                </RollingText>
              </Link>
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 border border-white/30 text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:bg-white/10 backdrop-blur-sm"
              >
                <RollingText className="gap-2">
                  {t('partner_with_us')}
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                </RollingText>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
