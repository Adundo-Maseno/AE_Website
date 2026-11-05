'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { publicDownloads } from '@/lib/public-downloads'
import { Link } from '@/i18n/routing'
import { ArrowRight, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

// Dynamically import PdfPreview with SSR disabled to fix "DOMMatrix is not defined" error
const PdfPreview = dynamic(() => import('@/components/pdf-preview'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full rounded-xl overflow-hidden border border-stone-200/60 bg-[#F8F6F0] flex flex-col items-center justify-center gap-3 animate-pulse aspect-[1/1.2]">
      <FileText size={32} className="text-[#1A4D2E]/30" />
      <div className="h-2 w-2/3 rounded-full bg-[#1A4D2E]/10" />
      <div className="h-2 w-1/2 rounded-full bg-[#1A4D2E]/10" />
    </div>
  ),
})

const categories = ['All', 'Reports & Analysis', 'Case Studies', 'Scoping Studies', 'Toolkits & Guides']

function ResourcesContent() {
  const t = useTranslations('Resources')
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const rawParam = searchParams?.get('tab') || searchParams?.get('category')
    if (rawParam) {
      const normalized = rawParam.toLowerCase().replace(/[^a-z0-9]/g, '')
      const matched = categories.find(
        (cat) => cat.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
      )
      if (matched) {
        setActiveCategory(matched)
      }
    }
  }, [searchParams])

  const getCategoryTranslation = (cat: string) => {
    const idx = categories.indexOf(cat)
    return idx >= 0 ? t(`categories.${idx}`) : cat
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (cat === 'All') {
        url.searchParams.delete('tab')
        url.searchParams.delete('category')
      } else {
        url.searchParams.set('tab', cat.toLowerCase().replace(/\s+/g, '-'))
      }
      window.history.replaceState(null, '', url.toString())
    }
  }

  const filteredDownloads = publicDownloads.filter((download) =>
    activeCategory === 'All' ? true : download.category === activeCategory
  )

  return (
    <main className="bg-[#F8F6F0] min-h-[100dvh]">
      {/* Masthead */}
      <section className="w-full pt-14 lg:pt-24 pb-10 lg:pb-12 bg-white border-b border-stone-200/80">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-16">
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

            {/* Filter Pills & Publication Count */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer border ${
                      activeCategory === category
                        ? 'bg-[#0F1F15] border-[#0F1F15] text-white'
                        : 'bg-[#F8F6F0] border-stone-200/80 text-[#0F1F15] hover:border-[#1A4D2E]/40 hover:bg-stone-100'
                    }`}
                  >
                    <RollingText>{getCategoryTranslation(category)}</RollingText>
                  </button>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#46584D] tabular-nums shrink-0">
                {filteredDownloads.length} publications
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="w-full py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDownloads.map((download) => {
              const originalIdx = publicDownloads.findIndex((d) => d.title === download.title)
              return (
                <article
                  key={download.title}
                  className="consultancy-card flex flex-col group"
                >
                  <PdfPreview pdfUrl={download.link} />

                  <div className="p-5 lg:p-6 flex flex-col flex-grow">
                    <p className="text-xs font-semibold text-[#1A4D2E] mb-2">
                      {t(`downloads.${originalIdx}.client`)}
                    </p>
                    <h2 className="text-[17px] font-serif font-bold text-[#0F1F15] mb-2.5 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                      {download.title}
                    </h2>
                    <p className="text-[13.5px] min-[1440px]:text-sm text-[#2A3830] font-normal leading-[1.6] mb-5 flex-grow">
                      {t(`downloads.${originalIdx}.citation`)}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-3.5 border-t border-stone-100 text-xs sm:text-[13.5px] font-semibold mt-auto">
                      <a
                        href={download.link}
                        className="text-[#0F1F15] hover:text-[#1A4D2E] transition-colors inline-flex items-center gap-1.5"
                        download
                        aria-label={`Download ${download.title} PDF`}
                        title={`Download ${download.title} (PDF)`}
                      >
                        {t('download_pdf')} <ArrowRight size={14} />
                      </a>
                      {download.clientLink && (
                        <a
                          href={download.clientLink}
                          className="text-[#46584D] hover:text-[#0F1F15] transition-colors inline-flex items-center gap-1.5"
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit publication partner: ${download.client}`}
                          title={`Visit ${download.client}`}
                        >
                          {t('client_link')} <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-[#2A4735]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 lg:space-y-7">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#D5E0D9] font-normal leading-[1.65] tracking-[0.01em]">
            {t('cta_desc')}
          </p>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary-green text-[#0F1F15] rounded-full font-bold text-sm sm:text-base transition-[transform,background-color] duration-200 hover:bg-[#45c456] active:scale-[0.98]"
            >
              <RollingText className="gap-2">
                {t('contact_us')}
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </RollingText>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-[#F8F6F0]" />}>
      <ResourcesContent />
    </Suspense>
  )
}
