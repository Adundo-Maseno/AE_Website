'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { publicDownloads } from '@/lib/public-downloads'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { ArrowRight, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

// Dynamically import PdfPreview with SSR disabled to fix "DOMMatrix is not defined" error
const PdfPreview = dynamic(() => import('@/components/pdf-preview'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full rounded-xl overflow-hidden border border-primary-green/10 bg-mist flex flex-col items-center justify-center gap-3 animate-pulse aspect-[1/1.2]">
      <FileText size={32} className="text-primary-green/30" />
      <div className="h-2 w-2/3 rounded-full bg-primary-green/10" />
      <div className="h-2 w-1/2 rounded-full bg-primary-green/10" />
    </div>
  )
})

const categories = ['All', 'Reports & Analysis', 'Case Studies', 'Scoping Studies', 'Toolkits & Guides']

function ResourcesContent() {
  const t = useTranslations('Resources')
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')

  // Automatically activate the requested tab/category on load (e.g. ?tab=case-studies)
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

  // Using the index of the category to pull the translated string since the keys map 1:1 with English
  const getCategoryTranslation = (cat: string) => {
    const idx = categories.indexOf(cat);
    return idx >= 0 ? t(`categories.${idx}`) : cat;
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

  const filteredDownloads = publicDownloads.filter(download =>
    activeCategory === 'All' ? true : download.category === activeCategory
  )

  return (
    <>
      <main className="bg-[#F8F6F0] min-h-[100dvh]">
        {/* Editorial Publications Masthead */}
        <section className="w-full pt-14 lg:pt-24 pb-10 lg:pb-12 bg-white border-b border-stone-200/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/[0.04] rounded-full blur-[110px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-16">
                <div className="flex-1 space-y-3">
                  <span className="editorial-eyebrow">Publications &amp; Technical Library</span>
                  <h1
                    className="font-serif text-[#0F1F15] font-bold tracking-tight leading-[1.1]"
                    style={{ fontSize: 'clamp(2.125rem, 1.5rem + 2.5vw, 4.25rem)' }}
                  >
                    {t('title')}
                  </h1>
                </div>
                <div className="flex-1 relative">
                  <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-[1.5px] bg-[#1A4D2E]/20" />
                  <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 leading-relaxed font-normal lg:pl-10">
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
                      className={`group relative overflow-hidden inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-[transform,background-color,color,box-shadow,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer border ${activeCategory === category
                          ? 'bg-[#0F1F15] border-[#0F1F15] text-white shadow-sm'
                          : 'bg-[#F8F6F0] border-stone-200/80 text-[#0F1F15] hover:border-[#1A4D2E]/40 hover:bg-stone-100'
                        }`}
                    >
                      <RollingText>
                        {getCategoryTranslation(category)}
                      </RollingText>
                    </button>
                  ))}
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#1A4D2E]/75 tabular-nums shrink-0">
                  Showing {filteredDownloads.length} Publications
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Publications Grid */}
        <section className="w-full py-10 sm:py-14 lg:py-20 relative">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredDownloads.map((download) => {
                // Find index to get correct translation from the array
                const originalIdx = publicDownloads.findIndex(d => d.title === download.title);
                return (
                  <motion.article
                    key={download.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (originalIdx % 10) * 0.05 }}
                    className="consultancy-card flex flex-col group"
                  >
                    {/* PDF first-page preview - sits flush against the border */}
                    <PdfPreview pdfUrl={download.link} />

                    <div className="p-5 lg:p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <p className="font-mono text-[11px] font-bold text-primary-green tracking-[0.16em] uppercase">
                          {t(`downloads.${originalIdx}.client`)}
                        </p>
                        <span className="font-mono text-[10.5px] font-medium text-stone-400 tabular-nums">
                          #{String(originalIdx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 className="text-[17px] font-serif font-bold text-[#0F1F15] mb-2.5 leading-snug group-hover:text-[#1A4D2E] transition-colors">
                        {download.title}
                      </h2>
                      <p className="text-[13.5px] min-[1440px]:text-sm text-charcoal/75 font-normal leading-relaxed mb-5 flex-grow">
                        {t(`downloads.${originalIdx}.citation`)}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-3.5 border-t border-stone-100 text-xs sm:text-[13px] font-bold uppercase tracking-[0.08em] mt-auto">
                        <a
                          href={download.link}
                          className="text-[#0F1F15] hover:text-primary-green transition-colors inline-flex items-center gap-1.5"
                          download
                          aria-label={`Download ${download.title} PDF`}
                          title={`Download ${download.title} (PDF)`}
                        >
                          {t('download_pdf')} <ArrowRight size={14} />
                        </a>
                        {download.clientLink && (
                          <a
                            href={download.clientLink}
                            className="text-[#1A4D2E]/80 hover:text-primary-green transition-colors inline-flex items-center gap-1.5"
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
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Executive CTA */}
        <section className="w-full py-14 sm:py-20 lg:py-24 bg-[#0F1F15] text-white border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_70%)]" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 lg:space-y-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-green">
              Bespoke Research &amp; Scoping Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              {t('cta_title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary-green text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] shadow-xl shadow-primary-green/25"
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
    </>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-white" />}>
      <ResourcesContent />
    </Suspense>
  )
}
