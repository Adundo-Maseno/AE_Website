'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export interface ServicePillar {
  key: string
  title: string
  desc: string
  gridClass: string
  route: string
}

interface BentoCardProps {
  pillar: ServicePillar
}

function BentoCard({ pillar }: BentoCardProps) {
  return (
    <div
      className={`group relative rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden flex flex-col justify-between h-full p-5 sm:p-7 lg:p-7 xl:p-9 bg-white border border-stone-200/80 text-deep-forest shadow-sm hover:shadow-xl hover:border-primary-green/30 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${pillar.gridClass}`}
    >
      {/* Content */}
      <div className="space-y-3">
        <h3
          className="font-serif tracking-tight font-bold leading-[1.25] text-deep-forest group-hover:text-primary-green transition-colors duration-200 text-balance"
          style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
        >
          {pillar.title}
        </h3>
        <p
          className="font-sans font-normal leading-relaxed text-charcoal/90 text-[14.5px] min-[1440px]:text-[15.5px] text-pretty"
        >
          {pillar.desc}
        </p>
      </div>

      {/* Bottom Footer: Aligned in exact same row across all cards */}
      <div className="pt-5 lg:pt-6 mt-auto flex items-center justify-end border-t border-stone-100">
        <Link
          href={pillar.route}
          className="inline-flex items-center gap-2 text-sm lg:text-[14.5px] font-bold text-[#1A4D2E] group-hover:text-primary-green transition-[color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 rounded-sm"
        >
          <span>Explore Domain</span>
          <ArrowRight size={15} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0" />
        </Link>
      </div>
    </div>
  )
}

export default function ServicesBentoGrid() {
  const t = useTranslations('About')

  const cardLayouts = [
    {
      gridClass: 'md:col-span-2',
      route: '/our-work/project-implementation',
    },
    {
      gridClass: 'md:col-span-2',
      route: '/our-work/client-advisory',
    },
    {
      gridClass: 'md:col-span-2',
      route: '/our-work/capacity-building',
    },
    {
      gridClass: 'md:col-span-2',
      route: '/our-work/technical-studies',
    },
    {
      gridClass: 'md:col-span-2 md:col-start-2',
      route: '/our-work/digital-platforms',
    },
  ]

  const rawCards = (t.raw('expertise_cards') as Array<{ title: string; desc: string }>) || []
  const pillars: ServicePillar[] = rawCards.slice(0, 5).map((card, idx) => ({
    key: String(idx),
    title: card.title,
    desc: card.desc,
    gridClass: cardLayouts[idx]?.gridClass || 'md:col-span-2',
    route: cardLayouts[idx]?.route || '/our-work',
  }))

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 2xl:py-24 bg-[#F8F6F0] relative border-t border-stone-200/60 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3ab44a]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2484c6]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 md:gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1A15] tracking-tight pb-1 leading-tight text-balance">
              {t('expertise_title')}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-stone-700 font-normal leading-relaxed text-pretty">
              {t('expertise_desc')}
            </p>
          </div>

          <Link
            href="/our-work"
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0F1A15] hover:bg-[#1A4D2E] text-white text-xs sm:text-sm font-semibold tracking-wide transition-[transform,background-color,box-shadow] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
          >
            <span>{t('view_services')}</span>
            <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0" />
          </Link>
        </div>

        {/* 2-Column Layout with the last unpaired card centered */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {pillars.map((pillar) => (
            <BentoCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
