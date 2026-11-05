'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export interface ServicePillar {
  key: string
  index: string
  domain: string
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
      className={`group relative rounded-2xl sm:rounded-[24px] overflow-hidden flex flex-col justify-between h-full p-6 sm:p-7 lg:p-8 bg-white border border-stone-200/80 text-deep-forest shadow-xs hover:shadow-xl hover:border-[#1A4D2E]/35 hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${pillar.gridClass}`}
    >
      {/* Top Index Bar */}
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-100">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A4D2E]/75">
            {pillar.domain}
          </span>
          <span className="font-mono text-xs font-bold text-primary-green tabular-nums">
            {pillar.index}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3
            className="font-serif tracking-tight font-bold leading-[1.22] text-[#0F1F15] group-hover:text-[#1A4D2E] transition-colors duration-200 text-balance"
            style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
          >
            {pillar.title}
          </h3>
          <p
            className="font-sans font-normal leading-relaxed text-charcoal/85 text-[14.5px] min-[1440px]:text-[15.5px] text-pretty"
          >
            {pillar.desc}
          </p>
        </div>
      </div>

      {/* Bottom Footer: Aligned in exact same row across all cards */}
      <div className="pt-5 lg:pt-6 mt-6 flex items-center justify-between border-t border-stone-100">
        <Link
          href={pillar.route}
          className="inline-flex items-center justify-between w-full gap-2 text-xs lg:text-[13.5px] font-bold uppercase tracking-[0.12em] text-[#0F1F15] group-hover:text-primary-green transition-[color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 rounded-sm"
        >
          <span>Explore Practice</span>
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
      index: '01',
      domain: 'Field Execution',
      gridClass: 'md:col-span-3',
      route: '/our-work/project-implementation',
    },
    {
      index: '02',
      domain: 'Commercial Strategy',
      gridClass: 'md:col-span-3',
      route: '/our-work/client-advisory',
    },
    {
      index: '03',
      domain: 'Organizational Excellence',
      gridClass: 'md:col-span-2',
      route: '/our-work/capacity-building',
    },
    {
      index: '04',
      domain: 'Market Intelligence',
      gridClass: 'md:col-span-2',
      route: '/our-work/technical-studies',
    },
    {
      index: '05',
      domain: 'Data Infrastructure',
      gridClass: 'md:col-span-2',
      route: '/our-work/digital-platforms',
    },
  ]

  const rawCards = (t.raw('expertise_cards') as Array<{ title: string; desc: string }>) || []
  const pillars: ServicePillar[] = rawCards.slice(0, 5).map((card, idx) => ({
    key: String(idx),
    index: cardLayouts[idx]?.index || `0${idx + 1}`,
    domain: cardLayouts[idx]?.domain || 'Advisory Practice',
    title: card.title,
    desc: card.desc,
    gridClass: cardLayouts[idx]?.gridClass || 'md:col-span-2',
    route: cardLayouts[idx]?.route || '/our-work',
  }))

  return (
    <section className="w-full py-14 md:py-18 lg:py-24 bg-[#F8F6F0] relative border-t border-stone-200/70 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3ab44a]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2484c6]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 md:gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-eyebrow">Core Advisory Capabilities</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight pb-1 leading-tight text-balance">
              {t('expertise_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-stone-700 font-normal leading-relaxed text-pretty">
              {t('expertise_desc')}
            </p>
          </div>

          <Link
            href="/our-work"
            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0F1F15] hover:bg-[#1A4D2E] text-white text-xs sm:text-sm font-semibold tracking-wide transition-[transform,background-color,box-shadow] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-md hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
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
