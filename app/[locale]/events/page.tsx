'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Search,
  ChevronDown,
  Globe,
  CheckCircle2,
  X,
} from 'lucide-react'

type FormatFilter = 'all' | 'roundtable' | 'learning_trip' | 'technical_forum' | 'field_day'
type RegionFilter = 'all' | 'east' | 'southern' | 'west_central'

interface UpcomingEventItem {
  id: string
  window: string
  formatKey: FormatFilter
  formatLabel: string
  title: string
  location: string
  country: string
  flag: string
  mode: string
  summary: string
  delegation: string
  partners: string
  themes: string[]
}

interface ArchiveEventItem {
  id: string
  year: string
  formatKey: FormatFilter
  formatLabel: string
  regionKey: RegionFilter
  regionLabel: string
  title: string
  location: string
  flag: string
  partners: string
  metricBadge: string
  summary: string
  outcome: string
}

export default function EventsPage() {
  const t = useTranslations('Events')

  const [expandedUpcomingId, setExpandedUpcomingId] = useState<string>('up-1')
  const [activeFormat, setActiveFormat] = useState<FormatFilter>('all')
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const upcomingEvents: UpcomingEventItem[] = [
    {
      id: 'up-1',
      window: t('up_1_window'),
      formatKey: 'roundtable',
      formatLabel: t('format_roundtable'),
      title: t('up_1_title'),
      location: t('up_1_location'),
      country: 'Kenya',
      flag: '/flags/ke.png',
      mode: t('up_1_mode'),
      summary: t('up_1_summary'),
      delegation: t('up_1_delegation'),
      partners: t('up_1_partners'),
      themes: [t('up_1_theme_1'), t('up_1_theme_2'), t('up_1_theme_3')],
    },
    {
      id: 'up-2',
      window: t('up_2_window'),
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      title: t('up_2_title'),
      location: t('up_2_location'),
      country: 'Burundi & DRC',
      flag: '/flags/bi.png',
      mode: t('up_2_mode'),
      summary: t('up_2_summary'),
      delegation: t('up_2_delegation'),
      partners: t('up_2_partners'),
      themes: [t('up_2_theme_1'), t('up_2_theme_2'), t('up_2_theme_3')],
    },
    {
      id: 'up-3',
      window: t('up_3_window'),
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      title: t('up_3_title'),
      location: t('up_3_location'),
      country: 'Ghana',
      flag: '/flags/gh.png',
      mode: t('up_3_mode'),
      summary: t('up_3_summary'),
      delegation: t('up_3_delegation'),
      partners: t('up_3_partners'),
      themes: [t('up_3_theme_1'), t('up_3_theme_2'), t('up_3_theme_3')],
    },
    {
      id: 'up-4',
      window: t('up_4_window'),
      formatKey: 'learning_trip',
      formatLabel: t('format_learning_trip'),
      title: t('up_4_title'),
      location: t('up_4_location'),
      country: 'Tanzania',
      flag: '/flags/tz.png',
      mode: t('up_4_mode'),
      summary: t('up_4_summary'),
      delegation: t('up_4_delegation'),
      partners: t('up_4_partners'),
      themes: [t('up_4_theme_1'), t('up_4_theme_2'), t('up_4_theme_3')],
    },
  ]

  const archiveEvents: ArchiveEventItem[] = [
    {
      id: 'arc-1',
      year: '2014–2018',
      formatKey: 'roundtable',
      formatLabel: t('format_roundtable'),
      regionKey: 'east',
      regionLabel: t('region_east'),
      title: t('arc_1_title'),
      location: 'Nairobi, Kenya',
      flag: '/flags/ke.png',
      partners: 'Kenya Markets Trust (KMT), KEPHIS, STAK, Ministry of Agriculture',
      metricBadge: t('arc_1_metric'),
      summary: t('arc_1_summary'),
      outcome: t('arc_1_outcome'),
    },
    {
      id: 'arc-2',
      year: '2019–2024',
      formatKey: 'learning_trip',
      formatLabel: t('format_learning_trip'),
      regionKey: 'east',
      regionLabel: t('region_east'),
      title: t('arc_2_title'),
      location: 'Dar es Salaam, Arusha & Nairobi',
      flag: '/flags/tz.png',
      partners: 'Gates Foundation (ESSETA), Tanzania MoA, TOSCI, ASA, TASTA',
      metricBadge: t('arc_2_metric'),
      summary: t('arc_2_summary'),
      outcome: t('arc_2_outcome'),
    },
    {
      id: 'arc-3',
      year: '2013–2018',
      formatKey: 'field_day',
      formatLabel: t('format_field_day'),
      regionKey: 'east',
      regionLabel: t('region_east'),
      title: t('arc_3_title'),
      location: '20 Counties, Kenya',
      flag: '/flags/ke.png',
      partners: 'County Governments, MoA, KEPHIS, STAK, Seed Companies',
      metricBadge: t('arc_3_metric'),
      summary: t('arc_3_summary'),
      outcome: t('arc_3_outcome'),
    },
    {
      id: 'arc-4',
      year: '2022',
      formatKey: 'learning_trip',
      formatLabel: t('format_learning_trip'),
      regionKey: 'east',
      regionLabel: t('region_east'),
      title: t('arc_4_title'),
      location: 'Bujumbura → Nairobi & Nakuru',
      flag: '/flags/bi.png',
      partners: 'Burundi Seed Association, Seed Trade Association of Kenya (STAK)',
      metricBadge: t('arc_4_metric'),
      summary: t('arc_4_summary'),
      outcome: t('arc_4_outcome'),
    },
    {
      id: 'arc-5',
      year: '2020–2022',
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      regionKey: 'southern',
      regionLabel: t('region_southern'),
      title: t('arc_5_title'),
      location: 'Lusaka, Zambia · Malawi & Mozambique',
      flag: '/flags/zm.png',
      partners: 'Seed Control and Certification Institute (SCCI), Catholic Relief Services (CRS)',
      metricBadge: t('arc_5_metric'),
      summary: t('arc_5_summary'),
      outcome: t('arc_5_outcome'),
    },
    {
      id: 'arc-6',
      year: '2021–2023',
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      regionKey: 'west_central',
      regionLabel: t('region_west_central'),
      title: t('arc_6_title'),
      location: 'Goma, DRC & Bujumbura, Burundi',
      flag: '/flags/cd.png',
      partners: 'ELAN RDC, Regional Seed Producers & Agrodealer Networks',
      metricBadge: t('arc_6_metric'),
      summary: t('arc_6_summary'),
      outcome: t('arc_6_outcome'),
    },
    {
      id: 'arc-7',
      year: '2020–2023',
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      regionKey: 'east',
      regionLabel: t('region_east'),
      title: t('arc_7_title'),
      location: 'Kampala, Uganda',
      flag: '/flags/ug.png',
      partners: 'Uganda Seed Trade Association (USTA), NSCS, NARO Uganda',
      metricBadge: t('arc_7_metric'),
      summary: t('arc_7_summary'),
      outcome: t('arc_7_outcome'),
    },
    {
      id: 'arc-8',
      year: '2018–2024',
      formatKey: 'technical_forum',
      formatLabel: t('format_technical_forum'),
      regionKey: 'west_central',
      regionLabel: t('region_west_central'),
      title: t('arc_8_title'),
      location: 'Accra, Ghana',
      flag: '/flags/gh.png',
      partners: 'West Africa Centre for Crop Improvement (WACCI), NASC, NASTAG',
      metricBadge: t('arc_8_metric'),
      summary: t('arc_8_summary'),
      outcome: t('arc_8_outcome'),
    },
  ]

  const filteredArchive = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return archiveEvents.filter((item) => {
      const matchesFormat = activeFormat === 'all' || item.formatKey === activeFormat
      const matchesRegion = activeRegion === 'all' || item.regionKey === activeRegion
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.partners.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.outcome.toLowerCase().includes(q)
      return matchesFormat && matchesRegion && matchesQuery
    })
  }, [activeFormat, activeRegion, searchQuery])

  const formatFilters: { key: FormatFilter; label: string }[] = [
    { key: 'all', label: t('filter_all_formats') },
    { key: 'roundtable', label: t('format_roundtable') },
    { key: 'learning_trip', label: t('format_learning_trip') },
    { key: 'technical_forum', label: t('format_technical_forum') },
    { key: 'field_day', label: t('format_field_day') },
  ]

  const regionFilters: { key: RegionFilter; label: string }[] = [
    { key: 'all', label: t('filter_all_regions') },
    { key: 'east', label: t('region_east') },
    { key: 'southern', label: t('region_southern') },
    { key: 'west_central', label: t('region_west_central') },
  ]

  const deliverySteps = [
    {
      step: '01',
      title: t('step_1_title'),
      desc: t('step_1_desc'),
    },
    {
      step: '02',
      title: t('step_2_title'),
      desc: t('step_2_desc'),
    },
    {
      step: '03',
      title: t('step_3_title'),
      desc: t('step_3_desc'),
    },
    {
      step: '04',
      title: t('step_4_title'),
      desc: t('step_4_desc'),
    },
  ]

  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('hero_title'),
    description: t('hero_lead'),
    itemListElement: upcomingEvents.map((ev, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: ev.title,
        description: ev.summary,
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: ev.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: ev.location,
            addressCountry: ev.country,
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Agri Experience Limited',
          url: 'https://agri-experience.com',
        },
      },
    })),
  }

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh] text-[#0F1F15]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />

      {/* ===== 1. EDITORIAL HERO SECTION ===== */}
      <section className="relative w-full pt-10 sm:pt-14 lg:pt-20 pb-14 lg:pb-24 border-b border-stone-300/80 bg-[#F8F6F0]">
        <div className="max-w-[1400px] min-[1440px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Editorial Headline, Narrative & Footprint */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <h1
                className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.8vw, 4.25rem)' }}
              >
                {t('hero_title')}
              </h1>

              <p
                className="text-[#223127] font-normal leading-[1.65] max-w-[64ch]"
                style={{ fontSize: 'clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)' }}
              >
                {t('hero_lead')}
              </p>

              <p className="text-[#36493D] font-normal leading-[1.65] text-base max-w-[64ch]">
                {t('hero_sublead')}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#upcoming-schedule"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 lg:px-7 lg:py-4 bg-[#0F1F15] text-white rounded-full font-semibold text-sm lg:text-[15px] hover:bg-[#1A4D2E] transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  <RollingText className="gap-2">
                    {t('cta_explore_schedule')}
                    <ArrowRight
                      size={16}
                      className="transform rotate-90 transition-transform duration-200 shrink-0"
                    />
                  </RollingText>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 lg:px-7 lg:py-4 bg-white border border-[#0F1F15]/20 text-[#0F1F15] rounded-full font-semibold text-sm lg:text-[15px] hover:border-[#0F1F15] hover:bg-stone-50 transition-colors duration-200 active:scale-[0.98]"
                >
                  {t('cta_commission_event')}
                </Link>
              </div>

              {/* Understated Institutional Footprint Line */}
              <div className="pt-6 border-t border-stone-300/90 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sm sm:text-[15px] text-[#223127]">
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-lg sm:text-xl mr-1.5">
                    100+
                  </strong>
                  {t('stat_events')}
                </span>
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-lg sm:text-xl mr-1.5">
                    20+
                  </strong>
                  {t('stat_countries')}
                </span>
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-lg sm:text-xl mr-1.5">
                    500+
                  </strong>
                  {t('stat_leaders')}
                </span>
                <span>
                  <strong className="font-serif font-bold text-[#0F1F15] tabular-nums text-lg sm:text-xl mr-1.5">
                    15+
                  </strong>
                  {t('stat_roundtables')}
                </span>
              </div>
            </div>

            {/* Right Column: Field Dossier Visual & Next Convening Brief */}
            <div className="lg:col-span-5">
              <div
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden"
                style={{ boxShadow: '0 12px 32px -12px rgba(15, 31, 21, 0.08)' }}
              >
                <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden">
                  <Image
                    src="/our-mission-2026.webp"
                    alt={t('hero_img_alt')}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F15]/80 via-[#0F1F15]/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-xs font-medium text-[#D5E0D9] mb-1">
                        {t('hero_card_location')}
                      </p>
                      <p className="font-serif font-bold text-lg sm:text-xl leading-snug">
                        {t('hero_card_title')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-sm sm:text-[15px] text-[#223127] leading-relaxed">
                    {t('hero_card_desc')}
                  </p>
                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="text-[#36493D] font-medium">
                      {t('hero_card_meta')}
                    </span>
                    <Link
                      href="/our-work/stakeholder-convenings"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#1A4D2E] hover:text-[#0F1F15] underline underline-offset-4 transition-colors"
                    >
                      {t('hero_card_link')}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. 2026 UPCOMING & RECURRING CONVENINGS SCHEDULE LEDGER ===== */}
      <section
        id="upcoming-schedule"
        className="w-full py-16 lg:py-24 bg-white border-b border-stone-200/90 scroll-mt-24"
      >
        <div className="max-w-[1400px] min-[1440px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-14">
            <div className="max-w-2xl space-y-3">
              <h2
                className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.12]"
                style={{ fontSize: 'clamp(1.75rem, 1.35rem + 1.8vw, 3rem)' }}
              >
                {t('upcoming_title')}
              </h2>
              <p className="text-base sm:text-lg text-[#223127] leading-relaxed">
                {t('upcoming_desc')}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#36493D] bg-[#F8F6F0] px-4 py-2.5 rounded-full border border-stone-200/90 self-start lg:self-auto">
              <Calendar size={16} className="text-[#1A4D2E] shrink-0" />
              <span>{t('upcoming_notice')}</span>
            </div>
          </div>

          {/* Interactive Editorial Ledger */}
          <div className="border-t border-stone-300 divide-y divide-stone-200">
            {upcomingEvents.map((ev) => {
              const isExpanded = expandedUpcomingId === ev.id
              return (
                <article
                  key={ev.id}
                  className={`transition-colors duration-200 ${
                    isExpanded ? 'bg-[#F8F6F0]/75' : 'bg-white hover:bg-stone-50/70'
                  }`}
                >
                  <div className="py-6 sm:py-7 px-3 sm:px-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center">
                    {/* Date Window & Mode */}
                    <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-[#0F1F15] tabular-nums">
                        {ev.window}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1A4D2E]/10 text-[#1A4D2E]">
                        {ev.mode}
                      </span>
                    </div>

                    {/* Title & Format */}
                    <div className="lg:col-span-5 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1A4D2E]">
                        <span>{ev.formatLabel}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0F1F15] leading-snug">
                        {ev.title}
                      </h3>
                    </div>

                    {/* Location with Flag */}
                    <div className="lg:col-span-3 flex items-center gap-2.5 text-sm sm:text-[15px] text-[#223127]">
                      <Image
                        src={ev.flag}
                        alt={ev.country}
                        width={22}
                        height={16}
                        className="rounded-[2px] object-cover shrink-0 border border-stone-200"
                      />
                      <span className="font-medium">{ev.location}</span>
                    </div>

                    {/* Expand Agenda Action */}
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedUpcomingId(isExpanded ? '' : ev.id)
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#0F1F15] bg-white border border-stone-300 hover:border-[#0F1F15] transition-colors cursor-pointer min-h-[44px]"
                      >
                        <span>
                          {isExpanded ? t('hide_brief') : t('view_brief')}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Inline Expandable Delegation & Agenda Brief */}
                  {isExpanded && (
                    <div className="px-3 sm:px-5 pb-7 pt-2 border-t border-stone-200/70">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4">
                        <div className="lg:col-span-5 space-y-4">
                          <p className="text-sm sm:text-[15px] text-[#223127] leading-relaxed">
                            {ev.summary}
                          </p>
                          <div className="space-y-2 text-xs sm:text-sm text-[#36493D]">
                            <div className="flex items-start gap-2">
                              <Users
                                size={16}
                                className="text-[#1A4D2E] shrink-0 mt-0.5"
                              />
                              <div>
                                <strong className="text-[#0F1F15] font-semibold">
                                  {t('label_delegation')}:{' '}
                                </strong>
                                {ev.delegation}
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Globe
                                size={16}
                                className="text-[#1A4D2E] shrink-0 mt-0.5"
                              />
                              <div>
                                <strong className="text-[#0F1F15] font-semibold">
                                  {t('label_partners')}:{' '}
                                </strong>
                                {ev.partners}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-4 space-y-2.5">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0F1F15]">
                            {t('label_themes')}
                          </h4>
                          <ul className="space-y-2">
                            {ev.themes.map((theme, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs sm:text-sm text-[#223127] leading-relaxed"
                              >
                                <CheckCircle2
                                  size={15}
                                  className="text-[#1A4D2E] shrink-0 mt-0.5"
                                />
                                <span>{theme}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="lg:col-span-3 flex flex-col justify-between bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 gap-4">
                          <div className="space-y-1">
                            <p className="font-serif font-bold text-base text-[#0F1F15]">
                              {t('inquire_box_title')}
                            </p>
                            <p className="text-xs text-[#36493D] leading-relaxed">
                              {t('inquire_box_desc')}
                            </p>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-[#0F1F15] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4D2E] transition-colors min-h-[44px]"
                          >
                            <span>{t('inquire_btn')}</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. FLAGSHIP POLICY IMPACT CASE STUDY (DARK FOREST FEATURE) ===== */}
      <section className="w-full py-16 lg:py-24 bg-[#0F1F15] text-white border-b border-[#2A4735]">
        <div className="max-w-[1400px] min-[1440px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5 lg:space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#162B1E] border border-[#2A4735] text-xs sm:text-sm text-[#D5E0D9]">
                <Image
                  src="/flags/ke.png"
                  alt="Kenya"
                  width={18}
                  height={13}
                  className="rounded-[2px]"
                />
                <span>{t('flagship_badge')}</span>
              </div>

              <h2
                className="font-serif font-bold text-white tracking-tight leading-[1.12]"
                style={{ fontSize: 'clamp(1.75rem, 1.35rem + 1.8vw, 3rem)' }}
              >
                {t('flagship_title')}
              </h2>

              <p className="text-base sm:text-lg text-[#D5E0D9] leading-[1.65] max-w-[62ch]">
                {t('flagship_desc_1')}
              </p>

              <p className="text-sm sm:text-base text-[#B8C9BE] leading-[1.65] max-w-[62ch]">
                {t('flagship_desc_2')}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#162B1E] border border-[#2A4735] rounded-2xl p-6 space-y-2">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-white tabular-nums">
                  15+
                </p>
                <p className="text-sm font-semibold text-white">
                  {t('flagship_stat_1_title')}
                </p>
                <p className="text-xs text-[#B8C9BE] leading-relaxed">
                  {t('flagship_stat_1_desc')}
                </p>
              </div>

              <div className="bg-[#162B1E] border border-[#2A4735] rounded-2xl p-6 space-y-2">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-white tabular-nums">
                  100%
                </p>
                <p className="text-sm font-semibold text-white">
                  {t('flagship_stat_2_title')}
                </p>
                <p className="text-xs text-[#B8C9BE] leading-relaxed">
                  {t('flagship_stat_2_desc')}
                </p>
              </div>

              <div className="sm:col-span-2 bg-[#162B1E] border border-[#2A4735] rounded-2xl p-6 space-y-2">
                <p className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {t('flagship_stat_3_title')}
                </p>
                <p className="text-xs sm:text-sm text-[#D5E0D9] leading-relaxed">
                  {t('flagship_stat_3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. PAN-AFRICAN CONVENING ARCHIVE (FACETED FILTER LEDGER) ===== */}
      <section className="w-full py-16 lg:py-24 bg-[#F8F6F0] border-b border-stone-300/80">
        <div className="max-w-[1400px] min-[1440px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl space-y-3 mb-8 lg:mb-12">
            <h2
              className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.12]"
              style={{ fontSize: 'clamp(1.75rem, 1.35rem + 1.8vw, 3rem)' }}
            >
              {t('archive_title')}
            </h2>
            <p className="text-base sm:text-lg text-[#223127] leading-relaxed">
              {t('archive_desc')}
            </p>
          </div>

          {/* Multi-Criteria Faceted Filter Bar (TWK Farm Africa Pattern) */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-6 mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
              {/* Format Pills */}
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by format">
                {formatFilters.map((f) => {
                  const active = activeFormat === f.key
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setActiveFormat(f.key)}
                      className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[40px] ${
                        active
                          ? 'bg-[#0F1F15] text-white'
                          : 'bg-[#F8F6F0] text-[#223127] hover:bg-stone-200/70'
                      }`}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#36493D] pointer-events-none"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  aria-label={t('search_placeholder')}
                  className="w-full pl-9 pr-9 py-2 rounded-full bg-[#F8F6F0] border border-stone-300 text-sm text-[#0F1F15] placeholder:text-[#36493D] focus:outline-none focus:border-[#0F1F15] focus:bg-white transition-colors min-h-[40px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#36493D] hover:text-[#0F1F15]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Region Filter Row & Result Count */}
            <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by region">
                <span className="text-xs font-semibold text-[#36493D] mr-1">
                  {t('label_region')}:
                </span>
                {regionFilters.map((r) => {
                  const active = activeRegion === r.key
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setActiveRegion(r.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#1A4D2E] text-white'
                          : 'bg-stone-100 text-[#223127] hover:bg-stone-200/80'
                      }`}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>

              <div className="text-xs sm:text-sm text-[#36493D] font-medium tabular-nums">
                {t('showing_count', { count: filteredArchive.length, total: archiveEvents.length })}
              </div>
            </div>
          </div>

          {/* Archive Results Grid */}
          {filteredArchive.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200/90 p-10 text-center space-y-4">
              <p className="font-serif font-bold text-xl text-[#0F1F15]">
                {t('empty_title')}
              </p>
              <p className="text-sm text-[#36493D] max-w-md mx-auto">
                {t('empty_desc')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFormat('all')
                  setActiveRegion('all')
                  setSearchQuery('')
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F1F15] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4D2E] transition-colors cursor-pointer"
              >
                {t('reset_filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArchive.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between gap-5 hover:border-[#1A4D2E]/40 transition-colors"
                  style={{ boxShadow: '0 4px 16px -6px rgba(15, 31, 21, 0.05)' }}
                >
                  <div className="space-y-4">
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.flag}
                          alt={item.location}
                          width={20}
                          height={14}
                          className="rounded-[2px] border border-stone-200"
                        />
                        <span className="font-semibold text-[#0F1F15]">
                          {item.location}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-[#36493D] font-medium tabular-nums">
                          {item.year}
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-[#F8F6F0] border border-stone-200 text-[#1A4D2E] font-semibold">
                        {item.formatLabel}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0F1F15] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-[#223127] leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Outcome & Partners Ledger */}
                  <div className="pt-4 border-t border-stone-200/80 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#1A4D2E]">
                        {item.metricBadge}
                      </span>
                      <span className="text-xs text-[#36493D]">
                        {item.regionLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13.5px] text-[#223127] leading-relaxed">
                      <strong className="text-[#0F1F15] font-semibold">
                        {t('label_outcome')}:{' '}
                      </strong>
                      {item.outcome}
                    </p>
                    <p className="text-xs text-[#36493D]">
                      <strong className="text-[#0F1F15] font-medium">
                        {t('label_partners')}:{' '}
                      </strong>
                      {item.partners}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 5. CONVENING METHODOLOGY (4-STAGE CHRONOLOGICAL PROCESS) ===== */}
      <section className="w-full py-16 lg:py-24 bg-white border-b border-stone-200/90">
        <div className="max-w-[1400px] min-[1440px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl space-y-3 mb-10 lg:mb-14">
            <h2
              className="font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.12]"
              style={{ fontSize: 'clamp(1.75rem, 1.35rem + 1.8vw, 3rem)' }}
            >
              {t('method_title')}
            </h2>
            <p className="text-base sm:text-lg text-[#223127] leading-relaxed">
              {t('method_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((s) => (
              <div
                key={s.step}
                className="bg-[#F8F6F0] rounded-2xl border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0F1F15] text-white font-serif font-bold text-sm tabular-nums">
                    {s.step}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#0F1F15]">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#223127] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. EXECUTIVE ADVISORY CTA ===== */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2
            className="font-serif font-bold text-white tracking-tight leading-[1.12]"
            style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2vw, 3.25rem)' }}
          >
            {t('cta_bottom_title')}
          </h2>
          <p className="text-base sm:text-lg text-[#D5E0D9] max-w-2xl mx-auto leading-relaxed">
            {t('cta_bottom_desc')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-primary-green text-[#0F1F15] rounded-full font-bold text-sm sm:text-base hover:bg-[#45c456] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
            >
              <RollingText className="gap-2">
                {t('cta_bottom_btn_1')}
                <ArrowRight size={16} />
              </RollingText>
            </Link>
            <Link
              href="/our-work/stakeholder-convenings"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 border border-[#3A5A46] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-[#162B1E] hover:border-[#527A61] transition-colors duration-200"
            >
              {t('cta_bottom_btn_2')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
