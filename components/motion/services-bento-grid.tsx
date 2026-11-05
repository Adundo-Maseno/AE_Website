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
      className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between h-full p-6 sm:p-7 lg:p-8 bg-white border border-stone-200/90 text-[#0F1F15] hover:border-[#1A4D2E]/40 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${pillar.gridClass}`}
      style={{ boxShadow: '0 2px 6px rgba(15, 31, 21, 0.03), 0 12px 24px -8px rgba(15, 31, 21, 0.04)' }}
    >
      <div className="space-y-3">
        <h3
          className="font-serif tracking-tight font-bold leading-[1.22] text-[#0F1F15] group-hover:text-[#1A4D2E] transition-colors duration-200 text-balance"
          style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
        >
          {pillar.title}
        </h3>
        <p className="font-sans font-normal leading-[1.65] text-[#2A3830] text-[15px] min-[1440px]:text-base text-pretty">
          {pillar.desc}
        </p>
      </div>

      <div className="pt-5 lg:pt-6 mt-6 flex items-center justify-between border-t border-stone-100">
        <Link
          href={pillar.route}
          className="inline-flex items-center justify-between w-full gap-2 text-sm font-semibold text-[#0F1F15] group-hover:text-[#1A4D2E] transition-colors duration-200 active:scale-[0.99] rounded-sm"
        >
          <span>Explore practice</span>
          <span className="w-8 h-8 rounded-full bg-[#F8F6F0] border border-stone-200/80 text-[#0F1F15] group-hover:bg-[#0F1F15] group-hover:border-[#0F1F15] group-hover:text-white inline-flex items-center justify-center transition-colors duration-200">
            <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0" />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default function ServicesBentoGrid() {
  const t = useTranslations('About')

  const cardLayouts = [
    {
      gridClass: 'md:col-span-3',
      route: '/our-work/project-implementation',
    },
    {
      gridClass: 'md:col-span-3',
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
      gridClass: 'md:col-span-2',
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
    <section className="w-full py-14 md:py-18 lg:py-24 bg-[#F8F6F0] relative border-t border-stone-200/70">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 md:gap-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-tight text-balance">
              {t('expertise_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] font-normal leading-[1.6] text-pretty">
              {t('expertise_desc')}
            </p>
          </div>

          <Link
            href="/our-work"
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0F1F15] hover:bg-[#1A4D2E] text-white text-sm font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
          >
            <span>{t('view_services')}</span>
            <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0" />
          </Link>
        </div>

        {/* 6-Column Asymmetric Bento Matrix (2 x 3-col top row, 3 x 2-col bottom row) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 lg:gap-6 items-stretch">
          {pillars.map((pillar) => (
            <BentoCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
