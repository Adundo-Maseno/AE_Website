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
      <main className="bg-white min-h-[100dvh]">
        {/* Downloads */}
        <section className="w-full pt-16 lg:pt-28 pb-10 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center mb-16"
            >
              <h1
                className="font-serif text-deep-forest font-bold tracking-tight pb-2"
                style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
              >
                {t('title')}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 max-w-3xl mx-auto leading-relaxed font-normal mb-8 lg:mb-12">
                {t('subtitle')}
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`group relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-150 ease-out active:scale-[0.97] cursor-pointer ${activeCategory === category
                        ? 'bg-primary-green text-white shadow-md'
                        : 'bg-mist text-deep-forest hover:bg-primary-green/10'
                      }`}
                  >
                    <RollingText>
                      {getCategoryTranslation(category)}
                    </RollingText>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                    className="flex flex-col group border border-stone-200/80 bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-primary-green/30 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-250 ease-out"
                  >
                    {/* PDF first-page preview - sits flush against the border */}
                    <PdfPreview pdfUrl={download.link} />

                    <div className="p-4 lg:p-5 flex flex-col flex-grow">
                      <p className="text-xs font-bold text-primary-green tracking-wide mb-2 uppercase">{t(`downloads.${originalIdx}.client`)}</p>
                      <h2 className="text-base font-serif font-bold text-deep-forest mb-2 leading-snug group-hover:text-primary-green transition-colors">
                        {download.title}
                      </h2>
                      <p className="text-[13.5px] min-[1440px]:text-sm text-charcoal/70 font-light leading-relaxed mb-4 flex-grow">{t(`downloads.${originalIdx}.citation`)}</p>
                      <div className="flex flex-wrap gap-4 pt-3 border-t border-black/5 text-sm font-bold mt-auto">
                        <a
                          href={download.link}
                          className="text-deep-forest hover:text-primary-green transition-colors inline-flex items-center gap-1.5"
                          download
                          aria-label={`Download ${download.title} PDF`}
                          title={`Download ${download.title} (PDF)`}
                        >
                          {t('download_pdf')} <ArrowRight size={14} />
                        </a>
                        {download.clientLink && (
                          <a
                            href={download.clientLink}
                            className="text-deep-forest hover:text-primary-green transition-colors inline-flex items-center gap-1.5"
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

        {/* CTA */}
        <section className="w-full py-10 lg:py-16 xl:py-20 bg-mist border-t border-mist">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-forest">
              {t('cta_title')}
            </h2>
            <p className="text-lg lg:text-xl text-charcoal/80 font-light leading-relaxed">
              {t('cta_desc')}
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2 sm:pt-6">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-deep-forest text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:bg-deep-forest/90"
              >
                <RollingText className="gap-1.5 sm:gap-2">
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
