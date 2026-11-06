'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'
import { DynamicCustomSections } from '@/components/cms/dynamic-custom-sections'
import {
  ArrowRight,
  Users,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  CheckCircle2,
  X,
  Maximize2,
  Camera,
} from 'lucide-react'

type FormatFilter = 'all' | 'roundtable' | 'learning_trip' | 'technical_forum' | 'field_day'
type RegionFilter = 'all' | 'east' | 'southern' | 'west_central'
type GalleryCategory = 'all' | 'roundtables' | 'field_days' | 'exchanges' | 'workshops'

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
  previewImage?: string
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
  image: string
}

interface GalleryPhotoItem {
  id: string
  title: string
  category: GalleryCategory
  categoryLabel: string
  image: string
  location: string
  country: string
  flag: string
  year: string
  caption: string
}

export default function EventsPage() {
  const t = useTranslations('Events')
  const locale = useLocale()

  const [expandedUpcomingId, setExpandedUpcomingId] = useState<string>('up-1')
  const [activeFormat, setActiveFormat] = useState<FormatFilter>('all')
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Gallery state
  const [activeGalleryCat, setActiveGalleryCat] = useState<GalleryCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
      previewImage: '/events-gallery/event-roundtable-nairobi.webp',
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
      previewImage: '/events-gallery/event-agrodealer-forum.webp',
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
      previewImage: '/events-gallery/event-executive-seminar.webp',
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
      previewImage: '/events-gallery/event-nursery-field-exchange.webp',
    },
  ]

  const galleryPhotos: GalleryPhotoItem[] = [
    {
      id: 'p-1',
      title: 'Seed Industry Private Sector Policy Roundtable',
      category: 'roundtables',
      categoryLabel: t('filter_roundtables'),
      image: '/events-gallery/event-roundtable-nairobi.webp',
      location: 'Nairobi, Kenya',
      country: 'Kenya',
      flag: '/flags/ke.png',
      year: 'Multi-Year Policy Platform',
      caption: 'Executive roundtable convening 100% of major commercial seed enterprises alongside KEPHIS and the Ministry of Agriculture, leading directly to the revision and gazetting of Kenya\'s Seeds Regulations.',
    },
    {
      id: 'p-2',
      title: 'Mazao Forums & 50 County Seed Field Days',
      category: 'field_days',
      categoryLabel: t('filter_field_days'),
      image: '/events-gallery/event-field-day-kenya.webp',
      location: 'Nakuru & 20 Counties, Kenya',
      country: 'Kenya',
      flag: '/flags/ke.png',
      year: '50 Field Days · 3,000+ Attendees',
      caption: 'County crop demonstration days connecting commercial seed breeders and agrodealer networks with smallholder farmers evaluating climate-smart maize and legume varieties.',
    },
    {
      id: 'p-3',
      title: 'WACCI PhD Plant Breeding & Seed Business Seminar',
      category: 'workshops',
      categoryLabel: t('filter_workshops'),
      image: '/events-gallery/event-executive-seminar.webp',
      location: 'Accra, Ghana',
      country: 'Ghana',
      flag: '/flags/gh.png',
      year: 'Executive Management Seminars',
      caption: 'Bridging academic plant breeding and agribusiness management: training PhD researchers and West African seed company directors on portfolio commercialization and unit economics.',
    },
    {
      id: 'p-4',
      title: 'Community Seed Multipliers & Agrodealer Convening',
      category: 'field_days',
      categoryLabel: t('filter_field_days'),
      image: '/events-gallery/event-community-farmers.webp',
      location: 'Western Kenya & Eastern Province, Zambia',
      country: 'Kenya & Zambia',
      flag: '/flags/ke.png',
      year: 'Participatory Field Consultation',
      caption: 'Consultative field session with local seed multipliers and retail agrodealers reviewing digital verification tags, variety performance, and last-mile input delivery.',
    },
    {
      id: 'p-5',
      title: 'National Seed Regulators & Policy Directors Summit',
      category: 'roundtables',
      categoryLabel: t('filter_roundtables'),
      image: '/events-gallery/event-regulator-consultation.webp',
      location: 'Nairobi & Dar es Salaam',
      country: 'East Africa',
      flag: '/flags/tz.png',
      year: 'High-Level Regulatory Dialogue',
      caption: 'Multi-country regulatory consultation on COMESA variety release harmonization, authorized private seed inspector accreditation, and cross-border trade facilitation.',
    },
    {
      id: 'p-6',
      title: 'Decentralized Nursery & Vegetative Propagation Field Day',
      category: 'exchanges',
      categoryLabel: t('filter_exchanges'),
      image: '/events-gallery/event-nursery-field-exchange.webp',
      location: 'Morogoro & Coast Region, Tanzania',
      country: 'Tanzania',
      flag: '/flags/tz.png',
      year: 'Practical Field Exchange',
      caption: 'On-site technical exchange examining disease-free planting materials for horticulture and root crops, quality declared seed systems, and commercial nursery business models.',
    },
    {
      id: 'p-7',
      title: 'County Agrodealer Association Governance Congress',
      category: 'workshops',
      categoryLabel: t('filter_workshops'),
      image: '/events-gallery/event-agrodealer-forum.webp',
      location: 'Eldoret & Kisumu, Kenya',
      country: 'Kenya',
      flag: '/flags/ke.png',
      year: '16 Self-Governing Associations',
      caption: 'Leadership retreat for 16 newly incorporated County Agrodealer Associations focusing on advocacy, bulk procurement, and anti-counterfeiting partnerships.',
    },
    {
      id: 'p-8',
      title: 'ESSETA Tanzania–Kenya Cross-Border Study Tour',
      category: 'exchanges',
      categoryLabel: t('filter_exchanges'),
      image: '/events-gallery/event-pasture-fodder-tour.webp',
      location: 'Arusha → Nairobi & Nakuru',
      country: 'Tanzania & Kenya',
      flag: '/flags/tz.png',
      year: 'Cross-Border Study Tour',
      caption: 'Tanzanian regulators (TOSCI, Ministry of Agriculture) and seed producers benchmarking authorized private seed inspection protocols and packaging verification in Kenya.',
    },
    {
      id: 'p-9',
      title: 'Semi-Arid Variety Release & Demonstration Day',
      category: 'field_days',
      categoryLabel: t('filter_field_days'),
      image: '/events-gallery/event-variety-demo-trials.webp',
      location: 'Machakos & Kitui, Kenya',
      country: 'Kenya',
      flag: '/flags/ke.png',
      year: 'Drought-Tolerant Crop Trials',
      caption: 'Comparative yield demonstrations showcasing climate-resilient sorghum, millet, and biofortified bean varieties directly to regional extension officers.',
    },
    {
      id: 'p-10',
      title: 'Pan-African Seed Production Corridors Scoping Mission',
      category: 'exchanges',
      categoryLabel: t('filter_exchanges'),
      image: '/events-gallery/event-pan-african-landscape.webp',
      location: 'East African Rift & Highland Corridors',
      country: 'Regional',
      flag: '/flags/ug.png',
      year: 'Pan-African Geographic Scope',
      caption: 'Field assessment of agro-ecological seed multiplication valleys and border transit corridors facilitating certified seed movement across sub-Saharan Africa.',
    },
  ]

  const filteredPhotos = useMemo(() => {
    if (activeGalleryCat === 'all') return galleryPhotos
    return galleryPhotos.filter((p) => p.category === activeGalleryCat)
  }, [activeGalleryCat])

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
      image: '/events-gallery/event-roundtable-nairobi.webp',
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
      image: '/events-gallery/event-pasture-fodder-tour.webp',
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
      image: '/events-gallery/event-field-day-kenya.webp',
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
      image: '/events-gallery/event-regulator-consultation.webp',
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
      image: '/events-gallery/event-community-farmers.webp',
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
      image: '/events-gallery/event-agrodealer-forum.webp',
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
      image: '/events-gallery/event-variety-demo-trials.webp',
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
      image: '/events-gallery/event-executive-seminar.webp',
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

  const galleryCategoryFilters: { key: GalleryCategory; label: string }[] = [
    { key: 'all', label: t('filter_all_photos') },
    { key: 'roundtables', label: t('filter_roundtables') },
    { key: 'field_days', label: t('filter_field_days') },
    { key: 'exchanges', label: t('filter_exchanges') },
    { key: 'workshops', label: t('filter_workshops') },
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

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : 0))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        )
      }
    },
    [lightboxIndex, filteredPhotos.length]
  )

  useEffect(() => {
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, handleKeyDown])

  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('title'),
    description: t('subtitle'),
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

  const activeLightboxItem = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />

      {/* ===== 1. SITE-STANDARD WHITE MASTHEAD BANNER ===== */}
      <section className="relative w-full pt-14 lg:pt-24 pb-10 lg:pb-14 bg-white border-b border-stone-200/80 snap-start scroll-mt-20">
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16">
            <div className="flex-1">
              <h1
                className="font-serif text-[#0F1F15] font-bold tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
              >
                {t('title')}
              </h1>
            </div>
            <div className="flex-1 relative">
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-stone-200" />
              <p className="text-base sm:text-lg lg:text-xl text-[#2A3830] leading-[1.6] font-normal lg:pl-10">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Institutional Metrics Row (Standard Architectural Grid) */}
          <dl className="mt-10 pt-6 border-t border-stone-200/90 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-1">
                Facilitated
              </dt>
              <dd className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F15] tabular-nums">
                100+
              </dd>
              <p className="text-xs sm:text-sm text-[#46584D] mt-0.5">
                {t('stat_events')}
              </p>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-1">
                Footprint
              </dt>
              <dd className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F15] tabular-nums">
                20+
              </dd>
              <p className="text-xs sm:text-sm text-[#46584D] mt-0.5">
                {t('stat_countries')}
              </p>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-1">
                Participation
              </dt>
              <dd className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F15] tabular-nums">
                500+
              </dd>
              <p className="text-xs sm:text-sm text-[#46584D] mt-0.5">
                {t('stat_leaders')}
              </p>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E] mb-1">
                Policy Impact
              </dt>
              <dd className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1F15] tabular-nums">
                15+
              </dd>
              <p className="text-xs sm:text-sm text-[#46584D] mt-0.5">
                {t('stat_roundtables')}
              </p>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== 2. LIVELY PHOTO GALLERIES (OUR EVENTS IN ACTION) ===== */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 lg:mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1A4D2E] mb-2">
                <Camera size={15} />
                <span>{t('gallery_section_kicker')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.15]">
                {t('gallery_title')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#2A3830] max-w-md leading-[1.6]">
              {t('gallery_desc')}
            </p>
          </div>

          {/* Gallery Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8" role="group" aria-label="Filter photo galleries">
            {galleryCategoryFilters.map((cat) => {
              const active = activeGalleryCat === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveGalleryCat(cat.key)}
                  className={`group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer border ${
                    active
                      ? 'bg-[#0F1F15] border-[#0F1F15] text-white'
                      : 'bg-[#F8F6F0] border-stone-200/80 text-[#0F1F15] hover:border-[#1A4D2E]/40 hover:bg-stone-100'
                  }`}
                >
                  <RollingText>{cat.label}</RollingText>
                </button>
              )
            })}
          </div>

          {/* Lively Asymmetric Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filteredPhotos.map((photo, index) => (
              <article
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="consultancy-card group cursor-pointer flex flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E]"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxIndex(index)
                  }
                }}
              >
                {/* Photo Container with Realistic Aspect Ratio and Smooth Zoom */}
                <div className="relative w-full aspect-[16/11] bg-stone-100 overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F15]/85 via-[#0F1F15]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge: Category */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0F1F15]/75 backdrop-blur-md text-white border border-white/20">
                      {photo.categoryLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#0F1F15] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <div className="flex items-center gap-2 text-xs font-medium text-stone-200 mb-1">
                      <Image
                        src={photo.flag}
                        alt={photo.country}
                        width={18}
                        height={12}
                        className="rounded-[2px] border border-white/30"
                      />
                      <span>{photo.location}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug line-clamp-1">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* Card Caption & Field Context */}
                <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                  <p className="text-[13px] sm:text-sm text-[#2A3830] leading-relaxed line-clamp-2 mb-3">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs font-semibold text-[#1A4D2E]">
                    <span className="tabular-nums text-[#46584D] font-normal">
                      {photo.year}
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      <span>{t('gallery_open_lightbox')}</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. 2026 UPCOMING CONVENINGS SCHEDULE LEDGER ===== */}
      <section
        id="upcoming-schedule"
        className="w-full py-12 sm:py-16 lg:py-20 bg-[#F8F6F0] border-b border-stone-200/80 scroll-mt-20"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 lg:mb-12 gap-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1A4D2E] mb-2">
                2026 Schedule
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.15]">
                {t('upcoming_title')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#2A3830] max-w-md leading-[1.6]">
              {t('upcoming_desc')}
            </p>
          </div>

          {/* Schedule Ledger Card */}
          <div className="consultancy-card divide-y divide-stone-200/80 overflow-hidden">
            {upcomingEvents.map((ev) => {
              const isExpanded = expandedUpcomingId === ev.id
              return (
                <article
                  key={ev.id}
                  className={`transition-colors duration-150 ${
                    isExpanded ? 'bg-[#FBFBF9]' : 'bg-white hover:bg-stone-50/60'
                  }`}
                >
                  <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center">
                    {/* Date Window & Mode */}
                    <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between gap-2">
                      <span className="font-serif font-bold text-lg sm:text-xl text-[#0F1F15] tabular-nums">
                        {ev.window}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1A4D2E]/10 text-[#1A4D2E]">
                        {ev.mode}
                      </span>
                    </div>

                    {/* Title & Format */}
                    <div className="lg:col-span-5 space-y-1.5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#1A4D2E]">
                        {ev.formatLabel}
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0F1F15] leading-snug">
                        {ev.title}
                      </h3>
                    </div>

                    {/* Location with Flag */}
                    <div className="lg:col-span-3 flex items-center gap-2.5 text-sm sm:text-base text-[#2A3830]">
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
                        className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold text-[#0F1F15] bg-[#F8F6F0] border border-stone-200/80 hover:border-[#1A4D2E]/40 hover:bg-stone-100 transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] cursor-pointer min-h-[40px]"
                      >
                        <span>
                          {isExpanded ? t('hide_brief') : t('view_brief')}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Inline Expandable Delegation & Agenda Brief Drawer */}
                  {isExpanded && (
                    <div className="px-5 sm:px-8 pb-8 pt-4 border-t border-stone-200/70 bg-[#FBFBF9]">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-2">
                        <div className="lg:col-span-5 space-y-4">
                          <p className="text-sm sm:text-base text-[#2A3830] leading-[1.6]">
                            {ev.summary}
                          </p>
                          <div className="space-y-2 text-xs sm:text-sm text-[#46584D]">
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

                        <div className="lg:col-span-4 space-y-3">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0F1F15] uppercase tracking-wider">
                            {t('label_themes')}
                          </h4>
                          <ul className="space-y-2">
                            {ev.themes.map((theme, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2A3830] leading-relaxed"
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

                        <div className="lg:col-span-3 flex flex-col justify-between bg-white p-5 rounded-xl border border-stone-200/80 gap-4">
                          {ev.previewImage && (
                            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-stone-200">
                              <Image
                                src={ev.previewImage}
                                alt={ev.title}
                                fill
                                sizes="300px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="space-y-1.5">
                            <p className="font-serif font-bold text-base text-[#0F1F15]">
                              {t('inquire_box_title')}
                            </p>
                            <p className="text-xs text-[#46584D] leading-relaxed">
                              {t('inquire_box_desc')}
                            </p>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-[#0F1F15] text-white text-xs sm:text-sm font-semibold hover:bg-[#1A4D2E] transition-colors"
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

      {/* ===== 4. FLAGSHIP POLICY CASE STUDY (DARK FOREST SECTION) ===== */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-b border-[#2A4735]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs sm:text-sm text-stone-200 font-medium">
                <Image
                  src="/flags/ke.png"
                  alt="Kenya"
                  width={18}
                  height={13}
                  className="rounded-[2px]"
                />
                <span>{t('flagship_badge')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {t('flagship_title')}
              </h2>

              <p className="text-base sm:text-lg text-stone-300 leading-[1.65] max-w-[62ch]">
                {t('flagship_desc_1')}
              </p>

              <p className="text-sm sm:text-base text-stone-400 leading-[1.65] max-w-[62ch]">
                {t('flagship_desc_2')}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-white/20 transition-colors">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-white tabular-nums">
                  15+
                </p>
                <p className="text-sm font-semibold text-white">
                  {t('flagship_stat_1_title')}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {t('flagship_stat_1_desc')}
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-white/20 transition-colors">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-white tabular-nums">
                  100%
                </p>
                <p className="text-sm font-semibold text-white">
                  {t('flagship_stat_2_title')}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {t('flagship_stat_2_desc')}
                </p>
              </div>

              <div className="sm:col-span-2 bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-2 hover:border-white/20 transition-colors">
                <p className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {t('flagship_stat_3_title')}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {t('flagship_stat_3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. PAN-AFRICAN CONVENINGS ARCHIVE (FACETED FILTER WITH PHOTO THUMBNAILS) ===== */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F8F6F0] border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 lg:mb-12 gap-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1A4D2E] mb-2">
                Convenings Archive
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.15]">
                {t('archive_title')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#2A3830] max-w-md leading-[1.6]">
              {t('archive_desc')}
            </p>
          </div>

          {/* Faceted Filter Bar */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 mb-8 sm:mb-10 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
              {/* Format Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5" role="group" aria-label="Filter by format">
                {formatFilters.map((f) => {
                  const active = activeFormat === f.key
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setActiveFormat(f.key)}
                      className={`group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer border ${
                        active
                          ? 'bg-[#0F1F15] border-[#0F1F15] text-white'
                          : 'bg-[#F8F6F0] border-stone-200/80 text-[#0F1F15] hover:border-[#1A4D2E]/40 hover:bg-stone-100'
                      }`}
                    >
                      <RollingText>{f.label}</RollingText>
                    </button>
                  )
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#46584D] pointer-events-none"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  aria-label={t('search_placeholder')}
                  className="w-full pl-9 pr-9 py-2.5 rounded-full bg-[#F8F6F0] border border-stone-200/80 text-xs sm:text-[13px] text-[#0F1F15] placeholder:text-[#46584D] focus:outline-none focus:border-[#1A4D2E] focus:bg-white transition-all min-h-[40px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#46584D] hover:text-[#0F1F15]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Region Filter Row & Result Count */}
            <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by region">
                <span className="text-xs font-semibold text-[#46584D] mr-1">
                  {t('label_region')}:
                </span>
                {regionFilters.map((r) => {
                  const active = activeRegion === r.key
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setActiveRegion(r.key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                        active
                          ? 'bg-[#1A4D2E] border-[#1A4D2E] text-white'
                          : 'bg-[#F8F6F0] border-stone-200/80 text-[#0F1F15] hover:border-[#1A4D2E]/40 hover:bg-stone-100'
                      }`}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>

              <span className="text-xs sm:text-sm font-medium text-[#46584D] tabular-nums shrink-0">
                {t('showing_count', { count: filteredArchive.length, total: archiveEvents.length })}
              </span>
            </div>
          </div>

          {/* Archive Results Grid with Photo Thumbnails */}
          {filteredArchive.length === 0 ? (
            <div className="consultancy-card p-10 text-center space-y-4">
              <p className="font-serif font-bold text-xl text-[#0F1F15]">
                {t('empty_title')}
              </p>
              <p className="text-sm text-[#46584D] max-w-md mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredArchive.map((item) => (
                <article
                  key={item.id}
                  className="consultancy-card flex flex-col justify-between overflow-hidden rounded-2xl group"
                >
                  {/* Photo Banner */}
                  <div className="relative w-full aspect-[16/9] bg-stone-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-[#0F1F15]/80 backdrop-blur-md border border-white/20 text-white font-semibold text-[11px]">
                      {item.formatLabel}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      {/* Top Meta Bar */}
                      <div className="flex items-center gap-2 text-xs">
                        <Image
                          src={item.flag}
                          alt={item.location}
                          width={18}
                          height={12}
                          className="rounded-[2px] border border-stone-200 shrink-0"
                        />
                        <span className="font-semibold text-[#0F1F15]">
                          {item.location}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[#46584D] font-medium tabular-nums">
                          {item.year}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h3 className="text-[17px] sm:text-lg font-serif font-bold text-[#0F1F15] group-hover:text-[#1A4D2E] leading-snug transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] sm:text-sm text-[#2A3830] leading-[1.6]">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom Outcome & Partners */}
                    <div className="pt-4 border-t border-stone-100 mt-5 space-y-2 text-xs sm:text-[13px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#1A4D2E]">
                          {item.metricBadge}
                        </span>
                        <span className="text-xs text-[#46584D]">
                          {item.regionLabel}
                        </span>
                      </div>
                      <p className="text-[#2A3830] leading-relaxed">
                        <strong className="text-[#0F1F15] font-semibold">
                          {t('label_outcome')}:{' '}
                        </strong>
                        {item.outcome}
                      </p>
                      <p className="text-xs text-[#46584D]">
                        <strong className="text-[#0F1F15] font-medium">
                          {t('label_partners')}:{' '}
                        </strong>
                        {item.partners}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 6. 4-STAGE METHODOLOGY SECTION ===== */}
      <section className="w-full py-14 sm:py-18 lg:py-24 bg-white border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-14 gap-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#1A4D2E] mb-2">
                Our Approach
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1F15] tracking-tight leading-[1.15]">
                {t('method_title')}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#2A3830] max-w-md leading-[1.6]">
              {t('method_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((s) => (
              <article
                key={s.step}
                className="consultancy-card p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <span className="w-9 h-9 rounded-full bg-[#0F1F15] text-white font-serif font-bold text-sm flex items-center justify-center tabular-nums">
                    {s.step}
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0F1F15] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-sm text-[#2A3830] leading-[1.6]">
                    {s.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic CMS Sections for Events */}
      <DynamicCustomSections page="events" locale={locale} />

      {/* ===== 7. SITE-WIDE EXECUTIVE CTA ===== */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-[#2A4735]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-7">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
            {t('cta_bottom_title')}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-[1.6] max-w-2xl mx-auto">
            {t('cta_bottom_desc')}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#3ab44a] text-[#0F1F15] rounded-full font-bold text-sm sm:text-base hover:bg-[#45c456] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
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

      {/* ===== 8. ACCESSIBLE PHOTO LIGHTBOX MODAL ===== */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Main Modal Window */}
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#0F1F15] border border-stone-700/60 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-[#0F1F15]/90 text-white z-10">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1A4D2E] text-white font-semibold text-xs">
                  {activeLightboxItem.categoryLabel}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-300 font-medium tabular-nums">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Previous / Next on Header */}
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null
                        ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                        : 0
                    )
                  }
                  aria-label={t('gallery_prev')}
                  className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % filteredPhotos.length : 0
                    )
                  }
                  aria-label={t('gallery_next')}
                  className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={t('gallery_close')}
                  className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer ml-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Photo View Area */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] bg-black/60 flex items-center justify-center overflow-hidden">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />

              {/* In-photo Side Navigation Arrows for Large Screens */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null
                      ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                      : 0
                  )
                }
                aria-label={t('gallery_prev')}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#1A4D2E] items-center justify-center transition-colors cursor-pointer border border-white/20"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % filteredPhotos.length : 0
                  )
                }
                aria-label={t('gallery_next')}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#1A4D2E] items-center justify-center transition-colors cursor-pointer border border-white/20"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Caption & Field Context */}
            <div className="p-5 sm:p-6 bg-[#0F1F15] text-white border-t border-stone-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                  <Image
                    src={activeLightboxItem.flag}
                    alt={activeLightboxItem.country}
                    width={20}
                    height={14}
                    className="rounded-[2px] border border-white/20"
                  />
                  <span className="font-medium text-white">
                    {activeLightboxItem.location}
                  </span>
                  <span className="text-stone-500">·</span>
                  <span className="text-stone-400 tabular-nums">
                    {activeLightboxItem.year}
                  </span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {activeLightboxItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                {activeLightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
