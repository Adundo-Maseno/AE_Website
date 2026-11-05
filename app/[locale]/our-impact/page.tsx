'use client'

import InteractiveMap from '@/components/interactive-map'
import ImpactAlignment from '@/components/motion/impact-alignment'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

export default function OurImpactPage() {
  const t = useTranslations('OurImpact')
  const impactAreas = [
    {
      title: 'Social Impact',
      description: 'Improve smallholder farmer and seed producer productivity.',
      highlights: [
        'Focus on practical, field-based solutions',
        'Improve access to high quality seed',
        'Support sustainable livelihood gains',
      ],
    },
    {
      title: 'Capacity Development',
      description: 'Build local talent among permanent seed sector stakeholders.',
      highlights: [
        'Strengthen local institutions and service providers',
        'Equip leaders and technical teams',
        'Invest in long-term sector capability',
      ],
    },
    {
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
    <main className="bg-white min-h-[100dvh]">
      <InteractiveMap />

      {/* Strategic Impact Framework — Open Architectural Columns (No card-in-card or icon-card tropes) */}
      <section className="w-full py-14 sm:py-18 lg:py-24 bg-[#F8F6F0] border-t border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-tight max-w-xl">
              How We Measure Lasting Sector Change
            </h2>
            <p className="text-base sm:text-lg text-[#2A3830] max-w-md leading-[1.6]">
              Every advisory mandate and field intervention is structured around measurable productivity, institutional capability, and long-term market resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200/90 border-t border-b border-stone-200/90 bg-white rounded-2xl overflow-hidden">
            {impactAreas.map((area) => (
              <div
                key={area.title}
                className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1F15]">
                    {area.title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-[#2A3830] leading-[1.6]">
                    {area.description}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-5 border-t border-stone-100">
                  {area.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#2A3830] font-normal leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A4D2E] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Alignment */}
      <ImpactAlignment />

      {/* Executive CTA */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-[#2A4735]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-7">
          <h2
            className="font-serif font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(1.85rem, 1.35rem + 2.1vw, 3.25rem)' }}
          >
            {t('cta_title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#D5E0D9] font-normal leading-[1.65] tracking-[0.01em] max-w-2xl mx-auto">
            {t('cta_desc')}
          </p>
          <div className="flex flex-row flex-wrap gap-3.5 sm:gap-5 justify-center pt-2">
            <Link
              href="/our-work"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-primary-green text-[#0F1F15] rounded-full font-bold text-sm sm:text-base transition-[transform,background-color] duration-200 hover:bg-[#45c456] active:scale-[0.98]"
            >
              <RollingText className="gap-2">
                {t('work_with_us')}
                <ArrowRight size={18} className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
              </RollingText>
            </Link>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 border border-[#3A5A46] text-white rounded-full font-semibold text-sm sm:text-base transition-[transform,background-color,border-color] duration-200 hover:bg-[#162B1E] hover:border-[#527A61] active:scale-[0.98]"
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
  )
}
